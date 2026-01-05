import { z } from "zod";

export interface Customer {
    id: string;
    name: string;
    logo: string;
    description: string;
    website: string;
    isActive: boolean;
    galleries: string[];
    zipCode: string;
    country: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export const customerSchema = z.object({
    name: z.string().min(1, 'Name is required').max(200, 'Name must be less than 200 characters'),
    logo: z.string().max(255, 'Logo URL must be less than 255 characters').optional(),
    description: z.string().min(1, 'Description is required'),
    website: z.string().url('Invalid URL format').optional(),
    galleries: z.array(z.string()).optional(),
}); 

export type CustomerSchemaType = z.infer<typeof customerSchema>;