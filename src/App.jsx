import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import AppSidebar from './components/shared/Sidebar'; // Sesuai penamaan PascalCase baru kita
import AppHeader from './components/shared/Header';   // Sesuai penamaan PascalCase baru kita
import HomePage from './pages/HomePage';
import SholatGuidePage from './pages/SholatGuidePage';
import PrayerTrackerPage from './pages/SholatTrackerPage'; // Sesuai penamaan di folder pages
import SholatQuizPage from './pages/SholatQuizPage';
import AdventurePage from './pages/AdventurePage';
import ProfilePage from './pages/ProfilePage';
import ParentDashboardPage from './pages/ParentDashboard';

function ParentalGateModal() {
  const { isPinModalOpen, setIsPinModalOpen, toggleMode } = useApp();
  const [pinInput, setPinInput] = useState('');
  const [isError, setIsError] = useState(false);

  const CORRECT_PIN = '1234'; 

  if (!isPinModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pinInput === CORRECT_PIN) {
      toggleMode();
      setIsPinModalOpen(false);
      setPinInput('');
      setIsError(false);
    } else {
      setIsError(true);
      setPinInput('');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
    }}>
      {/* Menggunakan clay-card ber-border tebal figma */}
      <div className="clay-card animate-fadeInUp" style={{ maxWidth: '360px', width: '90%', textAlign: 'center' }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔒</div>
        <h3 style={{ margin: '0 0 8px', fontWeight: 900, color: 'var(--game-purple)' }}>Khusus Orang Tua</h3>
        <p style={{ fontSize: '14px', fontWeight: 700, color: '#718096', marginBottom: '16px' }}>
          Masukkan 4 digit PIN Ma/Pa untuk mengunci akses anak.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            maxLength={4}
            placeholder="• • • •"
            value={pinInput}
            onChange={(e) => {
              setIsError(false);
              setPinInput(e.target.value.replace(/\D/g, '')); 
            }}
            style={{
              width: '100%', padding: '12px', fontSize: '24px', letterSpacing: '8px',
              textAlign: 'center', borderRadius: '12px', border: isError ? '4px solid var(--pink-clay)' : '4px solid var(--game-dark)',
              backgroundColor: '#F7FAFC', outline: 'none', marginBottom: '12px', fontWeight: 900
            }}
          />
          
          {isError && (
            <p style={{ color: 'var(--pink-clay)', fontSize: '13px', fontWeight: 800, margin: '0 0 12px' }}>
              ❌ PIN salah! Coba koreksi lagi.
            </p>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button
              type="button"
              className="clay-btn yellow"
              style={{ flex: 1, padding: '10px' }}
              onClick={() => {
                setIsPinModalOpen(false);
                setPinInput('');
                setIsError(false);
              }}
            >
              Batal
            </button>
            <button type="submit" className="clay-btn purple" style={{ flex: 1, padding: '10px' }}>
              Verifikasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const { sidebarOpen } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'prayer-guide':
        return <SholatGuidePage setActivePage={setActivePage} />;
      case 'tracker':
        return <PrayerTrackerPage />;
      case 'quiz':
        return <SholatQuizPage />;
      case 'adventure':
        return <AdventurePage />;
      case 'profile':
        return <ProfilePage />;
      case 'parent-dashboard':
        return <ParentDashboardPage />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AppSidebar activePage={activePage} setActivePage={setActivePage} />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: sidebarOpen ? '240px' : '0px', 
        transition: 'margin-left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        <AppHeader setActivePage={setActivePage} />

        <main style={{ flex: 1, position: 'relative' }}>
          {renderPage()}
        </main>
      </div>

      <ParentalGateModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="game-grid-bg" style={{ minHeight: '100vh', color: 'var(--game-dark)' }}>
        <AppContent />
      </div>
    </AppProvider>
  );
}