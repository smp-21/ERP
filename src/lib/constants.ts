import {
  Factory,
  Network,
  Microscope,
  Wrench,
  Boxes,
  Truck,
  Plane,
  Settings2,
  ShoppingCart,
  Users,
  Calculator,
  Activity,
  Magnet,
  UserCircle,
  LifeBuoy,
  BookOpen,
  Receipt,
  PieChart,
  FileBadge,
  CalendarDays,
  ShieldCheck,
  LayoutDashboard,
  Files,
  SlidersHorizontal,
  Gavel,
  Brain,
  Warehouse,
  FileText,
  Radar,
  Target,
  AlertTriangle,
  UserMinus,
} from "lucide-react";

export const NAVIGATION_MODULES = [
  {
    title: "Utility & Global",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Document Management", href: "/documents", icon: Files },
      { name: "Settings & Configuration", href: "/settings", icon: SlidersHorizontal },
      { name: "Analytics", href: "/analytics", icon: PieChart },
      { name: "Notifications", href: "/notifications", icon: Activity },
      { name: "Help & Support", href: "/help", icon: LifeBuoy },
    ]
  },
  {
    title: "Manufacturing & Production",
    items: [
      { name: "Manufacturing", href: "/manufacturing/production", icon: Factory },
      { name: "Bill of Materials (BOM)", href: "/manufacturing/bom", icon: Network },
      { name: "Predictive Maintenance", href: "/manufacturing/maintenance", icon: Brain },
      { name: "Quality Control", href: "/manufacturing/quality", icon: Microscope },
      { name: "Asset & Plant", href: "/manufacturing/assets", icon: Wrench },
    ]
  },
  {
    title: "Inventory & Warehouse",
    items: [
      { name: "Inventory Management", href: "/inventory/stock", icon: Boxes },
      { name: "Warehouse Heatmap", href: "/inventory/warehouse", icon: Warehouse },
      { name: "Disruption Radar", href: "/inventory/dispatch", icon: Radar },
      { name: "Export & Logistics", href: "/inventory/export", icon: Plane },
      { name: "Spare Parts", href: "/inventory/spares", icon: Settings2 },
    ]
  },
  {
    title: "Purchase & Procurement",
    items: [
      { name: "Purchase Management", href: "/purchase/management", icon: ShoppingCart },
      { name: "Vendor Auctions", href: "/purchase/vendors", icon: Gavel },
      { name: "Contract Analyzer", href: "/purchase/contracts", icon: FileText },
      { name: "Quotation & Estimation", href: "/purchase/quotations", icon: Calculator },
    ]
  },
  {
    title: "Sales & Order Management",
    items: [
      { name: "Sales & Orders", href: "/sales/orders", icon: Activity },
      { name: "Revenue Pipeline", href: "/sales/crm", icon: Magnet },
      { name: "Client Sentiment", href: "/sales/customers", icon: UserCircle },
      { name: "After-Sales & Service", href: "/sales/service", icon: LifeBuoy },
    ]
  },
  {
    title: "Finance & Accounts",
    items: [
      { name: "Cash Flow Time-Machine", href: "/finance/accounts", icon: BookOpen },
      { name: "GST & Tax", href: "/finance/tax", icon: Receipt },
      { name: "Anomaly Detection", href: "/finance/reports", icon: AlertTriangle },
    ]
  },
  {
    title: "HR & Payroll",
    items: [
      { name: "Flight-Risk Predictor", href: "/hr/payroll", icon: UserMinus },
      { name: "Skill Matrix", href: "/hr/users", icon: Target },
      { name: "Attendance & Leave", href: "/hr/attendance", icon: CalendarDays },
      { name: "User & Roles", href: "/hr/roles", icon: ShieldCheck },
    ]
  },
  {
    title: "Government Tenders",
    items: [
      { name: "GeM Bid Scorer", href: "/tenders", icon: FileBadge },
    ]
  },
];
