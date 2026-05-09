"use client";

import React from "react";
import { motion } from "framer-motion";
import { childItemVariants, glassPanelVariants, organicInteractions } from "@/lib/motion";
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
            <tr className="border-b border-white/10 bg-white/5">
              {columns.map((col, idx) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    "py-4 px-6 text-xs font-medium text-foreground/40 uppercase tracking-wider",
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
                  "border-b border-white/5 last:border-0 transition-colors duration-300",
                  onRowClick ? "cursor-pointer hover:bg-white/10" : ""
                )}
                whileHover={onRowClick ? { backgroundColor: "rgba(255,255,255,0.1)" } : undefined}
                whileTap={onRowClick ? { scale: 0.995 } : undefined}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={`${rowIndex}-${String(col.key)}`}
                    className={cn(
                      "py-4 px-6 text-sm font-mono text-foreground/80 whitespace-nowrap",
                      col.align === "right" && "text-right",
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
        <div className="py-12 flex flex-col items-center justify-center text-foreground/40">
          <p className="font-mono text-sm">No data available</p>
        </div>
      )}
    </motion.div>
  );
}
