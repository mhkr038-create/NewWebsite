export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  serviceInterestedIn: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  source: string;
  createdAt: string;
  estimatedValue: number;
  notes?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceOrDemo: string;
  message: string;
  source: 'Quick Modal' | 'Contact Form' | 'Demo Page' | 'WhatsApp Direct' | 'Intake Form' | 'Submit Request' | 'Google Form';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  createdAt: string;
  age?: number | string;
  requirement?: string;
  city?: string;
  businessName?: string;
  budget?: string;
  notes?: string;
}

export interface AnalyticsSummary {
  totalAppointments: number;
  confirmedAppointments: number;
  totalInquiries: number;
  totalPipelineValue: number;
  conversionRate: number;
  avgResponseTime: string;
  trafficChannels: { channel: string; visitors: number; leads: number; conversionRate: number }[];
  serviceDemand: { service: string; inquiriesCount: number; percentage: number }[];
  dailyStats: { date: string; visitors: number; leads: number; appointments: number }[];
}

const STORAGE_KEYS = {
  APPOINTMENTS: 'dss_admin_appointments',
  INQUIRIES: 'dss_admin_inquiries',
};

// Initial Seed Datasets
const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    name: 'Dr. Rajesh Vardhan',
    email: 'rajesh.vardhan@vardhanclinic.com',
    phone: '+91 98450 12890',
    businessName: 'Vardhan Integrated Medical Care',
    serviceInterestedIn: 'WhatsApp Automation & Landing Pages',
    preferredDate: '2026-08-30',
    preferredTime: '10:00 AM - 10:30 AM',
    message: 'We want to reduce appointment no-shows and deploy WhatsApp booking for our 3 clinical branches.',
    status: 'confirmed',
    source: 'Landing Page (Health Niche)',
    createdAt: '2026-08-28T09:15:00Z',
    estimatedValue: 45000,
    notes: 'High intent. Clinic does 60+ consultations daily. Needs 3-branch WhatsApp Cloud API integration.',
  },
  {
    id: 'apt-102',
    name: 'Ananya Sharma',
    email: 'ananya@luminawealth.in',
    phone: '+91 97110 44321',
    businessName: 'Lumina Wealth & Advisory',
    serviceInterestedIn: 'Google Ads & High-Converting Landing Pages',
    preferredDate: '2026-08-30',
    preferredTime: '02:00 PM - 02:30 PM',
    message: 'Looking for targeted Google Search PPC to capture HNI portfolio management prospects in Mumbai & Bangalore.',
    status: 'confirmed',
    source: 'Google Search Campaign',
    createdAt: '2026-08-28T14:30:00Z',
    estimatedValue: 75000,
    notes: 'Targeting HNI investors with 50L+ portfolio allocation. Needs strict intent matching.',
  },
  {
    id: 'apt-103',
    name: 'Vikramaditya Roy',
    email: 'vikram@pulsefitness.co',
    phone: '+91 88002 99124',
    businessName: 'Pulse Elite Gyms & Fitness',
    serviceInterestedIn: 'Meta Ads & WhatsApp Automation',
    preferredDate: '2026-08-31',
    preferredTime: '11:30 AM - 12:00 PM',
    message: 'Need Facebook/Instagram lead generation campaigns to sell annual memberships and trial passes.',
    status: 'pending',
    source: 'Meta Ads Campaign',
    createdAt: '2026-08-29T07:10:00Z',
    estimatedValue: 35000,
    notes: 'Wants to test 7-Day free pass lead magnet funnel connected to instant WhatsApp qualification.',
  },
  {
    id: 'apt-104',
    name: 'Priya Sundaram',
    email: 'priya.s@eduprepacademy.com',
    phone: '+91 94440 55678',
    businessName: 'EduPrep Competitive Academy',
    serviceInterestedIn: 'Digital Products & Course Funnels',
    preferredDate: '2026-08-31',
    preferredTime: '03:30 PM - 04:00 PM',
    message: 'We have mock test series and study material that we want to sell as downloadable digital products.',
    status: 'pending',
    source: 'Website Scheduler',
    createdAt: '2026-08-29T08:00:00Z',
    estimatedValue: 50000,
    notes: 'Has 5,000+ student email list ready to monetize with automated checkout & student portal.',
  },
  {
    id: 'apt-105',
    name: 'Sameer Kulkarni',
    email: 'sameer@apexrealty.co.in',
    phone: '+91 98200 66712',
    businessName: 'Apex Prime Properties',
    serviceInterestedIn: 'Meta Ads & WhatsApp Automation',
    preferredDate: '2026-08-27',
    preferredTime: '05:00 PM - 05:30 PM',
    message: 'Luxury villa project in Pune. Need direct WhatsApp qualification for prospective home buyers.',
    status: 'completed',
    source: 'Meta Ads Lead Form',
    createdAt: '2026-08-26T11:20:00Z',
    estimatedValue: 90000,
    notes: 'Consultation conducted. Proposal sent for 3BHK/4BHK acquisition funnel.',
  },
  {
    id: 'apt-106',
    name: 'Meera Nambiar',
    email: 'meera@nambiarlaw.com',
    phone: '+91 98401 77334',
    businessName: 'Nambiar Corporate Advisory',
    serviceInterestedIn: 'Blog Content & SEO Articles',
    preferredDate: '2026-08-26',
    preferredTime: '10:00 AM - 10:30 AM',
    message: 'Corporate legal and compliance retainers SEO topic cluster buildout.',
    status: 'completed',
    source: 'Organic SEO',
    createdAt: '2026-08-25T16:45:00Z',
    estimatedValue: 60000,
    notes: 'Started retainer for 8 in-depth compliance guide topic clusters.',
  },
  {
    id: 'apt-107',
    name: 'Karan Malhotra',
    email: 'karan@malhotracars.com',
    phone: '+91 99100 88231',
    businessName: 'Malhotra Luxury Pre-Owned',
    serviceInterestedIn: 'Meta Ads',
    preferredDate: '2026-08-25',
    preferredTime: '02:00 PM - 02:30 PM',
    message: 'Exotic vehicle test drive booking funnels.',
    status: 'cancelled',
    source: 'Direct Website',
    createdAt: '2026-08-24T10:00:00Z',
    estimatedValue: 40000,
    notes: 'Postponed to next quarter due to showroom relocation.',
  },
];

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-201',
    name: 'Devendra Patel',
    email: 'devendra@pateltextiles.com',
    phone: '+91 98250 33412',
    serviceOrDemo: 'Landing Pages',
    message: 'Need a multi-product B2B wholesale export landing page with RFQ forms.',
    source: 'Quick Modal',
    status: 'new',
    createdAt: '2026-08-29T08:15:00Z',
    budget: '₹50,000 - ₹1,00,000',
  },
  {
    id: 'inq-202',
    name: 'Sneha Chawla',
    email: 'sneha@mindfulcoach.in',
    phone: '+91 98112 55901',
    serviceOrDemo: 'Relationship Coach Demo',
    message: 'Loved the Relationship Coach live demo! How fast can we customize it with my branding?',
    source: 'Demo Page',
    status: 'qualified',
    createdAt: '2026-08-29T07:45:00Z',
    budget: '₹25,000 - ₹50,000',
    notes: 'Wants the assessment quiz module + WhatsApp booking enabled.',
  },
  {
    id: 'inq-203',
    name: 'Gaurav Khanna',
    email: 'gaurav@novasolutions.tech',
    phone: '+91 98765 43210',
    serviceOrDemo: 'Google Ads',
    message: 'Looking for a performance marketing agency to audit our current search ads account spending 1.5L/mo.',
    source: 'Contact Form',
    status: 'contacted',
    createdAt: '2026-08-28T18:20:00Z',
    budget: '₹1,00,000+',
    notes: 'Audited search terms report. Scheduled discovery call for next week.',
  },
  {
    id: 'inq-204',
    name: 'Tarun Varma',
    email: 'tarun@varmafoods.com',
    phone: '+91 98860 11223',
    serviceOrDemo: 'WhatsApp Automation',
    message: 'Need automated WhatsApp order status and distributor dispatch tracking.',
    source: 'WhatsApp Direct',
    status: 'new',
    createdAt: '2026-08-28T12:00:00Z',
    budget: '₹50,000 - ₹1,00,000',
  },
  {
    id: 'inq-205',
    name: 'Ritu Sen',
    email: 'ritu@artisanatelier.com',
    phone: '+91 98300 77890',
    serviceOrDemo: 'Digital Products',
    message: 'Selling downloadable craft patterns and video masterclasses.',
    source: 'Quick Modal',
    status: 'converted',
    createdAt: '2026-08-27T15:30:00Z',
    budget: '₹25,000 - ₹50,000',
    notes: 'Converted to active digital products setup project.',
  },
];

