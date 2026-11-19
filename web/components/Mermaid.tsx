'use client'

import { useEffect, useState } from 'react'

interface MermaidProps {
  chart: string
}

export function Mermaid({ chart }: MermaidProps) {
  const [svg, setSvg] = useState<string>('')
  const [failed, setFailed] = useState<boolean>(false)

  useEffect(() => {
    let mounted = true
    const cleanChart = chart.trim()

    import('mermaid')
      .then(m => {
        m.default.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            darkMode: true,
            background: '#12191C',
            primaryColor: '#162228',
            primaryTextColor: '#E9EFEC',
            primaryBorderColor: '#4FD1C5',
            lineColor: '#4FD1C5',
            secondaryColor: '#0A0E10',
            tertiaryColor: '#1A242B',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          },
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
  }, [chart])

  if (failed || !svg) {
    return (
      <div
        style={{
          background: 'var(--u-bg2)',
          padding: '18px',
          borderRadius: '8px',
          border: '1px solid var(--u-line)',
          overflowX: 'auto',
          margin: '16px 0',
        }}
      >
        <pre
          style={{
            margin: 0,
            fontFamily: 'var(--u-mono)',
            fontSize: '12px',
            color: 'var(--u-dim)',
            lineHeight: 1.5,
          }}
        >
          {chart}
        </pre>
      </div>
    )
  }

  return (
    <div
      style={{
        background: 'var(--u-bg2)',
        padding: '24px 16px',
        borderRadius: '8px',
        border: '1px solid var(--u-line)',
        overflowX: 'auto',
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0',
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
