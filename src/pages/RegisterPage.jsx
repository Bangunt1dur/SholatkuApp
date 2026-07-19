// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Lock, Key, UserPlus } from 'lucide-react';

export default function RegisterPage({ onLoginClick }) {
  const { registerParent, registerAdult } = useApp();
  const [roleSelection, setRoleSelection] = useState('parent'); // 'parent' | 'adult'
  
  // Parent Form fields
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPassword, setParentPassword] = useState('');
  const [parentPin, setParentPin] = useState('');

  // Adult Form fields
  const [adultName, setAdultName] = useState('');
  const [adultEmail, setAdultEmail] = useState('');
  const [adultPassword, setAdultPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
      const res = registerParent(parentName.trim(), childName.trim(), parentEmail.trim(), parentPassword, parentPin);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.message);
      }
    } else {
      if (!adultName || !adultEmail || !adultPassword) {
        setError('Harap lengkapi semua kolom pendaftaran dewasa!');
        return;
      }
      const res = registerAdult(adultName.trim(), adultEmail.trim(), adultPassword);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.message);
      }
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh',
      padding: '20px', background: 'transparent'
    }}>
      <div className="clay-card animate-fadeInUp" style={{
        maxWidth: '420px', width: '100%', padding: '32px', background: '#ffffff',
        border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
        position: 'relative'
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', animation: 'float 3s ease-in-out infinite' }}>🕌</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '28px', color: '#0F172A', margin: '8px 0 2px' }}>
            Daftar Akun
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 600, margin: 0 }}>
            Pilih jenis akun yang sesuai untuk Anda
          </p>
        </div>

        {/* Role Toggle Selector */}
        {!success && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', backgroundColor: '#F1F5F9', padding: '4px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
            <button
              onClick={() => { setRoleSelection('parent'); setError(''); }}
              style={{
                flex: 1, padding: '8px 4px', fontSize: '12px', fontWeight: 700, borderRadius: '8px', border: 'none',
                backgroundColor: roleSelection === 'parent' ? '#fff' : 'transparent',
                color: roleSelection === 'parent' ? '#059669' : '#64748B',
                boxShadow: roleSelection === 'parent' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
                cursor: 'pointer', transition: 'all 0.15s'
              }}
            >
              Orang Tua & Anak 👶
            </button>
            <button
              onClick={() => { setRoleSelection('adult'); setError(''); }}
              style={{
                flex: 1, padding: '8px 4px', fontSize: '12px', fontWeight: 700, borderRadius: '8px', border: 'none',
                backgroundColor: roleSelection === 'adult' ? '#fff' : 'transparent',
                color: roleSelection === 'adult' ? '#059669' : '#64748B',
                boxShadow: roleSelection === 'adult' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
                cursor: 'pointer', transition: 'all 0.15s'
              }}
            >
              Belajar Dewasa 🧔
            </button>
          </div>
        )}

        {/* Notifications */}
        {error && (
          <div style={{
            background: '#FFF5F5', border: '1px solid #FEB2B2', borderRadius: '8px', padding: '10px 14px',
            color: '#C53030', fontSize: '12.5px', fontWeight: 700, marginBottom: '16px', textAlign: 'center'
          }}>
            ❌ {error}
          </div>
        )}

        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
            <h4 style={{ fontWeight: 800, fontSize: '18px', color: '#15803d', margin: '0 0 8px' }}>Registrasi Berhasil!</h4>
            <p style={{ fontSize: '13.5px', color: '#64748B', fontWeight: 600, lineHeight: 1.5, marginBottom: '24px' }}>
              Akun Anda telah berhasil didaftarkan ke sistem database. Silakan masuk kembali ke halaman login.
            </p>
            <button onClick={onLoginClick} className="clay-btn purple w-full" style={{ padding: '12px', background: '#059669', borderColor: '#059669' }}>
              Ke Halaman Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* PARENT REGISTRATION FORM */}
            {roleSelection === 'parent' && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '10.5px', fontWeight: 800, color: '#475569' }}>NAMA ORANG TUA</label>
                  <div style={{ position: 'relative' }}>
                    <User size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="text"
                      placeholder="Contoh: Papa Budi"
                      value={parentName}
                      onChange={e => setParentName(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 12px 10px 38px', fontSize: '13px', fontWeight: 600,
                        borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', background: '#F8FAFC'
                      }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '10.5px', fontWeight: 800, color: '#475569' }}>NAMA PANGGILAN ANAK</label>
                  <div style={{ position: 'relative' }}>
                    <User size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="text"
                      placeholder="Contoh: Roni"
                      value={childName}
                      onChange={e => setChildName(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 12px 10px 38px', fontSize: '13px', fontWeight: 600,
                        borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', background: '#F8FAFC'
                      }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '10.5px', fontWeight: 800, color: '#475569' }}>EMAIL</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="email"
                      placeholder="Contoh: budi@gmail.com"
                      value={parentEmail}
                      onChange={e => setParentEmail(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 12px 10px 38px', fontSize: '13px', fontWeight: 600,
                        borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', background: '#F8FAFC'
                      }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '10.5px', fontWeight: 800, color: '#475569' }}>PASSWORD</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="password"
                      placeholder="Password min. 6 karakter"
                      value={parentPassword}
                      onChange={e => setParentPassword(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 12px 10px 38px', fontSize: '13px', fontWeight: 600,
                        borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', background: '#F8FAFC'
                      }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '10.5px', fontWeight: 800, color: '#475569' }}>PIN PENGAMAN ORANG TUA (4 DIGIT)</label>
                  <div style={{ position: 'relative' }}>
                    <Key size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="Contoh: 1234 (untuk kembali dari Mode Anak)"
                      value={parentPin}
                      onChange={e => setParentPin(e.target.value.replace(/\D/g, ''))}
                      style={{
                        width: '100%', padding: '10px 12px 10px 38px', fontSize: '13px', fontWeight: 600,
                        borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', background: '#F8FAFC'
                      }}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* ADULT REGISTRATION FORM */}
            {roleSelection === 'adult' && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '10.5px', fontWeight: 800, color: '#475569' }}>NAMA LENGKAP</label>
                  <div style={{ position: 'relative' }}>
                    <User size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="text"
                      placeholder="Contoh: Hasan Al-Banna"
                      value={adultName}
                      onChange={e => setAdultName(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 12px 10px 38px', fontSize: '13px', fontWeight: 600,
                        borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', background: '#F8FAFC'
                      }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '10.5px', fontWeight: 800, color: '#475569' }}>EMAIL</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="email"
                      placeholder="Contoh: hasan@gmail.com"
                      value={adultEmail}
                      onChange={e => setAdultEmail(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 12px 10px 38px', fontSize: '13px', fontWeight: 600,
                        borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', background: '#F8FAFC'
                      }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '10.5px', fontWeight: 800, color: '#475569' }}>PASSWORD</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="password"
                      placeholder="Password min. 6 karakter"
                      value={adultPassword}
                      onChange={e => setAdultPassword(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 12px 10px 38px', fontSize: '13px', fontWeight: 600,
                        borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', background: '#F8FAFC'
                      }}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="clay-btn purple w-full" style={{ padding: '12px', marginTop: '6px', background: '#059669', borderColor: '#059669' }}>
              <UserPlus size={15} /> Buat Akun Baru
            </button>

            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Sudah memiliki akun? </span>
              <button
                type="button"
                onClick={onLoginClick}
                style={{ background: 'none', border: 'none', color: '#059669', fontWeight: 700, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
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
