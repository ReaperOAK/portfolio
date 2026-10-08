import type { z } from 'zod'
import type {
  projectSchema,
  poemSchema,
  timelineEntrySchema,
  personaSchema,
} from './schema'

export type Project = z.infer<typeof projectSchema>
export type Poem = z.infer<typeof poemSchema>
export type TimelineEntry = z.infer<typeof timelineEntrySchema>
export type Persona = z.infer<typeof personaSchema>

export type ContentKind = 'project' | 'poem' | 'timelineEntry' | 'persona'

export type ContentRecord = Project | Poem | TimelineEntry | Persona

export type RecordFor<K extends ContentKind> = K extends 'project'
  ? Project
  : K extends 'poem'
    ? Poem
    : K extends 'timelineEntry'
      ? TimelineEntry
      : Persona
