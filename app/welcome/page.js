'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function WelcomeInner() {
  const params = useSearchParams();
  const router = useRouter();
  const name = params.get('u') || 'student';
  return (
    <div className="center">
      <h1>Welcome, {name} 👋</h1>
      <p>You are logged in to the Study Center.</p>
      <button
        className="btn btn-primary"
        style={{ maxWidth: 240 }}
        onClick={() => router.push('/')}
      >
        Log out
      </button>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense fallback={<div className="center"><p>...</p></div>}>
      <WelcomeInner />
    </Suspense>
  );
}
