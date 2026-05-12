"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import {
  IndianRupee, TrendingUp, TrendingDown, Calendar, ArrowUpRight,
  ArrowDownRight, Clock, Wallet, CreditCard, Banknote, SlidersHorizontal
} from "lucide-react";
import { organicInteractions, liquidSpringPhysics, glassPanelVariants, childItemVariants } from "@/lib/motion";

// =============================================
// Cash Flow Projection Engine
// =============================================
const BASE_BALANCE = 4200000; // ₹42L opening balance

interface CashEvent {
  day: number;
  label: string;
  type: "inflow" | "outflow";
  amount: number;
  category: string;
}

const CASH_EVENTS: CashEvent[] = [
  { day: 3, label: "GST Refund", type: "inflow", amount: 380000, category: "Tax" },
  { day: 5, label: "Vendor Payment — Alpha Metals", type: "outflow", amount: 520000, category: "Procurement" },
  { day: 7, label: "Invoice #INV-442 — Reliance", type: "inflow", amount: 1250000, category: "Sales" },
  { day: 10, label: "Payroll Disbursement", type: "outflow", amount: 890000, category: "HR" },
  { day: 12, label: "Invoice #INV-445 — Tata Motors", type: "inflow", amount: 680000, category: "Sales" },
  { day: 14, label: "Utility Bills", type: "outflow", amount: 120000, category: "Operations" },
  { day: 15, label: "Vendor Payment — TechComp", type: "outflow", amount: 340000, category: "Procurement" },
  { day: 18, label: "Insurance Premium", type: "outflow", amount: 175000, category: "Insurance" },
  { day: 20, label: "Invoice #INV-448 — Adani Power", type: "inflow", amount: 950000, category: "Sales" },
  { day: 22, label: "Raw Material — Omega Polymers", type: "outflow", amount: 620000, category: "Procurement" },
  { day: 25, label: "Invoice #INV-451 — BHEL", type: "inflow", amount: 1100000, category: "Sales" },
  { day: 27, label: "Freight & Logistics", type: "outflow", amount: 280000, category: "Logistics" },
  { day: 28, label: "TDS Deposit", type: "outflow", amount: 165000, category: "Tax" },
  { day: 30, label: "Advance — JSW Steel", type: "inflow", amount: 2250000, category: "Sales" },
];

function generateCashFlowData(horizonDays: number) {
  const data: { day: number; balance: number; label: string }[] = [];
  let balance = BASE_BALANCE;
  data.push({ day: 0, balance, label: "Opening Balance" });

  for (let d = 1; d <= 30; d++) {
    const dayEvents = CASH_EVENTS.filter(e => e.day === d);
    let dayLabel = `Day ${d}`;
    for (const event of dayEvents) {
      if (d <= horizonDays) {
        if (event.type === "inflow") balance += event.amount;
        else balance -= event.amount;
        dayLabel = event.label;
      }
    }
    data.push({ day: d, balance, label: dayLabel });
  }
  return data;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const bal = payload[0].value;
    return (
      <div className="liquid-glass-elevated rounded-xl p-3 shadow-xl text-sm min-w-[180px]">
        <p className="font-sans font-bold text-foreground mb-1">Day {label}</p>
        <p className="font-mono text-[var(--accent)]">₹{(bal / 100000).toFixed(2)} Lakhs</p>
        <p className="text-[10px] text-muted mt-1">{payload[0]?.payload?.label}</p>
      </div>
    );
  }
  return null;
};

