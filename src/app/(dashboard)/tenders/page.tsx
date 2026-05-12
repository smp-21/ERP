"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  Gavel, Target, TrendingUp, IndianRupee, Shield, Clock, Award,
  CheckCircle2, AlertTriangle, ChevronRight, FileText, Zap, Star
} from "lucide-react";
import { organicInteractions, liquidSpringPhysics, snappySpring, glassPanelVariants, childItemVariants } from "@/lib/motion";

interface Tender {
  id: string;
  title: string;
  department: string;
  estimatedValue: number;
  closingDate: string;
  status: "live" | "submitted" | "awarded";
  winProbability: number;
  complianceScore: number;
  pricingScore: number;
  pastPerformance: number;
  competitors: number;
  factors: { label: string; impact: "positive" | "negative" | "neutral"; detail: string }[];
}

const TENDERS: Tender[] = [
  {
    id: "GEM/2026/B/4235891",
    title: "Supply of Industrial Ball Bearings — Indian Railways",
    department: "Ministry of Railways",
    estimatedValue: 4500000,
    closingDate: "22 May 2026",
    status: "live",
    winProbability: 78,
    complianceScore: 95,
    pricingScore: 82,
    pastPerformance: 88,
    competitors: 4,
    factors: [
      { label: "MSE Certification", impact: "positive", detail: "Qualifies for purchase preference under MSME policy" },
      { label: "Past Delivery", impact: "positive", detail: "100% on-time delivery in last 3 GeM orders" },
      { label: "L1 Pricing Gap", impact: "negative", detail: "Estimated 3.2% above lowest historical bid" },
      { label: "Make in India", impact: "positive", detail: "Full domestic manufacturing — 25% preference margin" },
    ],
  },
  {
    id: "GEM/2026/B/4235907",
    title: "Annual Maintenance — CNC Machines, HAL Bengaluru",
    department: "Ministry of Defence",
    estimatedValue: 1200000,
    closingDate: "18 May 2026",
    status: "submitted",
    winProbability: 62,
    complianceScore: 88,
    pricingScore: 70,
    pastPerformance: 75,
    competitors: 6,
    factors: [
      { label: "Technical Capability", impact: "positive", detail: "ISO 9001:2015 certified for CNC maintenance" },
      { label: "High Competition", impact: "negative", detail: "6 qualified bidders — price-sensitive category" },
      { label: "Geographic Proximity", impact: "neutral", detail: "Pune to Bengaluru — moderate logistics cost" },
    ],
  },
  {
    id: "GEM/2026/B/4235823",
    title: "Supply of Neodymium Magnets — ISRO Thiruvananthapuram",
    department: "Dept of Space",
    estimatedValue: 8900000,
    closingDate: "10 May 2026",
    status: "awarded",
    winProbability: 92,
    complianceScore: 98,
    pricingScore: 90,
    pastPerformance: 95,
    competitors: 2,
    factors: [
      { label: "Sole Qualifier", impact: "positive", detail: "Only vendor meeting purity specification (N52 grade)" },
      { label: "ISRO Track Record", impact: "positive", detail: "3 successful contracts with ISRO in FY25-26" },
      { label: "Price Premium", impact: "neutral", detail: "8% above market — justified by quality certification" },
    ],
  },
];

