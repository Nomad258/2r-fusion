// Application metadata
export const APP_NAME = "2R Fusion";
export const APP_DESCRIPTION = "Premium restaurant management platform for 2R Fusion";

// User roles
export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  HOST: "HOST",
  CHEF: "CHEF",
  WAITER: "WAITER",
  BARTENDER: "BARTENDER",
  STAFF: "STAFF",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// Reservation statuses
export const RESERVATION_STATUSES = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  SEATED: "SEATED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  NO_SHOW: "NO_SHOW",
} as const;

export type ReservationStatus = (typeof RESERVATION_STATUSES)[keyof typeof RESERVATION_STATUSES];

// Order statuses
export const ORDER_STATUSES = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  IN_PROGRESS: "IN_PROGRESS",
  READY: "READY",
  SERVED: "SERVED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type OrderStatus = (typeof ORDER_STATUSES)[keyof typeof ORDER_STATUSES];

// Payment statuses
export const PAYMENT_STATUSES = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
  PARTIAL: "PARTIAL",
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[keyof typeof PAYMENT_STATUSES];

// Payment methods
export const PAYMENT_METHODS = {
  CASH: "CASH",
  CARD: "CARD",
  MOBILE_MONEY: "MOBILE_MONEY",
  BANK_TRANSFER: "BANK_TRANSFER",
  DIGITAL_WALLET: "DIGITAL_WALLET",
  INVOICE: "INVOICE",
} as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];

// Invoice statuses
export const INVOICE_STATUSES = {
  DRAFT: "DRAFT",
  SENT: "SENT",
  PENDING: "PENDING",
  PAID: "PAID",
  OVERDUE: "OVERDUE",
  CANCELLED: "CANCELLED",
} as const;

export type InvoiceStatus = (typeof INVOICE_STATUSES)[keyof typeof INVOICE_STATUSES];

// Guest tiers for loyalty tracking
export const GUEST_TIERS = {
  NEW: "NEW",
  REGULAR: "REGULAR",
  VIP: "VIP",
  PREMIUM: "PREMIUM",
  WHALE: "WHALE",
} as const;

export type GuestTier = (typeof GUEST_TIERS)[keyof typeof GUEST_TIERS];

// Anomaly types for quality control
export const ANOMALY_TYPES = {
  QUALITY_ISSUE: "QUALITY_ISSUE",
  WASTE: "WASTE",
  BREAKAGE: "BREAKAGE",
  CONTAMINATION: "CONTAMINATION",
  EXPIRED: "EXPIRED",
  SHORTAGE: "SHORTAGE",
  OVERAGE: "OVERAGE",
  PRICING_ERROR: "PRICING_ERROR",
  SERVICE_COMPLAINT: "SERVICE_COMPLAINT",
} as const;

export type AnomalyType = (typeof ANOMALY_TYPES)[keyof typeof ANOMALY_TYPES];

// Anomaly severity levels
export const ANOMALY_SEVERITIES = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

export type AnomalySeverity = (typeof ANOMALY_SEVERITIES)[keyof typeof ANOMALY_SEVERITIES];

// Alert types for notifications
export const ALERT_TYPES = {
  SYSTEM: "SYSTEM",
  INVENTORY: "INVENTORY",
  FINANCIAL: "FINANCIAL",
  OPERATIONAL: "OPERATIONAL",
  SECURITY: "SECURITY",
  PERFORMANCE: "PERFORMANCE",
} as const;

export type AlertType = (typeof ALERT_TYPES)[keyof typeof ALERT_TYPES];

// Inventory categories
export const INVENTORY_CATEGORIES = {
  FOOD: "FOOD",
  BEVERAGE: "BEVERAGE",
  SUPPLIES: "SUPPLIES",
  EQUIPMENT: "EQUIPMENT",
  OTHER: "OTHER",
} as const;

export type InventoryCategory = (typeof INVENTORY_CATEGORIES)[keyof typeof INVENTORY_CATEGORIES];

// Storage locations
export const STORAGE_LOCATIONS = {
  MAIN_PANTRY: "MAIN_PANTRY",
  COLD_STORAGE: "COLD_STORAGE",
  FREEZER: "FREEZER",
  WINE_CELLAR: "WINE_CELLAR",
  BAR: "BAR",
  KITCHEN: "KITCHEN",
  STORAGE_ROOM: "STORAGE_ROOM",
} as const;

