# 2R Fusion - Design Assumptions & Limitations

This document outlines all assumptions made during development and known limitations of the system.

## Database & Storage

### Assumption 1: SQLite for Development, PostgreSQL for Production
- **What we assume:** Development uses SQLite for easy setup; production uses PostgreSQL for scalability
- **Rationale:** SQLite is lightweight for local development; PostgreSQL handles concurrent users and backup
- **Impact:** Code uses Prisma ORM to abstract database differences; migrations must be tested on both
- **When this breaks:** High-volume concurrent access, complex transactions, or distributed deployments

### Assumption 2: Single Venue Optimization
- **What we assume:** System is optimized for single venue (2R Fusion) initially
- **Rationale:** Simplified data model, faster queries, focused feature set
- **Impact:** Multi-venue support exists in schema but not fully optimized
- **When this breaks:** When scaling to RR ICE Cafe and other locations
- **Mitigation:** Architecture prepared for venue-based filtering and multi-venue dashboards

### Assumption 3: Data Isolation by Venue
- **What we assume:** All data (menus, reservations, inventory) is automatically filtered by venue_id
- **Rationale:** Prevents data leaks between locations; maintains data integrity
- **Impact:** Every query includes venue_id filter; users can only access their venue
- **When this breaks:** If venue_id enforcement is disabled or queries bypass filtering

## Demo & Testing Data

### Assumption 4: Mock Data for Demo
- **What we assume:** Database is seeded with realistic demo data (menus, suppliers, guests, etc.)
- **Rationale:** Allows stakeholders to see system in action without real data entry
- **Impact:** Demo accounts use seeded data; production deployment requires real data migration
- **When this breaks:** When production data is different from demo expectations
- **Migration:** Run `npm run db:seed` to reset demo data; never run seed in production

### Assumption 5: Demo Credentials
- **What we assume:** Demo admin account (admin@2rfusion.ma / admin123) is for testing only
- **Rationale:** Easy access for demos; not secure for production
- **Impact:** Must change all demo credentials before going live
- **When this breaks:** If demo credentials remain in production
- **Security:** Remove demo users and create strong production credentials

## Integrations

### Assumption 6: No Real Payment Gateway Connected
- **What we assume:** Payment processing is simulated; no real money is charged
- **Rationale:** Demo environment; PCI compliance not yet implemented
- **Impact:** Payment processing shows UI but doesn't charge cards
- **When this breaks:** In production, must integrate CMI Morocco or Stripe
- **Mitigation:** API structure ready for payment gateway integration

### Assumption 7: No Real SMS/Email Service
- **What we assume:** SMS and email notifications are logged but not sent
- **Rationale:** Cost, complexity, and testing concerns
- **Impact:** Reservation confirmations, alerts, and receipts are logged only
- **When this breaks:** When customers need real notifications
- **Integration ready:** Twilio (SMS), SendGrid (Email) are supported

### Assumption 8: No Real Barcode Scanning Hardware
- **What we assume:** Barcode scanning is simulated through the UI
- **Rationale:** Hardware integration requires specific devices and drivers
- **Impact:** Inventory receipt workflow works but requires manual entry
- **When this breaks:** When barcode scanners are deployed
- **Mitigation:** Barcode API endpoints are ready for hardware integration

### Assumption 9: No Cloud Storage Integration
- **What we assume:** Images and files are stored locally or temporarily
- **Rationale:** Demo doesn't require persistent file storage
- **Impact:** Menu images, supplier documents, and attachments are references only
- **When this breaks:** When images need to persist across deployments
- **Mitigation:** AWS S3 integration structure is ready

## Features & Logic

### Assumption 10: Forecasting Uses Statistical Heuristics
- **What we assume:** Demand forecasting uses historical analysis, not machine learning
- **Rationale:** Simpler implementation; no ML infrastructure required
- **Impact:** Forecasts are less accurate but sufficient for demo
- **When this breaks:** When advanced ML predictions are needed
- **Phase 2:** Real ML models (TensorFlow, scikit-learn) for accurate forecasting

