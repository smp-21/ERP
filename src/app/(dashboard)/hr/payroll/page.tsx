"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { Users, IndianRupee, Send, CheckCircle2, ChevronRight, FileText, AlertCircle } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const PAYROLL_DATA = [
  { id: "EMP-001", name: "Rahul Desai", dept: "Manufacturing", role: "Plant Manager", basic: 120000, allowances: 40000, deductions: 18000, net: 142000, status: "Pending" },
  { id: "EMP-002", name: "Vikram Sharma", dept: "Manufacturing", role: "CNC Operator", basic: 45000, allowances: 12000, deductions: 5000, net: 52000, status: "Pending" },
  { id: "EMP-003", name: "Neha Patel", dept: "Finance", role: "Sr. Accountant", basic: 85000, allowances: 25000, deductions: 12000, net: 98000, status: "Disbursed" },
  { id: "EMP-004", name: "Amitabh P.", dept: "Sales", role: "Key Account Mgr", basic: 95000, allowances: 35000, deductions: 15000, net: 115000, status: "Disbursed" },
  { id: "EMP-005", name: "Pooja V.", dept: "Logistics", role: "Fleet Coord", basic: 40000, allowances: 10000, deductions: 4500, net: 45500, status: "Pending" },
];

export default function HrPayrollPage() {
  const [selectedEmp, setSelectedEmp] = useState<string | null>(null);
  const [isDisbursing, setIsDisbursing] = useState(false);

  const handleDisburse = () => {
    setIsDisbursing(true);
    setTimeout(() => {
      setIsDisbursing(false);
      // In a real app, update state here.
    }, 2000);
  };

  const totalPayroll = PAYROLL_DATA.reduce((acc, curr) => acc + curr.net, 0);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Payroll Processing"
        description="Employee salary computation, tax deductions, and bulk disbursement."
        breadcrumbs={[{ label: "HR & Payroll" }, { label: "Payroll" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
        <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex items-center justify-between">
          <div>
            <p className="text-muted text-sm uppercase tracking-wider mb-1">Total Payroll (May)</p>
            <p className="text-3xl font-sans font-bold text-foreground">₹ {(totalPayroll / 100000).toFixed(2)}L</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <IndianRupee className="w-6 h-6" />
          </div>
        </div>
        <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex items-center justify-between">
          <div>
            <p className="text-muted text-sm uppercase tracking-wider mb-1">Employees</p>
            <p className="text-3xl font-sans font-bold text-foreground">156</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-foreground/5 text-foreground flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
        <div className="liquid-glass rounded-3xl p-6 border border-indigo-500/30 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="font-bold text-foreground">Ready to Disburse</p>
              <p className="text-xs text-muted mt-1">3 batches pending approval</p>
            </div>
            <motion.button 
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              onClick={handleDisburse}
              disabled={isDisbursing}
              className="px-4 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 flex items-center gap-2 disabled:opacity-50"
            >
              {isDisbursing ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isDisbursing ? "Processing..." : "Disburse All"}
            </motion.button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        <motion.div layout className="flex-1 liquid-glass rounded-3xl overflow-hidden border border-foreground/10 flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-xs uppercase bg-foreground/5 text-muted sticky top-0 backdrop-blur-md z-10 border-b border-foreground/10">
                <tr>
                  <th className="px-6 py-4 font-semibold tracking-wider">Employee</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Department</th>
                  <th className="px-6 py-4 font-semibold tracking-wider text-right">Basic</th>
                  <th className="px-6 py-4 font-semibold tracking-wider text-right">Deductions</th>
                  <th className="px-6 py-4 font-semibold tracking-wider text-right">Net Salary</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5 text-foreground/80">
                {PAYROLL_DATA.map((row) => (
                  <motion.tr 
                    layoutId={`emp-${row.id}`}
                    key={row.id} 
                    onClick={() => setSelectedEmp(selectedEmp === row.id ? null : row.id)}
                    className={`cursor-pointer transition-colors ${selectedEmp === row.id ? 'bg-foreground/10' : 'hover:bg-foreground/5'}`}
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-foreground">{row.name}</p>
                      <p className="text-xs text-muted font-mono">{row.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-foreground">{row.dept}</p>
                      <p className="text-xs text-muted">{row.role}</p>
                    </td>
                    <td className="px-6 py-4 font-mono text-right text-muted">{row.basic.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 font-mono text-right text-rose-500">- {row.deductions.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 font-mono text-right font-bold text-foreground">{row.net.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <span className={`flex w-max items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${
                        row.status === 'Disbursed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}>
                        {row.status === 'Disbursed' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight className={`w-4 h-4 text-muted transition-transform ${selectedEmp === row.id ? 'rotate-90' : ''}`} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedEmp && (
            <motion.div
              initial={{ width: 0, opacity: 0, scale: 0.95 }}
              animate={{ width: 380, opacity: 1, scale: 1, transition: liquidSpringPhysics }}
              exit={{ width: 0, opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="liquid-glass rounded-3xl border border-foreground/10 overflow-hidden flex flex-col shrink-0"
            >
              <div className="p-6 border-b border-foreground/10 bg-foreground/5 w-[380px]">
                {PAYROLL_DATA.map(emp => emp.id === selectedEmp && (
                  <div key={emp.id}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-foreground/10 border-2 border-foreground/20 flex items-center justify-center text-xl font-bold text-foreground">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold font-sans text-foreground">{emp.name}</h2>
                        <p className="text-sm text-muted">{emp.role} • {emp.dept}</p>
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-foreground/20 text-sm font-semibold hover:bg-foreground/5 transition-colors">
                      <FileText className="w-4 h-4" /> Download Payslip
                    </button>
                  </div>
                ))}
              </div>
              
              {PAYROLL_DATA.map(emp => emp.id === selectedEmp && (
                <div key={emp.id} className="p-6 w-[380px] overflow-y-auto flex-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-4">Salary Breakdown</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted">Basic Salary</span>
                      <span className="font-mono text-foreground">₹{emp.basic.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted">Allowances (HRA, LTA)</span>
                      <span className="font-mono text-foreground">₹{emp.allowances.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="pt-3 mt-3 border-t border-foreground/10 space-y-3">
                      <div className="flex justify-between items-center text-rose-500">
                        <span>PF & Gratuity</span>
                        <span className="font-mono">- ₹{(emp.deductions * 0.6).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center text-rose-500">
                        <span>Income Tax (TDS)</span>
                        <span className="font-mono">- ₹{(emp.deductions * 0.4).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t-2 border-foreground/10 flex justify-between items-center">
                      <span className="font-bold text-foreground">Net Payable</span>
                      <span className="font-mono font-bold text-lg text-emerald-500">₹{emp.net.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
