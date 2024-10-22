import resume from "@/data/resume/resume.yaml";
import { ResumeSchema } from "@/types/resume-schema";

export function getResume() {
  return resume as ResumeSchema;
}
