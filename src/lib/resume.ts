import fs from "fs";
import yaml from "js-yaml";
import { ResumeSchema } from "@/types/resume-schema";

export function getResume() {
  return yaml.load(
    fs.readFileSync("./src/data/resume/resume.yaml", "utf8"),
  ) as ResumeSchema;
}
