# 2R Fusion - Demo Guide

This guide walks you through a comprehensive demonstration of the 2R Fusion platform for stakeholders and clients.

## Pre-Demo Setup

### 1. Start the System

```bash
# Navigate to project directory
cd /path/to/2r-fusion

# Install dependencies (if first time)
npm install

# Seed the database with demo data
npm run db:seed

# Start the development server
npm run dev
```

Server will be available at: **http://localhost:3000**

### 2. Login Credentials

**Admin Account (Full Access):**
- Email: `admin@2rfusion.ma`
- Password: `admin123`

**Manager Account (Limited Access):**
- Email: `manager@2rfusion.ma`
- Password: `manager123`

### 3. Demo Duration
- Quick overview: 15-20 minutes
- Detailed walkthrough: 45-60 minutes
- Hands-on training: 2+ hours

---

## Demo Flow

### Phase 1: Dashboard & Overview (5 minutes)

**Entry Point:** http://localhost:3000

#### Step 1: Login
1. Click "Login" button
2. Enter admin@2rfusion.ma / admin123
3. Show the clean, intuitive dashboard

#### Key Talking Points:
- "Everything is in one place - no jumping between systems"
- "Real-time visibility into your entire operation"
- "Controls designed for restaurant owners, not tech experts"

#### What They'll See:
- Today's revenue
- Tonight's reservations
- Low-stock alerts
- Kitchen ticket count
- Upcoming special events
- Key metrics at a glance

#### Questions to Anticipate:
- **"Can I customize the dashboard?"** Yes, we can add widgets for your priority metrics
- **"What if I just want to see revenue?"** You can set up role-based dashboards
- **"Is this in French?"** Yes, entirely in French

---

### Phase 2: Menu Management (10 minutes)

**Navigate To:** Dashboard → Menu (left sidebar)

#### Step 1: View Current Menu
1. Click "Menu Management"
2. Show the current menu with 3 sections: Appetizers, Mains, Desserts
3. Expand each category

#### Step 2: Edit a Dish
1. Click on "Pan-Seared Branzino" (example dish)
2. Show the details:
   - Name, description
   - Price (750 MAD)
   - Image
   - Allergens (shellfish)
   - Category
3. Click "Edit"
4. Change price to 800 MAD
5. Add a note: "New seasonal pricing"
6. Click "Save"

#### Step 3: Show Instant Propagation
- Show how the price update is immediate
- Explain: "When you update the menu here, it updates everywhere - website, tablets, kitchen"

#### Key Talking Points:
- "One single source of truth"
- "No more duplicate menu updates"
- "Prices change instantly across all platforms"
- "High-resolution images for presentation"

#### Demo Features to Highlight:
- Upload new dish images
- Manage allergen information
- Set seasonal pricing
- Create special menus (secret menu for VIPs)
- Bulk price updates

#### Questions to Anticipate:
- **"Can we have different menus for different times?"** Yes, lunch vs dinner menus
- **"How do we manage dietary restrictions?"** Via the allergens and preferences system
- **"Can the server see this on a tablet?"** Yes, tablet menu shows live updates

---

### Phase 3: Reservations & Table Management (8 minutes)

**Navigate To:** Dashboard → Reservations

#### Step 1: View Today's Reservations
1. Show calendar view with 6 reservations today
2. Point out:
   - Table assignment
   - Party size
   - Special requests
   - VIP status
   - Payment method

#### Step 2: Make a New Reservation
1. Click "New Reservation"
2. Fill in details:
   - Guest name: "Ahmed Hassan"
   - Date: Tomorrow
   - Time: 20:00 (8 PM)
   - Party size: 4
   - Table: Table 5 (suggested)
   - Special requests: "Window seat preferred, celebrating birthday"
3. Click "Save"
4. Show confirmation email (mocked)

#### Step 3: Table Management
1. Show table floor plan
2. Drag and drop guest to different table
3. Show color coding (occupied, reserved, available)

