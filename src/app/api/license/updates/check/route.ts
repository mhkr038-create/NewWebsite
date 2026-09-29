import { NextRequest } from 'next/server';
import { GET as checkGet } from '../../../updates/check/route';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  return checkGet(req);
}
