import fs from 'node:fs'
import path from 'node:path'
import { loadProjects, loadPoems } from '../load'

const CONTENT = path.join(process.cwd(), 'content')
// Same list the pre-push hook uses; kept in one place so neither file matches itself.
const NDA = new RegExp(fs.readFileSync(path.join(process.cwd(), '..', '.githooks', 'nda-terms'), 'utf8').trim(), 'i')

test('every real project file parses', async () => {
  expect((await loadProjects()).length).toBeGreaterThan(20)
})

test('every real poem file parses', async () => {
  await expect(loadPoems()).resolves.toBeInstanceOf(Array)
})

test('NDA projects carry no decisions or devlogs in source', async () => {
  for (const p of (await loadProjects()).filter(x => x.nda)) {
    expect(p.decisions).toEqual([])
    expect(p.devlogs).toEqual([])
  }
})

// Employment NDA: the repo is public. Fail the suite before a product name or wrong title ships.
test('no content file names employer products or uses the wrong title', () => {
  const files = fs.readdirSync(CONTENT, { recursive: true, withFileTypes: true })
    .filter(d => d.isFile()).map(d => path.join(d.parentPath, d.name))
  for (const f of files) {
    expect(fs.readFileSync(f, 'utf8'), f).not.toMatch(NDA)
  }
})
