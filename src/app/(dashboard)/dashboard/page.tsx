"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  TrendingUp, Users, Factory, Boxes, IndianRupee, ArrowUpRight, ArrowDownRight,
  Server, Database, Globe, Shield, Wifi, Activity, Cpu, HardDrive, Zap, CheckCircle2, AlertTriangle
} from "lucide-react";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { organicInteractions, liquidSpringPhysics, glassPanelVariants, childItemVariants, snappySpring } from "@/lib/motion";

// =============================================
// Existing Revenue + KPI Data
// =============================================
const revenueData = [
  { name: "Jan", value: 1200000 },
  { name: "Feb", value: 1400000 },
  { name: "Mar", value: 1350000 },
  { name: "Apr", value: 1800000 },
  { name: "May", value: 2200000 },
  { name: "Jun", value: 2450000 },
  { name: "Jul", value: 3100000 },
];

const allocationData = [
  { name: "Manufacturing", value: 45 },
  { name: "Operations", value: 25 },
  { name: "R&D", value: 15 },
  { name: "Marketing", value: 15 },
];
const COLORS = ["#818cf8", "#c084fc", "#f472b6", "#38bdf8"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="liquid-glass-elevated rounded-xl p-3 shadow-xl text-sm">
        <p className="font-sans font-bold text-foreground mb-1">{label}</p>
        <p className="font-mono text-[var(--accent)]">
          ₹ {(payload[0].value / 100000).toFixed(2)} Lakhs
        </p>
      </div>
    );
  }
  return null;
};

// =============================================
// System Topology Node Graph Data
// =============================================
interface TopologyNode {
  id: string;
  label: string;
  icon: React.ElementType;
  x: number; y: number; // percentage positions
  status: "healthy" | "warning" | "critical";
  latency: number;
  load: number; // percentage
  connections: string[];
}

const TOPOLOGY_NODES: TopologyNode[] = [
  { id: "gw", label: "API Gateway", icon: Globe, x: 50, y: 8, status: "healthy", latency: 12, load: 34, connections: ["app", "cdn"] },
  { id: "cdn", label: "CDN Edge", icon: Wifi, x: 82, y: 20, status: "healthy", latency: 4, load: 22, connections: [] },
  { id: "app", label: "App Server", icon: Server, x: 30, y: 35, status: "healthy", latency: 28, load: 67, connections: ["db", "cache", "ml"] },
  { id: "ml", label: "ML Engine", icon: Cpu, x: 72, y: 40, status: "warning", latency: 145, load: 91, connections: [] },
  { id: "cache", label: "Redis Cache", icon: Zap, x: 15, y: 60, status: "healthy", latency: 2, load: 45, connections: [] },
  { id: "db", label: "PostgreSQL", icon: Database, x: 50, y: 70, status: "healthy", latency: 18, load: 72, connections: ["backup"] },
  { id: "backup", label: "Backup Store", icon: HardDrive, x: 78, y: 78, status: "healthy", latency: 85, load: 12, connections: [] },
  { id: "fw", label: "Firewall", icon: Shield, x: 20, y: 88, status: "healthy", latency: 1, load: 28, connections: [] },
];

function getNodeColor(status: string) {
  switch(status) {
    case "healthy": return { ring: "ring-emerald-500/30", glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]", dot: "bg-emerald-500", text: "text-emerald-500" };
    case "warning": return { ring: "ring-amber-500/30", glow: "shadow-[0_0_20px_rgba(245,158,11,0.4)]", dot: "bg-amber-500", text: "text-amber-500" };
    case "critical": return { ring: "ring-rose-500/40", glow: "shadow-[0_0_20px_rgba(244,63,94,0.5)]", dot: "bg-rose-500", text: "text-rose-500" };
    default: return { ring: "", glow: "", dot: "bg-muted", text: "text-muted" };
  }
}

// SVG Connection Lines
function TopologyLines({ nodes }: { nodes: TopologyNode[] }) {
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {nodes.map(node =>
        node.connections.map(targetId => {
          const target = nodeMap[targetId];
          if (!target) return null;
          return (
            <line
              key={`${node.id}-${targetId}`}
              x1={`${node.x}%`} y1={`${node.y}%`}
              x2={`${target.x}%`} y2={`${target.y}%`}
              stroke="url(#lineGrad)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              opacity="0.6"
            />
          );
        })
      )}
    </svg>
  );
}

