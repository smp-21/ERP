"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  Layers, Box, Settings, IndianRupee, ArrowRight, Replace,
  TrendingUp, TrendingDown, ChevronRight, ChevronDown, Zap, ArrowUpRight, Package, X
} from "lucide-react";
import { organicInteractions, liquidSpringPhysics, snappySpring, glassPanelVariants, childItemVariants } from "@/lib/motion";

// =============================================
// BOM Visual Node Tree Data
// =============================================
interface BOMPart {
  id: string;
  name: string;
  type: "assembly" | "sub-assembly" | "part";
  cost: number;
  children?: BOMPart[];
  alternatives?: { name: string; cost: number; lead: string; quality: string }[];
}

const BOM_TREE: BOMPart[] = [
  {
    id: "BOM-EV-Motor-V2",
    name: "EV Traction Motor Assembly",
    type: "assembly",
    cost: 45200,
    children: [
      {
        id: "SUB-RTR-01",
        name: "Rotor Sub-Assembly",
        type: "sub-assembly",
        cost: 18500,
        children: [
          {
            id: "PRT-MAG-01",
            name: "Neodymium Magnets (x12)",
            type: "part",
            cost: 12000,
            alternatives: [
              { name: "Ferrite Magnets (x16)", cost: 4500, lead: "3 days", quality: "Lower torque (-18%)" },
              { name: "SmCo Magnets (x12)", cost: 22000, lead: "21 days", quality: "Higher temp resistance (+40°C)" },
            ]
          },
          {
            id: "PRT-SHF-02",
            name: "Titanium Shaft",
            type: "part",
            cost: 6500,
            alternatives: [
              { name: "Stainless Steel 304 Shaft", cost: 2200, lead: "2 days", quality: "Heavier (+1.2kg)" },
              { name: "Carbon Fiber Shaft", cost: 14000, lead: "30 days", quality: "Ultra-light (-0.8kg)" },
            ]
          }
        ]
      },
      {
        id: "SUB-STR-01",
        name: "Stator Sub-Assembly",
        type: "sub-assembly",
        cost: 22000,
        children: [
          {
            id: "PRT-COL-01",
            name: "Copper Coil Winding (15kg)",
            type: "part",
            cost: 15000,
            alternatives: [
              { name: "Aluminum Coil Winding (18kg)", cost: 6800, lead: "5 days", quality: "Lower conductivity (-38%)" },
            ]
          },
          {
            id: "PRT-LAM-01",
            name: "Steel Laminations",
            type: "part",
            cost: 7000,
            alternatives: [
              { name: "Amorphous Metal Laminations", cost: 12500, lead: "14 days", quality: "Lower core loss (-60%)" },
            ]
          }
        ]
      },
      {
        id: "PRT-HSE-01",
        name: "Aluminum Casting Housing",
        type: "part",
        cost: 4700,
        alternatives: [
          { name: "Injection Molded Polymer", cost: 1800, lead: "7 days", quality: "Lower heat dissipation" },
          { name: "Magnesium Alloy Housing", cost: 8200, lead: "18 days", quality: "Lighter (-30%), premium" },
        ]
      }
    ]
  }
];

const yieldData = [
  { week: "W1", yield: 92, cost: 46.5 },
  { week: "W2", yield: 94, cost: 45.8 },
  { week: "W3", yield: 93, cost: 46.0 },
  { week: "W4", yield: 96, cost: 45.2 },
  { week: "W5", yield: 97, cost: 44.8 },
  { week: "W6", yield: 98, cost: 44.5 },
  { week: "W7", yield: 98.5, cost: 44.2 },
];

// Swap tracker: maps part ID to alternative index (or -1 for original)
type SwapMap = Record<string, number>;

function calculateTotalCost(node: BOMPart, swaps: SwapMap): number {
  let cost = node.cost;
  if (swaps[node.id] !== undefined && swaps[node.id] >= 0 && node.alternatives) {
    const alt = node.alternatives[swaps[node.id]];
    cost = alt ? alt.cost : node.cost;
  }
  if (node.children) {
    const childrenOriginalCost = node.children.reduce((sum, c) => sum + c.cost, 0);
    const childrenSwappedCost = node.children.reduce((sum, c) => sum + calculateTotalCost(c, swaps), 0);
    // Adjust parent cost to reflect children changes
    cost = cost - childrenOriginalCost + childrenSwappedCost;
  }
  return cost;
}

