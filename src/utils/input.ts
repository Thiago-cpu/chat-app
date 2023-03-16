import { z } from "zod";

export const infinityInput = z.object({
  limit: z.number().min(1).max(100).default(50),
  cursor: z.string().optional(), // <-- "cursor" needs to exist, but can be any type
  q: z.string().max(100).optional(),
});
