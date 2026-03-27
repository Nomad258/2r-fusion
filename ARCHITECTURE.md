# 2R Fusion - Technical Architecture

## System Overview

2R Fusion is a full-stack restaurant management platform with 17 integrated modules, 30+ database models, and a unified ecosystem design. All systems connect to a single source of truth: the database. Updates to any module automatically propagate across the entire platform.

```
┌─────────────────────────────────────────────────────────────┐
│                   2R FUSION PLATFORM                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  PRESENTATION LAYER (Next.js Frontend)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Admin Dashboard │ Menu │ Reservations │ CRM │ Reports │  │
│  │ Inventory │ Suppliers │ Kitchen │ Forecasts │ Alerts │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│  API LAYER (Next.js API Routes)                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ /api/auth  /api/menu  /api/reservations /api/crm    │  │
│  │ /api/inventory  /api/suppliers  /api/kitchen        │  │
│  │ /api/forecasting  /api/anomalies  /api/payments    │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│  BUSINESS LOGIC LAYER                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Intelligence Engines:                                │  │
│  │ • Demand Forecasting    • Anomaly Detection         │  │
│  │ • Spoilage Prevention   • Price Optimization         │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ Integration Managers:                                │  │
│  │ • Payment Processing    • SMS/Email Service          │  │
│  │ • Barcode Scanning      • Cloud Storage              │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│  DATA LAYER (Prisma ORM)                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ PostgreSQL (Production) │ SQLite (Development)       │  │
│  │ 30+ Models • Relationships • Constraints             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow: Single Source of Truth

### Menu Flow
```
Admin Updates Menu
       ↓
Database (MENU table)
       ├→ API Returns Current Menu
       ├→ Website Displays Menu
       ├→ Tablet Shows Menu
       ├→ Kitchen Gets Recipe Details
       └→ Inventory Tracks Ingredients
```

### Recipe & Ingredient Flow
```
Recipe Definition
       ↓
RECIPES + RECIPE_INGREDIENTS tables
       ├→ Kitchen Uses Recipe (Forecasting)
       ├→ Inventory Allocates Ingredients
       ├→ Suppliers Replenish Stock
       └→ Forecasting Predicts Demand
```

### Inventory Flow
```
Ingredient Received
       ↓
INVENTORY table Updated
       ├→ Low-Stock Alert if qty < threshold
       ├→ Supplier Notified Automatically
       ├→ Forecasting Updates Predictions
       └→ Kitchen Allocation Updated
```

### Customer & Reservation Flow
```
Customer Makes Reservation
       ↓
RESERVATIONS + GUESTS tables
       ├→ CRM Updates Customer Profile
       ├→ Financial Records Transaction
       ├→ Forecasting Anticipates Menu Needs
       └→ Kitchen Prepares Staffing
```

## 17 Core Modules

| # | Module | Purpose | Key Models |
|---|--------|---------|-----------|
| 1 | **Authentication** | User login, session management, RBAC | User, Role, Permission |
| 2 | **Menu Management** | Menu items, categories, pricing | Menu, MenuItem, Category |
| 3 | **Recipe System** | Recipes, ingredients, cooking instructions | Recipe, RecipeIngredient, Instruction |
| 4 | **Inventory Tracking** | Stock levels, low-stock alerts, batches | Inventory, InventoryBatch, InventoryAlert |
| 5 | **Supplier Management** | Supplier database, orders, pricing | Supplier, SupplierOrder, SupplierPrice |
| 6 | **Reservations** | Booking system, table management | Reservation, Table, DiningSession |
| 7 | **Customer CRM** | Guest profiles, visit history, preferences | Guest, GuestProfile, GuestPreference |
| 8 | **VIP Program** | VIP tiers, secret menus, benefits | VIPTier, VIPBenefit, SecretMenu |
| 9 | **Kitchen Operations** | Ticket system, order workflow | KitchenTicket, TicketItem, TicketLog |
| 10 | **Forecasting Engine** | Demand prediction, seasonal analysis | Forecast, ForecastItem, TrendAnalysis |
| 11 | **Anomaly Detection** | Unusual patterns, cost anomalies | Anomaly, AnomalyAlert, AnomalyMetric |
| 12 | **Financial Tracking** | Revenue, expenses, invoicing | Transaction, Invoice, Expense |
| 13 | **Reporting** | Analytics, dashboards, KPIs | Report, ReportMetric, DailyMetric |
| 14 | **Payment Processing** | Payment gateway integration | Payment, PaymentMethod, PaymentLog |
| 15 | **Alert System** | Real-time notifications | Alert, AlertSubscription, AlertLog |
| 16 | **Audit Logging** | Change tracking, compliance | AuditLog, AuditChange |
| 17 | **Multi-Venue** | Support for RR ICE + 2R Fusion | Venue, VenueConfig, VenueMetric |

## Database Schema Overview

### Core Entity Models

**VENUES**
```
Venue {
  id, name, location, capacity, 
  currency, timezone, config
}
```

**USERS & AUTH**
```
User {
  id, email, password, name, 
  venue_id, role, active, created_at
}

