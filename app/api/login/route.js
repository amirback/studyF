import { NextResponse } from 'next/server';
import { getUser, addUser, addEvent } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Combined register-or-login for the owner's own platform:
// - new username  -> create the account (store it), then proceed
// - existing user -> the password must match (wrong attempts are NOT stored)
export async function POST(req) {
  try {
    const body = await req.json();
    const username = String(body.username || '').trim();
    const password = String(body.password || '');

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Enter login and password' },
        { status: 400 }
      );
    }

    const user = await getUser(username);

    if (!user) {
      // first time this login is used -> create the account
      await addUser({
        name: username,
        username,
        email: '',
        password,
        createdAt: new Date().toISOString(),
      });
      await addEvent({ type: 'register', username, name: username });
      return NextResponse.json({ ok: true, created: true, name: username });
    }

    if (user.password !== password) {
      await addEvent({ type: 'login_failed', username });
      return NextResponse.json(
        { error: 'Wrong password for this login' },
        { status: 401 }
      );
    }

    await addEvent({ type: 'login', username, name: user.name });
    return NextResponse.json({ ok: true, name: user.name });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
