import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const documents = pgTable("documents", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  content: text().notNull(),
});

export const prompts = pgTable("prompts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  prompt: text().notNull(),
});
