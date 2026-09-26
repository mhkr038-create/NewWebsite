import { NextResponse } from 'next/server';
import { 
  getGoogleSearchConsoleSummary, 
  saveGSCConfig, 
  loadGSCConfig, 
  testGSCConnection 
} from '../../../../lib/googleSearchConsoleStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const range = (searchParams.get('range') || '28d') as '7d' | '28d' | '90d';

    const summary = await getGoogleSearchConsoleSummary(range);
    return NextResponse.json(summary, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error: any) {
    console.error('Failed to load Google Search Console analytics:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch Search Console data' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const action = body.action || 'save_config';

    if (action === 'test_connection') {
      const result = await testGSCConnection();
      return NextResponse.json(result);
    }

    if (action === 'add_keyword') {
      const kw = (body.keyword || '').trim();
      if (!kw) {
        return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
      }
      const current = loadGSCConfig();
      if (!current.targetKeywords.includes(kw.toLowerCase())) {
        saveGSCConfig({
          targetKeywords: [...current.targetKeywords, kw.toLowerCase()],
        });
      }
      return NextResponse.json({ success: true, message: `Added "${kw}" to target keywords.` });
    }

    if (action === 'remove_keyword') {
      const kw = (body.keyword || '').trim().toLowerCase();
      const current = loadGSCConfig();
      saveGSCConfig({
        targetKeywords: current.targetKeywords.filter((k) => k !== kw),
      });
      return NextResponse.json({ success: true, message: `Removed "${kw}" from target keywords.` });
    }

    if (action === 'save_config') {
      const updated = saveGSCConfig({
        siteUrl: body.siteUrl,
        clientEmail: body.clientEmail,
        privateKey: body.privateKey,
        apiKey: body.apiKey,
        targetKeywords: body.targetKeywords,
      });

      return NextResponse.json({
        success: true,
        message: 'Google Search Console configuration saved successfully.',
        config: {
          siteUrl: updated.siteUrl,
          clientEmail: updated.clientEmail,
          targetKeywords: updated.targetKeywords,
          hasPrivateKey: !!updated.privateKey,
        },
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    console.error('Error handling Google Search Console request:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
