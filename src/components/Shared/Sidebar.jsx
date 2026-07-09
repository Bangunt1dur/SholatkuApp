// src/components/shared/AppSidebar.jsx
import { useApp } from '../../context/AppContext';
import { Home, BookOpen, CheckSquare, ShieldAlert, User, Menu, X } from 'lucide-react';

export default function AppSidebar({ activePage, setActivePage }) {
  const { isKidsMode, requestModeChange, sidebarOpen, setSidebarOpen } = useApp();

  const menuItems = [
    { id: 'home', label: isKidsMode ? 'Beranda Utama 🏡' : 'Dashboard', icon: <Home size={20} /> },
    { id: 'prayer-guide', label: isKidsMode ? 'Belajar Sholat 📖' : 'Panduan Sholat', icon: <BookOpen size={20} /> },
    { id: 'tracker', label: isKidsMode ? 'Cek Sholat ✅' : 'Prayer Tracker', icon: <CheckSquare size={20} /> },
    { id: 'profile', label: isKidsMode ? 'Profilku 🏅' : 'User Profile', icon: <User size={20} /> },
  ];

  const handleMenuClick = (pageId) => {
    setActivePage(pageId);
    setSidebarOpen(false); // Otomatis tutup sidebar di HP jika menu diklik
  };

  return (
    <>
      {/* BUTTON HAMBURGER RESPONSIF (Hanya Muncul di Layar HP) */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="clay-btn"
        style={{
          position: 'fixed', bottom: '20px', right: '20px',
          zIndex: 999, width: '54px', height: '54px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* CONTAINER SIDEBAR UTAMA */}
      <aside 
        className="clay-card"
        style={{
          position: 'fixed', top: '16px', left: '16px',
          height: 'calc(100vh - 32px)', width: '240px',
          backgroundColor: '#ffffff', zIndex: 998, padding: '24px 16px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          border: 'none', borderRadius: 'var(--radius-clay)',
          
          // RESPONSIVE LOGIC VIA INLINE STYLES MOCKING
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-280px)',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <div>
          {/* Logo Brand Aplikasi */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', paddingLeft: '8px' }}>
            <div style={{ fontSize: '28px' }}>🕌</div>
            <div style={{ fontFamily: 'var(--font-clay)', fontWeight: 900, color: 'var(--mint-dark)', fontSize: '20px', letterSpacing: '-0.5px' }}>
              Sholat<span style={{ color: 'var(--yellow-dark)' }}>Ku</span>
            </div>
          </div>

          {/* List Menu Item */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {menuItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    width: '100%', padding: '12px 16px', border: 'none',
                    borderRadius: '16px', fontSize: '15px', fontWeight: 900,
                    cursor: 'pointer', textAlign: 'left',
                    backgroundColor: isActive ? 'var(--mint-bg)' : 'transparent',
                    color: isActive ? 'var(--mint-dark)' : '#4A5568',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ color: isActive ? 'var(--mint-dark)' : '#A0AEC0' }}>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* =========================================================================
            TOMBOL MODE ORANG TUA / PARENT GATEWAY WITH INTERCEPTOR
           ========================================================================= */}
        <div>
          <button
            className={`clay-btn w-full ${isKidsMode ? 'yellow' : ''}`}
            onClick={() => {
              requestModeChange();
              if (!isKidsMode) handleMenuClick('parent-dashboard'); // Jika keluar dari mode dewasa, bawa ke dashboard ortu
            }}
            style={{ fontSize: '14px', gap: '8px', padding: '12px' }}
          >
            <ShieldAlert size={18} />
            {isKidsMode ? 'Mode Orang Tua 👨‍👩‍👦' : 'Kembali Ke Anak 👶'}
          </button>
        </div>
      </aside>
    </>
  );
}