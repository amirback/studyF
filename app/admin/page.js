'use client';

import { useState, useEffect } from 'react';

const KEY_STORAGE = 'sc_admin_key';

function fmt(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString();
}

const EVENT_LABEL = {
  register: '🆕 registered',
  login: '✅ logged in',
  login_failed: '❌ wrong password',
};

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function load(adminKey) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin', {
        headers: { 'x-admin-key': adminKey },
        cache: 'no-store',
      });
      if (res.status === 401) {
        setError('Wrong admin password');
        setAuthed(false);
        return;
      }
      const json = await res.json();
      setData(json);
      setAuthed(true);
      try { localStorage.setItem(KEY_STORAGE, adminKey); } catch {}
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let saved = '';
    try { saved = localStorage.getItem(KEY_STORAGE) || ''; } catch {}
    if (saved) { setKey(saved); load(saved); }
  }, []);

  function logout() {
    try { localStorage.removeItem(KEY_STORAGE); } catch {}
    setAuthed(false);
    setData(null);
    setKey('');
  }

  async function delUser(username) {
    if (!confirm('Delete account "' + username + '"?')) return;
    await fetch('/api/admin?username=' + encodeURIComponent(username), {
      method: 'DELETE',
      headers: { 'x-admin-key': key },
    });
    load(key);
  }

  async function clearEverything() {
    if (!confirm('Delete ALL accounts and the whole activity log? This cannot be undone.')) return;
    await fetch('/api/admin?action=clear', {
      method: 'DELETE',
      headers: { 'x-admin-key': key },
    });
    load(key);
  }

  if (!authed) {
    return (
      <div className="gate">
        <div className="title">Admin panel</div>
        <form
          className="form"
          onSubmit={(e) => { e.preventDefault(); load(key); }}
        >
          <div className="field">
            <input
              id="key"
              type="password"
              placeholder=" "
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <label htmlFor="key">Admin password</label>
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? '...' : 'Enter'}
          </button>
          <div className="error">{error}</div>
        </form>
        <div className="hint">
          Default password: <b>admin123</b><br />
          Change it via the <b>ADMIN_PASSWORD</b> environment variable on Vercel.
        </div>
      </div>
    );
  }

  const users = data?.users || [];
  const events = data?.events || [];

  return (
    <div className="admin-wrap">
      <div className="admin-head">
        <h1>Admin panel</h1>
        <div>
          <span className="badge">
            storage: {data?.storage} · users: {users.length} &nbsp;
          </span>
          <button className="logout" onClick={() => load(key)}>Refresh</button>
          &nbsp;·&nbsp;
          <button className="logout" onClick={logout}>Log out</button>
          <button className="clear-btn" onClick={clearEverything}>Clear all data</button>
        </div>
      </div>

      <div className="card">
        <h2>Accounts ({users.length})</h2>
        {users.length === 0 ? (
          <div className="empty">No accounts yet.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username (login)</th>
                <th>Password</th>
                <th>Email</th>
                <th>Registered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.username}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.username}</td>
                  <td className="pw">{u.password}</td>
                  <td>{u.email || '—'}</td>
                  <td>{fmt(u.createdAt)}</td>
                  <td>
                    <button className="del-btn" onClick={() => delUser(u.username)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card">
        <h2>Activity log ({events.length})</h2>
        {events.length === 0 ? (
          <div className="empty">No activity yet.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>When</th>
                <th>Event</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev, i) => (
                <tr key={i}>
                  <td>{fmt(ev.at)}</td>
                  <td>{EVENT_LABEL[ev.type] || ev.type}</td>
                  <td>{ev.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="hint">
        ⚠️ Passwords are shown in plain text on purpose (your request). Tell students
        not to reuse passwords from other services here.
      </div>
    </div>
  );
}
