"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  Users, Shield, Clock, IndianRupee, ArrowDown, ArrowUp, CheckCircle2,
  AlertTriangle, Timer, Gavel, Award, TrendingDown, ChevronDown, Star
} from "lucide-react";
import { organicInteractions, liquidSpringPhysics, snappySpring, glassPanelVariants, childItemVariants } from "@/lib/motion";

// =============================================
// Reverse Auction Bids
// =============================================
interface AuctionItem {
  id: string;
  title: string;
  category: string;
  closingIn: string;
  reservePrice: number;
  currentLowest: number;
  totalBids: number;
  status: "live" | "closing" | "closed";
  bids: { vendor: string; amount: number; time: string; rank: number; isLowest: boolean }[];
}

const AUCTIONS: AuctionItem[] = [
  {
    id: "RFQ-2026-0451",
    title: "Neodymium Magnets N52 (Lot: 2,400 pcs)",
    category: "Raw Materials",
    closingIn: "2h 14m",
    reservePrice: 1440000,
    currentLowest: 1188000,
    totalBids: 6,
    status: "live",
    bids: [
      { vendor: "Alpha Metals Corp", amount: 1188000, time: "11:42 AM", rank: 1, isLowest: true },
      { vendor: "Omega Polymers", amount: 1224000, time: "11:38 AM", rank: 2, isLowest: false },
      { vendor: "IndoRare Minerals", amount: 1296000, time: "11:15 AM", rank: 3, isLowest: false },
      { vendor: "Pacific Elements", amount: 1350000, time: "10:55 AM", rank: 4, isLowest: false },
    ],
  },
  {
    id: "RFQ-2026-0452",
    title: "CNC Cutting Tool Inserts (Lot: 500 pcs)",
    category: "Consumables",
    closingIn: "45m",
    reservePrice: 250000,
    currentLowest: 198500,
    totalBids: 4,
    status: "closing",
    bids: [
      { vendor: "TechComponents Ltd", amount: 198500, time: "12:01 PM", rank: 1, isLowest: true },
      { vendor: "Industrial Supplies Co", amount: 212000, time: "11:50 AM", rank: 2, isLowest: false },
      { vendor: "Sandvik India", amount: 224000, time: "11:30 AM", rank: 3, isLowest: false },
    ],
  },
  {
    id: "RFQ-2026-0449",
    title: "Hydraulic Press Maintenance Contract (Annual)",
    category: "Services",
    closingIn: "Closed",
    reservePrice: 800000,
    currentLowest: 625000,
    totalBids: 5,
    status: "closed",
    bids: [
      { vendor: "Global Logistics Inc", amount: 625000, time: "Yesterday", rank: 1, isLowest: true },
      { vendor: "TechServe India", amount: 680000, time: "Yesterday", rank: 2, isLowest: false },
    ],
  },
];