#### Key Talking Points:
- "See all your reservations at a glance"
- "Automatic table suggestions based on party size"
- "Special requests captured for kitchen and staff"
- "VIP guests highlighted for special treatment"
- "No more double bookings"

#### Demo Features to Highlight:
- Table floor plan with capacity
- Walk-in guest management
- Automatic reminders to guests
- Table turnover tracking
- Revenue per table

#### Questions to Anticipate:
- **"Can we send SMS reminders?"** Yes, integrated with Twilio (live in Phase 2)
- **"How do we handle walk-ins?"** Quick "walk-in" booking workflow
- **"Can servers see this?"** Yes, with read-only access

---

### Phase 4: CRM & Customer Profiles (7 minutes)

**Navigate To:** Dashboard → CRM → Guests

#### Step 1: View Guest Database
1. Show list of 50+ registered guests
2. Show search functionality
3. Search for "Hassan" (the guest from previous demo)

#### Step 2: Open Guest Profile
1. Click on Ahmed Hassan's profile
2. Show:
   - Visit history (3 previous visits)
   - Total spending: 8,500 MAD
   - Preferences: "No shellfish, loves wine pairings"
   - Dining history with dates
   - VIP status: "Silver" tier
   - Special notes: "Birthday celebrant"

#### Step 3: Update Preferences
1. Click "Edit Preferences"
2. Add: "Lactose intolerant"
3. Save changes
4. Show how this information is available to kitchen and server

#### Step 4: VIP Management
1. Show VIP tier system (Bronze, Silver, Gold, Platinum)
2. Explain benefits per tier:
   - **Silver:** 10% discount, priority reservations
   - **Gold:** 15% discount, secret menu access, birthday gift
   - **Platinum:** 20% discount, exclusive chef's menu, chauffeur service

#### Key Talking Points:
- "Never forget a customer's preferences"
- "Reward loyal customers with VIP benefits"
- "Know exactly who your best customers are"
- "Personal touch without manual note-taking"

#### Demo Features to Highlight:
- Guest search and filtering
- Spending analytics
- Preference tracking
- Automated birthday recognition
- Secret menu for VIPs only

#### Questions to Anticipate:
- **"Can we give personalized recommendations?"** Yes, based on order history
- **"How do we identify VIPs?"** Automatically based on spending, or manually assigned
- **"Can we track dietary restrictions?"** Yes, fully integrated

---

### Phase 5: Inventory Management (8 minutes)

**Navigate To:** Dashboard → Inventory

#### Step 1: View Current Inventory
1. Show inventory dashboard with 40+ ingredients
2. Filter by status:
   - Green: Adequate stock
   - Yellow: Low stock
   - Red: Critical/Out of stock

#### Step 2: Show Low-Stock Alert
1. Find "Saffron" in red (2 grams remaining)
2. Click to see:
   - Current quantity: 2g
   - Reorder level: 10g
   - Supplier: "Spices of Morocco"
   - Lead time: 3 days
3. Click "Order from Supplier" (shows integration)

#### Step 3: Track Inventory by Recipe
1. Click "Recipe Usage"
2. Show "Pan-Seared Branzino"
3. List ingredients and quantities:
   - Branzino fillet: 350g
   - Saffron: 0.2g
   - Sea salt: 5g
   - Extra virgin olive oil: 20ml

#### Step 4: Historical Tracking
1. Show usage over time
2. Identify trends (saffron usage increasing with seasonal menu)

#### Key Talking Points:
- "Never run out of critical ingredients"
- "Automatic alerts before stockouts"
- "Track ingredient costs"
- "Understand which dishes use which ingredients"
- "Make smarter ordering decisions"

#### Demo Features to Highlight:
- Low-stock alerts with automatic ordering
- Batch tracking with expiry dates
- Supplier integration for ordering
- Usage forecasting
- Cost per dish calculation

