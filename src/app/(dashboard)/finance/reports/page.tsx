"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { ComposedChart, Area, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ArrowUpRight, ArrowDownRight, IndianRupee, PieChart as PieChartIcon } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const FINANCIAL_DATA = [
  { month: "Q1-M1", revenue: 4500000, expenses: 3200000, margin: 28.8 },
  { month: "Q1-M2", revenue: 5200000, expenses: 3400000, margin: 34.6 },
  { month: "Q1-M3", revenue: 4800000, expenses: 3100000, margin: 35.4 },
  { month: "Q2-M1", revenue: 6100000, expenses: 3900000, margin: 36.0 },
  { month: "Q2-M2", revenue: 5900000, expenses: 4000000, margin: 32.2 },
  { month: "Q2-M3", revenue: 6800000, expenses: 4200000, margin: 38.2 },
];

const METRICS = [
  { label: "Gross Revenue (YTD)", value: "₹ 3.33 Cr", change: "+18.2%", isPositive: true },
  { label: "Operating Expenses", value: "₹ 2.18 Cr", change: "+5.4%", isPositive: false },
  { label: "Net Profit Margin", value: "34.5%", change: "+2.1%", isPositive: true },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="liquid-glass rounded-xl p-4 shadow-2xl border border-foreground/10 text-sm min-w-[200px]">
        <p className="font-sans font-bold text-foreground mb-3 pb-2 border-b border-foreground/10">{label}</p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between items-center gap-4">
              <span className="text-muted flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}
              </span>
              <span className="font-mono font-medium text-foreground">
                {entry.name === 'Margin %' 
                  ? `${entry.value}%`
                  : `₹ ${(entry.value / 100000).toFixed(1)}L`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function FinanceReportsPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Advanced Financial Analytics"
        description="Comprehensive P&L analysis, margin tracking, and YoY growth projections."
        breadcrumbs={[{ label: "Finance" }, { label: "Reports" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-2">
        {METRICS.map((m, i) => (
          <motion.div 
            key={i}
            whileHover={organicInteractions.hover}
            className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex items-center justify-between group"
          >
            <div>
              <p className="text-muted text-sm font-semibold uppercase tracking-wider mb-1">{m.label}</p>
              <p className="text-3xl font-bold text-foreground font-sans">{m.value}</p>
            </div>
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-mono text-sm font-bold ${
              m.isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
            }`}>
              {m.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {m.change}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="flex-1 liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col min-h-[500px]"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-indigo-500" /> Income vs Expenses vs Margin
            </h2>
            <p className="text-sm text-muted mt-1">H1 FY2026 Consolidated Report</p>
          </div>
          <button className="px-4 py-2 bg-foreground text-background text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
            Export PDF
          </button>
        </div>

        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={FINANCIAL_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} tickFormatter={(val) => `₹${val/100000}L`} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} tickFormatter={(val) => `${val}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              
              <Bar yAxisId="left" dataKey="revenue" name="Gross Revenue" fill="url(#colorRev)" radius={[4, 4, 0, 0]} maxBarSize={50} />
              <Area yAxisId="left" type="monotone" dataKey="expenses" name="Operating Expenses" fill="url(#colorExp)" stroke="#f43f5e" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="margin" name="Margin %" stroke="#34d399" strokeWidth={3} dot={{ fill: '#34d399', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