export default function CashFlowTimeMachinePage() {
  const [horizonDays, setHorizonDays] = useState(30);

  const cashData = useMemo(() => generateCashFlowData(horizonDays), [horizonDays]);
  const projectedBalance = cashData[cashData.length - 1].balance;
  const delta = projectedBalance - BASE_BALANCE;
  const isPositive = delta >= 0;

  const totalInflows = CASH_EVENTS.filter(e => e.type === "inflow" && e.day <= horizonDays).reduce((s, e) => s + e.amount, 0);
  const totalOutflows = CASH_EVENTS.filter(e => e.type === "outflow" && e.day <= horizonDays).reduce((s, e) => s + e.amount, 0);

  const upcomingEvents = CASH_EVENTS.filter(e => e.day > 0 && e.day <= horizonDays).sort((a, b) => a.day - b.day);

  return (
    <div className="flex flex-col h-full gap-6 overflow-y-auto pb-6">
      <GlassPageHeader
        title="Cash Flow Time-Machine"
        description="Drag the slider to project future bank balances based on expected payables and receivables."
        breadcrumbs={[{ label: "Finance" }, { label: "Accounts" }]}
      />

      {/* KPI Strip */}
      <motion.div
        variants={glassPanelVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Opening Balance", value: `₹${(BASE_BALANCE / 100000).toFixed(1)}L`, icon: Wallet, color: "text-foreground", glow: "" },
          { label: "Total Inflows", value: `₹${(totalInflows / 100000).toFixed(1)}L`, icon: ArrowUpRight, color: "text-emerald-500", glow: "bg-emerald-500" },
          { label: "Total Outflows", value: `₹${(totalOutflows / 100000).toFixed(1)}L`, icon: ArrowDownRight, color: "text-rose-500", glow: "bg-rose-500" },
          { label: `Projected (Day ${horizonDays})`, value: `₹${(projectedBalance / 100000).toFixed(1)}L`, icon: isPositive ? TrendingUp : TrendingDown, color: isPositive ? "text-emerald-500" : "text-rose-500", glow: isPositive ? "bg-emerald-500" : "bg-rose-500" },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            variants={childItemVariants}
            className="liquid-glass rounded-2xl p-5 flex items-center justify-between group relative overflow-hidden"
          >
            <div className={`absolute -right-6 -top-6 w-16 h-16 rounded-full blur-[30px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${kpi.glow}`} />
            <div className="relative z-10">
              <p className="micro-label mb-1">{kpi.label}</p>
              <p className={`text-2xl font-extrabold tabular-nums font-mono ${kpi.color}`}>{kpi.value}</p>
            </div>
            <kpi.icon className={`w-6 h-6 ${kpi.color} opacity-30`} />
          </motion.div>
        ))}
      </motion.div>

      {/* Time-Machine Slider */}
      <motion.div className="liquid-glass rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[var(--accent)]" /> Projection Horizon
          </h2>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20">
            <Calendar className="w-4 h-4 text-[var(--accent)]" />
            <span className="micro-label text-[var(--accent)]">Day {horizonDays} of 30</span>
          </div>
        </div>

        <div className="relative px-2">
          <input
            type="range"
            min={1}
            max={30}
            value={horizonDays}
            onChange={(e) => setHorizonDays(parseInt(e.target.value))}
            className="w-full h-2 bg-foreground/[0.08] rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)]
              [&::-webkit-slider-thumb]:shadow-[0_0_12px_var(--glow-accent)] [&::-webkit-slider-thumb]:cursor-grab
              [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/50"
          />
          <div className="flex justify-between text-[10px] text-muted font-mono mt-2">
            <span>Day 1</span>
            <span>Day 10</span>
            <span>Day 20</span>
            <span>Day 30</span>
          </div>
        </div>
      </motion.div>

      {/* Cash Flow Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-2 liquid-glass rounded-3xl p-6 flex flex-col">
          <h2 className="micro-label mb-4">Projected Bank Balance (30-Day Window)</h2>

          <div className="flex-1 min-h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isPositive ? "#10b981" : "#f43f5e"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isPositive ? "#10b981" : "#f43f5e"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} tickFormatter={(v) => `₹${(v/100000).toFixed(0)}L`} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x={horizonDays} stroke="var(--accent)" strokeDasharray="4 3" strokeOpacity={0.5} label={{ value: `Day ${horizonDays}`, position: "top", style: { fill: "var(--accent)", fontSize: 10, fontWeight: 700 } }} />
                <ReferenceLine y={BASE_BALANCE} stroke="var(--muted)" strokeDasharray="6 4" strokeOpacity={0.3} />
                <Area type="monotone" dataKey="balance" stroke={isPositive ? "#10b981" : "#f43f5e"} strokeWidth={3} fill="url(#cashGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Event Log */}
        <motion.div className="liquid-glass rounded-3xl p-6 flex flex-col">
          <h3 className="micro-label mb-4">Cash Events in Window</h3>

          <div className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
            {upcomingEvents.map((event, idx) => (
              <motion.div
                key={`${event.day}-${idx}`}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  event.type === "inflow"
                    ? 'bg-emerald-500/[0.04] border-emerald-500/10'
                    : 'bg-rose-500/[0.04] border-rose-500/10'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-1.5 rounded-lg ${event.type === "inflow" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}>
                    {event.type === "inflow" ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{event.label}</p>
                    <p className="text-[10px] text-muted">Day {event.day} • {event.category}</p>
                  </div>
                </div>
                <span className={`font-mono text-xs font-bold shrink-0 ml-2 ${
                  event.type === "inflow" ? "text-emerald-500" : "text-rose-500"
                }`}>
                  {event.type === "inflow" ? "+" : "-"}₹{(event.amount / 1000).toFixed(0)}K
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
