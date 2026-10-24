'use client'
import { useUniverse } from './Entry'
import { useSite } from '@/lib/store'
import { resolve } from '@/lib/universe/registry'
import type { ContentKind, RecordFor } from '@/lib/content/types'
import type { Renderer } from '@/lib/universe/types'

/** Picks the active universe's renderer for this content kind. Content comes in from the server untouched. */
export function Stage<K extends ContentKind>({ kind, records }: { kind: K; records: RecordFor<K>[] }) {
  const universe = useUniverse()
  const lens = useSite(s => s.lens)
  const R = resolve(universe).renderers[kind] as Renderer<K>
  return <R records={records} lens={lens} />
}
