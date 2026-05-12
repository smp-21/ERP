"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Search, X, Sparkles, Loader2, ArrowRight, Package, Clock,
  AlertTriangle, IndianRupee, TrendingUp, FileText, ShoppingCart
} from "lucide-react";
import { NAVIGATION_MODULES } from "@/lib/constants";
import { liquidSpringPhysics, organicInteractions, snappySpring } from "@/lib/motion";

interface LiquidSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

// =============================================
// Simulated AI Query Responses
// =============================================
interface AIResult {
  id: string;
  type: "order" | "alert" | "metric" | "document";
  title: string;
  subtitle: string;
  value?: string;
  status?: string;
  icon: React.ElementType;
  color: string;
}

const AI_SCENARIOS: Record<string, AIResult[]> = {
  "delayed": [
    { id: "PO-8821", type: "order", title: "PO-8821 — L&T Heavy Engineering", subtitle: "Delayed 12 days • Expected: 28 Apr", value: "₹1,25,000", status: "Critical", icon: ShoppingCart, color: "text-rose-500" },
    { id: "PO-8834", type: "order", title: "PO-8834 — Adani Power", subtitle: "Delayed 5 days • Expected: 04 May", value: "₹88,400", status: "Warning", icon: ShoppingCart, color: "text-amber-500" },
    { id: "PO-8842", type: "order", title: "PO-8842 — JSW Group", subtitle: "Delayed 3 days • Expected: 07 May", value: "₹2,10,000", status: "Warning", icon: ShoppingCart, color: "text-amber-500" },
  ],
  "revenue": [
    { id: "MET-01", type: "metric", title: "Total Revenue (FY26 YTD)", subtitle: "Consolidated across all verticals", value: "₹1.24 Cr", icon: TrendingUp, color: "text-emerald-500" },
    { id: "MET-02", type: "metric", title: "Month-over-Month Growth", subtitle: "May vs April 2026", value: "+14.5%", icon: TrendingUp, color: "text-emerald-500" },
  ],
  "maintenance": [
    { id: "ALT-01", type: "alert", title: "CNC-02 Lathe: Bearing Wear Critical", subtitle: "Predictive failure window: Week 21-22", value: "87% Probability", status: "Critical", icon: AlertTriangle, color: "text-rose-500" },
    { id: "ALT-02", type: "alert", title: "ASB-01 Assembly Arm: Motor Temp Rising", subtitle: "12°C above baseline. Service recommended.", value: "Watch", status: "Warning", icon: AlertTriangle, color: "text-amber-500" },
  ],
  "default": [
    { id: "DOC-01", type: "document", title: "Q2 Financial Compliance Report", subtitle: "Generated 2 hours ago • 14 pages", icon: FileText, color: "text-violet-500" },
    { id: "DOC-02", type: "document", title: "GST Filing (April 2026)", subtitle: "Due in 5 days • Auto-generated", icon: FileText, color: "text-sky-500" },
  ],
};

function getAIResults(query: string): AIResult[] {
  const q = query.toLowerCase();
  if (q.includes("delay") || q.includes("overdue") || q.includes("po")) return AI_SCENARIOS["delayed"];
  if (q.includes("revenue") || q.includes("growth") || q.includes("sales")) return AI_SCENARIOS["revenue"];
  if (q.includes("maintenance") || q.includes("machine") || q.includes("fail")) return AI_SCENARIOS["maintenance"];
  if (q.length > 5) return AI_SCENARIOS["default"];
  return [];
}

