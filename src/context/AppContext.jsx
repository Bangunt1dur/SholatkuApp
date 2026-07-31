// src/context/AppContext.js
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ACHIEVEMENTS } from '../data/GameData'; // Rumah baru data gamifikasi

const AppContext = createContext(null);

// ─── URL API BACKEND (PHP di Jagoan Hosting) ──────────────────
const API_URL = 'https://sholatku.web.id/api.php';

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

// Auto-Purge old mock data (barry, mock 30-day history) from LocalStorage
if (typeof window !== 'undefined') {
  try {
    const storedProfile = JSON.parse(localStorage.getItem('sholatku_profile') || '{}');
    const storedUser = JSON.parse(localStorage.getItem('sholatku_userAccount') || '{}');
    const storedStreak = JSON.parse(localStorage.getItem('sholatku_streakHistory') || '[]');
    
    // If old mock name or mock history is present, clear storage for clean fresh start
    if (storedProfile.name === 'barry' || storedProfile.name === 'Ahmad' || storedProfile.gems === 5 || storedUser.name === 'Pramudya' || storedStreak.length > 5) {
      localStorage.removeItem('sholatku_profile');
      localStorage.removeItem('sholatku_streakHistory');
      localStorage.removeItem('sholatku_prayerPunctuality');
      localStorage.removeItem('sholatku_userAccount');
      localStorage.removeItem('sholatku_parentTarget');
    }
  } catch (e) {}
}

// ─── DEFAULT STATES (FRESH NEW USER) ───────────────────────────
const DEFAULT_PROFILE = {
  name: 'Teman Sholat',
  level: 1,
  xp: 0,
  xpToNext: 100,
  gems: 0,
  stars: 0,
  completedMovements: [],
  quizCorrect: 0,
  dailyComplete: 0,
  streak: 0,
  longestStreak: 0,
  subuhDone: false,
  earnedBadges: [],
  totalPrayers: 0,
  readSurahs: [],
  lastReadSurah: null
};

const DEFAULT_TRACKER = {
  date: getTodayDateString(),
  fajr: false,
  dhuhr: false,
  asr: false,
  maghrib: false,
  isha: false,
};

