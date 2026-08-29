'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  Mail, 
  Sparkles, 
  CheckCircle2,
  Home,
  ArrowLeft,
  KeyRound,
  RefreshCw,
  Send
} from 'lucide-react';
import { SITE_CONFIG } from '../../../config/siteConfig';

type AuthView = 'login' | 'forgot_email' | 'verify_code' | 'set_new_password' | 'reset_success';

export default function AdminLoginPage() {
  const { 
    isAuthenticated, 
    login, 
    isLoading,
    sendResetCode,
    verifyResetCode,
    resetPasswordWithCode 
  } = useAdminAuth();
  const router = useRouter();

  const [currentView, setCurrentView] = useState<AuthView>('login');

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Forgot / Reset password state
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [dispatchedCode, setDispatchedCode] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/admin');
    }
  }, [isAuthenticated, isLoading, router]);

  // Resend code countdown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your administrator email address.');
      return;
    }

    if (!password.trim()) {
      setErrorMsg('Please enter your administrator password.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = login(email, password, rememberMe);
      setIsSubmitting(false);

      if (res.success) {
        setLoginSuccess(true);
        setTimeout(() => {
          router.push('/admin');
        }, 400);
      } else {
        setErrorMsg(res.error || 'Authentication failed.');
      }
    }, 400);
  };

  // Step 1: Send Reset Code to Gmail
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!resetEmail.trim() || !resetEmail.includes('@')) {
      setErrorMsg('Please enter a valid administrator email.');
      return;
    }

    setIsSubmitting(true);
    const res = await sendResetCode(resetEmail);
    setIsSubmitting(false);

    if (res.success) {
      setDispatchedCode(res.code || null);
      setResendCooldown(60);
      setCurrentView('verify_code');
    } else {
      setErrorMsg(res.error || 'Failed to dispatch verification code.');
    }
  };

  // Step 2: Verify Code
  const handleVerifyCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (resetCode.trim().length !== 6) {
      setErrorMsg('Please enter the full 6-digit verification code.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = verifyResetCode(resetEmail, resetCode);
      setIsSubmitting(false);
      if (res.success) {
        setCurrentView('set_new_password');
      } else {
        setErrorMsg(res.error || 'Invalid verification code.');
      }
    }, 300);
  };

  // Step 3: Set New Password
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = resetPasswordWithCode(resetEmail, resetCode, newPassword);
      setIsSubmitting(false);

      if (res.success) {
        setPassword('');
        setEmail(resetEmail);
        setCurrentView('reset_success');
      } else {
        setErrorMsg(res.error || 'Failed to update password.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Back to website button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-mono transition-colors"
        >
          <Home className="w-3.5 h-3.5 text-cyan-400" />
          <span>Back to Main Website</span>
        </Link>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-[1.5px] mx-auto shadow-xl shadow-indigo-600/25">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-cyan-400" />
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/40 text-indigo-300 text-[11px] font-mono mb-2">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Admin Management Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              {SITE_CONFIG.brandName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Data Analytics, Appointments & Lead Pipeline
            </p>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-3xl p-7 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span className="leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {loginSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Authentication verified! Loading dashboard...</span>
            </div>
          )}

          {/* VIEW 1: Standard Login Form */}
          {currentView === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Administrator Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your administrator email..."
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg('');
                      setResetEmail(email || 'mhkr038@gmail.com');
                      setCurrentView('forgot_email');
                    }}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 font-mono hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password..."
                    required
                    className="w-full pl-10 pr-11 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Remember session on this device</span>
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || loginSuccess}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <span>{isSubmitting ? 'Authenticating...' : 'Access Admin Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* VIEW 2: Forgot Password - Step 1: Send Gmail Code */}
          {currentView === 'forgot_email' && (
            <form onSubmit={handleSendCode} className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-cyan-400" />
                  <span>Reset Administrator Password</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter your administrator Gmail address. We will send you a 6-digit verification code to create a new password.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Registered Administrator Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="e.g. mhkr038@gmail.com"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setCurrentView('login');
                  }}
                  className="w-1/3 py-3 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-400 font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Sending Code...' : 'Send Verification Code'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* VIEW 3: Step 2 - Verify 6-Digit Code */}
          {currentView === 'verify_code' && (
            <form onSubmit={handleVerifyCodeSubmit} className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Check Your Gmail</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We dispatched a 6-digit security verification code to <strong className="text-slate-200">{resetEmail}</strong>.
                </p>
              </div>

              {/* Gmail Inbox Notification */}
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-300 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-white">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Email Dispatched</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Please open your Gmail inbox (and check Spam/Promotions if needed) to retrieve your 6-digit code.
                </p>
              </div>


              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="e.g. 849201"
                  required
                  className="w-full text-center tracking-widest text-lg font-bold py-2.5 bg-slate-950 border border-cyan-500/50 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Didn&apos;t receive it?</span>
                <button
                  type="button"
                  disabled={resendCooldown > 0 || isSubmitting}
                  onClick={async () => {
                    setIsSubmitting(true);
                    const res = await sendResetCode(resetEmail);
                    setIsSubmitting(false);
                    if (res.success) {
                      setDispatchedCode(res.code || null);
                      setResendCooldown(60);
                    }
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-mono disabled:text-slate-600 cursor-pointer"
                >
                  {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend Code'}
                </button>
              </div>



              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setCurrentView('forgot_email');
                  }}
                  className="w-1/3 py-3 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-400 font-semibold transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || resetCode.length !== 6}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Verifying...' : 'Verify & Proceed'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* VIEW 4: Step 3 - Create New Password */}
          {currentView === 'set_new_password' && (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>Create New Administrator Password</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter your new password to secure your admin account.
                </p>
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  New Password (min. 6 characters)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password..."
                    required
                    className="w-full pl-10 pr-11 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password..."
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <span>{isSubmitting ? 'Updating Password...' : 'Save New Password & Finish'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* VIEW 5: Password Reset Success */}
          {currentView === 'reset_success' && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white font-heading">
                  Password Reset Successfully!
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your new administrator password has been saved. You can now log into your dashboard.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setCurrentView('login');
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Back to Admin Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Security badge */}
        <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted Session • Rate-Limiting Protection Active</span>
        </div>
      </div>
    </div>
  );
}

