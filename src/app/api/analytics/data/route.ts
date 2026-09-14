import { NextResponse } from 'next/server';
import { getServerAnalyticsSummary } from '../../../../lib/serverAnalyticsStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const summary = await getServerAnalyticsSummary();
    return NextResponse.json(summary, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error: any) {
    console.error('Failed to fetch analytics summary:', error);
    return NextResponse.json({ error: error?.message || 'Failed to fetch analytics' }, { status: 500 });
  }
}
