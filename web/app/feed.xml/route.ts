import { loadProjects } from '@/lib/content/load'

export const dynamic = 'force-static'

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}

export async function GET() {
  const projects = await loadProjects()
  const siteUrl = 'https://portfolio.owaiskhan.website'
  const buildDate = new Date().toUTCString()

  const itemsXml = projects.map(p => `    <item>
      <title>${escapeXml(`${p.title}: ${p.tagline}`)}</title>
      <link>${siteUrl}/work/${p.slug}</link>
      <guid isPermaLink="true">${siteUrl}/work/${p.slug}</guid>
      <pubDate>${buildDate}</pubDate>
      <description>${escapeXml(p.tagline)}</description>
      <category>${escapeXml(p.stack.join(', ') || 'Software Engineering')}</category>
    </item>`).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Owais Ahmed Khan — AI Systems &amp; Software Engineering Portfolio</title>
    <link>${siteUrl}</link>
    <description>Production AI architectures, distributed platforms, autonomous agents, and systems engineering case studies by Owais Ahmed Khan.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  })
}
