"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import {
  Users, Star, TrendingUp, Award, Target, Zap, ChevronRight, BookOpen, Shield, AlertTriangle
} from "lucide-react";
import { organicInteractions, liquidSpringPhysics, snappySpring, glassPanelVariants, childItemVariants } from "@/lib/motion";

interface Employee {
  id: string;
  name: string;
  role: string;
  dept: string;
  level: string;
  nextLevel: string;
  overallScore: number;
  readiness: number;
  skills: { skill: string; current: number; required: number }[];
  badges: string[];
}

const EMPLOYEES: Employee[] = [
  {
    id: "EMP-001", name: "Rahul Desai", role: "Plant Manager", dept: "Manufacturing", level: "L5", nextLevel: "L6 — Sr. Director",
    overallScore: 82, readiness: 74,
    skills: [
      { skill: "Leadership", current: 90, required: 95 },
      { skill: "Technical", current: 85, required: 80 },
      { skill: "Safety", current: 95, required: 90 },
      { skill: "Analytics", current: 60, required: 85 },
      { skill: "Budget Mgmt", current: 78, required: 90 },
      { skill: "Innovation", current: 72, required: 80 },
    ],
    badges: ["Safety Champion", "5Y Tenure", "ISO Certified"],
  },
  {
    id: "EMP-002", name: "Vikram Sharma", role: "CNC Operator", dept: "Manufacturing", level: "L2", nextLevel: "L3 — Sr. Operator",
    overallScore: 68, readiness: 55,
    skills: [
      { skill: "CNC Programming", current: 85, required: 90 },
      { skill: "Precision", current: 92, required: 85 },
      { skill: "Maintenance", current: 40, required: 70 },
      { skill: "Documentation", current: 35, required: 60 },
      { skill: "Teamwork", current: 80, required: 75 },
      { skill: "Safety", current: 75, required: 85 },
    ],
    badges: ["Precision Master", "Zero Defect Q1"],
  },
  {
    id: "EMP-003", name: "Neha Patel", role: "Sr. Accountant", dept: "Finance", level: "L3", nextLevel: "L4 — Finance Manager",
    overallScore: 91, readiness: 88,
    skills: [
      { skill: "GST/Tax", current: 95, required: 90 },
      { skill: "Audit", current: 88, required: 85 },
      { skill: "ERP Systems", current: 92, required: 90 },
      { skill: "Leadership", current: 70, required: 80 },
      { skill: "Reporting", current: 95, required: 90 },
      { skill: "Compliance", current: 98, required: 95 },
    ],
    badges: ["GST Expert", "Zero Error FY26", "3Y Tenure"],
  },
  {
    id: "EMP-004", name: "Amitabh P.", role: "Key Account Mgr", dept: "Sales", level: "L4", nextLevel: "L5 — Regional Head",
    overallScore: 78, readiness: 62,
    skills: [
      { skill: "Negotiation", current: 92, required: 90 },
      { skill: "CRM Tools", current: 65, required: 85 },
      { skill: "Analytics", current: 55, required: 80 },
      { skill: "Team Building", current: 70, required: 90 },
      { skill: "Revenue", current: 88, required: 85 },
      { skill: "Strategy", current: 60, required: 85 },
    ],
    badges: ["₹10Cr Club", "Top Performer Q4"],
  },
];

