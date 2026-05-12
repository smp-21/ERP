"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Factory, Zap, Activity, AlertTriangle, Thermometer, Gauge, Clock, ChevronRight, RotateCw, Wrench } from "lucide-react";
import { organicInteractions, liquidSpringPhysics, snappySpring, glassPanelVariants, childItemVariants } from "@/lib/motion";

// =============================================
// Shop Floor Machine Layout
// =============================================
interface Machine {
  id: string;
  name: string;
  type: "cnc" | "lathe" | "assembly" | "qa" | "conveyor" | "furnace";
  status: "active" | "maintenance" | "idle" | "critical";
  efficiency: number;
  temperature: number;
  rpm: number;
  uptime: string;
  x: number; y: number; // grid position (percentage)
  w: number; h: number; // size (percentage)
  currentJob?: string;
}

const SHOP_FLOOR_MACHINES: Machine[] = [
  { id: "CNC-01", name: "5-Axis Milling Center", type: "cnc", status: "active", efficiency: 94, temperature: 62, rpm: 8200, uptime: "312h", x: 3, y: 5, w: 22, h: 25, currentJob: "EV-Motor-Housing-Batch-42" },
  { id: "CNC-02", name: "CNC Lathe Station", type: "lathe", status: "maintenance", efficiency: 0, temperature: 28, rpm: 0, uptime: "0h", x: 28, y: 5, w: 20, h: 25, currentJob: "Down for bearing replacement" },
  { id: "FRN-01", name: "Heat Treatment Furnace", type: "furnace", status: "active", efficiency: 88, temperature: 842, rpm: 0, uptime: "156h", x: 51, y: 5, w: 22, h: 25 },
  { id: "QCK-01", name: "Vision QA System", type: "qa", status: "active", efficiency: 100, temperature: 34, rpm: 0, uptime: "512h", x: 76, y: 5, w: 21, h: 25 },

  { id: "CVY-01", name: "Main Conveyor Line", type: "conveyor", status: "active", efficiency: 96, temperature: 38, rpm: 120, uptime: "720h", x: 3, y: 35, w: 94, h: 8 },

  { id: "ASB-01", name: "Robotic Assembly Cell A", type: "assembly", status: "active", efficiency: 98, temperature: 45, rpm: 3400, uptime: "480h", x: 3, y: 48, w: 30, h: 25, currentJob: "Motor-Assembly-EV-V2" },
  { id: "ASB-02", name: "Robotic Assembly Cell B", type: "assembly", status: "idle", efficiency: 0, temperature: 25, rpm: 0, uptime: "48h", x: 36, y: 48, w: 28, h: 25 },
  { id: "CNC-03", name: "Precision Grinding", type: "cnc", status: "critical", efficiency: 12, temperature: 95, rpm: 1200, uptime: "8h", x: 67, y: 48, w: 30, h: 25, currentJob: "EMERGENCY: Vibration anomaly" },

  { id: "CVY-02", name: "Output Conveyor", type: "conveyor", status: "active", efficiency: 92, temperature: 36, rpm: 110, uptime: "700h", x: 3, y: 78, w: 94, h: 8 },
];

const SHIFT_DATA = [
  { time: "08:00", output: 120, target: 150 },
  { time: "09:00", output: 145, target: 150 },
  { time: "10:00", output: 160, target: 150 },
  { time: "11:00", output: 130, target: 150 },
  { time: "12:00", output: 95, target: 150 },
  { time: "13:00", output: 155, target: 150 },
  { time: "14:00", output: 150, target: 150 },
  { time: "15:00", output: 140, target: 150 },
];

