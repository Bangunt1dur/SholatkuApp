// src/components/Shared/Sidebar.jsx
import { useApp } from '../../context/AppContext';
import { Home, BookOpen, CheckSquare, ShieldAlert, User, Menu, X, Clock, Award, Map, LogOut, Book, Shield, Compass, Gift, AlertTriangle } from 'lucide-react';

export default function AppSidebar({ activePage, setActivePage }) {
  const { 
    userMode, setUserMode, currentUser, activeProfile, isKidsMode,
    sidebarOpen, setSidebarOpen, logout, isMobile 
  } = useApp();

  const handleMenuClick = (pageId) => {
    setActivePage(pageId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const isAdultTheme = userMode === 'adult' || userMode === 'parent' || userMode === 'admin' || !isKidsMode;

  // Define menus based on active mode / profile
  let menuItems = [];
  if (userMode === 'admin') {
    menuItems = [
      { id: 'admin-panel', label: 'Dashboard Admin 🛠️', icon: <Shield size={20} /> }
    ];
  } else if (userMode === 'parent' || activeProfile === 'ortu') {
    menuItems = [
      { id: 'parent-dashboard', label: 'Dashboard Ortu 👨‍👩‍👦', icon: <ShieldAlert size={20} /> },
      { id: 'parent-punctuality', label: 'Laporan Tepat Waktu ⏱️', icon: <Clock size={20} /> },
      { id: 'parent-missed', label: 'Log Sholat Bolong ⚠️', icon: <AlertTriangle size={20} /> },
      { id: 'parent-target', label: 'Target & Reward 🎁', icon: <Gift size={20} /> },
      { id: 'profile', label: 'User Profile 🏅', icon: <User size={20} /> },
    ];
  } else if (userMode === 'adult' || activeProfile === 'dewasa') {
    menuItems = [
      { id: 'prayer-guide', label: 'Panduan Sholat 🧎', icon: <BookOpen size={20} /> },
      { id: 'adult-quran', label: "Al-Qur'an 30 Juz 📖", icon: <Book size={20} /> },
      { id: 'adult-schedule', label: 'Jadwal Sholat ⏱️', icon: <Clock size={20} /> },
      { id: 'adult-kiblat', label: 'Kiblat Sholat 🧭', icon: <Compass size={20} /> },
      { id: 'adult-dzikir', label: 'Dzikir Fardhu 📿', icon: <CheckSquare size={20} /> },
      { id: 'profile', label: 'Profil Saya 🏅', icon: <User size={20} /> },
    ];
  } else {
    // 'kids' mode
    menuItems = [
      { id: 'home', label: 'Beranda Utama 🏡', icon: <Home size={20} /> },
      { id: 'adventure', label: 'Peta Petualangan 🗺️', icon: <Map size={20} /> },
      { id: 'prayer-guide', label: 'Belajar Sholat 📖', icon: <BookOpen size={20} /> },
      { id: 'hafalan-test', label: 'Tes Hafalan 🧠', icon: <Award size={20} /> },
      { id: 'doa-surah', label: 'Doa & Surah 🤲', icon: <BookOpen size={20} /> },
      { id: 'tracker', label: 'Cek Sholat ✅', icon: <CheckSquare size={20} /> },
      { id: 'quiz', label: 'Kuis Seru 🎯', icon: <BookOpen size={20} /> },
      { id: 'profile', label: 'Profilku 🏅', icon: <User size={20} /> },
    ];
  }

  return (
    <>
      {/* RESPONSIVE HAMBURGER BUTTON */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`hamburger-toggle-btn ${isAdultTheme ? "btn btn-ghost" : "clay-btn"}`}
        style={{
          position: 'fixed', top: '16px', left: '16px',
          zIndex: 999, width: '48px', height: '48px', borderRadius: isAdultTheme ? '8px' : '50%',
          display: isMobile ? 'flex' : (sidebarOpen ? 'none' : 'flex'),
          alignItems: 'center', justifyContent: 'center',
          boxShadow: isAdultTheme ? '0 4px 10px rgba(0,0,0,0.1)' : 'var(--shadow-lg)'
        }}
      >
        <Menu size={22} />
      </button>

      {/* SIDEBAR MAIN CONTAINER */}
      <aside 
        className={(isAdultTheme || isMobile) ? "" : "clay-card"}
        style={{
          position: 'fixed', 
          top: (isAdultTheme || isMobile) ? '0' : '16px', 
          left: (isAdultTheme || isMobile) ? '0' : '16px',
          height: (isAdultTheme || isMobile) ? '100vh' : 'calc(100vh - 32px)', 
          width: '240px',
          backgroundColor: '#ffffff', 
          zIndex: 1000, 
          padding: '24px 16px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          borderRight: isAdultTheme 
            ? '1px solid #E2E8F0' 
            : '4px solid var(--game-dark)',
          borderRadius: isAdultTheme 
            ? '0' 
            : isMobile 
              ? '0 24px 24px 0' 
              : '24px',
          boxShadow: isAdultTheme 
            ? 'none' 
            : isMobile 
              ? '6px 0 0 var(--game-dark)' 
              : '6px 6px 0 var(--game-dark)',
          
          transform: (isMobile && !sidebarOpen) ? 'translateX(-280px)' : 'translateX(0)',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingLeft: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontSize: '28px' }}>🕌</div>
              <div style={{
                fontFamily: isAdultTheme ? 'Playfair Display, serif' : 'var(--font-clay)',
                fontWeight: 900,
                color: isAdultTheme ? '#065F46' : 'var(--mint-dark)',
                fontSize: '20px',
                letterSpacing: '-0.5px'
              }}>
                SholatKu
              </div>
            </div>
            {isMobile && (
              <button 
                onClick={() => setSidebarOpen(false)} 
                className={isAdultTheme ? "btn btn-ghost" : "clay-btn"}
                style={{ 
                  width: '36px', height: '36px', padding: 0, borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'none', border: isAdultTheme ? 'none' : '2px solid var(--game-dark)'
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Menu Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            {menuItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    backgroundColor: isActive ? (isAdultTheme ? '#ECFDF5' : '#7C3AED') : 'transparent',
                    color: isActive ? (isAdultTheme ? '#047857' : '#FFFFFF') : '#475569',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Account Logout / Session Info */}
          {currentUser && (
            <div style={{ paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', marginBottom: '8px' }}>
                👤 {currentUser.name} ({currentUser.role})
              </div>
              <button
                onClick={() => { logout(); setActivePage('login'); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #FECDD3',
                  backgroundColor: '#FFF1F2',
                  color: '#E11D48',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                <LogOut size={14} /> Keluar
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}