"use client";

import React from "react";
import { motion } from "framer-motion";
import { childItemVariants, glassPanelVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
}

interface LiquidDataGridProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowClick?: (item: T) => void;
}

export function LiquidDataGrid<T>({ data, columns, onRowClick }: LiquidDataGridProps<T>) {
  return (
    <motion.div
      variants={glassPanelVariants}
      initial="hidden"
      animate="visible"
      className="w-full liquid-glass rounded-3xl overflow-hidden"
    >
      <div className="w-full overflow-x-auto scrollbar-hide">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--glass-border)]">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    "py-4 px-6 micro-label",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                  )}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <motion.tr
                variants={childItemVariants}
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(row)}
                className={cn(
                  "border-b border-[var(--glass-border)]/50 last:border-0 glass-hover-row",
                  onRowClick ? "cursor-pointer" : ""
                )}
              >
                {columns.map((col) => (
                  <td
                    key={`${rowIndex}-${String(col.key)}`}
                    className={cn(
                      "py-4 px-6 text-sm font-sans text-foreground/80 whitespace-nowrap",
                      col.align === "right" && "text-right tabular-nums font-mono",
                      col.align === "center" && "text-center",
                    )}
                  >
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="py-16 flex flex-col items-center justify-center text-muted">
          <div className="w-12 h-12 rounded-2xl bg-foreground/[0.04] flex items-center justify-center mb-4">
            <svg className="w-6 h-6 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
          </div>
          <p className="text-sm font-medium">No data available</p>
        </div>
      )}
    </motion.div>
  );
}
