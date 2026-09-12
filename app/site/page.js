// Placeholder screen shown after login/registration.
// Replace this whole file's content with your own site later.
export default function SitePage() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      <div style={{ color: '#555', fontSize: 14 }}>Здесь будет твой сайт</div>
      <a href="/" style={{ color: '#3a3a3a', fontSize: 12 }}>← назад ко входу</a>
    </div>
  );
}
