"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { LifeBuoy, AlertCircle, CheckCircle2, Clock, MessageSquare, Wrench, ArrowRight, Activity } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const TICKETS = [
  { id: "SRV-4012", client: "Tata Motors", title: "CNC Machine Calibration Issue", priority: "Critical", status: "Open", assignee: "Rahul D.", time: "2h ago", tags: ["Hardware", "Warranty"] },
  { id: "SRV-4013", client: "Reliance Industries", title: "API Endpoint Timeout during bulk sync", priority: "High", status: "Investigating", assignee: "Priya M.", time: "5h ago", tags: ["Software", "SLA-Breach-Risk"] },
  { id: "SRV-4014", client: "Adani Power", title: "Quarterly Preventive Maintenance", priority: "Low", status: "Scheduled", assignee: "Vikram S.", time: "1d ago", tags: ["Routine", "On-Site"] },
  { id: "SRV-4015", client: "Hindalco", title: "Replacement Parts Request (Bearings)", priority: "Medium", status: "Resolved", assignee: "Neha P.", time: "2d ago", tags: ["Logistics", "Fulfilled"] },
];

const COLUMNS = [
  { id: "Open", label: "Open Tickets", color: "border-rose-500/20", icon: AlertCircle, iconColor: "text-rose-500", glow: "bg-rose-500" },
  { id: "Investigating", label: "Investigating", color: "border-amber-500/20", icon: Activity, iconColor: "text-amber-500", glow: "bg-amber-500" },
  { id: "Scheduled", label: "Scheduled", color: "border-violet-500/20", icon: Clock, iconColor: "text-violet-500", glow: "bg-violet-500" },
  { id: "Resolved", label: "Resolved", color: "border-emerald-500/20", icon: CheckCircle2, iconColor: "text-emerald-500", glow: "bg-emerald-500" },
];

