import { z } from "zod";
import { UserRole } from "../stores/authTypes";

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name must be less than 200 characters'),
  email: z.string().email('Invalid email format'),
  role: z.nativeEnum(UserRole, { 
    errorMap: () => ({ message: 'Please select a valid role' }) 
  }),
});

export type UserSchemaType = z.infer<typeof userSchema>;
