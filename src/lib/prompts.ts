import { db } from "@/db";
import { prompts } from "@/db/schema";
import { eq } from "drizzle-orm";

export class DuplicatePromptError extends Error {}

export async function createPrompt(data: typeof prompts.$inferInsert) {
  const existingPrompts = await db
    .select({ id: prompts.id })
    .from(prompts)
    .where(eq(prompts.slug, data.slug));

  if (existingPrompts.length) {
    throw new DuplicatePromptError("Prompt with this slug already exists");
  }

  await db.insert(prompts).values(data);
}

export async function updatePrompt(
  id: number,
  data: typeof prompts.$inferInsert,
) {
  await db.update(prompts).set(data).where(eq(prompts.id, id));
}

export async function deletePrompt(id: number) {
  await db.delete(prompts).where(eq(prompts.id, id));
}

export async function getPrompt(slug: string) {
  return await db.query.prompts.findFirst({ where: eq(prompts.slug, slug) });
}
