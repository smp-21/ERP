"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import {
  Users, IndianRupee, AlertTriangle, TrendingDown, TrendingUp,
  Calendar, Clock, Shield, Zap, UserMinus, ArrowDownRight, Send, Heart
} from "lucide-react";
import { organicInteractions, liquidSpringPhysics, snappySpring, glassPanelVariants, childItemVariants } from "@/lib/motion";

interface Employee {
  id: string;
  name: string;
  role: string;
  dept: string;
  tenure: string;
  salary: number;
  lastHike: string;
  hikePercent: number;
  flightRisk: "critical" | "high" | "medium" | "low";
  riskScore: number;
  factors: string[];
  leavePattern: { month: string; days: number }[];
  salaryHistory: { year: string; salary: number }[];
}

const EMPLOYEES: Employee[] = [
  {
    id: "EMP-002", name: "Vikram Sharma", role: "CNC Operator", dept: "Manufacturing", tenure: "4.2Y", salary: 52000,
    lastHike: "18 months ago", hikePercent: 5,
    flightRisk: "critical", riskScore: 89,
    factors: ["No hike in 18 months", "3 unplanned leaves in last 30 days", "Updated LinkedIn profile", "Peer promoted — salary gap widening"],
    leavePattern: [{ month: "Jan", days: 1 }, { month: "Feb", days: 0 }, { month: "Mar", days: 2 }, { month: "Apr", days: 4 }, { month: "May", days: 6 }],
    salaryHistory: [{ year: "2022", salary: 38000 }, { year: "2023", salary: 42000 }, { year: "2024", salary: 45000 }, { year: "2025", salary: 49500 }, { year: "2026", salary: 52000 }],
  },
  {
    id: "EMP-005", name: "Pooja Verma", role: "Fleet Coordinator", dept: "Logistics", tenure: "2.8Y", salary: 45500,
    lastHike: "14 months ago", hikePercent: 8,
    flightRisk: "high", riskScore: 72,
    factors: ["Salary below market median by 15%", "Erratic leave pattern (Mon/Fri spikes)", "Missed last 2 team events"],
    leavePattern: [{ month: "Jan", days: 2 }, { month: "Feb", days: 1 }, { month: "Mar", days: 3 }, { month: "Apr", days: 2 }, { month: "May", days: 4 }],
    salaryHistory: [{ year: "2023", salary: 35000 }, { year: "2024", salary: 38000 }, { year: "2025", salary: 42000 }, { year: "2026", salary: 45500 }],
  },
  {
    id: "EMP-004", name: "Amitabh Pathak", role: "Key Account Mgr", dept: "Sales", tenure: "3.5Y", salary: 115000,
    lastHike: "8 months ago", hikePercent: 12,
    flightRisk: "medium", riskScore: 45,
    factors: ["Q4 commission dispute unresolved", "Requested role change (denied)"],
    leavePattern: [{ month: "Jan", days: 1 }, { month: "Feb", days: 1 }, { month: "Mar", days: 0 }, { month: "Apr", days: 1 }, { month: "May", days: 2 }],
    salaryHistory: [{ year: "2023", salary: 80000 }, { year: "2024", salary: 92000 }, { year: "2025", salary: 103000 }, { year: "2026", salary: 115000 }],
  },
  {
    id: "EMP-003", name: "Neha Patel", role: "Sr. Accountant", dept: "Finance", tenure: "5.1Y", salary: 98000,
    lastHike: "3 months ago", hikePercent: 15,
    flightRisk: "low", riskScore: 12,
    factors: [],
    leavePattern: [{ month: "Jan", days: 1 }, { month: "Feb", days: 0 }, { month: "Mar", days: 1 }, { month: "Apr", days: 0 }, { month: "May", days: 1 }],
    salaryHistory: [{ year: "2022", salary: 55000 }, { year: "2023", salary: 65000 }, { year: "2024", salary: 75000 }, { year: "2025", salary: 85000 }, { year: "2026", salary: 98000 }],
  },
];

