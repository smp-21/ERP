"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { Calculator, CheckCircle2, XCircle, TrendingDown, Star, Download, HelpCircle } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const RFQ_DETAILS = {
  id: "RFQ-2026-089",
  title: "Procurement of Aluminum Alloy Grade A (5000 kg)",
  deadline: "12 May 2026",
  status: "Evaluation Phase",
};

const BIDS = [
  {
    vendor: "Alpha Metals Corp",
    rating: 4.8,
    unitPrice: 850,
    totalCost: 4250000,
    deliveryDays: 14,
    paymentTerms: "Net 30",
    compliance: true,
    isWinner: true,
  },
  {
    vendor: "Omega Polymers",
    rating: 4.2,
    unitPrice: 865,
    totalCost: 4325000,
    deliveryDays: 10,
    paymentTerms: "Net 15",
    compliance: true,
    isWinner: false,
  },
  {
    vendor: "Global Materials",
    rating: 3.9,
    unitPrice: 840,
    totalCost: 4200000,
    deliveryDays: 30,
    paymentTerms: "Prepaid",
    compliance: false,
    isWinner: false,
  }
];

export default function PurchaseQuotationsPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Quotation Evaluation"
        description="Compare vendor bids, analyze pricing, and award contracts."
        breadcrumbs={[{ label: "Procurement" }, { label: "Quotations" }]}
      />

      <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-indigo-500/5">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-500 border border-indigo-500/20 rounded-md text-[10px] font-bold uppercase tracking-wider">
              {RFQ_DETAILS.status}
            </span>
            <span className="font-mono text-xs text-muted font-bold">{RFQ_DETAILS.id}</span>
          </div>
          <h2 className="text-xl font-bold text-foreground">{RFQ_DETAILS.title}</h2>
          <p className="text-sm text-muted mt-1 flex items-center gap-2">
            Deadline: <span className="font-semibold text-foreground">{RFQ_DETAILS.deadline}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-background border border-foreground/10 text-foreground font-semibold text-sm rounded-xl hover:bg-foreground/5 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Matrix
          </button>
          <button className="px-4 py-2 bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-colors">
            Finalize Award
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-6">
        <div className="min-w-[800px] grid grid-cols-4 gap-4 h-full">
          {/* Attributes Column */}
          <div className="flex flex-col gap-2 pt-[140px] sticky left-0 z-10 bg-background/50 backdrop-blur-xl border-r border-foreground/10 pr-4">
            <div className="h-16 flex items-center px-4 font-bold text-sm text-muted uppercase tracking-wider">Unit Price (₹/kg)</div>
            <div className="h-16 flex items-center px-4 font-bold text-sm text-muted uppercase tracking-wider">Total Cost</div>
            <div className="h-16 flex items-center px-4 font-bold text-sm text-muted uppercase tracking-wider">Lead Time</div>
            <div className="h-16 flex items-center px-4 font-bold text-sm text-muted uppercase tracking-wider">Payment Terms</div>
            <div className="h-16 flex items-center px-4 font-bold text-sm text-muted uppercase tracking-wider">Quality Compliance</div>
          </div>

          {/* Bid Columns */}
          {BIDS.map((bid, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...liquidSpringPhysics, delay: idx * 0.1 }}
              className={`flex flex-col gap-2 rounded-3xl border p-4 relative ${
                bid.isWinner ? 'bg-emerald-500/5 border-emerald-500/30' : 'liquid-glass border-foreground/10'
              }`}
            >
              {bid.isWinner && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1.5 z-20">
                  <Star className="w-3.5 h-3.5 fill-white" /> Recommended
                </div>
              )}
              
              <div className="h-[120px] flex flex-col items-center justify-center text-center border-b border-foreground/10 pb-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center text-lg font-bold text-foreground mb-3">
                  {bid.vendor.charAt(0)}
                </div>
                <h3 className="font-bold text-foreground text-sm truncate w-full px-2">{bid.vendor}</h3>
                <div className="flex items-center gap-1 text-amber-500 mt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span className="text-xs font-bold text-foreground">{bid.rating}/5.0</span>
                </div>
              </div>

              <div className="h-16 flex items-center justify-center font-mono font-bold text-lg text-foreground bg-foreground/5 rounded-xl">
                ₹{bid.unitPrice}
              </div>
              <div className="h-16 flex items-center justify-center font-mono font-bold text-lg text-indigo-500 bg-foreground/5 rounded-xl">
                ₹{(bid.totalCost / 100000).toFixed(2)}L
              </div>
              <div className="h-16 flex items-center justify-center font-semibold text-sm text-foreground bg-foreground/5 rounded-xl">
                {bid.deliveryDays} Days
              </div>
              <div className="h-16 flex items-center justify-center font-semibold text-sm text-foreground bg-foreground/5 rounded-xl">
                {bid.paymentTerms}
              </div>
              <div className="h-16 flex items-center justify-center bg-foreground/5 rounded-xl">
                {bid.compliance ? (
                  <div className="flex items-center gap-2 text-emerald-500 text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5" /> Pass
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-rose-500 text-sm font-bold">
                    <XCircle className="w-5 h-5" /> Fail
                  </div>
                )}
              </div>
              
              <button className={`mt-auto py-3 rounded-xl font-bold text-sm transition-colors w-full mt-4 ${
                bid.isWinner ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600' : 'bg-background border border-foreground/10 text-foreground hover:bg-foreground/5'
              }`}>
                {bid.isWinner ? 'Accept Bid' : 'Select Vendor'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
