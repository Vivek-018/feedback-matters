import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content must be at least of 10 characters" })
    .max(300, { message: "no longer than 300 charcters" }),
});
