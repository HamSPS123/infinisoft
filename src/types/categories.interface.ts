import { z } from "zod";

export interface Category {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export const categoryFormSchema = z.object({
    name: z.string().min(1, 'Name is required').max(200, 'Name must be less than 200 characters'),
    description: z.string().min(1, 'Description is required'),
    isActive: z.boolean(),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;
