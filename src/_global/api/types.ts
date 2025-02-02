// Auth Types
export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: string;
  email: string | null;
  username: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    default_shop?: Shop;
  };
}

// Shop Types
export interface Shop {
  id: string;
  name: string;
  gstin?: string | null;
  pan?: string | null;
  address?: string;
  cin?: string | null;
  state?: string;
  state_code?: string;
  pin?: string;
  is_default?: boolean;
  owned_by?: User;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateShopRequest {
  name: string;
  gstin: string;
  pan: string;
  address: string;
  cin: string;
  state: string;
  pin: string;
}

export interface ShopResponse {
  success: boolean;
  message: string;
  data: Shop;
}

export interface ShopsListResponse {
  success: boolean;
  message: string;
  data: Shop[];
}

// Invoice Types
export interface PartyDetails {
  name: string;
  address: string;
  state: string;
  stateCode: string;
  gstin: string;
}

export interface InvoiceItem {
  description: string;
  hsnSacCode: string;
  quantity: number;
  unitValue: number;
  discount: number;
  taxableValue: number;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  igstRate: number;
  igstAmount: number;
}

export interface CreateInvoiceRequest {
  gstin: string;
  address: string;
  serialNo: string;
  date: string;
  panNo: string;
  cinNo: string;
  state: string;
  stateCode: string;
  billTo: PartyDetails;
  shipTo: PartyDetails;
  total: number;
  items: InvoiceItem[];
}

export interface Invoice extends CreateInvoiceRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
  shop_id: string;
}

export interface InvoiceResponse {
  success: boolean;
  message: string;
  data: Invoice;
}

export interface InvoicesListResponse {
  success: boolean;
  message: string;
  data: {
    invoices: Invoice[];
    pagination: {
      "total": number;
      "page": number;
      "limit": number;
      "total_pages": number;
    }
  }
}