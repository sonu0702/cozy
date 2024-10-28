import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  code: z.string().min(1, "Product code is required")
    .regex(/^#\d{4}$/, "Code must be in format #0000"),
  type: z.string().min(1, "Product type is required"),
  price: z.number()
    .min(0.01, "Price must be greater than 0")
    .max(999999.99, "Price must be less than 1,000,000"),
  quantity: z.number()
    .int("Quantity must be a whole number")
    .min(0, "Quantity cannot be negative")
});

export type ProductFormData = z.infer<typeof productSchema>;