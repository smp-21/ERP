"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import {
  FileText, AlertTriangle, CheckCircle2, Shield, Search,
  Eye, ChevronDown, AlertOctagon, Scale, Clock, Info
} from "lucide-react";
import { organicInteractions, snappySpring, glassPanelVariants, childItemVariants } from "@/lib/motion";

interface ContractClause {
  id: number;
  text: string;
  risk: "high" | "medium" | "safe";
  tag: string;
  note: string;
}

interface Contract {
  id: string;
  title: string;
  vendor: string;
  type: string;
  date: string;
  value: string;
  riskScore: number;
  status: "flagged" | "reviewed" | "clean";
  clauses: ContractClause[];
}

const CONTRACTS: Contract[] = [
  {
    id: "CNT-2026-081",
    title: "Annual Maintenance Contract — Hydraulic Press",
    vendor: "Global Logistics Inc",
    type: "Service Agreement",
    date: "01 Apr 2026",
    value: "₹8,00,000",
    riskScore: 72,
    status: "flagged",
    clauses: [
      { id: 1, text: "The Service Provider shall be liable for damages up to a maximum of 5% of the total contract value, regardless of the nature or extent of the breach.", risk: "high", tag: "Liability Cap", note: "Liability capped at ₹40,000 only — far below potential damage costs. Standard should be 100% or uncapped for critical machinery." },
      { id: 2, text: "Either party may terminate this agreement with 7 calendar days written notice.", risk: "high", tag: "Termination", note: "7-day termination is extremely short for a critical maintenance contract. Industry standard is 30-90 days." },
      { id: 3, text: "All intellectual property developed during the contract shall vest exclusively with the Service Provider.", risk: "medium", tag: "IP Ownership", note: "Custom tooling and fixtures developed on your premises should have shared or buyer IP rights." },
      { id: 4, text: "Payment terms: 50% advance upon signing, 50% upon completion of annual service cycle.", risk: "medium", tag: "Payment Terms", note: "50% advance carries risk. Consider milestone-based payments: 20-40-40." },
      { id: 5, text: "The Service Provider shall maintain valid insurance coverage of not less than ₹50,00,000.", risk: "safe", tag: "Insurance", note: "Insurance coverage meets the minimum threshold for heavy machinery maintenance." },
      { id: 6, text: "Disputes shall be resolved through binding arbitration in Mumbai under the Arbitration and Conciliation Act.", risk: "safe", tag: "Dispute Resolution", note: "Standard arbitration clause with appropriate jurisdiction." },
    ],
  },
  {
    id: "CNT-2026-082",
    title: "Raw Material Supply — Neodymium Magnets FY27",
    vendor: "Alpha Metals Corp",
    type: "Supply Contract",
    date: "15 May 2026",
    value: "₹1,44,00,000",
    riskScore: 28,
    status: "clean",
    clauses: [
      { id: 1, text: "The Supplier guarantees delivery within 14 calendar days of each purchase order. Liquidated damages of 1% per day of delay shall apply.", risk: "safe", tag: "Delivery SLA", note: "Strong delivery SLA with adequate penalties." },
      { id: 2, text: "Quality must conform to ASTM A480 standards. The Buyer may reject any lot failing QC inspection.", risk: "safe", tag: "Quality", note: "Clear quality standard with rejection rights." },
      { id: 3, text: "Force Majeure clause includes pandemics, natural disasters, and government-imposed sanctions.", risk: "medium", tag: "Force Majeure", note: "Broad FM definition — consider adding explicit carve-outs for supply chain disruptions." },
    ],
  },
];

function getRiskConfig(risk: string) {
  switch(risk) {
    case "high": return { color: "text-rose-500", bg: "bg-rose-500/8", border: "border-rose-500/20", highlight: "bg-rose-500/10 border-l-4 border-l-rose-500", icon: AlertOctagon };
    case "medium": return { color: "text-amber-500", bg: "bg-amber-500/8", border: "border-amber-500/20", highlight: "bg-amber-500/8 border-l-4 border-l-amber-500", icon: AlertTriangle };
    case "safe": return { color: "text-emerald-500", bg: "bg-emerald-500/8", border: "border-emerald-500/20", highlight: "bg-emerald-500/5 border-l-4 border-l-emerald-500", icon: CheckCircle2 };
    default: return { color: "", bg: "", border: "", highlight: "", icon: Info };
  }
}

