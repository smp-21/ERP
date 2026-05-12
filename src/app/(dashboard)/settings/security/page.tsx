"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { ShieldCheck, Key, Smartphone, Globe, AlertTriangle, Fingerprint, History } from "lucide-react";
import { organicInteractions } from "@/lib/motion";

const AUDIT_LOG = [
  { id: "LOG-01", event: "Successful Login", user: "Sarthak Patoliya", ip: "192.168.1.105", location: "Mumbai, IN", time: "10 mins ago", status: "Success" },
  { id: "LOG-02", event: "Failed Login Attempt", user: "Unknown", ip: "45.22.11.90", location: "Shenzhen, CN", time: "2 hrs ago", status: "Failed" },
  { id: "LOG-03", event: "Password Changed", user: "Rahul Desai", ip: "10.249.153.130", location: "Pune, IN", time: "5 hrs ago", status: "Success" },
  { id: "LOG-04", event: "API Key Generated", user: "Sarthak Patoliya", ip: "192.168.1.105", location: "Mumbai, IN", time: "1 day ago", status: "Warning" },
];

export default function SettingsSecurityPage() {
  const [mfaEnabled, setMfaEnabled] = useState(true);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Security & Access Control"
        description="Manage authentication policies, Two-Factor Authentication (2FA), and review audit logs."
        breadcrumbs={[{ label: "Settings" }, { label: "Security" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <motion.div className="liquid-glass rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--glass-border)]">
              <div className="p-2.5 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]"><ShieldCheck className="w-5 h-5" /></div>
              <div>
                <h2 className="text-lg font-extrabold text-foreground tracking-tight">Authentication Policy</h2>
                <p className="text-sm text-muted">Configure enterprise-wide login security.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-foreground/[0.04] flex items-center justify-center text-foreground"><Smartphone className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-semibold text-foreground">Two-Factor Authentication (2FA)</h3>
                    <p className="text-sm text-muted">Require TOTP or SMS code during login.</p>
                  </div>
                </div>
                <button
                  onClick={() => setMfaEnabled(!mfaEnabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${mfaEnabled ? 'bg-[var(--accent)]' : 'bg-foreground/20'}`}
                >
                  <motion.div
                    layout
                    className="w-4 h-4 rounded-full bg-white absolute top-1"
                    initial={false}
                    animate={{ left: mfaEnabled ? '26px' : '4px' }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-foreground/[0.04] flex items-center justify-center text-foreground"><Key className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-semibold text-foreground">Password Expiry</h3>
                    <p className="text-sm text-muted">Force password reset every 90 days.</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">Enforced</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-foreground/[0.04] flex items-center justify-center text-foreground"><Fingerprint className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-semibold text-foreground">Biometric Login</h3>
                    <p className="text-sm text-muted">Allow FaceID / TouchID on supported devices.</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-foreground/[0.04] hover:bg-foreground/[0.08] text-foreground text-xs font-bold rounded-xl transition-colors border border-[var(--glass-border)] cursor-pointer">Configure</button>
              </div>
            </div>
          </motion.div>

          <motion.div className="liquid-glass rounded-3xl p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--glass-border)]">
              <div className="p-2.5 rounded-xl bg-foreground/[0.04] text-foreground"><History className="w-5 h-5" /></div>
              <div>
                <h2 className="text-lg font-extrabold text-foreground tracking-tight">System Audit Log</h2>
                <p className="text-sm text-muted">Recent authentication events across the network.</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {AUDIT_LOG.map((log) => (
                <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)] glass-hover-row gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-2 h-2 rounded-full ${
                      log.status === 'Success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' :
                      log.status === 'Failed' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]' :
                      'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                    }`} />
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{log.event}</h4>
                      <p className="text-xs text-muted mt-0.5">{log.user}</p>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-1 w-full sm:w-auto text-xs">
                    <div className="flex items-center gap-1.5 text-muted font-mono bg-foreground/[0.03] px-2 py-0.5 rounded-md">
                      <Globe className="w-3 h-3" /> {log.ip}
                    </div>
                    <span className="text-muted">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6">
          <motion.div whileHover={organicInteractions.hover} className="liquid-glass rounded-3xl p-6 border border-rose-500/20 bg-rose-500/5 relative overflow-hidden group cursor-default">
            <div className="absolute top-0 right-0 p-4 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity"><AlertTriangle className="w-24 h-24 text-rose-500" /></div>
            <div className="relative z-10">
              <h2 className="text-lg font-extrabold text-rose-500 mb-2 tracking-tight">High Risk Alert</h2>
              <p className="text-sm text-rose-500/80 mb-6 font-medium">Multiple failed login attempts detected from a new IP block in the last 2 hours.</p>
              <motion.button
                whileHover={organicInteractions.hover}
                whileTap={organicInteractions.tap}
                className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-rose-500/20 cursor-pointer"
              >
                Review Threat Report
              </motion.button>
            </div>
          </motion.div>

          <motion.div className="liquid-glass rounded-3xl p-6 flex-1">
            <h2 className="micro-label mb-6">Active Sessions</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-[var(--accent)]/20 bg-[var(--accent)]/5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-sm text-foreground">Current Session</h4>
                  <span className="micro-label bg-[var(--accent)]/20 text-[var(--accent)] px-2 py-0.5 rounded-lg">Active</span>
                </div>
                <p className="text-xs text-muted mb-1">Mac OS • Chrome 124.0</p>
                <p className="text-xs font-mono text-muted tabular-nums">192.168.1.105 (Mumbai)</p>
              </div>

              <div className="p-4 rounded-xl border border-[var(--glass-border)] bg-foreground/[0.03]">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm text-foreground">iPhone 14 Pro</h4>
                  <button className="micro-label text-rose-500 hover:text-rose-600 cursor-pointer">Revoke</button>
                </div>
                <p className="text-xs text-muted mb-1">iOS 17 • Mobile App</p>
                <p className="text-xs font-mono text-muted">Last sync: 2 hours ago</p>
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 bg-foreground/[0.04] hover:bg-rose-500/10 text-rose-500 font-bold text-sm rounded-xl transition-colors border border-[var(--glass-border)] hover:border-rose-500/30 cursor-pointer">
              Revoke All Other Sessions
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
