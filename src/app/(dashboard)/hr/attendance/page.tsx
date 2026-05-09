"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { CalendarDays, Clock, UserX, UserCheck, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { organicInteractions } from "@/lib/motion";

const ATTENDANCE_TREND = [
  { day: "01 May", present: 145, absent: 11 },
  { day: "02 May", present: 150, absent: 6 },
  { day: "03 May", present: 152, absent: 4 },
  { day: "04 May", present: 148, absent: 8 },
  { day: "05 May", present: 149, absent: 7 },
  { day: "06 May", present: 155, absent: 1 },
  { day: "07 May", present: 154, absent: 2 },
];

const LEAVE_REQUESTS = [
  { id: "LR-092", emp: "Neha Patel", type: "Sick Leave", dates: "12 May - 14 May", status: "Pending", days: 3 },
  { id: "LR-093", emp: "Vikram Sharma", type: "Casual Leave", dates: "15 May", status: "Approved", days: 1 },
  { id: "LR-094", emp: "Amitabh P.", type: "Earned Leave", dates: "20 May - 25 May", status: "Pending", days: 6 },
];

const HEATMAP_DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  status: Math.random() > 0.8 ? 'absent' : Math.random() > 0.9 ? 'late' : 'present'
}));

export default function HrAttendancePage() {
  const [currentMonth, setCurrentMonth] = useState("May 2026");

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Time & Attendance"
        description="Monitor workforce presence, manage leave requests, and analyze absence trends."
        breadcrumbs={[{ label: "HR & Payroll" }, { label: "Attendance" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Today's Presence", value: "92%", raw: "144/156", icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Absent Today", value: "12", raw: "8 Sick, 4 Unplanned", icon: UserX, color: "text-rose-500", bg: "bg-rose-500/10" },
          { label: "Late Arrivals", value: "5", raw: "Avg. 15 mins", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Pending Leaves", value: "14", raw: "Action Required", icon: CalendarDays, color: "text-indigo-500", bg: "bg-indigo-500/10" },
        ].map((stat, i) => (
          <div key={i} className="liquid-glass rounded-2xl p-5 border border-foreground/10 flex items-center justify-between">
            <div>
              <p className="text-muted text-xs uppercase tracking-wider mb-1 font-bold">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-sans font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted font-medium">{stat.raw}</p>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Heatmap Calendar */}
          <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-indigo-500" /> Department Heatmap
              </h2>
              <div className="flex items-center gap-4">
                <button className="p-1 hover:bg-foreground/5 rounded-md"><ChevronLeft className="w-5 h-5 text-muted" /></button>
                <span className="font-bold text-sm text-foreground w-24 text-center">{currentMonth}</span>
                <button className="p-1 hover:bg-foreground/5 rounded-md"><ChevronRight className="w-5 h-5 text-muted" /></button>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-bold text-muted uppercase">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 4 }).map((_, emptyIdx) => (
                  <div key={`empty-${emptyIdx}`} className="aspect-square rounded-xl bg-foreground/5 border border-foreground/5 opacity-50"></div>
                ))}
                {HEATMAP_DATA.map((day, idx) => (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    key={idx} 
                    className={`aspect-square rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-colors ${
                      day.status === 'present' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                      day.status === 'absent' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' :
                      'bg-amber-500/10 border-amber-500/20 text-amber-500'
                    }`}
                  >
                    <span className="text-sm font-bold">{day.day}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted"><div className="w-3 h-3 rounded-full bg-emerald-500/50"></div> Present (≥95%)</div>
                <div className="flex items-center gap-2 text-xs font-semibold text-muted"><div className="w-3 h-3 rounded-full bg-amber-500/50"></div> Late/Half-Day</div>
                <div className="flex items-center gap-2 text-xs font-semibold text-muted"><div className="w-3 h-3 rounded-full bg-rose-500/50"></div> High Absence</div>
              </div>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex-1 flex flex-col min-h-[250px]">
             <h2 className="text-sm font-bold text-foreground mb-4">7-Day Attendance Trend</h2>
             <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ATTENDANCE_TREND} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10 }} />
                  <Tooltip cursor={{ fill: 'var(--glass-border)' }} contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '12px', border: '1px solid var(--glass-border)' }} />
                  <Bar dataKey="present" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="absent" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Leave Requests Panel */}
        <div className="liquid-glass rounded-3xl border border-foreground/10 flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-foreground/10 bg-foreground/5">
            <h2 className="text-lg font-bold text-foreground">Leave Requests</h2>
            <p className="text-sm text-muted">Awaiting Manager Approval</p>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            {LEAVE_REQUESTS.map((req) => (
              <div key={req.id} className="p-4 rounded-2xl border border-foreground/10 bg-background hover:bg-foreground/5 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{req.emp}</h3>
                    <p className="text-xs text-indigo-500 font-semibold">{req.type} ({req.days} Days)</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    req.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {req.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted mb-4">
                  <CalendarIcon className="w-3.5 h-3.5" /> {req.dates}
                </div>
                {req.status === 'Pending' && (
                  <div className="grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="py-1.5 bg-emerald-500/10 text-emerald-500 font-bold text-xs rounded-lg hover:bg-emerald-500 hover:text-white transition-colors">Approve</button>
                    <button className="py-1.5 bg-rose-500/10 text-rose-500 font-bold text-xs rounded-lg hover:bg-rose-500 hover:text-white transition-colors">Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
