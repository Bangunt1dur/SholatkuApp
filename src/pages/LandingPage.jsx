import React from 'react';
import { useApp } from '../context/AppContext';

export default function LandingPage({ setActivePage }) {
  const { selectProfile, isLoggedIn } = useApp();

  const handleStartAdult = () => {
    if (isLoggedIn) {
      selectProfile('dewasa');
      setActivePage('adult-quran');
    } else {
      setActivePage('login');
    }
  };

  const handleStartKids = () => {
    if (isLoggedIn) {
      selectProfile('anak');
      setActivePage('home');
    } else {
      setActivePage('login');
    }
  };

  // Konfigurasi Gaya Dasar Neo-Brutalisme Sage Green
  const baseCardStyle = {
    border: '4px solid #113C2B',
    boxShadow: '6px 6px 0px #113C2B',
    borderRadius: '24px',
    padding: '24px',
    backgroundColor: '#FFFFFF',
    color: '#113C2B',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease'
  };

  const baseButtonStyle = {
    fontFamily: 'inherit',
    fontWeight: 900,
    border: '4px solid #113C2B',
    borderRadius: '16px',
    padding: '12px 24px',
    cursor: 'pointer',
    transition: 'transform 0.1s ease, box-shadow 0.1s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxSizing: 'border-box'
  };

  return (
    <div className="game-grid-bg" style={{ minHeight: '100vh', padding: '24px', boxSizing: 'border-box', backgroundColor: '#F8FAF8', color: '#113C2B' }}>

      {/* ─── HEADER LANDING ─── */}
      <header style={{
        ...baseCardStyle,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 28px',
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '16px',
        position: 'relative',
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '32px', filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.1))' }}>🕌</span>
          <span style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '-1px' }}>
            SHOLAT<span style={{ backgroundColor: '#113C2B', color: '#FFFFFF', padding: '2px 8px', borderRadius: '8px', marginLeft: '4px' }}>KU</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <button
            style={{ ...baseButtonStyle, backgroundColor: '#D4DDD3', fontSize: '14px', padding: '8px 16px', boxShadow: '3px 3px 0px #113C2B' }}
            onClick={handleStartKids}
          >
            👶 Mode Anak-anak
          </button>
          <button
            style={{ ...baseButtonStyle, backgroundColor: '#FFFFFF', fontSize: '14px', padding: '8px 16px', boxShadow: '3px 3px 0px #113C2B' }}
            onClick={handleStartAdult}
          >
            🧔 Mode Dewasa
          </button>
        </div>
      </header>

      {/* ─── HERO SECTION ─── */}
      <div className="grid-2" style={{ alignItems: 'center', gap: '40px', maxWidth: '1100px', margin: '0 auto 60px', position: 'relative', zIndex: 10 }}>
        <div>
          <span style={{
            border: '3px solid #113C2B',
            borderRadius: '4px',
            padding: '6px 18px',
            fontSize: '13px',
            fontWeight: 900,
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '20px',
            letterSpacing: '0.5px'
          }}>
            Tuntunan Sholat Sesuai HPT Muhammadiyah 📖
          </span>

          <h1 style={{
            fontSize: 'clamp(38px, 5vw, 56px)',
            fontWeight: 900,
            lineHeight: 1.1,
            margin: '0 0 24px',
            letterSpacing: '-1px'
          }}>
            BELAJAR SHOLAT<br />
            <span style={{
              color: '#FFFFFF',
              backgroundColor: '#113C2B',
              padding: '4px 20px',
              border: '4px solid #113C2B',
              borderRadius: '20px',
              boxShadow: '5px 5px 0px #556B52',
              display: 'inline-block',
              marginTop: '10px'
            }}>
              JADI LEBIH SERU!
            </span>
          </h1>

          <p style={{ fontSize: '17px', fontWeight: 700, color: '#556B52', lineHeight: 1.6, marginBottom: '36px' }}>
            Pelajari tata cara, gerakan, dan doa sholat secara lengkap dengan sistem gamifikasi interaktif: peta petualangan gerakan murni, akumulasi level XP cerdas, kuis evaluasi pemahaman, serta penjejak koin hadiah harian!
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              className="animate-pulse"
              onClick={() => setActivePage('register')}
              style={{ ...baseButtonStyle, backgroundColor: '#113C2B', color: '#FFFFFF', fontSize: '18px', padding: '16px 32px', boxShadow: '5px 5px 0px #556B52' }}
            >
              Daftar Sekarang 🚀
            </button>
            <button
              onClick={() => setActivePage('login')}
              style={{ ...baseButtonStyle, backgroundColor: '#FFFFFF', color: '#113C2B', fontSize: '18px', padding: '16px 32px', boxShadow: '5px 5px 0px #113C2B' }}
            >
              Login Masuk 🔑
            </button>
          </div>
        </div>

        {/* Mockup Phone Illustration (Neo-Brutalisme Styled) */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '310px',
            height: '570px',
            backgroundColor: '#113C2B',
            borderRadius: '44px',
            border: '5px solid #113C2B',
            boxShadow: '12px 12px 0px #556B52',
            position: 'relative',
            overflow: 'hidden',
            padding: '12px',
            boxSizing: 'border-box'
          }}>
            {/* Phone Screen Area */}
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#D4DDD3',
              borderRadius: '32px',
              border: '4px solid #113C2B',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              padding: '18px',
              position: 'relative'
            }}>
              {/* Phone Speaker/Camera Notch */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '110px',
                height: '18px',
                backgroundColor: '#113C2B',
                borderBottomLeftRadius: '14px',
                borderBottomRightRadius: '14px',
                zIndex: 10
              }} />

              {/* Inside Screen Content Mockup */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', marginBottom: '24px' }}>
                <span style={{ fontSize: '16px', fontWeight: 900 }}>🕌 SholatKu</span>
                <span style={{ backgroundColor: '#FFFFFF', border: '2.5px solid #113C2B', padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 900 }}>⚡ 150 XP</span>
              </div>

              {/* Main character card inside phone */}
              <div style={{ ...baseCardStyle, padding: '16px', textAlign: 'center', marginBottom: '20px', boxShadow: '4px 4px 0px #113C2B' }}>
                <div style={{ fontSize: '48px', marginBottom: '6px' }} className="mancot-float">🤖</div>
                <h4 style={{ margin: '4px 0', fontWeight: 900, fontSize: '16px' }}>Rafi si Asisten</h4>
                <p style={{ fontSize: '11px', fontWeight: 800, margin: 0, color: '#556B52' }}>"Keren! Kamu dapat lencana gerakan baru!"</p>
              </div>

              {/* Path/Node mockup inside phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', border: '3px solid #113C2B', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: 900, fontSize: '13px', justifyContent: 'center' }}>✓</div>
                  <div style={{ flex: 1, height: '14px', backgroundColor: '#FFFFFF', border: '3px solid #113C2B', borderRadius: '8px', overflow: 'hidden', padding: '1px' }}>
                    <div style={{ width: '75%', height: '100%', backgroundColor: '#113C2B', borderRadius: '4px' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', border: '3px solid #113C2B', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: 900, fontSize: '13px', justifyContent: 'center' }}>2</div>
                  <div style={{ flex: 1, fontSize: '12px', fontWeight: 900, color: '#113C2B' }}>Misi Berikut: Gerakan Ruku</div>
                </div>
              </div>

              <div style={{ ...baseButtonStyle, backgroundColor: '#113C2B', color: '#FFFFFF', width: '100%', marginTop: 'auto', fontSize: '13px', padding: '10px', boxShadow: '3px 3px 0px #556B52' }}>
                Mulai Belajar 🌟
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CHOOSE YOUR JOURNEY SECTION ─── */}
      <section style={{ maxWidth: '1000px', margin: '0 auto 40px', textAlign: 'center', position: 'relative', zIndex: 15 }}>
        <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.5px' }}>PILIH JALUR PETUALANGAN</h2>
        <p style={{ fontSize: '16px', fontWeight: 700, color: '#556B52', marginBottom: '36px' }}>
          Kami menyediakan ekosistem belajar interaktif yang pas untuk anak-anak maupun pendalaman ibadah mandiri dewasa.
        </p>

        <div className="grid-2" style={{ gap: '32px', position: 'relative', zIndex: 20 }}>

          {/* Card 1: Mode Anak-anak */}
          <div
            style={{ ...baseCardStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 32px', cursor: 'pointer' }}
            onClick={handleStartKids}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '8px 8px 0px #113C2B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '6px 6px 0px #113C2B';
            }}
          >
            <div style={{ fontSize: '64px', backgroundColor: '#F8FAF8', border: '3px solid #113C2B', borderRadius: '24px', padding: '12px', marginBottom: '20px', boxShadow: '3px 3px 0px #113C2B' }}>👶</div>
            <h3 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 14px' }}>Mode Anak-anak</h3>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#556B52', lineHeight: 1.6, marginBottom: '28px', flex: 1 }}>
              Belajar sholat fardhu dengan menyenangkan! Dilengkapi petualangan peta interaktif, asisten maskot lucu Rafi, perolehan level XP dan lencana bintang, kuis cerdas berhadiah koin emas, serta penjejak target reward seru dari orang tua.
            </p>
            <button
              style={{ ...baseButtonStyle, backgroundColor: '#113C2B', color: '#FFFFFF', width: '100%', fontSize: '16px', boxShadow: '4px 4px 0px #556B52' }}
              onClick={(e) => { e.stopPropagation(); handleStartKids(); }}
            >
              Mulai Sebagai Anak-anak ➔
            </button>
          </div>

          {/* Card 2: Mode Dewasa */}
          <div
            style={{ ...baseCardStyle, backgroundColor: '#D4DDD3', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 32px', cursor: 'pointer' }}
            onClick={handleStartAdult}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '8px 8px 0px #113C2B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '6px 6px 0px #113C2B';
            }}
          >
            <div style={{ fontSize: '64px', backgroundColor: '#FFFFFF', border: '3px solid #113C2B', borderRadius: '24px', padding: '12px', marginBottom: '20px', boxShadow: '3px 3px 0px #113C2B' }}>🧔</div>
            <h3 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 14px' }}>Mode Dewasa</h3>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#113C2B', lineHeight: 1.6, marginBottom: '28px', flex: 1 }}>
              Panduan tuntunan sholat komprehensif bagi usia dewasa. Dilengkapi mushaf Al-Qur'an digital 30 Juz lengkap terjemahan, alarm jadwal sholat real-time daerah, sensor arah kiblat interaktif, serta dzikir dan doa setelah shalat.
            </p>
            <button
              style={{ ...baseButtonStyle, backgroundColor: '#FFFFFF', color: '#113C2B', width: '100%', fontSize: '16px', boxShadow: '4px 4px 0px #113C2B' }}
              onClick={(e) => { e.stopPropagation(); handleStartAdult(); }}
            >
              Mulai Sebagai Dewasa ➔
            </button>
          </div>

        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        marginTop: '60px',
        padding: '24px 20px',
        borderTop: '4px solid #113C2B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        fontWeight: 900,
        fontSize: '14px',
        color: '#556B52'
      }}>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} SholatKu. Project-Based Learning AIK Muhammadiyah. 🌟</p>

        <a
          href="https://github.com/Bangunt1dur/SholatkuApp"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#113C2B',
            color: '#FFFFFF',
            padding: '8px 16px',
            borderRadius: '12px',
            border: '2px solid #113C2B',
            textDecoration: 'none',
            fontSize: '13px',
            boxShadow: '3px 3px 0px #556B52',
            transition: 'transform 0.1s ease'
          }}
        >
          <span>🐙 GitHub Repository</span>
          <span>➔</span>
        </a>
      </footer>
    </div>
  );
}