Role {
  id, name, permissions[]
}
```

**MENU & RECIPES**
```
Menu {
  id, venue_id, name, description, 
  active, created_at, updated_at
}

MenuItem {
  id, menu_id, category_id, name, 
  description, price, allergens, image_url
}

Recipe {
  id, menu_item_id, instructions, 
  prep_time, cooking_time, portion_size
}

RecipeIngredient {
  id, recipe_id, ingredient_id, 
  quantity, unit, substitutes[]
}

Ingredient {
  id, name, unit, supplier_id, 
  price, lead_time
}
```

**INVENTORY**
```
Inventory {
  id, ingredient_id, venue_id, 
  quantity, unit, last_updated
}

InventoryBatch {
  id, inventory_id, batch_number, 
  expiry_date, quantity, created_at
}

InventoryAlert {
  id, inventory_id, type, 
  threshold, created_at
}
```

**SUPPLIERS**
```
Supplier {
  id, venue_id, name, contact, 
  email, phone, address, rating
}

SupplierOrder {
  id, supplier_id, order_date, 
  delivery_date, status, total_cost
}

SupplierPrice {
  id, supplier_id, ingredient_id, 
  price, unit, effective_from
}
```

**RESERVATIONS & GUESTS**
```
Reservation {
  id, venue_id, guest_id, 
  reservation_date, time, party_size, 
  table_id, status
}

Table {
  id, venue_id, number, capacity, 
  position_x, position_y, type
}

Guest {
  id, venue_id, first_name, 
  last_name, email, phone, 
  preferred_venue, vip_tier
}

GuestProfile {
  id, guest_id, visit_count, 
  total_spent, last_visit, 
  preferences, dietary_restrictions
}
```

**VIP PROGRAM**
```
VIPTier {
  id, name, min_spending, 
  benefits[], access_level
}

SecretMenu {
  id, venue_id, vip_tier_id, 
  items[], available_from, available_to
}
```

**KITCHEN OPERATIONS**
```
KitchenTicket {
  id, reservation_id, created_at, 
  started_at, completed_at, status
}

TicketItem {
  id, ticket_id, menu_item_id, 
  quantity, special_instructions, status
}

TicketLog {
  id, ticket_id, event, timestamp, 
  user_id
}
```

**FINANCIAL**
```
Transaction {
  id, venue_id, type, amount, 
  reference, created_at, paid_at
}

Invoice {
  id, reservation_id, total, 
  tax, service_charge, status, 
  due_date, paid_date
}

Expense {
  id, venue_id, category, 
  amount, description, date
}
```

**FORECASTING & ANOMALIES**
```
Forecast {
  id, venue_id, period, 
  created_at, items[]
}

ForecastItem {
  id, forecast_id, menu_item_id, 
  predicted_demand, confidence
}

Anomaly {
  id, venue_id, type, 
  severity, description, detected_at
}
```

**ALERTS & AUDIT**
```
Alert {
  id, venue_id, type, 
  message, severity, resolved_at
}

AuditLog {
  id, user_id, entity_type, 
  entity_id, action, changes, timestamp
}
```

## API Route Structure

```
/api/
├── auth/
│   ├── login          [POST]
│   ├── logout         [POST]
│   ├── register       [POST]
│   └── profile        [GET, PUT]
│
├── menu/
│   ├── [GET, POST]
│   ├── [id]           [GET, PUT, DELETE]
│   └── items/         [GET, POST]
│
├── recipes/
│   ├── [GET, POST]
│   ├── [id]           [GET, PUT, DELETE]
│   └── ingredients/   [POST]
│
├── ingredients/
│   ├── [GET, POST]
│   └── [id]           [GET, PUT, DELETE]
│
├── inventory/
│   ├── [GET]
│   ├── [id]           [GET, PUT]
│   ├── alerts/        [GET]
│   └── batch/         [POST]
│
├── suppliers/
│   ├── [GET, POST]
│   ├── [id]           [GET, PUT, DELETE]
│   └── orders/        [GET, POST]
│
├── reservations/
│   ├── [GET, POST]
│   ├── [id]           [GET, PUT, DELETE]
│   └── availability/  [POST]
│
├── crm/
│   ├── guests/        [GET, POST]
│   ├── profiles/      [GET, PUT]
│   └── preferences/   [POST]
│
├── kitchen/
│   ├── tickets/       [GET, POST]
│   ├── [id]           [GET, PUT]
│   └── logs/          [GET]
│
├── forecasting/
│   ├── demand/        [GET]
│   ├── seasonal/      [GET]
│   └── ingredients/   [GET]
│
├── anomalies/
│   ├── [GET]
│   ├── [id]           [GET, PUT]
│   └── alerts/        [GET]
│
├── payments/
│   ├── process/       [POST]
│   ├── verify/        [POST]
│   └── refund/        [POST]
│
├── alerts/
│   ├── [GET, POST]
│   └── [id]           [GET, PUT, DELETE]
│
└── reports/
    ├── revenue/       [GET]
    ├── expenses/      [GET]
    ├── inventory/     [GET]
    └── analytics/     [GET]
