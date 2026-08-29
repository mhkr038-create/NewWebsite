'use client';

import React from 'react';
import Link from 'next/link';
import { HealthClinicDemo } from './health-clinic/HealthClinicDemo';
import { WealthAdvisorDemo } from './wealth-advisor/WealthAdvisorDemo';
import { EducationAcademyDemo } from './education-academy/EducationAcademyDemo';
import { RelationshipCoachDemo } from './relationship-coach/RelationshipCoachDemo';
import { FitnessCoachDemo } from './fitness-coach/FitnessCoachDemo';
import { AiAgencyDemo } from './ai-agency/AiAgencyDemo';
import { PersonalBrandDemo } from './personal-brand/PersonalBrandDemo';
import { DigitalAgencyDemo } from './digital-agency/DigitalAgencyDemo';

interface DemoDispatcherProps {
  slug: string;
}

export const DemoDispatcher: React.FC<DemoDispatcherProps> = ({ slug }) => {
  switch (slug) {
    case 'health-clinic':
      return <HealthClinicDemo />;
    case 'wealth-advisor':
      return <WealthAdvisorDemo />;
    case 'education-academy':
      return <EducationAcademyDemo />;
    case 'relationship-coach':
      return <RelationshipCoachDemo />;
    case 'fitness-coach':
      return <FitnessCoachDemo />;
    case 'ai-agency':
      return <AiAgencyDemo />;
    case 'personal-brand':
      return <PersonalBrandDemo />;
    case 'digital-agency':
      return <DigitalAgencyDemo />;
    default:
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Demo Not Found</h1>
          <p className="text-sm text-slate-400">The requested live website demo could not be found.</p>
          <Link
            href="/demos"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
          >
            Return to All Website Demos
          </Link>
        </div>
      );
  }
};
