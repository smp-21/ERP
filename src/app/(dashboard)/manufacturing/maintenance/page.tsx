"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine, ReferenceArea } from "recharts";
import {
  Brain, AlertTriangle, CheckCircle2, Clock, Wrench, Activity,
  Thermometer, TrendingDown, ArrowUpRight, Shield, Cpu, ChevronRight
} from "lucide-react";
import { organicInteractions, liquidSpringPhysics, snappySpring, glassPanelVariants, childItemVariants } from "@/lib/motion";

// =============================================
// Predictive Failure Forecast Data
// =============================================
interface MachineHealth {
  id: string;
  name: string;
  healthScore: number;
  predictedFailure: string;
  failureProbability: number;
  daysRemaining: number;
  component: string;
  recommendation: string;
  severity: "critical" | "warning" | "watch" | "healthy";
  trendData: { week: string; health?: number; predicted?: number }[];
}

const MACHINE_FLEET: MachineHealth[] = [
  {
    id: "CNC-02",
    name: "CNC Lathe Station",
    healthScore: 23,
    predictedFailure: "Week 21 (May 19-23)",
    failureProbability: 87,
    daysRemaining: 7,
    component: "Main Spindle Bearing (SKF-6205)",
    recommendation: "Schedule immediate bearing replacement. Estimated downtime: 4 hours. Parts in stock.",
    severity: "critical",
    trendData: [
      { week: "W14", health: 88, predicted: 88 },
      { week: "W15", health: 82, predicted: 84 },
      { week: "W16", health: 74, predicted: 76 },
      { week: "W17", health: 61, predicted: 64 },
      { week: "W18", health: 48, predicted: 50 },
      { week: "W19", health: 35, predicted: 38 },
      { week: "W20", health: 23, predicted: 26 },
      { week: "W21", health: undefined, predicted: 14 },
      { week: "W22", health: undefined, predicted: 5 },
      { week: "W23", health: undefined, predicted: 0 },
    ],
  },
  {
    id: "CNC-03",
    name: "Precision Grinding Unit",
    healthScore: 54,
    predictedFailure: "Week 26 (Jun 22-26)",
    failureProbability: 62,
    daysRemaining: 42,
    component: "Coolant Pump Motor (ABB-M2QA)",
    recommendation: "Order replacement part. Current lead time: 14 days. Schedule during next planned downtime.",
    severity: "warning",
    trendData: [
      { week: "W14", health: 92, predicted: 92 },
      { week: "W16", health: 84, predicted: 85 },
      { week: "W18", health: 72, predicted: 74 },
      { week: "W20", health: 54, predicted: 58 },
      { week: "W22", health: undefined, predicted: 42 },
      { week: "W24", health: undefined, predicted: 30 },
      { week: "W26", health: undefined, predicted: 18 },
    ],
  },
  {
    id: "ASB-01",
    name: "Robotic Assembly Cell A",
    healthScore: 71,
    predictedFailure: "Week 32 (Aug 3-7)",
    failureProbability: 38,
    daysRemaining: 84,
    component: "Servo Motor Z-Axis (Fanuc αi 12/3000)",
    recommendation: "Monitor vibration levels weekly. No immediate action required.",
    severity: "watch",
    trendData: [
      { week: "W14", health: 96, predicted: 96 },
      { week: "W18", health: 88, predicted: 89 },
      { week: "W22", health: 71, predicted: 76 },
      { week: "W26", health: undefined, predicted: 58 },
      { week: "W30", health: undefined, predicted: 38 },
      { week: "W32", health: undefined, predicted: 22 },
    ],
  },
  {
    id: "FRN-01",
    name: "Heat Treatment Furnace",
    healthScore: 94,
    predictedFailure: "No failure predicted",
    failureProbability: 4,
    daysRemaining: 999,
    component: "All components nominal",
    recommendation: "Continue standard maintenance schedule.",
    severity: "healthy",
    trendData: [
      { week: "W14", health: 98, predicted: 98 },
      { week: "W18", health: 96, predicted: 96 },
      { week: "W22", health: 94, predicted: 95 },
      { week: "W26", health: undefined, predicted: 93 },
      { week: "W30", health: undefined, predicted: 91 },
    ],
  },
];

