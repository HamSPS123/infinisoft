import { z } from 'zod';

// Zod schema for login validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Type inference from the schema
export type LoginCredentials = z.infer<typeof loginSchema>;

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  isFirstLogin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// API response type
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// Refresh token response
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}