export default function SkillMatrixPage() {
  const [selectedEmp, setSelectedEmp] = useState(EMPLOYEES[0].id);
  const activeEmp = EMPLOYEES.find(e => e.id === selectedEmp)!;

  const radarData = activeEmp.skills.map(s => ({
    skill: s.skill,
    current: s.current,
    required: s.required,
  }));

  const gaps = activeEmp.skills.filter(s => s.current < s.required).sort((a, b) => (b.required - b.current) - (a.required - a.current));

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Gamified Skill Matrix"
        description="Radar visualization of employee competencies vs promotion requirements. Track readiness and skill gaps."
        breadcrumbs={[{ label: "HR" }, { label: "Skill Matrix" }]}
      />

      {/* Employee Cards */}
      <motion.div
        variants={glassPanelVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {EMPLOYEES.map((emp) => {
          const isActive = selectedEmp === emp.id;
          const readyColor = emp.readiness >= 80 ? "text-emerald-500" : emp.readiness >= 60 ? "text-amber-500" : "text-rose-500";
          return (
            <motion.div
              key={emp.id}
              variants={childItemVariants}
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              onClick={() => setSelectedEmp(emp.id)}
              className={`liquid-glass rounded-2xl p-5 cursor-pointer relative overflow-hidden transition-all group ${
                isActive ? 'ring-2 ring-[var(--accent)] shadow-[0_0_24px_var(--glow-accent)]' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center font-extrabold text-[var(--accent)]">
                  {emp.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">{emp.name}</h4>
                  <p className="text-[10px] text-muted">{emp.role} • {emp.level}</p>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="micro-label mb-1">Overall</p>
                  <p className="text-2xl font-extrabold text-foreground tabular-nums">{emp.overallScore}</p>
                </div>
                <div className="text-right">
                  <p className="micro-label mb-1">Readiness</p>
                  <p className={`text-lg font-extrabold tabular-nums ${readyColor}`}>{emp.readiness}%</p>
                </div>
              </div>

              <div className="w-full h-1.5 rounded-full bg-foreground/[0.06] mt-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${emp.readiness}%` }}
                  transition={liquidSpringPhysics}
                  className={`h-full rounded-full ${
                    emp.readiness >= 80 ? 'bg-emerald-500' : emp.readiness >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                />
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {emp.badges.slice(0, 2).map((badge, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[var(--accent)]/[0.06] border border-[var(--accent)]/15 text-[var(--accent)] rounded-lg text-[9px] font-bold">
                    🏆 {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Radar Chart */}
        <motion.div className="lg:col-span-2 liquid-glass rounded-3xl p-6 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEmp.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2">
                    <Target className="w-5 h-5 text-[var(--accent)]" /> Skill Radar — {activeEmp.name}
                  </h2>
                  <p className="text-sm text-muted mt-1">Current competencies vs {activeEmp.nextLevel} requirements</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" /> Current</span>
                  <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-400 opacity-60" /> Required</span>
                </div>
              </div>

              <div className="flex-1 min-h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="var(--glass-border)" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--muted)', fontSize: 11, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Current" dataKey="current" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.15} strokeWidth={2.5} dot={{ r: 4, fill: "var(--accent)" }} />
                    <Radar name="Required" dataKey="required" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.05} strokeWidth={1.5} strokeDasharray="4 3" dot={{ r: 3, fill: "#f43f5e", opacity: 0.6 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="liquid-glass-elevated rounded-xl p-3 shadow-xl text-sm">
                              <p className="font-bold text-foreground mb-1">{payload[0]?.payload?.skill}</p>
                              <p className="font-mono text-[var(--accent)]">Current: {payload[0]?.value}%</p>
                              <p className="font-mono text-rose-400">Required: {payload[1]?.value}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Gap Analysis Panel */}
        <motion.div className="liquid-glass rounded-3xl p-6 flex flex-col gap-5">
          <h3 className="micro-label">Promotion Readiness</h3>

          {/* Readiness Ring */}
          <div className="flex flex-col items-center py-4">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--glass-border)" strokeWidth="6" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke={activeEmp.readiness >= 80 ? '#10b981' : activeEmp.readiness >= 60 ? '#f59e0b' : '#f43f5e'}
                  strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${activeEmp.readiness * 2.64} 264`}
                  initial={{ strokeDasharray: "0 264" }}
                  animate={{ strokeDasharray: `${activeEmp.readiness * 2.64} 264` }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-extrabold tabular-nums ${
                  activeEmp.readiness >= 80 ? 'text-emerald-500' : activeEmp.readiness >= 60 ? 'text-amber-500' : 'text-rose-500'
                }`}>{activeEmp.readiness}%</span>
                <span className="micro-label">Ready</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--accent)]/5 border border-[var(--accent)]/15 text-center">
            <p className="micro-label text-[var(--accent)] mb-1">Next Promotion</p>
            <p className="text-sm font-bold text-foreground">{activeEmp.nextLevel}</p>
          </div>

          {/* Skill Gaps */}
          {gaps.length > 0 && (
            <div>
              <h4 className="micro-label text-rose-500 mb-3 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Skill Gaps ({gaps.length})
              </h4>
              <div className="space-y-3">
                {gaps.map((gap, idx) => {
                  const deficit = gap.required - gap.current;
                  return (
                    <div key={idx} className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold text-foreground">{gap.skill}</span>
                        <span className="text-xs font-mono text-rose-500">-{deficit}pts</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-foreground/[0.06] overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${gap.current}%` }}
                          transition={liquidSpringPhysics}
                          className="h-full rounded-full bg-[var(--accent)]"
                        />
                        <div
                          className="absolute top-0 h-full w-0.5 bg-rose-500"
                          style={{ left: `${gap.required}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-[9px] text-muted font-mono">
                        <span>Current: {gap.current}%</span>
                        <span>Target: {gap.required}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="mt-auto">
            <h4 className="micro-label mb-2">Earned Badges</h4>
            <div className="flex flex-wrap gap-2">
              {activeEmp.badges.map((badge, i) => (
                <span key={i} className="px-2.5 py-1 bg-[var(--accent)]/[0.06] border border-[var(--accent)]/15 text-[var(--accent)] rounded-xl text-[10px] font-bold flex items-center gap-1">
                  <Award className="w-3 h-3" /> {badge}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
