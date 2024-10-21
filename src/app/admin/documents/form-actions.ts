"use server";

import { db } from "@/db";
import { documents } from "@/db/schema";
import { checkAdminAuth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { redirect } from "next/navigation";
import { documentFormSchema } from "./form-schema";
import { z } from "zod";

const schema = createInsertSchema(documents).omit({ id: true });

export async function saveDocument(
  id: number | undefined,
  formData: z.infer<typeof documentFormSchema>,
) {
  if (!checkAdminAuth()) {
    throw new Error("Unauthorized");
  }

  const { success, data, error } = schema.safeParse(formData);

  if (!success) {
    throw error.message;
  }

  if (id) {
    await db.update(documents).set(data).where(eq(documents.id, id));
  } else {
    await db.insert(documents).values(data);
  }

  redirect("/admin/documents");
}

export async function deleteDocument(id: number) {
  if (!checkAdminAuth()) {
    throw new Error("Unauthorized");
  }

  await db.delete(documents).where(eq(documents.id, id));

  redirect("/admin/documents");
}
