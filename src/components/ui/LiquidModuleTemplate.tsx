"use client";

import React from "react";
import { GlassPageHeader } from "./GlassPageHeader";
import { LiquidDataGrid, ColumnDef } from "./LiquidDataGrid";

interface LiquidModuleTemplateProps {
  moduleName: string;
  featureName: string;
  data: any;
}

export function LiquidModuleTemplate({ moduleName, featureName, data }: LiquidModuleTemplateProps) {
  const { title, description, columns, data: gridData } = data;

  return (
    <div className="flex flex-col h-full">
      <GlassPageHeader
        title={title}
        description={description}
        breadcrumbs={[
          { label: moduleName.replace("-", " ") },
          { label: featureName.replace("-", " ") }
        ]}
      />
      
      <div className="mt-4">
        <LiquidDataGrid
          data={gridData}
          columns={columns}
          onRowClick={(row) => console.log("Clicked row:", row)}
        />
      </div>
    </div>
  );
}
