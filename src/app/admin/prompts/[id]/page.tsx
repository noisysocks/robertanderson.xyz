import { db } from "@/db";
import { PromptForm } from "../form";
import { eq } from "drizzle-orm";
import { prompts } from "@/db/schema";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default async function EditPromptPage({
  params,
}: {
  params: { id: number };
}) {
  const prompt = await db.query.prompts.findFirst({
    where: eq(prompts.id, params.id),
  });

  if (!prompt) {
    notFound();
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Admin</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/prompts">Prompts</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit {prompt.slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold">Edit {prompt.slug}</h1>
      <PromptForm prompt={prompt} />
    </>
  );
}
