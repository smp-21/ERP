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
- **Digital Twin Shop Floor**: 2D interactive factory map with real-time machine telemetry, zone-based layout, and conveyor animations.
- **Interactive BOM Exploder**: Visual node tree with live cost-impact simulation — swap components and watch ₹ ripple through assemblies.
- **Predictive Maintenance AI**: ML-powered degradation forecasting with health score rings, failure probability, and AI work order generation.
- **Quality Control**: Inspection, standards, and compliance tracking.
- **Asset & Plant**: Maintenance and plant asset lifecycle.

### 📦 Inventory & Warehouse
- **Inventory Management**: Real-time stock tracking and valuation.
- **Spatial Warehouse Heatmap**: Visual grid of warehouse shelves — fast-moving stock glows "hot" (Indigo), dead stock is "cold" (Slate).
- **Supply Chain Disruption Radar**: Multi-axis Recharts RadarChart alerting to transit delays with severity-based corridor tracking.
- **Export & Logistics**: International shipping and customs documentation.
- **Spare Parts**: Specialized inventory for maintenance and repairs.

### 🛒 Purchase & Procurement
- **Purchase Management**: Purchase Orders (PO) and requisitions.
- **Vendor Self-Service Auction**: Transparent reverse-auction portal with live bid ladders, L1 pulsing badges, and procurement savings calculators.
- **Smart Contract Risk Analyzer**: AI-powered document viewer highlighting risky compliance clauses (red/amber/green) with automated risk scoring.
- **Quotation & Estimation**: Costing and RFQ management.

### 🤝 Sales & Order Management
- **Sales & Orders**: Sales Order (SO) processing and tracking.
- **Drag-and-Drop Revenue Funnel**: Fluid Kanban pipeline — dragging a lead to "Closed Won" triggers a celebratory micro-animation and recalculates projected revenue.
- **Client Sentiment Radar**: Customer cards with AI-driven flight-risk warning gradients based on interaction sentiment analysis and revenue trajectory.
- **After-Sales & Service**: Support ticketing, warranties, and service operations.

### 💰 Finance & Accounts
- **Cash Flow Time-Machine**: Interactive timeline slider that dynamically recalculates and animates projected bank balances based on expected payables/receivables.
- **GST & Tax**: Compliance, tax rules, and automated calculations.
- **Automated Anomaly Detection**: AI flags duplicate invoices, GST mismatches, and amount variances with glowing severity badges before filing.

### 👥 HR & Payroll
- **Flight-Risk Predictor**: Risk meters correlating stagnant salary and erratic leave patterns to flag employees preparing to resign.
- **Gamified Skill Matrix**: Recharts RadarChart visualizing current skills vs promotion requirements with readiness rings and earned badges.
- **Attendance & Leave**: Time-tracking and leave management.
- **User & Roles**: Enterprise security, RBAC (Role-Based Access Control).

### 🏛️ Government & Tenders
- **GeM Bid Probability Scorer**: AI gauge chart analyzing past GeM tender data to display win percentage based on compliance, pricing history, and factor analysis.

---

## 🧠 Liquid Glass Intelligence Expansion

The platform has been enhanced with **16 advanced, AI-driven modules** that inject predictive intelligence, spatial visualization, and interactive simulation across every department.

### Phase 1 — Core Intelligence (5 Modules)
| Module | Route | Capability |
|--------|-------|------------|
| AI Command Agent | Global (Topbar) | Natural language search — "Show me delayed POs over ₹50K" returns AI summaries |
| 3D System Topology | `/dashboard` | Interactive node graph of infrastructure health with latency/CPU telemetry |
| Digital Twin Shop Floor | `/manufacturing/production` | 2D factory map with machine status pulsing and conveyor animations |
| Predictive Maintenance AI | `/manufacturing/maintenance` | Degradation forecast charts with failure threshold zones |
| Interactive BOM Exploder | `/manufacturing/bom` | Component swap simulator with cost-ripple across assemblies |

### Phase 2 — Full Intelligence Suite (11 Modules)
| Module | Route | Capability |
|--------|-------|------------|
| Spatial Warehouse Heatmap | `/inventory/warehouse` | Velocity-coded shelf grid (Hot/Warm/Cool/Cold) with value inspector |
| Supply Chain Disruption Radar | `/inventory/dispatch` | Multi-axis risk radar with severity-based corridor alerts |
| Vendor Self-Service Auction | `/purchase/vendors` | Reverse-auction bid ladder with L1 badges and savings calculator |
| Smart Contract Risk Analyzer | `/purchase/contracts` | AI clause scanner with risk-scored document viewer |
| Client Sentiment Radar | `/sales/customers` | Flight-risk detection with sentiment rings and revenue trajectories |
| Revenue Pipeline (Kanban) | `/sales/crm` | Drag-and-drop CRM with celebration animations on deal close |
| Cash Flow Time-Machine | `/finance/accounts` | Interactive slider projecting bank balances over 30-day windows |
| Automated Anomaly Detection | `/finance/reports` | Duplicate invoices, GST mismatches, and variance flagging |
| Gamified Skill Matrix | `/hr/users` | Radar chart of skills vs promotion requirements with gap analysis |
| Flight-Risk Predictor | `/hr/payroll` | Salary stagnation + leave anomaly correlation for attrition prediction |
| GeM Bid Probability Scorer | `/tenders` | AI win-probability gauge with compliance/pricing/track record breakdown |

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
