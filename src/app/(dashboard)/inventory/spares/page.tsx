"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { Search, MapPin, AlertCircle, Wrench } from "lucide-react";
import { organicInteractions } from "@/lib/motion";

const SPARE_PARTS = [
  { id: "SP-441", name: "High-Pressure Seal Kit", category: "Hydraulics", stock: 12, min: 15, zone: "Sector A / R4", image: "https://images.unsplash.com/photo-1634224742898-154dfec39f8d?w=400&q=80" },
  { id: "SP-882", name: "Industrial Bearing XYZ", category: "Mechanical", stock: 145, min: 50, zone: "Sector B / R1", image: "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=400&q=80" },
  { id: "SP-109", name: "Sensory Control Board", category: "Electronics", stock: 4, min: 5, zone: "Secure Vault / R2", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  { id: "SP-992", name: "Heavy Duty Drive Belt", category: "Mechanical", stock: 85, min: 40, zone: "Sector C / R8", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80" },
  { id: "SP-331", name: "Copper Coil Spool (50m)", category: "Electrical", stock: 2, min: 10, zone: "Sector A / R9", image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=400&q=80" },
  { id: "SP-554", name: "Pneumatic Cylinder Base", category: "Pneumatics", stock: 28, min: 20, zone: "Sector D / R1", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80" },
];

export default function InventorySparesPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Spares & Consumables"
        description="Visual grid of critical spare parts with live stock thresholds."
        breadcrumbs={[{ label: "Inventory" }, { label: "Spares" }]}
      />

      <div className="flex justify-between items-center bg-foreground/5 p-2 rounded-2xl border border-foreground/10 liquid-glass">
        <div className="flex items-center gap-2 px-4 w-full max-w-md">
          <Search className="w-5 h-5 text-muted" />
          <input type="text" placeholder="Search by Part ID or Name..." className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted py-2" />
        </div>
        <div className="flex gap-2 pr-2">
          <button className="px-4 py-2 text-xs font-semibold rounded-xl bg-foreground text-background">Filter Zones</button>
          <button className="px-4 py-2 text-xs font-semibold rounded-xl liquid-glass text-foreground hover:bg-foreground/10">Reorder Low Stock</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {SPARE_PARTS.map((part) => {
          const isLow = part.stock < part.min;
          return (
            <motion.div
              key={part.id}
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              className="liquid-glass rounded-3xl overflow-hidden border border-foreground/10 group cursor-pointer flex flex-col"
            >
              <div className="relative h-48 w-full bg-foreground/5">
                <img src={part.image} alt={part.name} className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white border border-white/20 rounded-full text-xs font-mono font-semibold">
                    {part.id}
                  </span>
                </div>
                {isLow && (
                  <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-1 px-3 py-1 bg-rose-500/90 backdrop-blur-md text-white border border-white/20 rounded-full text-xs font-bold shadow-lg shadow-rose-500/40">
                      <AlertCircle className="w-3 h-3" /> Low Stock
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-sans font-bold text-foreground line-clamp-1">{part.name}</h3>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-md">{part.category}</span>
                </div>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Available Stock</span>
                    <span className={`font-mono font-bold ${isLow ? 'text-rose-500' : 'text-emerald-500'}`}>{part.stock} Unit{part.stock !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isLow ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${Math.min(100, (part.stock / part.min) * 50)}%` }} 
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted pt-2 border-t border-foreground/10">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{part.zone}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
