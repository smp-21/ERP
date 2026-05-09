"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { FileText, Download, CheckCircle2, Clock } from "lucide-react";
import { organicInteractions } from "@/lib/motion";

const TAX_FILINGS = [
  { form: "GSTR-1", period: "April 2026", type: "Outward Supplies", dueDate: "11 May 2026", status: "Filed", ref: "ARN-1092837482" },
  { form: "GSTR-3B", period: "April 2026", type: "Summary Return", dueDate: "20 May 2026", status: "Pending", ref: "-" },
  { form: "TDS-26Q", period: "Q4 FY25-26", type: "Non-Salary TDS", dueDate: "31 May 2026", status: "Draft", ref: "-" },
  { form: "GSTR-1", period: "March 2026", type: "Outward Supplies", dueDate: "11 Apr 2026", status: "Filed", ref: "ARN-9827364512" },
  { form: "GSTR-3B", period: "March 2026", type: "Summary Return", dueDate: "20 Apr 2026", status: "Filed", ref: "ARN-8726354190" },
];

export default function FinanceTaxPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Tax Compliance Center"
        description="Statutory tax filings, GST returns, and TDS compliance ledger."
        breadcrumbs={[{ label: "Finance" }, { label: "Tax & Compliance" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col justify-center">
          <p className="text-muted text-sm uppercase tracking-wider mb-2">Input Tax Credit (ITC)</p>
          <p className="text-3xl font-sans font-bold text-emerald-500">₹ 8.42 L</p>
          <p className="text-xs text-muted mt-2">Available in Electronic Credit Ledger</p>
        </div>
        <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col justify-center">
          <p className="text-muted text-sm uppercase tracking-wider mb-2">Pending GST Liability</p>
          <p className="text-3xl font-sans font-bold text-rose-500">₹ 3.15 L</p>
          <p className="text-xs text-muted mt-2">Due by 20 May 2026</p>
        </div>
        <div className="lg:col-span-2 liquid-glass rounded-3xl p-6 border border-foreground/10 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-foreground mb-1">GSTR-3B Auto-Draft Available</h3>
            <p className="text-sm text-muted">The system has generated the GSTR-3B draft based on GSTR-1 and GSTR-2B reconciliation.</p>
          </div>
          <button className="px-5 py-2.5 bg-foreground text-background font-semibold rounded-xl whitespace-nowrap shadow-lg">
            Review Draft
          </button>
        </div>
      </div>

      <motion.div className="flex-1 liquid-glass rounded-3xl overflow-hidden border border-foreground/10 shadow-lg flex flex-col">
        <div className="p-6 border-b border-foreground/10 flex justify-between items-center bg-foreground/5">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" /> Statutory Filings Register
          </h2>
          <button className="text-sm font-medium text-indigo-500 hover:text-indigo-400 flex items-center gap-1">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
        
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-xs uppercase bg-foreground/5 text-muted">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Form</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Tax Period</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Type</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Due Date</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Reference (ARN)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5 text-foreground/80">
              {TAX_FILINGS.map((row, idx) => (
                <tr key={idx} className="hover:bg-foreground/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-foreground">{row.form}</td>
                  <td className="px-6 py-4">{row.period}</td>
                  <td className="px-6 py-4 text-muted">{row.type}</td>
                  <td className="px-6 py-4 font-mono">{row.dueDate}</td>
                  <td className="px-6 py-4">
                    <span className={`flex w-max items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${
                      row.status === 'Filed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      row.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-foreground/10 text-foreground border-foreground/20'
                    }`}>
                      {row.status === 'Filed' && <CheckCircle2 className="w-3 h-3" />}
                      {row.status === 'Pending' && <Clock className="w-3 h-3" />}
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-right text-muted">{row.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
