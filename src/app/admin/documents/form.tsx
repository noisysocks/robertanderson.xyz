"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { documents } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { saveDocument, deleteDocument } from "./form-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { documentFormSchema } from "./form-schema";

type DocumentFormProps = {
  document?: typeof documents.$inferSelect;
};

export function DocumentForm({ document }: DocumentFormProps) {
  const form = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: document,
  });

  const [serverError, setServerError] = useState<string | undefined>(undefined);

  const action: () => void = form.handleSubmit(async (data) => {
    try {
      await saveDocument(document?.id, data);
    } catch (error) {
      if (typeof error === "string") {
        setServerError(error);
      } else {
        throw error;
      }
    }
  });

  return (
    <>
      {serverError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form className="space-y-4" action={action}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={20} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button asChild variant="outline">
              <Link href="/admin/documents">Cancel</Link>
            </Button>
            {document && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="ml-auto">
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this document?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the document. This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className={buttonVariants({ variant: "destructive" })}
                      onClick={async () => {
                        await deleteDocument(document.id);
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
