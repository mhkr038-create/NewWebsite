import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllLicenses, 
  getLicenseStats, 
  createLicense, 
  updateLicense, 
  deleteLicense, 
  resetMachineBinding, 
  extendLicenseExpiry,
  checkRailwayServerStatus,
  getUpdatesConfig 
} from '../../../../lib/schoolLicenseStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const licenses = getAllLicenses();
    const stats = getLicenseStats();
    const railwayStatus = await checkRailwayServerStatus();
    const otaConfig = getUpdatesConfig();

    return NextResponse.json({
      ok: true,
      licenses,
      stats,
      railwayStatus,
      otaConfig,
      serverTime: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Error fetching license data' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action || 'create';
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Admin Dashboard';

    if (action === 'create') {
      const { schoolName, plan, expiresAt, notes, features, contactPhone, contactEmail, customKey } = body;
      if (!schoolName) {
        return NextResponse.json({ ok: false, error: 'School name is required' }, { status: 400 });
      }

      const newLic = createLicense({
        schoolName,
        plan,
        expiresAt,
        notes,
        features,
        contactPhone,
        contactEmail,
        customKey,
        ip,
      });

      return NextResponse.json({
        ok: true,
        message: `License generated for ${newLic.schoolName}`,
        license: newLic,
        stats: getLicenseStats(),
      });
    }

    if (action === 'reset_machine') {
      const { id } = body;
      if (!id) return NextResponse.json({ ok: false, error: 'License ID required' }, { status: 400 });
      const updated = resetMachineBinding(id);
      if (!updated) return NextResponse.json({ ok: false, error: 'License not found' }, { status: 404 });
      return NextResponse.json({
        ok: true,
        message: `Machine binding reset for ${updated.schoolName}. PC lock released.`,
        license: updated,
      });
    }

    if (action === 'extend_expiry') {
      const { id, days, isLifetime } = body;
      if (!id) return NextResponse.json({ ok: false, error: 'License ID required' }, { status: 400 });
      const updated = extendLicenseExpiry(id, isLifetime ? 'lifetime' : (days || 30));
      if (!updated) return NextResponse.json({ ok: false, error: 'License not found' }, { status: 404 });
      return NextResponse.json({
        ok: true,
        message: `Expiry extended for ${updated.schoolName}`,
        license: updated,
      });
    }

    if (action === 'update_status') {
      const { id, status } = body;
      if (!id || !status) return NextResponse.json({ ok: false, error: 'ID and status required' }, { status: 400 });
      const updated = updateLicense(id, { status }, ip);
      if (!updated) return NextResponse.json({ ok: false, error: 'License not found' }, { status: 404 });
      return NextResponse.json({
        ok: true,
        message: `License status changed to ${status}`,
        license: updated,
      });
    }

    if (action === 'delete') {
      const { id } = body;
      if (!id) return NextResponse.json({ ok: false, error: 'License ID required' }, { status: 400 });
      const deleted = deleteLicense(id);
      return NextResponse.json({
        ok: deleted,
        message: deleted ? 'License deleted permanently' : 'License not found',
      });
    }

    if (action === 'check_railway') {
      const railwayStatus = await checkRailwayServerStatus();
      return NextResponse.json({ ok: true, railwayStatus });
    }

    return NextResponse.json({ ok: false, error: `Unknown action: ${action}` }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Error processing request' },
      { status: 500 }
    );
  }
}
