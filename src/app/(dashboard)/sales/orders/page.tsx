"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { Search, Filter, ShoppingCart, Truck, CheckCircle2, ChevronRight, PackageOpen } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const ORDERS = [
  { id: "ORD-99201", client: "Tata Steel Ltd", date: "09 May 2026", amount: 4500000, status: "Processing", items: 42, destination: "Jamshedpur, JH" },
  { id: "ORD-99202", client: "L&T Heavy Eng", date: "08 May 2026", amount: 1200000, status: "Shipped", items: 15, destination: "Hazira, GJ" },
  { id: "ORD-99203", client: "Reliance Ind", date: "08 May 2026", amount: 8500000, status: "Delivered", items: 120, destination: "Jamnagar, GJ" },
  { id: "ORD-99204", client: "JSW Group", date: "07 May 2026", amount: 3200000, status: "Processing", items: 28, destination: "Bellary, KA" },
  { id: "ORD-99205", client: "Mahindra Auto", date: "06 May 2026", amount: 6500000, status: "Delivered", items: 65, destination: "Chakan, MH" },
];

export default function SalesOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Order Management"
        description="High-density B2B order ledger with active fulfillment tracking."
        breadcrumbs={[{ label: "Sales" }, { label: "Orders" }]}
      />

      <div className="flex justify-between items-center bg-foreground/5 p-2 rounded-2xl border border-foreground/10 liquid-glass">
        <div className="flex items-center gap-2 px-4 w-full max-w-md">
          <Search className="w-5 h-5 text-muted" />
          <input type="text" placeholder="Search orders, clients, or locations..." className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted py-2" />
        </div>
        <div className="flex gap-2 pr-2">
          <button className="px-4 py-2 text-xs font-semibold rounded-xl liquid-glass text-foreground hover:bg-foreground/10 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter Status
          </button>
          <button className="px-4 py-2 text-xs font-semibold rounded-xl bg-foreground text-background shadow-lg">New Order</button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Main Ledger */}
        <motion.div 
          layout
          className="flex-1 liquid-glass rounded-3xl overflow-hidden border border-foreground/10 flex flex-col"
        >
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-xs uppercase bg-foreground/5 text-muted sticky top-0 backdrop-blur-md z-10 border-b border-foreground/10">
                <tr>
                  <th className="px-6 py-4 font-semibold tracking-wider">Order ID</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Client</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold tracking-wider text-right">Value (₹)</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5 text-foreground/80">
                {ORDERS.map((order) => (
                  <motion.tr 
                    layoutId={`row-${order.id}`}
                    key={order.id} 
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                    className={`cursor-pointer transition-colors ${selectedOrder === order.id ? 'bg-foreground/10' : 'hover:bg-foreground/5'}`}
                  >
                    <td className="px-6 py-4 font-mono font-bold text-foreground">{order.id}</td>
                    <td className="px-6 py-4 font-medium">{order.client}</td>
                    <td className="px-6 py-4 text-muted">{order.date}</td>
                    <td className="px-6 py-4">
                      <span className={`flex w-max items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${
                        order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        order.status === 'Shipped' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' :
                        'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}>
                        {order.status === 'Delivered' ? <CheckCircle2 className="w-3 h-3" /> :
                         order.status === 'Shipped' ? <Truck className="w-3 h-3" /> :
                         <ShoppingCart className="w-3 h-3" />}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-right">{order.amount.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight className={`w-4 h-4 text-muted transition-transform ${selectedOrder === order.id ? 'rotate-90' : ''}`} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Slide-out Preview Panel */}
        <AnimatePresence>
          {selectedOrder && (
            <motion.div
              initial={{ width: 0, opacity: 0, scale: 0.95 }}
              animate={{ width: 380, opacity: 1, scale: 1, transition: liquidSpringPhysics }}
              exit={{ width: 0, opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="liquid-glass rounded-3xl border border-foreground/10 overflow-hidden flex flex-col shrink-0"
            >
              <div className="p-6 border-b border-foreground/10 bg-foreground/5 w-[380px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                    <PackageOpen className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold font-sans text-foreground">{selectedOrder}</h2>
                </div>
                {ORDERS.map(o => o.id === selectedOrder && (
                  <p key={o.id} className="text-sm text-muted">Client: <span className="font-semibold text-foreground">{o.client}</span></p>
                ))}
              </div>
              
              {ORDERS.map(o => o.id === selectedOrder && (
                <div key={o.id} className="p-6 space-y-6 w-[380px] overflow-y-auto">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted">Order Timeline</h3>
                    <div className="relative pl-4 border-l-2 border-foreground/10 space-y-4">
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-background"></div>
                        <p className="text-sm font-semibold text-foreground">Order Placed</p>
                        <p className="text-xs text-muted">09 May, 10:42 AM</p>
                      </div>
                      <div className="relative">
                        <div className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ${o.status !== 'Processing' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'} ring-4 ring-background`}></div>
                        <p className="text-sm font-semibold text-foreground">Processing (Manufacturing)</p>
                        <p className="text-xs text-muted">Plant 2, Sector A</p>
                      </div>
                      <div className="relative opacity-50">
                        <div className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ${o.status === 'Delivered' || o.status === 'Shipped' ? 'bg-emerald-500 opacity-100' : 'bg-foreground/20'} ring-4 ring-background`}></div>
                        <p className="text-sm font-semibold text-foreground">Dispatched</p>
                        <p className="text-xs text-muted">Pending Logistics</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-foreground/10">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Fulfillment Summary</h3>
                    <div className="bg-foreground/5 rounded-xl p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted">Total Items</span>
                        <span className="font-semibold text-foreground">{o.items} Units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Destination</span>
                        <span className="font-semibold text-foreground">{o.destination}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-foreground/10 mt-2">
                        <span className="text-muted">Invoice Value</span>
                        <span className="font-mono font-bold text-indigo-500">₹{o.amount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
