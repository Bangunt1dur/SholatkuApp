// src/context/AppContext.js
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ACHIEVEMENTS } from '../data/GameData'; // Rumah baru data gamifikasi

const AppContext = createContext(null);

// ─── LOCALSTORAGE HELPERS ─────────────────────────────────────
const loadFromStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

const getTodayDateString = () => new Date().toISOString().split('T')[0];

// ─── DEFAULT STATES ───────────────────────────────────────────
const DEFAULT_PROFILE = {
  name: 'Ahmad',
  level: 1,
  xp: 0,
  xpToNext: 100,
  gems: 5,
  stars: 0,
  completedMovements: [],
  quizCorrect: 0,
  dailyComplete: 0,
  streak: 0,
  longestStreak: 0,
  subuhDone: false,
  earnedBadges: [],
  totalPrayers: 0,
};

const DEFAULT_TRACKER = {
  date: getTodayDateString(),
  fajr: false,
  dhuhr: false,
  asr: false,
  maghrib: false,
  isha: false,
};

const generateMockHistory = () => {
  const history = [];
  const details = {};
  const today = new Date();
  
  // Generate data for the past 30 days
  for (let i = 30; i > 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Child sholats 3 to 5 times a day (mostly 4 or 5)
    const count = Math.floor(Math.random() * 3) + 3; // 3, 4, 5
    history.push({ date: dateStr, count });
    
    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    details[dateStr] = {};
    
    // Randomly assign which prayers were done and whether they were tepat/terlambat
    let assigned = 0;
    while (assigned < count) {
      const p = prayers[Math.floor(Math.random() * 5)];
      if (!details[dateStr][p]) {
        details[dateStr][p] = Math.random() > 0.35 ? 'tepat' : 'terlambat';
        assigned++;
      }
    }
  }
  return { history, details };
};