#### Questions to Anticipate:
- **"How do we physically scan items?"** Via barcode scanner (hardware integration ready)
- **"Can we see waste?"** Yes, via spoilage tracking
- **"How often should we do physical counts?"** Weekly recommended; system tracks variance

---

### Phase 6: Supplier Management (6 minutes)

**Navigate To:** Dashboard → Suppliers

#### Step 1: View Supplier List
1. Show 8 suppliers:
   - Fish supplier, Vegetable supplier, Spice supplier, etc.
2. Click on "Fresh Fish Direct"

#### Step 2: Supplier Details
1. Show:
   - Contact: Ahmed (+212 6 12 34 5678)
   - Address: Tangier Port
   - Delivery schedule: Mon/Wed/Fri
   - Rating: 4.8/5
   - On-time delivery: 98%

#### Step 3: Order History
1. Show recent orders:
   - 2026-03-25: 12,500 MAD (Branzino, squid, shrimp)
   - 2026-03-22: 8,750 MAD (Branzino, mullet)
3. Click on order to see details

#### Step 4: Pricing Analysis
1. Show price trends for "Branzino"
2. Current: 85 MAD/kg
3. 30-day average: 82 MAD/kg
4. Alert: "Price increased 3.7% this month"

#### Key Talking Points:
- "Track supplier performance"
- "Find best pricing across suppliers"
- "Maintain strong supplier relationships"
- "Never miss a delivery"
- "Make informed purchasing decisions"

#### Demo Features to Highlight:
- Supplier contact management
- Delivery schedule tracking
- Quality ratings
- Price history and trends
- Bulk order discounts

#### Questions to Anticipate:
- **"Can we auto-order?"** Not yet, but Phase 2 will include API ordering
- **"How do we compare suppliers?"** Use the comparison tool (show comparison)
- **"Can suppliers access the system?"** Not in MVP, future Phase

---

### Phase 7: Forecasting & Demand Planning (6 minutes)

**Navigate To:** Dashboard → Forecasting

#### Step 1: Demand Forecast
1. Show 7-day forecast for next week:
   - Tomorrow (Mon): 68 expected covers
   - Tue: 52 covers
   - Wed: 45 covers
   - Thu: 58 covers
   - Fri: 92 covers (weekend)
   - Sat: 110 covers
   - Sun: 87 covers

#### Step 2: Ingredient Forecast
1. Click on Friday's forecast
2. Show predicted ingredient needs:
   - Branzino: 32kg
   - Saffron: 4g
   - Olive oil: 2.2L
   - Vegetables: 48kg
3. Compare to current inventory
4. Show: "Low on branzino - order 40kg by Wednesday"

#### Step 3: Menu Popularity
1. Show predicted popularity:
   - Pan-Seared Branzino: 28% of orders (top dish)
   - Lobster Bisque: 15%
   - Beef Tenderloin: 12%
   - Seasonal Vegetables: 22%

#### Key Talking Points:
- "Plan ahead, don't react"
- "Reduce waste with accurate forecasts"
- "Optimize staff scheduling"
- "Know your popular dishes"
- "Avoid stockouts on busy nights"

#### Demo Features to Highlight:
- 7-day and 30-day forecasts
- Ingredient-level forecasting
- Seasonal pattern recognition
- Special event planning
- Confidence scores

#### Questions to Anticipate:
- **"How accurate are these forecasts?"** 85-90% accuracy; improves with more data
- **"Can we adjust forecasts manually?"** Yes, for special events
- **"How does it account for events?"** Manual event entry affects predictions

---

### Phase 8: Anomaly Detection & Alerts (5 minutes)

**Navigate To:** Dashboard → Alerts

#### Step 1: View Active Alerts
1. Show 3 active alerts:
   - **Red Alert:** "Branzino usage 45% above forecast - check for waste"
   - **Yellow Alert:** "Supplier price spike - Fresh Fish Direct up 8%"
   - **Blue Alert:** "Unusual pattern - no reservations Tue-Wed"

