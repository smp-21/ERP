"use client";

import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { LiquidDataGrid, ColumnDef } from "@/components/ui/LiquidDataGrid";
import { glassPanelVariants, childItemVariants, organicInteractions } from "@/lib/motion";
import { ArrowUpRight, TrendingUp, Users, Factory, Boxes } from "lucide-react";

// Mock Data for Dashboard
const recentOrders = [
  { id: "ORD-2026-081", customer: "Acme Corp", amount: "$12,450.00", status: "Processing", date: "May 08, 2026" },
  { id: "ORD-2026-082", customer: "Globex Inc", amount: "$8,920.00", status: "Shipped", date: "May 07, 2026" },
  { id: "ORD-2026-083", customer: "Soylent Corp", amount: "$4,100.50", status: "Delivered", date: "May 06, 2026" },
  { id: "ORD-2026-084", customer: "Initech", amount: "$21,000.00", status: "Pending", date: "May 05, 2026" },
];

const orderColumns: ColumnDef<typeof recentOrders[0]>[] = [
  { key: "id", header: "Order ID", render: (item) => <span className="text-foreground/90 font-medium">{item.id}</span> },
  { key: "customer", header: "Customer" },
  { key: "amount", header: "Amount", align: "right" },
  { 
    key: "status", 
    header: "Status",
    render: (item) => (
      <span className={`px-2 py-1 rounded-md text-xs font-sans font-medium ${
        item.status === 'Delivered' ? 'bg-green-500/10 text-green-400' :
        item.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400' :
        item.status === 'Processing' ? 'bg-amber-500/10 text-amber-400' :
        'bg-foreground/10 text-foreground/70'
      }`}>
        {item.status}
      </span>
    )
  },
  { key: "date", header: "Date", align: "right" },
];

const metrics = [
  { label: "Total Revenue", value: "$2.4M", change: "+14%", icon: TrendingUp, color: "text-emerald-400" },
  { label: "Active Orders", value: "842", change: "+5%", icon: Boxes, color: "text-blue-400" },
  { label: "Production Efficiency", value: "94.2%", change: "+2.1%", icon: Factory, color: "text-purple-400" },
  { label: "New Leads", value: "156", change: "-3%", icon: Users, color: "text-rose-400" },
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
            className="px-4 py-2 bg-white text-black font-sans font-semibold rounded-xl text-sm flex items-center gap-2 hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
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
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            variants={childItemVariants}
            whileHover={organicInteractions.hover}
            className="liquid-glass rounded-3xl p-6 relative overflow-hidden group"
          >
            {/* Ambient background glow based on metric color */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${metric.color.replace('text-', 'bg-')}`} />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-xl bg-white/5 border-t border-white/10 ${metric.color}`}>
                <metric.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-mono px-2 py-1 rounded-md ${metric.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                {metric.change}
              </span>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-foreground/50 text-sm font-sans mb-1">{metric.label}</h3>
              <p className="text-3xl font-bold font-sans text-foreground tracking-tight">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Data Grid Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-sans font-semibold text-foreground">Recent Transactions</h2>
            <button className="text-xs text-foreground/50 hover:text-foreground transition-colors uppercase tracking-wider font-medium">View All</button>
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
            <h2 className="text-lg font-sans font-semibold text-foreground mb-2">System Health</h2>
            <p className="text-sm text-foreground/50 mb-6">All core services are operating at peak efficiency.</p>
            
            <div className="space-y-4">
              {[
                { label: "Refraction Engine", status: "Online", ping: "12ms" },
                { label: "Database Sync", status: "Active", ping: "45ms" },
                { label: "Payment Gateway", status: "Connected", ping: "18ms" }
              ].map((service, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                    <span className="text-sm text-foreground/80 font-sans">{service.label}</span>
                  </div>
                  <span className="text-xs font-mono text-foreground/40">{service.ping}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={childItemVariants} className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-foreground/40">
              <span>Last updated</span>
              <span className="font-mono">Just now</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
