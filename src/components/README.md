# Component Library

A comprehensive, production-quality UI component library for the RR ICE & 2R Fusion restaurant management platform.

## Design Direction

- **Ultra Premium**: Dark/warm/stone/bronze/cream/ocean toned
- **Japanese Precision**: Clean lines, intentional spacing
- **Italian Warmth**: Rich colors, approachable elegance
- **Restaurant-Focused**: Built for hospitality workflows

## Color Palette

- **Background**: `bg-stone-950`, `bg-stone-900`, `bg-stone-800`
- **Text**: `text-stone-100`, `text-stone-300`, `text-stone-400`
- **Accent Gold**: `text-amber-400`, `bg-amber-500`, `border-amber-500/20`
- **Borders**: `border-stone-800`, `border-stone-700`

## UI Components (`/ui`)

### Primitives
- **Button**: Multiple variants (default, secondary, destructive, outline, ghost, link) with sizes (sm, default, lg, icon)
- **Input**: Text input with error states and labels
- **Textarea**: Multi-line input with error states
- **Label**: Form labels with proper accessibility
- **Badge**: Status indicators with 7 variants

### Layout
- **Card**: Premium dark card with header, content, and footer slots
- **Separator**: Divider line (horizontal or vertical)
- **Table**: Full-featured table with premium dark styling

### Forms & Selection
- **Select**: Radix-based dropdown select component
- **Checkbox**: Custom checkbox with Radix primitives
- **Switch**: Toggle switch for boolean options
- **Popover**: Floating content panel using Radix

### Dialogs & Overlays
- **Dialog**: Modal dialog with overlay
- **AlertDialog**: High-priority confirmation dialog
- **Tooltip**: Hover tooltip using Radix
- **Dropdown Menu**: Context menu with grouping support

### Navigation
- **Tabs**: Tab navigation with Radix primitives
- **Accordion**: Expandable accordion sections

### Content
- **Avatar**: User avatar with image/fallback support
- **ScrollArea**: Custom scrollbar with Radix
- **Skeleton**: Loading placeholder animation
- **Toast**: Temporary notification component

## Shared Components (`/shared`)

### Dashboard
- **StatCard**: Dashboard metric card with value, change %, and icon
- **PageHeader**: Page title, description, and action buttons

### Tables
- **DataTable**: Generic data table with sorting, pagination, loading states
- **StatusBadge**: Status mapper (pending, confirmed, paid, etc.)

### UI Patterns
- **EmptyState**: No results state with icon, title, description, action
- **LoadingSpinner**: Loading indicator in 3 sizes (sm, md, lg)
- **ConfirmDialog**: Confirmation dialog with async handling

## Installation & Usage

```tsx
// Import from UI
import { Button, Card, CardContent, Input } from "@/components/ui";

// Import from shared
import { StatCard, PageHeader, DataTable } from "@/components/shared";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard" 
        description="Real-time restaurant metrics"
        actions={<Button>Export</Button>}
      />
      
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Total Revenue"
          value="45,234"
          unit="MAD"
          change={12}
          trend="up"
        />
      </div>
    </div>
  );
}
```

## Features

- **Fully Typed**: Complete TypeScript support
- **Accessible**: WCAG compliant with proper ARIA attributes
- **Dark Mode**: Premium dark theme with warm accents
- **Responsive**: Mobile-first design
- **Production Ready**: Clean, maintainable code
- **Radix Primitives**: Built on unstyled, accessible Radix UI components
- **CVA Variants**: Class Variance Authority for type-safe styling

## Dependencies

- Next.js 14+
- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- Radix UI (various primitives)
- class-variance-authority
- lucide-react (icons)

## File Structure

```
components/
├── ui/
│   ├── button.tsx
│   ├── input.tsx
│   ├── badge.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── select.tsx
│   ├── tabs.tsx
│   ├── table.tsx
│   ├── toast.tsx
│   ├── separator.tsx
│   ├── avatar.tsx
│   ├── switch.tsx
│   ├── label.tsx
│   ├── checkbox.tsx
│   ├── scroll-area.tsx
│   ├── tooltip.tsx
│   ├── dropdown-menu.tsx
│   ├── accordion.tsx
│   ├── alert-dialog.tsx
│   ├── textarea.tsx
│   ├── popover.tsx
│   ├── skeleton.tsx
│   └── index.ts
├── shared/
│   ├── stat-card.tsx
│   ├── data-table.tsx
│   ├── page-header.tsx
│   ├── status-badge.tsx
│   ├── empty-state.tsx
│   ├── loading-spinner.tsx
│   ├── confirm-dialog.tsx
│   └── index.ts
└── README.md
```

## Customization

All components use Tailwind CSS classes and can be customized by:
1. Passing `className` prop for direct Tailwind overrides
2. Extending variants in CVA components
3. Modifying base styles in component definitions
4. Using the color palette variables

## Performance

- Components use React.forwardRef for optimal ref forwarding
- Memoization applied where beneficial
- Tree-shakeable exports
- Minimal bundle impact with Radix primitives

## Accessibility

All components include:
- Proper semantic HTML
- ARIA attributes and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility

---

Built with precision and warmth for RR ICE & 2R Fusion.
