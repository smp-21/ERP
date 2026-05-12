"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  Warehouse, Package, Flame, Snowflake, AlertTriangle, TrendingUp,
  ArrowUpRight, ArrowDownRight, RotateCw, Layers, Box
} from "lucide-react";
import { organicInteractions, liquidSpringPhysics, snappySpring, glassPanelVariants, childItemVariants } from "@/lib/motion";

// =============================================
// Warehouse Shelf Grid Data
// =============================================
interface ShelfSlot {
  id: string;
  zone: string;
  sku: string;
  name: string;
  qty: number;
  capacity: number;
  velocity: "fast" | "medium" | "slow" | "dead";
  value: number;
  lastMoved: string;
}

const SHELF_DATA: ShelfSlot[][] = [
  // Row A
  [
    { id: "A1", zone: "A", sku: "SKU-8482", name: "Ball Bearings SKF-6205", qty: 2400, capacity: 3000, velocity: "fast", value: 480000, lastMoved: "2h ago" },
    { id: "A2", zone: "A", sku: "SKU-3403", name: "Cutting Oil ISO-68", qty: 180, capacity: 500, velocity: "medium", value: 126000, lastMoved: "1d ago" },
    { id: "A3", zone: "A", sku: "SKU-7318", name: "Tapered Roller Bearing", qty: 800, capacity: 1000, velocity: "fast", value: 960000, lastMoved: "4h ago" },
    { id: "A4", zone: "A", sku: "SKU-8544", name: "Copper Wire Spool 4mm", qty: 45, capacity: 200, velocity: "slow", value: 67500, lastMoved: "12d ago" },
    { id: "A5", zone: "A", sku: "SKU-7308", name: "Angular Contact Bearing", qty: 1200, capacity: 1500, velocity: "fast", value: 360000, lastMoved: "1h ago" },
    { id: "A6", zone: "A", sku: "SKU-9021", name: "Hydraulic Hose 1/2\"", qty: 320, capacity: 800, velocity: "medium", value: 96000, lastMoved: "3d ago" },
  ],
  // Row B
  [
    { id: "B1", zone: "B", sku: "SKU-2210", name: "Stainless Hex Bolt M12", qty: 5000, capacity: 10000, velocity: "fast", value: 75000, lastMoved: "30m ago" },
    { id: "B2", zone: "B", sku: "SKU-4418", name: "Welding Electrode 3.15mm", qty: 8, capacity: 500, velocity: "dead", value: 2400, lastMoved: "45d ago" },
    { id: "B3", zone: "B", sku: "SKU-6601", name: "Pneumatic Cylinder 50mm", qty: 60, capacity: 100, velocity: "medium", value: 180000, lastMoved: "5d ago" },
    { id: "B4", zone: "B", sku: "SKU-1105", name: "Rubber O-Ring Kit", qty: 1500, capacity: 2000, velocity: "fast", value: 22500, lastMoved: "2h ago" },
    { id: "B5", zone: "B", sku: "SKU-7744", name: "Precision Dowel Pin 8mm", qty: 12, capacity: 1000, velocity: "dead", value: 3600, lastMoved: "60d ago" },
    { id: "B6", zone: "B", sku: "SKU-3302", name: "Thermal Paste HTC-25", qty: 420, capacity: 600, velocity: "medium", value: 63000, lastMoved: "7d ago" },
  ],
  // Row C
  [
    { id: "C1", zone: "C", sku: "SKU-5580", name: "Neodymium Magnet N52", qty: 900, capacity: 1000, velocity: "fast", value: 1350000, lastMoved: "3h ago" },
    { id: "C2", zone: "C", sku: "SKU-2290", name: "Carbon Brush Set", qty: 200, capacity: 400, velocity: "medium", value: 60000, lastMoved: "4d ago" },
    { id: "C3", zone: "C", sku: "SKU-9911", name: "PTFE Gasket 100mm", qty: 3, capacity: 200, velocity: "dead", value: 900, lastMoved: "90d ago" },
    { id: "C4", zone: "C", sku: "SKU-1187", name: "Titanium Shaft 20mm", qty: 150, capacity: 200, velocity: "fast", value: 975000, lastMoved: "6h ago" },
    { id: "C5", zone: "C", sku: "SKU-4400", name: "Safety Gloves (L)", qty: 85, capacity: 500, velocity: "slow", value: 12750, lastMoved: "14d ago" },
    { id: "C6", zone: "C", sku: "SKU-8800", name: "Steel Lamination 0.5mm", qty: 2200, capacity: 3000, velocity: "fast", value: 770000, lastMoved: "1h ago" },
  ],
];

