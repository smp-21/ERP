"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Boxes, Map, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const VALUATION_DATA = [
  { month: "Jan", value: 12500000 },
  { month: "Feb", value: 11800000 },
  { month: "Mar", value: 13200000 },
  { month: "Apr", value: 14500000 },
  { month: "May", value: 14100000 },
  { month: "Jun", value: 15800000 },
];

const ZONE_CAPACITY = [
  { zone: "Sector A", used: 85, total: 100 },
  { zone: "Sector B", used: 42, total: 100 },
  { zone: "Sector C", used: 92, total: 100 },
  { zone: "Cold Storage", used: 65, total: 100 },
  { zone: "Hazardous", used: 20, total: 100 },
];

const CustomTooltipValuation = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="liquid-glass rounded-xl p-3 shadow-xl border border-foreground/10 text-sm">
        <p className="font-sans font-semibold text-foreground mb-1">{label}</p>
        <p className="font-mono text-emerald-500">₹ {(payload[0].value / 100000).toFixed(2)} Lakhs</p>
      </div>
    );
  }
  return null;
};

export default function InventoryStockPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Warehouse Stock Overview"
        description="Macro-level tracking of total inventory valuation and zone capacity utilization."
        breadcrumbs={[{ label: "Inventory" }, { label: "Stock" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-2">
        <motion.div whileHover={organicInteractions.hover} className="liquid-glass rounded-3xl p-6 border border-foreground/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500"><Boxes className="w-5 h-5" /></div>
            <span className="text-sm font-semibold text-muted uppercase tracking-wider">Total Valuation</span>
          </div>
          <p className="text-3xl font-sans font-bold text-foreground">₹ 1.58 Cr</p>
          <p className="text-xs text-emerald-500 font-bold mt-2 flex items-center gap-1"><ArrowUpCircle className="w-3 h-3" /> +12% YoY</p>
        </motion.div>
        
        <motion.div whileHover={organicInteractions.hover} className="liquid-glass rounded-3xl p-6 border border-foreground/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500"><Map className="w-5 h-5" /></div>
            <span className="text-sm font-semibold text-muted uppercase tracking-wider">Warehouse Load</span>
          </div>
          <p className="text-3xl font-sans font-bold text-foreground">74.2%</p>
          <p className="text-xs text-muted mt-2">Overall Spatial Utilization</p>
        </motion.div>

        <motion.div whileHover={organicInteractions.hover} className="lg:col-span-2 liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col justify-center bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed7c83a00?q=80&w=600')] bg-cover bg-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-2">Inbound Shipment Arriving</h3>
            <p className="text-sm text-white/70">3 Containers from Shenzen arriving at Port in 12 hours. Prepare Sector B for unloading.</p>
            <button className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors border border-white/20">View Manifest</button>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <motion.div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col min-h-[350px]">
          <h2 className="text-sm font-sans font-semibold text-muted uppercase tracking-wider mb-6">Inventory Valuation Trend</h2>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={VALUATION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} tickFormatter={(val) => `₹${val/100000}L`} domain={['dataMin - 1000000', 'dataMax + 1000000']} />
                <Tooltip content={<CustomTooltipValuation />} />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col min-h-[350px]">
          <h2 className="text-sm font-sans font-semibold text-muted uppercase tracking-wider mb-6">Zone Capacity Utilization</h2>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={ZONE_CAPACITY} margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(150,150,150,0.1)" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
                <YAxis dataKey="zone" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--foreground)', fontSize: 12, fontWeight: 500 }} dx={-10} />
                <Tooltip 
                  cursor={{ fill: 'rgba(150,150,150,0.05)' }} 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="liquid-glass rounded-xl p-3 shadow-xl border border-foreground/10 text-sm">
                          <p className="font-sans font-semibold text-foreground">{label}</p>
                          <p className="font-mono text-indigo-400 text-xs mt-1">{payload[0].value}% Full</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="total" fill="var(--foreground)" fillOpacity={0.05} radius={[0, 4, 4, 0]} barSize={24} />
                <Bar dataKey="used" radius={[0, 4, 4, 0]} barSize={24}>
                  {ZONE_CAPACITY.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.used > 90 ? "#f43f5e" : entry.used > 75 ? "#f59e0b" : "#818cf8"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
