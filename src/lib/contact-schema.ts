import { z } from "zod";

// Shared by the client form and /api/contact (single source of truth).
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
  // Honeypot: accepted by the schema (so parsing succeeds) but the
  // route silently 200s without sending when it's filled — a hard
  // schema reject would tip off bots with a 400.
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
