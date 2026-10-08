import 'server-only'
import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import type { z } from 'zod'
import { projectSchema, poemSchema } from './schema'
import type { Project, Poem } from './types'

const CONTENT = path.join(process.cwd(), 'content')

async function readDir(dir: string, ext: string) {
  const names = (await fs.readdir(dir)).filter(n => n.endsWith(ext)).sort()
  return Promise.all(
    names.map(async name => ({ name, ...matter(await fs.readFile(path.join(dir, name), 'utf8')) })),
  )
}

/** Fails the build naming the file and field, instead of rendering a broken page. */
function parse<T>(schema: z.ZodType<T>, file: string, data: unknown): T {
  const r = schema.safeParse(data)
  if (r.success) return r.data
  const issue = r.error.issues[0]
  throw new Error(`${file}: ${issue?.path.join('.')} — ${issue?.message}`)
}

/** Defense in depth only: the repo is public, so NDA detail must never be in source files at all. */
export function applyNda(p: Project): Project {
  return p.nda ? { ...p, decisions: [], devlogs: [] } : p
}

export async function loadProjects(dir = path.join(CONTENT, 'projects')): Promise<Project[]> {
  const files = await readDir(dir, '.mdx')
  return files.map(f => applyNda(parse(projectSchema, f.name, { ...f.data, body: f.content.trim() })))
}

export async function loadProject(slug: string): Promise<Project | undefined> {
  return (await loadProjects()).find(p => p.slug === slug)
}

export async function loadPoems(dir = path.join(CONTENT, 'poems')): Promise<Poem[]> {
  const files = await readDir(dir, '.md')
  return files.map(f => parse(poemSchema, f.name, { ...f.data, body: f.content.trim() }))
}
