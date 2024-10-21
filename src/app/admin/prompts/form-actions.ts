"use server";

import { db } from "@/db";
import { prompts } from "@/db/schema";
import { checkAdminAuth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { promptFormSchema } from "./form-schema";
import { z } from "zod";

export async function savePrompt(
  id: number | undefined,
  formData: z.infer<typeof promptFormSchema>,
) {
  if (!checkAdminAuth()) {
    throw new Error("Unauthorized");
  }

  const { success, data, error } = promptFormSchema.safeParse(formData);

  if (!success) {
    throw error.message;
  }

  if (id) {
    await db.update(prompts).set(data).where(eq(prompts.id, id));
  } else {
    const existingPrompts = await db
      .select({ id: prompts.id })
      .from(prompts)
      .where(eq(prompts.slug, data.slug));

    if (existingPrompts.length) {
      throw "Prompt with this slug already exists";
    }

    await db.insert(prompts).values(data);
  }

  redirect("/admin/prompts");
}

export async function deletePrompt(id: number) {
  if (!checkAdminAuth()) {
    throw new Error("Unauthorized");
  }

  await db.delete(prompts).where(eq(prompts.id, id));

  redirect("/admin/prompts");
}
