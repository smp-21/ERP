"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { organicInteractions } from "@/lib/motion";

const GST_LEDGER_DATA = [
  { id: "TXN-88012", date: "09 May 2026", type: "B2B Sale", hsn: "8482", value: 1250000, gst: 225000, trend: [20, 25, 22, 35, 30, 45, 40] },
  { id: "TXN-88013", date: "08 May 2026", type: "Input Credit", hsn: "3403", value: 450000, gst: 81000, trend: [10, 15, 12, 18, 14, 20, 18] },
  { id: "TXN-88014", date: "08 May 2026", type: "B2C Sale", hsn: "8544", value: 85000, gst: 15300, trend: [5, 8, 12, 10, 15, 14, 18] },
  { id: "TXN-88015", date: "07 May 2026", type: "Export (LUT)", hsn: "8482", value: 3400000, gst: 0, trend: [50, 45, 60, 55, 70, 65, 80] },
  { id: "TXN-88016", date: "07 May 2026", type: "Input Credit", hsn: "8482", value: 210000, gst: 37800, trend: [8, 12, 15, 10, 18, 15, 22] },
];

const Sparkline = ({ data }: { data: number[] }) => {
  const chartData = data.map((val, i) => ({ index: i, value: val }));
  const isPositive = data[data.length - 1] >= data[0];
  const color = isPositive ? "#34d399" : "#f87171";

  return (
    <div className="h-8 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function FinanceAccountsPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="GST General Ledger"
        description="High-density transaction ledger with inline 7-day velocity sparklines."
        breadcrumbs={[{ label: "Finance" }, { label: "Accounts" }]}
      />

      <div className="flex gap-4">
        <motion.button whileHover={organicInteractions.hover} whileTap={organicInteractions.tap} className="px-4 py-2 text-sm font-medium bg-foreground text-background rounded-lg shadow-lg shadow-foreground/20">Generate GSTR-1</motion.button>
        <motion.button whileHover={organicInteractions.hover} whileTap={organicInteractions.tap} className="px-4 py-2 text-sm font-medium liquid-glass text-foreground hover:bg-foreground/5 rounded-lg border border-foreground/10">Reconcile ITC</motion.button>
      </div>

      <motion.div className="liquid-glass rounded-2xl overflow-hidden border border-foreground/10 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-foreground/5 text-muted">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Txn ID</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Type / HSN</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Taxable Value (₹)</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">GST 18% (₹)</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">7-Day Velocity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5 text-foreground/80">
              {GST_LEDGER_DATA.map((row) => (
                <tr key={row.id} className="hover:bg-foreground/5 transition-colors group">
                  <td className="px-6 py-4 font-mono font-medium text-foreground">{row.id}</td>
                  <td className="px-6 py-4">{row.date}</td>
                  <td className="px-6 py-4">
                    <div>{row.type}</div>
                    <div className="text-xs text-muted mt-0.5">HSN: {row.hsn}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-right">{(row.value).toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 font-mono text-right text-rose-500 dark:text-rose-400">{row.gst > 0 ? (row.gst).toLocaleString('en-IN') : 'NIL'}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end opacity-70 group-hover:opacity-100 transition-opacity">
                      <Sparkline data={row.trend} />
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
