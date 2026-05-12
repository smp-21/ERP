"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  Magnet, IndianRupee, ArrowRight, TrendingUp, Sparkles,
  User, Building2, Phone, Calendar, ChevronRight, Target, Trophy, PartyPopper
} from "lucide-react";
import { organicInteractions, liquidSpringPhysics, snappySpring, glassPanelVariants, childItemVariants } from "@/lib/motion";

type Stage = "prospecting" | "qualified" | "proposal" | "negotiation" | "closed_won" | "closed_lost";

interface Lead {
  id: string;
  company: string;
  contact: string;
  value: number;
  probability: number;
  stage: Stage;
  nextAction: string;
  daysInStage: number;
}

const STAGE_CONFIG: Record<Stage, { title: string; color: string; dotColor: string; bg: string; border: string }> = {
  prospecting: { title: "Prospecting", color: "text-slate-500", dotColor: "bg-slate-500", bg: "bg-slate-500/10", border: "border-slate-500/20" },
  qualified: { title: "Qualified", color: "text-sky-500", dotColor: "bg-sky-500", bg: "bg-sky-500/10", border: "border-sky-500/20" },
  proposal: { title: "Proposal Sent", color: "text-violet-500", dotColor: "bg-violet-500", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  negotiation: { title: "Negotiation", color: "text-amber-500", dotColor: "bg-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  closed_won: { title: "Closed Won", color: "text-emerald-500", dotColor: "bg-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  closed_lost: { title: "Closed Lost", color: "text-rose-500", dotColor: "bg-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
};

const INITIAL_LEADS: Lead[] = [
  { id: "LD-001", company: "JSW Steel", contact: "Rajiv Sharma", value: 4500000, probability: 20, stage: "prospecting", nextAction: "Discovery Call", daysInStage: 3 },
  { id: "LD-002", company: "Bajaj Auto", contact: "Priya Mehta", value: 2200000, probability: 40, stage: "qualified", nextAction: "Technical Demo", daysInStage: 7 },
  { id: "LD-003", company: "Mahindra Group", contact: "Arjun Patel", value: 8900000, probability: 60, stage: "proposal", nextAction: "Pricing Review", daysInStage: 12 },
  { id: "LD-004", company: "BHEL", contact: "Sandeep Kumar", value: 6200000, probability: 75, stage: "negotiation", nextAction: "Final Terms", daysInStage: 5 },
  { id: "LD-005", company: "NTPC Ltd", contact: "Kavita Singh", value: 12000000, probability: 85, stage: "negotiation", nextAction: "Sign-off Pending", daysInStage: 2 },
  { id: "LD-006", company: "Godrej Industries", contact: "Vikram Desai", value: 1800000, probability: 30, stage: "prospecting", nextAction: "Follow-up Email", daysInStage: 14 },
  { id: "LD-007", company: "Tata Power", contact: "Anita Joshi", value: 5500000, probability: 100, stage: "closed_won", nextAction: "Onboarding", daysInStage: 0 },
  { id: "LD-008", company: "SAIL", contact: "Deepak Gupta", value: 3200000, probability: 0, stage: "closed_lost", nextAction: "Post-mortem", daysInStage: 0 },
];

const STAGES: Stage[] = ["prospecting", "qualified", "proposal", "negotiation", "closed_won", "closed_lost"];

export default function CRMFunnelPage() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [celebration, setCelebration] = useState(false);
  const [draggedLead, setDraggedLead] = useState<string | null>(null);

  const moveLead = useCallback((leadId: string, toStage: Stage) => {
    setLeads(prev => {
      const updated = prev.map(l => {
        if (l.id === leadId) {
          const newProb = toStage === "closed_won" ? 100 : toStage === "closed_lost" ? 0 : l.probability;
          return { ...l, stage: toStage, probability: newProb, daysInStage: 0 };
        }
        return l;
      });
      return updated;
    });
    if (toStage === "closed_won") {
      setCelebration(true);
      setTimeout(() => setCelebration(false), 3000);
    }
    setDraggedLead(null);
  }, []);

  const stageLeads = (stage: Stage) => leads.filter(l => l.stage === stage);
  const pipelineValue = leads.filter(l => l.stage !== "closed_lost").reduce((s, l) => s + l.value * (l.probability / 100), 0);
  const wonValue = leads.filter(l => l.stage === "closed_won").reduce((s, l) => s + l.value, 0);

  const funnelData = STAGES.filter(s => s !== "closed_lost").map(s => ({
    stage: STAGE_CONFIG[s].title,
    value: stageLeads(s).reduce((sum, l) => sum + l.value, 0),
    count: stageLeads(s).length,
    color: s === "closed_won" ? "#10b981" : s === "negotiation" ? "#f59e0b" : s === "proposal" ? "#8b5cf6" : s === "qualified" ? "#0ea5e9" : "#64748b",
  }));

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Revenue Pipeline — CRM"
        description="Drag leads across stages to update pipeline. Closing a deal triggers projected revenue recalculation."
        breadcrumbs={[{ label: "Sales" }, { label: "CRM" }]}
        actions={
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-emerald-500" />
              <span className="font-mono font-bold text-emerald-500 text-sm">Weighted: ₹{(pipelineValue / 100000).toFixed(1)}L</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[var(--accent)]" />
              <span className="font-mono font-bold text-[var(--accent)] text-sm">Won: ₹{(wonValue / 100000).toFixed(1)}L</span>
            </div>
          </div>
        }
      />

      {/* Celebration Overlay */}
      <AnimatePresence>
        {celebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm pointer-events-none"
          >
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              className="liquid-glass-elevated rounded-3xl p-10 text-center shadow-2xl"
            >
              <motion.div animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: 2 }}>
                <PartyPopper className="w-16 h-16 text-[var(--accent)] mx-auto mb-4" />
              </motion.div>
              <h2 className="text-3xl font-extrabold text-foreground mb-2">Deal Won! 🎉</h2>
              <p className="text-muted">Revenue pipeline updated. Onboarding sequence initiated.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide flex-1 min-h-0">
        {STAGES.map((stage) => {
          const cfg = STAGE_CONFIG[stage];
          const items = stageLeads(stage);
          const stageValue = items.reduce((s, l) => s + l.value, 0);

          return (
            <div
              key={stage}
              className="flex-none w-[280px] flex flex-col"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const leadId = e.dataTransfer.getData("leadId");
                if (leadId) moveLead(leadId, stage);
              }}
            >
              <div className="flex items-center justify-between px-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${cfg.dotColor}`} />
                  <h3 className="font-bold text-foreground text-sm">{cfg.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-foreground/[0.06] px-2 py-0.5 rounded-full text-muted">{items.length}</span>
                </div>
              </div>

              <div className="flex-1 liquid-glass rounded-2xl p-3 flex flex-col gap-3 overflow-y-auto scrollbar-hide border border-foreground/[0.04] bg-foreground/[0.01] min-h-[300px]">
                {items.length === 0 && (
                  <div className="flex-1 flex items-center justify-center text-xs text-muted/40 font-medium">
                    Drop leads here
                  </div>
                )}

                {items.map((lead) => (
                  <motion.div
                    key={lead.id}
                    layout
                    draggable
                    onDragStart={(e: any) => {
                      e.dataTransfer?.setData("leadId", lead.id);
                      setDraggedLead(lead.id);
                    }}
                    onDragEnd={() => setDraggedLead(null)}
                    whileHover={organicInteractions.hover}
                    className={`liquid-glass rounded-xl p-3.5 cursor-grab active:cursor-grabbing border border-[var(--glass-border)] shadow-sm group relative overflow-hidden transition-opacity ${
                      draggedLead === lead.id ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-muted">{lead.id}</span>
                      <span className={`micro-label ${cfg.color}`}>{lead.probability}%</span>
                    </div>

                    <h4 className="font-bold text-foreground text-sm mb-0.5">{lead.company}</h4>
                    <p className="text-[10px] text-muted flex items-center gap-1 mb-3">
                      <User className="w-2.5 h-2.5" /> {lead.contact}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--glass-border)]">
                      <span className="font-mono font-bold text-sm text-[var(--accent)]">
                        ₹{(lead.value / 100000).toFixed(1)}L
                      </span>
                      <span className="text-[10px] text-muted">{lead.daysInStage}d in stage</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-2 px-2 text-center">
                <span className="text-xs text-muted font-mono">₹{(stageValue / 100000).toFixed(1)}L</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
