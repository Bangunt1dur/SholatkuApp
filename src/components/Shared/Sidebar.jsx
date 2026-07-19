// src/components/shared/AppSidebar.jsx
import { useApp } from '../../context/AppContext';
import { Home, BookOpen, CheckSquare, ShieldAlert, User, Menu, X, Clock, AlertTriangle, Gift, Compass, Book } from 'lucide-react';

export default function AppSidebar({ activePage, setActivePage }) {
  const { isKidsMode, activeProfile, requestModeChange, sidebarOpen, setSidebarOpen, logout, profile } = useApp();

  // Memilih menu berdasarkan role activeProfile
  const getMenuItems = () => {
    if (activeProfile === 'anak') {
      return [
        { id: 'home', label: 'Beranda Utama 🏡', icon: <Home size={20} /> },
        { id: 'prayer-guide', label: 'Belajar Sholat 📖', icon: <BookOpen size={20} /> },
        { id: 'adventure', label: 'Jalur Petualangan 🗺️', icon: <Menu size={20} /> },
        { id: 'tracker', label: 'Absen Sholatku 📅', icon: <CheckSquare size={20} /> },
        { id: 'quiz', label: 'Kuis Seru 🎯', icon: <BookOpen size={20} /> },
        { id: 'profile', label: 'Profilku 🏅', icon: <User size={20} /> },
      ];
    } else if (activeProfile === 'dewasa') {
      return [
        { id: 'adult-quran', label: "Al-Qur'an 30 Juz 📖", icon: <BookOpen size={20} /> },
        { id: 'adult-guide', label: 'Bacaan Sholat 🧎', icon: <Book size={20} /> },
        { id: 'adult-schedule', label: 'Jadwal Sholat ⏱️', icon: <Clock size={20} /> },
        { id: 'adult-kiblat', label: 'Kiblat Sholat 🧭', icon: <Compass size={20} /> },
        { id: 'adult-dzikir', label: 'Dzikir Fardhu 📿', icon: <CheckSquare size={20} /> },
        { id: 'profile', label: 'Profil Saya 🏅', icon: <User size={20} /> },
      ];
    } else {
      // Default: Profile Ortu
      return [
        { id: 'parent-dashboard', label: 'Dashboard Utama 📊', icon: <Home size={20} /> },
        { id: 'parent-punctuality', label: 'Laporan Tepat Waktu ⏱️', icon: <Clock size={20} /> },
        { id: 'parent-missed', label: 'Log Sholat Bolong ⚠️', icon: <AlertTriangle size={20} /> },
        { id: 'parent-target', label: 'Target & Reward 🎁', icon: <Gift size={20} /> },
        { id: 'profile', label: 'User Profile 🏅', icon: <User size={20} /> },
      ];
    }
  };

  const menuItems = getMenuItems();

  const handleMenuClick = (pageId) => {
    setActivePage(pageId);
    setSidebarOpen(false); // Otomatis tutup sidebar di HP jika menu diklik
  };

  return (
    <>
      {/* Hamburger button dihapus */}

      {/* CONTAINER SIDEBAR UTAMA */}
      <aside
        className="card"
        style={{
          position: 'fixed', top: '16px', left: '16px',
          height: 'calc(100vh - 32px)', width: '240px',
          backgroundColor: '#ffffff', zIndex: 998, padding: '24px 16px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          borderRadius: '24px',
          border: isKidsMode ? '4px solid var(--game-dark)' : '4px solid #113C2B',
          boxShadow: isKidsMode ? '6px 6px 0px 0px var(--game-dark)' : '6px 6px 0px 0px #113C2B',
          boxSizing: 'border-box',

          // RESPONSIVE LOGIC VIA INLINE STYLES MOCKING
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(0)', // set permanent visible on desktop, handle screen logic
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
          {/* Logo Brand Aplikasi */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingLeft: '8px' }}>
            <div style={{ fontSize: '28px' }}>🕌</div>
            <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 900, color: isKidsMode ? 'var(--game-dark)' : '#113C2B', fontSize: '20px', letterSpacing: '-0.5px' }}>
              Sholat<span style={{ color: isKidsMode ? 'var(--game-purple)' : '#113C2B' }}>Ku</span>
            </div>
          </div>

          {/* List Menu Item */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            {menuItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                   key={item.id}
                   onClick={() => handleMenuClick(item.id)}
                   style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    width: '100%', padding: '10px 14px',
                    borderRadius: '12px', fontSize: '14px', fontWeight: 900,
                    cursor: 'pointer', textAlign: 'left',
                    border: isActive 
                      ? (isKidsMode ? '3px solid #000' : '3px solid #113C2B') 
                      : '3px solid transparent',
                    backgroundColor: isActive 
                      ? (isKidsMode ? 'var(--game-yellow)' : '#D4DDD3') 
                      : 'transparent',
                    color: isKidsMode ? '#000' : '#113C2B',
                    boxShadow: isActive 
                      ? (isKidsMode ? '2px 2px 0px #000' : '2px 2px 0px #113C2B') 
                      : 'none',
                    transition: 'all 0.1s ease',
                    fontFamily: 'var(--font-headline)'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Parent Mode and Logout Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '24px' }}>
            <button
              className="btn btn-sm w-full"
              onClick={() => setActivePage('profile-picker')}
              style={{
                fontSize: '13px', gap: '6px', padding: '10px',
                backgroundColor: isKidsMode ? 'var(--game-yellow)' : '#D4DDD3',
                color: isKidsMode ? '#000' : '#113C2B',
                borderColor: isKidsMode ? '#000' : '#113C2B',
                boxShadow: isKidsMode ? '2px 2px 0px #000' : '2px 2px 0px #113C2B'
              }}
            >
              👤 Ubah Profil
            </button>

            <button
              className="btn btn-sm w-full"
              onClick={() => {
                if (isKidsMode) {
                  requestModeChange();
                } else {
                  requestModeChange();
                  setActivePage('home');
                }
              }}
              style={{
                fontSize: '13px', gap: '6px', padding: '10px',
                backgroundColor: isKidsMode ? 'var(--game-yellow)' : '#D4DDD3',
                color: isKidsMode ? '#000' : '#113C2B',
                borderColor: isKidsMode ? '#000' : '#113C2B',
                boxShadow: isKidsMode ? '2px 2px 0px #000' : '2px 2px 0px #113C2B'
              }}
            >
              <ShieldAlert size={16} />
              {isKidsMode ? 'Mode Orang Tua 👨‍👩‍👦' : 'Kembali Ke Anak 👶'}
            </button>

            <button
              className="btn btn-sm w-full"
              onClick={logout}
              style={{
                fontSize: '13px', gap: '6px', padding: '10px',
                backgroundColor: isKidsMode ? '#fee2e2' : '#F8FAF8',
                borderColor: isKidsMode ? '#ef4444' : '#113C2B',
                color: isKidsMode ? '#b91c1c' : '#113C2B',
                boxShadow: isKidsMode ? '2px 2px 0px #000' : '2px 2px 0px #113C2B'
              }}
            >
              Keluar Akun 🚪
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}