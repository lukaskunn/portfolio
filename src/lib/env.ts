import { z } from 'zod';

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
});

export const env = envSchema.parse(process.env);