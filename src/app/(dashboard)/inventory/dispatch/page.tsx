"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { Package, Truck, ArrowRight, MapPin, Search } from "lucide-react";
import { organicInteractions } from "@/lib/motion";

const DISPATCH_PIPELINE = {
  "packing": [
    { id: "SHP-101", dest: "Jamshedpur, JH", carrier: "BlueDart", time: "12:00 PM" },
    { id: "SHP-102", dest: "Hazira, GJ", carrier: "DHL", time: "02:30 PM" },
  ],
  "ready": [
    { id: "SHP-103", dest: "Jamnagar, GJ", carrier: "Maersk", time: "05:00 PM" },
  ],
  "transit": [
    { id: "SHP-104", dest: "Bellary, KA", carrier: "VRL Logistics", time: "Est. 2 Days" },
    { id: "SHP-105", dest: "Chennai, TN", carrier: "Gati", time: "Est. 3 Days" },
  ],
  "delivered": [
    { id: "SHP-106", dest: "Chakan, MH", carrier: "Safexpress", time: "Today 09:15 AM" },
  ]
};

const STAGE_CONFIG: Record<string, { title: string, color: string }> = {
  "packing": { title: "Packing & QA", color: "bg-indigo-500/10 text-indigo-500" },
  "ready": { title: "Ready for Pickup", color: "bg-amber-500/10 text-amber-500" },
  "transit": { title: "In Transit", color: "bg-blue-500/10 text-blue-500" },
  "delivered": { title: "Delivered", color: "bg-emerald-500/10 text-emerald-500" }
};

export default function InventoryDispatchPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Logistics & Dispatch"
        description="Visual Kanban tracking for outbound shipments and freight management."
        breadcrumbs={[{ label: "Inventory" }, { label: "Dispatch" }]}
      />

      <div className="flex justify-between items-center bg-foreground/5 p-2 rounded-2xl border border-foreground/10 liquid-glass">
        <div className="flex items-center gap-2 px-4 w-full max-w-md">
          <Search className="w-5 h-5 text-muted" />
          <input type="text" placeholder="Search by Shipment ID or Destination..." className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted py-2" />
        </div>
        <div className="flex gap-2 pr-2">
          <button className="px-4 py-2 text-xs font-semibold rounded-xl bg-foreground text-background shadow-lg">Schedule Pickup</button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {Object.entries(DISPATCH_PIPELINE).map(([stageId, shipments]) => (
          <div key={stageId} className="flex-none w-[320px] flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${STAGE_CONFIG[stageId].color.split(' ')[0].replace('/10', '')}`} />
                <h3 className="font-sans font-semibold text-foreground/80 uppercase tracking-wider text-sm">{STAGE_CONFIG[stageId].title}</h3>
              </div>
              <span className="text-xs font-mono bg-foreground/10 px-2 py-0.5 rounded-full text-foreground/60">{shipments.length}</span>
            </div>
            
            <div className="flex-1 liquid-glass rounded-3xl p-4 flex flex-col gap-4 border border-foreground/5 bg-foreground/[0.02]">
              {shipments.map((ship) => (
                <motion.div
                  key={ship.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={organicInteractions.hover}
                  whileTap={organicInteractions.tap}
                  className="liquid-glass rounded-2xl p-4 cursor-grab active:cursor-grabbing border border-foreground/10 shadow-md group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-mono font-bold text-foreground bg-foreground/5 px-2 py-1 rounded-md">{ship.id}</span>
                    <button className="text-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"><ArrowRight className="w-4 h-4" /></button>
                  </div>
                  
                  <div className="flex items-start gap-3 mb-4">
                    <div className="mt-1 p-2 bg-foreground/5 rounded-lg text-muted">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider mb-0.5">Destination</p>
                      <h4 className="font-sans font-semibold text-foreground text-sm">{ship.dest}</h4>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-foreground/10">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
                      <Truck className="w-3.5 h-3.5" />
                      {ship.carrier}
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${STAGE_CONFIG[stageId].color}`}>
                      {ship.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
