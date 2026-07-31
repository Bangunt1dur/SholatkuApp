import { useState, useEffect, useCallback } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import AppSidebar from './components/Shared/Sidebar';
import AppHeader from './components/Shared/Header';
import AppFooter from './components/Shared/Footer';
import HomePage from './pages/HomePage';
import SholatGuidePage from './pages/SholatGuidePage';
import PrayerTrackerPage from './pages/SholatTrackerPage';
import SholatQuizPage from './pages/SholatQuizPage';
import AdventurePage from './pages/AdventurePage';
import ProfilePage from './pages/ProfilePage';

// Import KEDUA Dashboard (Anak & Orang Tua)
import ChildDashboardPage from "./pages/DashboardAnak"; 
import ParentDashboardPage from "./pages/DasboardOrangTua"; // Sesuaikan nama file tanpa 'h' sesuai gambar

import DasboardDewasa from "./pages/DasboardDewasa";

// New Pages Imports
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePicker from './pages/ProfilePicker';

function ParentalGateModal({ setActivePage }) {
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
      setActivePage('parent-dashboard');
    } else {
      setIsError(true);
      setPinInput('');
    }
  };

  return (
    <div style={{
      position: 'relative', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
    }}>
      <div className="clay-card animate-fadeInUp" style={{ maxWidth: '360px', width: '90%', textAlign: 'center' }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔒</div>
        <h3 style={{ margin: '0 0 8px', fontWeight: 900, color: '#113C2B', letterSpacing: '-0.5px' }}>Khusus Orang Tua</h3>
        <p style={{ fontSize: '14px', fontWeight: 700, color: '#113C2B', marginBottom: '16px' }}>
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
              width: '100%', padding: '12px', paddingLeft: 'calc(12px + 8px)', fontSize: '24px', letterSpacing: '8px',
              textAlign: 'center', borderRadius: '12px', border: isError ? '4px solid var(--pink-clay)' : '4px solid var(--game-dark)',
              backgroundColor: '#F7FAFC', outline: 'none', marginBottom: '12px', fontWeight: 900,
              boxSizing: 'border-box'
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
            <button type="submit" className="clay-btn purple" style={{ flex: 1, padding: '10px', backgroundColor: '#113C2B', borderColor: '#082218', boxShadow: '4px 4px 0px #082218' }}>
              Verifikasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AppContent() {
  const { isLoggedIn, activeProfile, sidebarOpen, isKidsMode } = useApp();
  const [activePage, setActivePageState] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'landing';
  });

  const setActivePage = useCallback((newPage, pushHistory = true) => {
    setActivePageState((prev) => {
      if (prev !== newPage && pushHistory) {
        window.history.pushState({ page: newPage }, '', `#${newPage}`);
      }
      return newPage;
    });
  }, []);

  useEffect(() => {
    const handlePopState = (e) => {
      const pageFromState = e.state?.page;
      const hashPage = window.location.hash.replace('#', '');
      const targetPage = pageFromState || hashPage || 'landing';
      setActivePageState(targetPage);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      if (activePage !== 'login' && activePage !== 'register' && activePage !== 'landing') {
        setActivePage('landing', false);
      }
    } else {
      if (!activeProfile) {
        if (activePage !== 'profile-picker') {
          setActivePage('profile-picker', false);
        }
      } else if (activePage === 'landing' || activePage === 'login' || activePage === 'register' || activePage === 'profile-picker') {
        const defaultTarget = activeProfile === 'anak' ? 'home' : activeProfile === 'dewasa' ? 'adult-quran' : 'parent-dashboard';
        setActivePage(defaultTarget, false);
      }
    }
  }, [isLoggedIn, activeProfile]);

  const renderPage = () => {
    if (!isLoggedIn) {
      switch (activePage) {
        case 'login':
          return <LoginPage setActivePage={setActivePage} />;
        case 'register':
          return <RegisterPage setActivePage={setActivePage} />;
        case 'landing':
        default:
          return <LandingPage setActivePage={setActivePage} />;
      }
    }

    if (!activeProfile || activePage === 'profile-picker') {
      return <ProfilePicker setActivePage={setActivePage} />;
    }

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
        return <AdventurePage setActivePage={setActivePage} />;
      case 'profile':
        return <ProfilePage />;
      case 'child-dashboard': // Jalur menu untuk Dashboard Anak
        return <ChildDashboardPage />;
      case 'parent-dashboard':
        return <ParentDashboardPage section="overview" setActivePage={setActivePage} />;
      case 'parent-punctuality':
        return <ParentDashboardPage section="punctuality" setActivePage={setActivePage} />;
      case 'parent-missed':
        return <ParentDashboardPage section="missed" setActivePage={setActivePage} />;
      case 'parent-target':
        return <ParentDashboardPage section="target" setActivePage={setActivePage} />;
      case 'adult-quran':
        return <DasboardDewasa section="quran" />;
      case 'adult-guide':
        return <DasboardDewasa section="guide" />;
      case 'adult-schedule':
        return <DasboardDewasa section="schedule" />;
      case 'adult-kiblat':
        return <DasboardDewasa section="kiblat" />;
      case 'adult-dzikir':
        return <DasboardDewasa section="dzikir" />;
      case 'adult-kajian':
        return <DasboardDewasa section="kajian" />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  if (!isLoggedIn || !activeProfile || activePage === 'profile-picker') {
    return <main style={{ flex: 1, position: 'relative' }}>{renderPage()}</main>;
  }

  return (
    <div className={`main-app-container ${isKidsMode ? 'kids-mode' : 'parent-mode'}`}>
      {/* Sidebar Utama */}
      <AppSidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Konten Halaman Utama */}
      <div className={`page-content-wrapper ${sidebarOpen ? 'sidebar-is-open' : 'sidebar-is-closed'}`}>
        {/* Bungkusan Header */}
        <div className="header-container-block">
          <AppHeader setActivePage={setActivePage} />
        </div>

        {/* Isi Halaman Utama */}
        <main className="dashboard-main-core">
          {renderPage()}
        </main>

        {/* Footer Desktop */}
        <AppFooter />
      </div>

      <ParentalGateModal setActivePage={setActivePage} />
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