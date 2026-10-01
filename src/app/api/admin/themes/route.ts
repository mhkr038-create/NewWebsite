import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllThemes, 
  getActiveThemeId, 
  setActiveTheme, 
  saveTheme, 
  deleteTheme, 
  resetThemesToDefault 
} from '../../../../lib/themeStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const themes = getAllThemes();
    const activeThemeId = getActiveThemeId();

    return NextResponse.json({
      ok: true,
      activeThemeId,
      themes,
      serverTime: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Error fetching themes' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action || 'set_active';

    if (action === 'set_active') {
      const { themeId } = body;
      if (!themeId) {
        return NextResponse.json({ ok: false, error: 'themeId is required' }, { status: 400 });
      }
      const res = setActiveTheme(themeId);
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: res.error }, { status: 400 });
      }
      return NextResponse.json({ ok: true, activeThemeId: res.activeThemeId });
    }

    if (action === 'save_theme') {
      const { theme, activateNow } = body;
      if (!theme) {
        return NextResponse.json({ ok: false, error: 'theme data is required' }, { status: 400 });
      }
      const res = saveTheme(theme);
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: res.error }, { status: 400 });
      }

      if (activateNow) {
        setActiveTheme(res.theme.id);
      }

      return NextResponse.json({ 
        ok: true, 
        theme: res.theme, 
        activeThemeId: getActiveThemeId(),
        themes: getAllThemes() 
      });
    }

    if (action === 'delete_theme') {
      const { themeId } = body;
      if (!themeId) {
        return NextResponse.json({ ok: false, error: 'themeId is required' }, { status: 400 });
      }
      const res = deleteTheme(themeId);
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: res.error }, { status: 400 });
      }
      return NextResponse.json({ 
        ok: true, 
        activeThemeId: getActiveThemeId(),
        themes: getAllThemes() 
      });
    }

    if (action === 'reset_defaults') {
      const state = resetThemesToDefault();
      return NextResponse.json({ 
        ok: true, 
        activeThemeId: state.activeThemeId,
        themes: state.themes 
      });
    }

    return NextResponse.json({ ok: false, error: `Unknown action: ${action}` }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Error processing theme action' },
      { status: 500 }
    );
  }
}
