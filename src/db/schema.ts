import { index, integer, pgTable, text, vector } from "drizzle-orm/pg-core";

export const documents = pgTable(
  "documents",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    content: text().notNull(),
    embedding: vector({ dimensions: 1024 }).notNull(),
  },
  (table) => ({
    embedding_index: index().using(
      "hnsw",
      table.embedding.op("vector_cosine_ops"),
    ),
  }),
);

export const prompts = pgTable("prompts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  prompt: text().notNull(),
});
