import { z } from "zod";

// Doesn't work because createInsertSchema seems to not like the vector type.
// export const documentFormSchema = createInsertSchema(documents)
//   .omit({ id: true, embedding: true })
//   .extend({
//     content: z.string().min(1),
//   });

export const documentFormSchema = z.object({
  content: z.string().min(1),
});