export type StorageLocation = (typeof STORAGE_LOCATIONS)[keyof typeof STORAGE_LOCATIONS];

// Departments
export const DEPARTMENTS = {
  KITCHEN: "KITCHEN",
  BAR: "BAR",
  FRONT_OF_HOUSE: "FRONT_OF_HOUSE",
  MANAGEMENT: "MANAGEMENT",
  ADMIN: "ADMIN",
} as const;

export type Department = (typeof DEPARTMENTS)[keyof typeof DEPARTMENTS];

// Table zones for seating arrangements
export const TABLE_ZONES = {
  MAIN_DINING: "MAIN_DINING",
  PRIVATE_ROOM: "PRIVATE_ROOM",
  TERRACE: "TERRACE",
  BAR_SEATING: "BAR_SEATING",
  VIP_LOUNGE: "VIP_LOUNGE",
} as const;

export type TableZone = (typeof TABLE_ZONES)[keyof typeof TABLE_ZONES];

// Menu types
export const MENU_TYPES = {
  REGULAR: "REGULAR",
  SEASONAL: "SEASONAL",
  SPECIAL: "SPECIAL",
  HIDDEN: "HIDDEN",
  VIP: "VIP",
} as const;

export type MenuType = (typeof MENU_TYPES)[keyof typeof MENU_TYPES];

// Dietary tags for menu items
export const DIETARY_TAGS = {
  VEGAN: "VEGAN",
  VEGETARIAN: "VEGETARIAN",
  GLUTEN_FREE: "GLUTEN_FREE",
  DAIRY_FREE: "DAIRY_FREE",
  KETO: "KETO",
  LOW_CARB: "LOW_CARB",
  HALAL: "HALAL",
  KOSHER: "KOSHER",
  ORGANIC: "ORGANIC",
  SPICY: "SPICY",
} as const;

export type DietaryTag = (typeof DIETARY_TAGS)[keyof typeof DIETARY_TAGS];

// Allergen list (common major allergens)
export const ALLERGENS = [
  "PEANUTS",
  "TREE_NUTS",
  "MILK",
  "EGGS",
  "FISH",
  "SHELLFISH",
  "SOY",
  "WHEAT",
  "SESAME",
] as const;

export type Allergen = (typeof ALLERGENS)[number];

// Occasions for reservations and special events
export const OCCASIONS = {
  BIRTHDAY: "BIRTHDAY",
  ANNIVERSARY: "ANNIVERSARY",
  ENGAGEMENT: "ENGAGEMENT",
  WEDDING: "WEDDING",
  CORPORATE: "CORPORATE",
  CELEBRATION: "CELEBRATION",
  DATE_NIGHT: "DATE_NIGHT",
  FAMILY_GATHERING: "FAMILY_GATHERING",
  OTHER: "OTHER",
} as const;

export type Occasion = (typeof OCCASIONS)[keyof typeof OCCASIONS];

// Stock movement types for inventory tracking
export const STOCK_MOVEMENT_TYPES = {
  PURCHASE: "PURCHASE",
  USAGE: "USAGE",
  ADJUSTMENT: "ADJUSTMENT",
  WASTE: "WASTE",
  SPOILAGE: "SPOILAGE",
  TRANSFER: "TRANSFER",
  RETURN: "RETURN",
  PRODUCTION: "PRODUCTION",
} as const;

export type StockMovementType = (typeof STOCK_MOVEMENT_TYPES)[keyof typeof STOCK_MOVEMENT_TYPES];

// Spoilage reasons for waste tracking
export const SPOILAGE_REASONS = {
  EXPIRED: "EXPIRED",
  DAMAGED: "DAMAGED",
  CONTAMINATED: "CONTAMINATED",
  FREEZER_BURN: "FREEZER_BURN",
  IMPROPER_STORAGE: "IMPROPER_STORAGE",
  OVERSTOCKED: "OVERSTOCKED",
  POOR_QUALITY: "POOR_QUALITY",
  OTHER: "OTHER",
} as const;

export type SpoilageReason = (typeof SPOILAGE_REASONS)[keyof typeof SPOILAGE_REASONS];
