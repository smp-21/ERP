"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { Building2, Search, MapPin, Mail, Phone, ExternalLink, Activity, FileText, IndianRupee, TrendingUp, Calendar, ChevronRight } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const CLIENTS = [
  { id: "CL-892", name: "Reliance Industries", type: "Enterprise", status: "Active", ltv: "₹14.2Cr", since: "2021", location: "Mumbai, MH", email: "procurement@ril.com", phone: "+91 22 2278 5000" },
  { id: "CL-893", name: "Tata Motors", type: "Enterprise", status: "Active", ltv: "₹9.8Cr", since: "2022", location: "Pune, MH", email: "supplychain@tatamotors.com", phone: "+91 20 6613 1111" },
  { id: "CL-894", name: "L&T Construction", type: "Enterprise", status: "At Risk", ltv: "₹18.5Cr", since: "2019", location: "Chennai, TN", email: "vendor.mgmt@lntecc.com", phone: "+91 44 2252 6000" },
  { id: "CL-895", name: "Adani Power", type: "Mid-Market", status: "Active", ltv: "₹3.1Cr", since: "2024", location: "Ahmedabad, GJ", email: "contracts@adani.com", phone: "+91 79 2555 5555" },
  { id: "CL-896", name: "Hindalco", type: "Mid-Market", status: "Inactive", ltv: "₹1.2Cr", since: "2023", location: "Kolkata, WB", email: "purchase@hindalco.com", phone: "+91 33 2280 9810" },
];

const ORDER_HISTORY = [
  { id: "ORD-001", date: "05 May 2026", amount: "₹45,00,000", status: "Delivered" },
  { id: "ORD-002", date: "12 Apr 2026", amount: "₹12,50,000", status: "Delivered" },
  { id: "ORD-003", date: "28 Mar 2026", amount: "₹89,00,000", status: "Delivered" },
];

const REVENUE_DATA = [
  { month: "Jan", amount: 45 },
  { month: "Feb", amount: 52 },
  { month: "Mar", amount: 38 },
  { month: "Apr", amount: 65 },
  { month: "May", amount: 58 },
  { month: "Jun", amount: 80 },
];

