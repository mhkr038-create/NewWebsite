'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_REGISTRY, type DemoItem } from '../data/demos';

interface InquiryContextType {
  selectedDemoId: string;
  setSelectedDemoId: (id: string) => void;
  isQuickModalOpen: boolean;
  openQuickModal: (demoId?: string) => void;
  closeQuickModal: () => void;
  getSelectedDemo: () => DemoItem | undefined;
  savedDemos: string[];
  toggleSaveDemo: (id: string) => void;
  isDemoSaved: (id: string) => boolean;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export const InquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedDemoId, setSelectedDemoId] = useState<string>('health-clinic');
  const [isQuickModalOpen, setIsQuickModalOpen] = useState<boolean>(false);
  const [savedDemos, setSavedDemos] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dfh_saved_demos');
      return saved ? JSON.parse(saved) : ['health-clinic', 'wealth-advisor'];
    } catch {
      return ['health-clinic', 'wealth-advisor'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dfh_saved_demos', JSON.stringify(savedDemos));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [savedDemos]);

  const openQuickModal = (demoId?: string) => {
    if (demoId) {
      setSelectedDemoId(demoId);
    }
    setIsQuickModalOpen(true);
  };

  const closeQuickModal = () => {
    setIsQuickModalOpen(false);
  };

  const getSelectedDemo = () => {
    return DEMO_REGISTRY.find((d) => d.id === selectedDemoId) || DEMO_REGISTRY[0];
  };

  const toggleSaveDemo = (id: string) => {
    setSavedDemos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isDemoSaved = (id: string) => savedDemos.includes(id);

  return (
    <InquiryContext.Provider
      value={{
        selectedDemoId,
        setSelectedDemoId,
        isQuickModalOpen,
        openQuickModal,
        closeQuickModal,
        getSelectedDemo,
        savedDemos,
        toggleSaveDemo,
        isDemoSaved,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
};
