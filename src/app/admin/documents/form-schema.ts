import { documents } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const documentFormSchema = createInsertSchema(documents)
  .omit({ id: true })
  .extend({
    content: z.string().min(1),
  });
