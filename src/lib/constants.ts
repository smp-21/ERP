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
  SlidersHorizontal
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
      { name: "Quality Control", href: "/manufacturing/quality", icon: Microscope },
      { name: "Asset & Plant", href: "/manufacturing/assets", icon: Wrench },
    ]
  },
  {
    title: "Inventory & Warehouse",
    items: [
      { name: "Inventory Management", href: "/inventory/stock", icon: Boxes },
      { name: "Dispatch & Delivery", href: "/inventory/dispatch", icon: Truck },
      { name: "Export & Logistics", href: "/inventory/export", icon: Plane },
      { name: "Spare Parts", href: "/inventory/spares", icon: Settings2 },
    ]
  },
  {
    title: "Purchase & Procurement",
    items: [
      { name: "Purchase Management", href: "/purchase/management", icon: ShoppingCart },
      { name: "Vendor Management", href: "/purchase/vendors", icon: Users },
      { name: "Quotation & Estimation", href: "/purchase/quotations", icon: Calculator },
    ]
  },
  {
    title: "Sales & Order Management",
    items: [
      { name: "Sales & Orders", href: "/sales/orders", icon: Activity },
      { name: "CRM & Leads", href: "/sales/crm", icon: Magnet },
      { name: "Customer Management", href: "/sales/customers", icon: UserCircle },
      { name: "After-Sales & Service", href: "/sales/service", icon: LifeBuoy },
    ]
  },
  {
    title: "Finance & Accounts",
    items: [
      { name: "Accounts & Finance", href: "/finance/accounts", icon: BookOpen },
      { name: "GST & Tax", href: "/finance/tax", icon: Receipt },
      { name: "Reports & MIS", href: "/finance/reports", icon: PieChart },
    ]
  },
  {
    title: "HR & Payroll",
    items: [
      { name: "HR & Payroll", href: "/hr/payroll", icon: FileBadge },
      { name: "Attendance & Leave", href: "/hr/attendance", icon: CalendarDays },
      { name: "User & Roles", href: "/hr/roles", icon: ShieldCheck },
    ]
  }
];
