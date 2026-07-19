// src/components/Shared/Sidebar.jsx
import { useApp } from '../../context/AppContext';
import { Home, BookOpen, CheckSquare, ShieldAlert, User, Menu, X, Clock, Award, Map, LogOut, Book, Shield } from 'lucide-react';

export default function AppSidebar({ activePage, setActivePage }) {
  const { 
    userMode, setUserMode, currentUser, activeChild, 
    setIsPinModalOpen, sidebarOpen, setSidebarOpen, logout, isMobile 
  } = useApp();

  const handleMenuClick = (pageId) => {
    setActivePage(pageId);
    setSidebarOpen(false); // Close sidebar on mobile
  };

  const isAdultTheme = userMode === 'adult' || userMode === 'parent' || userMode === 'admin';

  // Define menus based on active mode
  let menuItems = [];
  if (userMode === 'admin') {
    menuItems = [
      { id: 'admin-panel', label: 'Dashboard Admin 🛠️', icon: <Shield size={20} /> }
    ];
  } else if (userMode === 'parent') {
    menuItems = [
      { id: 'parent-dashboard', label: 'Dashboard Ortu 👨‍👩‍👦', icon: <ShieldAlert size={20} /> }
    ];
  } else if (userMode === 'adult') {
    menuItems = [
      { id: 'prayer-guide', label: 'Panduan Sholat', icon: <BookOpen size={20} /> },
      { id: 'schedule', label: 'Jadwal Sholat', icon: <Clock size={20} /> },
      { id: 'adult-surah', label: 'Hafalan Surah', icon: <Book size={20} /> },
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
      { id: 'profile', label: 'Profilku 🏅', icon: <User size={20} /> },
    ];
  }

  return (
    <>
      {/* RESPONSIVE HAMBURGER BUTTON */}
      <button 
        onClick={() => setSidebarOpen(true)}
        className={`hamburger-toggle-btn ${isAdultTheme ? "btn btn-ghost" : "clay-btn"}`}
        style={{
          position: 'fixed', top: '20px', left: '20px',
          zIndex: 999, width: '54px', height: '54px', borderRadius: isAdultTheme ? '8px' : '50%',
          display: sidebarOpen ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: isAdultTheme ? '0 4px 10px rgba(0,0,0,0.1)' : 'var(--shadow-lg)'
        }}
      >
        <Menu size={24} />
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
          
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-280px)',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <div>
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', paddingLeft: '8px' }}>
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
            {isMobile && sidebarOpen && (
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
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {menuItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    width: '100%', padding: '11px 14px', border: 'none',
                    borderRadius: isAdultTheme ? '8px' : '16px',
                    fontSize: '14px',
                    fontWeight: isAdultTheme ? 700 : 900,
                    cursor: 'pointer', textAlign: 'left',
                    backgroundColor: isActive 
                      ? (isAdultTheme ? '#ECFDF5' : 'var(--mint-bg)') 
                      : 'transparent',
                    color: isActive 
                      ? (isAdultTheme ? '#047857' : 'var(--mint-dark)') 
                      : '#4A5568',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ 
                    color: isActive 
                      ? (isAdultTheme ? '#047857' : 'var(--mint-dark)') 
                      : '#A0AEC0',
                    display: 'flex'
                  }}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          
          {/* Parent mode actions */}
          {userMode === 'parent' && (
            <button
              className="clay-btn purple"
              onClick={() => setUserMode('kids')}
              style={{ fontSize: '13px', gap: '8px', padding: '10px', background: '#059669', borderColor: '#059669', color: '#white', fontWeight: 800 }}
            >
              🧒 Masuk Mode Anak
            </button>
          )}

          {/* Return to Parent button in Kids Mode */}
          {userMode === 'kids' && (
            <button
              className="clay-btn yellow"
              onClick={() => setIsPinModalOpen(true)}
              style={{ fontSize: '13px', gap: '8px', padding: '10px', border: '2px solid #000' }}
            >
              <ShieldAlert size={16} />
              Kembali ke Ortu 👨‍👩‍👦
            </button>
          )}

          {/* Quick toggle Adult vs Parent (Only for Parents role) */}
          {currentUser && currentUser.role === 'parent' && (
            <button
              onClick={() => {
                if (userMode === 'adult') {
                  setUserMode('parent');
                } else {
                  setUserMode('adult');
                }
              }}
              style={{
                border: 'none', background: 'none', color: '#4A5568', 
                fontSize: '12px', fontWeight: 800, cursor: 'pointer',
                textAlign: 'center', padding: '6px', textDecoration: 'underline'
              }}
            >
              {userMode === 'adult' ? '👨‍👩‍👦 Ke Dashboard Orang Tua' : '🧔 Coba Mode Dewasa'}
            </button>
          )}

          {/* LOG OUT BUTTON */}
          <button
            onClick={() => logout()}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              width: '100%', padding: '10px', border: '1px solid #CBD5E1',
              borderRadius: isAdultTheme ? '8px' : '14px',
              fontSize: '13px', fontWeight: 800, cursor: 'pointer',
              backgroundColor: '#FFF5F5', color: '#C53030',
              transition: 'all 0.2s'
            }}
          >
            <LogOut size={14} />
            Keluar Akun
          </button>

          {currentUser && currentUser.role === 'parent' && (
            <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'center', fontWeight: 700 }}>
              Anak: {currentUser.childName}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}