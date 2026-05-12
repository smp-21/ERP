"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import {
  AlertTriangle, Truck, Globe, Clock, Shield, Zap, MapPin,
  ArrowUpRight, TrendingDown, Package, ChevronRight
} from "lucide-react";
import { organicInteractions, liquidSpringPhysics, snappySpring, glassPanelVariants, childItemVariants } from "@/lib/motion";

// =============================================
// Disruption Radar Data
// =============================================
interface DisruptionAlert {
  id: string;
  corridor: string;
  origin: string;
  destination: string;
  carrier: string;
  severity: "critical" | "warning" | "watch";
  delayDays: number;
  reason: string;
  affectedPOs: string[];
  impact: number; // ₹ lakhs
}

const DISRUPTION_ALERTS: DisruptionAlert[] = [
  { id: "DIS-001", corridor: "Shanghai → Mumbai", origin: "Shanghai, CN", destination: "JNPT, Mumbai", carrier: "Maersk Line", severity: "critical", delayDays: 14, reason: "Port congestion at Shanghai — vessel queue 8 days", affectedPOs: ["PO-8821", "PO-8834"], impact: 4.2 },
  { id: "DIS-002", corridor: "Pune → Jamshedpur", origin: "Pune, MH", destination: "Jamshedpur, JH", carrier: "VRL Logistics", severity: "warning", delayDays: 3, reason: "NH-48 highway flooding in Kolhapur district", affectedPOs: ["PO-8840"], impact: 1.8 },
  { id: "DIS-003", corridor: "Shenzhen → Delhi", origin: "Shenzhen, CN", destination: "IGI Cargo, Delhi", carrier: "FedEx Air", severity: "watch", delayDays: 1, reason: "Customs clearance delay — HSN documentation mismatch", affectedPOs: ["PO-8842"], impact: 0.45 },
  { id: "DIS-004", corridor: "Ahmedabad → Chennai", origin: "Ahmedabad, GJ", destination: "Chennai, TN", carrier: "Gati", severity: "warning", delayDays: 5, reason: "Vehicle breakdown en route — replacement dispatched", affectedPOs: ["PO-8845", "PO-8846"], impact: 2.1 },
];

const RADAR_DATA = [
  { axis: "Sea Freight", risk: 85, baseline: 30 },
  { axis: "Road Logistics", risk: 55, baseline: 30 },
  { axis: "Air Cargo", risk: 25, baseline: 30 },
  { axis: "Customs", risk: 40, baseline: 30 },
  { axis: "Warehousing", risk: 20, baseline: 30 },
  { axis: "Last Mile", risk: 35, baseline: 30 },
];

