export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem',
      }}
    >
      <div>
        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}
        >
          Welcome to Track My Life
        </h1>
        <p style={{ fontSize: '1.125rem' }}>Get started by editing this page.</p>
      </div>
    </main>
  )
}
