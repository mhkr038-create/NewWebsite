'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AdminUser {
  username: string;
  email: string;
  role: 'Super Admin' | 'Growth Strategist';
  lastLogin: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => { success: boolean; error?: string };
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => { success: boolean; error?: string };
  sendResetCode: (email: string) => Promise<{ success: boolean; error?: string; code?: string }>;
  verifyResetCode: (email: string, code: string) => { success: boolean; error?: string };
  resetPasswordWithCode: (email: string, code: string, newPass: string) => { success: boolean; error?: string };
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const AUTH_KEYS = {
  SESSION_TOKEN: 'dss_admin_token',
  USER_DATA: 'dss_admin_user',
  PASSWORD_HASH: 'dss_admin_pwd',
  RESET_CODE: 'dss_admin_reset_code',
  RESET_EXPIRY: 'dss_admin_reset_expiry',
  ADMIN_EMAIL: 'dss_admin_email',
};

const DEFAULT_ADMIN_EMAIL = 'mhkr038@gmail.com';
const INITIAL_SETUP_PASSWORD = 'admin@dss2026';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize stored auth state
  useEffect(() => {
    try {
      if (!localStorage.getItem(AUTH_KEYS.PASSWORD_HASH)) {
        localStorage.setItem(AUTH_KEYS.PASSWORD_HASH, INITIAL_SETUP_PASSWORD);
      }
      if (!localStorage.getItem(AUTH_KEYS.ADMIN_EMAIL)) {
        localStorage.setItem(AUTH_KEYS.ADMIN_EMAIL, DEFAULT_ADMIN_EMAIL);
      }

      const token = localStorage.getItem(AUTH_KEYS.SESSION_TOKEN) || sessionStorage.getItem(AUTH_KEYS.SESSION_TOKEN);
      const userRaw = localStorage.getItem(AUTH_KEYS.USER_DATA) || sessionStorage.getItem(AUTH_KEYS.USER_DATA);

      if (token && userRaw) {
        setIsAuthenticated(true);
        setAdminUser(JSON.parse(userRaw));
      }
    } catch (e) {
      console.warn('Auth state read failed', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string, password: string, rememberMe: boolean = true) => {
    try {
      const storedPassword = localStorage.getItem(AUTH_KEYS.PASSWORD_HASH) || INITIAL_SETUP_PASSWORD;
      const storedEmail = localStorage.getItem(AUTH_KEYS.ADMIN_EMAIL) || DEFAULT_ADMIN_EMAIL;

      const cleanInputEmail = email.trim().toLowerCase();
      const validEmails = [
        storedEmail.toLowerCase(),
        'admin@digitalsimplesolution.com',
        'mhkr038@gmail.com',
        'admin',
      ];

      if (!validEmails.includes(cleanInputEmail)) {
        return { success: false, error: 'Administrator email not recognized.' };
      }

      if (password.trim() === storedPassword.trim()) {
        const user: AdminUser = {
          username: cleanInputEmail.includes('@') ? cleanInputEmail.split('@')[0] : 'admin',
          email: cleanInputEmail.includes('@') ? cleanInputEmail : storedEmail,
          role: 'Super Admin',
          lastLogin: new Date().toISOString(),
        };
        const token = `dss_sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

        if (rememberMe) {
          localStorage.setItem(AUTH_KEYS.SESSION_TOKEN, token);
          localStorage.setItem(AUTH_KEYS.USER_DATA, JSON.stringify(user));
        } else {
          sessionStorage.setItem(AUTH_KEYS.SESSION_TOKEN, token);
          sessionStorage.setItem(AUTH_KEYS.USER_DATA, JSON.stringify(user));
        }

        setIsAuthenticated(true);
        setAdminUser(user);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid password. If you forgot your password, click Forgot Password below.' };
      }
    } catch {
      return { success: false, error: 'Authentication service temporarily unavailable.' };
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem(AUTH_KEYS.SESSION_TOKEN);
      localStorage.removeItem(AUTH_KEYS.USER_DATA);
      sessionStorage.removeItem(AUTH_KEYS.SESSION_TOKEN);
      sessionStorage.removeItem(AUTH_KEYS.USER_DATA);
    } finally {
      setIsAuthenticated(false);
      setAdminUser(null);
    }
  };

  const changePassword = (oldPass: string, newPass: string) => {
    try {
      const storedPassword = localStorage.getItem(AUTH_KEYS.PASSWORD_HASH) || INITIAL_SETUP_PASSWORD;

      if (oldPass.trim() !== storedPassword.trim()) {
        return { success: false, error: 'Current password does not match.' };
      }

      if (!newPass || newPass.trim().length < 6) {
        return { success: false, error: 'New password must be at least 6 characters.' };
      }

      localStorage.setItem(AUTH_KEYS.PASSWORD_HASH, newPass.trim());
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to update password.' };
    }
  };

  // Step 1: Send 6-digit reset code to administrator Gmail
  const sendResetCode = async (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const storedEmail = (localStorage.getItem(AUTH_KEYS.ADMIN_EMAIL) || DEFAULT_ADMIN_EMAIL).toLowerCase();
    
    // Check if email belongs to authorized administrator
    if (cleanEmail !== storedEmail && cleanEmail !== 'admin@digitalsimplesolution.com' && cleanEmail !== 'mhkr038@gmail.com') {
      return { success: false, error: 'No administrator account found with this email address.' };
    }

    // Generate random 6-digit security code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = (Date.now() + 10 * 60 * 1000).toString(); // 10 minutes

    try {
      sessionStorage.setItem(AUTH_KEYS.RESET_CODE, code);
      sessionStorage.setItem(AUTH_KEYS.RESET_EXPIRY, expiry);
      sessionStorage.setItem(AUTH_KEYS.ADMIN_EMAIL, cleanEmail);

      // Trigger backend Gmail SMTP dispatcher
      try {
        await fetch('/api/admin/send-reset-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, code }),
        });
      } catch (err) {
        console.warn('Gmail API dispatch attempt:', err);
      }

      return { success: true, code };
    } catch {
      return { success: false, error: 'Failed to dispatch verification code.' };
    }
  };


  // Step 2: Verify 6-digit code
  const verifyResetCode = (email: string, inputCode: string) => {
    try {
      const trimmed = inputCode.trim();
      const storedCode = sessionStorage.getItem(AUTH_KEYS.RESET_CODE);
      const expiry = sessionStorage.getItem(AUTH_KEYS.RESET_EXPIRY);

      if (!storedCode || !expiry) {
        return { success: false, error: 'No active reset request found. Please request a new code.' };
      }

      if (Date.now() > Number(expiry)) {
        return { success: false, error: 'Verification code has expired. Please request a fresh code.' };
      }

      if (trimmed !== storedCode.trim()) {
        return { success: false, error: 'Incorrect 6-digit verification code. Please check your Gmail.' };
      }

      return { success: true };
    } catch {
      return { success: false, error: 'Verification failed.' };
    }
  };



  // Step 3: Create & save new password
  const resetPasswordWithCode = (email: string, code: string, newPass: string) => {
    const verification = verifyResetCode(email, code);
    if (!verification.success) {
      return verification;
    }

    if (!newPass || newPass.trim().length < 6) {
      return { success: false, error: 'Password must contain at least 6 characters.' };
    }

    try {
      localStorage.setItem(AUTH_KEYS.PASSWORD_HASH, newPass.trim());
      // Clean up session reset items
      sessionStorage.removeItem(AUTH_KEYS.RESET_CODE);
      sessionStorage.removeItem(AUTH_KEYS.RESET_EXPIRY);
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to reset password.' };
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        isLoading,
        login,
        logout,
        changePassword,
        sendResetCode,
        verifyResetCode,
        resetPasswordWithCode,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

