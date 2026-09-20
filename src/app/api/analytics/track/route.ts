import { NextResponse } from 'next/server';
import { 
  recordServerPageView, 
  recordServerClick, 
  DeviceType, 
  ClickCategory 
} from '../../../../lib/serverAnalyticsStore';

function parseDevice(ua: string, clientDevice?: DeviceType): DeviceType {
  if (clientDevice && ['mobile', 'tablet', 'desktop'].includes(clientDevice)) {
    return clientDevice;
  }
  const lowUa = (ua || '').toLowerCase();
  if (/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk)/i.test(lowUa)) {
    return 'tablet';
  }
  if (/(mobi|ipod|iphone|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec)/i.test(lowUa)) {
    return 'mobile';
  }
  return 'desktop';
}

function resolveLocation(req: Request, clientLoc?: string): string {
  const vercelCity = req.headers.get('x-vercel-ip-city');
  const vercelRegion = req.headers.get('x-vercel-ip-country-region');
  const vercelCountry = req.headers.get('x-vercel-ip-country');

  if (vercelCity && vercelCountry) {
    const cityName = decodeURIComponent(vercelCity);
    const countryName = vercelCountry === 'IN' ? 'India' : vercelCountry;
    return `${cityName}${vercelRegion ? `, ${vercelRegion}` : ''}, ${countryName}`;
  }

  if (clientLoc && clientLoc !== 'Online Visitor' && clientLoc !== 'Detected Visitor Location') {
    return clientLoc;
  }

  return 'Online Visitor';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ua = req.headers.get('user-agent') || '';
    const device = parseDevice(ua, body.device);
    const location = resolveLocation(req, body.location);
    const visitorId = body.visitorId || 'usr-anon';

    if (body.type === 'pageview') {
      const path = body.path || '/';
      const session = await recordServerPageView({
        path,
        visitorId,
        device,
        location,
        referrer: body.referrer || '',
        userAgent: ua ? ua.slice(0, 150) : '',
      });
      return NextResponse.json({ success: true, type: 'pageview', path, device, location, session });
    }

    if (body.type === 'click') {
      const click = await recordServerClick({
        elementText: body.elementText || 'Clicked Element',
        elementType: (body.elementType as ClickCategory) || 'button',
        pagePath: body.pagePath || '/',
        targetUrl: body.targetUrl,
        device,
        location,
        visitorId,
      });
      return NextResponse.json({ success: true, type: 'click', click });
    }

    return NextResponse.json({ error: 'Unknown event type' }, { status: 400 });
  } catch (error: any) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to track event' }, { status: 500 });
  }
}
