"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Code, Terminal, KeyRound, Copy, Check, Activity, Zap, RefreshCw } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const API_USAGE_DATA = [
  { time: "00:00", requests: 120, latency: 45 },
  { time: "04:00", requests: 85, latency: 42 },
  { time: "08:00", requests: 450, latency: 55 },
  { time: "12:00", requests: 890, latency: 68 },
  { time: "16:00", requests: 750, latency: 60 },
  { time: "20:00", requests: 320, latency: 48 },
  { time: "24:00", requests: 150, latency: 44 },
];

const WEBHOOKS = [
  { id: "WH-001", url: "https://erp.patoliyaindustries.com/webhook/invoice", event: "invoice.created", status: "Active", lastDelivery: "Success" },
  { id: "WH-002", url: "https://api.logistics-partner.com/update", event: "shipment.status", status: "Active", lastDelivery: "Success" },
  { id: "WH-003", url: "https://internal-slack-bot.local/alert", event: "qa.rejected", status: "Failing", lastDelivery: "Failed" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="liquid-glass-elevated rounded-xl p-3 shadow-xl text-sm min-w-[150px]">
        <p className="font-sans font-bold text-foreground mb-2 pb-2 border-b border-[var(--glass-border)]">{label}</p>
        <div className="space-y-1">
          <p className="font-mono text-[var(--accent)]">Reqs: {payload[0]?.value}</p>
          {payload[1] && <p className="font-mono text-amber-500">Latency: {payload[1]?.value}ms</p>}
        </div>
      </div>
    );
  }
  return null;
};

export default function SettingsApiPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="API Gateway & Webhooks"
        description="Developer portal for managing API keys, webhooks, and endpoint telemetry."
        breadcrumbs={[{ label: "Settings" }, { label: "API & Integrations" }]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 flex flex-col gap-6">
          <motion.div className="liquid-glass rounded-3xl p-6 flex flex-col min-h-[350px]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]"><Activity className="w-5 h-5" /></div>
                <div>
                  <h2 className="text-lg font-extrabold text-foreground tracking-tight">API Telemetry</h2>
                  <p className="text-sm text-muted">24-hour request volume vs endpoint latency.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-muted">
                <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]"></div> Requests</span>
                <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> Latency (ms)</span>
              </div>
            </div>

            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={API_USAGE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReqApi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
                  <Tooltip cursor={{ strokeDasharray: '3 3', stroke: 'var(--glass-border)' }} content={<CustomTooltip />} />

                  <Area yAxisId="left" type="monotone" dataKey="requests" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorReqApi)" />
                  <Line yAxisId="right" type="monotone" dataKey="latency" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div className="liquid-glass rounded-3xl overflow-hidden flex flex-col">
            <div className="p-5 border-b border-[var(--glass-border)] bg-foreground/[0.02] flex justify-between items-center">
              <h2 className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-500" /> Active Webhooks
              </h2>
              <button className="px-4 py-2 bg-foreground text-background text-xs font-bold rounded-xl shadow-lg cursor-pointer">Add Webhook</button>
            </div>

            <div className="p-4 overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="micro-label mb-2">
                  <tr>
                    <th className="px-4 py-2">Event Target</th>
                    <th className="px-4 py-2">Endpoint URL</th>
                    <th className="px-4 py-2 text-right">Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--glass-border)]/50">
                  {WEBHOOKS.map(wh => (
                    <tr key={wh.id} className="glass-hover-row">
                      <td className="px-4 py-3 font-mono font-bold text-foreground text-xs">{wh.event}</td>
                      <td className="px-4 py-3 text-muted text-xs font-mono truncate max-w-[200px]">{wh.url}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`px-2 py-1 rounded-lg micro-label border ${
                          wh.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                        }`}>
                          {wh.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6">
          <motion.div className="liquid-glass rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-foreground/[0.04] text-foreground"><KeyRound className="w-5 h-5" /></div>
              <div>
                <h2 className="text-lg font-extrabold text-foreground tracking-tight">API Keys</h2>
                <p className="text-sm text-muted">Production access credentials.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="micro-label">Production Key</label>
                <div className="relative group">
                  <input
                    type="password"
                    value="pk_live_51MabcXYZ1234567890qwertyuiop"
                    readOnly
                    className="w-full bg-foreground/[0.03] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-sm text-foreground font-mono focus:outline-none pr-12"
                  />
                  <button
                    onClick={handleCopy}
                    className="absolute right-2 top-2 p-1.5 rounded-lg bg-foreground/[0.06] text-foreground hover:bg-foreground/[0.12] transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="micro-label mt-1">Created on 15 Jan 2026. Never expires.</p>
              </div>

              <button className="w-full py-2.5 bg-foreground/[0.04] hover:bg-foreground/[0.08] text-foreground font-bold text-sm rounded-xl transition-colors border border-[var(--glass-border)] flex items-center justify-center gap-2 cursor-pointer">
                <RefreshCw className="w-4 h-4" /> Roll Key
              </button>
            </div>
          </motion.div>

          <motion.div className="liquid-glass rounded-3xl p-6 flex-1 bg-foreground/[0.01]">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-5 h-5 text-muted" />
              <h2 className="micro-label">Quick Test</h2>
            </div>

            <div className="bg-[#0a0a0a] rounded-xl p-4 overflow-x-auto border border-white/[0.06] font-mono text-xs">
              <div className="flex gap-2 mb-2">
                <span className="text-rose-400">curl</span>
                <span className="text-emerald-400">-X</span>
                <span className="text-white">GET</span>
                <span className="text-violet-400">&quot;https://api.patoliya.com/v1/orders&quot;</span>
              </div>
              <div className="flex gap-2 mb-2">
                <span className="text-emerald-400">-H</span>
                <span className="text-amber-300">&quot;Authorization: Bearer pk_live_...&quot;</span>
              </div>
              <div className="flex gap-2">
                <span className="text-emerald-400">-H</span>
                <span className="text-amber-300">&quot;Content-Type: application/json&quot;</span>
              </div>
            </div>

            <a href="#" className="inline-flex items-center gap-2 text-[var(--accent)] text-sm font-bold mt-4 hover:opacity-80">
              <Code className="w-4 h-4" /> View API Documentation
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
