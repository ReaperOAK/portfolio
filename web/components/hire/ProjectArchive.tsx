'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import type { Project } from '@/lib/content/types'
import { Stage } from '@/components/Stage'
import s from './ProjectArchive.module.css'

export type DomainCategory = 'ALL' | 'AI' | 'SYSTEMS' | 'FULLSTACK' | 'CREATIVE'

interface CategoryDef {
  id: DomainCategory
  label: string
}

const CATEGORIES: CategoryDef[] = [
  { id: 'ALL', label: 'All Projects' },
  { id: 'AI', label: 'AI & Agents' },
  { id: 'SYSTEMS', label: 'Systems & Security' },
  { id: 'FULLSTACK', label: 'Full-Stack' },
  { id: 'CREATIVE', label: 'Creative & Tools' },
]

function getProjectDomain(p: Project): DomainCategory {
  const stack = p.stack.map(s => s.toLowerCase())
  const slug = p.slug.toLowerCase()
  const text = `${slug} ${p.title.toLowerCase()} ${p.tagline.toLowerCase()} ${stack.join(' ')}`

  if (
    text.includes('agent') ||
    text.includes('rag') ||
    text.includes('llm') ||
    text.includes('gemma') ||
    text.includes('autosolve') ||
    text.includes('faceless') ||
    text.includes('sign language') ||
    text.includes('claimswarm') ||
    text.includes('sniper') ||
    stack.some(s => s.includes('fastapi') || s.includes('langchain') || s.includes('pytorch') || s.includes('llama'))
  ) {
    return 'AI'
  }

  if (
    slug.includes('hackin') ||
    slug.includes('airlock') ||
    slug.includes('forge') ||
    slug.includes('sih') ||
    slug.includes('vmn') ||
    slug.includes('backtest') ||
    slug.includes('job-hunt') ||
    stack.some(s => s.includes('docker') || s.includes('gvisor') || s.includes('ed25519') || s.includes('c++') || s.includes('linux'))
  ) {
    return 'SYSTEMS'
  }

  if (
    slug.includes('chess') ||
    slug.includes('farewell') ||
    slug.includes('linearecta') ||
    slug.includes('vibe') ||
    slug.includes('weather') ||
    slug.includes('spotify') ||
    slug.includes('simon') ||
    slug.includes('nav') ||
    slug.includes('script')
  ) {
    return 'CREATIVE'
  }

  return 'FULLSTACK'
}

interface ProjectArchiveProps {
  projects: Project[]
}

export function ProjectArchive({ projects }: ProjectArchiveProps) {
  const [activeCategory, setActiveCategory] = useState<DomainCategory>('ALL')
  const [query, setQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault()
        searchInputRef.current?.focus()
      } else if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        setQuery('')
        searchInputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const categoryCounts = useMemo(() => {
    const counts: Record<DomainCategory, number> = {
      ALL: projects.length,
      AI: 0,
      SYSTEMS: 0,
      FULLSTACK: 0,
      CREATIVE: 0,
    }
    for (const p of projects) {
      const d = getProjectDomain(p)
      counts[d]++
    }
    return counts
  }, [projects])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter(p => {
      // Category filter
      if (activeCategory !== 'ALL' && getProjectDomain(p) !== activeCategory) {
        return false
      }
      // Search query filter
      if (!q) return true
      const inTitle = p.title.toLowerCase().includes(q)
      const inTagline = p.tagline.toLowerCase().includes(q)
      const inSlug = p.slug.toLowerCase().includes(q)
      const inStack = p.stack.some(s => s.toLowerCase().includes(q))
      return inTitle || inTagline || inSlug || inStack
    })
  }, [projects, activeCategory, query])

  const handleReset = () => {
    setActiveCategory('ALL')
    setQuery('')
  }

  return (
    <div className={s.wrapper}>
      {/* Control Bar: Categories & Search */}
      <div className={s.controls} role="search" aria-label="Project filter radar">
        <div className={s.categories} role="tablist" aria-label="Project categories">
          {CATEGORIES.map(cat => {
            const count = categoryCounts[cat.id]
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                className={`${s.tab} ${isActive ? s.tabActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className={s.tabCount}>{count}</span>
              </button>
            )
          })}
        </div>

        <div className={s.searchBox}>
          <svg
            className={s.searchIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={searchInputRef}
            type="text"
            className={s.searchInput}
            placeholder="Search projects by keyword or tech stack..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Filter projects by technology or capability"
            spellCheck={false}
          />
          {query ? (
            <button
              type="button"
              className={s.clearBtn}
              onClick={() => setQuery('')}
              aria-label="Clear search input"
            >
              ×
            </button>
          ) : (
            <span className={s.keyHint} title="Press / to search" aria-hidden="true">
              /
            </span>
          )}
        </div>
      </div>

      {/* Meta Stats Counter */}
      <div className={s.statsBar}>
        <span className={s.statsText}>
          Showing <strong className={s.statsNum}>{filtered.length}</strong> of{' '}
          <span className={s.statsNum}>{projects.length}</span> projects
        </span>
        {(activeCategory !== 'ALL' || query) && (
          <button type="button" className={s.resetLink} onClick={handleReset}>
            Reset filters
          </button>
        )}
      </div>

      {/* Project Render Stage or Empty State */}
      {filtered.length > 0 ? (
        <Stage kind="project" records={filtered} />
      ) : (
        <div className={s.emptyState} role="status" aria-live="polite">
          <div className={s.emptyIcon} aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
          <h3 className={s.emptyTitle}>No matching projects found</h3>
          <p className={s.emptyDesc}>
            No case studies matched &ldquo;{query}&rdquo; in category &ldquo;
            {CATEGORIES.find(c => c.id === activeCategory)?.label}&rdquo;.
          </p>
          <button type="button" className={s.emptyBtn} onClick={handleReset}>
            Reset filters & show all projects
          </button>
        </div>
      )}
    </div>
  )
}
