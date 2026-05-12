"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import {
  AlertTriangle, CheckCircle2, Shield, Search, Eye, FileText,
  IndianRupee, AlertOctagon, Copy, Hash, Calendar, ChevronRight, Zap
} from "lucide-react";
import { organicInteractions, snappySpring, glassPanelVariants, childItemVariants, liquidSpringPhysics } from "@/lib/motion";

interface Anomaly {
  id: string;
  type: "duplicate_invoice" | "gst_mismatch" | "amount_variance" | "date_anomaly";
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  documents: string[];
  amount: number;
  detectedAt: string;
  resolution: string;
  status: "unresolved" | "reviewing" | "resolved";
}

const ANOMALIES: Anomaly[] = [
  {
    id: "ANM-001", type: "duplicate_invoice", severity: "critical",
    title: "Duplicate Invoice Detected — Alpha Metals Corp",
    description: "Invoice #INV-AMC-2026-0087 appears twice in the payables queue with identical amounts. Second entry created 3 days after original.",
    documents: ["INV-AMC-2026-0087 (Original)", "INV-AMC-2026-0087 (Duplicate)"],
    amount: 520000, detectedAt: "2h ago",
    resolution: "Void duplicate entry and flag vendor for duplicate submission pattern.",
    status: "unresolved",
  },
  {
    id: "ANM-002", type: "gst_mismatch", severity: "critical",
    title: "GST Rate Mismatch — HSN 8482 (Ball Bearings)",
    description: "Vendor charged 28% GST on HSN 8482 (Ball Bearings). Correct rate per schedule is 18%. Excess tax collected: ₹52,000.",
    documents: ["PO-8821", "Vendor Invoice #VNV-GL-445"],
    amount: 52000, detectedAt: "6h ago",
    resolution: "Raise credit note request to vendor. Update GST rate in master catalog.",
    status: "unresolved",
  },
  {
    id: "ANM-003", type: "amount_variance", severity: "warning",
    title: "Amount Variance — PO vs Invoice (>5%)",
    description: "Invoice amount ₹3,85,000 exceeds PO value ₹3,60,000 by ₹25,000 (6.9% variance). Threshold breach requires 3-way match review.",
    documents: ["PO-8834", "INV-OP-2026-112", "GRN-2026-089"],
    amount: 25000, detectedAt: "1d ago",
    resolution: "Initiate 3-way match: PO → GRN → Invoice. Escalate to finance head if unresolved.",
    status: "reviewing",
  },
  {
    id: "ANM-004", type: "date_anomaly", severity: "warning",
    title: "Backdated Invoice — Secure Packaging",
    description: "Invoice dated 28 Mar 2026 received on 10 May 2026 (43 days after invoice date). May impact ITC claim for Q4.",
    documents: ["INV-SP-2026-031"],
    amount: 42000, detectedAt: "12h ago",
    resolution: "Verify if ITC is still claimable. If not, charge to vendor or expense.",
    status: "unresolved",
  },
  {
    id: "ANM-005", type: "gst_mismatch", severity: "info",
    title: "GSTIN Validation — New Vendor Registration",
    description: "GSTIN 27AABCT1234A1Z5 for TechServe India returns 'Cancelled' status on government portal. Vendor may have switched GST registration.",
    documents: ["Vendor Registration — TechServe India"],
    amount: 0, detectedAt: "3d ago",
    resolution: "Request updated GSTIN from vendor before processing any payments.",
    status: "resolved",
  },
];

function getAnomalyConfig(type: string) {
  switch(type) {
    case "duplicate_invoice": return { label: "Duplicate Invoice", icon: Copy, color: "text-rose-500" };
    case "gst_mismatch": return { label: "GST Mismatch", icon: Hash, color: "text-amber-500" };
    case "amount_variance": return { label: "Amount Variance", icon: IndianRupee, color: "text-violet-500" };
    case "date_anomaly": return { label: "Date Anomaly", icon: Calendar, color: "text-sky-500" };
    default: return { label: "", icon: AlertTriangle, color: "" };
  }
}

