# Liquid Glass ERP Frontend

A high-fidelity, enterprise-grade ERP frontend system characterized by a bespoke "Liquid Glass" design language. This project features a highly modular architecture designed to support over 30 high-density business modules, complete with a master shell, command palette, sidebar navigation, and fluid physics-based animations.

## ✨ Core Features & Functionalities

- **"Liquid Glass" Design System**: A bespoke, state-of-the-art visual language featuring deep glass-morphic effects, refractive borders, and ambient background glows using modern Tailwind CSS.
- **Framer Motion Physics**: Smooth, physics-based micro-animations (spring physics) and organic interactions across the entire platform, making the UI feel alive and highly responsive.
- **Command Center Dashboard**: A real-time, unified dashboard displaying critical metrics in a bento-box style layout, recent transactions via the `LiquidDataGrid`, and live system health monitoring.
- **Advanced Navigation Shell**: A dynamic, collapsible sidebar and an interactive topbar with a command-palette style search, engineered for power users in an MNC-grade enterprise environment.
- **Highly Modular Architecture**: Dynamically handles 30+ complex business routes seamlessly via Next.js App Router, scaling perfectly without performance degradation.
- **Responsive Layout**: Designed to adapt across different screen sizes while maintaining the premium "glass" aesthetic.

## 📦 ERP Modules

The platform is divided into comprehensive enterprise departments, housing a total of 25+ specialized business modules:

### 🌐 Utility & Global
- **Dashboard**: Central Command Center and operational overview.
- **Document Management**: Secure file and document handling.
- **Settings & Configuration**: System-wide preferences and global settings.
- **Analytics**: High-level visual reporting and intelligence.
- **Notifications**: Real-time system and operational alerts.
- **Help & Support**: User guides and system assistance.

### 🏭 Manufacturing & Production
- **Manufacturing**: Core production floor operations.
- **Bill of Materials (BOM)**: Recipe and component management.
- **Quality Control**: Inspection, standards, and compliance tracking.
- **Asset & Plant**: Maintenance and plant asset lifecycle.

### 📦 Inventory & Warehouse
- **Inventory Management**: Real-time stock tracking and valuation.
- **Dispatch & Delivery**: Outbound logistics and shipping.
- **Export & Logistics**: International shipping and customs documentation.
- **Spare Parts**: Specialized inventory for maintenance and repairs.

### 🛒 Purchase & Procurement
- **Purchase Management**: Purchase Orders (PO) and requisitions.
- **Vendor Management**: Supplier profiles, ratings, and ledgers.
- **Quotation & Estimation**: Costing and RFQ management.

### 🤝 Sales & Order Management
- **Sales & Orders**: Sales Order (SO) processing and tracking.
- **CRM & Leads**: Pipeline, prospect tracking, and conversions.
- **Customer Management**: Client 360-view and master data.
- **After-Sales & Service**: Support ticketing, warranties, and service operations.

### 💰 Finance & Accounts
- **Accounts & Finance**: Core ledger, payables, and receivables.
- **GST & Tax**: Compliance, tax rules, and automated calculations.
- **Reports & MIS**: Management Information Systems and financial reporting.

### 👥 HR & Payroll
- **HR & Payroll**: Employee compensation and benefits.
- **Attendance & Leave**: Time-tracking and leave management.
- **User & Roles**: Enterprise security, RBAC (Role-Based Access Control).

### 🏛️ Government & Tenders
- **GeM Tenders**: Discover government electronic marketplace tenders matched to your niche, apply, and track application status.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 💻 Getting Started Locally

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
