import Image from "next/image";
import avatar from "./images/avatar.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-grid">
      <Image
        className="rounded-full border border-border"
        src={avatar}
        alt="Picture of Robert Anderson"
        width={200}
        height={200}
      />
      <h1 className="text-5xl text-accent font-black">Robert Anderson</h1>
      <p className="flex flex-row gap-2">
        <a
          href="https://www.linkedin.com/in/robert-anderson/"
          className="px-4 py-2 bg-bg border border-border rounded hover:text-accent hover:border-accent transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/noisysocks"
          className="px-4 py-2 bg-bg border border-border rounded hover:text-accent hover:border-accent transition-colors"
        >
          GitHub
        </a>
        <a
          href="mailto:robert@robertanderson.xyz"
          className="px-4 py-2 bg-bg border border-border rounded hover:text-accent hover:border-accent transition-colors"
        >
          Email
        </a>
      </p>
    </div>
  );
}