function getSeverityCfg(severity: string) {
  switch(severity) {
    case "critical": return { label: "Critical", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", glow: "shadow-[0_0_16px_rgba(244,63,94,0.25)]", highlight: "border-l-4 border-l-rose-500" };
    case "warning": return { label: "Warning", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", glow: "shadow-[0_0_12px_rgba(245,158,11,0.2)]", highlight: "border-l-4 border-l-amber-500" };
    case "info": return { label: "Info", color: "text-sky-500", bg: "bg-sky-500/10", border: "border-sky-500/20", glow: "", highlight: "border-l-4 border-l-sky-500" };
    default: return { label: "", color: "", bg: "", border: "", glow: "", highlight: "" };
  }
}

function getStatusCfg(status: string) {
  switch(status) {
    case "unresolved": return { label: "Unresolved", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" };
    case "reviewing": return { label: "Reviewing", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    case "resolved": return { label: "Resolved", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
    default: return { label: "", color: "", bg: "", border: "" };
  }
}

export default function AnomalyDetectionPage() {
  const [selectedAnomaly, setSelectedAnomaly] = useState(ANOMALIES[0].id);
  const activeAnomaly = ANOMALIES.find(a => a.id === selectedAnomaly)!;
  const acfg = getAnomalyConfig(activeAnomaly.type);
  const scfg = getSeverityCfg(activeAnomaly.severity);
  const stcfg = getStatusCfg(activeAnomaly.status);

  const unresolvedCount = ANOMALIES.filter(a => a.status === "unresolved").length;
  const totalExposure = ANOMALIES.filter(a => a.status !== "resolved").reduce((s, a) => s + a.amount, 0);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Automated Anomaly Detection"
        description="AI-powered pre-filing compliance checks. Flags duplicate invoices, GST mismatches, and amount variances."
        breadcrumbs={[{ label: "Finance" }, { label: "Reports" }]}
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <AlertOctagon className="w-4 h-4 text-rose-500" />
              <span className="micro-label text-rose-500">{unresolvedCount} Unresolved</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-foreground/[0.04] border border-[var(--glass-border)]">
              <IndianRupee className="w-4 h-4 text-muted" />
              <span className="micro-label text-foreground">₹{(totalExposure / 1000).toFixed(0)}K Exposure</span>
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Anomaly List */}
        <motion.div className="lg:col-span-2 liquid-glass rounded-3xl p-6 flex flex-col h-[600px]">
          <h2 className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-[var(--accent)]" /> Flagged Transactions
          </h2>

          <div className="flex-1 space-y-3 overflow-y-auto scrollbar-hide">
            {ANOMALIES.map((anomaly, idx) => {
              const acf = getAnomalyConfig(anomaly.type);
              const scf = getSeverityCfg(anomaly.severity);
              const stf = getStatusCfg(anomaly.status);
              const isActive = selectedAnomaly === anomaly.id;
              const AIcon = acf.icon;

              return (
                <motion.div
                  key={anomaly.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, ...snappySpring }}
                  onClick={() => setSelectedAnomaly(anomaly.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all ${scf.highlight} ${
                    isActive ? `${scf.bg} ${scf.glow}` : 'bg-foreground/[0.01] hover:bg-foreground/[0.03]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${scf.bg} ${scf.color}`}>
                        <AIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm">{anomaly.title}</h4>
                        <p className="font-mono text-[10px] text-muted">{anomaly.id} • {anomaly.detectedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className={`px-2 py-0.5 rounded-lg micro-label border ${stf.bg} ${stf.color} ${stf.border}`}>
                        {stf.label}
                      </span>
                      {anomaly.amount > 0 && (
                        <span className="font-mono text-sm font-bold text-rose-500">₹{(anomaly.amount / 1000).toFixed(0)}K</span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-muted/80 line-clamp-2 ml-[52px]">{anomaly.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Detail Panel */}
        <motion.div className="liquid-glass rounded-3xl p-6 flex flex-col gap-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAnomaly.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={snappySpring}
              className="flex-1 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-[var(--glass-border)]">
                <div className={`p-3 rounded-xl ${scfg.bg} ${scfg.color}`}>
                  <acfg.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-foreground">{acfg.label}</h3>
                  <span className={`micro-label ${scfg.color}`}>{scfg.label} Severity</span>
                </div>
              </div>

              {activeAnomaly.amount > 0 && (
                <div className="p-4 rounded-2xl bg-rose-500/[0.06] border border-rose-500/15 text-center">
                  <p className="micro-label text-rose-500 mb-1">Financial Exposure</p>
                  <p className="text-3xl font-extrabold text-rose-500 tabular-nums font-mono">₹{activeAnomaly.amount.toLocaleString('en-IN')}</p>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                <p className="micro-label mb-2">Description</p>
                <p className="text-xs text-foreground/80 leading-relaxed">{activeAnomaly.description}</p>
              </div>

              <div className="p-4 rounded-2xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                <p className="micro-label mb-2 flex items-center gap-1"><FileText className="w-3 h-3" /> Linked Documents</p>
                <div className="space-y-1.5">
                  {activeAnomaly.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-foreground font-medium">
                      <FileText className="w-3 h-3 text-muted" /> {doc}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/15 mt-auto">
                <p className="micro-label text-[var(--accent)] mb-2 flex items-center gap-1"><Shield className="w-3 h-3" /> Recommended Action</p>
                <p className="text-xs text-foreground leading-relaxed font-medium">{activeAnomaly.resolution}</p>
              </div>

              <motion.button
                whileHover={organicInteractions.hover}
                whileTap={organicInteractions.tap}
                className={`w-full py-3.5 font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer ${
                  activeAnomaly.status === "resolved"
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                }`}
              >
                {activeAnomaly.status === "resolved"
                  ? <><CheckCircle2 className="w-4 h-4" /> Resolved</>
                  : <><AlertOctagon className="w-4 h-4" /> Mark as Reviewed</>
                }
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
