"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { Cpu, Power, Wrench, Settings2, ShieldCheck, AlertCircle } from "lucide-react";
import { organicInteractions } from "@/lib/motion";

const ASSETS = [
  { id: "MAC-CNC-01", name: "5-Axis Milling Machine", type: "Heavy Machinery", status: "Operational", health: 94, lastMaintenance: "12 Apr 2026", nextMaintenance: "12 Jul 2026", image: "https://images.unsplash.com/photo-1565439390214-c13eb2503926?q=80&w=400" },
  { id: "ROB-ASSY-04", name: "KUKA Assembly Arm", type: "Robotics", status: "Maintenance", health: 65, lastMaintenance: "08 May 2026", nextMaintenance: "09 May 2026", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400" },
  { id: "MAC-LTH-02", name: "Industrial Lathe", type: "Heavy Machinery", status: "Operational", health: 88, lastMaintenance: "01 Mar 2026", nextMaintenance: "01 Jun 2026", image: "https://images.unsplash.com/photo-1611078813876-b631d8ce42ed?q=80&w=400" },
  { id: "SYS-QA-01", name: "Vision Inspection System", type: "Testing Equip", status: "Warning", health: 72, lastMaintenance: "15 Jan 2026", nextMaintenance: "15 May 2026", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400" },
  { id: "PWR-GEN-01", name: "Backup Generator", type: "Infrastructure", status: "Operational", health: 99, lastMaintenance: "01 May 2026", nextMaintenance: "01 Aug 2026", image: "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?q=80&w=400" },
];

export default function ManufacturingAssetsPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Asset Topology & Maintenance"
        description="Monitor physical factory assets, depreciation schedules, and maintenance logs."
        breadcrumbs={[{ label: "Manufacturing" }, { label: "Assets" }]}
      />

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <button className="px-5 py-2.5 bg-foreground text-background font-bold text-sm rounded-xl shadow-lg whitespace-nowrap">All Assets</button>
        <button className="px-5 py-2.5 bg-foreground/5 hover:bg-foreground/10 text-foreground font-semibold text-sm rounded-xl border border-foreground/10 transition-colors whitespace-nowrap flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500" /> Needs Attention (2)
        </button>
        <button className="px-5 py-2.5 bg-foreground/5 hover:bg-foreground/10 text-foreground font-semibold text-sm rounded-xl border border-foreground/10 transition-colors whitespace-nowrap">Heavy Machinery</button>
        <button className="px-5 py-2.5 bg-foreground/5 hover:bg-foreground/10 text-foreground font-semibold text-sm rounded-xl border border-foreground/10 transition-colors whitespace-nowrap">Robotics</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 overflow-y-auto pb-6">
        {ASSETS.map((asset) => (
          <motion.div 
            key={asset.id}
            whileHover={organicInteractions.hover}
            className="liquid-glass rounded-3xl overflow-hidden border border-foreground/10 flex flex-col group cursor-pointer shadow-lg"
          >
            <div className="h-48 w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <img src={asset.image} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              
              <div className="absolute top-4 left-4 z-20">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-md border ${
                  asset.status === 'Operational' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                  asset.status === 'Warning' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                  'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}>
                  {asset.status}
                </span>
              </div>
              <div className="absolute top-4 right-4 z-20">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                  <Power className="w-4 h-4" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-20">
                <h3 className="text-xl font-bold text-white drop-shadow-md">{asset.name}</h3>
                <p className="text-sm font-mono text-white/80 drop-shadow-md mt-0.5">{asset.id}</p>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col gap-5 bg-gradient-to-b from-foreground/5 to-transparent">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-muted">
                  <Cpu className="w-4 h-4" />
                  <span className="text-sm font-medium">{asset.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">Health</span>
                  <div className="w-16 h-2 bg-foreground/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${asset.health > 90 ? 'bg-emerald-500' : asset.health > 70 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                      style={{ width: `${asset.health}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold">{asset.health}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-foreground/5 rounded-xl p-3 border border-foreground/5">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-muted" />
                    <p className="text-[10px] uppercase tracking-wider text-muted font-bold">Last Serviced</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{asset.lastMaintenance}</p>
                </div>
                <div className={`rounded-xl p-3 border ${asset.status === 'Warning' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-foreground/5 border-foreground/5'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Wrench className={`w-3.5 h-3.5 ${asset.status === 'Warning' ? 'text-amber-500' : 'text-muted'}`} />
                    <p className={`text-[10px] uppercase tracking-wider font-bold ${asset.status === 'Warning' ? 'text-amber-500' : 'text-muted'}`}>Next Due</p>
                  </div>
                  <p className={`text-sm font-semibold ${asset.status === 'Warning' ? 'text-amber-600 dark:text-amber-400' : 'text-foreground'}`}>{asset.nextMaintenance}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
