# QR Menu System - 2R Fusion Restaurant

## Overview

A premium, mobile-first QR menu experience for 2R Fusion Restaurant. Guests scan a QR code at their table to access an interactive, beautifully designed digital menu.

## File Structure

### Menu Layout & Pages

- **`src/app/(menu)/layout.tsx`**
  - Minimal layout with elegant 2R FUSION branding header
  - Mobile-optimized viewport settings
  - Dark theme with stone/amber color palette
  - Sticky header for seamless navigation

- **`src/app/(menu)/m/[tableId]/page.tsx`** (Server Component)
  - Entry point for QR menu access
  - Fetches table info and menu from database
  - Filters dishes based on table VIP zone
  - Passes data to MenuClient component
  - Supports VIP-only menu items per table zone

### Client Components

- **`src/app/(menu)/m/[tableId]/components/menu-client.tsx`**
  - Manages menu state and interaction
  - Displays active category and dishes
  - Handles dish selection and detail modal open/close
  - Shows table number badge and VIP status

- **`src/app/(menu)/m/[tableId]/components/dish-card.tsx`**
  - Beautiful card UI for each dish
  - Shows dish image (placeholder if none)
  - Displays name (English + French)
  - Price in MAD with optional sale price
  - Dietary/allergen icons (vegan, spicy, etc.)
  - Chef's Special / New / Unavailable badges
  - Smooth hover animations

- **`src/app/(menu)/m/[tableId]/components/dish-detail.tsx`**
  - Full dish detail modal/dialog
  - Large image display
  - Complete ingredient list
  - Clear allergen warnings
  - Wine/food pairing suggestions
  - Chef's notes and special info
  - Quantity selector with +/- buttons
  - Add to Order CTA (placeholder for future ordering)
  - Scrollable content area

- **`src/app/(menu)/m/[tableId]/components/category-nav.tsx`**
  - Horizontal scrolling category pills
  - Active state highlighting (amber background)
  - Auto-scroll to active category
  - Smooth transitions

### API Routes

- **`src/app/api/menu/[tableId]/route.ts`**
  - GET endpoint for table-specific menu
  - Returns menu filtered by availability
  - Filters VIP-only items based on table zone
  - Returns table info (number, zone, capacity)
  - Response includes `isVipZone` flag

- **`src/app/api/admin/tables/route.ts`**
  - GET endpoint for all active tables
  - Used by QR code management page
  - Includes venue info for table
  - Sorted by venue and table number

### Admin Pages

- **`src/app/(admin)/menu-management/qr-codes/page.tsx`**
  - QR code generation and management interface
  - Displays QR code for each table
  - Filterable by venue
  - Individual download buttons (PNG export)
  - Copy URL to clipboard functionality
  - Print-friendly layout with Tailwind print styles
  - Responsive grid (1 col mobile → 3 col desktop)

## Design System

### Color Palette
- **Primary Dark**: `stone-950` (bg), `stone-900` (cards)
- **Accent Gold**: `amber-700` (primary), `amber-100`/`amber-200` (text)
- **Borders**: `amber-900/20` - `amber-900/30`
- **Text**: `stone-100` (primary), `stone-400` (secondary), `stone-500` (tertiary)

### Typography
- Headers: Light weight, wider tracking
- Body: Light weight for premium feel
- Small text: Reduced size for secondary info
- French text: Italic, reduced opacity

### Components Used
- `@/components/ui/card` - Dish cards, detail modal
- `@/components/ui/badge` - Category, dish status
- `@/components/ui/button` - Actions, navigation
- `@/components/ui/dialog` - Dish detail modal
- `@/components/ui/scroll-area` - Scrollable content

## Features

### For Guests
- **QR Code Access**: Scan table QR code to open menu
- **Category Navigation**: Browse menus by cuisine type
- **Dish Details**: Tap any dish to see full details, ingredients, allergens
- **Dietary Info**: Clear icons for vegan, vegetarian, gluten-free, dairy-free, spicy
- **Wine Pairings**: Suggested wine/food pairings for premium dishes
- **Chef Specials**: Featured items highlighted with badges
- **Availability**: Know which items are unavailable
- **Mobile Optimized**: Smooth scrolling, no pinch-to-zoom needed

### For Administrators
- **QR Code Generator**: Create printable QR codes for all tables
- **Venue Filtering**: View QR codes by venue
- **Download**: Export QR codes as PNG
- **Print Layout**: Print-friendly grid format (2 per page)
- **Copy Link**: Share table menu links without QR codes

## Database Integration

Uses Prisma ORM with the following models:
- `Table`: venue, number, zone, capacity, qrCode, isActive
- `Menu`: venueId, isActive, categories[]
- `MenuCategory`: menuId, name, nameFr, description, dishes[]
- `Dish`: categoryId, name, nameFr, price, imageUrl, allergens, ingredients, dietary tags, special flags

## VIP Support

Tables in zones `"VIP"` or `"PRIVATE"` see VIP-only menu items:
- Managed via `Dish.isVipOnly` flag
- Server-side filtering prevents unauthorized access
- Badge shows "VIP Menu" for VIP tables

## Environment Variables Required

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Used for QR code generation
DATABASE_URL=file:./dev.db                  # Prisma database URL
```

## Future Enhancements

1. **Ordering System**: Add to cart and order placement
2. **Special Requests**: Allow notes on dishes (allergies, preferences)
3. **Rating System**: Guest ratings for dishes
4. **Search**: Search menu by dish name or ingredient
5. **Analytics**: Track most viewed/ordered items
6. **Dietary Filters**: Filter by dietary preferences
7. **Price Variations**: Size/portion selection with pricing
8. **Chef Notes**: Dynamic chef recommendations
9. **Multi-language**: Arabic support alongside English/French
10. **Real-time Updates**: Push notifications for menu changes

## File Locations Summary

```
src/app/
├── (menu)/
│   ├── layout.tsx
│   └── m/[tableId]/
│       ├── page.tsx
│       └── components/
│           ├── menu-client.tsx
│           ├── dish-card.tsx
│           ├── dish-detail.tsx
│           └── category-nav.tsx
├── (admin)/
│   └── menu-management/
│       └── qr-codes/
│           └── page.tsx
└── api/
    ├── menu/[tableId]/
    │   └── route.ts
    └── admin/
        └── tables/
            └── route.ts
```

## Testing QR Codes

1. Create test tables in database via admin panel or seed script
2. Visit `/menu-management/qr-codes` (requires admin auth)
3. Download QR codes or copy links
4. Scan QR or navigate directly to `/m/[tableId]`
5. Verify menu loads with correct dishes and categories
