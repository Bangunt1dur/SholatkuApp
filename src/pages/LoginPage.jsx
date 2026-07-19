import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function LoginPage({ setActivePage }) {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const res = login(email, password);
    if (res.success) {
      setActivePage('profile-picker');
    } else {
      setError(res.message);
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '16px',
        backgroundColor: '#B8C6B6' // Menggunakan warna hijau sage polos sepenuhnya
      }}
    >
      <div 
        style={{ 
          maxWidth: '420px', 
          width: '100%', 
          textAlign: 'center', 
          backgroundColor: '#FFFFFF', 
          borderRadius: '24px', 
          padding: '36px 32px',
          border: '4px solid #113C2B', 
          boxShadow: '0 8px 0px rgba(17, 60, 43, 0.15)' 
        }}
      >
        <h2 
          style={{ 
            fontSize: '32px', 
            fontWeight: 900, 
            marginBottom: '28px', 
            letterSpacing: '-1px',
            color: '#113C2B' 
          }}
        >
          LOGIN
        </h2>

        {error && (
          <div 
            style={{ 
              backgroundColor: '#fee2e2', 
              border: '3px solid #ef4444', 
              borderRadius: '12px', 
              padding: '10px', 
              color: '#b91c1c', 
              fontWeight: 800, 
              fontSize: '13px', 
              marginBottom: '16px' 
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 800, fontSize: '14px', marginBottom: '8px', color: '#113C2B' }}>
              Email
            </label>
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

          <div>
            <label style={{ display: 'block', fontWeight: 800, fontSize: '14px', marginBottom: '8px', color: '#113C2B' }}>
              Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
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

          <div 
            style={{ 
              fontSize: '13px', 
              color: '#113C2B', 
              fontWeight: 700, 
              margin: '2px 0 4px',
              borderRadius: '14px',
              padding: '12px',
              backgroundColor: '#D4DDD3', 
              border: '2px dashed #113C2B'
            }}
          >
            💡 Coba akun demo: <br />
            Email: <span style={{ textDecoration: 'underline' }}>pramudya@sholatku.com</span> <br />
            Password: <span style={{ textDecoration: 'underline' }}>password123</span>
          </div>

          <button 
            type="submit" 
            style={{ 
              fontSize: '16px', 
              padding: '16px', 
              backgroundColor: '#113C2B', 
              color: '#FFFFFF', 
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
            MASUK 🚀
          </button>
        </form>

        <p style={{ marginTop: '28px', fontSize: '14px', fontWeight: 800, color: '#556B52' }}>
          Belum punya akun?{' '}
          <span 
            onClick={() => setActivePage('register')} 
            style={{ 
              color: '#113C2B', 
              cursor: 'pointer', 
              textDecoration: 'underline',
              fontWeight: 900
            }}
          >
            Daftar sekarang
          </span>
        </p>
      </div>
    </div>
  );
}