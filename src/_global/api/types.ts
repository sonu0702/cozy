export enum InvoiceType {
  INVOICE = 'INVOICE',
  PURCHASE = 'PURCHASE',
  QUOTATION = 'QUOTATION'
}

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
  legal_name?: string;
  digital_signature?: string;
  gstin?: string | null;
  pan?: string | null;
  address?: string;
  cin?: string | null;
  state?: string;
  state_code?: string;
  pin?: string;
  is_default?: boolean;
  bank_detail?: {
    bank_name?: string;
    account_number?: string;
    IFSC_code?: string;
    account_holder_name?: string;
  };
  owned_by?: User;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateShopRequest {
  name: string;
  legal_name?: string;
  digital_signature?: string;
  gstin?: string | null;
  pan?: string | null;
  address?: string;
  cin?: string | null;
  state?: string;
  state_code?: string;
  pin?: string;
  bank_detail?: {
    bank_name?: string;
    account_number?: string;
    IFSC_code?: string;
    account_holder_name?: string;
  };
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
  shop_legal_name: string;
  billTo: PartyDetails;
  shipTo: PartyDetails;
  total: number;
  items: InvoiceItem[];
  bank_detail?: {
    bank_name?: string;
    account_number?: string;
    IFSC_code?: string;
    account_holder_name?: string;
  };
  type?: InvoiceType;
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

export interface billToAddresses {
  name: string,
  gstin: string,
  state: string,
  address: string,
  stateCode: string
}


export interface BillToAddressesListResponse {
  success: boolean;
  message: string;
  data: billToAddresses[];
}

export interface shipToAddresses {
  name: string,
  gstin: string,
  state: string,
  address: string,
  stateCode: string
}

export interface ShipToAddressesListResponse {
  success: boolean;
  message: string;
  data: shipToAddresses[];
}

export interface searchProductList {
  id: string,
  name: string,
  price: number
  hsn: string,
  category: string,
  cgst: number,
  sgst: number,
  igst: number,
  discount_percent: number,
  createdAt: Date,
  updatedAt: Date
}

export interface SearchProductListResponse {
  success: boolean;
  message: string;
  data: searchProductList[];
}

export interface DailySalesResponse {
  success: boolean;
  message: string;
  data: {
    total: number
  }
}

export interface YearlySalesResponse {
  success: boolean;
  message: string;
  data: {
    total: number
  }
}

export interface ProductsCountResponse {
  success: boolean;
  message: string;
  data: {
    count: number
  }
}

export interface NetIncomeResponse {
  success: boolean;
  message: string;
  data: {
    total: number
  }
}

export interface Product {
  id?: string,
  name: string,
  price: number
  hsn: string,
  category: string,
  cgst: number,
  sgst: number,
  igst: number,
  discount_percent: number,
  createdAt?: Date,
  updatedAt?: Date
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: Product;
}