// Helper functions for Local Storage persistence
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function loadAppointments(): Appointment[] {
  if (!isBrowser()) return INITIAL_APPOINTMENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_APPOINTMENTS;
  }
}

function saveAppointments(data: Appointment[]) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving appointments to storage', e);
  }
}

function loadInquiries(): Inquiry[] {
  if (!isBrowser()) return INITIAL_INQUIRIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
      return INITIAL_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_INQUIRIES;
  }
}

function saveInquiries(data: Inquiry[]) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving inquiries to storage', e);
  }
}

export const adminStore = {
  // Appointments CRUD
  getAppointments(): Appointment[] {
    return loadAppointments();
  },

  addAppointment(data: {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    serviceInterestedIn: string;
    preferredDate: string;
    preferredTime: string;
    message?: string;
    source?: string;
    estimatedValue?: number;
  }): Appointment {
    const current = loadAppointments();
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      businessName: data.businessName || 'Not Specified',
      serviceInterestedIn: data.serviceInterestedIn,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      message: data.message || '',
      status: 'pending',
      source: data.source || 'Website Scheduler',
      createdAt: new Date().toISOString(),
      estimatedValue: data.estimatedValue || 45000,
    };
    const updated = [newAppointment, ...current];
    saveAppointments(updated);
    return newAppointment;
  },

  updateAppointmentStatus(id: string, status: Appointment['status'], notes?: string): Appointment | null {
    const current = loadAppointments();
    let updatedItem: Appointment | null = null;
    const updated = current.map((item) => {
      if (item.id === id) {
        updatedItem = {
          ...item,
          status,
          notes: notes !== undefined ? notes : item.notes,
        };
        return updatedItem;
      }
      return item;
    });
    saveAppointments(updated);
    return updatedItem;
  },

  deleteAppointment(id: string): void {
    const current = loadAppointments();
    saveAppointments(current.filter((item) => item.id !== id));
  },

  // Inquiries CRUD
  getInquiries(): Inquiry[] {
    return loadInquiries();
  },

  addInquiry(data: {
    name: string;
    email: string;
    phone: string;
    serviceOrDemo: string;
    message: string;
    source?: Inquiry['source'];
    budget?: string;
    age?: number | string;
    requirement?: string;
    city?: string;
    businessName?: string;
    notes?: string;
  }): Inquiry {
    const current = loadInquiries();
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      serviceOrDemo: data.serviceOrDemo,
      message: data.message,
      source: data.source || 'Contact Form',
      status: 'new',
      createdAt: new Date().toISOString(),
      budget: data.budget,
      age: data.age,
      requirement: data.requirement,
      city: data.city,
      businessName: data.businessName,
      notes: data.notes,
    };
    const updated = [newInquiry, ...current];
    saveInquiries(updated);
    return newInquiry;
  },

  updateInquiryStatus(id: string, status: Inquiry['status'], notes?: string): Inquiry | null {
    const current = loadInquiries();
    let updatedItem: Inquiry | null = null;
    const updated = current.map((item) => {
      if (item.id === id) {
        updatedItem = {
          ...item,
          status,
          notes: notes !== undefined ? notes : item.notes,
        };
        return updatedItem;
      }
      return item;
    });
    saveInquiries(updated);
    return updatedItem;
  },

  deleteInquiry(id: string): void {
    const current = loadInquiries();
    saveInquiries(current.filter((item) => item.id !== id));
  },

  // Analytics Computation
  getAnalyticsSummary(): AnalyticsSummary {
    const appointments = loadAppointments();
    const inquiries = loadInquiries();

    const confirmedCount = appointments.filter((a) => a.status === 'confirmed' || a.status === 'completed').length;
    const totalPipeline = appointments.reduce((sum, a) => sum + (a.status !== 'cancelled' ? a.estimatedValue : 0), 0);

    const trafficChannels = [
      { channel: 'Meta Ads (FB/IG)', visitors: 4820, leads: 142, conversionRate: 2.94 },
      { channel: 'Google Search PPC', visitors: 3150, leads: 118, conversionRate: 3.75 },
      { channel: 'WhatsApp Inbound', visitors: 1640, leads: 95, conversionRate: 5.79 },
      { channel: 'Organic SEO & Blog', visitors: 2890, leads: 74, conversionRate: 2.56 },
      { channel: 'Direct & Referrals', visitors: 1210, leads: 58, conversionRate: 4.79 },
    ];

    const serviceDemand = [
      { service: 'Landing Pages & CRO', inquiriesCount: 38, percentage: 31 },
      { service: 'Meta Ads Campaigns', inquiriesCount: 29, percentage: 24 },
      { service: 'WhatsApp Automation', inquiriesCount: 26, percentage: 21 },
      { service: 'Google Ads PPC', inquiriesCount: 18, percentage: 15 },
      { service: 'Digital Products & Tools', inquiriesCount: 11, percentage: 9 },
    ];

    const dailyStats = [
      { date: 'Aug 23', visitors: 1420, leads: 42, appointments: 3 },
      { date: 'Aug 24', visitors: 1680, leads: 51, appointments: 4 },
      { date: 'Aug 25', visitors: 1850, leads: 59, appointments: 6 },
      { date: 'Aug 26', visitors: 1720, leads: 48, appointments: 5 },
      { date: 'Aug 27', visitors: 2100, leads: 68, appointments: 8 },
      { date: 'Aug 28', visitors: 2430, leads: 82, appointments: 9 },
      { date: 'Aug 29', visitors: 2510, leads: 87, appointments: 11 },
    ];

    return {
      totalAppointments: appointments.length,
      confirmedAppointments: confirmedCount,
      totalInquiries: inquiries.length,
      totalPipelineValue: totalPipeline,
      conversionRate: 3.65,
      avgResponseTime: '< 45 seconds',
      trafficChannels,
      serviceDemand,
      dailyStats,
    };
  },

  // Reset to Factory Defaults
  resetStoreToDefaults(): void {
    if (!isBrowser()) return;
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
  },

  // Export CSV
  exportAppointmentsCsv(): string {
    const appointments = loadAppointments();
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Business Name', 'Service', 'Date', 'Time Slot', 'Status', 'Estimated Value', 'Source', 'Created At'];
    const rows = appointments.map((a) => [
      a.id,
      `"${a.name.replace(/"/g, '""')}"`,
      a.email,
      a.phone,
      `"${a.businessName.replace(/"/g, '""')}"`,
      `"${a.serviceInterestedIn.replace(/"/g, '""')}"`,
      a.preferredDate,
      a.preferredTime,
      a.status,
      a.estimatedValue,
      `"${a.source}"`,
      a.createdAt,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },

  // Export JSON
  exportStoreJson(): string {
    const data = {
      exportedAt: new Date().toISOString(),
      appointments: loadAppointments(),
      inquiries: loadInquiries(),
    };
    return JSON.stringify(data, null, 2);
  },

  // Import JSON
  importStoreJson(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed.appointments)) {
        saveAppointments(parsed.appointments);
      }
      if (Array.isArray(parsed.inquiries)) {
        saveInquiries(parsed.inquiries);
      }
      return true;
    } catch {
      return false;
    }
  },
};
