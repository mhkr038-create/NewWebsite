import { NextRequest } from 'next/server';
import { POST as pingPost, GET as pingGet } from '../../ping/route';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  return pingPost(req);
}

export async function GET() {
  return pingGet();
}
