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
  return p ? { title: `${p.title}, by Owais Ahmed Khan`, description: p.tagline } : {}
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
    // If the child is a mermaid code block, unwrap it so Mermaid handles the frame
    if (
      React.isValidElement(children) &&
      (children.props as any)?.className === 'language-mermaid'
    ) {
      return children as React.ReactElement
    }
    return <pre className={s.pre} {...props}>{children}</pre>
  },
}

// ponytail: one neutral layout styled only through tokens. Universe-specific case studies are sub-project B.
export default async function Project({ params }: Props) {
  const p = await loadProject((await params).slug)
  if (!p) notFound()
  return (
    <Entry lens="work" universe={defaultUniverseFor('/hire')}>
    <Page>
      <p><Link href="/hire" className={s.back}>← All work</Link></p>
      <Hero eyebrow={`[ ${p.role} ] ${p.period}`} title={p.title} line={p.tagline} chips={p.stack} />
      {p.body && (
        <Section id="about" title="What it is">
          <div className={s.markdownWrap}>
            <MDXRemote source={p.body} components={mdxComponents} />
          </div>
        </Section>
      )}
      {p.decisions.length > 0 && (
        <Section id="decisions" title="Decisions">
          <ul className={s.list}>{p.decisions.map(d => <li key={d}>{d}</li>)}</ul>
        </Section>
      )}
      {p.devlogs.length > 0 && (
        <Section id="log" title="Build log">
          <ol className={s.list}>{p.devlogs.map(d => <li key={d}>{d}</li>)}</ol>
        </Section>
      )}
      {(p.links.github || p.links.live) && (
        <div className={s.links}>
          {p.links.live && <a href={p.links.live} target="_blank" rel="noopener noreferrer">Live site ↗</a>}
          {p.links.github && <a href={p.links.github} target="_blank" rel="noopener noreferrer">Source ↗</a>}
        </div>
      )}
    </Page>
    </Entry>
  )
}
