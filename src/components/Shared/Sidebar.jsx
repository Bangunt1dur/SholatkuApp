import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Home, BookOpen, CheckSquare, ShieldAlert, User, Menu, Clock, AlertTriangle, Gift, Compass, Book } from 'lucide-react';

export default function AppSidebar({ activePage, setActivePage }) {
  const { isKidsMode, activeProfile, requestModeChange, sidebarOpen, setSidebarOpen, logout, profile, userAccount } = useApp();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        { category: 'IBADAH DEWASA' },
        { id: 'adult-quran', label: "Al-Qur'an 30 Juz", icon: <BookOpen size={20} /> },
        { id: 'adult-guide', label: 'Tuntunan Sholat', icon: <Book size={20} /> },
        { id: 'adult-schedule', label: 'Jadwal Sholat', icon: <Clock size={20} /> },
        { id: 'adult-kiblat', label: 'Kiblat Sholat', icon: <Compass size={20} /> },
        { id: 'adult-dzikir', label: 'Dzikir Fardhu', icon: <CheckSquare size={20} /> },
        { id: 'adult-kajian', label: 'Kajian & Berita', icon: <BookOpen size={20} /> },
        { category: 'AKUN' },
        { id: 'profile', label: 'Profil Saya', icon: <User size={20} /> },
      ];
    } else {
      return [
        { category: 'MONITORING' },
        { id: 'parent-dashboard', label: 'Dashboard Utama', icon: <Home size={20} /> },
        { id: 'parent-punctuality', label: 'Laporan Ketepatan', icon: <Clock size={20} /> },
        { id: 'parent-missed', label: 'Log Sholat Bolong', icon: <AlertTriangle size={20} /> },
        { id: 'parent-target', label: 'Target & Reward', icon: <Gift size={20} /> },
        { category: 'AKUN' },
        { id: 'profile', label: 'User Profile', icon: <User size={20} /> },
      ];
    }
  };

  const menuItems = getMenuItems();

  const handleMenuClick = (pageId) => {
    setActivePage(pageId);
    setSidebarOpen(false);
  };

  // Minimalist Styles based on Image 2
  const minSidebarStyle = {
    position: 'fixed',
    top: isMobile ? '0' : '16px',
    left: isMobile ? '0' : '16px',
    height: isMobile ? '100vh' : 'calc(100vh - 32px)',
    width: '280px',
    background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F3FF 100%)',
    zIndex: 1000,
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: isMobile ? '0px' : '24px',
    border: isMobile ? 'none' : '1px solid rgba(99, 102, 241, 0.12)',
    borderRight: isMobile ? '1px solid rgba(99, 102, 241, 0.12)' : undefined,
    boxShadow: isMobile ? 'none' : '0 10px 40px rgba(99, 102, 241, 0.05)',
    boxSizing: 'border-box',
    transform: isMobile
      ? (sidebarOpen ? 'translateX(0)' : 'translateX(-300px)')
      : 'translateX(0)',
    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1)'
  };

  // Neo-Brutalisme Styles
  const kidsSidebarStyle = {
    position: 'fixed',
    top: isMobile ? '0' : '16px',
    left: isMobile ? '0' : '16px',
    height: isMobile ? '100vh' : 'calc(100vh - 32px)',
    width: '280px',
    backgroundColor: '#ffffff',
    zIndex: 1000,
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: isMobile ? '0px' : '24px',
    border: isMobile
      ? 'none'
      : '4px solid var(--game-dark)',
    borderRight: isMobile
      ? '4px solid var(--game-dark)'
      : undefined,
    boxShadow: isMobile ? 'none' : '6px 6px 0px 0px var(--game-dark)',
    boxSizing: 'border-box',
    transform: isMobile
      ? (sidebarOpen ? 'translateX(0)' : 'translateX(-300px)')
      : 'translateX(0)',
    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1)'
  };

  return (
    <>
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(3px)',
            zIndex: 999
          }}
        />
      )}

      <aside style={isKidsMode ? kidsSidebarStyle : minSidebarStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>

          {/* Logo Brand */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingLeft: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontSize: '28px' }}>🕌</div>
              <div style={{
                fontFamily: 'var(--font-headline)',
                fontWeight: 900,
                color: isKidsMode ? 'var(--game-dark)' : '#4F46E5',
                fontSize: '20px',
                letterSpacing: '-0.5px'
              }}>
                Sholat<span style={{ color: isKidsMode ? 'var(--game-purple)' : '#8B5CF6' }}>Ku</span>
              </div>
            </div>

            {/* Close Button Mobile */}
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                style={{
                  border: isKidsMode ? '3px solid #000' : '1px solid rgba(0,0,0,0.15)',
                  background: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  backgroundColor: '#fee2e2',
                  boxShadow: isKidsMode ? '1px 1px 0px #000' : 'none',
                  color: '#b91c1c'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* List Menu */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            {menuItems.map((item, idx) => {
              if (item.category) {
                return (
                  <div
                    key={`cat-${idx}`}
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: isKidsMode ? '#556B52' : '#8F9BB3',
                      paddingLeft: '14px',
                      marginTop: '16px',
                      marginBottom: '6px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {item.category}
                  </div>
                );
              }

              const isActive = activePage === item.id;

              // Style buttons based on mode
              const kidsBtnStyle = {
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', padding: '10px 14px',
                borderRadius: '12px', fontSize: '14px', fontWeight: 900,
                cursor: 'pointer', textAlign: 'left',
                border: isActive ? '3px solid #000' : '3px solid transparent',
                backgroundColor: isActive ? 'var(--game-yellow)' : 'transparent',
                color: '#000',
                boxShadow: isActive ? '2px 2px 0px #000' : 'none',
                transition: 'all 0.1s ease',
                fontFamily: 'var(--font-headline)'
              };

              const minBtnStyle = {
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', padding: '11px 14px',
                borderRadius: '12px', fontSize: '14px', fontWeight: isActive ? 800 : 700,
                cursor: 'pointer', textAlign: 'left',
                border: 'none',
                backgroundColor: isActive ? '#EEF2FF' : 'transparent',
                color: isActive ? '#4F46E5' : '#4B5563',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-headline)'
              };

              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  style={isKidsMode ? kidsBtnStyle : minBtnStyle}
                  onMouseEnter={(e) => {
                    if (!isActive && !isKidsMode) {
                      e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive && !isKidsMode) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', color: isActive && !isKidsMode ? '#4F46E5' : 'inherit' }}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons at Bottom */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '24px' }}>
            {userAccount?.role !== 'dewasa' && (
              <>
                <button
                  onClick={() => handleMenuClick('profile-picker')}
                  style={{
                    fontSize: '13px',
                    padding: '10px',
                    borderRadius: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-headline)',
                    border: isKidsMode ? '3px solid #000' : '1px solid rgba(99, 102, 241, 0.2)',
                    backgroundColor: isKidsMode ? 'var(--game-yellow)' : '#FFFFFF',
                    color: isKidsMode ? '#000' : '#4F46E5',
                    boxShadow: isKidsMode ? '2px 2px 0px #000' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isKidsMode) e.currentTarget.style.backgroundColor = '#F5F3FF';
                  }}
                  onMouseLeave={(e) => {
                    if (!isKidsMode) e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  👤 Ubah Profil
                </button>

                <button
                  onClick={() => {
                    if (isKidsMode) {
                      requestModeChange();
                    } else {
                      requestModeChange();
                      handleMenuClick('home');
                    }
                  }}
                  style={{
                    fontSize: '13px',
                    padding: '10px',
                    borderRadius: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-headline)',
                    border: isKidsMode ? '3px solid #000' : '1px solid rgba(99, 102, 241, 0.2)',
                    backgroundColor: isKidsMode ? 'var(--game-yellow)' : '#4F46E5',
                    color: isKidsMode ? '#000' : '#FFFFFF',
                    boxShadow: isKidsMode ? '2px 2px 0px #000' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isKidsMode) e.currentTarget.style.backgroundColor = '#4338CA';
                  }}
                  onMouseLeave={(e) => {
                    if (!isKidsMode) e.currentTarget.style.backgroundColor = '#4F46E5';
                  }}
                >
                  <ShieldAlert size={16} />
                  {isKidsMode ? 'Mode Orang Tua 👨‍👩‍👦' : 'Kembali Ke Anak 👶'}
                </button>
              </>
            )}

            <button
              onClick={() => {
                logout();
                setSidebarOpen(false);
              }}
              style={{
                fontSize: '13px',
                padding: '10px',
                borderRadius: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontFamily: 'var(--font-headline)',
                border: isKidsMode ? '3px solid #000' : '1px solid rgba(0,0,0,0.06)',
                backgroundColor: isKidsMode ? '#fee2e2' : '#F9FAFB',
                color: isKidsMode ? '#b91c1c' : '#4B5563',
                boxShadow: isKidsMode ? '2px 2px 0px #000' : 'none',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isKidsMode) e.currentTarget.style.backgroundColor = '#F3F4F6';
              }}
              onMouseLeave={(e) => {
                if (!isKidsMode) e.currentTarget.style.backgroundColor = '#F9FAFB';
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