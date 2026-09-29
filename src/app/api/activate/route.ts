import { NextRequest, NextResponse } from 'next/server';
import { activateSchoolLicense } from '../../../lib/schoolLicenseStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Client PC';

    const result = activateSchoolLicense({
      licenseKey: body.licenseKey,
      machineId: body.machineId,
      schoolName: body.schoolName,
      appVersion: body.appVersion,
      ip,
    });

    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Internal server error processing license activation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'SchoolMIS License Activation Endpoint',
    method: 'POST',
    requiredFields: ['licenseKey', 'machineId'],
  });
}
