import React from 'react';
import { MeetingForm } from '../forms/MeetingForm';

export const MeetingSection: React.FC = () => {
  return (
    <section id="schedule-meeting" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
      <MeetingForm />
    </section>
  );
};
