// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Key, Mail, Lock, LogOut } from 'lucide-react';

export default function LoginPage({ onRegisterClick }) {
  const { login, currentUser, logout } = useApp();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (!identifier || !password) {
      setError('Harap lengkapi semua kolom!');
      return;
    }

    const res = login(identifier.trim(), password);
    if (res.success) {
      setSuccessMsg('Login berhasil! Mengarahkan...');
      setIdentifier('');
      setPassword('');
    } else {
      setError(res.message);
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh',
      padding: '20px', background: 'transparent'
    }}>
      <div className="clay-card animate-fadeInUp" style={{
        maxWidth: '400px', width: '100%', padding: '32px', background: '#ffffff',
        border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
        position: 'relative'
      }}>
        
        {/* Logo App */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '48px', animation: 'float 3s ease-in-out infinite' }}>🕌</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '28px', color: '#0F172A', margin: '8px 0 2px', whiteSpace: 'nowrap' }}>
            Sholat<span style={{ color: '#059669' }}>Ku</span>
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 600, margin: 0 }}>
            Tuntunan Belajar Sholat Kaidah Muhammadiyah
          </p>
        </div>

        {/* Notifications */}
        {error && (
          <div style={{
            background: '#FFF5F5', border: '1px solid #FEB2B2', borderRadius: '8px', padding: '10px 14px',
            color: '#C53030', fontSize: '12.5px', fontWeight: 700, marginBottom: '16px', textAlign: 'center'
          }}>
            ❌ {error}
          </div>
        )}
        {successMsg && (
          <div style={{
            background: '#F0FDF4', border: '1px solid #A7F3D0', borderRadius: '8px', padding: '10px 14px',
            color: '#15803d', fontSize: '12.5px', fontWeight: 700, marginBottom: '16px', textAlign: 'center'
          }}>
            🎉 {successMsg}
          </div>
        )}

        {currentUser ? (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <p style={{ fontWeight: 700, color: '#334155', fontSize: '14px', marginBottom: '20px' }}>
              Anda masuk sebagai <strong style={{ color: '#059669' }}>{currentUser.name}</strong> ({currentUser.role === 'parent' ? 'Orang Tua' : currentUser.role})
            </p>
            <button
              onClick={() => logout()}
              className="clay-btn purple w-full"
              style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <LogOut size={16} /> Keluar Sesi Akun
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', letterSpacing: '0.5px' }}>EMAIL / USERNAME</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="text"
                  placeholder="Contoh: parent@sholatku.com"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  style={{
                    width: '100%', padding: '11px 12px 11px 40px', fontSize: '13.5px', fontWeight: 600,
                    borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', background: '#F8FAFC',
                    transition: 'border-color 0.15s'
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', letterSpacing: '0.5px' }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="password"
                  placeholder="Masukkan password Anda"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{
                    width: '100%', padding: '11px 12px 11px 40px', fontSize: '13.5px', fontWeight: 600,
                    borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', background: '#F8FAFC',
                    transition: 'border-color 0.15s'
                  }}
                  required
                />
              </div>
            </div>

            <button type="submit" className="clay-btn purple w-full" style={{ padding: '12px', marginTop: '6px', background: '#059669', borderColor: '#059669' }}>
              <Key size={15} /> Masuk Akun
            </button>

            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Belum memiliki akun? </span>
              <button
                type="button"
                onClick={onRegisterClick}
                style={{ background: 'none', border: 'none', color: '#059669', fontWeight: 700, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
              >
                Daftar di sini
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
