"use client";

import React from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Factory, Boxes, IndianRupee } from "lucide-react";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const revenueData = [
  { name: "Jan", value: 1200000 },
  { name: "Feb", value: 1400000 },
  { name: "Mar", value: 1350000 },
  { name: "Apr", value: 1800000 },
  { name: "May", value: 2200000 },
  { name: "Jun", value: 2450000 },
  { name: "Jul", value: 3100000 },
];

const allocationData = [
  { name: "Manufacturing", value: 45 },
  { name: "Operations", value: 25 },
  { name: "R&D", value: 15 },
  { name: "Marketing", value: 15 },
];
const COLORS = ["#818cf8", "#c084fc", "#f472b6", "#38bdf8"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="liquid-glass rounded-xl p-3 shadow-xl border border-foreground/10 text-sm">
        <p className="font-sans font-semibold text-foreground mb-1">{label}</p>
        <p className="font-mono text-indigo-400">
          ₹ {(payload[0].value / 100000).toFixed(2)} Lakhs
        </p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Enterprise Command Center"
        description="Real-time macro overview of financial health and operational throughput."
        breadcrumbs={[{ label: "Global" }, { label: "Dashboard" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue (FY26)", value: "₹ 1.24 Cr", change: "+14.5%", icon: IndianRupee },
          { label: "Active Orders", value: "842 Units", change: "+5.2%", icon: Boxes },
          { label: "Plant Utilization", value: "94.2%", change: "+2.1%", icon: Factory },
          { label: "Employee Count", value: "156", change: "Stable", icon: Users },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            whileHover={organicInteractions.hover}
            whileTap={organicInteractions.tap}
            className="liquid-glass rounded-3xl p-6 relative overflow-hidden group cursor-default"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground">
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-mono px-2 py-1 rounded-md ${
                kpi.change.startsWith('+') || kpi.change === 'Stable'
                  ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400' 
                  : 'bg-rose-500/10 text-rose-500 dark:text-rose-400'
              }`}>
                {kpi.change}
              </span>
            </div>
            <div>
              <h3 className="text-muted text-sm font-sans mb-1">{kpi.label}</h3>
              <p className="text-2xl lg:text-3xl font-bold font-sans text-foreground tracking-tight">{kpi.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="liquid-glass rounded-3xl p-6 lg:col-span-2 flex flex-col"
          whileHover={{ scale: 1.005, transition: liquidSpringPhysics }}
        >
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-lg font-sans font-semibold text-foreground">Revenue Trajectory</h2>
              <p className="text-sm text-muted">7-month trailing consolidated gross revenue</p>
            </div>
            <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider font-medium">Export Report</button>
          </div>
          
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} tickFormatter={(val) => `₹${val/100000}L`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          className="liquid-glass rounded-3xl p-6 flex flex-col"
          whileHover={{ scale: 1.005, transition: liquidSpringPhysics }}
        >
          <div className="mb-6">
            <h2 className="text-lg font-sans font-semibold text-foreground">Capital Allocation</h2>
            <p className="text-sm text-muted">Current FY budgetary distribution</p>
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center relative min-h-[250px]">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<div className="liquid-glass rounded-xl p-2 text-xs text-foreground" />} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Absolute Center Text for Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-foreground">100%</span>
              <span className="text-xs text-muted">Allocated</span>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            {allocationData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                <span className="text-muted truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
