import { ImageResponse } from 'next/og'
export const runtime = 'edge'
export const alt = 'Muhammad Ali Ahmad - Full Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#0a0e27', color: '#e2e8f0', padding: '80px', borderLeft: '12px solid #0ea5e9' }}><div style={{ fontSize: 22, color: '#38bdf8', marginBottom: 30 }}>WEB APPLICATIONS / BUSINESS PLATFORMS / AUTOMATION</div><div style={{ fontSize: 70, fontWeight: 700, marginBottom: 22 }}>Muhammad Ali Ahmad</div><div style={{ fontSize: 38, color: '#38bdf8', marginBottom: 45 }}>Full Stack Developer</div><div style={{ fontSize: 24, color: '#94a3b8' }}>Explore selected work, discuss a role, or start a project.</div></div>, size)
}
