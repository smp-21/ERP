"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { Building2, MapPin, Mail, Phone, Star, TrendingUp, Search, Filter, FileText } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";
import { organicInteractions } from "@/lib/motion";

const VENDORS = [
  { id: "V-001", name: "Alpha Metals Corp", type: "Raw Materials", location: "Pune, India", email: "sales@alphametals.in", phone: "+91 98765 43210", rating: 94, activeContracts: 3, spend: "₹1.2Cr", color: "#818cf8" },
  { id: "V-002", name: "TechComponents Ltd", type: "Electronics", location: "Shenzhen, CN", email: "export@techcomp.cn", phone: "+86 138 0013 8000", rating: 88, activeContracts: 1, spend: "₹45L", color: "#10b981" },
  { id: "V-003", name: "Global Logistics Inc", type: "Freight", location: "Mumbai, India", email: "ops@globallogistics.com", phone: "+91 22 2838 1000", rating: 76, activeContracts: 5, spend: "₹85L", color: "#f59e0b" },
  { id: "V-004", name: "Industrial Supplies Co", type: "Consumables", location: "Delhi, India", email: "orders@indsupplies.in", phone: "+91 11 4152 2000", rating: 98, activeContracts: 2, spend: "₹12L", color: "#f43f5e" },
  { id: "V-005", name: "Omega Polymers", type: "Raw Materials", location: "Ahmedabad, India", email: "info@omegapoly.in", phone: "+91 79 2640 3000", rating: 91, activeContracts: 4, spend: "₹2.1Cr", color: "#0ea5e9" },
  { id: "V-006", name: "Secure Packaging", type: "Packaging", location: "Surat, India", email: "hello@securepack.in", phone: "+91 261 247 5000", rating: 85, activeContracts: 1, spend: "₹8L", color: "#8b5cf6" },
];

export default function PurchaseVendorsPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Vendor Directory"
        description="Manage supplier relationships, evaluate performance ratings, and track contracts."
        breadcrumbs={[{ label: "Procurement" }, { label: "Vendors" }]}
      />

      <div className="flex items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button className="px-5 py-2.5 bg-foreground text-background font-bold text-sm rounded-xl shadow-lg whitespace-nowrap">All Vendors</button>
          <button className="px-5 py-2.5 bg-foreground/5 hover:bg-foreground/10 text-foreground font-semibold text-sm rounded-xl border border-foreground/10 transition-colors whitespace-nowrap">Raw Materials</button>
          <button className="px-5 py-2.5 bg-foreground/5 hover:bg-foreground/10 text-foreground font-semibold text-sm rounded-xl border border-foreground/10 transition-colors whitespace-nowrap">Logistics</button>
          <button className="px-5 py-2.5 bg-foreground/5 hover:bg-foreground/10 text-foreground font-semibold text-sm rounded-xl border border-foreground/10 transition-colors whitespace-nowrap text-rose-500">Underperforming</button>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-background rounded-xl border border-foreground/10 shadow-sm">
            <Search className="w-4 h-4 text-muted" />
            <input type="text" placeholder="Search vendors..." className="bg-transparent border-none outline-none text-sm w-48 text-foreground" />
          </div>
          <button className="p-2.5 bg-background rounded-xl border border-foreground/10 text-muted hover:text-foreground shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto pb-6">
        {VENDORS.map((vendor) => (
          <motion.div 
            key={vendor.id}
            whileHover={organicInteractions.hover}
            className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground font-bold text-xl group-hover:scale-110 transition-transform">
                  {vendor.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-foreground truncate max-w-[150px]">{vendor.name}</h3>
                  <p className="text-xs text-muted font-mono">{vendor.id}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-foreground/5 text-muted border border-foreground/5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                {vendor.type}
              </span>
            </div>

            <div className="space-y-3 mb-6 flex-1">
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <MapPin className="w-4 h-4 text-muted" /> {vendor.location}
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <Mail className="w-4 h-4 text-muted" /> <span className="truncate">{vendor.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <Phone className="w-4 h-4 text-muted" /> {vendor.phone}
              </div>
            </div>

            <div className="p-4 bg-foreground/5 rounded-2xl border border-foreground/5 grid grid-cols-2 gap-4 items-center">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">Performance</p>
                <div className="w-20 h-20 relative -ml-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                      cx="50%" cy="50%" 
                      innerRadius="60%" outerRadius="100%" 
                      barSize={6} 
                      data={[{ name: 'Score', value: vendor.rating, fill: vendor.color }]}
                      startAngle={90} endAngle={-270}
                    >
                      <RadialBar background={{ fill: 'var(--glass-border)' }} dataKey="value" cornerRadius={10} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-sm font-bold font-mono" style={{ color: vendor.color }}>{vendor.rating}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-right">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-0.5">Active Contracts</p>
                  <p className="text-lg font-bold text-foreground flex items-center justify-end gap-1">
                    <FileText className="w-4 h-4 text-indigo-500" /> {vendor.activeContracts}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-0.5">YTD Spend</p>
                  <p className="text-sm font-mono font-bold text-emerald-500">{vendor.spend}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
