import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { loadProjects, loadPoems } from '../load'

const CONTENT = path.join(process.cwd(), 'content')
// The protected-term list is NOT committed (a public list would itself publish the words). CI gets it from the NDA_TERMS
// secret; local runs and the pre-push hook read ~/.config/nda-guard/terms.
function ndaTerms(): string | null {
  if (process.env.NDA_TERMS?.trim()) return process.env.NDA_TERMS.trim()
  try { return fs.readFileSync(path.join(os.homedir(), '.config', 'nda-guard', 'terms'), 'utf8').trim() } catch { return null }
}
const terms = ndaTerms()
if (process.env.CI && !terms) throw new Error('NDA_TERMS secret is missing in CI: refusing to run the suite without the NDA check')
const NDA = terms ? new RegExp(terms, 'i') : null

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
test.skipIf(!NDA)('no content file names employer products or uses the wrong title', () => {
  const files = fs.readdirSync(CONTENT, { recursive: true, withFileTypes: true })
    .filter(d => d.isFile()).map(d => path.join(d.parentPath, d.name))
  for (const f of files) {
    expect(fs.readFileSync(f, 'utf8'), f).not.toMatch(NDA as RegExp)
  }
})
