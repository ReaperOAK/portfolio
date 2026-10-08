import { REGISTERED, UNIVERSES } from './registry'
import type { TokenSet } from './types'
import type { UniverseId } from '@/lib/store'

export const CSS_VAR: Record<keyof TokenSet, string> = {
  bg: '--u-bg', bg2: '--u-bg2', fg: '--u-fg', dim: '--u-dim',
  accent: '--u-accent', accent2: '--u-accent2', line: '--u-line',
  radius: '--u-radius', tracking: '--u-tracking',
  display: '--u-display', body: '--u-body', mono: '--u-mono',
  displayWeight: '--u-display-weight', displayStretch: '--u-display-stretch',
}

/** Every shipped universe's tokens as `:root[data-universe=…]` rules, so the server can paint any of them. */
export function universeCss(): string {
  return REGISTERED.map(id => {
    const t = UNIVERSES[id].tokens
    const decls = (Object.keys(CSS_VAR) as (keyof TokenSet)[]).map(k => `${CSS_VAR[k]}:${t[k]}`).join(';')
    return `:root[data-universe="${id}"]{${decls}}`
  }).join('\n')
}

/** The universe a route opens in for someone who has never chosen one. */
export const ROUTE_UNIVERSE: Record<string, UniverseId> = { '/soul': 'nightride' }
export const defaultUniverseFor = (pathname: string): UniverseId => ROUTE_UNIVERSE[pathname] ?? 'blueprint'

/** Runs before first paint: a persisted choice wins, else the route default. Mirrors store.enter(). */
export function bootScript(): string {
  return `(function(){try{var ok=${JSON.stringify(REGISTERED)},r=${JSON.stringify(ROUTE_UNIVERSE)};` +
    `var u=localStorage.getItem('site:universe');` +
    `document.documentElement.dataset.universe=ok.indexOf(u)>=0?u:(r[location.pathname]||'blueprint')}` +
    `catch(e){document.documentElement.dataset.universe='blueprint'}})()`
}
