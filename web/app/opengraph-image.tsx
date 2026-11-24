import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0b10',
          padding: '72px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#f4f6fa',
          position: 'relative',
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)',
          }}
        />

        {/* Top Header: Badge and Domain */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 18px',
              borderRadius: '999px',
              background: 'rgba(0, 229, 255, 0.1)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              color: '#00e5ff',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            <span>●</span>
            <span>AVAILABLE FOR SENIOR ROLES &amp; AI ARCHITECTURE</span>
          </div>

          <div
            style={{
              fontSize: '20px',
              color: '#8b94a5',
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            portfolio.owaiskhan.website
          </div>
        </div>

        {/* Center Title & Positioning */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}
          >
            Owais Ahmed Khan
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#a0aec0',
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: '900px',
            }}
          >
            Senior Developer &amp; Systems Architect. High-throughput distributed backends, autonomous agent swarms, and adversarial AI sandboxing.
          </div>
        </div>

        {/* Bottom Spec Grid */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Projects</span>
            <span style={{ fontSize: '24px', fontWeight: 700, color: '#f4f6fa' }}>44 Production Systems</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Core Stack</span>
            <span style={{ fontSize: '24px', fontWeight: 700, color: '#00e5ff' }}>Python · TypeScript · Distributed Systems</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Alumni</span>
            <span style={{ fontSize: '24px', fontWeight: 700, color: '#f4f6fa' }}>STCET Kolkata</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
