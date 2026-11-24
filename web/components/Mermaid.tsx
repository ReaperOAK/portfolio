'use client'

import { useEffect, useState } from 'react'
import { useUniverse } from './Entry'
import s from './Mermaid.module.css'

interface MermaidProps {
  chart: string
}

export function Mermaid({ chart }: MermaidProps) {
  const universe = useUniverse()
  const [svg, setSvg] = useState<string>('')
  const [failed, setFailed] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'diagram' | 'code'>('diagram')
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    let mounted = true
    const cleanChart = chart.trim()

    const isNightride = universe === 'nightride'
    const themeVariables = isNightride
      ? {
          darkMode: true,
          background: '#100F14',
          primaryColor: '#17161E',
          primaryTextColor: '#F5EFE6',
          primaryBorderColor: '#FF8A3D',
          lineColor: '#FF8A3D',
          secondaryColor: '#07070A',
          tertiaryColor: '#201F2A',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }
      : {
          darkMode: true,
          background: '#12191C',
          primaryColor: '#162228',
          primaryTextColor: '#E9EFEC',
          primaryBorderColor: '#4FD1C5',
          lineColor: '#4FD1C5',
          secondaryColor: '#0A0E10',
          tertiaryColor: '#1A242B',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }

    import('mermaid')
      .then(m => {
        m.default.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables,
          securityLevel: 'loose',
        })

        const id = 'mermaid-' + Math.random().toString(36).substring(2, 9)
        return m.default.render(id, cleanChart)
      })
      .then(({ svg: renderedSvg }) => {
        if (mounted) {
          setSvg(renderedSvg)
        }
      })
      .catch(err => {
        console.warn('Mermaid rendering fallback:', err)
        if (mounted) {
          setFailed(true)
        }
      })

    return () => {
      mounted = false
    }
  }, [chart, universe])

  const handleCopy = () => {
    navigator.clipboard.writeText(chart.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Handle escape key to close fullscreen
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isFullscreen])

  return (
    <div className={s.container}>
      {/* Top Toolbar */}
      <div className={s.toolbar}>
        <div className={s.tabs} role="tablist" aria-label="Mermaid view mode">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'diagram'}
            className={`${s.tab} ${activeTab === 'diagram' ? s.tabActive : ''}`}
            onClick={() => setActiveTab('diagram')}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            <span>Architecture Diagram</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'code'}
            className={`${s.tab} ${activeTab === 'code' ? s.tabActive : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span>Mermaid Source</span>
          </button>
        </div>

        <div className={s.actions}>
          <button
            type="button"
            className={s.actionBtn}
            onClick={handleCopy}
            title="Copy Mermaid source code"
            aria-label={copied ? 'Code copied' : 'Copy Mermaid source code'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          {activeTab === 'diagram' && svg && !failed && (
            <button
              type="button"
              className={s.actionBtn}
              onClick={() => {
                setIsFullscreen(true)
                setZoom(1)
              }}
              title="Inspect architecture diagram in fullscreen"
              aria-label="Inspect architecture diagram in fullscreen"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
              <span>Fullscreen</span>
            </button>
          )}
        </div>
      </div>

      {/* Viewport Content */}
      {activeTab === 'diagram' && !failed && svg ? (
        <div className={s.viewport} dangerouslySetInnerHTML={{ __html: svg }} />
      ) : activeTab === 'diagram' && (failed || !svg) ? (
        <pre className={s.codeView}>{chart}</pre>
      ) : (
        <pre className={s.codeView}>{chart}</pre>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && svg && (
        <div className={s.modalOverlay} role="dialog" aria-modal="true" aria-label="Architecture Diagram Fullscreen View">
          <div className={s.modalHeader}>
            <div className={s.modalTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
              <span>Architecture Blueprint · Fullscreen Inspector</span>
            </div>
            <div className={s.modalControls}>
              <button
                type="button"
                className={s.actionBtn}
                onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
                aria-label="Zoom out"
              >
                − Zoom
              </button>
              <button
                type="button"
                className={s.actionBtn}
                onClick={() => setZoom(1)}
                aria-label="Reset zoom"
              >
                Reset ({Math.round(zoom * 100)}%)
              </button>
              <button
                type="button"
                className={s.actionBtn}
                onClick={() => setZoom(z => Math.min(3, z + 0.25))}
                aria-label="Zoom in"
              >
                + Zoom
              </button>
              <button
                type="button"
                className={s.actionBtn}
                onClick={() => setIsFullscreen(false)}
                aria-label="Close fullscreen view"
              >
                ✕ Close
              </button>
            </div>
          </div>
          <div className={s.modalBody}>
            <div
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
