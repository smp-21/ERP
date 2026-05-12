"use client";

import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { LiquidDataGrid, ColumnDef } from "@/components/ui/LiquidDataGrid";
import { glassPanelVariants, childItemVariants, organicInteractions } from "@/lib/motion";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, Factory, Boxes } from "lucide-react";

// Mock Data for Dashboard
const recentOrders = [
  { id: "ORD-2026-081", customer: "Acme Corp", amount: "$12,450.00", status: "Processing", date: "May 08, 2026" },
  { id: "ORD-2026-082", customer: "Globex Inc", amount: "$8,920.00", status: "Shipped", date: "May 07, 2026" },
  { id: "ORD-2026-083", customer: "Soylent Corp", amount: "$4,100.50", status: "Delivered", date: "May 06, 2026" },
  { id: "ORD-2026-084", customer: "Initech", amount: "$21,000.00", status: "Pending", date: "May 05, 2026" },
];

const orderColumns: ColumnDef<typeof recentOrders[0]>[] = [
  { key: "id", header: "Order ID", render: (item) => <span className="text-foreground font-semibold">{item.id}</span> },
  { key: "customer", header: "Customer" },
  { key: "amount", header: "Amount", align: "right" },
  {
    key: "status",
    header: "Status",
    render: (item) => (
      <span className={`px-2.5 py-1 rounded-lg text-xs font-sans font-semibold ${
        item.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
        item.status === 'Shipped' ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400' :
        item.status === 'Processing' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
        'bg-foreground/[0.06] text-foreground/60'
      }`}>
        {item.status}
      </span>
    )
  },
  { key: "date", header: "Date", align: "right" },
];

const metrics = [
  { label: "Total Revenue", value: "$2.4M", change: "+14%", icon: TrendingUp, color: "text-emerald-500 dark:text-emerald-400", glow: "bg-emerald-500" },
  { label: "Active Orders", value: "842", change: "+5%", icon: Boxes, color: "text-sky-500 dark:text-sky-400", glow: "bg-sky-500" },
  { label: "Production Efficiency", value: "94.2%", change: "+2.1%", icon: Factory, color: "text-violet-500 dark:text-violet-400", glow: "bg-violet-500" },
  { label: "New Leads", value: "156", change: "-3%", icon: Users, color: "text-rose-500 dark:text-rose-400", glow: "bg-rose-500" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <GlassPageHeader
        title="Command Center"
        description="Real-time enterprise intelligence and operational overview."
        breadcrumbs={[{ label: "Global" }, { label: "Dashboard" }]}
        actions={
          <motion.button
            whileHover={organicInteractions.hover}
            whileTap={organicInteractions.tap}
            className="px-5 py-2.5 bg-[var(--accent)] text-white font-sans font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg glow-accent cursor-pointer"
          >
            Generate Report
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        }
      />

      {/* Bento Grid Metrics */}
      <motion.div
        variants={glassPanelVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {metrics.map((metric, idx) => {
          const isPositive = metric.change.startsWith("+");
          return (
            <motion.div
              key={idx}
              variants={childItemVariants}
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              className="liquid-glass rounded-3xl p-6 relative overflow-hidden group cursor-default"
            >
              {/* Ambient background glow */}
              <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full blur-[50px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 ${metric.glow}`} />

              <div className="flex justify-between items-start mb-5 relative z-10">
                <div className={`p-3 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] ${metric.color}`}>
                  <metric.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-mono px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 ${isPositive ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`}>
                  {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {metric.change}
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="micro-label mb-2">{metric.label}</h3>
                <p className="text-3xl font-extrabold font-sans text-foreground tracking-tight">{metric.value}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Data Grid Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-sans font-bold text-foreground tracking-tight">Recent Transactions</h2>
            <button className="micro-label hover:text-foreground transition-colors cursor-pointer">View All</button>
          </div>
          <LiquidDataGrid
            data={recentOrders}
            columns={orderColumns}
            onRowClick={(row) => console.log("Clicked", row)}
          />
        </div>

        {/* Secondary Bento Box */}
        <motion.div
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="liquid-glass rounded-3xl p-6 flex flex-col justify-between"
        >
          <motion.div variants={childItemVariants}>
            <h2 className="text-lg font-sans font-bold text-foreground tracking-tight mb-2">System Health</h2>
            <p className="text-sm text-muted mb-6">All core services are operating at peak efficiency.</p>

            <div className="space-y-3">
              {[
                { label: "Refraction Engine", status: "Online", ping: "12ms" },
                { label: "Database Sync", status: "Active", ping: "45ms" },
                { label: "Payment Gateway", status: "Connected", ping: "18ms" }
              ].map((service, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)] glass-hover-row">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                    <span className="text-sm text-foreground/80 font-sans font-medium">{service.label}</span>
                  </div>
                  <span className="text-xs font-mono text-muted tabular-nums">{service.ping}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={childItemVariants} className="mt-8 pt-5 border-t border-[var(--glass-border)]">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Last updated</span>
              <span className="font-mono tabular-nums">Just now</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
