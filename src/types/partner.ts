import { z } from 'zod';

// Partner entity type
export interface Partner {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  content?: string;
  website?: string;
  contactInfo?: Record<string, string | number | boolean | null>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  products?: Array<{id: string; name: string}>;
}

// Response types
export interface PartnerListResponse {
  partners: Partner[];
}

export interface PartnerResponse {
  partner: Partner;
}

// DTO types for create/update operations
export type CreatePartnerDto = Omit<Partner, 'id' | 'createdAt' | 'updatedAt' | 'products'>;
export type UpdatePartnerDto = Partial<CreatePartnerDto>;

// Zod schema for partner form validation
export const partnerFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name must be less than 200 characters'),
  logo: z.string().max(255, 'Logo URL must be less than 255 characters').optional(),
  description: z.string().min(1, 'Description is required'),
  content: z.string().optional(),
  website: z.string().max(255, 'Website URL must be less than 255 characters')
    .url('Invalid URL format').optional(),
  contactInfo: z.record(z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
  isActive: z.boolean(),
});

// Type for form data based on the Zod schema
export type PartnerFormData = z.infer<typeof partnerFormSchema>;