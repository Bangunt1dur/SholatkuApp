import { useApp } from '../../context/AppContext';

export default function Header() {
  const { isKidsMode } = useApp();
  return (
    <header className="identity-header">
      <span className="mosque-icon">🕌</span>
      <div className="identity-meta">
        <div className="title">
          {isKidsMode ? 'SholatKu Kids — Belajar Sholat Itu Seru! 🌟' : 'Aplikasi Tuntunan Sholat SholatKu Kids'}
        </div>
        <div className="subtitle">
          Kelompok: Pramudya Izha Pratama, Naufal Rizqi Adi Putra, Muhammad Farel Fahlevi, Aulia Tri Putriani, Faried Azfar
        </div>
      </div>
      <div className="identity-badges">
        <span className="identity-badge">📚 Informatika</span>
        <span className="identity-badge">💻 Pengembangan Aplikasi Web</span>
        <span className="identity-badge">👨‍🏫 Dedy Susanto, S.Pd.I., M.M.</span>
      </div>
    </header>
  );
}