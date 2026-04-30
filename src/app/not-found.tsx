import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en" dir="ltr">
      <body
        style={{
          backgroundColor: '#f5efe0',
          color: '#1a1a1a',
          fontFamily: 'Georgia, serif',
          margin: 0,
        }}
      >
        <main
          style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '28rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
              Page not found
            </h1>
            <p style={{ color: '#3d3628', lineHeight: 1.6, marginBottom: '2rem' }}>
              The page you are looking for does not exist.
            </p>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                padding: '0.625rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#f5efe0',
                backgroundColor: '#8b6914',
                borderRadius: '2px',
                textDecoration: 'none',
              }}
            >
              Return home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
