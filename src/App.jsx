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
import DasboardOrangTua from './pages/DasboardOrangTua';
import ChildDashboardPage from './pages/DashboardAnak';
import DasboardDewasa from './pages/DasboardDewasa';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePicker from './pages/ProfilePicker';
import DoaSurahPage from './pages/DoaSurahPage';
import HafalanTestPage from './pages/HafalanTestPage';
import AdultSurahPage from './pages/AdultSurahPage';
import SholatSchedulePage from './pages/SholatSchedulePage';
import AdminDashboard from './pages/AdminDashboard';

function ParentalGateModal({ setActivePage }) {
  const { isPinModalOpen, setIsPinModalOpen, currentUser, setUserMode } = useApp();
  const [pinInput, setPinInput] = useState('');
  const [isError, setIsError] = useState(false);

  if (!isPinModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPin = currentUser?.pin || '1234';
    if (pinInput === correctPin) {
      if (setUserMode) setUserMode('parent');
      setIsPinModalOpen(false);
      setPinInput('');
      setIsError(false);
      if (setActivePage) setActivePage('parent-dashboard');
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
      <div className="clay-card animate-fadeInUp" style={{ maxWidth: '360px', width: '90%', textAlign: 'center', border: '3px solid #000', padding: '24px', borderRadius: '24px', backgroundColor: '#fff', boxShadow: '6px 6px 0px #000' }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔒</div>
        <h3 style={{ margin: '0 0 8px', fontWeight: 900, color: '#113C2B' }}>Khusus Orang Tua</h3>
        <p style={{ fontSize: '13px', fontWeight: 700, color: '#556B52', marginBottom: '16px' }}>
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
              textAlign: 'center', borderRadius: '12px', border: isError ? '3px solid #ef4444' : '3px solid #113C2B',
              backgroundColor: '#F8FAF8', outline: 'none', marginBottom: '12px', fontWeight: 900,
              boxSizing: 'border-box'
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
            <button type="submit" className="clay-btn purple" style={{ flex: 1, padding: '10px', backgroundColor: '#113C2B', borderColor: '#082218', boxShadow: '4px 4px 0px #082218', color: '#fff' }}>
              Verifikasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AppContent() {
  const { isLoggedIn, activeProfile, currentUser, userMode, sidebarOpen, setSidebarOpen, isKidsMode } = useApp();
  const [activePage, setActivePage] = useState('home');

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

  useEffect(() => {
    if (isLoggedIn || currentUser) {
      if (activePage === 'landing' || activePage === 'login' || activePage === 'register') {
        if (userMode === 'admin') {
          setActivePage('admin-panel');
        } else if (userMode === 'adult' || activeProfile === 'dewasa') {
          setActivePage('adult-quran');
        } else if (userMode === 'parent' || activeProfile === 'ortu') {
          setActivePage('parent-dashboard');
        } else {
          setActivePage('home');
        }
      }
    }
  }, [isLoggedIn, currentUser, activeProfile, userMode]);

  const renderPage = () => {
    const isAuthenticated = isLoggedIn || !!currentUser;

    if (!isAuthenticated) {
      switch (activePage) {
        case 'login':
          return <LoginPage onRegisterClick={() => setActivePage('register')} setActivePage={setActivePage} />;
        case 'register':
          return <RegisterPage onLoginClick={() => setActivePage('login')} setActivePage={setActivePage} />;
        case 'landing':
        default:
          return <LandingPage setActivePage={setActivePage} />;
      }
    }

    if (activePage === 'profile-picker') {
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
        return <AdventurePage />;
      case 'profile':
        return <ProfilePage />;
      case 'child-dashboard':
        return <ChildDashboardPage />;
      case 'parent-dashboard':
        return <ParentDashboardPage />;
      case 'parent-punctuality':
        return <DasboardOrangTua section="punctuality" />;
      case 'parent-missed':
        return <DasboardOrangTua section="missed" />;
      case 'parent-target':
        return <DasboardOrangTua section="target" />;
      case 'adult-quran':
        return <DasboardDewasa section="quran" />;
      case 'adult-guide':
        return <DasboardDewasa section="guide" />;
      case 'adult-schedule':
        return <SholatSchedulePage />;
      case 'adult-kiblat':
        return <DasboardDewasa section="kiblat" />;
      case 'adult-dzikir':
        return <DasboardDewasa section="dzikir" />;
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

  const isAuthenticated = isLoggedIn || !!currentUser;

  if (!isAuthenticated || activePage === 'landing' || activePage === 'login' || activePage === 'register' || activePage === 'profile-picker') {
    return <main style={{ flex: 1, position: 'relative' }}>{renderPage()}</main>;
  }

  return (
    <div className={`main-app-container ${isKidsMode ? 'kids-mode' : 'parent-mode'}`}>
      <AppSidebar activePage={activePage} setActivePage={setActivePage} />

      <div className={`page-content-wrapper ${sidebarOpen ? 'sidebar-is-open' : 'sidebar-is-closed'}`}>
        <div className="header-container-block">
          <AppHeader setActivePage={setActivePage} />
        </div>

        <main className="dashboard-main-core">
          {renderPage()}
        </main>
      </div>

      <ParentalGateModal setActivePage={setActivePage} />
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