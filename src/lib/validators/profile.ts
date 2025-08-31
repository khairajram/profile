import { z } from 'zod';

export const linksSchema = z.object({
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  portfolio: z.string().url().optional(),
  twitter: z.string().url().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  link: z.string().url().optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1),
  level: z.string().optional(),
});

export const workSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate:  z.coerce.date(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export const profileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  education: z.string(),
  about: z.string(),
  skills: z.array(z.string()),
  links: linksSchema.optional(),
  projects: z.array(projectSchema).optional(),
  work: z.array(workSchema).optional(),
  skill: z.array(skillSchema).optional(),
});
