"use client";

import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { LiquidDataGrid, ColumnDef } from "@/components/ui/LiquidDataGrid";
import { glassPanelVariants, childItemVariants, organicInteractions } from "@/lib/motion";
import { Gavel, SearchCode, Send, Trophy, ArrowUpRight } from "lucide-react";

// Mock Data
const newTenders = [
  { id: "GEM-2026-T1", department: "Defense R&D", category: "Advanced Optics", value: "$450,000", closing: "May 20, 2026", match: "98%" },
  { id: "GEM-2026-T2", department: "Space Agency", category: "Silica Substrates", value: "$1.2M", closing: "Jun 02, 2026", match: "94%" },
  { id: "GEM-2026-T3", department: "Ministry of Tech", category: "Fiber Cables", value: "$85,000", closing: "May 15, 2026", match: "82%" },
];

const newTendersColumns: ColumnDef<typeof newTenders[0]>[] = [
  { key: "id", header: "Tender ID", render: (item) => <span className="text-foreground/90 font-medium">{item.id}</span> },
  { key: "department", header: "Department" },
  { key: "category", header: "Category" },
  { key: "value", header: "Value", align: "right" },
  { key: "closing", header: "Closing Date", align: "right" },
  { 
    key: "match", 
    header: "Match Score", 
    align: "right",
    render: (item) => <span className="text-emerald-400 font-mono">{item.match}</span>
  },
];

const appliedTenders = [
  { id: "GEM-2025-A8", appliedDate: "Jan 12, 2026", status: "Won", remarks: "Contract Awarded" },
  { id: "GEM-2026-B2", appliedDate: "Apr 05, 2026", status: "Evaluation", remarks: "Technical check pending" },
  { id: "GEM-2026-C4", appliedDate: "Apr 28, 2026", status: "Shortlisted", remarks: "Financial bidding next" },
  { id: "GEM-2025-D1", appliedDate: "Nov 20, 2025", status: "Rejected", remarks: "Did not meet criteria" },
];

const appliedTendersColumns: ColumnDef<typeof appliedTenders[0]>[] = [
  { key: "id", header: "Tender ID", render: (item) => <span className="text-foreground/90 font-medium">{item.id}</span> },
  { key: "appliedDate", header: "Applied Date" },
  { 
    key: "status", 
    header: "Status",
    render: (item) => (
      <span className={`px-2 py-1 rounded-md text-xs font-sans font-medium ${
        item.status === 'Won' ? 'bg-emerald-500/10 text-emerald-400' :
        item.status === 'Shortlisted' ? 'bg-blue-500/10 text-blue-400' :
        item.status === 'Evaluation' ? 'bg-amber-500/10 text-amber-400' :
        'bg-rose-500/10 text-rose-400'
      }`}>
        {item.status}
      </span>
    )
  },
  { key: "remarks", header: "Remarks" },
];

const metrics = [
  { label: "Active Tenders (Market)", value: "12,405", icon: Gavel, color: "text-blue-400" },
  { label: "New Matches (Your Niche)", value: "14", icon: SearchCode, color: "text-purple-400" },
  { label: "Currently Applied", value: "8", icon: Send, color: "text-amber-400" },
  { label: "Contracts Won", value: "42", icon: Trophy, color: "text-emerald-400" },
];

export default function GeMTendersPage() {
  return (
    <div className="flex flex-col h-full">
      <GlassPageHeader
        title="GeM Tenders & Contracts"
        description="Monitor, evaluate, and manage your government electronic marketplace tender applications."
        breadcrumbs={[{ label: "Government" }, { label: "GeM Tenders" }]}
        actions={
          <motion.button
            whileHover={organicInteractions.hover}
            whileTap={organicInteractions.tap}
            className="px-4 py-2 bg-white text-black font-sans font-semibold rounded-xl text-sm flex items-center gap-2 hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Refresh Feed
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        }
      />

      {/* Metrics */}
      <motion.div 
        variants={glassPanelVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            variants={childItemVariants}
            whileHover={organicInteractions.hover}
            className="liquid-glass rounded-3xl p-6 relative overflow-hidden group"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${metric.color.replace('text-', 'bg-')}`} />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-xl bg-white/5 border-t border-white/10 ${metric.color}`}>
                <metric.icon className="w-5 h-5" />
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-foreground/50 text-sm font-sans mb-1">{metric.label}</h3>
              <p className="text-3xl font-bold font-sans text-foreground tracking-tight">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Data Grids */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-6">
        <motion.div
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-sans font-semibold text-foreground">New Matches (Your Niche)</h2>
            <button className="text-xs text-foreground/50 hover:text-foreground transition-colors uppercase tracking-wider font-medium">View All</button>
          </div>
          <LiquidDataGrid
            data={newTenders}
            columns={newTendersColumns}
            onRowClick={(row) => console.log("Clicked Tender", row)}
          />
        </motion.div>

        <motion.div
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-sans font-semibold text-foreground">Applied Tenders Status</h2>
            <button className="text-xs text-foreground/50 hover:text-foreground transition-colors uppercase tracking-wider font-medium">View All</button>
          </div>
          <LiquidDataGrid
            data={appliedTenders}
            columns={appliedTendersColumns}
            onRowClick={(row) => console.log("Clicked Application", row)}
          />
        </motion.div>
      </div>
    </div>
  );
}
