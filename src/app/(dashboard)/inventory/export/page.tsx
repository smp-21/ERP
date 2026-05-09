"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { Globe, Ship, CheckCircle2, AlertTriangle, FileText, Search, Filter } from "lucide-react";
import { organicInteractions } from "@/lib/motion";

const EXPORT_LOG = [
  { bl: "BL-99214A", vessel: "MSC Isabella", dest: "Port of Felixstowe, UK", status: "Customs Cleared", type: "FCL", value: "£45,000", date: "12 May 2026" },
  { bl: "BL-99215B", vessel: "Ever Given", dest: "Rotterdam, NL", status: "Awaiting BL", type: "LCL", value: "€12,500", date: "15 May 2026" },
  { bl: "BL-99216C", vessel: "CMA CGM Marco", dest: "Jebel Ali, UAE", status: "On Board", type: "FCL", value: "$85,000", date: "08 May 2026" },
  { bl: "BL-99217D", vessel: "Hapag-Lloyd Express", dest: "Singapore", status: "Customs Hold", type: "FCL", value: "$120,000", date: "10 May 2026" },
  { bl: "BL-99218E", vessel: "Maersk McKinney", dest: "Los Angeles, USA", status: "Customs Cleared", type: "FCL", value: "$210,000", date: "18 May 2026" },
];

export default function InventoryExportPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Global Export Ledger"
        description="Manage international shipments, Bill of Lading (B/L), and Customs clearance."
        breadcrumbs={[{ label: "Inventory" }, { label: "Exports & Shipping" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Globe className="w-32 h-32" /></div>
          <p className="text-muted text-sm uppercase tracking-wider mb-2">Active Exports</p>
          <p className="text-3xl font-sans font-bold text-foreground">14 TEUs</p>
          <p className="text-xs text-indigo-500 mt-2 font-bold">In Transit to 6 Regions</p>
        </div>
        <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col justify-center">
          <p className="text-muted text-sm uppercase tracking-wider mb-2">Pending Clearances</p>
          <p className="text-3xl font-sans font-bold text-amber-500">2 Consignments</p>
          <p className="text-xs text-muted mt-2">Awaiting DBK & IGST validation</p>
        </div>
        <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex items-center justify-between bg-indigo-500/5">
          <div>
            <h3 className="font-bold text-indigo-500 mb-1">e-BRC Generation</h3>
            <p className="text-sm text-muted">Bank Realization Certificates for April shipments are ready to download.</p>
          </div>
          <button className="px-5 py-2.5 bg-indigo-500 text-white font-semibold rounded-xl whitespace-nowrap shadow-lg shadow-indigo-500/20">
            Download Batch
          </button>
        </div>
      </div>

      <motion.div className="flex-1 liquid-glass rounded-3xl overflow-hidden border border-foreground/10 shadow-lg flex flex-col">
        <div className="p-4 border-b border-foreground/10 flex justify-between items-center bg-foreground/5">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Ship className="w-5 h-5 text-indigo-500" /> Export Consignments
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-foreground/5 rounded-lg border border-foreground/10">
              <Search className="w-4 h-4 text-muted" />
              <input type="text" placeholder="Search B/L or Vessel..." className="bg-transparent border-none outline-none text-xs w-48 text-foreground" />
            </div>
            <button className="p-2 bg-foreground/5 rounded-lg border border-foreground/10 text-muted hover:text-foreground">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-xs uppercase bg-foreground/5 text-muted sticky top-0 backdrop-blur-md z-10 border-b border-foreground/10">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">B/L Number</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Vessel & Voyage</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Port of Discharge</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Type</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Invoice Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5 text-foreground/80">
              {EXPORT_LOG.map((row, idx) => (
                <tr key={idx} className="hover:bg-foreground/5 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted group-hover:text-indigo-500 transition-colors" />
                      <span className="font-bold font-mono text-foreground">{row.bl}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{row.vessel}</td>
                  <td className="px-6 py-4 text-muted">{row.dest}</td>
                  <td className="px-6 py-4 font-mono text-xs">{row.type}</td>
                  <td className="px-6 py-4">
                    <span className={`flex w-max items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${
                      row.status === 'Customs Cleared' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      row.status === 'Customs Hold' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                      row.status === 'On Board' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' :
                      'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }`}>
                      {row.status === 'Customs Cleared' && <CheckCircle2 className="w-3 h-3" />}
                      {row.status === 'Customs Hold' && <AlertTriangle className="w-3 h-3" />}
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-right font-bold">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
