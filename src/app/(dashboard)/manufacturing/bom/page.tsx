"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronRight, ChevronDown, Layers, Box, Settings, IndianRupee } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const BOM_TREE = [
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
          { id: "PRT-MAG-01", name: "Neodymium Magnets (x12)", type: "part", cost: 12000 },
          { id: "PRT-SHF-02", name: "Titanium Shaft", type: "part", cost: 6500 }
        ]
      },
      {
        id: "SUB-STR-01",
        name: "Stator Sub-Assembly",
        type: "sub-assembly",
        cost: 22000,
        children: [
          { id: "PRT-COL-01", name: "Copper Coil Winding (15kg)", type: "part", cost: 15000 },
          { id: "PRT-LAM-01", name: "Steel Laminations", type: "part", cost: 7000 }
        ]
      },
      { id: "PRT-HSE-01", name: "Aluminum Casting Housing", type: "part", cost: 4700 }
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

const TreeNode = ({ node, level = 0 }: { node: any, level?: number }) => {
  const [isOpen, setIsOpen] = useState(level < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="w-full">
      <motion.div 
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={`flex items-center justify-between py-3 px-4 rounded-xl cursor-${hasChildren ? 'pointer' : 'default'} group border border-transparent hover:bg-foreground/5 hover:border-foreground/10 transition-colors`}
        style={{ paddingLeft: `${(level * 24) + 16}px` }}
      >
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 flex items-center justify-center text-muted ${hasChildren ? 'opacity-100 group-hover:text-foreground' : 'opacity-0'}`}>
            {hasChildren && (isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)}
          </div>
          
          <div className="p-1.5 rounded-lg bg-foreground/5 text-foreground/70">
            {node.type === 'assembly' ? <Layers className="w-4 h-4 text-indigo-500" /> : 
             node.type === 'sub-assembly' ? <Settings className="w-4 h-4 text-violet-500" /> : 
             <Box className="w-4 h-4 text-muted" />}
          </div>
          
          <div>
            <span className="font-sans font-medium text-foreground text-sm">{node.name}</span>
            <span className="ml-3 font-mono text-xs text-muted">{node.id}</span>
          </div>
        </div>
        
        <div className="font-mono text-sm font-semibold text-foreground/80 flex items-center gap-1">
          <IndianRupee className="w-3 h-3 text-muted" />
          {node.cost.toLocaleString('en-IN')}
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
            {node.children.map((child: any) => (
              <TreeNode key={child.id} node={child} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ManufacturingBOMPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Bill of Materials"
        description="Hierarchical assembly structure and production cost/yield tracking."
        breadcrumbs={[{ label: "Manufacturing" }, { label: "BOM" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Node Tree */}
        <motion.div className="lg:col-span-2 liquid-glass rounded-3xl p-6 flex flex-col h-[600px] border border-foreground/10">
          <div className="flex justify-between items-center mb-6 border-b border-foreground/10 pb-4">
            <h2 className="text-lg font-sans font-semibold text-foreground">Assembly Hierarchy</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-foreground/5 text-foreground hover:bg-foreground/10">Expand All</button>
              <button className="px-3 py-1.5 text-xs font-semibold rounded-lg liquid-glass text-indigo-500 hover:bg-indigo-500/10">Edit BOM</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
            {BOM_TREE.map(node => (
              <TreeNode key={node.id} node={node} />
            ))}
          </div>
        </motion.div>

        {/* Analytics Sidebar */}
        <div className="space-y-6 flex flex-col">
          <motion.div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex-1">
            <h2 className="text-sm font-sans font-semibold text-muted uppercase tracking-wider mb-6">Production Yield Trend</h2>
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yieldData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="liquid-glass rounded-xl p-3 shadow-xl border border-foreground/10 text-sm">
                            <p className="font-sans font-semibold text-foreground mb-1">{label}</p>
                            <p className="font-mono text-emerald-500">Yield: {payload[0].value}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line type="monotone" dataKey="yield" stroke="#34d399" strokeWidth={3} dot={{ fill: '#34d399', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex-1">
            <h2 className="text-sm font-sans font-semibold text-muted uppercase tracking-wider mb-6">Avg Cost per Unit (k₹)</h2>
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yieldData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="liquid-glass rounded-xl p-3 shadow-xl border border-foreground/10 text-sm">
                            <p className="font-sans font-semibold text-foreground mb-1">{label}</p>
                            <p className="font-mono text-indigo-400">Cost: ₹{payload[0].value}k</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line type="monotone" dataKey="cost" stroke="#818cf8" strokeWidth={3} dot={{ fill: '#818cf8', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
