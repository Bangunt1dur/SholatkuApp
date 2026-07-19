import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function RegisterPage({ setActivePage }) {
  const { register } = useApp();
  const [role, setRole] = useState('anak'); // 'anak' or 'ortu'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = register({ name, email, password, pin, role });
    if (res.success) {
      setActivePage('profile-picker');
    } else {
      setError('Pendaftaran gagal. Silakan periksa isian.');
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '24px 0',
        backgroundColor: '#B8C6B6' // Hijau sage polos sesuai referensi gambar
      }}
    >
      <div 
        className="card" 
        style={{ 
          maxWidth: '440px', 
          width: '90%', 
          textAlign: 'center', 
          backgroundColor: '#ffffff', 
          borderRadius: '24px',
          padding: '36px 32px',
          border: '4px solid #113C2B',
          boxShadow: '0 8px 0px rgba(17, 60, 43, 0.15)'
        }}
      >
        <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '6px', color: '#113C2B' }}>
          Join the Journey
        </h2>
        <p style={{ fontSize: '13px', fontWeight: 700, color: '#556B52', marginBottom: '24px' }}>
          Mulai langkah ibadahmu dengan menyenangkan.
        </p>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', border: '3px solid #ef4444', borderRadius: '12px', padding: '10px', color: '#b91c1c', fontWeight: 800, fontSize: '13px', marginBottom: '16px' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'left' }}>
          
          {/* Who are you role picker */}
          <div>
            <label style={{ display: 'block', fontWeight: 800, fontSize: '14px', marginBottom: '8px', color: '#113C2B' }}>Who are you?</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div 
                onClick={() => setRole('anak')}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '3px solid #113C2B',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontWeight: 900,
                  backgroundColor: role === 'anak' ? '#113C2B' : '#D4DDD3', // Aktif: hijau tua, Pasif: sage muda
                  color: role === 'anak' ? '#ffffff' : '#113C2B',
                  boxShadow: role === 'anak' ? '0 4px 0px rgba(17, 60, 43, 0.2)' : 'none',
                  transition: 'all 0.1s ease'
                }}
              >
                👶 Anak-anak
              </div>
              <div 
                onClick={() => setRole('ortu')}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '3px solid #113C2B',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontWeight: 900,
                  backgroundColor: role === 'ortu' ? '#113C2B' : '#D4DDD3',
                  color: role === 'ortu' ? '#ffffff' : '#113C2B',
                  boxShadow: role === 'ortu' ? '0 4px 0px rgba(17, 60, 43, 0.2)' : 'none',
                  transition: 'all 0.1s ease'
                }}
              >
                👨‍👩‍👦 Orang Tua
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 800, fontSize: '14px', marginBottom: '6px', color: '#113C2B' }}>Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Masukkan nama panggilan" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '15px',
                fontWeight: 700,
                border: '3px solid #113C2B',
                borderRadius: '14px',
                boxSizing: 'border-box',
                outline: 'none',
                backgroundColor: '#F8FAF8',
                color: '#113C2B'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 800, fontSize: '14px', marginBottom: '6px', color: '#113C2B' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="nama@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '15px',
                fontWeight: 700,
                border: '3px solid #113C2B',
                borderRadius: '14px',
                boxSizing: 'border-box',
                outline: 'none',
                backgroundColor: '#F8FAF8',
                color: '#113C2B'
              }}
            />
          </div>

          {role === 'ortu' && (
            <div>
              <label style={{ display: 'block', fontWeight: 800, fontSize: '14px', marginBottom: '6px', color: '#113C2B' }}>Buat PIN Orang Tua (4 Digit)</label>
              <input 
                type="password" 
                maxLength={4}
                placeholder="1234" 
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '15px',
                  fontWeight: 700,
                  border: '3px solid #113C2B',
                  borderRadius: '14px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  backgroundColor: '#F8FAF8',
                  color: '#113C2B',
                  letterSpacing: '4px'
                }}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontWeight: 800, fontSize: '14px', marginBottom: '6px', color: '#113C2B' }}>Password</label>
            <input 
              type="password" 
              placeholder="Min. 8 karakter" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '15px',
                fontWeight: 700,
                border: '3px solid #113C2B',
                borderRadius: '14px',
                boxSizing: 'border-box',
                outline: 'none',
                backgroundColor: '#F8FAF8',
                color: '#113C2B'
              }}
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              fontSize: '16px', 
              padding: '16px', 
              marginTop: '10px',
              backgroundColor: '#113C2B',
              color: '#ffffff',
              borderRadius: '14px',
              border: 'none',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 4px 0px #082218',
              transition: 'all 0.1s ease'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(2px)';
              e.currentTarget.style.boxShadow = '0 2px 0px #082218';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 0px #082218';
            }}
          >
            Create Account +
          </button>
        </form>

        <p style={{ marginTop: '28px', fontSize: '14px', fontWeight: 800, color: '#556B52' }}>
          Sudah punya akun?{' '}
          <span 
            onClick={() => setActivePage('login')} 
            style={{ color: '#113C2B', cursor: 'pointer', textDecoration: 'underline', fontWeight: 900 }}
          >
            Login di sini
          </span>
        </p>
      </div>
    </div>
  );
}