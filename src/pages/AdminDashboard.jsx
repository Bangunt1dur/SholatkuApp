// src/pages/AdminDashboard.jsx
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlusCircle, Edit2, Trash2, Users, BookOpen, Save, Upload, Image } from 'lucide-react';

export default function AdminDashboard() {
  const { movements, users, addOrUpdateMovement, deleteMovement } = useApp();
  const [activeTab, setActiveTab] = useState('movements'); // 'movements' | 'users'

  // Form states for movement editor
  const [mId, setMId] = useState(null);
  const [mKey, setMKey] = useState('');
  const [mName, setMName] = useState('');
  const [mNameKids, setMNameKids] = useState('');
  const [mEmoji, setMEmoji] = useState('');
  const [mArabicText, setMArabicText] = useState('');
  const [mLatin, setMLatin] = useState('');
  const [mTranslation, setMTranslation] = useState('');
  const [mExplanation, setMExplanation] = useState('');
  const [mExplanationKids, setMExplanationKids] = useState('');
  const [mAudioUrl, setMAudioUrl] = useState('');
  const [mImage, setMImage] = useState(''); // Stores Base64 Image string

  const [successMsg, setSuccessMsg] = useState('');

  // Read file input and convert to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (e.g. limit to 1MB to avoid filling up LocalStorage)
    if (file.size > 1024 * 1024) {
      alert('Ukuran file gambar terlalu besar! Harap pilih gambar dengan ukuran di bawah 1MB untuk performa LocalStorage database.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setMImage(reader.result); // Base64 data URL
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (m) => {
    setMId(m.id);
    setMKey(m.key);
    setMName(m.name || '');
    setMNameKids(m.nameKids || '');
    setMEmoji(m.emoji || '');
    setMArabicText(m.arabicText || '');
    setMLatin(m.latin || '');
    setMTranslation(m.translation || '');
    setMExplanation(m.explanation || '');
    setMExplanationKids(m.explanationKids || '');
    setMAudioUrl(m.audioUrl || '');
    setMImage(m.image || '');
  };

  const handleClear = () => {
    setMId(null);
    setMKey('');
    setMName('');
    setMNameKids('');
    setMEmoji('');
    setMArabicText('');
    setMLatin('');
    setMTranslation('');
    setMExplanation('');
    setMExplanationKids('');
    setMAudioUrl('');
    setMImage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mKey || !mName) return;

    const data = {
      id: mId || Date.now(),
      key: mKey,
      name: mName,
      nameKids: mNameKids || mName,
      emoji: mEmoji || '🕌',
      arabicText: mArabicText,
      latin: mLatin,
      translation: mTranslation,
      explanation: mExplanation,
      explanationKids: mExplanationKids || mExplanation,
      audioUrl: mAudioUrl,
      image: mImage, // Base64 string saved directly in the DB
      source: 'Diunggah via Admin Panel'
    };

    addOrUpdateMovement(data);
    setSuccessMsg(mId ? 'Gerakan sholat berhasil diperbarui!' : 'Gerakan sholat baru berhasil ditambahkan!');
    handleClear();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', marginBottom: '24px' }}>
        <BookOpen size={20} style={{ color: '#0F172A' }} />
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
          Admin Panel Database
        </h2>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', backgroundColor: '#EDF2F7', padding: '4px', borderRadius: '10px', border: '1px solid #E2E8F0', maxWidth: '400px' }}>
        <button
          onClick={() => setActiveTab('movements')}
          style={{
            flex: 1, padding: '8px', fontSize: '12.5px', fontWeight: 700, borderRadius: '8px', border: 'none',
            backgroundColor: activeTab === 'movements' ? '#fff' : 'transparent',
            color: activeTab === 'movements' ? '#0F172A' : '#718096',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
          }}
        >
          <BookOpen size={14} /> Tuntunan Sholat
        </button>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            flex: 1, padding: '8px', fontSize: '12.5px', fontWeight: 700, borderRadius: '8px', border: 'none',
            backgroundColor: activeTab === 'users' ? '#fff' : 'transparent',
            color: activeTab === 'users' ? '#0F172A' : '#718096',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
          }}
        >
          <Users size={14} /> Pengguna Terdaftar ({users.filter(u => u.role !== 'admin').length})
        </button>
      </div>

      {successMsg && (
        <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#047857', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, marginBottom: '20px' }}>
          ✓ {successMsg}
        </div>
      )}

      {/* TAB 1: MOVEMENTS MANAGER */}
      {activeTab === 'movements' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
          
          {/* Movement Editor Form */}
          <form onSubmit={handleSubmit} className="clay-card" style={{ padding: '20px' }}>
            <h4 style={{ margin: '0 0 16px', fontSize: '14.5px', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <PlusCircle size={16} /> {mId ? 'EDIT DATA GERAKAN' : 'TAMBAH GERAKAN SHOLAT'}
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* File Upload to Base64 ( lecturers DB request ) */}
              <div style={{ border: '1.5px dashed #CBD5E0', background: '#F8FAFC', padding: '14px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  {mImage ? (
                    <img src={mImage} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '6px', border: '1px solid #CBD5E0', background: '#fff' }} />
                  ) : (
                    <Image size={32} style={{ color: '#94A3B8' }} />
                  )}
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569' }}>UNGGAH GAMBAR KE DATABASE</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ fontSize: '11px', width: '100%', maxWidth: '200px' }}
                  />
                  <span style={{ fontSize: '9px', color: '#94A3B8' }}>File akan diconvert otomatis ke Base64</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#475569' }}>KEY (ID GERAKAN)</label>
                  <input
                    type="text"
                    placeholder="Contoh: rukuk"
                    value={mKey}
                    onChange={e => setMKey(e.target.value.toLowerCase().replace(/\s/g, '_'))}
                    disabled={mId !== null}
                    style={{ padding: '8px 10px', fontSize: '13px', border: '1px solid #CBD5E0', borderRadius: '6px', outline: 'none' }}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#475569' }}>EMOJI FALLBACK</label>
                  <input
                    type="text"
                    placeholder="Contoh: 🙇‍♂️"
                    value={mEmoji}
                    onChange={e => setMEmoji(e.target.value)}
                    style={{ padding: '8px 10px', fontSize: '13px', border: '1px solid #CBD5E0', borderRadius: '6px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#475569' }}>NAMA GERAKAN (DEWASA)</label>
                <input
                  type="text"
                  placeholder="Contoh: Gerakan Rukuk (Ruku')"
                  value={mName}
                  onChange={e => setMName(e.target.value)}
                  style={{ padding: '8px 10px', fontSize: '13px', border: '1px solid #CBD5E0', borderRadius: '6px', outline: 'none' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#475569' }}>NAMA GERAKAN (ANAK-ANAK)</label>
                <input
                  type="text"
                  placeholder="Contoh: Rukuk Ceria 🙇‍♂️"
                  value={mNameKids}
                  onChange={e => setMNameKids(e.target.value)}
                  style={{ padding: '8px 10px', fontSize: '13px', border: '1px solid #CBD5E0', borderRadius: '6px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#475569' }}>BACAAN BENTUK ARAB</label>
                <input
                  type="text"
                  placeholder="Masukkan lafal Arab"
                  value={mArabicText}
                  onChange={e => setMArabicText(e.target.value)}
                  style={{ padding: '8px 10px', fontSize: '13px', border: '1px solid #CBD5E0', borderRadius: '6px', outline: 'none', direction: 'rtl', fontFamily: 'serif' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#475569' }}>CARA BACA (LATIN)</label>
                <input
                  type="text"
                  placeholder="Masukkan transliterasi Latin"
                  value={mLatin}
                  onChange={e => setMLatin(e.target.value)}
                  style={{ padding: '8px 10px', fontSize: '13px', border: '1px solid #CBD5E0', borderRadius: '6px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#475569' }}>TERJEMAHAN ARTI BACAAN</label>
                <input
                  type="text"
                  placeholder="Masukkan arti terjemahan"
                  value={mTranslation}
                  onChange={e => setMTranslation(e.target.value)}
                  style={{ padding: '8px 10px', fontSize: '13px', border: '1px solid #CBD5E0', borderRadius: '6px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#475569' }}>PENJELASAN FIQIH (DEWASA)</label>
                <textarea
                  rows={2}
                  placeholder="Cara ruku' yang benar sesuai HPT..."
                  value={mExplanation}
                  onChange={e => setMExplanation(e.target.value)}
                  style={{ padding: '8px 10px', fontSize: '13px', border: '1px solid #CBD5E0', borderRadius: '6px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#475569' }}>PENJELASAN KHUSUS ANAK-ANAK</label>
                <textarea
                  rows={2}
                  placeholder="Bungkukkan badanmu dengan gembira!"
                  value={mExplanationKids}
                  onChange={e => setMExplanationKids(e.target.value)}
                  style={{ padding: '8px 10px', fontSize: '13px', border: '1px solid #CBD5E0', borderRadius: '6px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={handleClear}
                  style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: 700, border: '1px solid #CBD5E0', borderRadius: '6px', background: '#F8FAFC', cursor: 'pointer' }}
                >
                  Clear
                </button>
                <button
                  type="submit"
                  style={{ flex: 2, padding: '10px', fontSize: '13px', fontWeight: 700, border: 'none', borderRadius: '6px', background: '#0F172A', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Save size={14} /> Simpan ke DB
                </button>
              </div>
            </div>
          </form>

          {/* Movements List Table */}
          <div className="clay-card" style={{ overflowX: 'auto', padding: '20px' }}>
            <h4 style={{ margin: '0 0 16px', fontSize: '14.5px', fontWeight: 700, color: '#1E293B' }}>
              DATABASE GERAKAN SHOLAT ({movements.length})
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', minWidth: '500px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                  <th style={{ padding: '8px' }}>Preview</th>
                  <th style={{ padding: '8px' }}>Nama Dewasa</th>
                  <th style={{ padding: '8px' }}>Key ID</th>
                  <th style={{ padding: '8px' }}>Ikon</th>
                  <th style={{ padding: '8px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {movements.map((m) => (
                  <tr key={m.id || m.key} style={{ borderBottom: '1px solid #EDF2F7', color: '#1E293B' }}>
                    <td style={{ padding: '10px 8px' }}>
                      {m.image ? (
                        <img src={m.image} alt={m.name} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px', border: '1px solid #E2E8F0' }} />
                      ) : (
                        <span style={{ fontSize: '24px' }}>{m.emoji}</span>
                      )}
                    </td>
                    <td style={{ padding: '10px 8px', fontWeight: 700 }}>{m.name}</td>
                    <td style={{ padding: '10px 8px', color: '#64748B', fontFamily: 'monospace' }}>{m.key}</td>
                    <td style={{ padding: '10px 8px', fontSize: '20px' }}>{m.emoji}</td>
                    <td style={{ padding: '10px 8px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => handleEdit(m)}
                          style={{ border: 'none', background: '#EDF2F7', padding: '5px', borderRadius: '4px', cursor: 'pointer', color: '#1A202C' }}
                          title="Edit"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => deleteMovement(m.id)}
                          style={{ border: 'none', background: '#FEE2E2', padding: '5px', borderRadius: '4px', cursor: 'pointer', color: '#EF4444' }}
                          title="Delete"
                          disabled={movements.length <= 1}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: REGISTERED USERS DATABASE */}
      {activeTab === 'users' && (
        <div className="clay-card" style={{ padding: '24px' }}>
          <h4 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>
            DAFTAR AKUN YANG TERDAFTAR DI DATABASE
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {users.filter(u => u.role !== 'admin').map((user) => {
              const isParent = user.role === 'parent';
              return (
                <div key={user.id} style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px', background: '#F8FAFC' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px', marginBottom: '12px' }}>
                    <div>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#1E293B' }}>
                        {isParent ? '👨‍👩‍👦' : '🧔'} {user.name}
                      </span>
                      <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                        Email: {user.email} {isParent && `| PIN Gate: ${user.pin}`}
                      </div>
                    </div>
                    <span style={{ 
                      fontSize: '11px', 
                      background: isParent ? '#ECFDF5' : '#F1F5F9', 
                      color: isParent ? '#047857' : '#475569', 
                      padding: '4px 10px', borderRadius: '6px', height: 'fit-content', fontWeight: 700 
                    }}>
                      Role: {isParent ? 'Parent & Kids' : 'Adult'}
                    </span>
                  </div>

                  {/* If Parent, list their registered child stats */}
                  {isParent && user.childStats && (
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', marginBottom: '8px', textTransform: 'uppercase' }}>PROFIL ANAK:</div>
                      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px', fontSize: '12.5px' }}>
                        <div style={{ fontWeight: 800, color: '#1E293B', fontSize: '13.5px', marginBottom: '6px' }}>🧒 {user.childStats.name}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', color: '#64748B' }}>
                          <span>Level: <strong>{user.childStats.level}</strong></span>
                          <span>XP: <strong>{user.childStats.xp}/{user.childStats.xpToNext}</strong></span>
                          <span>Gems: <strong>{user.childStats.gems} 💎</strong></span>
                          <span>Bintang: <strong>{user.childStats.stars} ⭐</strong></span>
                          <span>Streak Hari: <strong>{user.childStats.streak} Hari</strong></span>
                          <span>Total Sholat: <strong>{user.childStats.totalPrayers}</strong></span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {users.filter(u => u.role !== 'admin').length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px 0', color: '#94A3B8', fontStyle: 'italic', fontSize: '13px' }}>
                Belum ada akun terdaftar dalam sistem database lokal.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