function getSeverityCfg(sev: string) {
  switch(sev) {
    case "critical": return { color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", dot: "bg-rose-500", glow: "shadow-[0_0_16px_rgba(244,63,94,0.3)]" };
    case "warning": return { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", dot: "bg-amber-500", glow: "shadow-[0_0_12px_rgba(245,158,11,0.2)]" };
    case "watch": return { color: "text-sky-500", bg: "bg-sky-500/10", border: "border-sky-500/20", dot: "bg-sky-500", glow: "" };
    default: return { color: "", bg: "", border: "", dot: "", glow: "" };
  }
}

export default function DispatchDisruptionPage() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(DISRUPTION_ALERTS[0].id);
  const activeAlert = DISRUPTION_ALERTS.find(a => a.id === selectedAlert);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Supply Chain Disruption Radar"
        description="Real-time corridor monitoring for inbound logistics delays and disruption severity analysis."
        breadcrumbs={[{ label: "Inventory" }, { label: "Dispatch" }]}
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span className="micro-label text-rose-500">1 Critical</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="micro-label text-amber-500">2 Warning</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20">
              <span className="micro-label text-sky-500">1 Watch</span>
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <motion.div
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="liquid-glass rounded-3xl p-6"
        >
          <h2 className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-[var(--accent)]" /> Risk Radar
          </h2>
          <p className="text-sm text-muted mb-6">Multi-axis disruption severity across logistics channels</p>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={RADAR_DATA}>
                <PolarGrid stroke="var(--glass-border)" />
                <PolarAngleAxis dataKey="axis" tick={{ fill: 'var(--muted)', fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Risk Level" dataKey="risk" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.15} strokeWidth={2} dot={{ r: 4, fill: "#f43f5e" }} />
                <Radar name="Baseline" dataKey="baseline" stroke="#818cf8" fill="#818cf8" fillOpacity={0.05} strokeWidth={1.5} strokeDasharray="4 3" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="liquid-glass-elevated rounded-xl p-3 shadow-xl text-sm">
                          <p className="font-sans font-bold text-foreground mb-1">{payload[0]?.payload?.axis}</p>
                          <p className="font-mono text-rose-500">Risk: {payload[0]?.value}%</p>
                          <p className="font-mono text-[var(--accent)]">Baseline: {payload[1]?.value}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted">
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Current Risk</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] opacity-60" /> Normal Baseline</span>
          </div>
        </motion.div>

        {/* Active Disruption Feed */}
        <motion.div
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 liquid-glass rounded-3xl p-6 flex flex-col"
        >
          <h2 className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-rose-500" /> Active Disruptions
          </h2>

          <div className="flex-1 space-y-3 overflow-y-auto scrollbar-hide">
            {DISRUPTION_ALERTS.map((alert, idx) => {
              const cfg = getSeverityCfg(alert.severity);
              const isActive = selectedAlert === alert.id;

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, ...snappySpring }}
                  onClick={() => setSelectedAlert(isActive ? null : alert.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all group ${cfg.border} ${isActive ? `${cfg.bg} ${cfg.glow} ring-1 ring-offset-0` : 'hover:bg-foreground/[0.03]'}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`w-3 h-3 rounded-full ${cfg.dot}`} />
                        {alert.severity === "critical" && (
                          <div className={`absolute inset-0 w-3 h-3 rounded-full ${cfg.dot} animate-ping opacity-40`} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm">{alert.corridor}</h4>
                        <span className="font-mono text-xs text-muted">{alert.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-lg micro-label border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-rose-500 font-mono font-bold text-sm">+{alert.delayDays}d</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted mb-3">{alert.reason}</p>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-1 border-t border-[var(--glass-border)] grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                            <p className="micro-label flex items-center gap-1"><Truck className="w-3 h-3" /> Carrier</p>
                            <p className="text-sm font-bold text-foreground mt-1">{alert.carrier}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                            <p className="micro-label flex items-center gap-1"><TrendingDown className="w-3 h-3" /> ₹ Impact</p>
                            <p className="text-sm font-extrabold text-rose-500 mt-1 font-mono">₹{alert.impact}L</p>
                          </div>
                          <div className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                            <p className="micro-label flex items-center gap-1"><MapPin className="w-3 h-3" /> Origin</p>
                            <p className="text-sm font-bold text-foreground mt-1">{alert.origin}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                            <p className="micro-label flex items-center gap-1"><MapPin className="w-3 h-3" /> Destination</p>
                            <p className="text-sm font-bold text-foreground mt-1">{alert.destination}</p>
                          </div>
                        </div>

                        <div className="mt-3 p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                          <p className="micro-label mb-2 flex items-center gap-1"><Package className="w-3 h-3" /> Affected POs</p>
                          <div className="flex flex-wrap gap-2">
                            {alert.affectedPOs.map(po => (
                              <span key={po} className="px-2 py-1 bg-foreground/[0.04] border border-[var(--glass-border)] rounded-lg text-xs font-mono font-bold text-foreground">{po}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-end mt-2">
                    <ChevronRight className={`w-4 h-4 text-muted transition-transform ${isActive ? 'rotate-90' : ''}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
