import { z } from "zod";

// Client-side validation for the contact form (single source of truth).
export const STAGES = [
  "diagnosing",
  "implementing",
  "second-opinion",
  "other",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  org: z.string().min(2).max(160),
  role: z.string().min(2).max(120),
  stage: z.enum(STAGES),
  message: z.string().min(10).max(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;
