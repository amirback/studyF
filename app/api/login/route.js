import { NextResponse } from 'next/server';
import { getUser, addEvent } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();
    const username = String(body.username || '').trim();
    const password = String(body.password || '');

    if (!username || !password) {
      return NextResponse.json({ error: 'Enter login and password' }, { status: 400 });
    }

    const user = await getUser(username);
    if (!user || user.password !== password) {
      await addEvent({ type: 'login_failed', username });
      return NextResponse.json({ error: 'Wrong login or password' }, { status: 401 });
    }

    await addEvent({ type: 'login', username, name: user.name });
    return NextResponse.json({ ok: true, name: user.name });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
