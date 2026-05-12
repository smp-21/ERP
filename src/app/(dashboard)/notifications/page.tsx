"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { Bell, ShieldAlert, CheckCircle2, Info, Clock, MailOpen, Trash2, ArrowUpRight } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const NOTIFICATIONS = [
  { id: "n1", type: "critical", title: "API Webhook Failure", desc: "The webhook endpoint for invoice.created is returning 500.", time: "10m ago", read: false, sender: "System Daemon" },
  { id: "n2", type: "success", title: "Payroll Disbursed", desc: "Batch #MAY-2026 for 156 employees has been successfully processed.", time: "2h ago", read: false, sender: "Finance Auto" },
  { id: "n3", type: "warning", title: "High Memory Usage", desc: "Production Database instance memory crossed 90% threshold.", time: "5h ago", read: true, sender: "AWS CloudWatch" },
  { id: "n4", type: "info", title: "New Document Uploaded", desc: "Rahul Desai uploaded 'Q2_Tax_Filing_Draft.pdf' in Global Documents.", time: "1d ago", read: true, sender: "DocBot" },
  { id: "n5", type: "info", title: "System Maintenance", desc: "Scheduled downtime for ERP core upgrade on Sunday 2AM IST.", time: "2d ago", read: true, sender: "IT Ops" },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'critical': return <ShieldAlert className="w-5 h-5 text-rose-500" />;
    case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    case 'warning': return <Clock className="w-5 h-5 text-amber-500" />;
    case 'info': return <Info className="w-5 h-5 text-violet-500" />;
    default: return <Bell className="w-5 h-5 text-muted" />;
  }
};

export default function NotificationsPage() {
  const [activeNote, setActiveNote] = useState(NOTIFICATIONS[0].id);
  const activeData = NOTIFICATIONS.find(n => n.id === activeNote);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Alerts & Inbox"
        description="Centralized system notifications, errors, and automated reports."
        breadcrumbs={[{ label: "Global" }, { label: "Notifications" }]}
      />

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        {/* Left Sidebar: Notification List */}
        <div className="w-full md:w-96 liquid-glass rounded-3xl flex flex-col h-full overflow-hidden shrink-0">
          <div className="p-4 border-b border-[var(--glass-border)] bg-foreground/[0.02] flex items-center justify-between">
            <h2 className="font-bold text-foreground tracking-tight">Inbox</h2>
            <button className="micro-label text-[var(--accent)] hover:text-foreground transition-colors cursor-pointer">Mark all as read</button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {NOTIFICATIONS.map(note => (
              <button
                key={note.id}
                onClick={() => setActiveNote(note.id)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex gap-3 cursor-pointer ${
                  activeNote === note.id ? 'bg-foreground/[0.08] specular-edge' : 'hover:bg-foreground/[0.04]'
                }`}
              >
                <div className={`mt-0.5 p-2 rounded-xl shrink-0 ${
                  note.type === 'critical' ? 'bg-rose-500/10' :
                  note.type === 'success' ? 'bg-emerald-500/10' :
                  note.type === 'warning' ? 'bg-amber-500/10' : 'bg-violet-500/10'
                }`}>
                  {getIcon(note.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className={`font-semibold text-sm truncate ${!note.read ? 'text-foreground font-bold' : 'text-foreground/80'}`}>{note.title}</h3>
                    {!note.read && <div className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--glow-accent)] shrink-0 mt-1 ml-2"></div>}
                  </div>
                  <p className="text-xs text-muted truncate">{note.desc}</p>
                  <p className="micro-label mt-1.5">{note.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content: Notification Details */}
        <div className="flex-1 liquid-glass rounded-3xl flex flex-col overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeData ? (
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={liquidSpringPhysics}
                className="flex-1 flex flex-col"
              >
                <div className="p-6 border-b border-[var(--glass-border)] bg-foreground/[0.02] flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-extrabold text-foreground tracking-tight mb-2">{activeData.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted">
                      <span className="font-semibold text-foreground">From: {activeData.sender}</span>
                      <span>{activeData.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-xl bg-foreground/[0.04] border border-[var(--glass-border)] text-muted hover:text-foreground transition-colors cursor-pointer"><MailOpen className="w-4 h-4" /></button>
                    <button className="p-2 rounded-xl bg-foreground/[0.04] border border-[var(--glass-border)] text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="p-8 flex-1 overflow-y-auto">
                  <div className="max-w-2xl text-foreground/80 space-y-4">
                    <p className="text-base leading-relaxed">{activeData.desc}</p>

                    {activeData.type === 'critical' && (
                      <div className="mt-8 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-sm">
                        <p className="font-mono text-rose-500 font-semibold mb-2">Error Log Snippet:</p>
                        <pre className="p-3 bg-[#0a0a0a] text-rose-300 rounded-xl overflow-x-auto text-xs font-mono">
                          {`[ERROR] 2026-05-09T10:15:22Z
POST /webhook/invoice
Status: 500 Internal Server Error
Response: "Database connection timed out during execution"`}
                        </pre>
                        <motion.button
                          whileHover={organicInteractions.hover}
                          whileTap={organicInteractions.tap}
                          className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-500/20 flex items-center gap-2 cursor-pointer"
                        >
                          View Full Logs <ArrowUpRight className="w-3 h-3" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted flex-col gap-4">
                <Bell className="w-12 h-12 opacity-20" />
                <p className="text-sm font-medium">Select a notification to read</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
