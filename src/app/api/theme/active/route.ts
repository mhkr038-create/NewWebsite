import { NextResponse } from 'next/server';
import { getActiveTheme, getActiveThemeId } from '../../../../lib/themeStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const activeTheme = getActiveTheme();
    const activeThemeId = getActiveThemeId();

    return NextResponse.json({
      ok: true,
      activeThemeId,
      activeTheme,
      serverTime: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Error fetching active theme' },
      { status: 500 }
    );
  }
}