function getStatusConfig(status: string) {
  switch(status) {
    case "active": return { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-500", glow: "shadow-[0_0_12px_rgba(16,185,129,0.25)]", label: "Active", pulseDot: "bg-emerald-500" };
    case "maintenance": return { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-500", glow: "shadow-[0_0_12px_rgba(245,158,11,0.25)]", label: "Maintenance", pulseDot: "bg-amber-500" };
    case "idle": return { bg: "bg-foreground/[0.04]", border: "border-[var(--glass-border)]", text: "text-muted", glow: "", label: "Idle", pulseDot: "bg-foreground/30" };
    case "critical": return { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-500", glow: "shadow-[0_0_16px_rgba(244,63,94,0.35)]", label: "Critical", pulseDot: "bg-rose-500" };
    default: return { bg: "", border: "", text: "", glow: "", label: "", pulseDot: "" };
  }
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="liquid-glass-elevated rounded-xl p-3 shadow-xl text-sm">
        <p className="font-sans font-bold text-foreground mb-1">{label} Shift</p>
        <p className="font-mono text-[var(--accent)]">Output: {payload[0].value} Units</p>
      </div>
    );
  }
  return null;
};

function FloorMachine({ machine, onClick, isSelected }: { machine: Machine; onClick: () => void; isSelected: boolean }) {
  const cfg = getStatusConfig(machine.status);
  const isConveyor = machine.type === "conveyor";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.random() * 0.2, ...snappySpring }}
      onClick={onClick}
      className={`absolute rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden ${cfg.bg} ${cfg.glow} border ${cfg.border} ${
        isSelected ? 'ring-2 ring-[var(--accent)] z-20' : 'z-10 hover:z-20'
      } ${isConveyor ? 'rounded-xl' : ''}`}
      style={{
        left: `${machine.x}%`,
        top: `${machine.y}%`,
        width: `${machine.w}%`,
        height: `${machine.h}%`,
      }}
    >
      <div className={`h-full w-full flex ${isConveyor ? 'items-center justify-between px-4' : 'flex-col justify-between p-3'}`}>
        {/* Machine Header */}
        <div className={`flex items-center gap-2 ${isConveyor ? '' : 'mb-auto'}`}>
          {/* Status Pulse */}
          <div className="relative">
            <div className={`w-2.5 h-2.5 rounded-full ${cfg.pulseDot}`} />
            {(machine.status === "active" || machine.status === "critical") && (
              <div className={`absolute inset-0 w-2.5 h-2.5 rounded-full ${cfg.pulseDot} animate-ping opacity-40`} />
            )}
          </div>
          <span className="micro-label text-foreground/80 truncate">{machine.id}</span>
        </div>

        {!isConveyor && (
          <>
            <div className="flex-1 flex items-center justify-center">
              <span className={`text-2xl font-extrabold tabular-nums ${cfg.text}`}>
                {machine.status === "idle" ? "—" : `${machine.efficiency}%`}
              </span>
            </div>
            <div className="mt-auto">
              <p className="text-[9px] font-bold text-foreground/60 truncate uppercase tracking-wider">{machine.name}</p>
            </div>
          </>
        )}

        {isConveyor && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground/60">{machine.name}</span>
            </div>
            {/* Animated conveyor dots */}
            <div className="flex items-center gap-3 opacity-40">
              {[0,1,2,3,4,5].map(i => (
                <motion.div
                  key={i}
                  animate={{ x: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "linear" }}
                  className={`w-1.5 h-1.5 rounded-full ${cfg.pulseDot}`}
                />
              ))}
            </div>
            <span className={`text-sm font-mono font-bold tabular-nums ${cfg.text}`}>{machine.efficiency}%</span>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function ManufacturingProductionPage() {
  const [selectedMachine, setSelectedMachine] = useState<string | null>("CNC-01");
  const activeMachine = SHOP_FLOOR_MACHINES.find(m => m.id === selectedMachine);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Digital Twin — Shop Floor"
        description="Real-time 2D interactive factory map with machine telemetry and shift analytics."
        breadcrumbs={[{ label: "Manufacturing" }, { label: "Production" }]}
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="micro-label text-emerald-600 dark:text-emerald-400">Live Feed</span>
            </div>
            <motion.button
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              className="p-2 rounded-xl liquid-glass text-muted hover:text-foreground cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
            </motion.button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Shop Floor Map */}
        <motion.div
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-3 liquid-glass rounded-3xl p-4 flex flex-col"
        >
          <div className="flex justify-between items-center mb-3 px-2">
            <h2 className="text-sm font-bold text-foreground tracking-tight flex items-center gap-2">
              <Factory className="w-4 h-4 text-[var(--accent)]" /> Plant 2 — Sector A (Top View)
            </h2>
            <div className="flex gap-4 text-xs text-muted">
              {["active", "maintenance", "idle", "critical"].map(s => (
                <span key={s} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${getStatusConfig(s).pulseDot}`} />
                  {getStatusConfig(s).label}
                </span>
              ))}
            </div>
          </div>

          {/* Floor Canvas */}
          <div className="relative flex-1 min-h-[450px] rounded-2xl bg-foreground/[0.02] border border-[var(--glass-border)] overflow-hidden">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
              backgroundSize: '48px 48px'
            }} />

            {/* Zone Labels */}
            <div className="absolute top-[2%] left-[3%] micro-label text-foreground/20 text-[9px]">ZONE A — CNC & THERMAL</div>
            <div className="absolute top-[44%] left-[3%] micro-label text-foreground/20 text-[9px]">ZONE B — ASSEMBLY</div>
            <div className="absolute top-[88%] left-[3%] micro-label text-foreground/20 text-[9px]">ZONE C — OUTPUT</div>

            {/* Machines */}
            {SHOP_FLOOR_MACHINES.map(machine => (
              <FloorMachine
                key={machine.id}
                machine={machine}
                onClick={() => setSelectedMachine(selectedMachine === machine.id ? null : machine.id)}
                isSelected={selectedMachine === machine.id}
              />
            ))}
          </div>
        </motion.div>

        {/* Machine Inspector + Shift Chart */}
        <div className="flex flex-col gap-6">
          {/* Inspector */}
          <motion.div
            variants={glassPanelVariants}
            initial="hidden"
            animate="visible"
            className="liquid-glass rounded-3xl p-6 flex-1 flex flex-col overflow-hidden"
          >
            <h3 className="micro-label mb-4">Machine Inspector</h3>

            <AnimatePresence mode="wait">
              {activeMachine ? (
                <motion.div
                  key={activeMachine.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={snappySpring}
                  className="flex-1 flex flex-col gap-3 overflow-y-auto scrollbar-hide"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--glass-border)]">
                    <div>
                      <h4 className="font-extrabold text-foreground tracking-tight text-lg">{activeMachine.id}</h4>
                      <p className="text-xs text-muted">{activeMachine.name}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg micro-label border ${
                      activeMachine.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      activeMachine.status === 'critical' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                      activeMachine.status === 'maintenance' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-foreground/[0.06] text-muted border-[var(--glass-border)]'
                    }`}>
                      {getStatusConfig(activeMachine.status).label}
                    </span>
                  </div>

                  {/* Telemetry Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                      <p className="micro-label flex items-center gap-1"><Gauge className="w-3 h-3" /> Efficiency</p>
                      <p className={`text-xl font-extrabold tabular-nums mt-1 ${getStatusConfig(activeMachine.status).text}`}>
                        {activeMachine.efficiency}%
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                      <p className="micro-label flex items-center gap-1"><Thermometer className="w-3 h-3" /> Temp</p>
                      <p className={`text-xl font-extrabold tabular-nums mt-1 ${activeMachine.temperature > 80 ? 'text-rose-500' : 'text-foreground'}`}>
                        {activeMachine.temperature}°C
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                      <p className="micro-label flex items-center gap-1"><Activity className="w-3 h-3" /> RPM</p>
                      <p className="text-xl font-extrabold tabular-nums mt-1 text-foreground">{activeMachine.rpm.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                      <p className="micro-label flex items-center gap-1"><Clock className="w-3 h-3" /> Uptime</p>
                      <p className="text-xl font-extrabold tabular-nums mt-1 text-foreground">{activeMachine.uptime}</p>
                    </div>
                  </div>

                  {/* Current Job */}
                  {activeMachine.currentJob && (
                    <div className={`p-3 rounded-xl border ${
                      activeMachine.status === 'critical' ? 'bg-rose-500/5 border-rose-500/20' :
                      activeMachine.status === 'maintenance' ? 'bg-amber-500/5 border-amber-500/20' :
                      'bg-[var(--accent)]/5 border-[var(--accent)]/15'
                    }`}>
                      <p className="micro-label mb-1">
                        {activeMachine.status === 'critical' ? 'ALERT' : activeMachine.status === 'maintenance' ? 'REASON' : 'CURRENT JOB'}
                      </p>
                      <p className="text-xs font-bold text-foreground">{activeMachine.currentJob}</p>
                    </div>
                  )}

                  <motion.button
                    whileHover={organicInteractions.hover}
                    whileTap={organicInteractions.tap}
                    className="mt-auto w-full py-3 bg-foreground/[0.04] border border-[var(--glass-border)] text-foreground font-bold text-sm rounded-xl hover:bg-foreground/[0.08] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Wrench className="w-4 h-4" /> Open Service Log
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center text-muted gap-3"
                >
                  <Factory className="w-10 h-10 opacity-20" />
                  <p className="text-xs font-medium">Select a machine on the floor map</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* OEE Gauge */}
          <motion.div className="liquid-glass rounded-3xl p-6">
            <h2 className="micro-label mb-4">Live OEE</h2>
            <div className="flex items-center justify-center p-6 bg-foreground/[0.03] rounded-2xl border border-[var(--glass-border)] relative overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-28 h-28 border-2 border-dashed border-[var(--accent)]/15 rounded-full"
              />
              <div className="relative z-10 flex flex-col items-center">
                <Zap className="w-6 h-6 text-[var(--accent)] mb-2" />
                <span className="text-3xl font-extrabold text-foreground tabular-nums">94.2%</span>
                <span className="micro-label mt-1">Overall Equipment Effectiveness</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
