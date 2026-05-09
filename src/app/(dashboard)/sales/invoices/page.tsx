"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { FileText, Download, CheckCircle2, AlertCircle, Clock, Printer } from "lucide-react";
import { organicInteractions } from "@/lib/motion";

const INVOICES = [
  { id: "INV-2026-001", client: "Tata Steel Ltd", date: "09 May 2026", due: "09 Jun 2026", amount: 4500000, status: "Paid" },
  { id: "INV-2026-002", client: "L&T Heavy Eng", date: "05 May 2026", due: "05 Jun 2026", amount: 1200000, status: "Pending" },
  { id: "INV-2026-003", client: "Reliance Ind", date: "10 Apr 2026", due: "10 May 2026", amount: 8500000, status: "Overdue" },
  { id: "INV-2026-004", client: "JSW Group", date: "08 May 2026", due: "08 Jun 2026", amount: 3200000, status: "Draft" },
  { id: "INV-2026-005", client: "Mahindra Auto", date: "01 May 2026", due: "01 Jun 2026", amount: 6500000, status: "Paid" },
];

export default function SalesInvoicesPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Invoices & Billing"
        description="Digital ledger for tracking B2B tax invoices, credit notes, and payment statuses."
        breadcrumbs={[{ label: "Sales" }, { label: "Invoices" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><CheckCircle2 className="w-24 h-24" /></div>
          <p className="text-muted text-sm uppercase tracking-wider mb-2">Total Collected (MTD)</p>
          <p className="text-3xl font-sans font-bold text-emerald-500">₹ 1.10 Cr</p>
        </div>
        <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Clock className="w-24 h-24" /></div>
          <p className="text-muted text-sm uppercase tracking-wider mb-2">Pending Receivables</p>
          <p className="text-3xl font-sans font-bold text-amber-500">₹ 12.00 L</p>
        </div>
        <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><AlertCircle className="w-24 h-24 text-rose-500" /></div>
          <p className="text-muted text-sm uppercase tracking-wider mb-2">Overdue Payments</p>
          <p className="text-3xl font-sans font-bold text-rose-500">₹ 85.00 L</p>
        </div>
      </div>

      <motion.div className="flex-1 liquid-glass rounded-3xl overflow-hidden border border-foreground/10 shadow-lg flex flex-col">
        <div className="p-4 border-b border-foreground/10 flex justify-between items-center bg-foreground/5">
          <div className="flex items-center gap-2 px-2">
            <h2 className="text-lg font-bold text-foreground">Recent Invoices</h2>
          </div>
          <button className="px-4 py-2 bg-foreground text-background font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all">
            Generate E-Invoice
          </button>
        </div>
        
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-xs uppercase bg-foreground/5 text-muted sticky top-0 backdrop-blur-md z-10 border-b border-foreground/10">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Invoice ID</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Client</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Issue Date</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Due Date</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Amount (₹)</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5 text-foreground/80">
              {INVOICES.map((row, idx) => (
                <tr key={idx} className="hover:bg-foreground/5 transition-colors group">
                  <td className="px-6 py-4 font-bold font-mono text-foreground">{row.id}</td>
                  <td className="px-6 py-4 font-medium">{row.client}</td>
                  <td className="px-6 py-4 text-muted">{row.date}</td>
                  <td className="px-6 py-4 font-mono text-muted">{row.due}</td>
                  <td className="px-6 py-4">
                    <span className={`flex w-max items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${
                      row.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      row.status === 'Overdue' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                      row.status === 'Draft' ? 'bg-foreground/10 text-foreground border-foreground/20' :
                      'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-right font-bold">{row.amount.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-foreground/10 rounded-lg text-muted hover:text-foreground transition-colors" title="Print">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-foreground/10 rounded-lg text-indigo-500 hover:text-indigo-400 transition-colors" title="Download PDF">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
