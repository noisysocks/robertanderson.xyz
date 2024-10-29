import { db } from "@/db";
import { DocumentForm } from "../form";
import { eq } from "drizzle-orm";
import { documents } from "@/db/schema";
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

export const metadata: Metadata = {
  title: "Robert Anderson · Admin · Prompts · Edit document",
};

export default async function EditDocumentPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const document = await db.query.documents.findFirst({
    where: eq(documents.id, id),
  });

  if (!document) {
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
              <Link href="/admin/documents">Documents</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit document</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold">Edit document</h1>
      <DocumentForm document={document} />
    </>
  );
}