#### Step 2: Investigate Alert
1. Click on the branzino usage alert
2. Show:
   - Last 7 days actual usage vs. forecast
   - Graph showing spike on 2026-03-25
   - Possible cause: Large private event
   - Recommendation: Adjust forecast model

#### Step 3: Supplier Alert
1. Click on price spike alert
2. Show price trend graph
3. Explanation: "Market trend - all fish suppliers increased 5-10%"
4. Options: Accept, negotiate with supplier, or switch supplier

#### Key Talking Points:
- "System watches for problems so you don't have to"
- "Alerts only on truly important issues"
- "Actionable insights, not noise"
- "Prevent waste and unnecessary costs"
- "Real-time operation visibility"

#### Demo Features to Highlight:
- Real-time alert system
- Alert severity levels
- Anomaly explanation engine
- Recommended actions
- Alert acknowledgment & resolution tracking

#### Questions to Anticipate:
- **"Can we turn off alerts?"** Yes, by type and severity threshold
- **"Will we be alerted at 3 AM?"** Optional - can set quiet hours
- **"What counts as anomalous?"** Configurable thresholds per metric

---

### Phase 9: Financial Dashboard (7 minutes)

**Navigate To:** Dashboard → Analytics → Financial

#### Step 1: Revenue Overview
1. Show today's revenue: **3,850 MAD**
2. Show breakdown by revenue type:
   - Dine-in: 2,850 MAD (16 covers)
   - Bar: 800 MAD
   - Other: 200 MAD

#### Step 2: Monthly Performance
1. Show 12-month revenue graph
2. Highlight:
   - March YTD: 85,500 MAD (on track)
   - Average per night: 2,850 MAD
   - Busiest night: Saturday (avg 3,200 MAD)

#### Step 3: Cost Analysis
1. Show cost breakdown:
   - Food cost: 32% (ideal: 30-35%)
   - Labor: 25%
   - Utilities: 8%
   - Other: 10%
   - **Profit margin: 25%**

#### Step 4: Invoice Management
1. Show unpaid invoices (supplier payments)
2. Find "Fresh Fish Direct - 12,500 MAD - Due 2026-03-28"
3. Click "Mark as Paid" (demo payment)

#### Key Talking Points:
- "Complete financial visibility"
- "Profit margins at a glance"
- "Invoice tracking prevents late payments"
- "Cost control for better profitability"
- "No surprises with real numbers"

#### Demo Features to Highlight:
- Real-time revenue tracking
- Multi-period comparison
- Profit margin analysis
- Cost tracking by category
- Invoice management
- Payable vs. receivable tracking

#### Questions to Anticipate:
- **"Can we export financial reports?"** Yes, PDF and Excel
- **"How does this integrate with accounting?"** Via API for QuickBooks/Xero (Phase 2)
- **"Can we forecast revenue?"** Yes, using historical and booking data

---

### Phase 10: Kitchen Operations (5 minutes)

**Navigate To:** Dashboard → Kitchen

#### Step 1: Kitchen Ticket Display
1. Show current kitchen tickets:
   - **#1001** (Red - urgent): 4 Branzino, 2 Bisque - Started 2 min ago
   - **#1002** (Yellow): 2 Beef, 1 Lobster - Waiting
   - **#1003** (Blue): 3 Vegetarian - Waiting

#### Step 2: Ticket Workflow
1. Click on ticket #1001
2. Show:
   - Order items with times
   - Special instructions: "No salt on fish"
   - Table number: 5
   - Server: Maria
3. Click "In Progress" → "Complete"
4. Show completion time: 8 minutes

#### Step 3: Kitchen Performance
1. Show stats:
   - Avg prep time: 11 minutes (target: 12)
   - Current orders: 3
   - Completed today: 42
   - On-time: 95%

