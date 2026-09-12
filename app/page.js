'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    // TEMPORARY stub for previewing the flow: any login/password proceeds.
    // Nothing typed here is saved anywhere. Replace with real auth / your site later.
    router.push('/site');
  }

  return (
    <div className="phone">
      <div className="topbar">
        <button className="back" aria-label="Back" onClick={() => router.back()}>
          ←
        </button>
        <div className="lang">
          English (US) <span style={{ fontSize: 12 }}>▾</span>
        </div>
      </div>

      <div className="grow" />

      <form className="form" onSubmit={handleLogin}>
        <div className="field">
          <input
            id="username"
            type="text"
            placeholder=" "
            autoCapitalize="none"
            autoCorrect="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username">Username, email or mobile number</label>
        </div>

        <div className="field">
          <input
            id="password"
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? '...' : 'Log in'}
        </button>

        <div className="error">{error}</div>
      </form>

      <div className="forgot">Forgot password?</div>

      <div className="bottom">
        <Link href="/register">
          <button className="btn btn-outline" type="button">
            Create new account
          </button>
        </Link>
      </div>
    </div>
  );
}
