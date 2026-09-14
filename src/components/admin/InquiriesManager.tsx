'use client';

import React, { useState, useMemo } from 'react';
import { 
  Inquiry, 
  adminStore 
} from '../../services/adminStore';
import { 
  Inbox, 
  Search, 
  MessageSquare, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Trash2, 
  Edit3, 
  DollarSign, 
  Sparkles, 
  Check, 
  XCircle,
  X,
  PlusCircle
} from 'lucide-react';

interface InquiriesManagerProps {
  inquiries: Inquiry[];
  onRefresh: () => void;
  onConvertToAppointment: (inquiry: Inquiry) => void;
}

export const InquiriesManager: React.FC<InquiriesManagerProps> = ({
  inquiries,
  onRefresh,
  onConvertToAppointment,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');

  const filtered = useMemo(() => {
    return inquiries.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.serviceOrDemo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.city ? item.city.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
        (item.requirement ? item.requirement.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
        (item.schoolName ? item.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
        (item.address ? item.address.toLowerCase().includes(searchQuery.toLowerCase()) : false);

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [inquiries, searchQuery, statusFilter]);

  const handleStatusChange = (id: string, newStatus: Inquiry['status']) => {
    adminStore.updateInquiryStatus(id, newStatus);
    onRefresh();
  };

  const handleSaveNotes = (id: string) => {
    adminStore.updateInquiryStatus(id, inquiries.find(i => i.id === id)!.status, tempNotes);
    setEditingNotesId(null);
    onRefresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this lead inquiry?')) {
      adminStore.deleteInquiry(id);
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
      onRefresh();
    }
  };

  const getStatusBadge = (status: Inquiry['status']) => {
    switch (status) {
      case 'new':
        return <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800/60 font-semibold animate-pulse">New Lead</span>;
      case 'contacted':
        return <span className="text-xs font-mono text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800/60 font-semibold">Contacted</span>;
      case 'qualified':
        return <span className="text-xs font-mono text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-800/60 font-semibold">Qualified</span>;
      case 'converted':
        return <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/60 font-semibold">Converted</span>;
      case 'closed':
        return <span className="text-xs font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-800/60">Closed</span>;
    }
  };

  const getSourceBadge = (source: Inquiry['source']) => {
    switch (source) {
      case 'Intake Form':
        return <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-700/60 font-semibold">Intake Form</span>;
      case 'Submit Request':
        return <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-700/60 font-semibold">Submit Request</span>;
      case 'School Software Enquiry':
        return <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/60 font-semibold flex items-center gap-1">🏫 Free School ERP</span>;
      case 'Google Form':
        return <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/60 font-semibold">Google Form</span>;
      case 'Quick Modal':
        return <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">Quick Modal</span>;
      case 'Contact Form':
        return <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Contact Page</span>;
      case 'Demo Page':
        return <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">Demo Showcase</span>;
      case 'WhatsApp Direct':
        return <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">WhatsApp Inbound</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-2.5">
            <Inbox className="w-6 h-6 text-purple-400" />
            <span>Inbound Leads & Inquiry Pipeline</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time messages from quick modals, contact submissions, and demo requests.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, email, phone, message keywords..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-colors"
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

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {['all', 'new', 'contacted', 'qualified', 'converted', 'closed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer capitalize ${
                statusFilter === st
                  ? 'bg-purple-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className={`${selectedInquiry ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-3`}>
          {filtered.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Inquiries Found</h3>
              <p className="text-xs text-slate-400">
                Adjust search keywords or filter criteria.
              </p>
            </div>
          ) : (
            filtered.map((item) => {
              const isSelected = selectedInquiry?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedInquiry(item)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer text-left space-y-3 ${
                    isSelected
                      ? 'bg-slate-900 border-purple-500 shadow-xl shadow-purple-950/30'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-[1px] shrink-0">
                        <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-heading font-extrabold text-xs text-purple-300">
                          {item.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{item.name}</span>
                          {getSourceBadge(item.source)}
                        </h4>
                        <span className="text-xs text-purple-300 font-mono block">
                          Interested in: {item.serviceOrDemo}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusBadge(item.status)}
                    </div>
                  </div>

                  {item.schoolName && (
                    <div className="flex flex-wrap items-center gap-2 text-xs text-amber-300 bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-500/30">
                      <span className="font-bold">🏫 {item.schoolName}</span>
                      {item.studentCount && (
                        <span className="text-[11px] text-amber-400 font-mono bg-amber-900/60 px-2 py-0.5 rounded border border-amber-600/30">
                          👥 {item.studentCount}
                        </span>
                      )}
                      {item.boardOrAffiliation && (
                        <span className="text-[11px] text-amber-200 font-mono bg-slate-900 px-2 py-0.5 rounded">
                          {item.boardOrAffiliation}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-mono">
                    <span className="text-cyan-300 font-bold">{item.phone}</span>
                    {item.age && (
                      <>
                        <span>•</span>
                        <span className="text-white bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">Age: {item.age}</span>
                      </>
                    )}
                    {item.city && (
                      <>
                        <span>•</span>
                        <span className="text-slate-300">📍 {item.city}</span>
                      </>
                    )}
                    <span>•</span>
                    <span className="truncate max-w-[180px]">{item.email}</span>
                    {item.budget && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-400">Budget: {item.budget}</span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 line-clamp-2">
                    &quot;{item.message}&quot;
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Right Inspection Drawer */}
        {selectedInquiry && (
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 sticky top-36 h-fit shadow-2xl animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">
                  Inquiry Inspection
                </span>
                <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                  {selectedInquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Contact Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {/* WhatsApp Action */}
              <a
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  selectedInquiry.schoolName
                    ? `Hello ${selectedInquiry.name}, this is Digital Simple Solution. We received your enquiry for ${selectedInquiry.schoolName} regarding Free School Management Software (Worth ₹30,000). We are excited to schedule your free setup & demo!`
                    : `Hello ${selectedInquiry.name}, this is Digital Simple Solution. We received your inquiry regarding ${selectedInquiry.serviceOrDemo}. We would love to share a quick roadmap!`
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
                href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                  `Inquiry Response: ${selectedInquiry.schoolName ? `${selectedInquiry.schoolName} - Free School ERP` : selectedInquiry.serviceOrDemo} - Digital Simple Solution`
                )}&body=${encodeURIComponent(
                  `Hello ${selectedInquiry.name},\n\nThank you for reaching out regarding ${selectedInquiry.schoolName || selectedInquiry.serviceOrDemo}.\n\nBest regards,\nDigital Simple Solution Team`
                )}`}
                className="p-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex flex-col items-center gap-1 transition-all"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Email</span>
              </a>

              {/* Phone Action */}
              <a
                href={`tel:${selectedInquiry.phone}`}
                className="p-2.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex flex-col items-center gap-1 transition-all"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call Client</span>
              </a>
            </div>

            {/* School Institution Specific Details (If School Inquiry) */}
            {selectedInquiry.schoolName && (
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                  <span className="font-mono text-amber-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    🏫 School Institution Details
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/40 font-bold">
                    Worth ₹30,000 Free
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-amber-900/40">
                  <span className="text-slate-400">School Name:</span>
                  <strong className="text-white font-bold">{selectedInquiry.schoolName}</strong>
                </div>
                {selectedInquiry.studentCount && (
                  <div className="flex justify-between py-1 border-b border-amber-900/40">
                    <span className="text-slate-400">Total Students:</span>
                    <span className="text-amber-300 font-mono font-bold">{selectedInquiry.studentCount}</span>
                  </div>
                )}
                {selectedInquiry.address && (
                  <div className="py-1 border-b border-amber-900/40">
                    <span className="text-slate-400 block mb-0.5">School Address:</span>
                    <span className="text-slate-200 leading-relaxed">{selectedInquiry.address}</span>
                  </div>
                )}
                {selectedInquiry.boardOrAffiliation && (
                  <div className="flex justify-between py-1 border-b border-amber-900/40">
                    <span className="text-slate-400">Affiliation / Board:</span>
                    <span className="text-slate-200 font-mono">{selectedInquiry.boardOrAffiliation}</span>
                  </div>
                )}
                {selectedInquiry.otherSchoolInfo && (
                  <div className="py-1">
                    <span className="text-slate-400 block mb-0.5">Other School Info & Requirements:</span>
                    <div className="text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-amber-500/20 leading-relaxed font-sans">
                      {selectedInquiry.otherSchoolInfo}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Inquiry Details */}
            <div className="space-y-3 text-xs bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Target Offering:</span>
                <strong className="text-white font-medium">{selectedInquiry.serviceOrDemo}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Phone:</span>
                <span className="text-cyan-300 font-mono">{selectedInquiry.phone}</span>
              </div>
              {selectedInquiry.age && (
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Age:</span>
                  <span className="text-white font-mono">{selectedInquiry.age} years</span>
                </div>
              )}
              {selectedInquiry.city && (
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Location / City:</span>
                  <span className="text-slate-200">{selectedInquiry.city}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Email:</span>
                <span className="text-slate-200 font-mono truncate max-w-[200px]">{selectedInquiry.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Capture Channel:</span>
                <span className="text-indigo-300">{selectedInquiry.source}</span>
              </div>
              {selectedInquiry.budget && (
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Client Budget / Value:</span>
                  <span className="text-emerald-400 font-bold">{selectedInquiry.budget}</span>
                </div>
              )}
              <div className="py-2">
                <span className="text-slate-400 block mb-1">Full Message:</span>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed font-sans">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            {/* Convert to Appointment Button */}
            <button
              onClick={() => onConvertToAppointment(selectedInquiry)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:opacity-90 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Convert Lead to Scheduled Consultation</span>
            </button>

            {/* Status Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Update Lead Qualification Status
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['new', 'contacted', 'qualified', 'converted', 'closed'] as Inquiry['status'][]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedInquiry.id, st)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-mono font-semibold capitalize transition-all cursor-pointer ${
                      selectedInquiry.status === st
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Lead Qualification Notes
                </label>
                {editingNotesId !== selectedInquiry.id && (
                  <button
                    onClick={() => {
                      setEditingNotesId(selectedInquiry.id);
                      setTempNotes(selectedInquiry.notes || '');
                    }}
                    className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1 font-mono"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Notes</span>
                  </button>
                )}
              </div>

              {editingNotesId === selectedInquiry.id ? (
                <div className="space-y-2">
                  <textarea
                    value={tempNotes}
                    onChange={(e) => setTempNotes(e.target.value)}
                    rows={3}
                    placeholder="Add follow-up notes, client fit assessment..."
                    className="w-full p-3 bg-slate-950 border border-purple-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingNotesId(null)}
                      className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveNotes(selectedInquiry.id)}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono italic">
                  {selectedInquiry.notes || 'No qualification notes recorded.'}
                </div>
              )}
            </div>

            {/* Delete button */}
            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => handleDelete(selectedInquiry.id)}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead Record</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
