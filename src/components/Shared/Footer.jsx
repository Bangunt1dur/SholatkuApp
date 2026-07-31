import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function Footer() {
  const { isKidsMode } = useApp();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Di mobile, link GitHub diposisikan di Header sesuai permintaan user.
  // Untuk desktop, tampilkan Footer di bagian paling bawah.
  if (isMobile) {
    return null;
  }

  const kidsFooterStyle = {
    marginTop: '40px',
    padding: '24px 32px',
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    border: '4px solid #000000',
    boxShadow: '6px 6px 0px #000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
    color: '#000000',
    boxSizing: 'border-box'
  };

  const minFooterStyle = {
    position: 'fixed',
    bottom: '16px',
    left: '310px',
    right: '32px',
    zIndex: 100,
    padding: '14px 24px',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
    color: '#1F2937',
    boxSizing: 'border-box'
  };

  const gitButtonStyle = isKidsMode
    ? {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#113C2B',
        color: '#FFFFFF',
        border: '3px solid #000000',
        borderRadius: '14px',
        padding: '10px 18px',
        fontWeight: 900,
        fontSize: '13px',
        textDecoration: 'none',
        boxShadow: '3px 3px 0px #000000',
        transition: 'transform 0.1s ease'
      }
    : {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#113C2B',
        color: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '12px',
        padding: '10px 18px',
        fontWeight: 700,
        fontSize: '13px',
        textDecoration: 'none',
        boxShadow: '0 2px 8px rgba(17, 60, 43, 0.2)',
        transition: 'all 0.15s ease'
      };

  return (
    <footer style={isKidsMode ? kidsFooterStyle : minFooterStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '28px' }}>🕌</span>
        <div>
          <div style={{ fontWeight: 900, fontSize: '15px', color: isKidsMode ? '#000' : '#1F2937' }}>
            SholatKu App © {new Date().getFullYear()}
          </div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', marginTop: '2px' }}>
            Project-Based Learning AIK 4 Muhammadiyah &amp; Informatika
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a
          href="https://github.com/Bangunt1dur/SholatkuApp"
          target="_blank"
          rel="noopener noreferrer"
          style={gitButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
          }}
        >
          <GithubIcon size={18} />
          <span>GitHub Repository</span>
          <ExternalLink size={14} style={{ opacity: 0.8 }} />
        </a>
      </div>
    </footer>
  );
}
