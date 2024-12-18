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
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
}): Promise<Metadata> {
  const { id } = await params;

  const prompt = await db.query.prompts.findFirst({
    where: eq(prompts.id, id),
  });

  return {
    title: `Robert Anderson · Admin · Prompts · Edit ${prompt?.slug}`,
  };
}

export default async function EditPromptPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const prompt = await db.query.prompts.findFirst({
    where: eq(prompts.id, id),
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