const VELOCITY_CONFIG = {
  fast: { label: "Hot", color: "bg-indigo-500", glow: "shadow-[0_0_16px_rgba(99,102,241,0.5)]", text: "text-indigo-500", border: "border-indigo-500/30", bg: "bg-indigo-500/15" },
  medium: { label: "Warm", color: "bg-sky-500", glow: "shadow-[0_0_12px_rgba(14,165,233,0.3)]", text: "text-sky-500", border: "border-sky-500/25", bg: "bg-sky-500/10" },
  slow: { label: "Cool", color: "bg-amber-500", glow: "", text: "text-amber-500", border: "border-amber-500/20", bg: "bg-amber-500/8" },
  dead: { label: "Cold", color: "bg-slate-400", glow: "", text: "text-slate-400", border: "border-slate-400/20", bg: "bg-slate-400/8" },
};

function getHeatIntensity(velocity: string, fillPercent: number): string {
  if (velocity === "fast") return fillPercent > 60 ? "bg-indigo-500/25" : "bg-indigo-500/15";
  if (velocity === "medium") return "bg-sky-500/10";
  if (velocity === "slow") return "bg-amber-500/8";
  return "bg-slate-300/5 dark:bg-slate-600/5";
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="liquid-glass-elevated rounded-xl p-3 shadow-xl text-sm">
        <p className="font-sans font-bold text-foreground mb-1">{label}</p>
        <p className="font-mono text-[var(--accent)]">₹{(payload[0].value / 1000).toFixed(0)}K Value</p>
      </div>
    );
  }
  return null;
};

