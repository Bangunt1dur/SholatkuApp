// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ACHIEVEMENTS, SHOLAT_MOVEMENTS as DEFAULT_MOVEMENTS } from '../data/data';

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

const DEFAULT_USERS = [
  { id: 'admin-user', role: 'admin', email: 'admin@sholatku.com', name: 'System Admin', username: 'admin', password: 'admin123' }
];

const DEFAULT_TRACKER = {
  date: getTodayDateString(),
  fajr: false,
  dhuhr: false,
  asr: false,
  maghrib: false,
  isha: false,
};

const DEFAULT_PROFILE = {
  name: 'Adit',
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
  streakHistory: []
};

const generateMockHistory = () => {
  const history = [];
  const details = {};
  const today = new Date();
  
  for (let i = 30; i > 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    const count = Math.floor(Math.random() * 3) + 3;
    history.push({ date: dateStr, count });
    
    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    details[dateStr] = {};
    
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

export function AppProvider({ children }) {
  // Global Database States
  const [users, setUsersRaw] = useState(() => loadFromStorage('sholatku_users_db', DEFAULT_USERS));
  const [movements, setMovementsRaw] = useState(() => loadFromStorage('sholatku_movements_db', DEFAULT_MOVEMENTS));
  const [submissions, setSubmissionsRaw] = useState(() => loadFromStorage('sholatku_submissions_db', []));

  // Active Sessions
  const [currentUser, setCurrentUserRaw] = useState(() => loadFromStorage('sholatku_currentUser', null));
  const [userMode, setUserModeRaw] = useState(() => loadFromStorage('sholatku_userMode', 'parent'));
  const [isParentUnlocked, setIsParentUnlocked] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  // Additional session state for Frontend compatibility
  const [isLoggedIn, setIsLoggedIn] = useState(() => loadFromStorage('sholatku_isLoggedIn', false));
  const [activeProfile, setActiveProfile] = useState(() => loadFromStorage('sholatku_activeProfile', null));
  const [isKidsMode, setIsKidsMode] = useState(() => loadFromStorage('sholatku_kidsMode', true));

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Profile & Gamifikasi Fallback State
  const [profileRawState, setProfileRaw] = useState(() => ({
    ...DEFAULT_PROFILE,
    ...loadFromStorage('sholatku_profile', {}),
  }));

  // Daily Prayer Tracker Fallback State
  const [trackerRawState, setTrackerRaw] = useState(() => {
    const stored = loadFromStorage('sholatku_tracker', DEFAULT_TRACKER);
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

  // Riwayat Sholat (Streak)
  const [streakHistory, setStreakHistoryRaw] = useState(() => {
    const stored = loadFromStorage('sholatku_streakHistory', []);
    if (stored && stored.length > 0) return stored;
    const mock = generateMockHistory();
    saveToStorage('sholatku_streakHistory', mock.history);
    saveToStorage('sholatku_prayerPunctuality', mock.details);
    return mock.history;
  });

  const [adventureLevel, setAdventureLevelRaw] = useState(() =>
    loadFromStorage('sholatku_adventureLevel', 0)
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1024);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Persistence wrappers
  const setUsers = useCallback((val) => {
    setUsersRaw(val);
    saveToStorage('sholatku_users_db', val);
  }, []);

  const setMovements = useCallback((val) => {
    setMovementsRaw(val);
    saveToStorage('sholatku_movements_db', val);
  }, []);

  const setSubmissions = useCallback((val) => {
    setSubmissionsRaw(val);
    saveToStorage('sholatku_submissions_db', val);
  }, []);

  const setCurrentUser = useCallback((val) => {
    setCurrentUserRaw(val);
    saveToStorage('sholatku_currentUser', val);
  }, []);

  const setUserMode = useCallback((val) => {
    setUserModeRaw(val);
    saveToStorage('sholatku_userMode', val);
  }, []);

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

  // ─── AUTHENTICATION HELPERS ─────────────────────────────────
  const registerParent = useCallback((parentName, childName, email, password, pin) => {
    const exists = users.find(u => u.email === email);
    if (exists) return { success: false, message: 'Email sudah terdaftar!' };

    const newUser = {
      id: 'parent-' + Date.now(),
      role: 'parent',
      name: parentName,
      email,
      password,
      pin,
      childName,
      rewards: [
        { id: 'r1', name: 'Es Krim Lezat 🍦', targetStreak: 3, status: 'locked' },
        { id: 'r2', name: 'Mainan Edukasi Baru 🧩', targetStreak: 7, status: 'locked' }
      ],
      childStats: {
        name: childName,
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
        streakHistory: [],
        tracker: {
          date: getTodayDateString(),
          fajr: false,
          dhuhr: false,
          asr: false,
          maghrib: false,
          isha: false,
        },
        adventureLevel: 0
      }
    };

    setUsers([...users, newUser]);
    setIsLoggedIn(true);
    saveToStorage('sholatku_isLoggedIn', true);
    return { success: true };
  }, [users, setUsers]);

  const registerAdult = useCallback((name, email, password) => {
    const exists = users.find(u => u.email === email);
    if (exists) return { success: false, message: 'Email sudah terdaftar!' };

    const newUser = {
      id: 'adult-' + Date.now(),
      role: 'adult',
      name,
      email,
      password,
      adultSurahProgress: {}
    };

    setUsers([...users, newUser]);
    setIsLoggedIn(true);
    saveToStorage('sholatku_isLoggedIn', true);
    return { success: true };
  }, [users, setUsers]);

  const register = useCallback((data) => {
    if (data.role === 'ortu' || data.role === 'parent') {
      return registerParent(data.name, data.childName || 'Anak', data.email, data.password, data.pin || '1234');
    } else {
      return registerAdult(data.name, data.email, data.password);
    }
  }, [registerParent, registerAdult]);

  const login = useCallback((emailOrUsername, password) => {
    const user = users.find(u => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password);
    if (user) {
      setCurrentUser(user);
      setIsParentUnlocked(false);
      setIsLoggedIn(true);
      saveToStorage('sholatku_isLoggedIn', true);
      
      if (user.role === 'admin') {
        setUserMode('admin');
      } else if (user.role === 'adult') {
        setUserMode('adult');
      } else {
        setUserMode('parent');
      }
      return { success: true, role: user.role };
    }
    return { success: false, message: 'Email/Username atau Password salah!' };
  }, [users, setCurrentUser, setUserMode]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setUserMode('parent');
    setIsParentUnlocked(false);
    setIsLoggedIn(false);
    setActiveProfile(null);
    saveToStorage('sholatku_isLoggedIn', false);
    saveToStorage('sholatku_activeProfile', null);
  }, [setCurrentUser, setUserMode]);

  const selectProfile = useCallback((role) => {
    setActiveProfile(role);
    saveToStorage('sholatku_activeProfile', role);
    if (role === 'anak') {
      setIsKidsMode(true);
      setUserMode('kids');
      saveToStorage('sholatku_kidsMode', true);
    } else {
      setIsKidsMode(false);
      setUserMode('parent');
      saveToStorage('sholatku_kidsMode', false);
    }
  }, [setUserMode]);

  const toggleMode = useCallback(() => {
    setIsKidsMode((prev) => {
      const nextMode = !prev;
      saveToStorage('sholatku_kidsMode', nextMode);
      const profileRole = nextMode ? 'anak' : 'ortu';
      setActiveProfile(profileRole);
      setUserMode(nextMode ? 'kids' : 'parent');
      saveToStorage('sholatku_activeProfile', profileRole);
      return nextMode;
    });
  }, [setUserMode]);

  const requestModeChange = useCallback(() => {
    if (isKidsMode) {
      setIsPinModalOpen(true);
    } else {
      toggleMode();
    }
  }, [isKidsMode, toggleMode]);

  // Helper for mutating current user
  const updateCurrentUser = useCallback((updater) => {
    if (!currentUser) return;
    setUsers((prev) => {
      const nextUsers = prev.map((u) => {
        if (u.id === currentUser.id) {
          const next = typeof updater === 'function' ? updater(u) : { ...u, ...updater };
          setTimeout(() => setCurrentUserRaw(next), 0);
          saveToStorage('sholatku_currentUser', next);
          return next;
        }
        return u;
      });
      return nextUsers;
    });
  }, [currentUser, setUsers]);

  const updateChildStats = useCallback((updater) => {
    if (!currentUser || currentUser.role !== 'parent') return;
    updateCurrentUser((prev) => {
      const nextStats = typeof updater === 'function' ? updater(prev.childStats) : { ...prev.childStats, ...updater };
      return { ...prev, childStats: nextStats };
    });
  }, [currentUser, updateCurrentUser]);

  // Gamification Actions
  const addXP = useCallback((amount) => {
    if (currentUser && currentUser.role === 'parent') {
      updateChildStats((prev) => {
        let xp = (prev?.xp || 0) + amount;
        let level = prev?.level || 1;
        let xpToNext = prev?.xpToNext || 100;
        while (xp >= xpToNext) {
          xp -= xpToNext;
          level++;
          xpToNext = Math.floor(xpToNext * 1.4);
        }
        return { ...prev, xp, level, xpToNext };
      });
    } else {
      setProfile((prev) => {
        let xp = prev.xp + amount;
        let level = prev.level;
        let xpToNext = prev.xpToNext;
        while (xp >= xpToNext) {
          xp -= xpToNext;
          level++;
          xpToNext = Math.floor(xpToNext * 1.4);
        }
        return { ...prev, xp, level, xpToNext };
      });
    }
  }, [currentUser, updateChildStats, setProfile]);

  const addStars = useCallback((n = 1) => {
    if (currentUser && currentUser.role === 'parent') {
      updateChildStats((prev) => ({ ...prev, stars: (prev?.stars || 0) + n }));
    } else {
      setProfile((prev) => ({ ...prev, stars: prev.stars + n }));
    }
  }, [currentUser, updateChildStats, setProfile]);

  const addGems = useCallback((n = 1) => {
    if (currentUser && currentUser.role === 'parent') {
      updateChildStats((prev) => ({ ...prev, gems: (prev?.gems || 0) + n }));
    } else {
      setProfile((prev) => ({ ...prev, gems: prev.gems + n }));
    }
  }, [currentUser, updateChildStats, setProfile]);

  const completeMovement = useCallback((key) => {
    if (currentUser && currentUser.role === 'parent') {
      const wasNew = !currentUser.childStats?.completedMovements?.includes(key);
      if (wasNew) {
        updateChildStats((prev) => ({
          ...prev,
          completedMovements: [...(prev?.completedMovements || []), key]
        }));
        addXP(20);
        addStars(1);
      }
    } else {
      const wasNew = !profileRawState.completedMovements.includes(key);
      if (wasNew) {
        setProfile((prev) => ({
          ...prev,
          completedMovements: [...prev.completedMovements, key]
        }));
        addXP(20);
        addStars(1);
      }
    }
  }, [currentUser, updateChildStats, profileRawState, setProfile, addXP, addStars]);

  const recordQuizCorrect = useCallback(() => {
    if (currentUser && currentUser.role === 'parent') {
      updateChildStats((prev) => ({ ...prev, quizCorrect: (prev?.quizCorrect || 0) + 1 }));
    } else {
      setProfile((prev) => ({ ...prev, quizCorrect: prev.quizCorrect + 1 }));
    }
    addXP(15);
    addGems(1);
  }, [currentUser, updateChildStats, setProfile, addXP, addGems]);

  const togglePrayer = useCallback((prayerKey) => {
    if (currentUser && currentUser.role === 'parent') {
      updateChildStats((prev) => {
        let currentTracker = { ...(prev?.tracker || {}) };
        if (currentTracker.date !== getTodayDateString()) {
          currentTracker = {
            date: getTodayDateString(),
            fajr: false,
            dhuhr: false,
            asr: false,
            maghrib: false,
            isha: false,
          };
        }

        const nextTracker = { ...currentTracker, [prayerKey]: !currentTracker[prayerKey] };
        const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
        const checkedCount = prayers.filter((k) => nextTracker[k]).length;

        if (!currentTracker[prayerKey]) {
          setTimeout(() => {
            addXP(10);
            addStars(1);
          }, 0);
        }

        if (checkedCount === 5) {
          setTimeout(() => {
            addXP(50);
            addGems(3);
          }, 0);
        }

        let nextHistory = [...(prev?.streakHistory || [])];
        const todayIdx = nextHistory.findIndex(h => h.date === getTodayDateString());
        const todayEntry = { date: getTodayDateString(), count: checkedCount };

        if (todayIdx >= 0) {
          nextHistory[todayIdx] = todayEntry;
        } else {
          nextHistory.push(todayEntry);
        }

        const sorted = [...nextHistory].sort((a, b) => b.date.localeCompare(a.date));
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

        const longestStreak = Math.max(prev?.longestStreak || 0, streak);
        const totalPrayers = nextHistory.reduce((acc, h) => acc + h.count, 0);
        const subuhDone = prayerKey === 'fajr' && !currentTracker.fajr ? true : prev?.subuhDone;

        return {
          ...prev,
          tracker: nextTracker,
          streakHistory: nextHistory,
          streak,
          longestStreak,
          totalPrayers,
          subuhDone
        };
      });
    } else {
      setTracker((prev) => {
        const nextTracker = { ...prev, [prayerKey]: !prev[prayerKey] };
        const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
        const checkedCount = prayers.filter((k) => nextTracker[k]).length;

        if (!prev[prayerKey]) {
          setTimeout(() => {
            addXP(10);
            addStars(1);
          }, 0);
        }

        if (checkedCount === 5) {
          setTimeout(() => {
            addXP(50);
            addGems(3);
          }, 0);
        }

        return nextTracker;
      });
    }
  }, [currentUser, updateChildStats, setTracker, addXP, addStars, addGems]);

  // Admin and Hafalan management
  const addOrUpdateMovement = useCallback((movementData) => {
    setMovements((prev) => {
      const idx = prev.findIndex(m => m.id === movementData.id || m.key === movementData.key);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...movementData };
        return next;
      } else {
        return [...prev, { ...movementData, id: Date.now() }];
      }
    });
  }, [setMovements]);

  const deleteMovement = useCallback((id) => {
    setMovements((prev) => prev.filter(m => m.id !== id));
  }, [setMovements]);

  const submitHafalan = useCallback((movementKey, movementName) => {
    if (!currentUser || currentUser.role !== 'parent') return { success: false, message: 'Harus login sebagai Orang Tua!' };
    
    const newSubmission = {
      id: 'sub-' + Date.now(),
      childId: currentUser.id,
      childName: currentUser.childName,
      parentId: currentUser.id,
      movementKey,
      movementName,
      timestamp: new Date().toISOString(),
      score: null,
      comment: '',
      status: 'pending'
    };

    setSubmissions([...submissions, newSubmission]);
    return { success: true };
  }, [currentUser, submissions, setSubmissions]);

  const gradeHafalan = useCallback((submissionId, score, comment) => {
    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === submissionId) {
          setUsers((allUsers) =>
            allUsers.map((u) => {
              if (u.id === sub.parentId) {
                let xpAward = score * 10;
                let gemsAward = score;
                let xp = u.childStats.xp + xpAward;
                let level = u.childStats.level;
                let xpToNext = u.childStats.xpToNext;
                while (xp >= xpToNext) {
                  xp -= xpToNext;
                  level++;
                  xpToNext = Math.floor(xpToNext * 1.4);
                }
                const nextStats = {
                  ...u.childStats,
                  xp,
                  level,
                  xpToNext,
                  gems: u.childStats.gems + gemsAward,
                  completedMovements: u.childStats.completedMovements.includes(sub.movementKey) 
                    ? u.childStats.completedMovements 
                    : [...u.childStats.completedMovements, sub.movementKey]
                };
                return { ...u, childStats: nextStats };
              }
              return u;
            })
          );
          return { ...sub, score, comment, status: 'graded' };
        }
        return sub;
      })
    );
  }, [setUsers, setSubmissions]);

  const addReward = useCallback((name, targetStreak) => {
    if (!currentUser || currentUser.role !== 'parent') return;
    const newReward = {
      id: 'reward-' + Date.now(),
      name,
      targetStreak: parseInt(targetStreak),
      status: 'locked'
    };
    const nextRewards = [...(currentUser.rewards || []), newReward];
    updateCurrentUser({ rewards: nextRewards });
  }, [currentUser, updateCurrentUser]);

  const claimReward = useCallback((rewardId) => {
    if (!currentUser) return;
    const nextRewards = (currentUser.rewards || []).map(r => 
      r.id === rewardId ? { ...r, status: 'claimed' } : r
    );
    updateCurrentUser({ rewards: nextRewards });
  }, [currentUser, updateCurrentUser]);

  const deleteReward = useCallback((rewardId) => {
    if (!currentUser) return;
    const nextRewards = (currentUser.rewards || []).filter(r => r.id !== rewardId);
    updateCurrentUser({ rewards: nextRewards });
  }, [currentUser, updateCurrentUser]);

  const toggleAdultSurah = useCallback((surahId, status) => {
    if (!currentUser || currentUser.role !== 'adult') return;
    const currentProgress = currentUser.adultSurahProgress || {};
    const nextProgress = { ...currentProgress, [surahId]: status };
    updateCurrentUser({ adultSurahProgress: nextProgress });
  }, [currentUser, updateCurrentUser]);

  const activeProfileData = currentUser?.childStats || profileRawState;
  const activeTrackerData = currentUser?.childStats?.tracker || trackerRawState;

  const prayersDoneToday = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].filter((k) => activeTrackerData[k]).length;

  const value = {
    // Database tables
    users,
    movements,
    submissions,
    rewardsList: currentUser?.rewards || [],
    
    // Active Sessions
    currentUser,
    userMode,
    setUserMode,
    isParentUnlocked,
    setIsParentUnlocked,
    sidebarOpen,
    setSidebarOpen,
    isMobile,

    isLoggedIn,
    activeProfile,
    selectProfile,
    isKidsMode,
    toggleMode,
    requestModeChange,
    isPinModalOpen,
    setIsPinModalOpen,
    
    // Auth actions
    login,
    register,
    registerParent,
    registerAdult,
    logout,
    
    // Profile & Tracker
    profile: activeProfileData,
    setProfile,
    tracker: activeTrackerData,
    setTracker,
    prayersDoneToday,
    streakHistory,
    setStreakHistory,
    adventureLevel,
    setAdventureLevel,
    parentTarget,
    setParentTarget,
    prayerPunctuality,
    setPrayerPunctuality,
    
    // Gamification actions
    addXP,
    addStars,
    addGems,
    completeMovement,
    recordQuizCorrect,
    togglePrayer,
    
    // Submissions and Grading
    submitHafalan,
    gradeHafalan,
    
    // Rewards management
    addReward,
    claimReward,
    deleteReward,
    
    // Admin Actions
    addOrUpdateMovement,
    deleteMovement,
    
    // Adult Actions
    toggleAdultSurah
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}