export function LiquidSearch({ isOpen, onClose }: LiquidSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAIMode, setIsAIMode] = useState(false);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [aiResults, setAIResults] = useState<AIResult[]>([]);
  const [aiSummary, setAISummary] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect natural language queries
  const isNaturalLanguage = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return q.includes("show me") || q.includes("find") || q.includes("what") ||
           q.includes("how many") || q.includes("list") || q.includes("get") ||
           q.includes("delayed") || q.includes("overdue") || q.length > 25;
  }, [searchQuery]);

  // Switch modes based on query type
  useEffect(() => {
    if (isNaturalLanguage && searchQuery.length > 8) {
      setIsAIMode(true);
    } else if (searchQuery.length < 5) {
      setIsAIMode(false);
      setAIResults([]);
      setAISummary("");
    }
  }, [isNaturalLanguage, searchQuery]);

  // Simulate AI agent processing
  const executeAIQuery = () => {
    if (!searchQuery.trim()) return;
    setIsAIThinking(true);
    setAIResults([]);
    setAISummary("");
    setTimeout(() => {
      const results = getAIResults(searchQuery);
      setAIResults(results);
      if (results.length > 0 && results[0].type === "order") {
        setAISummary(`Found ${results.length} delayed purchase orders exceeding ₹50,000. Total exposure: ₹4.23L. Oldest delay: 12 days.`);
      } else if (results[0]?.type === "metric") {
        setAISummary(`Revenue analysis shows strong upward trajectory. FY26 YTD at ₹1.24 Cr with 14.5% MoM growth.`);
      } else if (results[0]?.type === "alert") {
        setAISummary(`2 machines flagged by the predictive maintenance engine. CNC-02 requires immediate attention.`);
      } else {
        setAISummary(`Found ${results.length} matching documents in the enterprise knowledge base.`);
      }
      setIsAIThinking(false);
    }, 1400);
  };

  // Module search (non-AI)
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim() || isAIMode) return NAVIGATION_MODULES;
    const query = searchQuery.toLowerCase();
    return NAVIGATION_MODULES.map((module) => ({
      ...module,
      items: module.items.filter((item) => item.name.toLowerCase().includes(query)),
    })).filter((module) => module.items.length > 0);
  }, [searchQuery, isAIMode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isAIMode) {
      e.preventDefault();
      executeAIQuery();
    }
  };

  const reset = () => {
    onClose();
    setSearchQuery("");
    setIsAIMode(false);
    setAIResults([]);
    setAISummary("");
    setIsAIThinking(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-28 px-4 bg-black/30 backdrop-blur-md"
        >
          <div className="absolute inset-0" onClick={reset} />

          <motion.div
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1, transition: liquidSpringPhysics }}
            exit={{ scale: 0.95, y: -20, opacity: 0, transition: { duration: 0.15 } }}
            className="relative w-full max-w-2xl liquid-glass-elevated rounded-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center px-5 py-4 border-b border-[var(--glass-border)] relative">
              {isAIMode ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={snappySpring}
                  className="mr-3 shrink-0"
                >
                  <div className="relative">
                    <Sparkles className="w-5 h-5 text-[var(--accent)]" />
                    <div className="absolute inset-0 animate-pulse"><Sparkles className="w-5 h-5 text-[var(--accent)] opacity-50" /></div>
                  </div>
                </motion.div>
              ) : (
                <Search className="w-5 h-5 text-muted mr-3 shrink-0" />
              )}

              <input
                ref={inputRef}
                autoFocus
                type="text"
                placeholder={isAIMode ? 'Ask: "Show me delayed POs over ₹50,000" — then press Enter' : "Type a command or search modules..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-foreground font-sans text-base placeholder:text-muted/60"
              />

              {isAIMode && !isAIThinking && searchQuery.length > 5 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={organicInteractions.hover}
                  whileTap={organicInteractions.tap}
                  onClick={executeAIQuery}
                  className="mr-2 px-3 py-1.5 bg-[var(--accent)] text-white text-xs font-bold rounded-lg glow-accent flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" /> Query
                </motion.button>
              )}

              <motion.button
                whileHover={organicInteractions.hover}
                whileTap={organicInteractions.tap}
                onClick={reset}
                className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-foreground/[0.06] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* AI Mode Indicator */}
            <AnimatePresence>
              {isAIMode && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-b border-[var(--glass-border)]"
                >
                  <div className="px-5 py-2.5 bg-[var(--accent)]/[0.04] flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--glow-accent)] animate-pulse" />
                    <span className="text-xs font-bold text-[var(--accent)] tracking-wider uppercase">AI Command Agent Active</span>
                    <span className="text-xs text-muted ml-auto">Natural language detected • Press Enter to query</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content Area */}
            <div className="px-2 py-3 max-h-[60vh] overflow-y-auto scrollbar-hide">
              {/* AI Thinking State */}
              <AnimatePresence mode="wait">
                {isAIThinking && (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 flex flex-col items-center justify-center gap-4"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 rounded-full border-2 border-[var(--glass-border)] border-t-[var(--accent)] border-l-[var(--accent)]"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-[var(--accent)]" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-foreground">Querying Enterprise Intelligence...</p>
                      <p className="text-xs text-muted mt-1">Scanning orders, invoices, and machine telemetry</p>
                    </div>
                  </motion.div>
                )}

                {/* AI Results */}
                {!isAIThinking && aiResults.length > 0 && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 px-3"
                  >
                    {/* AI Summary */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, ...snappySpring }}
                      className="p-4 rounded-2xl bg-[var(--accent)]/[0.06] border border-[var(--accent)]/15 mb-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] shrink-0 mt-0.5">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="micro-label text-[var(--accent)] mb-1.5">AI Summary</p>
                          <p className="text-sm text-foreground leading-relaxed font-medium">{aiSummary}</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Result Cards */}
                    {aiResults.map((result, idx) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.08, ...snappySpring }}
                        whileHover={{ backgroundColor: "var(--glass-bg-hover)", scale: 1.005 }}
                        className="flex items-center justify-between p-4 rounded-2xl border border-[var(--glass-border)] cursor-pointer group transition-all"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={`p-2.5 rounded-xl bg-foreground/[0.04] border border-[var(--glass-border)] ${result.color} group-hover:scale-110 transition-transform`}>
                            <result.icon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm text-foreground truncate">{result.title}</h4>
                            <p className="text-xs text-muted truncate mt-0.5">{result.subtitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-4">
                          {result.value && (
                            <span className={`font-mono font-bold text-sm tabular-nums ${result.color}`}>
                              {result.value}
                            </span>
                          )}
                          {result.status && (
                            <span className={`px-2 py-0.5 rounded-lg micro-label border ${
                              result.status === 'Critical' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                              'bg-amber-500/10 text-amber-500 border-amber-500/20'
                            }`}>
                              {result.status}
                            </span>
                          )}
                          <ArrowRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Default Module Navigation (non-AI mode) */}
                {!isAIThinking && aiResults.length === 0 && (
                  <motion.div key="modules" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {filteredModules.length === 0 ? (
                      <div className="py-12 flex flex-col items-center justify-center text-muted gap-2">
                        <Search className="w-8 h-8 opacity-20" />
                        <p className="text-sm font-medium">No results found for &ldquo;{searchQuery}&rdquo;</p>
                      </div>
                    ) : (
                      filteredModules.map((module, i) => (
                        <div key={i} className="mb-3 last:mb-0">
                          <p className="micro-label px-4 mb-2">{module.title}</p>
                          <div className="space-y-0.5">
                            {module.items.map((item, j) => (
                              <motion.div
                                key={j}
                                whileHover={{ backgroundColor: "var(--glass-bg-hover)" }}
                                onClick={() => {
                                  reset();
                                  router.push(item.href);
                                }}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-foreground/70 hover:text-foreground cursor-pointer transition-colors"
                              >
                                <item.icon className="w-4 h-4 text-muted" />
                                <span className="font-sans text-sm font-medium">{item.name}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Hints */}
            <div className="px-5 py-3 border-t border-[var(--glass-border)] bg-foreground/[0.02] flex items-center justify-between text-xs text-muted">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-[var(--accent)]" /> Try: &ldquo;Show me delayed POs&rdquo;</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> or &ldquo;Revenue this quarter&rdquo;</span>
              </div>
              <span className="font-mono text-[10px] bg-foreground/[0.06] px-2 py-0.5 rounded">ESC to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