export default function WarehouseHeatmapPage() {
  const [selectedSlot, setSelectedSlot] = useState<ShelfSlot | null>(null);

  const velocityStats = {
    fast: SHELF_DATA.flat().filter(s => s.velocity === "fast").length,
    medium: SHELF_DATA.flat().filter(s => s.velocity === "medium").length,
    slow: SHELF_DATA.flat().filter(s => s.velocity === "slow").length,
    dead: SHELF_DATA.flat().filter(s => s.velocity === "dead").length,
  };

  const topValueItems = SHELF_DATA.flat().sort((a, b) => b.value - a.value).slice(0, 6).map(s => ({
    name: s.id,
    value: s.value,
    velocity: s.velocity,
  }));

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Spatial Warehouse Heatmap"
        description="Visual inventory density map. Fast-moving stock glows 'hot' — dead stock is 'cold'."
        breadcrumbs={[{ label: "Inventory" }, { label: "Warehouse" }]}
        actions={
          <div className="flex items-center gap-3">
            {Object.entries(VELOCITY_CONFIG).map(([key, cfg]) => (
              <span key={key} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${cfg.color}`} />
                <span className="micro-label">{cfg.label} ({velocityStats[key as keyof typeof velocityStats]})</span>
              </span>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Heatmap Grid */}
        <motion.div
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-3 liquid-glass rounded-3xl p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Warehouse className="w-5 h-5 text-[var(--accent)]" /> Floor Plan — Rack View
            </h2>
            <motion.button
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              className="p-2 rounded-xl liquid-glass text-muted hover:text-foreground cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto scrollbar-hide">
            {SHELF_DATA.map((row, rowIdx) => (
              <div key={rowIdx}>
                <p className="micro-label mb-2 px-1">AISLE {String.fromCharCode(65 + rowIdx)}</p>
                <div className="grid grid-cols-6 gap-3">
                  {row.map((slot) => {
                    const cfg = VELOCITY_CONFIG[slot.velocity];
                    const fillPct = Math.round((slot.qty / slot.capacity) * 100);
                    const isSelected = selectedSlot?.id === slot.id;
                    return (
                      <motion.div
                        key={slot.id}
                        variants={childItemVariants}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedSlot(isSelected ? null : slot)}
                        className={`relative rounded-2xl p-3 cursor-pointer border transition-all overflow-hidden ${cfg.border} ${isSelected ? `ring-2 ring-[var(--accent)] ${cfg.glow}` : ''} ${getHeatIntensity(slot.velocity, fillPct)}`}
                      >
                        {/* Heat glow overlay for fast movers */}
                        {slot.velocity === "fast" && (
                          <div className={`absolute inset-0 ${cfg.color} opacity-[0.06] animate-pulse`} style={{ animationDuration: '3s' }} />
                        )}

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-xs font-bold text-foreground">{slot.id}</span>
                            <span className={`micro-label ${cfg.text}`}>{cfg.label}</span>
                          </div>

                          <p className="text-[10px] text-muted truncate mb-2">{slot.name}</p>

                          <div className={`text-xl font-extrabold tabular-nums ${cfg.text}`}>
                            {fillPct}%
                          </div>

                          {/* Fill bar */}
                          <div className="w-full h-1.5 rounded-full bg-foreground/[0.06] mt-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${fillPct}%` }}
                              transition={liquidSpringPhysics}
                              className={`h-full rounded-full ${cfg.color}`}
                            />
                          </div>

                          <p className="text-[9px] text-muted mt-1.5 font-mono">{slot.qty.toLocaleString()} / {slot.capacity.toLocaleString()}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Inspector + Chart */}
        <div className="flex flex-col gap-6">
          {/* Slot Inspector */}
          <motion.div className="liquid-glass rounded-3xl p-6 flex-1 flex flex-col">
            <h3 className="micro-label mb-4">Slot Inspector</h3>

            <AnimatePresence mode="wait">
              {selectedSlot ? (
                <motion.div
                  key={selectedSlot.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={snappySpring}
                  className="flex-1 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--glass-border)]">
                    <div>
                      <h4 className="font-extrabold text-foreground text-lg">{selectedSlot.id}</h4>
                      <p className="text-xs text-muted">{selectedSlot.name}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-lg micro-label border ${VELOCITY_CONFIG[selectedSlot.velocity].bg} ${VELOCITY_CONFIG[selectedSlot.velocity].text} ${VELOCITY_CONFIG[selectedSlot.velocity].border}`}>
                      {VELOCITY_CONFIG[selectedSlot.velocity].label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                      <p className="micro-label flex items-center gap-1"><Package className="w-3 h-3" /> Quantity</p>
                      <p className="text-xl font-extrabold text-foreground tabular-nums mt-1">{selectedSlot.qty.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                      <p className="micro-label flex items-center gap-1"><Layers className="w-3 h-3" /> Capacity</p>
                      <p className="text-xl font-extrabold text-foreground tabular-nums mt-1">{selectedSlot.capacity.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                    <p className="micro-label mb-1">Inventory Value</p>
                    <p className="text-2xl font-extrabold text-[var(--accent)] tabular-nums font-mono">₹{selectedSlot.value.toLocaleString('en-IN')}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                    <p className="micro-label mb-1">Last Moved</p>
                    <p className="text-sm font-bold text-foreground">{selectedSlot.lastMoved}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                    <p className="micro-label mb-1">SKU</p>
                    <p className="text-sm font-mono font-bold text-foreground">{selectedSlot.sku}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center gap-3 text-muted">
                  <Box className="w-10 h-10 opacity-20" />
                  <p className="text-xs font-medium">Click a shelf slot to inspect</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Top Value Chart */}
          <motion.div className="liquid-glass rounded-3xl p-6">
            <h3 className="micro-label mb-4">Top Value Slots</h3>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topValueItems} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {topValueItems.map((item, idx) => (
                      <Cell key={idx} fill={item.velocity === "fast" ? "#818cf8" : item.velocity === "medium" ? "#0ea5e9" : "#94a3b8"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
