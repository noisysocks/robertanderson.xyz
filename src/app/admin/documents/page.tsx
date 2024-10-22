import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { sql } from "drizzle-orm";
import { Pencil, Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Robert Anderson · Admin · Documents",
};

export default async function DocumentsPage() {
  const rows = await db
    .select({
      id: documents.id,
      content: sql<string>`
        CASE
          WHEN LENGTH(${documents.content}) > 200
          THEN SUBSTR(${documents.content}, 0, 200) || '...'
          ELSE ${documents.content}
        END
      `,
    })
    .from(documents);

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
            <BreadcrumbPage>Documents</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold">Documents</h1>
      <Button asChild className="absolute right-4 top-4">
        <Link href="/admin/documents/new">
          <Plus />
          <span>New document</span>
        </Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">Content</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!rows.length && (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                There are no documents.
              </TableCell>
            </TableRow>
          )}
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="w-full">{row.content}</TableCell>
              <TableCell className="flex gap-1">
                <Button asChild variant="outline">
                  <Link href={`/admin/documents/${row.id}`}>
                    <Pencil />
                    <span>Edit</span>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
