import { z } from 'zod'

export const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
})

export const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  stack: z.array(z.string()).default([]),
  role: z.string().default(''),
  period: z.string().default(''),
  metrics: z.array(metricSchema).default([]),
  decisions: z.array(z.string()).default([]),
  devlogs: z.array(z.string()).default([]),
  links: z
    .object({
      github: z.string().optional(),
      live: z.string().optional(),
    })
    .default({}),
  /** Path under /public: a real screenshot of the live system, or a photograph for NDA work. */
  cover: z.string().optional(),
  body: z.string().default(''),
  /** When true, decisions and devlogs are stripped at load. Shape, not specifics. */
  nda: z.boolean().default(false),
})

/** Mood is required: poems fill loading states, empty states and transitions,
 *  and the site picks one that fits the moment rather than one at random. */
export const poemSchema = z.object({
  slug: z.string().min(1),
  lang: z.enum(['roman-urdu', 'devanagari', 'english']),
  script: z.enum(['latin', 'devanagari', 'nastaliq']),
  mood: z.enum(['hopeful', 'heartbreak', 'philosophical', 'restless', 'still']),
  tags: z.array(z.string()).default([]),
  date: z.string().optional(),
  linkedProject: z.string().optional(),
  body: z.string().min(1),
})

export const timelineEntrySchema = z.object({
  year: z.string(),
  title: z.string(),
  body: z.string(),
})

export const personaSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional(),
})
