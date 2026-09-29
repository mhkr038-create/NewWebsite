import { NextRequest, NextResponse } from 'next/server';
import { updateLicense, deleteLicense, getLicenseById } from '../../../../../lib/schoolLicenseStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const lic = getLicenseById(id);
    if (!lic) return NextResponse.json({ ok: false, error: 'License not found' }, { status: 404 });
    return NextResponse.json({ ok: true, license: lic });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Admin Dashboard';
    const updated = updateLicense(id, body, ip);
    if (!updated) return NextResponse.json({ ok: false, error: 'License not found' }, { status: 404 });
    return NextResponse.json({ ok: true, license: updated });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ok = deleteLicense(id);
    return NextResponse.json({ ok, message: ok ? 'License deleted' : 'Not found' });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 });
  }
}
