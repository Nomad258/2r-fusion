# QR Menu System Routes

## Public Routes (Guest Access)

### Menu Access
- **`/m/[tableId]`** - Main QR menu page
  - Access via QR code scan at table
  - Server-rendered page that fetches menu and table info
  - Automatically filters VIP items based on table zone
  - Example: `/m/clz123abc456def789ghi`

## API Routes

### Menu Data
- **`GET /api/menu/[tableId]`** - Get table-specific menu
  - Returns: Menu with categories and dishes, table info, VIP zone status
  - Filters by availability and VIP zone
  - Used by public menu page (server-side)
  - Example: `/api/menu/clz123abc456def789ghi`

### Admin APIs
- **`GET /api/admin/tables`** - Get all active tables
  - Returns: List of all tables with venue info
  - Used by QR code management page
  - Sorted by venue ID then table number

## Admin Routes (Protected)

### QR Code Management
- **`/menu-management/qr-codes`** - QR code generation and printing
  - View QR codes for all tables
  - Filter by venue
  - Download individual QR codes as PNG
  - Copy table menu links
  - Print-friendly layout

## How QR Codes Work

1. **Generation**: Admin visits `/menu-management/qr-codes`
2. **QR Content**: Each code encodes URL like `https://2rfusion.com/m/[tableId]`
3. **Access**: Guest scans QR at table with phone
4. **Menu Load**: Browser navigates to `/m/[tableId]`
5. **Server Processing**: Page fetches menu, filters by VIP zone
6. **Rendering**: Beautiful mobile menu loads with categories and dishes

## Environment Setup

Required in `.env.local`:
```
NEXT_PUBLIC_APP_URL=https://2rfusion.com  # Or localhost:3000 for dev
```

This is used by QR code generator to create links.

## Testing the Menu

```bash
# 1. Start development server
npm run dev

# 2. Get a table ID from database or create a test table
# Example table ID: clz123abc456def789ghi

# 3. Access menu directly in browser
http://localhost:3000/m/clz123abc456def789ghi

# 4. Or manage QR codes
http://localhost:3000/menu-management/qr-codes
```

## Integration Points

### Database Tables Used
- `Table` - Gets table number, zone, capacity
- `Menu` - Active menus for venue
- `MenuCategory` - Categories within menu
- `Dish` - Individual menu items

### Key Dish Filters
- `isActive: true` - Only show active dishes
- `isVipOnly: boolean` - VIP zone filtering
- `isAvailable: boolean` - Current availability
- `isChefSpecial: boolean` - Highlight special items
- `isNew: boolean` - Mark new additions

### Dietary/Allergen Flags
Stored in `Dish.dietaryTags` as comma-separated values:
- `vegan`, `vegetarian`, `glutenfree`, `dairyfree`, `spicy`, `nuts`

Displayed as emoji icons on dish cards.
