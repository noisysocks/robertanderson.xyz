import Image from "next/image";
import avatar from "./images/avatar.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-grid flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <Image
        className="rounded-full border border-border"
        src={avatar}
        alt="Picture of Robert Anderson"
        width={200}
        height={200}
      />
      <h1 className="font-serif text-5xl font-black text-primary">
        Robert Anderson
      </h1>
      <p className="flex flex-row gap-2">
        <Button asChild variant="outline">
          <a href="https://www.linkedin.com/in/robert-anderson/">LinkedIn</a>
        </Button>
        <Button asChild variant="outline">
          <a href="https://github.com/noisysocks">GitHub</a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/resume">Resume</Link>
        </Button>
        <Button asChild variant="outline">
          <a href="mailto:robert@robertanderson.xyz">Email</a>
        </Button>
      </p>
    </div>
  );
}
