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

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Enter your login and password');
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
        router.push('/welcome?u=' + encodeURIComponent(data.name || username));
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

      <form className="form" onSubmit={handleLogin}>
        <div className={'field' + (username ? ' filled' : '')}>
          <label htmlFor="username">Username, email or mobile number</label>
          <input
            id="username"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={'field' + (password ? ' filled' : '')}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
        <div className="brand">STUDY CENTER</div>
      </div>
    </div>
  );
}
