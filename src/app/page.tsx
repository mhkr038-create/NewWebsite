'use client';

import React from 'react';
import { Hero } from '../components/home/Hero';

import { TrustValueSection } from '../components/home/TrustValueSection';
import { AiServicesSection } from '../components/home/AiServicesSection';
import { DigitalMarketingSection } from '../components/home/DigitalMarketingSection';
import { AutomationSection } from '../components/home/AutomationSection';
import { HowWeWorkSection } from '../components/home/HowWeWorkSection';
import { SolutionsSection } from '../components/home/SolutionsSection';
import { DemoShowcaseSection } from '../components/home/DemoShowcaseSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { CaseStudiesSection } from '../components/home/CaseStudiesSection';
import { BlogSection } from '../components/home/BlogSection';
import { CTASection } from '../components/common/CTASection';
import { MeetingSection } from '../components/home/MeetingSection';

export default function HomePage() {
  return (
    <div className="space-y-24 sm:space-y-36 pb-24 overflow-x-hidden">
      {/* 1. Hero Section with Growth Funnel Visual */}
      <Hero />

      {/* 2. Trust / Value Section: Everything You Need to Grow Digitally */}
      <TrustValueSection />

      {/* 3. Dedicated AI Services Section */}
      <AiServicesSection />

      {/* 4. Digital Marketing Services Section */}
      <DigitalMarketingSection />

      {/* 5. Automation Section: Stop Doing Everything Manually */}
      <AutomationSection />

      {/* 6. How We Work 4-Step Process */}
      <HowWeWorkSection />

      {/* 7. Solutions by Business Type (8 Industry Frameworks) */}
      <SolutionsSection />

      {/* 8. Demo Showcase Section: Interactive Live Website Demos */}
      <DemoShowcaseSection />

      {/* 9. Why Choose Us (6 Core Advantages) */}
      <WhyChooseUsSection />

      {/* 10. Featured Case Studies & Quantified Results */}
      <CaseStudiesSection />

      {/* 11. Blog & Strategy Playbooks */}
      <BlogSection />

      {/* 12. High-Converting Call to Action Banner */}
      <CTASection />

      {/* 13. Direct Meeting Booking / Consultation Form */}
      <MeetingSection />
    </div>
  );
}

