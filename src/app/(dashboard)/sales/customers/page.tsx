"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  Building2, Search, AlertTriangle, TrendingUp, TrendingDown,
  Heart, MessageCircle, Calendar, IndianRupee, ChevronRight, Phone, Mail, Shield, Zap
} from "lucide-react";
import { organicInteractions, liquidSpringPhysics, snappySpring, glassPanelVariants, childItemVariants } from "@/lib/motion";

interface Client {
  id: string;
  name: string;
  type: string;
  sentiment: "positive" | "neutral" | "at-risk" | "churning";
  sentimentScore: number;
  ltv: string;
  since: string;
  lastContact: string;
  location: string;
  email: string;
  phone: string;
  riskFactors: string[];
  revenueHistory: { month: string; amount: number }[];
}

const CLIENTS: Client[] = [
  {
    id: "CL-892", name: "Reliance Industries", type: "Enterprise", sentiment: "positive", sentimentScore: 92,
    ltv: "₹14.2Cr", since: "2021", lastContact: "2 days ago", location: "Mumbai, MH",
    email: "procurement@ril.com", phone: "+91 22 2278 5000", riskFactors: [],
    revenueHistory: [{ month: "Jan", amount: 180 }, { month: "Feb", amount: 220 }, { month: "Mar", amount: 195 }, { month: "Apr", amount: 260 }, { month: "May", amount: 310 }],
  },
  {
    id: "CL-893", name: "Tata Motors", type: "Enterprise", sentiment: "neutral", sentimentScore: 68,
    ltv: "₹9.8Cr", since: "2022", lastContact: "8 days ago", location: "Pune, MH",
    email: "supplychain@tatamotors.com", phone: "+91 20 6613 1111", riskFactors: ["Delayed response to last RFQ"],
    revenueHistory: [{ month: "Jan", amount: 140 }, { month: "Feb", amount: 155 }, { month: "Mar", amount: 120 }, { month: "Apr", amount: 145 }, { month: "May", amount: 130 }],
  },
  {
    id: "CL-894", name: "L&T Construction", type: "Enterprise", sentiment: "at-risk", sentimentScore: 34,
    ltv: "₹18.5Cr", since: "2019", lastContact: "28 days ago", location: "Chennai, TN",
    email: "vendor.mgmt@lntecc.com", phone: "+91 44 2252 6000",
    riskFactors: ["No orders in 45 days", "Competitor quoting 12% lower", "Support ticket unresolved (14 days)"],
    revenueHistory: [{ month: "Jan", amount: 280 }, { month: "Feb", amount: 240 }, { month: "Mar", amount: 180 }, { month: "Apr", amount: 90 }, { month: "May", amount: 40 }],
  },
  {
    id: "CL-895", name: "Adani Power", type: "Mid-Market", sentiment: "positive", sentimentScore: 85,
    ltv: "₹3.1Cr", since: "2024", lastContact: "1 day ago", location: "Ahmedabad, GJ",
    email: "contracts@adani.com", phone: "+91 79 2555 5555", riskFactors: [],
    revenueHistory: [{ month: "Jan", amount: 45 }, { month: "Feb", amount: 60 }, { month: "Mar", amount: 72 }, { month: "Apr", amount: 88 }, { month: "May", amount: 95 }],
  },
  {
    id: "CL-896", name: "Hindalco", type: "Mid-Market", sentiment: "churning", sentimentScore: 12,
    ltv: "₹1.2Cr", since: "2023", lastContact: "62 days ago", location: "Kolkata, WB",
    email: "purchase@hindalco.com", phone: "+91 33 2280 9810",
    riskFactors: ["Zero contact in 60+ days", "Switched primary vendor", "Contract expiry in 15 days", "NPS score dropped to 2"],
    revenueHistory: [{ month: "Jan", amount: 35 }, { month: "Feb", amount: 28 }, { month: "Mar", amount: 15 }, { month: "Apr", amount: 5 }, { month: "May", amount: 0 }],
  },
];

