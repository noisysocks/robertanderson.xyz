"use server";

import { checkAdminAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { documentFormSchema } from "./form-schema";
import { z } from "zod";
import {
  createDocument,
  updateDocument,
  deleteDocument as _deleteDocument,
} from "@/lib/documents";

export async function saveDocument(
  id: number | undefined,
  formData: z.infer<typeof documentFormSchema>,
) {
  if (!checkAdminAuth()) {
    throw new Error("Unauthorized");
  }

  const data = documentFormSchema.parse(formData);

  if (id) {
    await updateDocument(id, data);
  } else {
    await createDocument(data);
  }

  redirect("/admin/documents");
}

export async function deleteDocument(id: number) {
  if (!checkAdminAuth()) {
    throw new Error("Unauthorized");
  }

  await _deleteDocument(id);

  redirect("/admin/documents");
}
