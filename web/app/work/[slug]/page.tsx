import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { loadProject, loadProjects } from '@/lib/content/load'
import { Entry } from '@/components/Entry'
import { defaultUniverseFor } from '@/lib/universe/css'
import { Page, Hero, Section } from '@/components/Page'
import { Mermaid } from '@/components/Mermaid'
import s from './page.module.css'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
  return (await loadProjects()).map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await loadProject((await params).slug)
  if (!p) return {}
  const videoPoster = `/media/brags/${p.slug}.jpg`
  return {
    title: `${p.title} | Case Study by Owais Ahmed Khan`,
    description: `${p.role}: ${p.tagline}`,
    keywords: [
      p.title,
      ...p.stack,
      'Owais Ahmed Khan',
      'ReaperOAK',
      'Software Architecture',
      'Case Study',
    ],
    openGraph: {
      title: `${p.title} | Owais Ahmed Khan`,
      description: p.tagline,
      type: 'article',
      url: `https://portfolio.owaiskhan.website/work/${p.slug}`,
      images: [
        {
          url: videoPoster,
          width: 1920,
          height: 1080,
          alt: `${p.title} Launch Poster`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.title} | Owais Ahmed Khan`,
      description: p.tagline,
      images: [videoPoster],
    },
  }
}

const extractText = (node: any): string => {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && node.props && node.props.children) {
    return extractText(node.props.children)
  }
  return String(node || '')
}

const mdxComponents = {
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={s.h3} {...props}>{children}</h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className={s.h4} {...props}>{children}</h4>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={s.paragraph} {...props}>{children}</p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={s.bodyList} {...props}>{children}</ul>
  ),
  li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className={s.bodyListItem} {...props}>{children}</li>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={s.strong} {...props}>{children}</strong>
  ),
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    if (className === 'language-mermaid') {
      return <Mermaid chart={extractText(children)} />
    }
    return <code className={className ? undefined : s.inlineCode} {...props}>{children}</code>
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    if (
      React.isValidElement(children) &&
      (children.props as any)?.className === 'language-mermaid'
    ) {
      return children as React.ReactElement
    }
    return <pre className={s.pre} {...props}>{children}</pre>
  },
  LaunchVideo: ({ src, poster, title }: { src: string; poster?: string; title?: string }) => (
    <div className={s.videoChassis}>
      {title && (
        <div className={s.videoHeader}>
          <div className={s.videoTitleBar}>
            <span className={s.videoIcon} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </span>
            <span>{title}</span>
          </div>
          <span className={s.videoMetaBadge}>1080p 30fps · Hyperframes</span>
        </div>
      )}
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className={s.videoElement}
      />
    </div>
  ),
}

export default async function Project({ params }: Props) {
  const p = await loadProject((await params).slug)
  if (!p) notFound()

  // SEO JSON-LD: BreadcrumbList + VideoObject + TechArticle
  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://portfolio.owaiskhan.website',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Work',
            'item': 'https://portfolio.owaiskhan.website/hire',
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': p.title,
            'item': `https://portfolio.owaiskhan.website/work/${p.slug}`,
          },
        ],
      },
      {
        '@type': 'TechArticle',
        '@id': `https://portfolio.owaiskhan.website/work/${p.slug}#article`,
        'headline': `${p.title}: ${p.tagline}`,
        'description': p.tagline,
        'author': {
          '@type': 'Person',
          'name': 'Owais Ahmed Khan',
          'url': 'https://portfolio.owaiskhan.website',
        },
        'publisher': {
          '@type': 'Person',
          'name': 'Owais Ahmed Khan',
        },
        'url': `https://portfolio.owaiskhan.website/work/${p.slug}`,
        'keywords': p.stack.join(', '),
      },
      {
        '@type': 'VideoObject',
        '@id': `https://portfolio.owaiskhan.website/work/${p.slug}#video`,
        'name': `${p.title} — Architectural Walkthrough & Launch Video`,
        'description': `20-second technical launch video and architectural teardown for ${p.title}: ${p.tagline}`,
        'thumbnailUrl': [`https://portfolio.owaiskhan.website/media/brags/${p.slug}.jpg`],
        'contentUrl': `https://portfolio.owaiskhan.website/media/brags/${p.slug}.mp4`,
        'uploadDate': '2026-11-24T00:00:00Z',
        'duration': 'PT20S',
        'inLanguage': 'en',
      },
    ],
  }

  return (
    <Entry lens="work" universe={defaultUniverseFor('/hire')}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <Page>
        <nav className={s.backNav} aria-label="Breadcrumb navigation">
          <Link href="/hire" className={s.back}>
            <span aria-hidden="true">←</span>
            <span>All Case Studies</span>
          </Link>
        </nav>

        <Hero
          eyebrow={`[ ${p.role} ] · ${p.period}`}
          title={p.title}
          line={p.tagline}
          chips={p.stack}
        />

        {p.metrics.length > 0 && (
          <div className={s.metricsGrid} role="region" aria-label="Key Performance Indicators">
            {p.metrics.map((m, i) => (
              <div key={i} className={s.metricCard}>
                <span className={s.metricVal}>{m.value}</span>
                <span className={s.metricLbl}>{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {(p.links.github || p.links.live) && (
          <div className={s.links} role="group" aria-label="External Project Links">
            {p.links.live && (
              <a href={p.links.live} target="_blank" rel="noopener noreferrer" className={s.linkBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                <span>Live Deployment ↗</span>
              </a>
            )}
            {p.links.github && (
              <a href={p.links.github} target="_blank" rel="noopener noreferrer" className={s.linkBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>Source Repository ↗</span>
              </a>
            )}
          </div>
        )}

        {p.body && (
          <Section id="about" title="Engineering Architecture & Teardown">
            <div className={s.markdownWrap}>
              <MDXRemote source={p.body} components={mdxComponents} />
            </div>
          </Section>
        )}

        {p.decisions.length > 0 && (
          <Section id="decisions" title="Architectural Decisions">
            <ul className={s.decisionsList}>
              {p.decisions.map((d, i) => (
                <li key={i} className={s.decisionItem}>
                  <svg className={s.decisionCheck} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {p.devlogs.length > 0 && (
          <Section id="log" title="Build & Incident Log">
            <ol className={s.devlogsList}>
              {p.devlogs.map((d, i) => (
                <li key={i} className={s.devlogItem}>{d}</li>
              ))}
            </ol>
          </Section>
        )}
      </Page>
    </Entry>
  )
}
