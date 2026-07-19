import { useApp } from '../../context/AppContext';

export default function Header() {
  const { isKidsMode } = useApp();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '16px',
        padding: '16px 24px',
        width: '100%',
        boxSizing: 'border-box',
        background: '#FFFFFF',
        borderRadius: '24px',
        border: '4px solid #000000',
        boxShadow: '6px 6px 0px #000000',
        position: 'relative',
        zIndex: 10,
        marginBottom: '20px'
      }}
    >
      <span style={{ fontSize: '32px' }}>🕌</span>

      <div style={{ flex: 1, minWidth: '200px', textAlign: 'left' }}>
        <div style={{ fontWeight: 900, fontSize: '18px', color: '#000000', margin: 0, lineHeight: '1.3' }}>
          {isKidsMode ? 'SholatKu Kids — Belajar Sholat Itu Seru! 🌟' : 'Aplikasi Tuntunan Sholat SholatKu Kids'}
        </div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#4a5568', marginTop: '4px', margin: 0, lineHeight: '1.4' }}>
          Kelompok: Pramudya Izha Pratama, Naufal Rizqi Adi Putra, Muhammad Farel Fahlevi, Aulia Tri Putriani, Faried Azfar
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 800,
          border: '2px solid #000000',
          backgroundColor: '#EDF2F7',
          boxShadow: '2px 2px 0px #000000',
          color: '#000000'
        }}>📚 Informatika</span>
        <span style={{
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 800,
          border: '2px solid #000000',
          backgroundColor: '#EDF2F7',
          boxShadow: '2px 2px 0px #000000',
          color: '#000000'
        }}>💻 WebDev</span>
        <span style={{
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 800,
          border: '2px solid #000000',
          backgroundColor: '#EDF2F7',
          boxShadow: '2px 2px 0px #000000',
          color: '#000000'
        }}>👨‍🏫 Dedy Susanto</span>
      </div>
    </div>
  );
}