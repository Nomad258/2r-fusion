# 2R Fusion - Restaurant Management Platform

A production-ready, integrated restaurant management system designed for premium dining establishments. Built for **2R Fusion** (Tangier, Morocco) with full support for menu management, reservations, inventory, suppliers, forecasting, CRM, and integrated kitchen operations.

## Overview

2R Fusion is a unified digital ecosystem that replaces fragmented systems with a single source of truth. Update your menu once, and it automatically propagates across your website, tablet ordering system, kitchen displays, and inventory management. Real-time visibility into reservations, customer relationships, finances, and operations.

**Key Features:**
- Interactive digital menu system (tablet + web)
- Advanced reservations and table management
- Comprehensive inventory & supplier management
- Integrated CRM with customer profiling
- Real-time financial dashboard
- Demand forecasting engine
- Anomaly detection for operational insights
- Kitchen ticketing system
- Payment processing integration
- VIP client management with secret menus

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Next.js 14 (App Router), TypeScript, React 18 |
| **Styling** | Tailwind CSS, shadcn/ui components |
| **Backend** | Next.js API routes, Node.js |
| **Database** | SQLite (development), PostgreSQL (production) |
| **ORM** | Prisma |
| **Authentication** | NextAuth.js with bcryptjs |
| **Charts & Analytics** | Recharts |
| **Package Manager** | npm |

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- PostgreSQL (production) or SQLite (development)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd 2r-fusion

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database and API keys
```

### Setup & Database

```bash
# Generate Prisma client
npx prisma generate

# Create and seed the database
npm run db:seed

# For production, run migrations
npx prisma migrate deploy
```

### Development

```bash
# Start the development server
npm run dev

# Server runs on http://localhost:3000
```

### Demo Credentials

**Admin Account:**
- Email: `admin@2rfusion.ma`
- Password: `admin123`

**Manager Account:**
- Email: `manager@2rfusion.ma`
- Password: `manager123`

## Project Structure

```
2r-fusion/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API routes
│   │   │   ├── auth/             # Authentication endpoints
│   │   │   ├── menu/             # Menu management
│   │   │   ├── recipes/          # Recipe data
│   │   │   ├── ingredients/      # Ingredient management
│   │   │   ├── inventory/        # Inventory tracking
│   │   │   ├── suppliers/        # Supplier management
│   │   │   ├── reservations/     # Reservation system
│   │   │   ├── crm/              # Customer relationship
│   │   │   ├── forecasting/      # Demand forecasting
│   │   │   ├── anomalies/        # Anomaly detection
│   │   │   ├── alerts/           # Alert system
│   │   │   ├── payments/         # Payment processing
│   │   │   └── kitchen/          # Kitchen operations
│   │   ├── (dashboard)/          # Dashboard layout
│   │   │   ├── page.tsx          # Main dashboard
│   │   │   ├── menu/             # Menu management UI
│   │   │   ├── reservations/     # Reservations UI
│   │   │   ├── inventory/        # Inventory UI
│   │   │   ├── suppliers/        # Suppliers UI
│   │   │   ├── crm/              # CRM UI
│   │   │   ├── forecasts/        # Forecasts UI
│   │   │   └── alerts/           # Alerts UI
│   │   ├── auth/                 # Auth pages
│   │   └── layout.tsx            # Root layout
│   ├── components/               # Reusable React components
│   ├── lib/                      # Utilities and helpers
│   │   ├── auth.ts               # Authentication utilities
│   │   └── utils.ts              # General utilities
│   └── types/                    # TypeScript type definitions
├── prisma/                       # Database schema
│   ├── schema.prisma             # Prisma schema
│   └── seed.ts                   # Seed data script
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── package.json                  # Dependencies and scripts
```

## Features

### 1. Digital Menu & Ordering
- Interactive tablet menu with high-resolution images
- Customizable dish descriptions, pricing, allergens
- Categories and subcategories
- Real-time price updates across all platforms
- Integration with kitchen display system

### 2. Reservations & Table Management
- Online booking system
- Table capacity planning
- Guest profiles and history
- Automatic reminders
- Walk-in management

### 3. Inventory Management
- Real-time stock tracking
- Low-stock alerts
- Supplier integration
- Batch tracking and expiry management
- Usage forecasting

### 4. Supplier Management
- Supplier database with contact info
- Order history and pricing
- Delivery schedules
- Quality ratings and performance tracking

### 5. Customer Relationship Management
- Guest profiles with visit history
- Spending analytics
- Preference tracking
- VIP tier management
- Secret menu access for premium clients

### 6. Financial Dashboard
- Real-time revenue tracking
- Invoice management (pending, paid, overdue)
- Expense tracking by category
- Profit margin analysis
- Daily/monthly/yearly reporting

### 7. Demand Forecasting
- AI-powered demand prediction
- Seasonal trend analysis
- Special event planning
- Recipe-level forecasting
- Ingredient requirement projections

### 8. Anomaly Detection
- Unexpected spending patterns
- Unusual ingredient usage
- Price anomalies from suppliers
- Operational inefficiencies
- Real-time alerts

### 9. Kitchen Operations
- Ticket management system
- Ingredient allocation per recipe
- Order workflow tracking
- Staff coordination

### 10. Unified Ecosystem
- Single source of truth for all data
- Automatic synchronization
- Cross-module consistency
- No duplicate data entry

## Environment Variables

See `ENVIRONMENT.md` for complete setup instructions.

Key variables:
```
DATABASE_URL=postgresql://user:password@localhost:5432/2r_fusion
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Documentation

- **ARCHITECTURE.md** - Technical architecture, data flow, and system design
- **ASSUMPTIONS.md** - All design assumptions and limitations
- **DEMO_GUIDE.md** - Step-by-step demonstration walkthrough
- **ROADMAP.md** - Phase 2-6 plans and future development
- **ENVIRONMENT.md** - Environment configuration and setup
- **CHANGELOG.md** - Version history and release notes

## License

Copyright © 2026 2R Fusion. All rights reserved.

---

**Built for:** 2R Fusion, Tangier, Morocco  
**Version:** 1.0.0  
**Last Updated:** March 27, 2026
