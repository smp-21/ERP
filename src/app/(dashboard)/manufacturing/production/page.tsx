"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Factory, Zap, Activity, AlertTriangle } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const SHIFT_DATA = [
  { time: "08:00", output: 120, target: 150 },
  { time: "09:00", output: 145, target: 150 },
  { time: "10:00", output: 160, target: 150 },
  { time: "11:00", output: 130, target: 150 },
  { time: "12:00", output: 95, target: 150 }, // Lunch dip
  { time: "13:00", output: 155, target: 150 },
  { time: "14:00", output: 150, target: 150 },
  { time: "15:00", output: 140, target: 150 },
];

const MACHINES = [
  { id: "CNC-01", name: "5-Axis Milling", status: "Active", eff: 94, load: "High" },
  { id: "CNC-02", name: "Lathe Machine", status: "Maintenance", eff: 0, load: "None" },
  { id: "ASB-01", name: "Robotic Assembly", status: "Active", eff: 98, load: "Optimal" },
  { id: "QCK-01", name: "Vision QA System", status: "Active", eff: 100, load: "Low" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="liquid-glass rounded-xl p-3 shadow-xl border border-foreground/10 text-sm">
        <p className="font-sans font-semibold text-foreground mb-1">{label} Shift</p>
        <p className="font-mono text-indigo-500 dark:text-indigo-400">Output: {payload[0].value} Units</p>
      </div>
    );
  }
  return null;
};

export default function ManufacturingProductionPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Shop Floor Monitor"
        description="Real-time production throughput, machine telemetry, and shift analytics."
        breadcrumbs={[{ label: "Manufacturing" }, { label: "Production" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-2 liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-lg font-sans font-semibold text-foreground">Hourly Output</h2>
              <p className="text-sm text-muted">Current Shift (Morning 08:00 - 16:00)</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Output</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-foreground/10"></div> Target</span>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SHIFT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'rgba(150,150,150,0.05)' }} content={<CustomTooltip />} />
                
                {/* Background bars for target */}
                <Bar dataKey="target" fill="var(--foreground)" fillOpacity={0.05} radius={[4, 4, 0, 0]} barSize={40} />
                {/* Actual output bars overlaid */}
                <Bar dataKey="output" radius={[4, 4, 0, 0]} barSize={40}>
                  {SHIFT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.output >= entry.target ? "#818cf8" : "#f43f5e"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div className="liquid-glass rounded-3xl p-6 border border-foreground/10">
            <h2 className="text-sm font-sans font-semibold text-muted uppercase tracking-wider mb-4">Live Telemetry</h2>
            <div className="flex items-center justify-center p-6 bg-foreground/5 rounded-2xl border border-foreground/10 relative overflow-hidden group">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32 border-2 border-dashed border-indigo-500/20 rounded-full"
              />
              <div className="relative z-10 flex flex-col items-center">
                <Zap className="w-8 h-8 text-indigo-500 mb-2" />
                <span className="text-3xl font-bold text-foreground">94.2%</span>
                <span className="text-xs text-muted mt-1">OEE (Overall Equip. Effectiveness)</span>
              </div>
            </div>
          </motion.div>

          <div className="flex-1 liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col">
            <h2 className="text-sm font-sans font-semibold text-muted uppercase tracking-wider mb-4">Active Nodes</h2>
            <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
              {MACHINES.map(m => (
                <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-foreground/5 border border-foreground/5 hover:border-foreground/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${m.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-amber-500'}`} />
                    <div>
                      <p className="font-semibold text-sm text-foreground leading-tight">{m.name}</p>
                      <p className="text-xs text-muted font-mono mt-0.5">{m.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono font-bold text-foreground">{m.eff}%</p>
                    <p className="text-[10px] text-muted uppercase">{m.load}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
