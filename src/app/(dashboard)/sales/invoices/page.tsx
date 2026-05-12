"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { FileText, Download, CheckCircle2, AlertCircle, Clock, Printer } from "lucide-react";
import { organicInteractions, glassPanelVariants, childItemVariants } from "@/lib/motion";

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

      <motion.div
        variants={glassPanelVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { label: "Total Collected (MTD)", value: "₹ 1.10 Cr", color: "text-emerald-500 dark:text-emerald-400", icon: CheckCircle2, glow: "bg-emerald-500" },
          { label: "Pending Receivables", value: "₹ 12.00 L", color: "text-amber-500 dark:text-amber-400", icon: Clock, glow: "bg-amber-500" },
          { label: "Overdue Payments", value: "₹ 85.00 L", color: "text-rose-500 dark:text-rose-400", icon: AlertCircle, glow: "bg-rose-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={childItemVariants}
            whileHover={organicInteractions.hover}
            className="liquid-glass rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden group cursor-default"
          >
            <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full blur-[50px] opacity-0 group-hover:opacity-25 transition-opacity duration-700 ${stat.glow}`} />
            <div className="absolute top-0 right-0 p-4 opacity-[0.04]"><stat.icon className="w-24 h-24" /></div>
            <div className="relative z-10">
              <p className="micro-label mb-2">{stat.label}</p>
              <p className={`text-3xl font-sans font-extrabold tracking-tight ${stat.color}`}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="flex-1 liquid-glass rounded-3xl overflow-hidden shadow-lg flex flex-col">
        <div className="p-4 border-b border-[var(--glass-border)] flex justify-between items-center bg-foreground/[0.02]">
          <h2 className="text-lg font-bold text-foreground tracking-tight px-2">Recent Invoices</h2>
          <motion.button
            whileHover={organicInteractions.hover}
            whileTap={organicInteractions.tap}
            className="px-4 py-2 bg-foreground text-background font-semibold text-sm rounded-xl shadow-lg cursor-pointer"
          >
            Generate E-Invoice
          </motion.button>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="micro-label bg-foreground/[0.03] sticky top-0 backdrop-blur-md z-10 border-b border-[var(--glass-border)]">
              <tr>
                <th className="px-6 py-4 tracking-wider">Invoice ID</th>
                <th className="px-6 py-4 tracking-wider">Client</th>
                <th className="px-6 py-4 tracking-wider">Issue Date</th>
                <th className="px-6 py-4 tracking-wider">Due Date</th>
                <th className="px-6 py-4 tracking-wider">Status</th>
                <th className="px-6 py-4 tracking-wider text-right">Amount (₹)</th>
                <th className="px-6 py-4 tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--glass-border)]/50 text-foreground/80">
              {INVOICES.map((row, idx) => (
                <tr key={idx} className="glass-hover-row group">
                  <td className="px-6 py-4 font-bold font-mono text-foreground">{row.id}</td>
                  <td className="px-6 py-4 font-medium">{row.client}</td>
                  <td className="px-6 py-4 text-muted">{row.date}</td>
                  <td className="px-6 py-4 font-mono text-muted tabular-nums">{row.due}</td>
                  <td className="px-6 py-4">
                    <span className={`flex w-max items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${
                      row.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' :
                      row.status === 'Overdue' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' :
                      row.status === 'Draft' ? 'bg-foreground/[0.06] text-foreground/60 border-foreground/10' :
                      'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-right font-bold tabular-nums">{row.amount.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-foreground/[0.06] rounded-xl text-muted hover:text-foreground transition-colors cursor-pointer" title="Print">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-foreground/[0.06] rounded-xl text-[var(--accent)] hover:opacity-80 transition-colors cursor-pointer" title="Download PDF">
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
