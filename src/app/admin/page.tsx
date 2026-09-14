'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AdminGuard } from '../../components/admin/AdminGuard';
import { AdminLayout, AdminTab } from '../../components/admin/AdminLayout';
import { AnalyticsOverview } from '../../components/admin/AnalyticsOverview';
import { AppointmentsManager } from '../../components/admin/AppointmentsManager';
import { InquiriesManager } from '../../components/admin/InquiriesManager';
import { VisitorAnalyticsView } from '../../components/admin/VisitorAnalyticsView';
import { AdminSettings } from '../../components/admin/AdminSettings';
import { 
  adminStore, 
  Appointment, 
  Inquiry, 
  AnalyticsSummary 
} from '../../services/adminStore';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);

  const loadData = useCallback(async () => {
    const apts = adminStore.getAppointments();
    const inqs = adminStore.getInquiries();
    const sum = adminStore.getAnalyticsSummary();

    setAppointments(apts);
    setInquiries(inqs);
    setSummary(sum);

    try {
      const serverSum = await adminStore.fetchAnalyticsSummary();
      setSummary(serverSum);
    } catch {}
  }, []);

  useEffect(() => {
    loadData();

    // Auto-sync every 10 seconds for cross-device mobile events
    const syncInterval = setInterval(loadData, 10000);

    // Listen for storage events (e.g. if new submission occurs in another tab)
    const handleStorage = () => loadData();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('dss_analytics_updated', handleStorage);

    return () => {
      clearInterval(syncInterval);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('dss_analytics_updated', handleStorage);
    };
  }, [loadData]);

  const handleConvertToAppointment = (inquiry: Inquiry) => {
    // Add new appointment from inquiry
    adminStore.addAppointment({
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      businessName: 'Inquiry Conversion',
      serviceInterestedIn: inquiry.serviceOrDemo,
      preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      preferredTime: '10:00 AM - 10:30 AM',
      message: inquiry.message,
      source: `Converted from ${inquiry.source}`,
      estimatedValue: 50000,
    });

    // Update inquiry status to converted
    adminStore.updateInquiryStatus(inquiry.id, 'converted', 'Converted to scheduled consultation appointment.');

    loadData();
    setActiveTab('appointments');
  };

  const pendingAppointmentsCount = appointments.filter((a) => a.status === 'pending').length;
  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <AdminGuard>
      <AdminLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingAppointmentsCount={pendingAppointmentsCount}
        newInquiriesCount={newInquiriesCount}
      >
        {activeTab === 'analytics' && summary && (
          <AnalyticsOverview
            summary={summary}
            appointments={appointments}
            inquiries={inquiries}
            onNavigateToAppointments={() => setActiveTab('appointments')}
            onNavigateToInquiries={() => setActiveTab('inquiries')}
            onNavigateToVisitors={() => setActiveTab('visitors')}
          />
        )}

        {activeTab === 'visitors' && (
          <VisitorAnalyticsView />
        )}

        {activeTab === 'appointments' && (
          <AppointmentsManager
            appointments={appointments}
            onRefresh={loadData}
          />
        )}

        {activeTab === 'inquiries' && (
          <InquiriesManager
            inquiries={inquiries}
            onRefresh={loadData}
            onConvertToAppointment={handleConvertToAppointment}
          />
        )}

        {activeTab === 'settings' && (
          <AdminSettings
            onRefresh={loadData}
          />
        )}
      </AdminLayout>
    </AdminGuard>
  );
}
