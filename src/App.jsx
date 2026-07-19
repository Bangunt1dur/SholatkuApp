// src/App.jsx
import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import AppSidebar from './components/Shared/Sidebar'; 
import AppHeader from './components/Shared/Header';   
import HomePage from './pages/HomePage';
import SholatGuidePage from './pages/SholatGuidePage';
import PrayerTrackerPage from './pages/SholatTrackerPage'; 
import SholatQuizPage from './pages/SholatQuizPage';
import AdventurePage from './pages/AdventurePage';
import ProfilePage from './pages/ProfilePage';
import ParentDashboardPage from './pages/ParentDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DoaSurahPage from './pages/DoaSurahPage';
import HafalanTestPage from './pages/HafalanTestPage';
import AdultSurahPage from './pages/AdultSurahPage';
import SholatSchedulePage from './pages/SholatSchedulePage';
import AdminDashboard from './pages/AdminDashboard';

function ParentalGateModal() {
  const { isPinModalOpen, setIsPinModalOpen, currentUser, setUserMode } = useApp();
  const [pinInput, setPinInput] = useState('');
  const [isError, setIsError] = useState(false);

  if (!isPinModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPin = currentUser?.pin || '1234';
    if (pinInput === correctPin) {
      setUserMode('parent'); // Switch back to Parent Dashboard
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
      backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
    }}>
      <div className="clay-card animate-fadeInUp" style={{ maxWidth: '360px', width: '90%', textAlign: 'center', border: '1px solid #e2e8f0', padding: '24px' }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔒</div>
        <h3 style={{ margin: '0 0 8px', fontWeight: 900, color: '#7c3aed' }}>Khusus Orang Tua</h3>
        <p style={{ fontSize: '13px', fontWeight: 700, color: '#718096', marginBottom: '16px' }}>
          Masukkan 4 digit PIN Anda untuk kembali ke Dashboard Orang Tua.
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
              textAlign: 'center', borderRadius: '12px', border: isError ? '1px solid #DC2626' : '1px solid #CBD5E1',
              backgroundColor: '#F7FAFC', outline: 'none', marginBottom: '12px', fontWeight: 900
            }}
            autoFocus
          />
          
          {isError && (
            <p style={{ color: '#E53E3E', fontSize: '12px', fontWeight: 800, margin: '0 0 12px' }}>
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
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'
  const { currentUser, userMode, sidebarOpen, setSidebarOpen, isMobile } = useApp();

  // Dynamic body class injector based on kids mode
  useEffect(() => {
    if (userMode === 'kids') {
      document.body.classList.add('kids-theme-active');
    } else {
      document.body.classList.remove('kids-theme-active');
    }
    return () => {
      document.body.classList.remove('kids-theme-active');
    };
  }, [userMode]);

  // Handle routing when mode changes
  useEffect(() => {
    if (userMode === 'adult') {
      setActivePage('prayer-guide');
    } else if (userMode === 'admin') {
      setActivePage('admin-panel');
    } else if (userMode === 'parent') {
      setActivePage('parent-dashboard');
    } else if (userMode === 'kids') {
      setActivePage('home');
    }
  }, [userMode]);

  // If user is not logged in, show Login/Register Page
  if (!currentUser) {
    return authView === 'login' 
      ? <LoginPage onRegisterClick={() => setAuthView('register')} /> 
      : <RegisterPage onLoginClick={() => setAuthView('login')} />;
  }

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
      case 'doa-surah':
        return <DoaSurahPage />;
      case 'hafalan-test':
        return <HafalanTestPage />;
      case 'adult-surah':
        return <AdultSurahPage />;
      case 'schedule':
        return <SholatSchedulePage />;
      case 'admin-panel':
        return <AdminDashboard />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AppSidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Mobile Sidebar Backdrop Overlay Scrim */}
      {isMobile && sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', 
            backdropFilter: 'blur(4px)', zIndex: 990
          }}
        />
      )}

      <div className="main-content-wrapper" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: (isMobile || !sidebarOpen) ? '0px' : '240px', 
        transition: 'margin-left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
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
      <div className="game-grid-bg" style={{ minHeight: '100vh' }}>
        <AppContent />
      </div>
    </AppProvider>
  );
}