function getSentimentConfig(sentiment: string) {
  switch(sentiment) {
    case "positive": return { label: "Healthy", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]", gradient: "from-emerald-500/10 to-transparent", ringColor: "#10b981" };
    case "neutral": return { label: "Neutral", color: "text-sky-500", bg: "bg-sky-500/10", border: "border-sky-500/20", glow: "", gradient: "from-sky-500/5 to-transparent", ringColor: "#0ea5e9" };
    case "at-risk": return { label: "Flight Risk", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", glow: "shadow-[0_0_20px_rgba(245,158,11,0.25)]", gradient: "from-amber-500/10 to-transparent", ringColor: "#f59e0b" };
    case "churning": return { label: "Churning", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", glow: "shadow-[0_0_24px_rgba(244,63,94,0.3)]", gradient: "from-rose-500/15 to-transparent", ringColor: "#f43f5e" };
    default: return { label: "", color: "", bg: "", border: "", glow: "", gradient: "", ringColor: "" };
  }
}

export default function ClientSentimentPage() {
  const [selectedClient, setSelectedClient] = useState(CLIENTS[0].id);
  const activeClient = CLIENTS.find(c => c.id === selectedClient)!;
  const cfg = getSentimentConfig(activeClient.sentiment);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Client Sentiment Radar"
        description="AI-powered customer health scoring with flight-risk detection and revenue trajectory analysis."
        breadcrumbs={[{ label: "Sales" }, { label: "Customers" }]}
        actions={
          <div className="flex items-center gap-3">
            {["positive", "neutral", "at-risk", "churning"].map(s => {
              const scfg = getSentimentConfig(s);
              const count = CLIENTS.filter(c => c.sentiment === s).length;
              return count > 0 ? (
                <span key={s} className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${scfg.bg} ${scfg.color} ${scfg.border}`}>
                  {count} {scfg.label}
                </span>
              ) : null;
            })}
          </div>
        }
      />

      {/* Client Cards */}
      <motion.div
        variants={glassPanelVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {CLIENTS.map((client) => {
          const ccfg = getSentimentConfig(client.sentiment);
          const isActive = selectedClient === client.id;
          return (
            <motion.div
              key={client.id}
              variants={childItemVariants}
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              onClick={() => setSelectedClient(client.id)}
              className={`liquid-glass rounded-2xl p-4 cursor-pointer relative overflow-hidden transition-all group ${
                isActive ? `ring-2 ring-[var(--accent)] ${ccfg.glow}` : ''
              }`}
            >
              {/* Sentiment gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b ${ccfg.gradient} pointer-events-none`} />

              {(client.sentiment === "at-risk" || client.sentiment === "churning") && (
                <div className={`absolute top-0 left-0 right-0 h-1 ${client.sentiment === "churning" ? "bg-rose-500" : "bg-amber-500"}`} />
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-muted">{client.id}</span>
                  <span className={`micro-label ${ccfg.color}`}>{ccfg.label}</span>
                </div>

                <h4 className="font-bold text-foreground text-sm truncate mb-1">{client.name}</h4>
                <p className="text-[10px] text-muted mb-3">{client.type}</p>

                <div className="flex items-end justify-between">
                  <div className={`text-2xl font-extrabold tabular-nums ${ccfg.color}`}>
                    {client.sentimentScore}
                  </div>
                  <div className="text-right">
                    <p className="micro-label mb-0.5">LTV</p>
                    <p className="font-mono text-xs font-bold text-foreground">{client.ltv}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Client Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Revenue + Sentiment Detail */}
        <motion.div className="lg:col-span-2 liquid-glass rounded-3xl p-6 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeClient.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={snappySpring}
              className="flex-1 flex flex-col"
            >
              <div className="flex items-start justify-between mb-6 pb-4 border-b border-[var(--glass-border)]">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-extrabold ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                    {activeClient.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-foreground">{activeClient.name}</h2>
                    <p className="text-sm text-muted">{activeClient.type} • Since {activeClient.since} • {activeClient.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                    Score: {activeClient.sentimentScore}
                  </span>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="mb-4">
                <h3 className="micro-label mb-3">Revenue Trajectory (₹ Lakhs)</h3>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activeClient.revenueHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={cfg.ringColor} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={cfg.ringColor} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="liquid-glass-elevated rounded-xl p-3 shadow-xl text-sm">
                                <p className="font-bold text-foreground mb-1">{label}</p>
                                <p className="font-mono" style={{ color: cfg.ringColor }}>₹{payload[0].value}L</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area type="monotone" dataKey="amount" stroke={cfg.ringColor} strokeWidth={3} fill="url(#sentGrad)" dot={{ fill: cfg.ringColor, strokeWidth: 2, r: 4 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Contact */}
              <div className="flex gap-3 mt-auto">
                <div className="flex-1 p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)] flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted" />
                  <span className="text-foreground/80 truncate">{activeClient.email}</span>
                </div>
                <div className="flex-1 p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)] flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted" />
                  <span className="text-foreground/80">{activeClient.phone}</span>
                </div>
                <div className="p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)] flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted" />
                  <span className="text-foreground/80">{activeClient.lastContact}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Risk Panel */}
        <motion.div className="liquid-glass rounded-3xl p-6 flex flex-col gap-5">
          {/* Sentiment Ring */}
          <div className="flex flex-col items-center py-4">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--glass-border)" strokeWidth="6" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke={cfg.ringColor}
                  strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${activeClient.sentimentScore * 2.64} 264`}
                  initial={{ strokeDasharray: "0 264" }}
                  animate={{ strokeDasharray: `${activeClient.sentimentScore * 2.64} 264` }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-extrabold tabular-nums ${cfg.color}`}>{activeClient.sentimentScore}</span>
                <span className="micro-label">Sentiment</span>
              </div>
            </div>
          </div>

          {/* Risk Factors */}
          {activeClient.riskFactors.length > 0 ? (
            <div>
              <h3 className="micro-label text-rose-500 mb-3 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Risk Factors
              </h3>
              <div className="space-y-2">
                {activeClient.riskFactors.map((factor, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08, ...snappySpring }}
                    className="p-3 rounded-xl bg-rose-500/[0.06] border border-rose-500/15 text-xs text-foreground font-medium flex items-start gap-2"
                  >
                    <AlertTriangle className="w-3 h-3 text-rose-500 shrink-0 mt-0.5" />
                    {factor}
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/15 text-center">
              <Shield className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">No Risk Factors</p>
              <p className="text-[10px] text-muted mt-1">Healthy engagement pattern</p>
            </div>
          )}

          {/* LTV */}
          <div className="p-4 rounded-2xl bg-foreground/[0.03] border border-[var(--glass-border)]">
            <p className="micro-label mb-1">Lifetime Value</p>
            <p className="text-2xl font-extrabold text-[var(--accent)] tabular-nums font-mono">{activeClient.ltv}</p>
          </div>

          <motion.button
            whileHover={organicInteractions.hover}
            whileTap={organicInteractions.tap}
            className={`w-full py-3.5 font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer mt-auto ${
              activeClient.sentiment === "churning" || activeClient.sentiment === "at-risk"
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'bg-[var(--accent)] text-white glow-accent'
            }`}
          >
            {activeClient.sentiment === "churning" || activeClient.sentiment === "at-risk"
              ? <><Zap className="w-4 h-4" /> Initiate Retention Action</>
              : <><Heart className="w-4 h-4" /> Schedule Review</>
            }
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
