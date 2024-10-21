import { prompts } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const promptFormSchema = createInsertSchema(prompts)
  .omit({ id: true })
  .extend({
    slug: z.string().min(1),
    prompt: z.string().min(1),
  });
