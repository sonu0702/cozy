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

export interface Address {
  name: string;
  address: string;
  state: string;
  stateCode: string;
  gstin: string;
}

export interface InvoiceData {
  gstin: string;
  address: string;
  serialNo: string;
  date: string;
  panNo: string;
  cinNo: string;
  state: string;
  stateCode: string;
  billTo: Address;
  shipTo: Address;
  total: number;
  items: InvoiceItem[];
}

export interface InvoiceResponse {
  success: boolean;
  message: string;
  data: InvoiceData & {
    id: string;
    created_at: string;
    updated_at: string;
    shop: {
      id: string;
      name: string;
      gstin: string;
      pan: string;
      address: string;
      cin: string;
      state: string;
      pin: string;
      createdAt: string;
      updatedAt: string;
      is_default: boolean;
    };
    created_by: {
      id: string;
      email: string | null;
      username: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}