import { NextRequest, NextResponse } from 'next/server';
import { getUpdatesConfig } from '../../../../lib/schoolLicenseStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const version = searchParams.get('version') || '1.0.0';
    const config = getUpdatesConfig(version);
    return NextResponse.json(config);
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || 'Error checking updates' },
      { status: 500 }
    );
  }
}