function TopologyNodeComponent({ node, onClick, isSelected }: { node: TopologyNode; onClick: () => void; isSelected: boolean }) {
  const colors = getNodeColor(node.status);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (node.status !== "healthy") {
      const interval = setInterval(() => {
        setPulse(prev => !prev);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [node.status]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.random() * 0.3, ...snappySpring }}
      onClick={onClick}
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      style={{ left: `${node.x}%`, top: `${node.y}%`, zIndex: 10 }}
    >
      {/* Outer pulse ring */}
      {node.status !== "healthy" && (
        <motion.div
          animate={{ scale: pulse ? 1.6 : 1.2, opacity: pulse ? 0 : 0.4 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className={`absolute inset-0 rounded-full ${colors.dot}`}
          style={{ filter: "blur(8px)" }}
        />
      )}

      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className={`relative w-14 h-14 rounded-2xl liquid-glass-subtle flex items-center justify-center ring-2 ${colors.ring} ${colors.glow} ${
          isSelected ? 'ring-[var(--accent)] !shadow-[0_0_24px_var(--glow-accent)]' : ''
        } transition-all`}
      >
        <node.icon className={`w-6 h-6 ${isSelected ? 'text-[var(--accent)]' : 'text-foreground/70'}`} />
        {/* Status dot */}
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${colors.dot}`} />
      </motion.div>

      {/* Label */}
      <div className={`absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-colors ${
        isSelected ? 'text-foreground' : 'text-muted'
      }`}>
        <span className="text-[10px] font-bold uppercase tracking-wider">{node.label}</span>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const activeNode = TOPOLOGY_NODES.find(n => n.id === selectedNode);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Enterprise Command Center"
        description="Real-time macro overview of financial health, system topology, and operational throughput."
        breadcrumbs={[{ label: "Global" }, { label: "Dashboard" }]}
      />

      <motion.div
        variants={glassPanelVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { label: "Total Revenue (FY26)", value: "₹ 1.24 Cr", change: "+14.5%", icon: IndianRupee, color: "text-emerald-500 dark:text-emerald-400", glow: "bg-emerald-500" },
          { label: "Active Orders", value: "842 Units", change: "+5.2%", icon: Boxes, color: "text-sky-500 dark:text-sky-400", glow: "bg-sky-500" },
          { label: "Plant Utilization", value: "94.2%", change: "+2.1%", icon: Factory, color: "text-violet-500 dark:text-violet-400", glow: "bg-violet-500" },
          { label: "Employee Count", value: "156", change: "Stable", icon: Users, color: "text-amber-500 dark:text-amber-400", glow: "bg-amber-500" },
        ].map((kpi, i) => {
          const isPositive = kpi.change.startsWith("+") || kpi.change === "Stable";
          return (
            <motion.div
              key={i}
              variants={childItemVariants}
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              className="liquid-glass rounded-3xl p-6 relative overflow-hidden group cursor-default"
            >
              <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full blur-[50px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 ${kpi.glow}`} />
              <div className="flex justify-between items-start mb-5 relative z-10">
                <div className={`p-3 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] ${kpi.color}`}>
                  <kpi.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-mono px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 ${
                  isPositive ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                }`}>
                  {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="micro-label mb-2">{kpi.label}</h3>
                <p className="text-2xl lg:text-3xl font-extrabold font-sans text-foreground tracking-tight">{kpi.value}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* =============================================
          SYSTEM TOPOLOGY — Node Graph Widget
          ============================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="liquid-glass rounded-3xl p-6 lg:col-span-3 relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-sans font-bold text-foreground tracking-tight flex items-center gap-2">
                <Activity className="w-5 h-5 text-[var(--accent)]" /> System Topology
              </h2>
              <p className="text-sm text-muted">Real-time infrastructure health, latency, and load distribution</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                <span className="micro-label text-emerald-600 dark:text-emerald-400">7 Healthy</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="micro-label text-amber-600 dark:text-amber-400">1 Warning</span>
              </div>
            </div>
          </div>

          {/* Topology Canvas */}
          <div className="relative w-full h-[380px] rounded-2xl bg-foreground/[0.02] border border-[var(--glass-border)] overflow-hidden">
            {/* Ambient grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />

            <TopologyLines nodes={TOPOLOGY_NODES} />

            {TOPOLOGY_NODES.map(node => (
              <TopologyNodeComponent
                key={node.id}
                node={node}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                isSelected={selectedNode === node.id}
              />
            ))}

            {/* Connection data flow particles */}
            <div className="absolute top-[8%] left-[50%] w-1 h-1 rounded-full bg-[var(--accent)] opacity-40 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute top-[35%] left-[30%] w-1 h-1 rounded-full bg-emerald-500 opacity-40 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
          </div>
        </motion.div>

        {/* Node Inspector Panel */}
        <motion.div
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="liquid-glass rounded-3xl p-6 flex flex-col"
        >
          <h3 className="micro-label mb-4">Node Inspector</h3>

          <AnimatePresence mode="wait">
            {activeNode ? (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={snappySpring}
                className="flex-1 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-[var(--glass-border)]">
                  <div className={`p-3 rounded-xl bg-foreground/[0.04] border border-[var(--glass-border)] ${getNodeColor(activeNode.status).text}`}>
                    <activeNode.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground tracking-tight">{activeNode.label}</h4>
                    <span className={`micro-label ${getNodeColor(activeNode.status).text}`}>{activeNode.status.toUpperCase()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                    <p className="micro-label mb-2">Latency</p>
                    <p className="text-2xl font-extrabold text-foreground tabular-nums">{activeNode.latency}<span className="text-sm font-normal text-muted ml-1">ms</span></p>
                  </div>

                  <div className="p-4 rounded-2xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                    <p className="micro-label mb-2">CPU / Memory Load</p>
                    <p className={`text-2xl font-extrabold tabular-nums ${
                      activeNode.load > 85 ? 'text-rose-500' : activeNode.load > 60 ? 'text-amber-500' : 'text-emerald-500'
                    }`}>{activeNode.load}<span className="text-sm font-normal text-muted ml-1">%</span></p>
                    {/* Load bar */}
                    <div className="w-full h-2 rounded-full bg-foreground/[0.06] mt-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeNode.load}%` }}
                        transition={liquidSpringPhysics}
                        className={`h-full rounded-full ${
                          activeNode.load > 85 ? 'bg-rose-500' : activeNode.load > 60 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                    <p className="micro-label mb-2">Downstream Connections</p>
                    <div className="flex flex-wrap gap-2">
                      {activeNode.connections.length > 0 ? activeNode.connections.map(cId => {
                        const target = TOPOLOGY_NODES.find(n => n.id === cId);
                        return target ? (
                          <span key={cId} className="px-2 py-1 bg-foreground/[0.04] border border-[var(--glass-border)] rounded-lg text-xs font-semibold text-foreground">
                            {target.label}
                          </span>
                        ) : null;
                      }) : (
                        <span className="text-xs text-muted">Terminal node (no downstream)</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center gap-3 text-muted"
              >
                <Server className="w-10 h-10 opacity-20" />
                <p className="text-xs font-medium">Click a node on the topology map to inspect its health and metrics</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Revenue + Allocation Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="liquid-glass rounded-3xl p-6 lg:col-span-2 flex flex-col"
        >
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-lg font-sans font-bold text-foreground tracking-tight">Revenue Trajectory</h2>
              <p className="text-sm text-muted">7-month trailing consolidated gross revenue</p>
            </div>
            <button className="micro-label text-[var(--accent)] hover:text-foreground transition-colors cursor-pointer">Export Report</button>
          </div>

          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevDash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} tickFormatter={(val) => `₹${val/100000}L`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorRevDash)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="liquid-glass rounded-3xl p-6 flex flex-col"
        >
          <div className="mb-6">
            <h2 className="text-lg font-sans font-bold text-foreground tracking-tight">Capital Allocation</h2>
            <p className="text-sm text-muted">Current FY budgetary distribution</p>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center relative min-h-[250px]">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={allocationData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-foreground">100%</span>
              <span className="micro-label">Allocated</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {allocationData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                <span className="text-muted truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