#### Key Talking Points:
- "Kitchen sees orders in real-time"
- "No more paper tickets"
- "Clear priorities (urgent in red)"
- "Track kitchen performance"
- "Improve service speed"

#### Demo Features to Highlight:
- Real-time kitchen display
- Order priority system
- Ingredient allocation view
- Kitchen performance metrics
- Special instructions highlighted

#### Questions to Anticipate:
- **"Do we need special kitchen screens?"** No, can use any tablet/computer
- **"What if internet goes down?"** Orders are queued; system retries when online
- **"How do chefs see recipes?"** Recipe button shows ingredients and cooking instructions

---

### Phase 11: System Settings (3 minutes)

**Navigate To:** Dashboard → Settings

#### Step 1: Venue Configuration
1. Show current venue: "2R Fusion"
2. Details:
   - Location: Tangier, Morocco
   - Capacity: 80 covers
   - Currency: MAD
   - Timezone: Africa/Casablanca

#### Step 2: User Management
1. Show 6 active users
2. Show roles and permissions
3. Click "Add User" (demo but don't complete)

#### Step 3: System Health
1. Show database status: ✓ Connected
2. Show API status: ✓ All endpoints active
3. Show last backup: Today 02:00

#### Key Talking Points:
- "Complete control over your system"
- "Add users and manage permissions"
- "Monitor system health"
- "Automatic backups for safety"

---

## Q&A Session

### Questions Likely to Arise

**Technical Questions:**
1. **"What if the internet goes down?"** 
   - System caches locally; queues operations until reconnected
   - Phase 2: Offline mode for critical functions

2. **"How secure is our data?"**
   - HTTPS encryption, secure password hashing, role-based access
   - Regular backups, audit logging, no data sharing

3. **"Can we integrate with our existing systems?"**
   - Yes, via API; we can custom integrate with QuickBooks, POS, etc.

4. **"What about mobile access?"**
   - Full mobile-responsive design; works on smartphones and tablets
   - Native mobile apps in Phase 3

**Business Questions:**
5. **"What's the implementation timeline?"**
   - Day 1: System setup and configuration
   - Day 2-3: Data migration and staff training
   - Day 4: Live launch with support

6. **"How much training is needed?"**
   - 2-4 hours for admin users
   - 1 hour for kitchen staff
   - 30 minutes for servers
   - Ongoing support included

7. **"What happens if we have more than 100 covers?"**
   - System scales easily; can handle 300+ simultaneous covers
   - May need database optimization for very large volumes

8. **"Can we customize the system?"**
   - Yes, fully customizable menus, reports, workflows
   - Custom integrations available

**Pricing/Support Questions:**
9. **"What's the total cost of ownership?"**
   - Fixed project fee: 150K-250K MAD (as discussed)
   - Hosting: ~500-1,000 MAD/month
   - Support: Included for first 3 months

10. **"What if something breaks?"**
    - 24-hour email support; emergency hotline for critical issues
    - Monthly updates and maintenance included

---

## Demo Troubleshooting

### If the system won't start:
```bash
# Kill any existing processes
npx lsof -i :3000

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Reset the database
rm prisma/dev.db
npm run db:seed

# Start again
npm run dev
```

### If you forget the login credentials:
- Admin: `admin@2rfusion.ma` / `admin123`
- Manager: `manager@2rfusion.ma` / `manager123`

### If data looks wrong:
```bash
# Re-seed the database
npm run db:seed
```

### If performance is slow:
- Refresh the browser
- Clear browser cache
- Restart the development server

---

## Post-Demo Follow-Up

1. **Send summary email** with key features and benefits
2. **Schedule implementation call** to discuss timeline
3. **Prepare custom proposal** with pricing
4. **Create training materials** specific to their staff
5. **Set up demo venue** on production database
6. **Arrange follow-up meetings** with key stakeholders

---

**Demo Guide Version:** 1.0.0  
**Last Updated:** March 27, 2026
