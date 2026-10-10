import Link from 'next/link';

// This page renders outside the locale layout, so it carries its own colours.
const styles = `
  body { margin: 0; background: #f2ead7; color: #1c1913; font-family: Georgia, serif; }
  p { color: #39332a; }
  a { background: #8f3b25; color: #f8f1e0; }
  @media (prefers-color-scheme: dark) {
    body { background: #16140e; color: #ede4cf; }
    p { color: #d4cab2; }
    a { background: #e3896d; color: #16140e; }
  }
`;

export default function RootNotFound() {
  return (
    <html lang="en" dir="ltr">
      <head>
        <style>{styles}</style>
      </head>
      <body>
        <main
          style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div style={{ maxWidth: '28rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
              Page not found
            </h1>
            <p style={{ lineHeight: 1.6, marginBottom: '2rem' }}>
              The page you are looking for does not exist.
            </p>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 600,
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