function getRiskConfig(risk: string) {
  switch(risk) {
    case "critical": return { label: "Critical Flight Risk", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", glow: "shadow-[0_0_20px_rgba(244,63,94,0.3)]", ringColor: "#f43f5e", gradient: "from-rose-500/15 to-transparent" };
    case "high": return { label: "High Risk", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", glow: "shadow-[0_0_16px_rgba(245,158,11,0.25)]", ringColor: "#f59e0b", gradient: "from-amber-500/10 to-transparent" };
    case "medium": return { label: "Medium", color: "text-sky-500", bg: "bg-sky-500/10", border: "border-sky-500/20", glow: "", ringColor: "#0ea5e9", gradient: "from-sky-500/5 to-transparent" };
    case "low": return { label: "Stable", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "", ringColor: "#10b981", gradient: "from-emerald-500/5 to-transparent" };
    default: return { label: "", color: "", bg: "", border: "", glow: "", ringColor: "", gradient: "" };
  }
}

export default function FlightRiskPage() {
  const [selectedEmp, setSelectedEmp] = useState(EMPLOYEES[0].id);
  const activeEmp = EMPLOYEES.find(e => e.id === selectedEmp)!;
  const cfg = getRiskConfig(activeEmp.flightRisk);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Flight-Risk Predictor"
        description="AI-powered attrition analysis correlating salary stagnation, leave anomalies, and engagement signals."
        breadcrumbs={[{ label: "HR" }, { label: "Payroll" }]}
        actions={
          <div className="flex items-center gap-3">
            {(["critical", "high", "medium", "low"] as const).map(r => {
              const rc = getRiskConfig(r);
              const count = EMPLOYEES.filter(e => e.flightRisk === r).length;
              return count > 0 ? (
                <span key={r} className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${rc.bg} ${rc.color} ${rc.border}`}>
                  {count} {rc.label}
                </span>
              ) : null;
            })}
          </div>
        }
      />

      {/* Employee Selector */}
      <motion.div
        variants={glassPanelVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {EMPLOYEES.map((emp) => {
          const ecfg = getRiskConfig(emp.flightRisk);
          const isActive = selectedEmp === emp.id;
          return (
            <motion.div
              key={emp.id}
              variants={childItemVariants}
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              onClick={() => setSelectedEmp(emp.id)}
              className={`liquid-glass rounded-2xl p-4 cursor-pointer relative overflow-hidden transition-all group ${
                isActive ? `ring-2 ring-[var(--accent)] ${ecfg.glow}` : ''
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${ecfg.gradient} pointer-events-none`} />
              {(emp.flightRisk === "critical" || emp.flightRisk === "high") && (
                <div className={`absolute top-0 left-0 right-0 h-1 ${emp.flightRisk === "critical" ? "bg-rose-500" : "bg-amber-500"}`} />
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${ecfg.bg} ${ecfg.color} border ${ecfg.border}`}>
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">{emp.name}</h4>
                      <p className="text-[10px] text-muted">{emp.role}</p>
                    </div>
                  </div>
                  <span className={`micro-label ${ecfg.color}`}>{ecfg.label}</span>
                </div>

                <div className="flex items-end justify-between">
                  <div className={`text-2xl font-extrabold tabular-nums ${ecfg.color}`}>
                    {emp.riskScore}%
                  </div>
                  <div className="text-right">
                    <p className="micro-label mb-0.5">Last Hike</p>
                    <p className="text-[10px] font-bold text-foreground">{emp.lastHike}</p>
                  </div>
                </div>

                <div className="w-full h-1.5 rounded-full bg-foreground/[0.06] mt-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${emp.riskScore}%` }}
                    transition={liquidSpringPhysics}
                    style={{ backgroundColor: ecfg.ringColor }}
                    className="h-full rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Charts */}
        <motion.div className="lg:col-span-2 liquid-glass rounded-3xl p-6 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEmp.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={snappySpring}
              className="flex-1 flex flex-col gap-6"
            >
              {/* Leave Anomaly */}
              <div>
                <h3 className="micro-label mb-3 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Leave Pattern (Unplanned)
                </h3>
                <div className="h-[150px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activeEmp.leavePattern} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="leaveGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={cfg.ringColor} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={cfg.ringColor} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="liquid-glass-elevated rounded-xl p-2 shadow-xl text-sm">
                                <p className="font-bold text-foreground">{label}</p>
                                <p className="font-mono" style={{ color: cfg.ringColor }}>{payload[0].value} days</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <ReferenceLine y={2} stroke="#f43f5e" strokeDasharray="4 3" strokeOpacity={0.4} />
                      <Area type="monotone" dataKey="days" stroke={cfg.ringColor} strokeWidth={2.5} fill="url(#leaveGrad)" dot={{ fill: cfg.ringColor, strokeWidth: 2, r: 4 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Salary Trajectory */}
              <div>
                <h3 className="micro-label mb-3 flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5" /> Salary Trajectory
                </h3>
                <div className="h-[150px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activeEmp.salaryHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="salGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="liquid-glass-elevated rounded-xl p-2 shadow-xl text-sm">
                                <p className="font-bold text-foreground">{label}</p>
                                <p className="font-mono text-[var(--accent)]">₹{payload[0].value?.toLocaleString('en-IN')}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area type="monotone" dataKey="salary" stroke="var(--accent)" strokeWidth={2.5} fill="url(#salGrad)" dot={{ fill: "var(--accent)", strokeWidth: 2, r: 4 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Risk Panel */}
        <motion.div className="liquid-glass rounded-3xl p-6 flex flex-col gap-5">
          {/* Risk Ring */}
          <div className="flex flex-col items-center py-4">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--glass-border)" strokeWidth="6" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke={cfg.ringColor}
                  strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${activeEmp.riskScore * 2.64} 264`}
                  initial={{ strokeDasharray: "0 264" }}
                  animate={{ strokeDasharray: `${activeEmp.riskScore * 2.64} 264` }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-extrabold tabular-nums ${cfg.color}`}>{activeEmp.riskScore}%</span>
                <span className="micro-label">Flight Risk</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
              <p className="micro-label mb-1">Current Salary</p>
              <p className="text-sm font-extrabold text-foreground font-mono">₹{activeEmp.salary.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
              <p className="micro-label mb-1">Last Hike</p>
              <p className="text-sm font-bold text-foreground">{activeEmp.hikePercent}%</p>
              <p className="text-[9px] text-muted">{activeEmp.lastHike}</p>
            </div>
          </div>

          {activeEmp.factors.length > 0 ? (
            <div>
              <h4 className="micro-label text-rose-500 mb-3 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Risk Signals
              </h4>
              <div className="space-y-2">
                {activeEmp.factors.map((factor, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06, ...snappySpring }}
                    className="p-2.5 rounded-xl bg-rose-500/[0.04] border border-rose-500/10 text-xs text-foreground font-medium flex items-start gap-2"
                  >
                    <AlertTriangle className="w-3 h-3 text-rose-500 shrink-0 mt-0.5" />
                    {factor}
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/15 text-center">
              <Shield className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">No Risk Signals</p>
              <p className="text-[10px] text-muted mt-1">Healthy engagement, recent hike</p>
            </div>
          )}

          <motion.button
            whileHover={organicInteractions.hover}
            whileTap={organicInteractions.tap}
            className={`w-full py-3.5 font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer mt-auto ${
              activeEmp.flightRisk === "critical" || activeEmp.flightRisk === "high"
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'bg-[var(--accent)] text-white glow-accent'
            }`}
          >
            {activeEmp.flightRisk === "critical" || activeEmp.flightRisk === "high"
              ? <><Zap className="w-4 h-4" /> Schedule Retention Meeting</>
              : <><Heart className="w-4 h-4" /> Schedule 1-on-1</>
            }
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