export default function SalesServicePage() {
  const [activeTicket, setActiveTicket] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="After-Sales & Service"
        description="Manage support tickets, warranty claims, and field service operations."
        breadcrumbs={[{ label: "Sales & Orders" }, { label: "Service" }]}
      />

      <div className="flex justify-between items-center bg-foreground/[0.03] p-2 rounded-2xl border border-[var(--glass-border)] liquid-glass mb-2">
        <div className="flex gap-2">
          <button className="px-5 py-2 bg-foreground text-background font-bold text-sm rounded-xl shadow-lg cursor-pointer">Kanban Board</button>
          <button className="px-5 py-2 bg-transparent text-muted hover:text-foreground hover:bg-foreground/[0.06] font-semibold text-sm rounded-xl transition-colors cursor-pointer">List View</button>
          <button className="px-5 py-2 bg-transparent text-muted hover:text-foreground hover:bg-foreground/[0.06] font-semibold text-sm rounded-xl transition-colors cursor-pointer">Analytics</button>
        </div>
        <motion.button
          whileHover={organicInteractions.hover}
          whileTap={organicInteractions.tap}
          className="px-5 py-2 bg-[var(--accent)] text-white font-bold text-sm rounded-xl shadow-lg glow-accent flex items-center gap-2 cursor-pointer"
        >
          <LifeBuoy className="w-4 h-4" /> New Ticket
        </motion.button>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto overflow-y-hidden pb-4">
        {COLUMNS.map((col) => (
          <div key={col.id} className={`liquid-glass rounded-3xl border flex flex-col h-full ${col.color}`}>
            <div className="p-4 border-b border-[var(--glass-border)] bg-foreground/[0.02] backdrop-blur-md rounded-t-3xl flex justify-between items-center">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2 tracking-tight">
                <col.icon className={`w-4 h-4 ${col.iconColor}`} /> {col.label}
              </h3>
              <span className="w-6 h-6 rounded-full bg-foreground/[0.06] border border-[var(--glass-border)] flex items-center justify-center text-xs font-bold text-foreground">
                {TICKETS.filter(t => t.status === col.id).length}
              </span>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              {TICKETS.filter(t => t.status === col.id).map(ticket => (
                <motion.div
                  layoutId={`ticket-${ticket.id}`}
                  onClick={() => setActiveTicket(ticket.id)}
                  whileHover={organicInteractions.hover}
                  whileTap={organicInteractions.tap}
                  key={ticket.id}
                  className="bg-background rounded-2xl p-4 border border-[var(--glass-border)] shadow-sm cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="micro-label font-mono">{ticket.id}</span>
                    <span className={`px-2 py-0.5 rounded-lg micro-label ${
                      ticket.priority === 'Critical' ? 'bg-rose-500/10 text-rose-500' :
                      ticket.priority === 'High' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-violet-500/10 text-violet-500'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-foreground mb-1 leading-tight">{ticket.title}</h4>
                  <p className="text-xs text-muted mb-4">{ticket.client}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {ticket.tags.map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 bg-foreground/[0.04] rounded text-[9px] font-semibold text-foreground/60 uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-[var(--glass-border)]">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center text-[10px] font-bold">
                        {ticket.assignee.charAt(0)}
                      </div>
                      <span className="text-[10px] font-semibold text-foreground/80">{ticket.assignee}</span>
                    </div>
                    <span className="text-[10px] text-muted flex items-center gap-1"><Clock className="w-3 h-3" /> {ticket.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Slide-out Modal */}
      <AnimatePresence>
        {activeTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-md flex justify-end"
            onClick={() => setActiveTicket(null)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={liquidSpringPhysics}
              className="w-full max-w-lg h-full liquid-glass-elevated border-l border-[var(--glass-border)] shadow-2xl p-6 overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {TICKETS.map(t => t.id === activeTicket && (
                <div key={t.id}>
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="font-mono text-[var(--accent)] font-bold mb-2">{t.id}</p>
                      <h2 className="text-2xl font-extrabold text-foreground tracking-tight mb-2">{t.title}</h2>
                      <p className="text-muted">{t.client}</p>
                    </div>
                    <motion.button
                      whileHover={organicInteractions.hover}
                      whileTap={organicInteractions.tap}
                      onClick={() => setActiveTicket(null)}
                      className="p-2 bg-foreground/[0.06] rounded-full hover:bg-foreground/[0.12] transition-colors cursor-pointer"
                    >
                      <ArrowRight className="w-5 h-5 text-foreground" />
                    </motion.button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-foreground/[0.03] rounded-2xl border border-[var(--glass-border)]">
                        <p className="micro-label mb-1">Status</p>
                        <p className="font-bold text-foreground">{t.status}</p>
                      </div>
                      <div className="p-4 bg-foreground/[0.03] rounded-2xl border border-[var(--glass-border)]">
                        <p className="micro-label mb-1">Priority</p>
                        <p className={`font-bold ${t.priority === 'Critical' ? 'text-rose-500' : 'text-amber-500'}`}>{t.priority}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-foreground mb-3 border-b border-[var(--glass-border)] pb-2 tracking-tight">Activity Timeline</h3>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-foreground/[0.06] flex items-center justify-center shrink-0 mt-1"><MessageSquare className="w-4 h-4 text-muted" /></div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">Client reported issue</p>
                            <p className="text-xs text-muted mb-1">&ldquo;Machine is showing Error Code E-402 on boot.&rdquo;</p>
                            <p className="micro-label">{t.time}</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0 mt-1"><Wrench className="w-4 h-4" /></div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">System auto-assigned</p>
                            <p className="text-xs text-muted mb-1">Ticket routed to {t.assignee} based on hardware skill tag.</p>
                            <p className="micro-label">10 mins ago</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={organicInteractions.hover}
                      whileTap={organicInteractions.tap}
                      className="w-full py-4 bg-[var(--accent)] text-white font-bold rounded-xl shadow-lg glow-accent mt-8 cursor-pointer"
                    >
                      Add Internal Note
                    </motion.button>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