function getSeverityConfig(severity: string) {
  switch(severity) {
    case "critical": return { color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", glow: "bg-rose-500", badgeBg: "bg-rose-500" };
    case "warning": return { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", glow: "bg-amber-500", badgeBg: "bg-amber-500" };
    case "watch": return { color: "text-sky-500", bg: "bg-sky-500/10", border: "border-sky-500/20", glow: "bg-sky-500", badgeBg: "bg-sky-500" };
    case "healthy": return { color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "bg-emerald-500", badgeBg: "bg-emerald-500" };
    default: return { color: "", bg: "", border: "", glow: "", badgeBg: "" };
  }
}

const PredictionTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="liquid-glass-elevated rounded-xl p-3 shadow-xl text-sm min-w-[160px]">
        <p className="font-sans font-bold text-foreground mb-2 pb-2 border-b border-[var(--glass-border)]">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className={`font-mono text-xs ${p.dataKey === 'health' ? 'text-emerald-500' : 'text-rose-400'}`}>
            {p.dataKey === 'health' ? 'Actual' : 'Predicted'}: {p.value ?? '—'}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function PredictiveMaintenancePage() {
  const [selectedMachine, setSelectedMachine] = useState(MACHINE_FLEET[0].id);
  const activeMachine = MACHINE_FLEET.find(m => m.id === selectedMachine)!;
  const cfg = getSeverityConfig(activeMachine.severity);

  return (
    <div className="flex flex-col h-full gap-6 overflow-y-auto pb-6">
      <GlassPageHeader
        title="Predictive Maintenance AI"
        description="Machine learning-powered failure forecasting with component-level degradation tracking."
        breadcrumbs={[{ label: "Manufacturing" }, { label: "Maintenance" }]}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20">
              <Brain className="w-4 h-4 text-[var(--accent)]" />
              <span className="micro-label text-[var(--accent)]">AI Model v3.2 Active</span>
            </div>
          </div>
        }
      />

      {/* Fleet Health Overview */}
      <motion.div
        variants={glassPanelVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {MACHINE_FLEET.map((machine, idx) => {
          const mcfg = getSeverityConfig(machine.severity);
          const isActive = selectedMachine === machine.id;
          return (
            <motion.div
              key={machine.id}
              variants={childItemVariants}
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              onClick={() => setSelectedMachine(machine.id)}
              className={`liquid-glass rounded-2xl p-5 cursor-pointer relative overflow-hidden transition-all group ${
                isActive ? 'ring-2 ring-[var(--accent)] shadow-[0_0_24px_var(--glow-accent)]' : ''
              }`}
            >
              <div className={`absolute -right-6 -top-6 w-20 h-20 rounded-full blur-[40px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 ${mcfg.glow}`} />

              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className="font-mono text-xs font-bold text-foreground">{machine.id}</span>
                <span className={`px-2 py-0.5 rounded-lg micro-label border ${mcfg.bg} ${mcfg.color} ${mcfg.border}`}>
                  {machine.severity.toUpperCase()}
                </span>
              </div>

              <div className="relative z-10">
                <p className="text-xs text-muted truncate mb-2">{machine.name}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="micro-label mb-1">Health Score</p>
                    <p className={`text-3xl font-extrabold tabular-nums tracking-tight ${mcfg.color}`}>
                      {machine.healthScore}<span className="text-sm font-normal text-muted">%</span>
                    </p>
                  </div>
                  {machine.severity !== "healthy" && (
                    <div className="text-right">
                      <p className="micro-label mb-1">Fail Prob.</p>
                      <p className={`text-lg font-extrabold tabular-nums ${mcfg.color}`}>{machine.failureProbability}%</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Mini health bar */}
              <div className="w-full h-1.5 rounded-full bg-foreground/[0.06] mt-3 overflow-hidden relative z-10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${machine.healthScore}%` }}
                  transition={liquidSpringPhysics}
                  className={`h-full rounded-full ${mcfg.badgeBg}`}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Prediction Chart + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Forecast Chart */}
        <motion.div
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 liquid-glass rounded-3xl p-6 flex flex-col"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2">
                <Activity className={`w-5 h-5 ${cfg.color}`} />
                Degradation Forecast — {activeMachine.id}
              </h2>
              <p className="text-sm text-muted mt-1">
                {activeMachine.severity !== "healthy"
                  ? `Predicted failure: ${activeMachine.predictedFailure} (${activeMachine.failureProbability}% probability)`
                  : "All parameters nominal. No failure predicted in forecast window."
                }
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted shrink-0">
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Actual</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-400 opacity-60" /> Predicted</span>
            </div>
          </div>

          <div className="flex-1 min-h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeMachine.trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<PredictionTooltip />} />

                {/* Danger zone */}
                <ReferenceArea y1={0} y2={30} fill="rgba(244,63,94,0.04)" />
                <ReferenceLine y={30} stroke="#f43f5e" strokeDasharray="6 4" strokeOpacity={0.4} label={{ value: "FAILURE THRESHOLD", position: "insideTopRight", style: { fontSize: 9, fill: "#f43f5e", fontWeight: 700, letterSpacing: "0.1em" } }} />

                <Area type="monotone" dataKey="health" stroke="#10b981" strokeWidth={3} fill="url(#healthGrad)" connectNulls={false} dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }} />
                <Area type="monotone" dataKey="predicted" stroke="#f43f5e" strokeWidth={2} strokeDasharray="8 4" fill="url(#predGrad)" dot={{ fill: "#f43f5e", strokeWidth: 2, r: 3, opacity: 0.6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Detail Panel */}
        <motion.div
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="liquid-glass rounded-3xl p-6 flex flex-col gap-5"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMachine.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={snappySpring}
              className="flex flex-col gap-5 flex-1"
            >
              {/* Health Score Ring */}
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="var(--glass-border)" strokeWidth="6" />
                    <motion.circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke={activeMachine.severity === 'critical' ? '#f43f5e' : activeMachine.severity === 'warning' ? '#f59e0b' : activeMachine.severity === 'watch' ? '#0ea5e9' : '#10b981'}
                      strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={`${activeMachine.healthScore * 2.64} 264`}
                      initial={{ strokeDasharray: "0 264" }}
                      animate={{ strokeDasharray: `${activeMachine.healthScore * 2.64} 264` }}
                      transition={liquidSpringPhysics}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-extrabold tabular-nums ${cfg.color}`}>{activeMachine.healthScore}</span>
                    <span className="micro-label">Health</span>
                  </div>
                </div>
              </div>

              {/* Component Info */}
              <div className={`p-4 rounded-2xl ${cfg.bg} border ${cfg.border}`}>
                <p className="micro-label mb-1.5">Failing Component</p>
                <p className="text-sm font-bold text-foreground">{activeMachine.component}</p>
              </div>

              {/* Time to Failure */}
              {activeMachine.severity !== "healthy" && (
                <div className="p-4 rounded-2xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                  <p className="micro-label mb-1.5 flex items-center gap-1"><Clock className="w-3 h-3" /> Time to Failure</p>
                  <p className={`text-2xl font-extrabold tabular-nums ${cfg.color}`}>
                    {activeMachine.daysRemaining} <span className="text-sm font-normal text-muted">days</span>
                  </p>
                </div>
              )}

              {/* AI Recommendation */}
              <div className="p-4 rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/15 mt-auto">
                <p className="micro-label text-[var(--accent)] mb-2 flex items-center gap-1"><Brain className="w-3 h-3" /> AI Recommendation</p>
                <p className="text-xs text-foreground leading-relaxed font-medium">{activeMachine.recommendation}</p>
              </div>

              <motion.button
                whileHover={organicInteractions.hover}
                whileTap={organicInteractions.tap}
                className={`w-full py-3.5 font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                  activeMachine.severity === 'critical'
                    ? 'bg-rose-500 text-white shadow-rose-500/20'
                    : 'bg-[var(--accent)] text-white glow-accent'
                }`}
              >
                <Wrench className="w-4 h-4" />
                {activeMachine.severity === 'critical' ? 'Schedule Emergency Service' : 'Create Work Order'}
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
