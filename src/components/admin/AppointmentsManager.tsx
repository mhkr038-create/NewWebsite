'use client';

import React, { useState, useMemo } from 'react';
import { 
  Appointment, 
  adminStore 
} from '../../services/adminStore';
import { 
  CalendarDays, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Check, 
  Trash2, 
  Edit3, 
  ExternalLink,
  ChevronDown,
  Building,
  DollarSign,
  User,
  Sparkles,
  X
} from 'lucide-react';

interface AppointmentsManagerProps {
  appointments: Appointment[];
  onRefresh: () => void;
}

export const AppointmentsManager: React.FC<AppointmentsManagerProps> = ({
  appointments,
  onRefresh,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');

  // New Appointment Form state
  const [newForm, setNewForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    serviceInterestedIn: 'WhatsApp Automation & Landing Pages',
    preferredDate: '',
    preferredTime: '10:00 AM - 10:30 AM',
    estimatedValue: 45000,
    message: '',
  });

  const servicesList = [
    'WhatsApp Automation & Landing Pages',
    'Google Ads & High-Converting Landing Pages',
    'Meta Ads & WhatsApp Automation',
    'Digital Products & Course Funnels',
    'Blog Content & SEO Articles',
    'Landing Page Creation',
    'Meta Ads',
    'Google Ads',
    'WhatsApp Automation',
    'Digital Products',
  ];

  // Filtered Appointments
  const filtered = useMemo(() => {
    return appointments.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.serviceInterestedIn.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesService = serviceFilter === 'all' || item.serviceInterestedIn.includes(serviceFilter);

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [appointments, searchQuery, statusFilter, serviceFilter]);

  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    adminStore.updateAppointmentStatus(id, newStatus);
    onRefresh();
  };

  const handleSaveNotes = (id: string) => {
    adminStore.updateAppointmentStatus(id, appointments.find(a => a.id === id)!.status, tempNotes);
    setEditingNotesId(null);
    onRefresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this appointment record?')) {
      adminStore.deleteAppointment(id);
      if (selectedAppointment?.id === id) setSelectedAppointment(null);
      onRefresh();
    }
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.addAppointment({
      name: newForm.name,
      email: newForm.email,
      phone: newForm.phone,
      businessName: newForm.businessName,
      serviceInterestedIn: newForm.serviceInterestedIn,
      preferredDate: newForm.preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: newForm.preferredTime,
      estimatedValue: Number(newForm.estimatedValue),
      message: newForm.message,
      source: 'Admin Manual Entry',
    });

    setIsNewModalOpen(false);
    setNewForm({
      name: '',
      email: '',
      phone: '',
      businessName: '',
      serviceInterestedIn: 'WhatsApp Automation & Landing Pages',
      preferredDate: '',
      preferredTime: '10:00 AM - 10:30 AM',
      estimatedValue: 45000,
      message: '',
    });
    onRefresh();
  };

  const handleExportCsv = () => {
    const csvContent = adminStore.exportAppointmentsCsv();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `dss_appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            <span>Confirmed</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Clock className="w-3 h-3" />
            <span>Pending Review</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
            <Check className="w-3 h-3" />
            <span>Completed</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <XCircle className="w-3 h-3" />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-2.5">
            <CalendarDays className="w-6 h-6 text-cyan-400" />
            <span>Consultation Appointments Directory</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage scheduled growth audits, client confirmations, and pipeline leads.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, business, phone, email, or service..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer capitalize ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table / Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Appointments List (Left Column) */}
        <div className={`${selectedAppointment ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-3`}>
          {filtered.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <CalendarDays className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Appointments Found</h3>
              <p className="text-xs text-slate-400">
                Try adjusting your search criteria or status filter.
              </p>
            </div>
          ) : (
            filtered.map((item) => {
              const isSelected = selectedAppointment?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedAppointment(item)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer text-left space-y-3 ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-950/30'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 p-[1px] shrink-0">
                        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-heading font-extrabold text-xs text-cyan-300">
                          {item.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{item.name}</span>
                          {item.businessName && item.businessName !== 'Not Specified' && (
                            <span className="text-[11px] font-normal text-slate-400 font-sans">
                              • {item.businessName}
                            </span>
                          )}
                        </h4>
                        <span className="text-xs text-indigo-300 font-mono block">
                          {item.serviceInterestedIn}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusBadge(item.status)}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono pt-1">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5 text-slate-500" />
                      <strong className="text-slate-200">{item.preferredDate}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.preferredTime}</span>
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>₹{item.estimatedValue.toLocaleString('en-IN')}</span>
                    </span>
                  </div>

                  {item.message && (
                    <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 line-clamp-2">
                      &quot;{item.message}&quot;
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Selected Appointment Details Drawer (Right Column) */}
        {selectedAppointment && (
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 sticky top-36 h-fit shadow-2xl animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                  Appointment Inspection
                </span>
                <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                  {selectedAppointment.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Contact Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {/* WhatsApp Action */}
              <a
                href={`https://wa.me/${selectedAppointment.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${selectedAppointment.name}, this is Digital Simple Solution confirming your strategy consultation for ${selectedAppointment.preferredDate} at ${selectedAppointment.preferredTime}. How can we best assist your growth goals?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex flex-col items-center gap-1 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              {/* Email Action */}
              <a
                href={`mailto:${selectedAppointment.email}?subject=${encodeURIComponent(
                  `Strategy Consultation Confirmation - Digital Simple Solution`
                )}&body=${encodeURIComponent(
                  `Hello ${selectedAppointment.name},\n\nWe are looking forward to our strategy session on ${selectedAppointment.preferredDate} at ${selectedAppointment.preferredTime}.\n\nBest regards,\nDigital Simple Solution Team`
                )}`}
                className="p-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex flex-col items-center gap-1 transition-all"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Email</span>
              </a>

              {/* Phone Action */}
              <a
                href={`tel:${selectedAppointment.phone}`}
                className="p-2.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex flex-col items-center gap-1 transition-all"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call Client</span>
              </a>
            </div>

            {/* Client Info Grid */}
            <div className="space-y-3 text-xs bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Business / Clinic:</span>
                <strong className="text-white font-medium">{selectedAppointment.businessName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Phone:</span>
                <span className="text-cyan-300 font-mono">{selectedAppointment.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Email:</span>
                <span className="text-slate-200 font-mono truncate max-w-[200px]">{selectedAppointment.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Date & Slot:</span>
                <strong className="text-white">{selectedAppointment.preferredDate} ({selectedAppointment.preferredTime})</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Acquisition Channel:</span>
                <span className="text-indigo-300">{selectedAppointment.source}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Est. Deal Value:</span>
                <strong className="text-emerald-400 font-mono">₹{selectedAppointment.estimatedValue.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Status Change Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Update Appointment Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['confirmed', 'pending', 'completed', 'cancelled'] as Appointment['status'][]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedAppointment.id, st)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-semibold capitalize transition-all cursor-pointer ${
                      selectedAppointment.status === st
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Strategist Notes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Internal Strategist Notes
                </label>
                {editingNotesId !== selectedAppointment.id && (
                  <button
                    onClick={() => {
                      setEditingNotesId(selectedAppointment.id);
                      setTempNotes(selectedAppointment.notes || '');
                    }}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Notes</span>
                  </button>
                )}
              </div>

              {editingNotesId === selectedAppointment.id ? (
                <div className="space-y-2">
                  <textarea
                    value={tempNotes}
                    onChange={(e) => setTempNotes(e.target.value)}
                    rows={3}
                    placeholder="Add audit notes, qualification details, or proposal status..."
                    className="w-full p-3 bg-slate-950 border border-cyan-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingNotesId(null)}
                      className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveNotes(selectedAppointment.id)}
                      className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono italic">
                  {selectedAppointment.notes || 'No internal notes added yet.'}
                </div>
              )}
            </div>

            {/* Delete button */}
            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => handleDelete(selectedAppointment.id)}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Appointment Record</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Manual Appointment Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <span>New Consultation Booking</span>
              </h3>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newForm.name}
                    onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Vardhan"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Business / Clinic Name</label>
                  <input
                    type="text"
                    value={newForm.businessName}
                    onChange={(e) => setNewForm({ ...newForm, businessName: e.target.value })}
                    placeholder="e.g. Vardhan Medical Care"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newForm.email}
                    onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                    placeholder="rajesh@clinic.com"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={newForm.phone}
                    onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
                    placeholder="+91 98450 12890"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Service Category</label>
                <select
                  value={newForm.serviceInterestedIn}
                  onChange={(e) => setNewForm({ ...newForm, serviceInterestedIn: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-cyan-400 focus:outline-none"
                >
                  {servicesList.map((srv, idx) => (
                    <option key={idx} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Date *</label>
                  <input
                    type="date"
                    required
                    value={newForm.preferredDate}
                    onChange={(e) => setNewForm({ ...newForm, preferredDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Time Slot</label>
                  <select
                    value={newForm.preferredTime}
                    onChange={(e) => setNewForm({ ...newForm, preferredTime: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-cyan-400 focus:outline-none font-mono"
                  >
                    <option>09:00 AM - 09:30 AM</option>
                    <option>10:00 AM - 10:30 AM</option>
                    <option>11:30 AM - 12:00 PM</option>
                    <option>02:00 PM - 02:30 PM</option>
                    <option>03:30 PM - 04:00 PM</option>
                    <option>05:00 PM - 05:30 PM</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Est. Value (₹)</label>
                  <input
                    type="number"
                    value={newForm.estimatedValue}
                    onChange={(e) => setNewForm({ ...newForm, estimatedValue: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Initial Discovery Message</label>
                <textarea
                  rows={2}
                  value={newForm.message}
                  onChange={(e) => setNewForm({ ...newForm, message: e.target.value })}
                  placeholder="Client requirements, goals, bottlenecks..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
                >
                  Add Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