### Assumption 11: Anomaly Detection Uses Threshold-Based Alerts
- **What we assume:** Anomalies are detected by comparing to fixed thresholds
- **Rationale:** Simple, explainable, and tunable
- **Impact:** Fewer false positives; may miss subtle anomalies
- **When this breaks:** When advanced pattern detection is needed
- **Phase 2:** Statistical anomaly detection (z-scores, isolation forests)

### Assumption 12: Single Admin Can Manage All Operations
- **What we assume:** One person can manage menu, inventory, suppliers, reservations, and finances
- **Rationale:** 2R Fusion is a single restaurant with small management team
- **Impact:** Role-based access control allows delegation as staff grows
- **When this breaks:** With 100+ staff members or complex organizational structures
- **Scaling:** Add more granular roles and permission groups

### Assumption 13: Real-Time Updates via REST API
- **What we assume:** Frontend polls API for updates; no WebSockets or real-time subscriptions
- **Rationale:** Simpler implementation; sufficient for restaurant operations
- **Impact:** Dashboard updates on page refresh or polling interval
- **When this breaks:** When real-time kitchen ticket updates are critical
- **Phase 2:** WebSocket support for live kitchen display

## Business Logic

### Assumption 14: Currency is MAD (Moroccan Dirham)
- **What we assume:** All prices, costs, and financial data are in MAD
- **Rationale:** Restaurant is in Tangier, Morocco
- **Impact:** No currency conversion needed; simplifies financial reporting
- **When this breaks:** If expanding to other countries
- **Mitigation:** Multi-currency support can be added

### Assumption 15: Timezone is Africa/Casablanca
- **What we assume:** All timestamps and calculations use Africa/Casablanca timezone
- **Rationale:** Matches restaurant location
- **Impact:** Reservations, forecasts, and reports use local time
- **When this breaks:** If expanding to other timezones
- **Mitigation:** Per-venue timezone configuration is supported

### Assumption 16: VIP Program is Manual
- **What we assume:** VIP tier assignments and benefits are managed manually by admin
- **Rationale:** Personal relationship is key to premium dining
- **Impact:** Spending thresholds don't automatically promote guests
- **When this breaks:** When automated VIP tier promotions are desired
- **Phase 2:** Configurable auto-tier rules based on spending

### Assumption 17: Supplier Orders are Manual
- **What we assume:** Suppliers don't have integrated ordering APIs; orders created manually
- **Rationale:** Most suppliers are local/regional and don't have APIs
- **Impact:** Ordering requires user input; can't auto-order
- **When this breaks:** When connecting to large suppliers with EDI/APIs
- **Phase 2:** API integration for major suppliers

## Performance & Scale

### Assumption 18: Capacity: 40-150 Covers per Night
- **What we assume:** System is optimized for 40-150 seated guests at a time
- **Rationale:** 2R Fusion capacity (80 covers) + RR ICE (40 covers)
- **Impact:** Database indexes optimized for this scale
- **When this breaks:** With 300+ simultaneous covers
- **Scaling:** Requires database replication and read replicas

### Assumption 19: Menu Size: 50-100 Items
- **What we assume:** Typical restaurant menu of 50-100 items
- **Rationale:** Premium dining restaurants have focused menus
- **Impact:** Menu caching is effective; queries are fast
- **When this breaks:** With 500+ item menus
- **Scaling:** Implement menu categories and pagination

### Assumption 20: Reservation History: 2 Years
- **What we assume:** System keeps 2 years of historical reservation data
- **Rationale:** Sufficient for seasonal analysis and VIP tracking
- **Impact:** Forecasting models trained on this data
- **When this breaks:** With longer historical requirements
- **Archiving:** Move data >2 years to cold storage

## User Experience

### Assumption 21: Admin Users Know Restaurant Operations
- **What we assume:** Admin users understand menus, inventory, kitchen workflow
- **Rationale:** System is configurable but not beginner-friendly
- **Impact:** Training required for new admin users
- **When this breaks:** With non-technical staff
- **Mitigation:** In-app help, tutorials, and documentation

