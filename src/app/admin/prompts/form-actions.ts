"use server";

import { checkAdminAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { promptFormSchema } from "./form-schema";
import { z } from "zod";
import {
  createPrompt,
  updatePrompt,
  deletePrompt as _deletePrompt,
} from "@/lib/prompts";

export async function savePrompt(
  id: number | undefined,
  formData: z.infer<typeof promptFormSchema>,
) {
  if (!checkAdminAuth()) {
    throw new Error("Unauthorized");
  }

  const data = promptFormSchema.parse(formData);

  if (id) {
    await updatePrompt(id, data);
  } else {
    await createPrompt(data);
  }

  redirect("/admin/prompts");
}

export async function deletePrompt(id: number) {
  if (!checkAdminAuth()) {
    throw new Error("Unauthorized");
  }

  await _deletePrompt(id);

  redirect("/admin/prompts");
}
