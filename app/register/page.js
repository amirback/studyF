'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function handleRegister(e) {
    e.preventDefault();
    setError('');
    if (!form.name || !form.username || !form.password) {
      setError('Fill in name, username and password');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed');
      } else {
        router.push('/site');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    { k: 'name', label: 'Full name', type: 'text' },
    { k: 'username', label: 'Username', type: 'text' },
    { k: 'email', label: 'Email (optional)', type: 'email' },
    { k: 'password', label: 'Password', type: 'password' },
  ];

  return (
    <div className="phone">
      <div className="topbar">
        <button className="back" aria-label="Back" onClick={() => router.push('/')}>
          ←
        </button>
      </div>

      <div className="title">Create new account</div>

      <form className="form" onSubmit={handleRegister}>
        {fields.map((f) => (
          <div key={f.k} className="field">
            <input
              id={f.k}
              type={f.type}
              placeholder=" "
              autoCapitalize={f.k === 'name' ? 'words' : 'none'}
              autoCorrect="off"
              value={form[f.k]}
              onChange={set(f.k)}
            />
            <label htmlFor={f.k}>{f.label}</label>
          </div>
        ))}

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? '...' : 'Sign up'}
        </button>

        <div className="error">{error}</div>
      </form>

      <div className="bottom">
        <Link href="/">
          <button className="btn btn-outline" type="button">
            I already have an account
          </button>
        </Link>
      </div>
    </div>
  );
}