// =========================================================================
// PROVIDER UTAMA (OTAK LOGIKA GLOBAL)
// =========================================================================
export function AppProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => loadFromStorage('sholatku_isLoggedIn', false));
  const [activeProfile, setActiveProfile] = useState(() => loadFromStorage('sholatku_activeProfile', null));
  const [userAccount, setUserAccount] = useState(() => loadFromStorage('sholatku_userAccount', {
    name: 'Pramudya',
    email: 'pramudya@sholatku.com',
    password: 'password123',
    pin: '1234'
  }));

  const [isKidsMode, setIsKidsMode] = useState(() => loadFromStorage('sholatku_kidsMode', true));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Gembok Mode Dewasa (Parental Gate)
  const [isPinModalOpen, setIsPinModalOpen] = useState(false); 

  // Profile & Gamifikasi State
  const [profile, setProfileRaw] = useState(() => ({
    ...DEFAULT_PROFILE,
    ...loadFromStorage('sholatku_profile', {}),
  }));

  // Daily Prayer Tracker State
  const [tracker, setTrackerRaw] = useState(() => {
    const stored = loadFromStorage('sholatku_tracker', DEFAULT_TRACKER);
    // Jika ganti hari, reset tracker harian ke false semua
    if (stored.date !== getTodayDateString()) {
      return { ...DEFAULT_TRACKER, date: getTodayDateString() };
    }
    return stored;
  });

  // Target Orang Tua
  const [parentTarget, setParentTargetRaw] = useState(() => loadFromStorage('sholatku_parentTarget', {
    targetCount: 120,
    reward: 'Mainan LEGO Creator 🧱',
    isClaimed: false
  }));

  const setParentTarget = useCallback((val) => {
    setParentTargetRaw(val);
    saveToStorage('sholatku_parentTarget', val);
  }, []);

  // Detail Ketepatan Waktu Sholat
  const [prayerPunctuality, setPrayerPunctualityRaw] = useState(() => {
    const stored = loadFromStorage('sholatku_prayerPunctuality', null);
    if (stored) return stored;
    
    const mock = generateMockHistory();
    return mock.details;
  });

  const setPrayerPunctuality = useCallback((updater) => {
    setPrayerPunctualityRaw((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      saveToStorage('sholatku_prayerPunctuality', next);
      return next;
    });
  }, []);

  // Riwayat Sholat (90 Hari Terakhir) untuk Kalender Streak
  const [streakHistory, setStreakHistoryRaw] = useState(() => {
    const stored = loadFromStorage('sholatku_streakHistory', []);
    if (stored && stored.length > 0) return stored;
    
    const mock = generateMockHistory();
    saveToStorage('sholatku_streakHistory', mock.history);
    saveToStorage('sholatku_prayerPunctuality', mock.details);
    return mock.history;
  });

  // Petualangan / Adventure Progress
  const [adventureLevel, setAdventureLevelRaw] = useState(() =>
    loadFromStorage('sholatku_adventureLevel', 0)
  );

  // ─── PERSISTENCE WRAPPERS (Fungsi Pengupdate Penyimpanan) ───
  const setProfile = useCallback((updater) => {
    setProfileRaw((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      saveToStorage('sholatku_profile', next);
      return next;
    });
  }, []);

  const setTracker = useCallback((updater) => {
    setTrackerRaw((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      saveToStorage('sholatku_tracker', next);
      return next;
    });
  }, []);

  const setStreakHistory = useCallback((updater) => {
    setStreakHistoryRaw((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveToStorage('sholatku_streakHistory', next);
      return next;
    });
  }, []);

  const setAdventureLevel = useCallback((val) => {
    setAdventureLevelRaw(val);
    saveToStorage('sholatku_adventureLevel', val);
  }, []);

  // ─── AUTHENTICATION ACTIONS ───
  const login = useCallback((email, password) => {
    if (email === userAccount.email && password === userAccount.password) {
      setIsLoggedIn(true);
      saveToStorage('sholatku_isLoggedIn', true);
      return { success: true };
    }
    return { success: false, message: 'Email atau password salah!' };
  }, [userAccount]);

  const register = useCallback((data) => {
    const newAcc = {
      name: data.name,
      email: data.email,
      password: data.password,
      pin: data.pin || '1234'
    };
    setUserAccount(newAcc);
    saveToStorage('sholatku_userAccount', newAcc);
    setIsLoggedIn(true);
    saveToStorage('sholatku_isLoggedIn', true);
    setProfile(p => ({ ...p, name: data.name }));
    return { success: true };
  }, [setProfile]);

  const selectProfile = useCallback((role) => {
    setActiveProfile(role);
    saveToStorage('sholatku_activeProfile', role);
    if (role === 'anak') {
      setIsKidsMode(true);
      saveToStorage('sholatku_kidsMode', true);
    } else {
      setIsKidsMode(false);
      saveToStorage('sholatku_kidsMode', false);
    }
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setActiveProfile(null);
    saveToStorage('sholatku_isLoggedIn', false);
    saveToStorage('sholatku_activeProfile', null);
  }, []);

  // ─── LOGIKA GERBANG PARENT MODE (GEMBOK PIN) ─────────────────
  const toggleMode = useCallback(() => {
    setIsKidsMode((prev) => {
      const nextMode = !prev;
      saveToStorage('sholatku_kidsMode', nextMode);
      setActiveProfile(nextMode ? 'anak' : 'ortu');
      saveToStorage('sholatku_activeProfile', nextMode ? 'anak' : 'ortu');
      return nextMode;
    });
  }, []);

  const requestModeChange = useCallback(() => {
    if (isKidsMode) {
      setIsPinModalOpen(true); // Hadang dengan pop-up PIN modal jika dari mode anak
    } else {
      toggleMode(); // Langsung balik ke mode anak tanpa hadangan PIN
    }
  }, [isKidsMode, toggleMode]);

  // Sinkronisasi kelas body jika dibutuhkan oleh styling global
  useEffect(() => {
    document.body.classList.toggle('kids-mode', isKidsMode);
  }, [isKidsMode]);

  // ─── CORE GAMIFICATION ACTIONS ──────────────────────────────
  const addXP = useCallback((amount) => {
    setProfile((prev) => {
      let xp = prev.xp + amount;
      let level = prev.level;
      let xpToNext = prev.xpToNext;
      // Perhitungan Level Up dinamis
      while (xp >= xpToNext) {
        xp -= xpToNext;
        level++;
        xpToNext = Math.floor(xpToNext * 1.4);
      }
      return { ...prev, xp, level, xpToNext };
    });
  }, [setProfile]);

  const addStars = useCallback((n = 1) => {
    setProfile((prev) => ({ ...prev, stars: prev.stars + n }));
  }, [setProfile]);

  const addGems = useCallback((n = 1) => {
    setProfile((prev) => ({ ...prev, gems: prev.gems + n }));
  }, [setProfile]);

  // Menandai gerakan sholat yang sudah dipelajari
  const completeMovement = useCallback((key) => {
    setProfile((prev) => {
      if (prev.completedMovements.includes(key)) return prev;
      const completedMovements = [...prev.completedMovements, key];
      return { ...prev, completedMovements };
    });
    addXP(20);
    addStars(1);
  }, [setProfile, addXP, addStars]);

  // Mencatat skor kuis
  const recordQuizCorrect = useCallback(() => {
    setProfile((prev) => ({ ...prev, quizCorrect: prev.quizCorrect + 1 }));
    addXP(15);
    addGems(1);
  }, [setProfile, addXP, addGems]);

  // ─── ABSEN SHOLAT & PERHITUNGAN STREAK ──────────────────────
  const togglePrayer = useCallback((prayerKey) => {
    setTracker((prev) => {
      const next = { ...prev, [prayerKey]: !prev[prayerKey] };
      const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
      const checkedCount = prayers.filter((k) => next[k]).length;

      // Reward koin/bintang tiap ada pencentangan baru
      if (!prev[prayerKey]) {
        addXP(10);
        addStars(1);
      }

      // Bonus jika 5 waktu tercapai penuh
      if (checkedCount === 5) {
        addXP(50);
        addGems(3);
        setProfile((p) => ({ ...p, dailyComplete: p.dailyComplete + 1 }));
      }

      // Update detail ketepatan waktu
      const todayStr = getTodayDateString();
      if (!prev[prayerKey]) {
        const status = Math.random() > 0.25 ? 'tepat' : 'terlambat';
        setPrayerPunctuality((prevDetails) => {
          const dayDetails = prevDetails[todayStr] || {};
          return {
            ...prevDetails,
            [todayStr]: {
              ...dayDetails,
              [prayerKey]: status
            }
          };
        });
      } else {
        setPrayerPunctuality((prevDetails) => {
          const dayDetails = { ...(prevDetails[todayStr] || {}) };
          delete dayDetails[prayerKey];
          return {
            ...prevDetails,
            [todayStr]: dayDetails
          };
        });
      }

      // Update array riwayat harian
      const todayEntry = { date: getTodayDateString(), count: checkedCount };
      setStreakHistory((hist) => {
        const idx = hist.findIndex((h) => h.date === getTodayDateString());
        if (idx >= 0) {
          const h = [...hist];
          h[idx] = todayEntry;
          return h;
        }
        return [...hist, todayEntry];
      });

      // Validasi pencapaian subuh
      if (prayerKey === 'fajr' && !prev.fajr) {
        setProfile((p) => ({ ...p, subuhDone: true }));
      }

      return next;
    });
  }, [setTracker, addXP, addStars, addGems, setProfile, setStreakHistory, setPrayerPunctuality]);

  // Efek Otomatis untuk Kalkulasi Streak Beruntun dari History
  useEffect(() => {
    const sorted = [...streakHistory].sort((a, b) => b.date.localeCompare(a.date));
    let streak = 0;
    const d = new Date();
    
    for (let i = 0; i < sorted.length; i++) {
      const dStr = d.toISOString().split('T')[0];
      if (sorted[i].date === dStr && sorted[i].count > 0) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    
    setProfile((p) => ({
      ...p,
      streak,
      longestStreak: Math.max(p.longestStreak, streak),
      totalPrayers: streakHistory.reduce((acc, h) => acc + h.count, 0),
    }));
  }, [streakHistory, setProfile]);

  // Pengecekan otomatis lencana pencapaian (Achievements)
  useEffect(() => {
    const newBadges = ACHIEVEMENTS
      .filter((a) => !profile.earnedBadges.includes(a.id) && a.condition(profile))
      .map((a) => a.id);
    if (newBadges.length > 0) {
      setProfile((p) => ({ ...p, earnedBadges: [...p.earnedBadges, ...newBadges] }));
    }
  }, [profile, setProfile]);

  // Perhitungan ringkas helper
  const trackedPrayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
  const prayersDoneToday = trackedPrayers.filter((k) => tracker[k]).length;

  const value = {
    isLoggedIn, login, register, logout,
    activeProfile, selectProfile, userAccount,
    isKidsMode, toggleMode,
    requestModeChange, isPinModalOpen, setIsPinModalOpen,
    sidebarOpen, setSidebarOpen,
    profile, setProfile,
    tracker, togglePrayer, prayersDoneToday,
    streakHistory,
    adventureLevel, setAdventureLevel,
    addXP, addStars, addGems,
    completeMovement, recordQuizCorrect,
    parentTarget, setParentTarget,
    prayerPunctuality, setPrayerPunctuality,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}