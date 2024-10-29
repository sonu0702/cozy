import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  email: z.string().email("Invalid email format"),
  contact: z.string({message:'Invalid contact'}),
  address: z.string({message:'Invalid address'}),
});

export type SupplierFormData = z.infer<typeof supplierSchema>;