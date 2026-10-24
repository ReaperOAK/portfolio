import { projectSchema } from '@/lib/content/schema'
import type { Project } from '@/lib/content/types'

/** A valid Project with schema defaults applied; override only what a test cares about. */
export const makeProject = (o: Partial<Project> & Pick<Project, 'slug' | 'title'>): Project =>
  projectSchema.parse({ tagline: `${o.title} tagline.`, ...o })
