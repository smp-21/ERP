"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { MoreHorizontal, Plus, Briefcase, IndianRupee } from "lucide-react";
import { organicInteractions } from "@/lib/motion";

const INITIAL_PIPELINE = {
  "lead": [
    { id: "L-101", company: "Tata Steel Ltd", contact: "Rahul Desai", value: 4500000, prob: "High" },
    { id: "L-102", company: "L&T Heavy Eng", contact: "Vikram S.", value: 1200000, prob: "Med" },
  ],
  "contacted": [
    { id: "L-103", company: "Reliance Ind", contact: "Amitabh P.", value: 8500000, prob: "High" },
  ],
  "proposal": [
    { id: "L-104", company: "JSW Group", contact: "Neha Sharma", value: 3200000, prob: "High" },
    { id: "L-105", company: "Adani Power", contact: "Ravi K.", value: 1550000, prob: "Low" },
  ],
  "won": [
    { id: "L-106", company: "Mahindra Auto", contact: "Pooja V.", value: 6500000, prob: "100%" },
  ]
};

const COLUMN_TITLES: Record<string, string> = {
  "lead": "New Leads",
  "contacted": "Contacted",
  "proposal": "Proposal Sent",
  "won": "Closed Won"
};

export default function SalesCRMPage() {
  const [pipeline, setPipeline] = useState(INITIAL_PIPELINE);

  // Note: Simplified UI since full drag-and-drop requires dnd-kit or react-beautiful-dnd.
  // Using motion.div layouts for visual Kanban structure.

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="CRM Pipeline"
        description="Kanban pipeline for tracking enterprise B2B sales leads."
        breadcrumbs={[{ label: "Sales" }, { label: "CRM" }]}
      />

      <div className="flex flex-1 gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {Object.entries(pipeline).map(([columnId, cards]) => (
          <div key={columnId} className="flex-none w-80 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-sans font-semibold text-foreground/80 uppercase tracking-wider text-sm">{COLUMN_TITLES[columnId]}</h3>
              <span className="text-xs font-mono bg-foreground/10 px-2 py-0.5 rounded-full text-foreground/60">{cards.length}</span>
            </div>
            
            <div className="flex-1 liquid-glass rounded-3xl p-4 flex flex-col gap-4 border border-foreground/5 bg-foreground/[0.02]">
              <AnimatePresence>
                {cards.map((card) => (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={organicInteractions.hover}
                    whileTap={organicInteractions.tap}
                    className="liquid-glass rounded-2xl p-4 cursor-grab active:cursor-grabbing border border-foreground/10 shadow-md group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono text-muted">{card.id}</span>
                      <button className="text-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>
                    <h4 className="font-sans font-semibold text-foreground text-sm mb-1">{card.company}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted mb-3">
                      <Briefcase className="w-3 h-3" />
                      <span>{card.contact}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-foreground/10">
                      <div className="flex items-center gap-1 font-mono text-xs font-medium text-indigo-500 dark:text-indigo-400">
                        <IndianRupee className="w-3 h-3" />
                        <span>{(card.value / 100000).toFixed(1)}L</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        card.prob === 'High' || card.prob === '100%' ? 'bg-emerald-500/10 text-emerald-500' :
                        card.prob === 'Med' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'
                      }`}>{card.prob}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <button className="w-full py-3 mt-auto rounded-2xl border-2 border-dashed border-foreground/10 text-muted hover:text-foreground hover:bg-foreground/5 hover:border-foreground/20 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                <Plus className="w-4 h-4" /> Add Lead
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
