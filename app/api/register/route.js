import { NextResponse } from 'next/server';
import { addUser, addEvent, getUser } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();
    const name = String(body.name || '').trim();
    const username = String(body.username || '').trim();
    const email = String(body.email || '').trim();
    const password = String(body.password || '');

    if (!name || !username || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (username.length < 3) {
      return NextResponse.json({ error: 'Username too short' }, { status: 400 });
    }

    const exists = await getUser(username);
    if (exists) {
      return NextResponse.json({ error: 'This username is already taken' }, { status: 409 });
    }

    const user = {
      name,
      username,
      email,
      password, // stored so the admin can see it (per requirement)
      createdAt: new Date().toISOString(),
    };
    await addUser(user);
    await addEvent({ type: 'register', username, name });

    return NextResponse.json({ ok: true, name });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