function getNodeIcon(type: string) {
  switch(type) {
    case "assembly": return Layers;
    case "sub-assembly": return Settings;
    default: return Box;
  }
}

function getNodeColor(type: string) {
  switch(type) {
    case "assembly": return "text-[var(--accent)]";
    case "sub-assembly": return "text-violet-500";
    default: return "text-foreground/50";
  }
}

// =============================================
// Visual BOM Node Component
// =============================================
function BOMNode({
  node,
  level = 0,
  swaps,
  onSwap,
  onSelectPart,
  selectedPart,
}: {
  node: BOMPart;
  level?: number;
  swaps: SwapMap;
  onSwap: (partId: string, altIndex: number) => void;
  onSelectPart: (partId: string) => void;
  selectedPart: string | null;
}) {
  const [isOpen, setIsOpen] = useState(level < 2);
  const hasChildren = node.children && node.children.length > 0;
  const hasAlternatives = node.alternatives && node.alternatives.length > 0;
  const isSwapped = swaps[node.id] !== undefined && swaps[node.id] >= 0;
  const isSelected = selectedPart === node.id;
  const Icon = getNodeIcon(node.type);
  const iconColor = getNodeColor(node.type);

  const displayCost = isSwapped && node.alternatives
    ? node.alternatives[swaps[node.id]].cost
    : node.cost;
  const costDiff = displayCost - node.cost;

  return (
    <div className="w-full">
      <motion.div
        onClick={() => {
          if (hasChildren) setIsOpen(!isOpen);
          if (hasAlternatives) onSelectPart(node.id);
        }}
        className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 group border cursor-pointer ${
          isSelected
            ? 'bg-[var(--accent)]/[0.06] border-[var(--accent)]/20 shadow-[0_0_16px_var(--glow-accent)]'
            : isSwapped
            ? 'bg-amber-500/[0.05] border-amber-500/15'
            : 'border-transparent hover:bg-foreground/[0.04] hover:border-[var(--glass-border)]'
        }`}
        style={{ paddingLeft: `${(level * 28) + 16}px` }}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Expand Arrow */}
          <div className={`w-5 h-5 flex items-center justify-center text-muted ${hasChildren ? 'opacity-100 group-hover:text-foreground' : 'opacity-0'}`}>
            {hasChildren && (isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)}
          </div>

          {/* Icon */}
          <div className={`p-1.5 rounded-lg bg-foreground/[0.04] ${iconColor}`}>
            <Icon className="w-4 h-4" />
          </div>

          {/* Name */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-sans font-semibold text-foreground text-sm truncate">
                {isSwapped && node.alternatives ? node.alternatives[swaps[node.id]].name : node.name}
              </span>
              {isSwapped && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 micro-label border border-amber-500/20 flex items-center gap-0.5"
                >
                  <Replace className="w-2.5 h-2.5" /> Swapped
                </motion.span>
              )}
            </div>
            <span className="font-mono text-xs text-muted">{node.id}</span>
          </div>
        </div>

        {/* Cost */}
        <div className="flex items-center gap-3 shrink-0 ml-4">
          {costDiff !== 0 && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-xs font-mono font-bold flex items-center gap-0.5 ${
                costDiff > 0 ? 'text-rose-500' : 'text-emerald-500'
              }`}
            >
              {costDiff > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {costDiff > 0 ? '+' : ''}₹{costDiff.toLocaleString('en-IN')}
            </motion.span>
          )}
          <span className={`font-mono text-sm font-semibold flex items-center gap-1 tabular-nums ${isSwapped ? 'text-amber-500' : 'text-foreground/80'}`}>
            <IndianRupee className="w-3 h-3 text-muted" />
            {displayCost.toLocaleString('en-IN')}
          </span>

          {hasAlternatives && (
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
              isSelected ? 'bg-[var(--accent)] text-white' : 'bg-foreground/[0.06] text-muted group-hover:text-foreground'
            }`}>
              <Replace className="w-3 h-3" />
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: liquidSpringPhysics }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.15 } }}
            className="overflow-hidden"
          >
            {/* Visual connector line */}
            <div className="relative" style={{ paddingLeft: `${(level * 28) + 34}px` }}>
              <div className="absolute left-0 top-0 bottom-0 border-l border-dashed border-[var(--glass-border)]" style={{ left: `${(level * 28) + 34}px` }} />
            </div>
            {node.children!.map((child) => (
              <BOMNode key={child.id} node={child} level={level + 1} swaps={swaps} onSwap={onSwap} onSelectPart={onSelectPart} selectedPart={selectedPart} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ManufacturingBOMPage() {
  const [swaps, setSwaps] = useState<SwapMap>({});
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const handleSwap = useCallback((partId: string, altIndex: number) => {
    setSwaps(prev => ({ ...prev, [partId]: altIndex }));
  }, []);

  const handleRevert = useCallback((partId: string) => {
    setSwaps(prev => {
      const next = { ...prev };
      delete next[partId];
      return next;
    });
  }, []);

  // Find the selected part node for the side panel
  const findPart = useCallback((nodes: BOMPart[], id: string): BOMPart | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findPart(node.children, id);
        if (found) return found;
      }
    }
    return null;
  }, []);

  const selectedPartData = selectedPart ? findPart(BOM_TREE, selectedPart) : null;
  const originalTotal = BOM_TREE[0].cost;
  const currentTotal = calculateTotalCost(BOM_TREE[0], swaps);
  const totalDiff = currentTotal - originalTotal;
  const swapCount = Object.keys(swaps).length;

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Interactive BOM Exploder"
        description="Visual node tree with live cost-impact simulation. Swap components to see ₹ ripple effects."
        breadcrumbs={[{ label: "Manufacturing" }, { label: "BOM" }]}
        actions={
          swapCount > 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3"
            >
              <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-mono text-sm font-bold ${
                totalDiff > 0 ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
              }`}>
                {totalDiff > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {totalDiff > 0 ? '+' : ''}₹{totalDiff.toLocaleString('en-IN')} impact
              </div>
              <motion.button
                whileHover={organicInteractions.hover}
                whileTap={organicInteractions.tap}
                onClick={() => { setSwaps({}); setSelectedPart(null); }}
                className="px-4 py-2 bg-foreground/[0.06] border border-[var(--glass-border)] text-foreground font-bold text-sm rounded-xl cursor-pointer"
              >
                Reset All ({swapCount})
              </motion.button>
            </motion.div>
          ) : undefined
        }
      />

      {/* Cost Summary Bar */}
      <motion.div
        variants={glassPanelVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <motion.div variants={childItemVariants} className="liquid-glass rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="micro-label mb-1">Original BOM Cost</p>
            <p className="text-2xl font-extrabold text-foreground tabular-nums font-mono">₹{originalTotal.toLocaleString('en-IN')}</p>
          </div>
          <Package className="w-8 h-8 text-foreground/10" />
        </motion.div>

        <motion.div variants={childItemVariants} className={`liquid-glass rounded-2xl p-5 flex items-center justify-between border ${
          totalDiff !== 0 ? (totalDiff > 0 ? 'border-rose-500/20' : 'border-emerald-500/20') : 'border-transparent'
        }`}>
          <div>
            <p className="micro-label mb-1">Simulated Cost</p>
            <p className={`text-2xl font-extrabold tabular-nums font-mono ${
              totalDiff > 0 ? 'text-rose-500' : totalDiff < 0 ? 'text-emerald-500' : 'text-foreground'
            }`}>₹{currentTotal.toLocaleString('en-IN')}</p>
          </div>
          <Zap className={`w-8 h-8 ${totalDiff !== 0 ? (totalDiff > 0 ? 'text-rose-500/20' : 'text-emerald-500/20') : 'text-foreground/10'}`} />
        </motion.div>

        <motion.div variants={childItemVariants} className="liquid-glass rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="micro-label mb-1">Active Swaps</p>
            <p className="text-2xl font-extrabold text-[var(--accent)] tabular-nums font-mono">{swapCount}</p>
          </div>
          <Replace className="w-8 h-8 text-foreground/10" />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* BOM Tree */}
        <motion.div className="lg:col-span-2 liquid-glass rounded-3xl p-6 flex flex-col h-[600px]">
          <div className="flex justify-between items-center mb-4 border-b border-[var(--glass-border)] pb-4">
            <h2 className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-[var(--accent)]" /> Assembly Hierarchy
            </h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-bold rounded-lg bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.08] border border-[var(--glass-border)] cursor-pointer">Expand All</button>
              <button className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/15 border border-[var(--accent)]/20 cursor-pointer">Edit BOM</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
            {BOM_TREE.map(node => (
              <BOMNode
                key={node.id}
                node={node}
                swaps={swaps}
                onSwap={handleSwap}
                onSelectPart={(id) => setSelectedPart(selectedPart === id ? null : id)}
                selectedPart={selectedPart}
              />
            ))}
          </div>
        </motion.div>

        {/* Swap Panel / Analytics */}
        <div className="flex flex-col gap-6">
          {/* Alternatives Panel */}
          <AnimatePresence mode="wait">
            {selectedPartData && selectedPartData.alternatives ? (
              <motion.div
                key={`swap-${selectedPartData.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={snappySpring}
                className="liquid-glass rounded-3xl p-6 border border-[var(--accent)]/15"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-foreground tracking-tight text-base flex items-center gap-2">
                    <Replace className="w-4 h-4 text-[var(--accent)]" /> Swap Alternatives
                  </h3>
                  <button onClick={() => setSelectedPart(null)} className="p-1 text-muted hover:text-foreground cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-muted mb-4">
                  Current: <span className="font-semibold text-foreground">{selectedPartData.name}</span>
                  <span className="font-mono ml-2 text-[var(--accent)]">₹{selectedPartData.cost.toLocaleString('en-IN')}</span>
                </p>

                {/* Original option */}
                <motion.button
                  whileHover={organicInteractions.hover}
                  whileTap={organicInteractions.tap}
                  onClick={() => handleRevert(selectedPartData.id)}
                  className={`w-full p-3 rounded-xl border text-left mb-2 transition-all cursor-pointer ${
                    swaps[selectedPartData.id] === undefined
                      ? 'bg-emerald-500/[0.06] border-emerald-500/20'
                      : 'bg-foreground/[0.02] border-[var(--glass-border)] hover:bg-foreground/[0.04]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-foreground">{selectedPartData.name}</span>
                    <span className="font-mono text-sm text-emerald-500 font-bold">Original</span>
                  </div>
                </motion.button>

                {/* Alternative options */}
                <div className="space-y-2">
                  {selectedPartData.alternatives.map((alt, idx) => {
                    const diff = alt.cost - selectedPartData.cost;
                    const isActive = swaps[selectedPartData.id] === idx;
                    return (
                      <motion.button
                        key={idx}
                        whileHover={organicInteractions.hover}
                        whileTap={organicInteractions.tap}
                        onClick={() => handleSwap(selectedPartData.id, idx)}
                        className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[var(--accent)]/[0.06] border-[var(--accent)]/20 shadow-[0_0_12px_var(--glow-accent)]'
                            : 'bg-foreground/[0.02] border-[var(--glass-border)] hover:bg-foreground/[0.04]'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-semibold text-foreground">{alt.name}</span>
                          <span className={`font-mono text-xs font-bold ${diff > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                            {diff > 0 ? '+' : ''}₹{diff.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex gap-3 mt-1.5">
                          <span className="micro-label">Lead: {alt.lead}</span>
                          <span className="micro-label">{alt.quality}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="liquid-glass rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[200px]"
              >
                <Replace className="w-10 h-10 text-foreground/10" />
                <div>
                  <p className="text-sm font-bold text-foreground">Component Swap Simulator</p>
                  <p className="text-xs text-muted mt-1">Click a part with the <Replace className="w-3 h-3 inline" /> icon to see alternatives and simulate cost impact</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Yield Chart */}
          <motion.div className="liquid-glass rounded-3xl p-6 flex-1">
            <h2 className="micro-label mb-4">Production Yield Trend</h2>
            <div className="w-full h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yieldData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="liquid-glass-elevated rounded-xl p-3 shadow-xl text-sm">
                            <p className="font-sans font-bold text-foreground mb-1">{label}</p>
                            <p className="font-mono text-emerald-500">Yield: {payload[0].value}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line type="monotone" dataKey="yield" stroke="#34d399" strokeWidth={3} dot={{ fill: '#34d399', strokeWidth: 2, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