### Assumption 22: Mobile Support via Responsive Web
- **What we assume:** Mobile access uses responsive web design, not native apps
- **Rationale:** Simpler to develop and maintain
- **Impact:** Works on tablets and phones but not as a native app
- **When this breaks:** When offline functionality is needed
- **Phase 3:** React Native mobile apps for offline access

### Assumption 23: Tablet Menu Uses PWA
- **What we assume:** Tablet menu is a Progressive Web App (PWA), not native iOS/Android
- **Rationale:** Easier deployment and cross-platform support
- **Impact:** Requires modern browser on tablets; may have offline limitations
- **When this breaks:** With older tablets or specific iOS requirements
- **Alternative:** Native tablet apps for better performance

## Data Quality

### Assumption 24: Suppliers Provide Accurate Pricing
- **What we assume:** Supplier pricing data is entered correctly by staff
- **Rationale:** No automated price feeds from suppliers
- **Impact:** Forecasting accuracy depends on data quality
- **When this breaks:** With incorrect pricing data
- **Mitigation:** Price validation and supplier verification workflows

### Assumption 25: Inventory Counts are Accurate
- **What we assume:** Physical inventory matches database inventory
- **Rationale:** Regular physical counts and barcode tracking
- **Impact:** Forecasting and alerts based on accurate inventory
- **When this breaks:** With shrinkage or counting errors
- **Mitigation:** Regular inventory audits and barcode verification

### Assumption 26: Historical Data is Representative
- **What we assume:** Past reservation and sales data reflects future patterns
- **Rationale:** Seasonal patterns are consistent year-to-year
- **Impact:** Forecasting accuracy improves with more data
- **When this breaks:** With major menu changes or external events (e.g., pandemic)
- **Mitigation:** Manual forecast adjustments and event planning

## Compliance & Legal

### Assumption 27: GDPR Not Applicable
- **What we assume:** EU GDPR compliance is not required
- **Rationale:** Restaurant operates in Morocco
- **Impact:** Simplified data retention and deletion policies
- **When this breaks:** If accepting bookings from EU customers
- **Mitigation:** GDPR-compliant data handling can be implemented

### Assumption 28: PCI Compliance Not Required
- **What we assume:** Card data is not stored locally; payment gateway handles compliance
- **Rationale:** Payments delegated to external provider
- **Impact:** Simplified security requirements
- **When this breaks:** If storing card data locally
- **Mitigation:** Stripe or CMI handles PCI compliance

### Assumption 29: French Language Only
- **What we assume:** System displays entirely in French
- **Rationale:** French is primary language for 2R Fusion stakeholders
- **Impact:** No English translation needed for MVP
- **When this breaks:** With English-speaking staff or international expansion
- **Phase 2:** Multi-language support (English, Arabic)

## Known Limitations

1. **No Offline Mode** - System requires internet connectivity
2. **Single Admin Bottleneck** - All critical operations depend on admin user
3. **Limited Reporting** - Reports are basic; no advanced BI integration
4. **No Inventory Transfers** - Can't transfer inventory between venues
5. **Manual Price Updates** - Menu prices must be manually updated
6. **No Loyalty Points** - VIP program is tier-based, not point-based
7. **Limited Recipe Scaling** - Recipe quantities don't auto-scale for party size
8. **No Staff Scheduling** - No staff shift management or labor forecasting
9. **No Multi-Language Support** - French only
10. **No API Rate Limiting** - Open API access without restrictions

## Migration Path

### From Demo to Production
1. Replace demo credentials with strong passwords
2. Migrate from SQLite to PostgreSQL
3. Integrate real payment gateway (CMI Morocco)
4. Set up SMS/email service (Twilio/SendGrid)
5. Migrate real business data (menus, suppliers, guests)
6. Deploy to production server
7. Set up backup and disaster recovery
8. Train staff on system usage

---

**Assumptions Document Version:** 1.0.0  
**Last Updated:** March 27, 2026