function getStatusConfig(status: string) {
  switch(status) {
    case "live": return { label: "LIVE", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", dot: "bg-emerald-500" };
    case "closing": return { label: "CLOSING SOON", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", dot: "bg-amber-500" };
    case "closed": return { label: "AWARDED", color: "text-[var(--accent)]", bg: "bg-[var(--accent)]/10", border: "border-[var(--accent)]/20", dot: "bg-[var(--accent)]" };
    default: return { label: "", color: "", bg: "", border: "", dot: "" };
  }
}

export default function VendorAuctionPage() {
  const [selectedAuction, setSelectedAuction] = useState(AUCTIONS[0].id);
  const activeAuction = AUCTIONS.find(a => a.id === selectedAuction)!;
  const cfg = getStatusConfig(activeAuction.status);
  const savings = activeAuction.reservePrice - activeAuction.currentLowest;
  const savingsPct = Math.round((savings / activeAuction.reservePrice) * 100);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Vendor Self-Service — Reverse Auction"
        description="Transparent competitive bidding portal. Vendors compete on price — lowest qualified bid wins."
        breadcrumbs={[{ label: "Procurement" }, { label: "Vendors" }]}
        actions={
          <motion.button
            whileHover={organicInteractions.hover}
            whileTap={organicInteractions.tap}
            className="px-4 py-2.5 bg-[var(--accent)] text-white font-bold text-sm rounded-xl glow-accent flex items-center gap-2 cursor-pointer"
          >
            <Gavel className="w-4 h-4" /> Create New RFQ
          </motion.button>
        }
      />

      {/* Auction Cards */}
      <motion.div
        variants={glassPanelVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {AUCTIONS.map((auction) => {
          const acfg = getStatusConfig(auction.status);
          const isActive = selectedAuction === auction.id;
          const aSavings = auction.reservePrice - auction.currentLowest;
          return (
            <motion.div
              key={auction.id}
              variants={childItemVariants}
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              onClick={() => setSelectedAuction(auction.id)}
              className={`liquid-glass rounded-2xl p-5 cursor-pointer relative overflow-hidden group transition-all ${
                isActive ? 'ring-2 ring-[var(--accent)] shadow-[0_0_24px_var(--glow-accent)]' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-muted">{auction.id}</span>
                <div className="flex items-center gap-1.5">
                  {auction.status !== "closed" && (
                    <div className="relative">
                      <div className={`w-2 h-2 rounded-full ${acfg.dot}`} />
                      <div className={`absolute inset-0 w-2 h-2 rounded-full ${acfg.dot} animate-ping opacity-40`} />
                    </div>
                  )}
                  <span className={`micro-label ${acfg.color}`}>{acfg.label}</span>
                </div>
              </div>

              <h4 className="font-bold text-foreground text-sm mb-1 truncate">{auction.title}</h4>
              <p className="text-xs text-muted mb-4">{auction.category}</p>

              <div className="flex items-end justify-between">
                <div>
                  <p className="micro-label mb-1">Current Lowest</p>
                  <p className="text-xl font-extrabold text-emerald-500 tabular-nums font-mono">₹{(auction.currentLowest / 100000).toFixed(2)}L</p>
                </div>
                <div className="text-right">
                  <p className="micro-label mb-1">{auction.status === "closed" ? "Awarded" : "Closing In"}</p>
                  <p className={`text-sm font-bold ${auction.status === "closing" ? "text-amber-500" : "text-foreground"}`}>
                    {auction.status === "closing" && <Timer className="w-3 h-3 inline mr-1" />}
                    {auction.closingIn}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--glass-border)]">
                <span className="text-xs text-muted">{auction.totalBids} bids</span>
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                  <TrendingDown className="w-3 h-3" />
                  ₹{(aSavings / 1000).toFixed(0)}K saved
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Auction Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Bid Table */}
        <motion.div className="lg:col-span-2 liquid-glass rounded-3xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-[var(--glass-border)] pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2">
                <Gavel className={`w-5 h-5 ${cfg.color}`} /> Bid Ladder — {activeAuction.id}
              </h2>
              <p className="text-xs text-muted mt-1">{activeAuction.title}</p>
            </div>
            {activeAuction.status !== "closed" && (
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${cfg.dot} animate-pulse`} />
                <span className={`micro-label ${cfg.color}`}>{cfg.label}</span>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto scrollbar-hide">
            {activeAuction.bids.map((bid, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.06, ...snappySpring }}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  bid.isLowest
                    ? 'bg-emerald-500/[0.06] border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                    : 'border-[var(--glass-border)] hover:bg-foreground/[0.03]'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                    bid.rank === 1 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                    bid.rank === 2 ? 'bg-sky-500/10 text-sky-500 border border-sky-500/20' :
                    'bg-foreground/[0.04] text-muted border border-[var(--glass-border)]'
                  }`}>
                    {bid.rank === 1 ? <Award className="w-5 h-5" /> : `#${bid.rank}`}
                  </div>

                  <div>
                    <h4 className={`font-bold text-sm ${bid.isLowest ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'}`}>{bid.vendor}</h4>
                    <p className="text-xs text-muted">{bid.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`font-mono font-extrabold text-lg tabular-nums ${bid.isLowest ? 'text-emerald-500' : 'text-foreground'}`}>
                      ₹{bid.amount.toLocaleString('en-IN')}
                    </p>
                    {!bid.isLowest && (
                      <p className="text-xs text-rose-500 font-mono">
                        +₹{(bid.amount - activeAuction.currentLowest).toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>

                  {bid.isLowest && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="px-2 py-1 bg-emerald-500 text-white micro-label rounded-lg"
                    >
                      L1
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Savings Summary */}
        <motion.div className="liquid-glass rounded-3xl p-6 flex flex-col gap-5">
          <h3 className="micro-label">Auction Summary</h3>

          <div className="p-5 rounded-2xl bg-foreground/[0.03] border border-[var(--glass-border)] text-center">
            <p className="micro-label mb-2">Reserve Price</p>
            <p className="text-2xl font-extrabold text-foreground tabular-nums font-mono line-through decoration-muted/30">
              ₹{activeAuction.reservePrice.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 text-center">
            <p className="micro-label text-emerald-600 dark:text-emerald-400 mb-2">Current Lowest Bid</p>
            <p className="text-3xl font-extrabold text-emerald-500 tabular-nums font-mono">
              ₹{activeAuction.currentLowest.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--accent)]/[0.06] border border-[var(--accent)]/15 text-center">
            <p className="micro-label text-[var(--accent)] mb-2">Procurement Savings</p>
            <div className="flex items-center justify-center gap-3">
              <p className="text-2xl font-extrabold text-[var(--accent)] tabular-nums font-mono">
                ₹{savings.toLocaleString('en-IN')}
              </p>
              <span className="px-2 py-1 bg-[var(--accent)]/10 text-[var(--accent)] micro-label rounded-lg">
                -{savingsPct}%
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-foreground/[0.03] border border-[var(--glass-border)]">
            <p className="micro-label mb-2">Bid Activity</p>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Total Bids</span>
              <span className="font-bold text-foreground">{activeAuction.totalBids}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-muted">Unique Vendors</span>
              <span className="font-bold text-foreground">{activeAuction.bids.length}</span>
            </div>
          </div>

          {activeAuction.status !== "closed" && (
            <motion.button
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              className="w-full py-3.5 bg-[var(--accent)] text-white font-bold text-sm rounded-xl glow-accent flex items-center justify-center gap-2 cursor-pointer mt-auto"
            >
              <Shield className="w-4 h-4" /> Award to L1 Bidder
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
