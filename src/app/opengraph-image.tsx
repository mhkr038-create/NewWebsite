import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '../config/siteConfig';

export const alt = 'Digital Simple Solution - Digital Marketing & AI Automation';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#030712',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow Effects */}
        <div
          style={{
            position: 'absolute',
            top: '-150px',
            right: '-100px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(3, 7, 18, 0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-100px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(3, 7, 18, 0) 70%)',
          }}
        />

        {/* Top Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.35)',
              color: '#38bdf8',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Digital Studio &amp; AI Automation
          </div>
        </div>

        {/* Center Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-2px',
              lineHeight: 1.1,
            }}
          >
            {SITE_CONFIG.brandName}
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 400,
              color: '#94a3b8',
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            High-converting landing pages, targeted Google &amp; Meta ads, and WhatsApp automation workflows.
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #1e293b',
            paddingTop: '32px',
          }}
        >
          <div
            style={{
              fontSize: '22px',
              fontWeight: 600,
              color: '#818cf8',
            }}
          >
            digitalsimplesolution.com
          </div>
          <div
            style={{
              fontSize: '18px',
              color: '#64748b',
            }}
          >
            Growth Systems • Paid Ads • WhatsApp API
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
