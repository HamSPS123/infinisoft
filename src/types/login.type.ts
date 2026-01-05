import * as z from 'zod'

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type LoginSchema = z.infer<typeof loginSchema>