// src/components/Shared/Header.jsx
import { useApp } from '../../context/AppContext';
import { Award, Star, Gem } from 'lucide-react';

export default function Header() {
  const { userMode, profile, sidebarOpen, isMobile, isKidsMode } = useApp();

  const isAdultTheme = userMode === 'adult' || userMode === 'parent' || userMode === 'admin' || !isKidsMode;
  const isKidsTheme = (userMode === 'kids' || isKidsMode) && profile;

  const headerPaddingLeft = sidebarOpen ? '24px' : (isMobile ? '72px' : '88px');

  const titleText = userMode === 'admin'
    ? (isMobile ? 'Admin 🛠️' : 'Panel Admin SholatKu 🛠️')
    : isAdultTheme
      ? (isMobile ? 'Panduan Sholat' : 'Tuntunan Ibadah Sholat Dewasa')
      : (isMobile ? 'SholatKu Kids 🌟' : 'SholatKu Kids — Belajar Sholat Itu Seru! 🌟');

  return (
    <header
      className={isAdultTheme ? '' : 'identity-header'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '10px 12px' : '14px 20px',
        paddingLeft: headerPaddingLeft,
        backgroundColor: isAdultTheme ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.94)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderBottom: isAdultTheme ? '1px solid rgba(226,232,240,0.8)' : '2px solid #000',
        gap: '8px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'padding-left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        minHeight: isMobile ? '56px' : '64px',
      }}
    >
      {/* Brand Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
        <span style={{ fontSize: isMobile ? '24px' : '28px', flexShrink: 0 }}>🕌</span>
        <div style={{ minWidth: 0, overflow: 'hidden' }}>
          <div style={{
            fontWeight: 900,
            fontSize: isMobile ? '14px' : (isAdultTheme ? '16px' : '17px'),
            color: isAdultTheme ? '#065F46' : 'var(--game-dark)',
            fontFamily: isAdultTheme ? 'Playfair Display, serif' : 'var(--font-headline)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {titleText}
          </div>
          {!isMobile && (
            <div style={{ fontSize: '9.5px', color: '#718096', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              PjBL AIK • UMP Pontianak • Kelompok: Pramudya, Naufal, Farel, Aulia, Faried
            </div>
          )}
        </div>
      </div>

      {/* GAMIFICATION HUD FOR KIDS */}
      {isKidsTheme && profile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '4px' : '8px', flexShrink: 0 }}>
          {/* Level Badge */}
          <div
            className="clay-card purple"
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: isMobile ? '4px 8px' : '6px 12px',
              border: '2px solid #000', borderRadius: '10px',
              minHeight: 'auto', marginBottom: 0,
            }}
          >
            <Award size={12} style={{ color: '#fff', flexShrink: 0 }} />
            <span style={{ fontSize: isMobile ? '11px' : '12px', fontWeight: 900, color: '#fff', whiteSpace: 'nowrap' }}>
              Lv.{profile.level || 1}
            </span>
          </div>

          {/* Stars Badge */}
          <div
            className="clay-card yellow"
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: isMobile ? '4px 8px' : '6px 12px',
              border: '2px solid #000', borderRadius: '10px',
              minHeight: 'auto', marginBottom: 0,
            }}
          >
            <Star size={12} fill="var(--game-dark)" style={{ color: 'var(--game-dark)', flexShrink: 0 }} />
            <span style={{ fontSize: isMobile ? '11px' : '12px', fontWeight: 900, color: 'var(--game-dark)', whiteSpace: 'nowrap' }}>
              {profile.stars || 0}⭐
            </span>
          </div>

          {/* Gems Badge */}
          {!isMobile && (
            <div
              className="clay-card"
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '6px 12px',
                border: '2px solid #000', borderRadius: '10px',
                minHeight: 'auto', marginBottom: 0,
                background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
              }}
            >
              <Gem size={12} fill="#fff" style={{ color: '#fff', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#fff', whiteSpace: 'nowrap' }}>
                {profile.gems || 0} 💎
              </span>
            </div>
          )}
        </div>
      )}

      {/* CLEAN METADATA FOR ADULTS */}
      {isAdultTheme && !isMobile && (
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <span style={{
            fontSize: '11px', fontWeight: 700, color: '#047857',
            backgroundColor: '#ECFDF5', padding: '4px 10px', borderRadius: '6px', border: '1px solid #A7F3D0',
            whiteSpace: 'nowrap',
          }}>
            HPT Muhammadiyah
          </span>
          <span style={{
            fontSize: '11px', fontWeight: 700, color: '#D97706',
            backgroundColor: '#FEF3C7', padding: '4px 10px', borderRadius: '6px', border: '1px solid #FDE68A',
            whiteSpace: 'nowrap',
          }}>
            Kaidah Tarjih
          </span>
        </div>
      )}
    </header>
  );
}