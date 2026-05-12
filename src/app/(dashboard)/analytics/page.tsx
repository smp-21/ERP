"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Activity, TrendingUp, Users, Factory, ArrowUpRight } from "lucide-react";
import { organicInteractions, glassPanelVariants, childItemVariants } from "@/lib/motion";

const REVENUE_DATA = [
  { month: "Jan", revenue: 4000, cost: 2400 },
  { month: "Feb", revenue: 3000, cost: 1398 },
  { month: "Mar", revenue: 2000, cost: 9800 },
  { month: "Apr", revenue: 2780, cost: 3908 },
  { month: "May", revenue: 1890, cost: 4800 },
  { month: "Jun", revenue: 2390, cost: 3800 },
  { month: "Jul", revenue: 3490, cost: 4300 },
];

const PROD_DATA = [
  { day: "Mon", units: 120, defects: 2 },
  { day: "Tue", units: 150, defects: 4 },
  { day: "Wed", units: 180, defects: 1 },
  { day: "Thu", units: 140, defects: 0 },
  { day: "Fri", units: 200, defects: 5 },
  { day: "Sat", units: 90, defects: 1 },
];

const RESOURCE_DATA = [
  { name: 'Manufacturing', value: 400, color: '#818cf8' },
  { name: 'Sales', value: 300, color: '#f43f5e' },
  { name: 'R&D', value: 300, color: '#10b981' },
  { name: 'Logistics', value: 200, color: '#f59e0b' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="liquid-glass-elevated rounded-xl p-3 shadow-xl text-sm min-w-[150px]">
        <p className="font-sans font-bold text-foreground mb-2 pb-2 border-b border-[var(--glass-border)]">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-mono text-xs flex items-center gap-2" style={{ color: entry.color || entry.stroke || entry.fill }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.stroke || entry.fill }}></span>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function GlobalAnalyticsPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Global Analytics Hub"
        description="Cross-departmental performance metrics and predictive insights."
        breadcrumbs={[{ label: "Global" }, { label: "Analytics" }]}
      />

      <motion.div
        variants={glassPanelVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: "Total Revenue (Q2)", value: "₹45.2L", trend: "+12.5%", icon: TrendingUp, color: "text-emerald-500 dark:text-emerald-400", glow: "bg-emerald-500" },
          { label: "Active Employees", value: "342", trend: "+4", icon: Users, color: "text-violet-500 dark:text-violet-400", glow: "bg-violet-500" },
          { label: "Production Volume", value: "8,940", trend: "+1.2%", icon: Factory, color: "text-sky-500 dark:text-sky-400", glow: "bg-sky-500" },
          { label: "System Health", value: "99.9%", trend: "Stable", icon: Activity, color: "text-rose-500 dark:text-rose-400", glow: "bg-rose-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={childItemVariants}
            whileHover={organicInteractions.hover}
            whileTap={organicInteractions.tap}
            className="liquid-glass rounded-2xl p-5 flex flex-col gap-4 group relative overflow-hidden cursor-default"
          >
            <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-25 transition-opacity duration-700 ${stat.glow}`} />
            <div className="flex justify-between items-start relative z-10">
              <div className={`p-2.5 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 micro-label text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {stat.trend} <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-3xl font-sans font-extrabold text-foreground tracking-tight">{stat.value}</p>
              <p className="micro-label mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Main Chart */}
        <motion.div
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="xl:col-span-2 liquid-glass rounded-3xl p-6 flex flex-col min-h-[350px]"
        >
          <h2 className="text-lg font-bold text-foreground tracking-tight mb-6">Revenue vs Opex Trend</h2>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--glass-border)' }} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="cost" name="Operating Cost" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Side Charts */}
        <div className="flex flex-col gap-6">
          <motion.div
            variants={glassPanelVariants}
            initial="hidden"
            animate="visible"
            className="liquid-glass rounded-3xl p-6 flex-1 flex flex-col"
          >
            <h2 className="text-sm font-bold text-foreground tracking-tight mb-4">Resource Allocation</h2>
            <div className="flex-1 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={RESOURCE_DATA} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                    {RESOURCE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-extrabold text-foreground">1.2k</span>
                <span className="micro-label">Total Headcount</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={glassPanelVariants}
            initial="hidden"
            animate="visible"
            className="liquid-glass rounded-3xl p-6 flex-1 flex flex-col"
          >
            <h2 className="text-sm font-bold text-foreground tracking-tight mb-4">Weekly Output (Units)</h2>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PROD_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--glass-border)' }} />
                  <Bar dataKey="units" name="Units Prod." fill="#818cf8" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
