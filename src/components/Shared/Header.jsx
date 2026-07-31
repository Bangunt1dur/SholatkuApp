import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function Header() {
  const { isKidsMode, sidebarOpen, setSidebarOpen } = useApp();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Minimalist style when isKidsMode is false
  const minHeaderContainerStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isMobile ? '12px' : '16px',
    padding: isMobile ? '12px 16px' : '16px 24px',
    width: '100%',
    boxSizing: 'border-box',
    background: '#FFFFFF',
    borderRadius: '16px',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.015)',
    position: 'relative',
    zIndex: 10,
    marginBottom: '20px'
  };

  // Neo-Brutalisme style when isKidsMode is true
  const kidsHeaderContainerStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isMobile ? '12px' : '16px',
    padding: isMobile ? '12px 16px' : '16px 24px',
    width: '100%',
    boxSizing: 'border-box',
    background: '#FFFFFF',
    borderRadius: '24px',
    border: '4px solid #000000',
    boxShadow: '6px 6px 0px #000000',
    position: 'relative',
    zIndex: 10,
    marginBottom: '20px'
  };

  return (
    <div style={isKidsMode ? kidsHeaderContainerStyle : minHeaderContainerStyle}>
      {isMobile ? (
        /* Mobile Layout */
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                border: isKidsMode ? '3px solid #000000' : '1px solid rgba(0, 0, 0, 0.08)',
                backgroundColor: isKidsMode ? 'var(--game-yellow)' : '#F9FAFB',
                boxShadow: isKidsMode ? '2px 2px 0px #000000' : 'none',
                cursor: 'pointer'
              }}
            >
              <Menu size={20} style={{ color: isKidsMode ? '#000' : '#4B5563' }} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', flex: 1 }}>
              <span style={{ fontSize: '24px' }}>🕌</span>
              <div style={{ 
                fontWeight: 900, 
                fontSize: '15px', 
                color: isKidsMode ? '#000000' : '#1F2937', 
                lineHeight: '1.2', 
                textAlign: 'center' 
              }}>
                {isKidsMode ? 'SholatKu Kids 🌟' : 'SholatKu Dewasa'}
              </div>
            </div>
            
            <div style={{ width: '38px' }} />
          </div>

          <div style={{ 
            fontSize: '10.5px', 
            fontWeight: 700, 
            color: isKidsMode ? '#4a5568' : '#6B7280', 
            textAlign: 'center', 
            lineHeight: '1.4', 
            marginBottom: '8px', 
            padding: '0 8px' 
          }}>
            Kelompok: Pramudya, Naufal, Farel, Aulia, Faried
          </div>

          {/* Centered Small Badges */}
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            {['📚 Informatika', '🕌 AIK 4', '👨‍🏫 Dedy S'].map((text, idx) => (
              <span 
                key={idx}
                style={{
                  padding: '3px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 800,
                  border: isKidsMode ? '1.5px solid #000000' : '1px solid rgba(0, 0, 0, 0.06)',
                  backgroundColor: isKidsMode ? '#EDF2F7' : '#F3F4F6',
                  boxShadow: isKidsMode ? '1.5px 1.5px 0px #000000' : 'none',
                  color: isKidsMode ? '#000000' : '#4B5563'
                }}
              >
                {text}
              </span>
            ))}

            <a
              href="https://github.com/Bangunt1dur/SholatkuApp"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: 900,
                backgroundColor: '#113C2B',
                color: '#FFFFFF',
                textDecoration: 'none',
                border: isKidsMode ? '1.5px solid #000000' : '1px solid #113C2B',
                boxShadow: isKidsMode ? '1.5px 1.5px 0px #000000' : '0 2px 4px rgba(17, 60, 43, 0.2)'
              }}
            >
              <GithubIcon size={11} />
              <span>GitHub Repo</span>
              <ExternalLink size={9} style={{ opacity: 0.8 }} />
            </a>
          </div>
        </div>
      ) : (
        /* Desktop Layout */
        <>
          <span style={{ fontSize: '32px' }}>🕌</span>

          <div style={{ flex: 1, minWidth: '200px', textAlign: 'left' }}>
            <div style={{ 
              fontWeight: 900, 
              fontSize: '18px', 
              color: isKidsMode ? '#000000' : '#1F2937', 
              margin: 0, 
              lineHeight: '1.3' 
            }}>
              {isKidsMode ? 'SholatKu Kids — Belajar Sholat Itu Seru! 🌟' : 'Aplikasi Tuntunan Sholat SholatKu'}
            </div>
            <div style={{ 
              fontSize: '13px', 
              fontWeight: 700, 
              color: isKidsMode ? '#4a5568' : '#6B7280', 
              marginTop: '4px', 
              margin: 0, 
              lineHeight: '1.4' 
            }}>
              Kelompok: Pramudya Izha Pratama, Naufal Rizqi Adi Putra, Muhammad Farel Fahlevi, Aulia Tri Putriani, Faried Azfar
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['📚 Informatika', '🕌 AIK 4', '👨‍🏫 Dedy Susanto'].map((text, idx) => (
              <span 
                key={idx}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 800,
                  border: isKidsMode ? '2px solid #000000' : '1px solid rgba(0,0,0,0.06)',
                  backgroundColor: isKidsMode ? '#EDF2F7' : '#F3F4F6',
                  boxShadow: isKidsMode ? '2px 2px 0px #000000' : 'none',
                  color: isKidsMode ? '#000000' : '#4B5563'
                }}
              >
                {text}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}