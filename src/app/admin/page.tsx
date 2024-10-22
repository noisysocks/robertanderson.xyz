import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Robert Anderson · Admin",
};

export default function AdminPage() {
  return redirect("/admin/documents");
}
