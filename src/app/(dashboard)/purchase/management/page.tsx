"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { ShoppingCart, FileText, CheckCircle2, AlertTriangle, Truck, Clock, ChevronDown, Plus } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const PO_DATA = [
  { id: "PO-2026-001", vendor: "Alpha Metals Corp", amount: "₹14,50,000", date: "09 May 2026", status: "Approved", items: 12 },
  { id: "PO-2026-002", vendor: "TechComponents Ltd", amount: "₹3,20,000", date: "08 May 2026", status: "Sent", items: 45 },
  { id: "PO-2026-003", vendor: "Global Logistics Inc", amount: "₹1,15,000", date: "05 May 2026", status: "Fulfilled", items: 1 },
  { id: "PO-2026-004", vendor: "Industrial Supplies Co", amount: "₹5,40,000", date: "02 May 2026", status: "Draft", items: 8 },
  { id: "PO-2026-005", vendor: "Omega Polymers", amount: "₹8,90,000", date: "01 May 2026", status: "Approved", items: 24 },
];

export default function PurchaseManagementPage() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Purchase Order Management"
        description="Create, track, and approve vendor purchase orders across the supply chain."
        breadcrumbs={[{ label: "Procurement" }, { label: "Purchase Orders" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="liquid-glass rounded-2xl p-5 border border-foreground/10 flex items-center justify-between">
          <div>
            <p className="text-muted text-xs uppercase tracking-wider mb-1 font-bold">Total Spend (YTD)</p>
            <p className="text-2xl font-sans font-bold text-foreground">₹4.2Cr</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5" />
          </div>
        </div>
        <div className="liquid-glass rounded-2xl p-5 border border-foreground/10 flex items-center justify-between">
          <div>
            <p className="text-muted text-xs uppercase tracking-wider mb-1 font-bold">Pending Approvals</p>
            <p className="text-2xl font-sans font-bold text-amber-500">14</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="liquid-glass rounded-2xl p-5 border border-foreground/10 flex items-center justify-between">
          <div>
            <p className="text-muted text-xs uppercase tracking-wider mb-1 font-bold">In Transit</p>
            <p className="text-2xl font-sans font-bold text-sky-500">8 POs</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
        </div>
        <div className="liquid-glass rounded-2xl p-5 border border-indigo-500/30 flex items-center justify-center bg-indigo-500/5 cursor-pointer hover:bg-indigo-500/10 transition-colors group">
          <div className="flex items-center gap-2 text-indigo-500 font-bold">
            <Plus className="w-5 h-5" /> Create New PO
          </div>
        </div>
      </div>

      <div className="flex-1 liquid-glass rounded-3xl overflow-hidden border border-foreground/10 flex flex-col">
        <div className="p-4 border-b border-foreground/10 bg-foreground/5 flex justify-between items-center">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" /> Active Purchase Orders
          </h2>
          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 bg-background border border-foreground/10 text-xs font-semibold rounded-lg hover:bg-foreground/5 transition-colors text-foreground">Filter</button>
            <button className="px-4 py-1.5 bg-background border border-foreground/10 text-xs font-semibold rounded-lg hover:bg-foreground/5 transition-colors text-foreground">Export</button>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-xs uppercase bg-foreground/5 text-muted sticky top-0 backdrop-blur-md z-10 border-b border-foreground/10">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">PO Number</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Vendor</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Items</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Amount</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5 text-foreground/80">
              {PO_DATA.map((row) => (
                <React.Fragment key={row.id}>
                  <tr 
                    onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
                    className={`cursor-pointer transition-colors group ${expandedRow === row.id ? 'bg-foreground/5' : 'hover:bg-foreground/5'}`}
                  >
                    <td className="px-6 py-4 font-mono font-bold text-foreground">{row.id}</td>
                    <td className="px-6 py-4 font-semibold">{row.vendor}</td>
                    <td className="px-6 py-4 font-mono text-xs">{row.items} lines</td>
                    <td className="px-6 py-4 font-mono text-right font-bold">{row.amount}</td>
                    <td className="px-6 py-4 text-xs text-muted">{row.date}</td>
                    <td className="px-6 py-4">
                      <span className={`flex w-max items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                        row.status === 'Approved' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' :
                        row.status === 'Sent' ? 'bg-sky-500/10 text-sky-500 border-sky-500/20' :
                        row.status === 'Fulfilled' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        'bg-foreground/10 text-muted border-foreground/10'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronDown className={`w-4 h-4 text-muted transition-transform ${expandedRow === row.id ? 'rotate-180' : ''}`} />
                    </td>
                  </tr>
                  {/* Expanded Row Data */}
                  <AnimatePresence>
                    {expandedRow === row.id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-foreground/[0.02]"
                      >
                        <td colSpan={7} className="p-0 border-b border-foreground/10">
                          <div className="p-6 grid grid-cols-3 gap-6">
                            <div className="space-y-4 col-span-2">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-muted">Line Items Preview</h4>
                              <div className="bg-background rounded-xl border border-foreground/10 overflow-hidden text-xs font-mono">
                                <div className="flex justify-between p-3 border-b border-foreground/5 text-muted font-bold bg-foreground/5">
                                  <span>SKU</span>
                                  <span className="flex-1 px-4">Description</span>
                                  <span>Qty</span>
                                  <span className="w-24 text-right">Unit Price</span>
                                </div>
                                <div className="flex justify-between p-3 border-b border-foreground/5 text-foreground">
                                  <span>RAW-001</span>
                                  <span className="flex-1 px-4">Aluminum Alloy Grade A</span>
                                  <span>500 kg</span>
                                  <span className="w-24 text-right">₹850</span>
                                </div>
                                <div className="flex justify-between p-3 text-foreground">
                                  <span>RAW-042</span>
                                  <span className="flex-1 px-4">Steel Bearings (12mm)</span>
                                  <span>2000 pcs</span>
                                  <span className="w-24 text-right">₹125</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-between">
                              <div className="space-y-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted">Approval Chain</h4>
                                <div className="flex items-center gap-3 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                  <span className="text-foreground">Dept Head (Approved)</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                  {row.status === 'Draft' ? <AlertTriangle className="w-4 h-4 text-amber-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                  <span className={row.status === 'Draft' ? 'text-amber-500 font-medium' : 'text-foreground'}>Finance (Pending)</span>
                                </div>
                              </div>
                              <button className="w-full py-2 bg-foreground text-background font-bold text-xs rounded-lg shadow-lg">View Full PDF</button>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
