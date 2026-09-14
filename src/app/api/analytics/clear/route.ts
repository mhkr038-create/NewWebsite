import { NextResponse } from 'next/server';
import { clearServerAnalytics } from '../../../../lib/serverAnalyticsStore';

export async function POST() {
  try {
    await clearServerAnalytics();
    return NextResponse.json({ success: true, message: 'All server telemetry has been cleared to 0.' });
  } catch (error: any) {
    console.error('Failed to clear analytics:', error);
    return NextResponse.json({ error: error?.message || 'Failed to clear server analytics' }, { status: 500 });
  }
}
