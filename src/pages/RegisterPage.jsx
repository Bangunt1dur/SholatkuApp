// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Lock, Key, UserPlus } from 'lucide-react';

export default function RegisterPage({ onLoginClick, setActivePage }) {
  const { registerParent, registerAdult, register } = useApp();
  const [roleSelection, setRoleSelection] = useState('parent'); // 'parent' | 'adult' | 'anak'
  
  // Parent Form fields
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPassword, setParentPassword] = useState('');
  const [parentPin, setParentPin] = useState('1234');

  // Adult Form fields
  const [adultName, setAdultName] = useState('');
  const [adultEmail, setAdultEmail] = useState('');
  const [adultPassword, setAdultPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLoginNavigation = () => {
    if (onLoginClick) onLoginClick();
    if (setActivePage) setActivePage('login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (roleSelection === 'parent') {
      if (!parentName || !childName || !parentEmail || !parentPassword || !parentPin) {
        setError('Harap lengkapi semua kolom pendaftaran orang tua!');
        return;
      }
      if (parentPin.length !== 4 || isNaN(parentPin)) {
        setError('PIN khusus orang tua harus berupa 4 digit angka!');
        return;
      }
      const res = registerParent ? registerParent(parentName.trim(), childName.trim(), parentEmail.trim(), parentPassword, parentPin)
        : register ? register({ name: parentName.trim(), email: parentEmail.trim(), password: parentPassword, pin: parentPin, role: 'ortu' })
        : { success: true };

      if (res && res.success) {
        setSuccess(true);
        if (setActivePage) setActivePage('profile-picker');
      } else {
        setError(res ? res.message : 'Registrasi gagal');
      }
    } else {
      if (!adultName || !adultEmail || !adultPassword) {
        setError('Harap lengkapi semua kolom pendaftaran!');
        return;
      }
      const res = registerAdult ? registerAdult(adultName.trim(), adultEmail.trim(), adultPassword)
        : register ? register({ name: adultName.trim(), email: adultEmail.trim(), password: adultPassword, role: 'adult' })
        : { success: true };

      if (res && res.success) {
        setSuccess(true);
        if (setActivePage) setActivePage('profile-picker');
      } else {
        setError(res ? res.message : 'Registrasi gagal');
      }
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '24px 16px',
        backgroundColor: '#B8C6B6'
      }}
    >
      <div 
        style={{ 
          maxWidth: '440px', 
          width: '100%', 
          textAlign: 'center', 
          backgroundColor: '#ffffff', 
          borderRadius: '24px',
          padding: '36px 32px',
          border: '4px solid #113C2B',
          boxShadow: '0 8px 0px rgba(17, 60, 43, 0.15)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '48px', animation: 'float 3s ease-in-out infinite' }}>🕌</div>
          <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '6px', color: '#113C2B' }}>
            Daftar Akun
          </h2>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#556B52', marginBottom: '16px' }}>
            Mulai langkah ibadahmu dengan menyenangkan.
          </p>
        </div>

        {/* Role Toggle Selector */}
        {!success && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', backgroundColor: '#D4DDD3', padding: '6px', borderRadius: '14px', border: '2px solid #113C2B' }}>
            <button
              type="button"
              onClick={() => { setRoleSelection('parent'); setError(''); }}
              style={{
                flex: 1, padding: '10px 4px', fontSize: '12px', fontWeight: 900, borderRadius: '10px', border: 'none',
                backgroundColor: roleSelection === 'parent' ? '#113C2B' : 'transparent',
                color: roleSelection === 'parent' ? '#ffffff' : '#113C2B',
                cursor: 'pointer', transition: 'all 0.15s'
              }}
            >
              Orang Tua & Anak 👶
            </button>
            <button
              type="button"
              onClick={() => { setRoleSelection('adult'); setError(''); }}
              style={{
                flex: 1, padding: '10px 4px', fontSize: '12px', fontWeight: 900, borderRadius: '10px', border: 'none',
                backgroundColor: roleSelection === 'adult' ? '#113C2B' : 'transparent',
                color: roleSelection === 'adult' ? '#ffffff' : '#113C2B',
                cursor: 'pointer', transition: 'all 0.15s'
              }}
            >
              Dewasa / Umur 15+ 🧔
            </button>
          </div>
        )}

        {/* Notifications */}
        {error && (
          <div style={{ backgroundColor: '#fee2e2', border: '3px solid #ef4444', borderRadius: '12px', padding: '10px', color: '#b91c1c', fontWeight: 800, fontSize: '13px', marginBottom: '16px' }}>
            ⚠️ {error}
          </div>
        )}

        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
            <h4 style={{ fontWeight: 800, fontSize: '18px', color: '#15803d', margin: '0 0 8px' }}>Registrasi Berhasil!</h4>
            <p style={{ fontSize: '13.5px', color: '#556B52', fontWeight: 600, lineHeight: 1.5, marginBottom: '24px' }}>
              Akun Anda telah berhasil didaftarkan ke sistem database. Silakan masuk kembali ke halaman login.
            </p>
            <button 
              onClick={handleLoginNavigation} 
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#113C2B',
                color: '#FFFFFF',
                borderRadius: '14px',
                border: 'none',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 4px 0px #082218'
              }}
            >
              Ke Halaman Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
            
            {/* PARENT REGISTRATION FORM */}
            {roleSelection === 'parent' && (
              <>
                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '13px', marginBottom: '6px', color: '#113C2B' }}>NAMA ORANG TUA</label>
                  <input
                    type="text"
                    placeholder="Contoh: Papa Budi"
                    value={parentName}
                    onChange={e => setParentName(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 14px', fontSize: '14px', fontWeight: 700,
                      borderRadius: '12px', border: '3px solid #113C2B', outline: 'none', background: '#F8FAF8', color: '#113C2B'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '13px', marginBottom: '6px', color: '#113C2B' }}>NAMA PANGGILAN ANAK</label>
                  <input
                    type="text"
                    placeholder="Contoh: Roni"
                    value={childName}
                    onChange={e => setChildName(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 14px', fontSize: '14px', fontWeight: 700,
                      borderRadius: '12px', border: '3px solid #113C2B', outline: 'none', background: '#F8FAF8', color: '#113C2B'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '13px', marginBottom: '6px', color: '#113C2B' }}>EMAIL</label>
                  <input
                    type="email"
                    placeholder="Contoh: budi@gmail.com"
                    value={parentEmail}
                    onChange={e => setParentEmail(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 14px', fontSize: '14px', fontWeight: 700,
                      borderRadius: '12px', border: '3px solid #113C2B', outline: 'none', background: '#F8FAF8', color: '#113C2B'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '13px', marginBottom: '6px', color: '#113C2B' }}>PASSWORD</label>
                  <input
                    type="password"
                    placeholder="Password min. 6 karakter"
                    value={parentPassword}
                    onChange={e => setParentPassword(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 14px', fontSize: '14px', fontWeight: 700,
                      borderRadius: '12px', border: '3px solid #113C2B', outline: 'none', background: '#F8FAF8', color: '#113C2B'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '13px', marginBottom: '6px', color: '#113C2B' }}>PIN PENGAMAN (4 DIGIT)</label>
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="Contoh: 1234"
                    value={parentPin}
                    onChange={e => setParentPin(e.target.value.replace(/\D/g, ''))}
                    style={{
                      width: '100%', padding: '12px 14px', fontSize: '14px', fontWeight: 700,
                      borderRadius: '12px', border: '3px solid #113C2B', outline: 'none', background: '#F8FAF8', color: '#113C2B'
                    }}
                    required
                  />
                </div>
              </>
            )}

            {/* ADULT REGISTRATION FORM */}
            {roleSelection === 'adult' && (
              <>
                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '13px', marginBottom: '6px', color: '#113C2B' }}>NAMA LENGKAP</label>
                  <input
                    type="text"
                    placeholder="Contoh: Hasan Al-Banna"
                    value={adultName}
                    onChange={e => setAdultName(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 14px', fontSize: '14px', fontWeight: 700,
                      borderRadius: '12px', border: '3px solid #113C2B', outline: 'none', background: '#F8FAF8', color: '#113C2B'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '13px', marginBottom: '6px', color: '#113C2B' }}>EMAIL</label>
                  <input
                    type="email"
                    placeholder="Contoh: hasan@gmail.com"
                    value={adultEmail}
                    onChange={e => setAdultEmail(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 14px', fontSize: '14px', fontWeight: 700,
                      borderRadius: '12px', border: '3px solid #113C2B', outline: 'none', background: '#F8FAF8', color: '#113C2B'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '13px', marginBottom: '6px', color: '#113C2B' }}>PASSWORD</label>
                  <input
                    type="password"
                    placeholder="Password min. 6 karakter"
                    value={adultPassword}
                    onChange={e => setAdultPassword(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 14px', fontSize: '14px', fontWeight: 700,
                      borderRadius: '12px', border: '3px solid #113C2B', outline: 'none', background: '#F8FAF8', color: '#113C2B'
                    }}
                    required
                  />
                </div>
              </>
            )}

            <button 
              type="submit" 
              style={{ 
                fontSize: '16px', 
                padding: '14px', 
                backgroundColor: '#113C2B', 
                color: '#FFFFFF', 
                borderRadius: '14px',
                border: 'none',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 4px 0px #082218',
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <UserPlus size={18} /> Buat Akun Baru
            </button>

            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <span style={{ fontSize: '13px', color: '#556B52', fontWeight: 700 }}>Sudah memiliki akun? </span>
              <button
                type="button"
                onClick={handleLoginNavigation}
                style={{ background: 'none', border: 'none', color: '#113C2B', fontWeight: 900, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
              >
                Login di sini
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
