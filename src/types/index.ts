import {
  User,
  Employee,
  Venue,
  Table,
  Reservation,
  Guest,
  Menu,
  MenuCategory,
  Dish,
  Recipe,
  RecipeIngredient,
  OrderItem,
  OrderTicket,
  Payment,
  Invoice,
  InventoryItem,
  StockBatch,
  Supplier,
  SupplierProduct,
  Anomaly,
  AnomalyReview,
  Alert,
  AuditLog,
} from "@prisma/client";

// Re-export Prisma types
export type {
  User,
  Employee,
  Venue,
  Table,
  Reservation,
  Guest,
  Menu,
  MenuCategory,
  Dish,
  Recipe,
  RecipeIngredient,
  OrderItem,
  OrderTicket,
  Payment,
  Invoice,
  InventoryItem,
  StockBatch,
  Supplier,
  SupplierProduct,
  Anomaly,
  AnomalyReview,
  Alert,
  AuditLog,
};

// Dashboard statistics
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalGuests: number;
  averageOrderValue: number;
  activeReservations: number;
  pendingPayments: number;
  criticalAnomalies: number;
  inventoryAlerts: number;
}

// Menu types
export type MenuWithCategories = Menu & {
  categories: MenuCategory[];
};

export type CategoryWithDishes = MenuCategory & {
  items: Dish[];
};

export type DishWithRecipe = Dish & {
  recipe?: Recipe & {
    ingredients: RecipeIngredient[];
  };
};

// Reservation types
export type ReservationWithGuest = Reservation & {
  guest: Guest;
  table?: Table;
};

// Order types
export type OrderWithItems = OrderTicket & {
  items: OrderItem[];
  payment?: Payment;
};

// Inventory types
export type InventoryWithBatches = InventoryItem & {
  batches: StockBatch[];
};

// Supplier types
export type SupplierWithProducts = Supplier & {
  products: SupplierProduct[];
};

// Anomaly types
export type AnomalyWithReviews = Anomaly & {
  reviews: AnomalyReview[];
  reporter?: Employee;
};

// Guest types
export type GuestWithTags = Guest & {
  reservations: Reservation[];
};

// Navigation types
export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
}

export interface SidebarNavItem extends NavItem {
  items?: SidebarNavItem[];
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form state types
export interface FormState {
  message?: string;
  errors?: Record<string, string[]>;
  fieldValues?: Record<string, any>;
}

export interface ActionResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

// Pagination helpers
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginationResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Filter types for common queries
export interface DateRange {
  from: Date;
  to: Date;
}

export interface RevenueMetrics {
  date: Date;
  amount: number;
  orderCount: number;
  guestCount: number;
}

export interface EmployeePerformance {
  employeeId: string;
  ordersCompleted: number;
  avgOrderTime: number;
  customerRating: number;
  period: DateRange;
}
