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
import { prompts } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { savePrompt, deletePrompt } from "./form-actions";
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
import { Input } from "@/components/ui/input";
import { promptFormSchema } from "./form-schema";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { DuplicatePromptError } from "@/lib/prompts";

type PromptFormProps = {
  prompt?: typeof prompts.$inferSelect;
};

export function PromptForm({ prompt }: PromptFormProps) {
  const form = useForm<z.infer<typeof promptFormSchema>>({
    resolver: zodResolver(promptFormSchema),
    defaultValues: prompt,
  });

  const [serverError, setServerError] = useState<Error | undefined>();

  const action: () => void = form.handleSubmit(async (data) => {
    try {
      await savePrompt(prompt?.id, data);
    } catch (error) {
      if (error instanceof DuplicatePromptError) {
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
          <AlertDescription>{serverError.message}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form className="space-y-4" action={action}>
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={10} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button asChild variant="outline">
              <Link href="/admin/prompts">Cancel</Link>
            </Button>
            {prompt && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="ml-auto">
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete {prompt.slug}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the prompt. This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className={buttonVariants({ variant: "destructive" })}
                      onClick={async () => {
                        await deletePrompt(prompt.id);
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