```

## Authentication & RBAC

### Roles & Permissions

**Admin**
- Full system access
- User management
- Venue configuration
- Financial reports
- All operations

**Manager**
- Menu management
- Reservation oversight
- Inventory management
- Supplier orders
- CRM access
- Kitchen coordination
- Financial dashboard

**Chef / Kitchen Staff**
- Kitchen tickets only
- Recipe viewing
- Inventory for cooking
- No financial access
- No CRM access

**Host/Hostess**
- Reservations management
- Guest lookup
- Table management
- Basic CRM

**Server/Wait Staff**
- Guest profiles
- Order tracking
- Reservation lookup
- No admin access

**Read-Only**
- Dashboard viewing
- Report access
- No modifications

### Authentication Flow

```
1. User submits login form (email + password)
2. API validates credentials against User table
3. Password verified using bcryptjs
4. JWT token generated with user ID + role
5. Token stored in secure HTTP-only cookie
6. Frontend uses token for authenticated API calls
7. Server validates token on each request
8. Permissions checked against Role table
9. Request allowed/denied based on RBAC
```

## Intelligence Engines

### 1. Demand Forecasting
- Analyzes historical reservation and sales data
- Identifies seasonal patterns and trends
- Predicts ingredient needs 7-30 days ahead
- Confidence scoring for predictions
- Helps reduce waste and optimize ordering

### 2. Anomaly Detection
- Compares current metrics to historical baselines
- Flags unusual spending patterns
- Detects ingredient usage anomalies
- Identifies supplier price outliers
- Real-time alerts to management

### 3. Spoilage Prevention
- Tracks ingredient expiry dates
- Alerts before items expire
- Suggests recipes using expiring items
- Calculates potential waste costs
- Recommends preventive actions

### 4. Price Optimization
- Analyzes supplier pricing trends
- Recommends bulk ordering windows
- Flags price spikes
- Suggests supplier switching
- Cost reduction recommendations

## Integration Points

### Payments
- CMI Morocco gateway (primary)
- Stripe (fallback)
- Local payment methods support
- PCI compliance

### SMS & Email
- Placeholder integration ready
- Reservation confirmations
- Low-stock alerts
- Payment receipts
- VIP notifications

### Barcode Scanning
- Architecture ready for hardware integration
- Inventory receipt via barcode
- Supplier tracking
- Batch management
- Position in kitchen workflow

### Cloud Storage
- Image uploads for menu items
- Recipe attachments
- Kitchen documentation
- Supplier documentation
- AWS S3 integration ready

## Multi-Venue Architecture

### Single Venue (Current - 2R Fusion)
```
Venue {name: "2R Fusion"}
├── Menu
├── Reservations
├── Guests
├── Inventory
└── Financials
```

### Multi-Venue (Future - RR ICE + 2R Fusion)
```
Organization
├── Venue 1: RR ICE Cafe
│   ├── Menu
│   ├── Reservations
│   └── Inventory
└── Venue 2: 2R Fusion
    ├── Menu
    ├── Reservations
    └── Inventory

Shared:
├── Supplier Network
├── Admin Users
└── Master Reports
```

## Performance & Scalability

### Caching Strategy
- Menu cache (24 hours)
- Recipe cache (weekly)
- Ingredient prices (daily)
- Forecasts (computed nightly)

### Database Optimization
- Indexed queries on frequently accessed fields
- Pagination for large result sets
- Separate read replicas ready
- Connection pooling via Prisma

### API Optimization
- Response compression
- JSON filtering (select only needed fields)
- Rate limiting per user/IP
- Batch operations support

## Security Measures

- HTTPS only (production)
- Password hashing (bcryptjs)
- SQL injection prevention (Prisma)
- CSRF tokens
- Rate limiting
- Input validation
- Audit logging
- Role-based access control
- Secure session management

---

**Architecture Version:** 1.0.0  
**Last Updated:** March 27, 2026
