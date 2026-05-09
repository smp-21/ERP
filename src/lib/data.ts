export const generateModuleData = (module: string, feature?: string) => {
  const key = feature ? `${module}-${feature}` : module;

  const db: Record<string, any> = {
    // 1. MANUFACTURING MODULE
    "manufacturing-production": {
      title: "Production Tracking",
      description: "Real-time monitoring of shop floor operations, output, and shift reports.",
      kpis: [
        { label: "Daily Output", value: "14,250", change: "+5.2%" },
        { label: "Machine Utilization", value: "88.5%", change: "+1.1%" },
        { label: "Active Shifts", value: "3", change: "Optimal" },
      ],
      columns: [
        { key: "batch", header: "Batch No." },
        { key: "product", header: "Product" },
        { key: "quantity", header: "Qty", align: "right" as const },
        { key: "status", header: "Status" },
      ],
      data: [
        { batch: "B-2026-001", product: "Precision Gear X1", quantity: "1,200", status: "In Progress" },
        { batch: "B-2026-002", product: "Aluminum Cast Hub", quantity: "450", status: "Completed" },
        { batch: "B-2026-003", product: "Steel Shaft Assembly", quantity: "800", status: "Queued" },
      ]
    },
    "manufacturing-bom": {
      title: "Bill of Materials (BOM)",
      description: "Multi-level BOM costing and component tracking.",
      kpis: [
        { label: "Total Assemblies", value: "142", change: "+2" },
        { label: "Avg Component Cost", value: "₹ 4,520", change: "-1.5%" },
        { label: "Shortages", value: "0", change: "Stable" },
      ],
      columns: [
        { key: "assembly", header: "Assembly Part" },
        { key: "components", header: "Component Count" },
        { key: "cost", header: "Cost (₹)", align: "right" as const },
        { key: "version", header: "Version" },
      ],
      data: [
        { assembly: "Engine Block V8", components: "124", cost: "₹ 85,000", version: "v2.4" },
        { assembly: "Transmission Auto", components: "89", cost: "₹ 42,500", version: "v1.1" },
        { assembly: "Suspension Kit", components: "45", cost: "₹ 18,200", version: "v3.0" },
      ]
    },

    // 2. INVENTORY MODULE
    "inventory-warehouse": {
      title: "Warehouse Management",
      description: "Live tracking of SKUs across primary and secondary storage zones.",
      kpis: [
        { label: "Total SKUs", value: "8,452", change: "+124" },
        { label: "Warehouse Capacity", value: "82%", change: "+2%" },
        { label: "Pending Putaway", value: "45 Pallets", change: "-10" },
      ],
      columns: [
        { key: "sku", header: "SKU Code" },
        { key: "zone", header: "Zone / Shelf" },
        { key: "hsn", header: "HSN Code" },
        { key: "stock", header: "Stock", align: "right" as const },
      ],
      data: [
        { sku: "SKU-A109", zone: "Zone A / Rack 12", hsn: "8482", stock: "14,500" },
        { sku: "SKU-B220", zone: "Zone B / Rack 04", hsn: "3403", stock: "240" },
        { sku: "SKU-C305", zone: "Zone C / Bulk 01", hsn: "8544", stock: "85" },
      ]
    },

    // 5. FINANCE MODULE
    "finance-accounts": {
      title: "General Ledger",
      description: "Comprehensive financial tracking with GST and TDS compliance.",
      kpis: [
        { label: "Total Receivables", value: "₹ 4.2 Cr", change: "+12%" },
        { label: "Total Payables", value: "₹ 1.8 Cr", change: "-5%" },
        { label: "Cash Flow", value: "Positive", change: "Stable" },
      ],
      columns: [
        { key: "txnId", header: "Txn ID" },
        { key: "particulars", header: "Particulars" },
        { key: "gst", header: "GST (18%)", align: "right" as const },
        { key: "amount", header: "Amount (₹)", align: "right" as const },
      ],
      data: [
        { txnId: "TX-9901", particulars: "Vendor Payment - TechCorp", gst: "₹ 27,000", amount: "₹ 1,77,000" },
        { txnId: "TX-9902", particulars: "Client Receipt - Globex", gst: "₹ 81,000", amount: "₹ 5,31,000" },
        { txnId: "TX-9903", particulars: "Office Supplies", gst: "₹ 1,800", amount: "₹ 11,800" },
      ]
    },

    // 6. HR MODULE
    "hr-payroll": {
      title: "Payroll Management",
      description: "Employee compensation tracking per Indian Tax Slabs.",
      kpis: [
        { label: "Total Headcount", value: "452", change: "+12" },
        { label: "Monthly Payroll", value: "₹ 2.1 Cr", change: "+2%" },
        { label: "TDS Deducted", value: "₹ 42.5 L", change: "Compliant" },
      ],
      columns: [
        { key: "empId", header: "Emp ID" },
        { key: "name", header: "Employee Name" },
        { key: "base", header: "Base Pay (₹)", align: "right" as const },
        { key: "tax", header: "TDS (₹)", align: "right" as const },
      ],
      data: [
        { empId: "EMP-001", name: "Aarav Sharma", base: "₹ 1,20,000", tax: "₹ 12,000" },
        { empId: "EMP-002", name: "Priya Patel", base: "₹ 95,000", tax: "₹ 9,500" },
        { empId: "EMP-003", name: "Vikram Singh", base: "₹ 1,50,000", tax: "₹ 15,000" },
      ]
    },
    
    // UTILITY / GLOBAL MODULES (Single Level)
    "settings": {
      title: "Global Configuration",
      description: "Manage platform-wide settings, themes, and integrations.",
      kpis: [
        { label: "Active Integrations", value: "14", change: "Stable" },
        { label: "API Usage", value: "42%", change: "+5%" },
        { label: "System Version", value: "v2.1.0", change: "Up to date" },
      ],
      columns: [
        { key: "setting", header: "Configuration Parameter" },
        { key: "status", header: "Status" },
        { key: "lastUpdated", header: "Last Updated", align: "right" as const },
      ],
      data: [
        { setting: "GST API Integration", status: "Active", lastUpdated: "Today 10:00 AM" },
        { setting: "Automated Backups", status: "Enabled", lastUpdated: "Yesterday 11:59 PM" },
        { setting: "SSO Authentication", status: "Active", lastUpdated: "May 01, 2026" },
      ]
    }
  };

  if (db[key]) return db[key];

  // Generic fallback for any other valid route to prevent 404s
  const displayName = feature 
    ? `${module.charAt(0).toUpperCase() + module.slice(1)}: ${feature.charAt(0).toUpperCase() + feature.slice(1)}`
    : `${module.charAt(0).toUpperCase() + module.slice(1)} Module`;

  return {
    title: displayName,
    description: `Comprehensive management and tracking for ${displayName} operations.`,
    kpis: [
      { label: "Total Records", value: "1,204", change: "+14%" },
      { label: "Processing Status", value: "Optimal", change: "Stable" },
      { label: "Alerts", value: "0", change: "Clear" },
    ],
    columns: [
      { key: "id", header: "Reference ID" },
      { key: "details", header: "Details" },
      { key: "date", header: "Date" },
      { key: "value", header: "Value / Status", align: "right" as const },
    ],
    data: [
      { id: "REF-001", details: "Standard Entry Alpha", date: "May 09, 2026", value: "Active" },
      { id: "REF-002", details: "Standard Entry Beta", date: "May 08, 2026", value: "Pending" },
      { id: "REF-003", details: "Standard Entry Gamma", date: "May 07, 2026", value: "Resolved" },
    ]
  };
};
