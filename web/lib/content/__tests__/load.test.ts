import path from 'node:path'
import { loadProjects, applyNda } from '../load'
import { makeProject } from '@/test/fixtures'

const FIXTURES = path.join(__dirname, 'fixtures')

const base = makeProject({ slug: 'x', title: 'X', decisions: ['detail'], devlogs: ['detail'] })

test('loads and validates a good project file', async () => {
  const [p] = await loadProjects(path.join(FIXTURES, 'good'))
  expect(p?.title).toBe('TicketVault')
  expect(p?.decisions).toHaveLength(1)
})

test('names the file and field when validation fails', async () => {
  await expect(loadProjects(path.join(FIXTURES, 'bad'))).rejects.toThrow(/bad\.mdx: title/)
})

test('applyNda strips decisions and devlogs', () => {
  const out = applyNda({ ...base, nda: true })
  expect(out.decisions).toEqual([])
  expect(out.devlogs).toEqual([])
})

test('applyNda leaves non-NDA projects untouched', () => {
  expect(applyNda(base).decisions).toEqual(['detail'])
})

test('keeps the MDX body as plain text', async () => {
  const [p] = await loadProjects(path.join(FIXTURES, 'good'))
  expect(p?.body).toBe('Body copy.')
})
