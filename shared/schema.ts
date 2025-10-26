import { z } from "zod";

export const questionSchema = z.object({
  id: z.string(),
  text: z.string(),
  category: z.string(),
  sampleResponse: z.string(),
});

export type Question = z.infer<typeof questionSchema>;
