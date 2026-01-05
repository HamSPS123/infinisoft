import type { Category } from "./categories.interface";
import type { Partner } from "./partner";
import { z } from "zod";


export interface Product {
  id: string;
  name: string;
  model: string;
  brand: string;
  sku: string;
  description?: string;
  content?: string;
  tags?: string[];
  image?: string;
  productGalleries?: string[];
  specifications?: Array<{title: string; value: string | boolean | number}>;
  category?: Category;
  categoryId?: string;
  partner?: Partner;
  partnerId?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}


export const productFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name must be less than 200 characters'),
  model: z.string().min(1, 'Model is required').max(200, 'Model must be less than 200 characters'),
  brand: z.string().min(1, 'Brand is required').max(200, 'Brand must be less than 200 characters'),
  sku: z.string().min(1, 'SKU is required').max(200, 'SKU must be less than 200 characters'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().max(255, 'Image URL must be less than 255 characters').optional(),
  productGalleries: z.array(z.string()).optional(),
  specifications: z.array(z.object({
    title: z.string(),
    value: z.union([z.string(), z.boolean(), z.number()])
  })).optional(),
  isActive: z.boolean(),
  categoryId: z.string().min(1, 'Category is required'),
  partnerId: z.string().min(1, 'Partner is required'),
});

export type ProductFormData = z.infer<typeof productFormSchema>;