'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function WelcomeInner() {
  const params = useSearchParams();
  const router = useRouter();
  const name = params.get('u') || 'student';
  return (
    <div className="center">
      <div style={{ fontSize: 56 }}>✅</div>
      <h1>Successful!</h1>
      <p>You are logged in{name ? ' as ' + name : ''}.</p>
      <button
        className="btn btn-primary"
        style={{ maxWidth: 240 }}
        onClick={() => router.push('/')}
      >
        Back
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
