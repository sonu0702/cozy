import axios from 'axios';
import { RegisterRequest, LoginRequest, AuthResponse, UpdateShopRequest, ShopResponse, ShopsListResponse, CreateInvoiceRequest, InvoiceResponse, InvoicesListResponse, billToAddresses, BillToAddressesListResponse, shipToAddresses, ShipToAddressesListResponse, searchProductList, SearchProductListResponse, DailySalesResponse, YearlySalesResponse, ProductsCountResponse, NetIncomeResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth') 
      ? JSON.parse(localStorage.getItem('auth')!).token 
      : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data
      localStorage.removeItem('auth');
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const register = async (username: string, password: string): Promise<AuthResponse> => {
  const data: RegisterRequest = { username, password };
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const data: LoginRequest = { username, password };
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error(error.response.data.message || 'Invalid credentials');
      }
      throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
};

// Shop APIs
export const listShops = async (): Promise<ShopsListResponse> => {
  const response = await api.get<ShopsListResponse>('/shops');
  return response.data;
};

export const setDefaultSop = async(shopId:string) => {
  const response = await api.put(`/shops/${shopId}/default`);
  return response.data
}

export const getShopDetails = async (shopId: string): Promise<ShopResponse> => {
  const response = await api.get<ShopResponse>(`/shops/${shopId}`);
  return response.data;
};

export const updateShop = async (shopId: string, data: UpdateShopRequest): Promise<ShopResponse> => {
  const response = await api.put<ShopResponse>(`/shops/${shopId}`, data);
  return response.data;
};

// Invoice APIs
export const createInvoice = async (shopId:string, data: CreateInvoiceRequest): Promise<InvoiceResponse> => {
  const response = await api.post<InvoiceResponse>(`/shops/${shopId}/invoices`, data);
  return response.data;
};

export const getInvoice = async (invoiceId: string): Promise<InvoiceResponse> => {
  const response = await api.get<InvoiceResponse>(`/invoices/${invoiceId}`);
  return response.data;
};

export const updateInvoice = async (invoiceId: string, data: CreateInvoiceRequest): Promise<InvoiceResponse> => {
  const response = await api.put<InvoiceResponse>(`/invoices/${invoiceId}`, data);
  return response.data;
};

export const deleteInvoice = async (invoiceId: string): Promise<void> => {
  await api.delete(`/invoices/${invoiceId}`);
};

export const listInvoices = async (shopId:string, page:number, limit:number): Promise<InvoicesListResponse> => {
  const response = await api.get<InvoicesListResponse>(`/shops/${shopId}/invoices`);
  return response.data;
};

export const generatePdf = async (invoiceId: string): Promise<Blob> => {
  const response = await api.get(`/invoices/${invoiceId}/pdf`, { responseType: 'blob' });
  return response.data;
};

export const billToAddressesSearch = async (shopId:string,name:string): Promise<billToAddresses[]> => {
  const response = await api.get<BillToAddressesListResponse>(`invoices/search/bill-to/${shopId}?name=${name}`);
  return response.data.data as billToAddresses[];
} 

export const shipToAddressesSearch = async (shopId:string,name:string): Promise<shipToAddresses[]> => {
  const response = await api.get<ShipToAddressesListResponse>(`invoices/search/ship-to/${shopId}?name=${name}`);
  return response.data.data as shipToAddresses[];
} 

export const productListSearchDescription = async (shopId:string,query:string): Promise<searchProductList[]> => {
  const response = await api.get<SearchProductListResponse>(`shops/${shopId}/products/search?query=${query}`);
  return response.data.data as searchProductList[];
} 

export const dailySalesAnalytics = async (shopId:string): Promise<DailySalesResponse> => {
  const response = await api.get<DailySalesResponse>(`shops/${shopId}/analytics/today-sales`);
  return response.data as DailySalesResponse;
} 

export const yearlySalesAnalytics = async (shopId:string): Promise<YearlySalesResponse> => {
  const response = await api.get<YearlySalesResponse>(`shops/${shopId}/analytics/yearly-sales`);
  return response.data as YearlySalesResponse;
} 

export const productCountAnalytics = async (shopId:string): Promise<ProductsCountResponse> => {
  const response = await api.get<ProductsCountResponse>(`shops/${shopId}/analytics/product-count`);
  return response.data as ProductsCountResponse;
} 

export const netIncomeAnalytics = async (shopId:string): Promise<NetIncomeResponse> => {
  const response = await api.get<NetIncomeResponse>(`shops/${shopId}/analytics/net-income`);
  return response.data as NetIncomeResponse;
} 

export default api;