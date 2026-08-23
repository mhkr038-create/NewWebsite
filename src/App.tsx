import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { InquiryProvider } from './context/InquiryContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { QuickInquiryModal } from './components/layout/QuickInquiryModal';

// Main website pages
import { HomePage } from './pages/HomePage';
import { SolutionsPage } from './pages/SolutionsPage';
import { DemosPage } from './pages/DemosPage';
import { ProductsPage } from './pages/ProductsPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// 8 Standalone Demo Pages
import { HealthClinicDemo } from './demos/health-clinic/HealthClinicDemo';
import { WealthAdvisorDemo } from './demos/wealth-advisor/WealthAdvisorDemo';
import { EducationAcademyDemo } from './demos/education-academy/EducationAcademyDemo';
import { RelationshipCoachDemo } from './demos/relationship-coach/RelationshipCoachDemo';
import { AiAgencyDemo } from './demos/ai-agency/AiAgencyDemo';
import { PersonalBrandDemo } from './demos/personal-brand/PersonalBrandDemo';
import { DigitalAgencyDemo } from './demos/digital-agency/DigitalAgencyDemo';
import { FitnessCoachDemo } from './demos/fitness-coach/FitnessCoachDemo';

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout for main marketing site (includes Navbar, Footer & Quick Inquiry Modal)
const MainSiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
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
            path="/solutions"
            element={
              <MainSiteLayout>
                <SolutionsPage />
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
            path="/products"
            element={
              <MainSiteLayout>
                <ProductsPage />
              </MainSiteLayout>
            }
          />
          <Route
            path="/services"
            element={
              <MainSiteLayout>
                <ServicesPage />
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

