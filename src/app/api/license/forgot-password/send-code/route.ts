import { NextRequest, NextResponse } from 'next/server';
import { requestPasswordResetCode } from '../../../../../lib/schoolLicenseStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Client Desktop App';
    const { licenseKey, email } = body;

    if (!email) {
      return NextResponse.json(
        { ok: false, error: 'Recovery email address is required.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const result = await requestPasswordResetCode({
      licenseKey,
      email,
      ip,
    });

    if (!result.ok) {
      return NextResponse.json(result, { status: 400, headers: corsHeaders });
    }

    return NextResponse.json(result, { status: 200, headers: corsHeaders });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Error sending recovery code' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      service: 'SchoolMIS Forgot Password Request OTP Endpoint',
      method: 'POST',
      fields: ['email', 'licenseKey (optional)'],
    },
    { headers: corsHeaders }
  );
}
