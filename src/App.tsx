import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { InquiryProvider } from './context/InquiryContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { QuickInquiryModal } from './components/layout/QuickInquiryModal';

// Main website pages
import { HomePage } from './pages/HomePage';
import { AiServicesPage } from './pages/AiServicesPage';
import { DigitalMarketingPage } from './pages/DigitalMarketingPage';
import { AutomationPage } from './pages/AutomationPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { IndustryDetailPage } from './pages/IndustryDetailPage';
import { DemosPage } from './pages/DemosPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ScheduleMeetingPage } from './pages/ScheduleMeetingPage';

// 8 Standalone Live Demo Pages
import { HealthClinicDemo } from './demos/health-clinic/HealthClinicDemo';
import { WealthAdvisorDemo } from './demos/wealth-advisor/WealthAdvisorDemo';
import { EducationAcademyDemo } from './demos/education-academy/EducationAcademyDemo';
import { RelationshipCoachDemo } from './demos/relationship-coach/RelationshipCoachDemo';
import { AiAgencyDemo } from './demos/ai-agency/AiAgencyDemo';
import { PersonalBrandDemo } from './demos/personal-brand/PersonalBrandDemo';
import { DigitalAgencyDemo } from './demos/digital-agency/DigitalAgencyDemo';
import { FitnessCoachDemo } from './demos/fitness-coach/FitnessCoachDemo';

// Scroll to top on route change (unless navigating to hash)
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

// Layout for main agency website (includes Navbar, Footer & Quick Inquiry Modal)
const MainSiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white antialiased">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <QuickInquiryModal />
    </div>
  );
};

export function App() {
  return (
    <InquiryProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Main Website Pages */}
          <Route
            path="/"
            element={
              <MainSiteLayout>
                <HomePage />
              </MainSiteLayout>
            }
          />
          <Route
            path="/ai-services"
            element={
              <MainSiteLayout>
                <AiServicesPage />
              </MainSiteLayout>
            }
          />
          <Route
            path="/digital-marketing"
            element={
              <MainSiteLayout>
                <DigitalMarketingPage />
              </MainSiteLayout>
            }
          />
          <Route
            path="/automation"
            element={
              <MainSiteLayout>
                <AutomationPage />
              </MainSiteLayout>
            }
          />
          <Route
            path="/solutions"
            element={
              <MainSiteLayout>
                <SolutionsPage />
              </MainSiteLayout>
            }
          />
          <Route
            path="/solutions/:industrySlug"
            element={
              <MainSiteLayout>
                <IndustryDetailPage />
              </MainSiteLayout>
            }
          />
          <Route
            path="/demos"
            element={
              <MainSiteLayout>
                <DemosPage />
              </MainSiteLayout>
            }
          />
          <Route
            path="/demo-gallery"
            element={
              <MainSiteLayout>
                <DemosPage />
              </MainSiteLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainSiteLayout>
                <AboutPage />
              </MainSiteLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainSiteLayout>
                <ContactPage />
              </MainSiteLayout>
            }
          />
          <Route
            path="/schedule-meeting"
            element={
              <MainSiteLayout>
                <ScheduleMeetingPage />
              </MainSiteLayout>
            }
          />

          {/* 8 Live Demo Websites (Rendered with DemoFrameWrapper) */}
          <Route path="/demo/health-clinic" element={<HealthClinicDemo />} />
          <Route path="/demo/wealth-advisor" element={<WealthAdvisorDemo />} />
          <Route path="/demo/education-academy" element={<EducationAcademyDemo />} />
          <Route path="/demo/relationship-coach" element={<RelationshipCoachDemo />} />
          <Route path="/demo/ai-agency" element={<AiAgencyDemo />} />
          <Route path="/demo/personal-brand" element={<PersonalBrandDemo />} />
          <Route path="/demo/digital-agency" element={<DigitalAgencyDemo />} />
          <Route path="/demo/fitness-coach" element={<FitnessCoachDemo />} />

          {/* Catch-all route -> redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Global Modal also accessible across demo viewports if triggered */}
        <QuickInquiryModal />
      </BrowserRouter>
    </InquiryProvider>
  );
}

export default App;
