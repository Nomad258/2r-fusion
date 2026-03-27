# 2R Fusion - Layout System & Tailwind Configuration

## Overview
Complete premium layout system and Tailwind CSS configuration for the 2R Fusion restaurant management platform.

## Files Created

### 1. Configuration Files

#### `tailwind.config.ts` (Updated)
- **Premium color palette**: gold, bronze, ocean, cream, stone
- **Custom fonts**: Playfair Display (headings), Inter (body)
- **Animations**: fadeIn, slideUp, slideDown, scaleIn
- **Extended spacing**: safe-area insets for mobile
- **Custom utilities**: gradient, background-image support

#### `src/app/globals.css` (Updated)
- **Google Fonts imports**: Inter & Playfair Display via @import
- **Dark theme defaults**: bg-stone-950, text-stone-100
- **Custom scrollbar**: Gold-colored scrollbar with stone-800 track
- **Selection styling**: Gold background with stone text
- **Base layer styling**: Semantic HTML elements with premium defaults
- **Component layer utilities**:
  - `.glass`: Glass morphism effect
  - `.btn-*`: Button variants (gold, outline)
  - `.card-premium`: Premium card styling
  - `.text-gradient`: Gradient text utility
  - `.animate-*`: Animation classes
  - `.glow-*`: Glow effects
  - `.text-*`: Text utilities (muted, subtle)

### 2. Root Layout

#### `src/app/layout.tsx`
- Metadata configuration with OpenGraph support
- SEO-optimized title and description
- Keywords, authors, and social media metadata
- Root HTML structure with dark theme body

### 3. Public Site Layout

#### `src/app/(public)/layout.tsx`
- Wraps public pages with Navbar and Footer
- Min-height layout ensuring footer sticks to bottom
- Proper spacing for navbar (pt-20)

#### `src/app/(public)/components/navbar.tsx` (Client Component)
- **Logo**: "2R FUSION" in serif font with gold accent
- **Navigation links**: Menu, Reservations, Gallery, Private Dining, Contact
- **CTA button**: "Reserve Table" with outline style
- **Desktop & Mobile**: Hidden/shown responsively with hamburger menu
- **Scroll effect**: Glass morphism appears on scroll
- **Mobile menu**: Full-width hamburger menu with smooth transition
- **Accessibility**: Proper ARIA labels and semantic HTML

#### `src/app/(public)/components/footer.tsx`
- **Branding section**: Logo, tagline "Made with love in Tangier"
- **Visit section**: Address, operating hours (Lunch 12-15, Dinner 19-23)
- **Contact section**: Phone and email with icons
- **Social links**: Instagram, Facebook, Twitter with icon buttons
- **Legal links**: Privacy, Terms of Service, Cookie Policy
- **Responsive grid**: 4-column desktop, 1-column mobile
- **Styling**: Premium dark theme with gold accents

### 4. Admin Dashboard Layout

#### `src/app/(admin)/layout.tsx`
- Sidebar + Topbar architecture
- Proper spacing for sidebar (md:ml-64)
- Main content area with max-width container

#### `src/app/(admin)/components/sidebar.tsx` (Client Component)
- **Branding**: 2R Fusion logo with collapsible text
- **Collapse toggle**: ChevronLeft/Right icons
- **Desktop sidebar**: Fixed 264px width (collapsed: 80px)
- **Mobile sidebar**: Full width with overlay
- **Smooth transitions**: All state changes animated
- **Navigation**: SidebarNav component

#### `src/app/(admin)/components/sidebar-nav.tsx`
- **Menu items with icons**:
  - Dashboard
  - Orders (UtensilsCrossed)
  - Reservations (Calendar)
  - Menu (Menu3)
  - Guests/CRM (Users)
  - Inventory (Package)
  - Suppliers (Truck)
  - Invoices (FileText)
  - Employees (Users2)
  - Forecasts (TrendingUp)
  - Alerts (AlertCircle)
  - Anomalies (AlertCircle)
  - Settings (Settings)
- **Active state**: Gold background with border highlight
- **Responsive**: Shows/hides text based on collapsed state
- **Accessibility**: Tooltips on collapsed state

#### `src/app/(admin)/components/topbar.tsx`
- **User info**: Name, role (Manager)
- **Notifications**: Bell icon with unread count
- **User menu**: Avatar, dropdown indicator
- **Sticky**: Fixed position at top-right
- **Responsive**: Adjusts for mobile display
- **Dark theme**: Stone-950 background with gold accents

## Design System

### Color Palette
- **Gold**: Primary accent (#b89a6b base, multiple shades)
- **Bronze**: Secondary accent (warm brown tones)
- **Ocean**: Tertiary accent (blue-gray tones)
- **Cream**: Warm neutral background
- **Stone**: Primary background (stone-950 as default)

### Typography
- **Headings**: Playfair Display (serif) - elegant, premium feel
- **Body**: Inter (sans-serif) - clean, readable, modern
- **Font stacks**: System fonts as fallback

### Component Patterns
- Glass morphism effects for layered UI
- Gold accents on hover for interactivity
- Stone backgrounds with proper contrast
- Smooth animations (200-300ms duration)
- Proper spacing utilities (gap, padding)

## Key Features

### 1. Premium Dark Theme
- Default dark color scheme
- Excellent contrast ratios for accessibility
- Warm stone tones instead of cold black

### 2. Responsive Design
- Mobile-first approach
- Desktop sidebar collapses on mobile
- Hamburger menu for navigation
- Proper safe-area insets for notched devices

### 3. Animations
- Smooth transitions on all interactive elements
- Custom keyframes for fade, slide, scale
- Respects prefers-reduced-motion

### 4. Accessibility
- Semantic HTML throughout
- ARIA labels on buttons
- Proper color contrast
- Keyboard-navigable components
- Skip-to-content links ready

### 5. Performance
- CSS-in-JS via Tailwind
- Utility-first approach
- Minimal custom CSS
- Fast load times with Google Fonts

## Usage

### Import Components
```tsx
import { Navbar } from "@/app/(public)/components/navbar";
import { Footer } from "@/app/(public)/components/footer";
import { Sidebar } from "@/app/(admin)/components/sidebar";
import { Topbar } from "@/app/(admin)/components/topbar";
```

### Layout Nesting
- Root: `src/app/layout.tsx`
- Public: `src/app/(public)/layout.tsx`
- Admin: `src/app/(admin)/layout.tsx`

### Utility Classes
```tsx
// Glass effect
<div className="glass">...</div>

// Premium button
<button className="btn-gold">Reserve</button>

// Gradient text
<h1 className="text-gradient">Premium Dining</h1>

// Animations
<div className="animate-fade-in">...</div>
```

## Next Steps
1. Create page components in public and admin routes
2. Implement authentication/authorization
3. Add breadcrumbs component in admin
4. Create form components with validation
5. Implement dark mode toggle (optional)
6. Add loading skeletons
7. Setup toast notifications
