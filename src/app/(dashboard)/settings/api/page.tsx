"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
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
      <div className="liquid-glass rounded-xl p-3 shadow-xl border border-foreground/10 text-sm min-w-[150px]">
        <p className="font-sans font-bold text-foreground mb-2 pb-2 border-b border-foreground/10">{label}</p>
        <div className="space-y-1">
          <p className="font-mono text-indigo-500">Reqs: {payload[0].value}</p>
          <p className="font-mono text-amber-500">Latency: {payload[1].value}ms</p>
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
          <motion.div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col min-h-[350px]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500"><Activity className="w-5 h-5" /></div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">API Telemetry</h2>
                  <p className="text-sm text-muted">24-hour request volume vs endpoint latency.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-muted">
                <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div> Requests</span>
                <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> Latency (ms)</span>
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={API_USAGE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
                  <Tooltip cursor={{ strokeDasharray: '3 3', stroke: 'rgba(150,150,150,0.2)' }} content={<CustomTooltip />} />
                  
                  <Area yAxisId="left" type="monotone" dataKey="requests" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorReq)" />
                  <Line yAxisId="right" type="monotone" dataKey="latency" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div className="liquid-glass rounded-3xl overflow-hidden border border-foreground/10 flex flex-col">
            <div className="p-5 border-b border-foreground/10 bg-foreground/5 flex justify-between items-center">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-500" /> Active Webhooks
              </h2>
              <button className="px-4 py-2 bg-foreground text-background text-xs font-bold rounded-xl shadow-lg">Add Webhook</button>
            </div>
            
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="text-xs uppercase text-muted mb-2">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Event Target</th>
                    <th className="px-4 py-2 font-semibold">Endpoint URL</th>
                    <th className="px-4 py-2 font-semibold text-right">Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/5">
                  {WEBHOOKS.map(wh => (
                    <tr key={wh.id} className="hover:bg-foreground/5 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-foreground text-xs">{wh.event}</td>
                      <td className="px-4 py-3 text-muted text-xs font-mono truncate max-w-[200px]">{wh.url}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${
                          wh.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
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
          <motion.div className="liquid-glass rounded-3xl p-6 border border-foreground/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-foreground/5 text-foreground"><KeyRound className="w-5 h-5" /></div>
              <div>
                <h2 className="text-lg font-bold text-foreground">API Keys</h2>
                <p className="text-sm text-muted">Production access credentials.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">Production Key</label>
                <div className="relative group">
                  <input 
                    type="password" 
                    value="pk_live_51MabcXYZ1234567890qwertyuiop" 
                    readOnly 
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground font-mono focus:outline-none pr-12" 
                  />
                  <button 
                    onClick={handleCopy}
                    className="absolute right-2 top-2 p-1.5 rounded-lg bg-foreground/10 text-foreground hover:bg-foreground/20 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-muted">Created on 15 Jan 2026. Never expires.</p>
              </div>

              <button className="w-full py-2.5 bg-foreground/5 hover:bg-foreground/10 text-foreground font-bold text-sm rounded-xl transition-colors border border-foreground/10 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" /> Roll Key
              </button>
            </div>
          </motion.div>

          <motion.div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex-1 bg-foreground/[0.02]">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-5 h-5 text-muted" />
              <h2 className="text-sm font-bold text-muted uppercase tracking-wider">Quick Test</h2>
            </div>
            
            <div className="bg-black/80 rounded-xl p-4 overflow-x-auto border border-white/10 font-mono text-xs">
              <div className="flex gap-2 mb-2">
                <span className="text-rose-400">curl</span>
                <span className="text-emerald-400">-X</span>
                <span className="text-white">GET</span>
                <span className="text-indigo-400">"https://api.patoliya.com/v1/orders"</span>
              </div>
              <div className="flex gap-2 mb-2">
                <span className="text-emerald-400">-H</span>
                <span className="text-amber-300">"Authorization: Bearer pk_live_..."</span>
              </div>
              <div className="flex gap-2">
                <span className="text-emerald-400">-H</span>
                <span className="text-amber-300">"Content-Type: application/json"</span>
              </div>
            </div>
            
            <a href="#" className="inline-flex items-center gap-2 text-indigo-500 text-sm font-semibold mt-4 hover:underline">
              <Code className="w-4 h-4" /> View API Documentation
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