function getContractStatusCfg(status: string) {
  switch(status) {
    case "flagged": return { label: "FLAGGED", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" };
    case "reviewed": return { label: "REVIEWED", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    case "clean": return { label: "CLEAN", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
    default: return { label: "", color: "", bg: "", border: "" };
  }
}

export default function ContractRiskPage() {
  const [selectedContract, setSelectedContract] = useState(CONTRACTS[0].id);
  const activeContract = CONTRACTS.find(c => c.id === selectedContract)!;
  const scfg = getContractStatusCfg(activeContract.status);
  const highRisks = activeContract.clauses.filter(c => c.risk === "high").length;
  const medRisks = activeContract.clauses.filter(c => c.risk === "medium").length;

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Smart Contract Risk Analyzer"
        description="AI-powered compliance scanner highlighting risky clauses before execution."
        breadcrumbs={[{ label: "Procurement" }, { label: "Contracts" }]}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20">
              <Shield className="w-4 h-4 text-[var(--accent)]" />
              <span className="micro-label text-[var(--accent)]">AI Scanner Active</span>
            </div>
          </div>
        }
      />

      {/* Contract Selector */}
      <motion.div
        variants={glassPanelVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {CONTRACTS.map((contract) => {
          const cscfg = getContractStatusCfg(contract.status);
          const isActive = selectedContract === contract.id;
          return (
            <motion.div
              key={contract.id}
              variants={childItemVariants}
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              onClick={() => setSelectedContract(contract.id)}
              className={`liquid-glass rounded-2xl p-5 cursor-pointer transition-all group relative overflow-hidden ${
                isActive ? 'ring-2 ring-[var(--accent)] shadow-[0_0_24px_var(--glow-accent)]' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-foreground/[0.04] border border-[var(--glass-border)] text-foreground/60">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm truncate max-w-[300px]">{contract.title}</h4>
                    <p className="text-xs text-muted font-mono">{contract.id} • {contract.vendor}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-lg micro-label border ${cscfg.bg} ${cscfg.color} ${cscfg.border}`}>
                  {cscfg.label}
                </span>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex gap-4 text-xs text-muted">
                  <span>{contract.date}</span>
                  <span className="font-mono font-bold text-foreground">{contract.value}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="micro-label text-muted">Risk</span>
                  <span className={`font-extrabold text-lg tabular-nums ${
                    contract.riskScore > 60 ? 'text-rose-500' : contract.riskScore > 30 ? 'text-amber-500' : 'text-emerald-500'
                  }`}>{contract.riskScore}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Document Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Clause Viewer */}
        <motion.div className="lg:col-span-3 liquid-glass rounded-3xl p-6 flex flex-col h-[500px]">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-[var(--glass-border)]">
            <div>
              <h2 className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2">
                <Eye className="w-5 h-5 text-[var(--accent)]" /> Clause Analysis
              </h2>
              <p className="text-xs text-muted mt-1">{activeContract.title}</p>
            </div>
            <div className="flex items-center gap-2">
              {highRisks > 0 && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  {highRisks} High Risk
                </span>
              )}
              {medRisks > 0 && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  {medRisks} Medium
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto scrollbar-hide pr-2">
            {activeContract.clauses.map((clause, idx) => {
              const rcfg = getRiskConfig(clause.risk);
              const RiskIcon = rcfg.icon;
              return (
                <motion.div
                  key={clause.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, ...snappySpring }}
                  className={`p-4 rounded-2xl ${rcfg.highlight} transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded-lg ${rcfg.bg} ${rcfg.color} shrink-0 mt-0.5`}>
                      <RiskIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${rcfg.bg} ${rcfg.color} ${rcfg.border}`}>
                          {clause.tag}
                        </span>
                        <span className={`micro-label ${rcfg.color}`}>{clause.risk.toUpperCase()} RISK</span>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed font-serif italic mb-3">&ldquo;{clause.text}&rdquo;</p>
                      <div className={`p-3 rounded-xl ${rcfg.bg} border ${rcfg.border}`}>
                        <p className="text-xs font-bold text-foreground flex items-center gap-1.5 mb-1">
                          <Shield className="w-3 h-3 text-[var(--accent)]" /> AI Analysis
                        </p>
                        <p className="text-xs text-foreground/70 leading-relaxed">{clause.note}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Risk Summary */}
        <motion.div className="liquid-glass rounded-3xl p-6 flex flex-col gap-5">
          <h3 className="micro-label">Risk Assessment</h3>

          {/* Risk Score Ring */}
          <div className="flex flex-col items-center py-4">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--glass-border)" strokeWidth="6" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke={activeContract.riskScore > 60 ? '#f43f5e' : activeContract.riskScore > 30 ? '#f59e0b' : '#10b981'}
                  strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${activeContract.riskScore * 2.64} 264`}
                  initial={{ strokeDasharray: "0 264" }}
                  animate={{ strokeDasharray: `${activeContract.riskScore * 2.64} 264` }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-extrabold tabular-nums ${
                  activeContract.riskScore > 60 ? 'text-rose-500' : activeContract.riskScore > 30 ? 'text-amber-500' : 'text-emerald-500'
                }`}>{activeContract.riskScore}</span>
                <span className="micro-label">Risk Score</span>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-3">
            {[
              { label: "High Risk Clauses", count: highRisks, color: "text-rose-500", dot: "bg-rose-500" },
              { label: "Medium Risk", count: medRisks, color: "text-amber-500", dot: "bg-amber-500" },
              { label: "Safe Clauses", count: activeContract.clauses.filter(c => c.risk === "safe").length, color: "text-emerald-500", dot: "bg-emerald-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                <span className="flex items-center gap-2 text-xs text-muted">
                  <div className={`w-2 h-2 rounded-full ${item.dot}`} />
                  {item.label}
                </span>
                <span className={`font-extrabold text-lg tabular-nums ${item.color}`}>{item.count}</span>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={organicInteractions.hover}
            whileTap={organicInteractions.tap}
            className={`w-full py-3.5 font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer mt-auto ${
              activeContract.status === "flagged"
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
            }`}
          >
            <Scale className="w-4 h-4" />
            {activeContract.status === "flagged" ? 'Request Legal Review' : 'Approve Contract'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
