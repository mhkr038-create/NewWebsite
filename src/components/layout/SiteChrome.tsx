'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../context/ThemeContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { QuickInquiryModal } from './QuickInquiryModal';
import { CookieConsent } from './CookieConsent';

interface SiteChromeProps {
  children: React.ReactNode;
}

export const SiteChrome: React.FC<SiteChromeProps> = ({ children }) => {
  const pathname = usePathname();
  const { activeThemeId } = useTheme();
  const isAdmin = pathname?.startsWith('/admin');
  const isCartoonHome = pathname === '/' && activeThemeId === 'cartooneast';

  if (isAdmin || isCartoonHome) {
    return (
      <div className="flex-1 w-full min-h-screen">
        {children}
        <QuickInquiryModal />
        <CookieConsent />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <QuickInquiryModal />
      <CookieConsent />
    </>
  );
};
