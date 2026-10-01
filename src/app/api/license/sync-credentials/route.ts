import { NextRequest, NextResponse } from 'next/server';
import { pingSchoolLicense } from '@/lib/schoolLicenseStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'School Client PC';

    if (!body.licenseKey || !body.machineId) {
      return NextResponse.json({ ok: false, error: 'Missing licenseKey or machineId' }, { status: 400 });
    }

    const result = pingSchoolLicense({
      licenseKey: body.licenseKey,
      machineId: body.machineId,
      currentUsername: body.currentUsername || body.username,
      currentPassword: body.currentPassword || body.password,
      recoveryEmail: body.recoveryEmail,
      usersCount: body.usersCount,
      usersList: body.usersList,
      appVersion: body.appVersion,
      ip,
    });

    if (!result.ok) {
      return NextResponse.json(result, { status: 403 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Internal server error processing credential sync' },
      { status: 500 }
    );
  }
}
