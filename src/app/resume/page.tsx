import yaml from "js-yaml";
import fs from "fs";
import { ResumeSchema } from "@/types/resume-schema";
import { Fragment } from "react";
import Markdown from "react-markdown";

export default function Resume() {
  const data = yaml.load(
    fs.readFileSync("./src/data/resume/resume.yaml", "utf8"),
  ) as ResumeSchema;
  return (
    <div className="text-lg font-light text-pretty screen:max-w-[80ch] screen:mx-auto screen:p-4 print:text-xs print:mx-10 print:my-5">
      <Header basics={data.basics} />
      <main>
        <Experience work={data.work} />
        <Skills skills={data.skills} />
        <Education education={data.education} />
      </main>
    </div>
  );
}

function Header({ basics }: { basics: ResumeSchema["basics"] }) {
  if (!basics) return null;
  return (
    <header className="flex items-baseline flex-wrap gap-4 justify-between my-4">
      {basics.name && <h1 className="text-2xl font-black">{basics.name}</h1>}
      <p>
        {basics.profiles?.map((profile, index) => (
          <Fragment key={profile.network}>
            <a className="text-primary underline" href={profile.url}>
              {profile.network}
            </a>
            {index < basics.profiles!.length - 1 && <span>·</span>}
          </Fragment>
        ))}
        <span>·</span>
        {basics.url && (
          <a className="text-primary underline" href={basics.url}>
            Website
          </a>
        )}
        <span>·</span>
        {basics.email && (
          <a className="text-primary underline" href={`mailto:${basics.email}`}>
            {basics.email}
          </a>
        )}
      </p>
    </header>
  );
}

function Experience({ work }: { work: ResumeSchema["work"] }) {
  if (!work) return null;
  return (
    <section>
      <h2 className="my-4 font-bold">Experience</h2>
      {work.map((job, index) => (
        <article key={index}>
          <header className="flex items-baseline flex-wrap gap-4 justify-between my-4">
            <h3 className="font-medium">
              {job.name} · {job.position}
            </h3>
            <p>
              {job.startDate}–{job.endDate} · {job.location}
            </p>
          </header>
          <Markdown className="my-4 prose-lg leading-7 prose-a:text-primary prose-a:underline">
            {job.description}
          </Markdown>
          {job.highlights && (
            <ul className="pl-4">
              {job.highlights.map((highlight, i) => (
                <li key={i} className="list-middot">
                  <Markdown className="prose-lg leading-7 prose-p:my-0 prose-ul:my-0 prose-li:my-0 prose-ul:pl-4 prose-li:pl-0 prose-li:list-middot prose-a:text-primary prose-a:underline">
                    {highlight}
                  </Markdown>
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </section>
  );
}

function Skills({ skills }: { skills: ResumeSchema["skills"] }) {
  if (!skills) return null;
  return (
    <section>
      <h2 className="my-4 font-bold">Skills</h2>
      <p className="text-justify">
        {skills.map((skill, index) => (
          <Fragment key={index}>
            {skill.name}
            {index < skills.length - 1 && <span>·</span>}
          </Fragment>
        ))}
      </p>
    </section>
  );
}

function Education({ education }: { education: ResumeSchema["education"] }) {
  if (!education) return null;
  return (
    <section>
      <h2 className="my-4 font-bold">Education</h2>
      <ul>
        {education.map((edu, index) => (
          <li key={index}>
            {edu.institution} · {edu.studyType} {edu.area} · {edu.endDate}
          </li>
        ))}
      </ul>
    </section>
  );
}
