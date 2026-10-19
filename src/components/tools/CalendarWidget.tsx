'use client';

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Sparkles,
  CalendarCheck2,
  CalendarDays
} from 'lucide-react';
import Link from 'next/link';

interface Holiday {
  date: string; // MM-DD format
  name: string;
  type: 'national' | 'festival' | 'observance';
}

const INDIAN_HOLIDAYS_MAP: Record<string, string> = {
  '01-01': "New Year's Day",
  '01-14': 'Makar Sankranti / Pongal',
  '01-26': 'Republic Day (National Holiday)',
  '03-08': 'Maha Shivratri',
  '03-25': 'Holi (Festival of Colours)',
  '04-09': 'Ugadi / Gudi Padwa',
  '04-11': 'Eid-ul-Fitr',
  '04-14': 'Ambedkar Jayanti',
  '04-17': 'Ram Navami',
  '04-21': 'Mahavir Jayanti',
  '05-01': 'Maharashtra Day / Labour Day',
  '05-23': 'Buddha Purnima',
  '06-17': 'Bakrid / Eid al-Adha',
  '07-17': 'Muharram',
  '08-15': 'Independence Day (National Holiday)',
  '08-19': 'Raksha Bandhan',
  '08-26': 'Janmashtami',
  '09-07': 'Ganesh Chaturthi',
  '10-02': 'Gandhi Jayanti (National Holiday)',
  '10-12': 'Dussehra / Vijayadashami',
  '10-31': 'Diwali / Deepavali',
  '11-01': 'Kannada Rajyotsava',
  '11-15': 'Guru Nanak Jayanti',
  '12-25': 'Christmas Day',
};

export const CalendarWidget: React.FC = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(now);
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const getHolidayForDate = (date: Date) => {
    const monthStr = String(date.getMonth() + 1).padStart(2, '0');
    const dayStr = String(date.getDate()).padStart(2, '0');
    const key = `${monthStr}-${dayStr}`;
    return INDIAN_HOLIDAYS_MAP[key] || null;
  };

  const selectedDateHoliday = getHolidayForDate(selectedDate);
  const isSelectedDatePast = selectedDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const selectedDateIso = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

  return (
    <div className="w-full text-left font-sans space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-850 pb-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-white font-bold">
          <CalendarIcon className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-sm uppercase tracking-wider">Executive Scheduling Calendar</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToday}
            className="px-2.5 py-1 text-[11px] font-mono uppercase bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            Today
          </button>
          <div className="flex items-center border border-zinc-800 bg-zinc-950">
            <button
              onClick={handlePrevMonth}
              title="Previous Month"
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 font-mono text-xs font-bold text-white min-w-[130px] text-center uppercase tracking-wider">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={handleNextMonth}
              title="Next Month"
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 7-Column Month Grid */}
        <div className="lg:col-span-8 bg-zinc-950 border border-zinc-800 p-4 sm:p-5">
          {/* Day of Week Labels */}
          <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] sm:text-xs uppercase text-zinc-500 font-bold pb-2 border-b border-zinc-850 mb-2">
            {dayLabels.map((lbl, idx) => (
              <div key={lbl} className={idx === 0 || idx === 6 ? 'text-zinc-600' : ''}>
                {lbl}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5 font-mono text-xs">
            {/* Prev month fill */}
            {Array.from({ length: firstDayIndex }).map((_, i) => {
              const prevDate = daysInPrevMonth - firstDayIndex + i + 1;
              return (
                <div
                  key={`prev-${i}`}
                  className="min-h-[44px] sm:min-h-[50px] p-1 flex items-center justify-center text-zinc-700 opacity-40 select-none"
                >
                  {prevDate}
                </div>
              );
            })}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateObj = new Date(year, month, dayNum);
              const isToday = isSameDay(dateObj, today);
              const isSelected = isSameDay(dateObj, selectedDate);
              const holiday = getHolidayForDate(dateObj);
              const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;

              return (
                <button
                  key={`cur-${dayNum}`}
                  onClick={() => setSelectedDate(dateObj)}
                  className={`min-h-[44px] sm:min-h-[50px] p-1.5 border flex flex-col items-center justify-between transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-white text-black border-white font-extrabold shadow-lg z-10'
                      : isToday
                      ? 'bg-zinc-900 text-emerald-400 border-emerald-500 font-bold'
                      : 'bg-zinc-950/80 hover:bg-zinc-900 border-zinc-850 text-zinc-200'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{dayNum}</span>

                  {/* Indicators */}
                  <div className="flex items-center gap-1">
                    {holiday && (
                      <span
                        title={holiday}
                        className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-black' : 'bg-amber-400 animate-pulse'}`}
                      />
                    )}
                    {isToday && !isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    )}
                    {isWeekend && !isSelected && (
                      <span className="text-[8px] text-zinc-600">·</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Grid Footer Notes */}
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-zinc-400 pt-3 mt-3 border-t border-zinc-900">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Today</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Gazetted Holiday</span>
              </span>
            </div>
            <span>TIMEZONE: ASIA/KOLKATA (IST)</span>
          </div>
        </div>

        {/* Right: Selected Date Dossier */}
        <div className="lg:col-span-4 bg-zinc-950 border border-zinc-800 p-5 space-y-4 font-mono text-xs text-left">
          <div className="border-b border-zinc-850 pb-3">
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
              SELECTED DATE SPEC
            </span>
            <div className="text-lg font-bold text-white font-heading mt-0.5">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </div>

          {/* Holiday Alert */}
          {selectedDateHoliday ? (
            <div className="p-3 bg-amber-950/20 border border-amber-800/60 text-amber-300 space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-bold block flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Public Holiday / Observance</span>
              </span>
              <div className="font-semibold text-white">{selectedDateHoliday}</div>
            </div>
          ) : (
            <div className="p-3 bg-zinc-900/60 border border-zinc-800 text-zinc-300 space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block flex items-center gap-1">
                <CalendarCheck2 className="w-3.5 h-3.5" />
                <span>Standard Dispatch Operations</span>
              </span>
              <div className="text-zinc-400 text-[11px]">
                Engineering teams active: 09:00 - 19:00 IST. WhatsApp AI automated 24/7.
              </div>
            </div>
          )}

          {/* Dispatch Timetable */}
          <div className="space-y-2 border-t border-zinc-900 pt-3">
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
              AVAILABLE CONSULTATION WINDOWS:
            </span>
            <div className="space-y-1.5 text-[11px] text-zinc-300">
              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-400">10:30 - 11:15 IST</span>
                <span className="text-emerald-400 font-semibold">SLOT OPEN</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-400">14:00 - 14:45 IST</span>
                <span className="text-emerald-400 font-semibold">SLOT OPEN</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-400">16:30 - 17:15 IST</span>
                <span className="text-zinc-500">RESERVED</span>
              </div>
            </div>
          </div>

          {/* Direct Booking CTA */}
          <div className="pt-2">
            <Link
              href={`/schedule-meeting?date=${selectedDateIso}`}
              className="w-full min-h-[48px] px-4 py-3 bg-white text-black font-mono text-xs uppercase font-extrabold flex items-center justify-between hover:bg-zinc-200 transition-colors active:scale-[0.98]"
            >
              <span>Book For This Date</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
