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
  getUpdatesConfig,
  sendCredentialsToSchoolEmail 
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
      const { schoolName, plan, expiresAt, notes, features, contactPhone, contactEmail, customKey, username, password, recoveryEmail } = body;
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
        username,
        password,
        recoveryEmail,
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

    if (action === 'send_credentials_email') {
      const { id } = body;
      if (!id) return NextResponse.json({ ok: false, error: 'License ID required' }, { status: 400 });
      const res = await sendCredentialsToSchoolEmail(id);
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: res.error }, { status: 400 });
      }
      return NextResponse.json({
        ok: true,
        message: res.message || 'Credentials sent to school email successfully!',
      });
    }

    if (action === 'update_credentials') {
      const { id, username, password, recoveryEmail } = body;
      if (!id) return NextResponse.json({ ok: false, error: 'License ID required' }, { status: 400 });
      const updates: any = {};
      if (username !== undefined && username.trim()) updates.username = username.trim();
      if (password !== undefined && password.trim()) updates.password = password.trim();
      if (recoveryEmail !== undefined) updates.recoveryEmail = recoveryEmail.trim();

      const updated = updateLicense(id, updates, ip);
      if (!updated) return NextResponse.json({ ok: false, error: 'License not found' }, { status: 404 });
      return NextResponse.json({
        ok: true,
        message: `Credentials updated for ${updated.schoolName}`,
        license: updated,
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
