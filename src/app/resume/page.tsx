import { ResumeSchema } from "@/types/resume-schema";
import fs from "fs";
import yaml from "js-yaml";
import { Fragment } from "react";
import Markdown from "react-markdown";
import { Toolbar } from "./toolbar";

export default function Resume() {
  const data = yaml.load(
    fs.readFileSync("./src/data/resume/resume.yaml", "utf8"),
  ) as ResumeSchema;
  return (
    <>
      <Toolbar />
      <div className="text-pretty text-lg font-light screen:mx-auto screen:max-w-[80ch] screen:p-4 screen:pb-[76px] screen:lg:pb-4 print:text-xs">
        <Header basics={data.basics} />
        <main>
          <Experience work={data.work} />
          <Skills skills={data.skills} />
          <Education education={data.education} />
        </main>
      </div>
    </>
  );
}

function Header({ basics }: { basics: ResumeSchema["basics"] }) {
  if (!basics) return null;
  return (
    <header className="my-4 flex flex-wrap items-baseline justify-between gap-4">
      <h1 className="text-2xl font-black">{basics.name}</h1>
      <p>
        {basics.profiles?.map((profile) => (
          <Fragment key={profile.network}>
            <a className="text-primary underline" href={profile.url}>
              {profile.network}
            </a>
            <DotSeparator />
          </Fragment>
        ))}
        <a className="text-primary underline" href={basics.url}>
          Website
        </a>
        <DotSeparator />
        <a className="text-primary underline" href={`mailto:${basics.email}`}>
          {basics.email}
        </a>
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
          <header className="my-4 flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="font-medium">
              {job.name}
              <DotSeparator />
              {job.position}
            </h3>
            <p>
              {job.startDate}&ndash;{job.endDate}
              <DotSeparator />
              {job.location}
            </p>
          </header>
          <Markdown className="[&_a]:text-primary [&_a]:underline [&_p]:my-4">
            {job.description}
          </Markdown>
          <ul className="my-4 pl-4">
            {job.highlights?.map((highlight, i) => (
              <li key={i} className="list-middot">
                <Markdown className="[&_li]:list-middot [&_a]:text-primary [&_a]:underline [&_ul]:pl-4">
                  {highlight}
                </Markdown>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}

function Skills({ skills }: { skills: ResumeSchema["skills"] }) {
  if (!skills?.length) return null;
  return (
    <section>
      <h2 className="my-4 font-bold">Skills</h2>
      <p className="text-justify">
        {skills.map((skill, index) => (
          <Fragment key={index}>
            {skill.name}
            {index < skills.length - 1 && <DotSeparator />}
          </Fragment>
        ))}
      </p>
    </section>
  );
}

function Education({ education }: { education: ResumeSchema["education"] }) {
  if (!education?.length) return null;
  return (
    <section>
      <h2 className="my-4 font-bold">Education</h2>
      <ul>
        {education.map((edu, index) => (
          <li key={index}>
            {edu.institution}
            <DotSeparator />
            {edu.studyType} {edu.area}
            <DotSeparator />
            {edu.endDate}
          </li>
        ))}
      </ul>
    </section>
  );
}

function DotSeparator() {
  return <>&nbsp;&middot; </>;
}
