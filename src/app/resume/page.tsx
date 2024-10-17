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
    <div>
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
    <header>
      {basics.name && <h1>{basics.name}</h1>}
      <p>
        {basics.profiles?.map((profile, index) => (
          <Fragment key={profile.network}>
            <a href={profile.url}>{profile.network}</a>
            {index < basics.profiles!.length - 1 && <span>·</span>}
          </Fragment>
        ))}
        <span>·</span>
        {basics.url && <a href={basics.url}>Website</a>}
        <span>·</span>
        {basics.email && <a href={`mailto:${basics.email}`}>{basics.email}</a>}
      </p>
    </header>
  );
}

function Experience({ work }: { work: ResumeSchema["work"] }) {
  if (!work) return null;
  return (
    <section>
      <h2>Experience</h2>
      {work.map((job, index) => (
        <article key={index}>
          <header>
            <h3>
              {job.name} · {job.position}
            </h3>
            <p>
              {job.startDate}–{job.endDate} · {job.location}
            </p>
          </header>
          <p>
            <Markdown>{job.description}</Markdown>
          </p>
          {job.highlights && (
            <ul>
              {job.highlights.map((highlight, i) => (
                <li key={i}>
                  <Markdown>{highlight}</Markdown>
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
      <h2>Skills</h2>
      <p>
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
      <h2>Education</h2>
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
