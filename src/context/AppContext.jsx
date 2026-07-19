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

// Default Admin account
const DEFAULT_USERS = [
  { id: 'admin-user', role: 'admin', email: 'admin@sholatku.com', name: 'System Admin', username: 'admin', password: 'admin123' }
];

export function AppProvider({ children }) {
  // Global Database States
  const [users, setUsersRaw] = useState(() => loadFromStorage('sholatku_users_db', DEFAULT_USERS));
  const [movements, setMovementsRaw] = useState(() => loadFromStorage('sholatku_movements_db', DEFAULT_MOVEMENTS));
  const [submissions, setSubmissionsRaw] = useState(() => loadFromStorage('sholatku_submissions_db', []));

  // Active Sessions
  const [currentUser, setCurrentUserRaw] = useState(() => loadFromStorage('sholatku_currentUser', null));
  const [userMode, setUserModeRaw] = useState(() => loadFromStorage('sholatku_userMode', 'parent')); // 'parent' | 'kids' | 'adult' | 'admin'
  const [isParentUnlocked, setIsParentUnlocked] = useState(false); // PIN gate access to Parent Dashboard page
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    return { success: true };
  }, [users, setUsers]);

  const login = useCallback((emailOrUsername, password) => {
    const user = users.find(u => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password);
    if (user) {
      setCurrentUser(user);
      setIsParentUnlocked(false);
      
      // Auto-route based on role
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
  }, [setCurrentUser, setUserMode]);

  // ─── HELPER FOR MUTATING CURRENT USER RECORD ──────────────────
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

  // Helper to update active child's stats (for parent)
  const updateChildStats = useCallback((updater) => {
    if (!currentUser || currentUser.role !== 'parent') return;
    updateCurrentUser((prev) => {
      const nextStats = typeof updater === 'function' ? updater(prev.childStats) : { ...prev.childStats, ...updater };
      return { ...prev, childStats: nextStats };
    });
  }, [currentUser, updateCurrentUser]);

  // ─── GAMIFICATION ACTIONS (KIDS MODE) ──────────────────────────
  const addXP = useCallback((amount) => {
    updateChildStats((prev) => {
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
  }, [updateChildStats]);

  const addStars = useCallback((n = 1) => {
    updateChildStats((prev) => ({ ...prev, stars: prev.stars + n }));
  }, [updateChildStats]);

  const addGems = useCallback((n = 1) => {
    updateChildStats((prev) => ({ ...prev, gems: prev.gems + n }));
  }, [updateChildStats]);

  const completeMovement = useCallback((key) => {
    if (!currentUser || currentUser.role !== 'parent') return;
    const wasNew = !currentUser.childStats?.completedMovements?.includes(key);
    if (wasNew) {
      updateChildStats((prev) => ({
        ...prev,
        completedMovements: [...(prev.completedMovements || []), key]
      }));
      addXP(20);
      addStars(1);
    }
  }, [currentUser, updateChildStats, addXP, addStars]);

  const recordQuizCorrect = useCallback(() => {
    updateChildStats((prev) => ({ ...prev, quizCorrect: (prev.quizCorrect || 0) + 1 }));
    addXP(15);
    addGems(1);
  }, [updateChildStats, addXP, addGems]);

  // ─── PRAYER TRACKER & STREAK (KIDS MODE) ──────────────────────
  const togglePrayer = useCallback((prayerKey) => {
    if (!currentUser || currentUser.role !== 'parent') return;
    
    updateChildStats((prev) => {
      let currentTracker = { ...(prev.tracker || {}) };
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

      // Reward on check
      if (!currentTracker[prayerKey]) {
        setTimeout(() => {
          addXP(10);
          addStars(1);
        }, 0);
      }

      // Bonus full day
      if (checkedCount === 5) {
        setTimeout(() => {
          addXP(50);
          addGems(3);
        }, 0);
      }

      // Update streak history
      let nextHistory = [...(prev.streakHistory || [])];
      const todayIdx = nextHistory.findIndex(h => h.date === getTodayDateString());
      const todayEntry = { date: getTodayDateString(), count: checkedCount };

      if (todayIdx >= 0) {
        nextHistory[todayIdx] = todayEntry;
      } else {
        nextHistory.push(todayEntry);
      }

      // Calculate streak
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

      const longestStreak = Math.max(prev.longestStreak || 0, streak);
      const totalPrayers = nextHistory.reduce((acc, h) => acc + h.count, 0);
      const subuhDone = prayerKey === 'fajr' && !currentTracker.fajr ? true : prev.subuhDone;

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
  }, [currentUser, updateChildStats, addXP, addStars, addGems]);

  // Achievement checking trigger
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'parent' || !currentUser.childStats) return;
    const child = currentUser.childStats;
    const newBadges = ACHIEVEMENTS
      .filter((a) => !(child.earnedBadges || []).includes(a.id) && a.condition(child))
      .map((a) => a.id);
    
    if (newBadges.length > 0) {
      updateChildStats((prev) => ({
        ...prev,
        earnedBadges: [...(prev.earnedBadges || []), ...newBadges]
      }));
    }
  }, [currentUser, updateChildStats]);

  // ─── ADMIN MOVEMENT DATABASE MANAGEMENT ─────────────────────
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

  // ─── MEMORIZATION GRADING (SETORAN HAFALAN) ──────────────────
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
      score: null, // 1 to 5 stars
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
          // Award XP/Gems to Parent's Child Stats
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

          // Update active session user if graded for current session
          if (currentUser && currentUser.id === sub.parentId) {
            setTimeout(() => {
              updateChildStats((prev) => {
                let xpAward = score * 10;
                let gemsAward = score;
                let xp = prev.xp + xpAward;
                let level = prev.level;
                let xpToNext = prev.xpToNext;
                while (xp >= xpToNext) {
                  xp -= xpToNext;
                  level++;
                  xpToNext = Math.floor(xpToNext * 1.4);
                }
                return {
                  ...prev,
                  xp,
                  level,
                  xpToNext,
                  gems: prev.gems + gemsAward,
                  completedMovements: prev.completedMovements.includes(sub.movementKey) 
                    ? prev.completedMovements 
                    : [...prev.completedMovements, sub.movementKey]
                };
              });
            }, 0);
          }

          return { ...sub, score, comment, status: 'graded' };
        }
        return sub;
      })
    );
  }, [currentUser, setUsers, updateChildStats, submissions, setSubmissions]);

  // ─── REWARDS MANAGEMENT (SAVED INSIDE PARENT RECORD) ─────────
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

  // ─── ADULT SURAH PROGRESS ───────────────────────────────────
  const toggleAdultSurah = useCallback((surahId, status) => {
    if (!currentUser || currentUser.role !== 'adult') return;
    const currentProgress = currentUser.adultSurahProgress || {};
    const nextProgress = { ...currentProgress, [surahId]: status };
    updateCurrentUser({ adultSurahProgress: nextProgress });
  }, [currentUser, updateCurrentUser]);

  // Dynamic helper calculations
  const prayersDoneToday = currentUser && currentUser.role === 'parent' && currentUser.childStats
    ? ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].filter((k) => {
        let currentTracker = currentUser.childStats.tracker || {};
        if (currentTracker.date !== getTodayDateString()) return false;
        return currentTracker[k];
      }).length
    : 0;

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
    
    // Auth actions
    login,
    registerParent,
    registerAdult,
    logout,
    
    // Child stats fallback (when parent switches to kids mode)
    profile: currentUser?.childStats || null,
    tracker: currentUser?.childStats?.tracker || {},
    prayersDoneToday,
    
    // Gamification actions (redirected to childStats)
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