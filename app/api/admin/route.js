import { NextResponse } from 'next/server';
import { getAllUsers, getEvents, usingRedis } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function checkKey(req) {
  const key = req.headers.get('x-admin-key') || '';
  const expected = process.env.ADMIN_PASSWORD || 'admin123';
  return key === expected;
}

export async function GET(req) {
  if (!checkKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const [users, events] = await Promise.all([getAllUsers(), getEvents(300)]);
  return NextResponse.json({
    users,
    events,
    storage: usingRedis() ? 'redis' : 'local',
  });
}
