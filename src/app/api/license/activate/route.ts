import { NextRequest } from 'next/server';
import { POST as activatePost, GET as activateGet } from '../../activate/route';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  return activatePost(req);
}

export async function GET() {
  return activateGet();
}
