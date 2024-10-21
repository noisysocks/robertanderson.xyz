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
import { prompts } from "@/db/schema";
import { sql } from "drizzle-orm";
import { Pencil, Plus } from "lucide-react";
import Link from "next/link";

export default async function PromptsPage() {
  const rows = await db
    .select({
      id: prompts.id,
      slug: prompts.slug,
      prompt: sql<string>`
        CASE
          WHEN LENGTH(${prompts.prompt}) > 200
          THEN SUBSTR(${prompts.prompt}, 0, 200) || '...'
          ELSE ${prompts.prompt}
        END
      `,
    })
    .from(prompts);

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
            <BreadcrumbPage>Prompts</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold">Prompts</h1>
      <Button asChild className="absolute right-4 top-4">
        <Link href="/admin/prompts/new">
          <Plus />
          <span>New prompt</span>
        </Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Slug</TableHead>
            <TableHead className="w-full">Prompt</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!rows.length && (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                There are no prompts.
              </TableCell>
            </TableRow>
          )}
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.slug}</TableCell>
              <TableCell className="w-full">{row.prompt}</TableCell>
              <TableCell className="flex gap-1">
                <Button asChild variant="outline">
                  <Link href={`/admin/prompts/${row.id}`}>
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
