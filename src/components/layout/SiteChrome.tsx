'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { QuickInquiryModal } from './QuickInquiryModal';

interface SiteChromeProps {
  children: React.ReactNode;
}

export const SiteChrome: React.FC<SiteChromeProps> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <div className="flex-1 w-full min-h-screen">{children}</div>;
  }

  const isHome = pathname === '/';

  if (isHome) {
    return (
      <>
        <main className="w-full min-h-screen">{children}</main>
        <QuickInquiryModal />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <QuickInquiryModal />
    </>
  );
};
