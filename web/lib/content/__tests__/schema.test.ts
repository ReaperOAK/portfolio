import { projectSchema, poemSchema } from '../schema'

const validProject = {
  slug: 'ticketvault',
  title: 'TicketVault',
  tagline: 'NFT ticketing with gasless mint and offline verification.',
  stack: ['Aptos', 'Move'],
  role: 'Lead, team of 3',
  period: '2025',
  metrics: [{ value: '3', label: 'dApps shipped' }],
  decisions: ['A relayer sponsors every on-chain operation.'],
  devlogs: [],
  links: {},
  nda: true,
}

test('accepts a valid project', () => {
  expect(projectSchema.parse(validProject).slug).toBe('ticketvault')
})

test('rejects a project with no slug', () => {
  const { slug: _slug, ...rest } = validProject
  expect(() => projectSchema.parse(rest)).toThrow()
})

test('nda defaults to false when absent', () => {
  const { nda: _nda, ...rest } = validProject
  expect(projectSchema.parse(rest).nda).toBe(false)
})

test('poem requires a mood so transitions can select by fit', () => {
  expect(() =>
    poemSchema.parse({
      slug: 'x',
      lang: 'roman-urdu',
      script: 'latin',
      body: 'x',
      tags: [],
    }),
  ).toThrow()
})

test('accepts a valid poem', () => {
  const poem = poemSchema.parse({
    slug: 'mantiq',
    lang: 'roman-urdu',
    script: 'latin',
    mood: 'philosophical',
    body: 'Jab mantiq haar jaata hai',
  })
  expect(poem.mood).toBe('philosophical')
  expect(poem.tags).toEqual([])
})
