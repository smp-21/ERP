"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";
import { ShieldAlert, Activity, CheckCircle2, FlaskConical, Download } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

// Sample QA Data: X = Batch Number, Y = Defect Rate (%), Z = Sample Size
const QA_DATA_LINE1 = [
  { batch: 101, defect: 1.2, size: 500 },
  { batch: 102, defect: 0.8, size: 500 },
  { batch: 103, defect: 3.5, size: 500 }, // Spike
  { batch: 104, defect: 1.1, size: 500 },
  { batch: 105, defect: 0.9, size: 500 },
  { batch: 106, defect: 1.0, size: 500 },
];

const QA_DATA_LINE2 = [
  { batch: 101, defect: 0.5, size: 400 },
  { batch: 102, defect: 0.4, size: 400 },
  { batch: 103, defect: 0.7, size: 400 },
  { batch: 104, defect: 0.6, size: 400 },
  { batch: 105, defect: 0.5, size: 400 },
  { batch: 106, defect: 0.8, size: 400 },
];

const RECENT_REPORTS = [
  { id: "QA-9921", item: "Rotor Core Assy", status: "Pass", inspector: "R. Desai", time: "10 mins ago" },
  { id: "QA-9922", item: "Stator Housing", status: "Reject", inspector: "V. Sharma", time: "1 hr ago", reason: "Dimensional variance > 0.1mm" },
  { id: "QA-9923", item: "EV Drive Belt", status: "Pass", inspector: "S. Patoliya", time: "3 hrs ago" },
  { id: "QA-9924", item: "Copper Coils", status: "Rework", inspector: "N. Patel", time: "4 hrs ago", reason: "Insulation resistance low" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isHigh = data.defect > 2.0;
    return (
      <div className={`liquid-glass rounded-xl p-3 shadow-xl border ${isHigh ? 'border-rose-500/50 shadow-rose-500/10' : 'border-foreground/10'} text-sm min-w-[150px]`}>
        <p className="font-sans font-bold text-foreground mb-1">Batch #{data.batch}</p>
        <p className={`font-mono font-bold ${isHigh ? 'text-rose-500' : 'text-emerald-500'}`}>Defect Rate: {data.defect}%</p>
        <p className="text-xs text-muted mt-1">Sample Size: {data.size}</p>
      </div>
    );
  }
  return null;
};

export default function ManufacturingQualityPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Quality Assurance Center"
        description="Monitor defect rates, QA inspection logs, and production compliance."
        breadcrumbs={[{ label: "Manufacturing" }, { label: "Quality" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={organicInteractions.hover} className="liquid-glass rounded-3xl p-6 border border-foreground/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500"><FlaskConical className="w-5 h-5" /></div>
            <span className="text-sm font-semibold text-muted uppercase tracking-wider">Batches Tested</span>
          </div>
          <p className="text-3xl font-sans font-bold text-foreground">1,204</p>
          <p className="text-xs text-muted mt-2">Current Month (May 2026)</p>
        </motion.div>
        
        <motion.div whileHover={organicInteractions.hover} className="liquid-glass rounded-3xl p-6 border border-foreground/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500"><ShieldAlert className="w-5 h-5" /></div>
            <span className="text-sm font-semibold text-muted uppercase tracking-wider">Avg Defect Rate</span>
          </div>
          <p className="text-3xl font-sans font-bold text-rose-500">1.4%</p>
          <p className="text-xs text-rose-500 mt-2 flex items-center gap-1 font-bold">+0.2% vs target</p>
        </motion.div>

        <motion.div whileHover={organicInteractions.hover} className="liquid-glass rounded-3xl p-6 border border-foreground/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500"><CheckCircle2 className="w-5 h-5" /></div>
            <span className="text-sm font-semibold text-muted uppercase tracking-wider">First Pass Yield</span>
          </div>
          <p className="text-3xl font-sans font-bold text-emerald-500">98.6%</p>
          <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1 font-bold">Optimal Range</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <motion.div className="lg:col-span-2 liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-sans font-semibold text-foreground">Defect Distribution Analysis</h2>
              <p className="text-sm text-muted mt-1">Defect percentage across consecutive production batches</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-muted">
              <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div> Assembly Line 1</span>
              <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> Assembly Line 2</span>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                <XAxis type="number" dataKey="batch" name="Batch" domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
                <YAxis type="number" dataKey="defect" name="Defect Rate" unit="%" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
                <ZAxis type="number" dataKey="size" range={[50, 400]} />
                <Tooltip cursor={{ strokeDasharray: '3 3', stroke: 'rgba(150,150,150,0.2)' }} content={<CustomTooltip />} />
                <Scatter name="Line 1" data={QA_DATA_LINE1} fill="#818cf8" fillOpacity={0.7} />
                <Scatter name="Line 2" data={QA_DATA_LINE2} fill="#10b981" fillOpacity={0.7} />
                
                {/* Acceptable Threshold Line */}
                <Scatter data={[{ batch: 100, defect: 2.0 }, { batch: 107, defect: 2.0 }]} line={{ stroke: '#f43f5e', strokeWidth: 1, strokeDasharray: '5 5' }} fill="none" shape={() => null} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div className="liquid-glass rounded-3xl overflow-hidden border border-foreground/10 flex flex-col">
          <div className="p-6 border-b border-foreground/10 bg-foreground/5">
            <h2 className="text-lg font-sans font-semibold text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" /> Recent Inspections
            </h2>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            {RECENT_REPORTS.map((report) => (
              <div key={report.id} className="p-4 rounded-2xl bg-foreground/5 border border-foreground/5 hover:border-foreground/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-sm text-foreground">{report.item}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold border ${
                    report.status === 'Pass' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                    report.status === 'Reject' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                    'bg-amber-500/10 text-amber-500 border-amber-500/20'
                  }`}>
                    {report.status}
                  </span>
                </div>
                {report.reason && (
                  <p className="text-xs text-rose-500 mb-2 font-medium bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">{report.reason}</p>
                )}
                <div className="flex justify-between items-center text-xs text-muted">
                  <span className="font-mono">{report.id} • {report.inspector}</span>
                  <span>{report.time}</span>
                </div>
              </div>
            ))}
            <button className="w-full mt-2 py-3 rounded-xl border border-dashed border-foreground/20 text-muted hover:text-foreground text-xs font-semibold flex items-center justify-center gap-2 transition-colors">
              <Download className="w-4 h-4" /> View All Reports
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