export default function SalesCustomersPage() {
  const [activeClient, setActiveClient] = useState(CLIENTS[0].id);
  const clientData = CLIENTS.find(c => c.id === activeClient);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Customer Management (360°)"
        description="Enterprise client directory, lifetime value tracking, and relationship history."
        breadcrumbs={[{ label: "Sales & Orders" }, { label: "Customers" }]}
      />

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Left Pane: Client Directory */}
        <div className="w-full lg:w-96 flex flex-col gap-4 h-full shrink-0">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-background rounded-2xl border border-foreground/10 shadow-sm">
            <Search className="w-5 h-5 text-muted" />
            <input type="text" placeholder="Search clients by name or ID..." className="bg-transparent border-none outline-none text-sm w-full text-foreground" />
          </div>

          <div className="liquid-glass rounded-3xl border border-foreground/10 flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-foreground/10 bg-foreground/5 flex justify-between items-center">
              <span className="text-sm font-bold text-foreground">All Clients</span>
              <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-500 rounded text-xs font-bold">{CLIENTS.length}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {CLIENTS.map((client) => (
                <button
                  key={client.id}
                  onClick={() => setActiveClient(client.id)}
                  className={`w-full text-left p-3 rounded-2xl transition-all duration-300 flex items-center justify-between group ${
                    activeClient === client.id ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'hover:bg-foreground/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${
                      activeClient === client.id ? 'bg-white/20 text-white' : 'bg-foreground/10 text-foreground group-hover:scale-110 transition-transform'
                    }`}>
                      {client.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className={`font-bold text-sm truncate ${activeClient === client.id ? 'text-white' : 'text-foreground'}`}>{client.name}</h3>
                      <p className={`text-xs font-mono truncate ${activeClient === client.id ? 'text-white/70' : 'text-muted'}`}>{client.id}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${activeClient === client.id ? 'text-white' : 'text-muted opacity-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane: 360 View */}
        <div className="flex-1 liquid-glass rounded-3xl border border-foreground/10 flex flex-col overflow-hidden h-full relative">
          <AnimatePresence mode="wait">
            {clientData && (
              <motion.div
                key={clientData.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={liquidSpringPhysics}
                className="flex-1 overflow-y-auto flex flex-col"
              >
                {/* 360 Header */}
                <div className="p-8 border-b border-foreground/10 bg-gradient-to-br from-indigo-500/10 to-transparent">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 rounded-2xl bg-indigo-500 text-white flex items-center justify-center font-bold text-3xl shadow-xl shadow-indigo-500/30 border border-white/20">
                        {clientData.name.charAt(0)}
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-foreground tracking-tight">{clientData.name}</h1>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="px-2.5 py-1 bg-foreground/5 border border-foreground/10 rounded-md text-[10px] font-bold uppercase tracking-wider text-foreground/80">
                            {clientData.type}
                          </span>
                          <span className={`px-2.5 py-1 border rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            clientData.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                            clientData.status === 'At Risk' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                            'bg-muted/10 text-muted border-muted/20'
                          }`}>
                            {clientData.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-foreground text-background font-bold text-sm rounded-xl shadow-lg flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" /> View CRM Profile
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 text-sm text-foreground/80 bg-background/50 p-3 rounded-xl border border-foreground/5"><MapPin className="w-4 h-4 text-indigo-500" /> {clientData.location}</div>
                    <div className="flex items-center gap-3 text-sm text-foreground/80 bg-background/50 p-3 rounded-xl border border-foreground/5"><Mail className="w-4 h-4 text-indigo-500" /> {clientData.email}</div>
                    <div className="flex items-center gap-3 text-sm text-foreground/80 bg-background/50 p-3 rounded-xl border border-foreground/5"><Phone className="w-4 h-4 text-indigo-500" /> {clientData.phone}</div>
                  </div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Stats Column */}
                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl border border-foreground/10 bg-foreground/5">
                      <p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">Lifetime Value (LTV)</p>
                      <p className="text-3xl font-sans font-bold text-emerald-500">{clientData.ltv}</p>
                    </div>
                    <div className="p-5 rounded-2xl border border-foreground/10 bg-foreground/5">
                      <p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">Client Since</p>
                      <p className="text-3xl font-sans font-bold text-foreground">{clientData.since}</p>
                    </div>
                    <div className="p-5 rounded-2xl border border-indigo-500/30 bg-indigo-500/5">
                      <p className="text-[10px] uppercase tracking-wider text-indigo-500 font-bold mb-1">Active Contracts</p>
                      <p className="text-3xl font-sans font-bold text-indigo-500">2 <span className="text-sm font-medium opacity-70">Active</span></p>
                    </div>
                  </div>

                  {/* Charts & Timeline */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Revenue Chart */}
                    <div className="h-48">
                      <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-500" /> Revenue Trend (Last 6 Months)</h3>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorRevLtv" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Tooltip cursor={{ stroke: 'var(--glass-border)' }} contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '12px', border: '1px solid var(--glass-border)' }} />
                          <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fill="url(#colorRevLtv)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Timeline */}
                    <div>
                      <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-indigo-500" /> Recent Order History</h3>
                      <div className="space-y-3">
                        {ORDER_HISTORY.map((order, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-foreground/10 hover:bg-foreground/5 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center"><FileText className="w-5 h-5" /></div>
                              <div>
                                <p className="font-mono text-sm font-bold text-foreground">{order.id}</p>
                                <p className="text-xs text-muted flex items-center gap-1"><Calendar className="w-3 h-3" /> {order.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-mono font-bold text-foreground text-base">{order.amount}</p>
                              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">{order.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
