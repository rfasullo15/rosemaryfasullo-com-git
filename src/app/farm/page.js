import FarmGame from '@/components/game/FarmGame';

export const metadata = {
  title: 'Farm Prototype',
};

export default function FarmPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '2rem',
        background: '#0f0a06',
      }}
    >
      <h1
        style={{
          color: '#e8c878',
          fontFamily: 'monospace',
          fontSize: '1rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        Farm Prototype
      </h1>
      <FarmGame />
      <p style={{ color: '#555', fontFamily: 'monospace', fontSize: '0.7rem', margin: 0 }}>
        Click the game area to focus, then use WASD + E
      </p>
    </main>
  );
}