function getStatusCfg(status: string) {
  switch(status) {
    case "live": return { label: "LIVE", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", dot: "bg-emerald-500" };
    case "submitted": return { label: "BID SUBMITTED", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", dot: "bg-amber-500" };
    case "awarded": return { label: "AWARDED ✓", color: "text-[var(--accent)]", bg: "bg-[var(--accent)]/10", border: "border-[var(--accent)]/20", dot: "bg-[var(--accent)]" };
    default: return { label: "", color: "", bg: "", border: "", dot: "" };
  }
}

function getProbabilityColor(prob: number) {
  if (prob >= 80) return { color: "text-emerald-500", ringColor: "#10b981", label: "High Confidence" };
  if (prob >= 60) return { color: "text-amber-500", ringColor: "#f59e0b", label: "Moderate" };
  return { color: "text-rose-500", ringColor: "#f43f5e", label: "Competitive" };
}

export default function GemBidProbabilityPage() {
  const [selectedTender, setSelectedTender] = useState(TENDERS[0].id);
  const activeTender = TENDERS.find(t => t.id === selectedTender)!;
  const stCfg = getStatusCfg(activeTender.status);
  const probCfg = getProbabilityColor(activeTender.winProbability);

  const scoreData = [
    { name: "Compliance", score: activeTender.complianceScore, fill: "#818cf8" },
    { name: "Pricing", score: activeTender.pricingScore, fill: "#10b981" },
    { name: "Track Record", score: activeTender.pastPerformance, fill: "#f59e0b" },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="GeM Bid Probability Scorer"
        description="AI-powered tender win analysis based on compliance history, ₹ pricing competitiveness, and past performance."
        breadcrumbs={[{ label: "Government" }, { label: "Tenders" }]}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20">
              <Target className="w-4 h-4 text-[var(--accent)]" />
              <span className="micro-label text-[var(--accent)]">AI Model Active</span>
            </div>
          </div>
        }
      />

      {/* Tender Cards */}
      <motion.div
        variants={glassPanelVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {TENDERS.map((tender) => {
          const tcfg = getStatusCfg(tender.status);
          const pcfg = getProbabilityColor(tender.winProbability);
          const isActive = selectedTender === tender.id;
          return (
            <motion.div
              key={tender.id}
              variants={childItemVariants}
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              onClick={() => setSelectedTender(tender.id)}
              className={`liquid-glass rounded-2xl p-5 cursor-pointer relative overflow-hidden transition-all group ${
                isActive ? 'ring-2 ring-[var(--accent)] shadow-[0_0_24px_var(--glow-accent)]' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-muted truncate mr-2">{tender.id}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {tender.status !== "awarded" && (
                    <div className="relative">
                      <div className={`w-2 h-2 rounded-full ${tcfg.dot}`} />
                      <div className={`absolute inset-0 w-2 h-2 rounded-full ${tcfg.dot} animate-ping opacity-40`} />
                    </div>
                  )}
                  <span className={`micro-label ${tcfg.color}`}>{tcfg.label}</span>
                </div>
              </div>

              <h4 className="font-bold text-foreground text-sm mb-1 line-clamp-2 min-h-[40px]">{tender.title}</h4>
              <p className="text-[10px] text-muted mb-3">{tender.department}</p>

              <div className="flex items-end justify-between">
                <div>
                  <p className="micro-label mb-0.5">Estimated Value</p>
                  <p className="font-mono font-bold text-foreground text-sm">₹{(tender.estimatedValue / 100000).toFixed(1)}L</p>
                </div>
                <div className="text-right">
                  <p className="micro-label mb-0.5">Win Probability</p>
                  <p className={`text-2xl font-extrabold tabular-nums ${pcfg.color}`}>{tender.winProbability}%</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Detail + Score Chart */}
        <motion.div className="lg:col-span-2 liquid-glass rounded-3xl p-6 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTender.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={snappySpring}
              className="flex-1 flex flex-col"
            >
              <div className="flex items-start justify-between mb-6 pb-4 border-b border-[var(--glass-border)]">
                <div>
                  <h2 className="text-lg font-extrabold text-foreground tracking-tight">{activeTender.title}</h2>
                  <p className="text-sm text-muted mt-1">{activeTender.department} • Closing: {activeTender.closingDate}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${stCfg.bg} ${stCfg.color} ${stCfg.border}`}>
                  {stCfg.label}
                </span>
              </div>

              {/* Score Breakdown */}
              <div className="mb-6">
                <h3 className="micro-label mb-3">Score Breakdown</h3>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scoreData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--glass-border)" />
                      <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
                      <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--foreground)', fontSize: 12, fontWeight: 700 }} width={100} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="liquid-glass-elevated rounded-xl p-3 shadow-xl text-sm">
                                <p className="font-bold text-foreground mb-1">{payload[0]?.payload?.name}</p>
                                <p className="font-mono text-[var(--accent)]">{payload[0]?.value}%</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={24}>
                        {scoreData.map((item, idx) => (
                          <Cell key={idx} fill={item.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Factors */}
              <div className="flex-1">
                <h3 className="micro-label mb-3">AI Factor Analysis</h3>
                <div className="space-y-2">
                  {activeTender.factors.map((factor, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06, ...snappySpring }}
                      className={`p-3 rounded-xl border flex items-start gap-3 ${
                        factor.impact === "positive" ? 'bg-emerald-500/[0.04] border-emerald-500/10' :
                        factor.impact === "negative" ? 'bg-rose-500/[0.04] border-rose-500/10' :
                        'bg-foreground/[0.02] border-[var(--glass-border)]'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 ${
                        factor.impact === "positive" ? 'bg-emerald-500/10 text-emerald-500' :
                        factor.impact === "negative" ? 'bg-rose-500/10 text-rose-500' :
                        'bg-foreground/[0.06] text-muted'
                      }`}>
                        {factor.impact === "positive" ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                         factor.impact === "negative" ? <AlertTriangle className="w-3.5 h-3.5" /> :
                         <Shield className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">{factor.label}</p>
                        <p className="text-[10px] text-muted mt-0.5">{factor.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Probability Gauge */}
        <motion.div className="liquid-glass rounded-3xl p-6 flex flex-col gap-5">
          <h3 className="micro-label">Win Probability</h3>

          {/* Gauge Ring */}
          <div className="flex flex-col items-center py-6">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--glass-border)" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke={probCfg.ringColor}
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${activeTender.winProbability * 2.64} 264`}
                  initial={{ strokeDasharray: "0 264" }}
                  animate={{ strokeDasharray: `${activeTender.winProbability * 2.64} 264` }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-extrabold tabular-nums ${probCfg.color}`}>{activeTender.winProbability}%</span>
                <span className="micro-label mt-1">{probCfg.label}</span>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-3">
            {[
              { label: "Tender Value", value: `₹${(activeTender.estimatedValue / 100000).toFixed(1)}L`, icon: IndianRupee },
              { label: "Competitors", value: `${activeTender.competitors} bidders`, icon: Users },
              { label: "Closing Date", value: activeTender.closingDate, icon: Clock },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                <span className="flex items-center gap-2 text-xs text-muted">
                  <item.icon className="w-3.5 h-3.5" /> {item.label}
                </span>
                <span className="font-bold text-foreground text-sm">{item.value}</span>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={organicInteractions.hover}
            whileTap={organicInteractions.tap}
            className="w-full py-3.5 bg-[var(--accent)] text-white font-bold text-sm rounded-xl glow-accent flex items-center justify-center gap-2 cursor-pointer mt-auto"
          >
            <FileText className="w-4 h-4" />
            {activeTender.status === "live" ? "Prepare Bid" : activeTender.status === "submitted" ? "Track Bid" : "View Award"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

// Missing icon import workaround
function Users(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