// =========================================================================
// PROVIDER UTAMA (OTAK LOGIKA GLOBAL)
// =========================================================================
export function AppProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => loadFromStorage('sholatku_isLoggedIn', false));
  const [activeProfile, setActiveProfile] = useState(() => loadFromStorage('sholatku_activeProfile', null));
  const [userAccount, setUserAccount] = useState(() => loadFromStorage('sholatku_userAccount', {
    name: 'Teman Sholat',
    email: 'user@sholatku.app',
    password: 'password123',
    pin: '1234',
    role: 'anak'
  }));

  const [isKidsMode, setIsKidsMode] = useState(() => loadFromStorage('sholatku_kidsMode', true));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Gembok Mode Dewasa (Parental Gate)
  const [isPinModalOpen, setIsPinModalOpen] = useState(false); 

  // Profile & Gamifikasi State (Fresh default)
  const [profile, setProfileRaw] = useState(() => ({
    ...DEFAULT_PROFILE,
    ...loadFromStorage('sholatku_profile', {}),
  }));

  // Daily Prayer Tracker State
  const [tracker, setTrackerRaw] = useState(() => {
    const stored = loadFromStorage('sholatku_tracker', DEFAULT_TRACKER);
    if (stored.date !== getTodayDateString()) {
      return { ...DEFAULT_TRACKER, date: getTodayDateString() };
    }
    return stored;
  });

  // Target Orang Tua
  const [parentTarget, setParentTargetRaw] = useState(() => loadFromStorage('sholatku_parentTarget', {
    targetCount: 30,
    reward: 'Hadiah Ibadah 🎁',
    isClaimed: false
  }));

  const setParentTarget = useCallback((val) => {
    setParentTargetRaw(val);
    saveToStorage('sholatku_parentTarget', val);
  }, []);

  // Detail Ketepatan Waktu Sholat (Kosong untuk akun baru)
  const [prayerPunctuality, setPrayerPunctualityRaw] = useState(() => {
    return loadFromStorage('sholatku_prayerPunctuality', {});
  });

  const setPrayerPunctuality = useCallback((updater) => {
    setPrayerPunctualityRaw((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      saveToStorage('sholatku_prayerPunctuality', next);
      return next;
    });
  }, []);

  // Riwayat Sholat untuk Kalender (Kosong untuk akun baru)
  const [streakHistory, setStreakHistoryRaw] = useState(() => {
    return loadFromStorage('sholatku_streakHistory', []);
  });

  // Petualangan / Adventure Progress
  const [adventureLevel, setAdventureLevelRaw] = useState(() =>
    loadFromStorage('sholatku_adventureLevel', 0)
  );

  const [activeGuideIndex, setActiveGuideIndex] = useState(0);

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

  const login = useCallback(async (email, password) => {
    try {
      // Coba login via API server (MySQL)
      const res = await fetch(`${API_URL}?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        const acc = { ...data.user, password }; // simpan password lokal untuk fallback
        setUserAccount(acc);
        saveToStorage('sholatku_userAccount', acc);
        saveToStorage('sholatku_userId', data.user.id);
        setIsLoggedIn(true);
        saveToStorage('sholatku_isLoggedIn', true);
        // Muat profil dari server
        if (data.profile) {
          setProfile(p => ({ ...p, ...data.profile }));
        }
        selectProfile(data.user.role);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Email atau password salah!' };
      }
    } catch (err) {
      // Fallback ke localStorage jika server tidak terjangkau
      console.warn('API tidak terjangkau, fallback ke localStorage:', err);
      if (email === userAccount.email && password === userAccount.password) {
        setIsLoggedIn(true);
        saveToStorage('sholatku_isLoggedIn', true);
        if (userAccount.role) selectProfile(userAccount.role);
        return { success: true };
      }
      return { success: false, message: 'Email atau password salah!' };
    }
  }, [userAccount, selectProfile, setProfile]);

  const register = useCallback(async (data) => {
    try {
      // Coba register via API server (MySQL)
      const res = await fetch(`${API_URL}?action=register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();

      if (result.success) {
        const acc = { ...result.user, password: data.password };
        setUserAccount(acc);
        saveToStorage('sholatku_userAccount', acc);
        saveToStorage('sholatku_userId', result.user.id);
        setIsLoggedIn(true);
        saveToStorage('sholatku_isLoggedIn', true);
        setProfile(p => ({ ...p, name: data.name }));
        selectProfile(acc.role);
        return { success: true };
      } else {
        return { success: false, message: result.message || 'Registrasi gagal!' };
      }
    } catch (err) {
      // Fallback ke localStorage jika server tidak terjangkau
      console.warn('API tidak terjangkau, fallback ke localStorage:', err);
      const newAcc = {
        name: data.name, email: data.email,
        password: data.password, pin: data.pin || '1234', role: data.role || 'anak'
      };
      setUserAccount(newAcc);
      saveToStorage('sholatku_userAccount', newAcc);
      setIsLoggedIn(true);
      saveToStorage('sholatku_isLoggedIn', true);
      setProfile(p => ({ ...p, name: data.name }));
      selectProfile(newAcc.role);
      return { success: true };
    }
  }, [setProfile, selectProfile]);

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

  // ─── SINKRONISASI TRACKER KE SERVER ────────────────────────
  const syncTrackerToServer = useCallback(async (trackerData) => {
    const userId = loadFromStorage('sholatku_userId', null);
    if (!userId) return; // Skip jika belum login via server
    try {
      await fetch(`${API_URL}?action=save_tracker`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          date:    trackerData.date,
          fajr:    trackerData.fajr    ? 1 : 0,
          dhuhr:   trackerData.dhuhr   ? 1 : 0,
          asr:     trackerData.asr     ? 1 : 0,
          maghrib: trackerData.maghrib ? 1 : 0,
          isha:    trackerData.isha    ? 1 : 0,
        })
      });
    } catch (err) {
      console.warn('Gagal sinkron tracker ke server:', err);
    }
  }, []);

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

      // Sinkron ke server MySQL
      syncTrackerToServer(next);

      return next;
    });
  }, [setTracker, addXP, addStars, addGems, setProfile, setStreakHistory, setPrayerPunctuality, syncTrackerToServer]);

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
  // Menandai surah Al-Qur'an yang dibaca & melacak progress Al-Qur'an
  const markSurahRead = useCallback((surahNumber, surahName, surahLatin) => {
    setProfile((prev) => {
      const readSurahs = prev.readSurahs || [];
      const alreadyRead = readSurahs.includes(surahNumber);
      const nextReadSurahs = alreadyRead ? readSurahs : [...readSurahs, surahNumber];
      return {
        ...prev,
        readSurahs: nextReadSurahs,
        lastReadSurah: { number: surahNumber, name: surahName, latin: surahLatin, date: getTodayDateString() },
        xp: prev.xp + (alreadyRead ? 0 : 15)
      };
    });
  }, [setProfile]);

  // Reset ulang seluruh data dummy agar menjadi akun baru fresh
  const resetAllData = useCallback(() => {
    localStorage.clear();
    setProfileRaw(DEFAULT_PROFILE);
    setTrackerRaw(DEFAULT_TRACKER);
    setPrayerPunctualityRaw({});
    setStreakHistoryRaw([]);
    setAdventureLevelRaw(0);
    saveToStorage('sholatku_profile', DEFAULT_PROFILE);
    saveToStorage('sholatku_tracker', DEFAULT_TRACKER);
  }, []);

  // Perhitungan ringkas helper
  const trackedPrayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
  const prayersDoneToday = trackedPrayers.filter((k) => tracker[k]).length;

  const updateParentPin = useCallback((newPin) => {
    setUserAccount((prev) => {
      const next = { ...prev, pin: newPin };
      saveToStorage('sholatku_userAccount', next);
      return next;
    });
  }, []);

  const value = {
    isLoggedIn, login, register, logout,
    activeProfile, selectProfile, userAccount, updateParentPin,
    isKidsMode, toggleMode,
    requestModeChange, isPinModalOpen, setIsPinModalOpen,
    sidebarOpen, setSidebarOpen,
    profile, setProfile,
    tracker, togglePrayer, prayersDoneToday,
    streakHistory,
    adventureLevel, setAdventureLevel,
    activeGuideIndex, setActiveGuideIndex,
    addXP, addStars, addGems,
    completeMovement, recordQuizCorrect,
    markSurahRead, resetAllData,
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