import * as z from "zod";

export const sendMailSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export type SendMailType = z.infer<typeof sendMailSchema>;
