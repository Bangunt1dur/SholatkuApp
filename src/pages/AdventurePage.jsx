import React, { useState } from 'react';

// Data 11 Level Petualangan Sholat sesuai petunjuk di CSS Anda
const levelsData = [
  { id: 1, name: "Niat & Takbir", icon: "✋", points: 10, description: "Memulai sholat dengan ikhlas" },
  { id: 2, name: "Berdiri Tegak", icon: "🧍", points: 15, description: "Posisi berdiri yang sempurna" },
  { id: 3, name: "Membaca Al-Fatihah", icon: "📖", points: 20, description: "Membaca surah pembuka Al-Qur'an" },
  { id: 4, name: "Ruku'", icon: "📐", points: 25, description: "Membungkuk dengan tenang (Tuma'ninah)" },
  { id: 5, name: "I'tidal", icon: "⬆️", points: 25, description: "Bangkit tegak dari ruku'" },
  { id: 6, name: "Sujud Pertama", icon: "🧎", points: 30, description: "Mendekatkan diri kepada Allah" },
  { id: 7, name: "Duduk di Antara 2 Sujud", icon: "🧘", points: 30, description: "Duduk tenang dan berdoa" },
  { id: 8, name: "Sujud Kedua", icon: "🧎", points: 30, description: "Menyempurnakan rakaat sholat" },
  { id: 9, name: "Tashahhud Awal", icon: "☝️", points: 35, description: "Duduk membaca tasyahud pertama" },
  { id: 10, name: "Tashahhud Akhir", icon: "🕌", points: 40, description: "Membaca shalawat di akhir sholat" },
  { id: 11, name: "Salam", icon: "✨", points: 50, description: "Menutup petualangan sholat dengan damai" },
];

export default function JalurPetualangan() {
  // Anggap saja Ahmad saat ini baru menyelesaikan sampai level 3 (bisa disesuaikan nanti dengan state global/backend)
  const [currentLevel, setCurrentLevel] = useState(3);
  const [selectedLevel, setSelectedLevel] = useState(levelsData[2]);

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>

      {/* Header Halaman */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ fontSize: '36px' }}>🗺️</span>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#1E293B', margin: 0 }}>Jalur Petualangan Sholat</h1>
          <p style={{ color: '#64748B', fontSize: '14px', margin: '4px 0 0 0' }}>Lalui 11 level petualangan dari berdiri tegak hingga salam!</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>

        {/* Sisi Kiri: Peta Petualangan Ular Tangga / Zig-zag */}
        <div className="adventure-map" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px 24px',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1
          }}>

            {levelsData.map((level, index) => {
              const isCompleted = level.id < currentLevel;
              const isCurrent = level.id === currentLevel;
              const isLocked = level.id > currentLevel;

              return (
                <div key={level.id} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>

                  {/* Penghubung Jalur antar pulau level (Path Connector) */}
                  {index < levelsData.length - 1 && (
                    <div
                      className={`path-connector ${isCompleted ? 'done' : ''}`}
                      style={{
                        position: 'absolute',
                        left: '70px',
                        top: '35px',
                        width: '30px',
                        height: '6px',
                        backgroundColor: isCompleted ? 'var(--primary, #1AA88E)' : '#CBD5E1',
                        zIndex: -1
                      }}
                    />
                  )}

                  {/* Tombol Pulau Level Petualangan */}
                  <button
                    onClick={() => setSelectedLevel(level)}
                    disabled={isLocked}
                    style={{
                      width: '75px',
                      height: '75px',
                      borderRadius: '20px',
                      border: '4px solid #000000',
                      background: isCurrent
                        ? 'linear-gradient(135deg, #F5A623, #D0870B)'
                        : isCompleted
                          ? 'linear-gradient(135deg, var(--primary, #1AA88E), var(--primary-dark, #137A67))'
                          : '#E2E8F0',
                      boxShadow: isLocked ? 'none' : '4px 4px 0px #000000',
                      cursor: isLocked ? 'not-allowed' : 'pointer',
                      transform: selectedLevel?.id === level.id ? 'scale(1.1) translateY(-4px)' : 'none',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                  >
                    {/* Status Ikon Gembok / Centang */}
                    {isLocked ? (
                      <span style={{ fontSize: '20px', filter: 'grayscale(100%)' }}>🔒</span>
                    ) : (
                      <>
                        <span style={{ fontSize: '26px' }}>{level.icon}</span>
                        <span style={{
                          position: 'absolute',
                          bottom: '-10px',
                          background: '#000000',
                          color: '#fff',
                          fontSize: '10px',
                          fontWeight: '900',
                          padding: '1px 6px',
                          borderRadius: '10px',
                          border: '2px solid #fff'
                        }}>
                          LVL {level.id}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sisi Kanan: Detail Info Kotak Level yang Dipilih */}
        {selectedLevel && (
          <div style={{
            background: 'white',
            border: '4px solid #000000',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '4px 4px 0px #000000',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '12px' }}>{selectedLevel.icon}</div>
            <span style={{
              background: 'var(--primary-light, #E8F7F4)',
              color: 'var(--primary, #1AA88E)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '800',
              border: '2px solid #000000'
            }}>
              LEVEL {selectedLevel.id}
            </span>

            <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '16px 0 8px 0', color: '#1E293B' }}>
              {selectedLevel.name}
            </h3>

            <p style={{ color: '#64748B', fontSize: '13px', lineHeight: '1.5', margin: '0 0 20px 0' }}>
              {selectedLevel.description}
            </p>

            <div style={{
              background: '#FFFBEB',
              border: '2px solid #F5A623',
              borderRadius: '14px',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontWeight: '800',
              fontSize: '14px',
              color: '#B45309',
              marginBottom: '20px'
            }}>
              🪙 +{selectedLevel.points} Koin XP Rewards
            </div>

            <button style={{
              width: '100%',
              padding: '12px',
              background: '#22C55E',
              color: 'white',
              border: '3px solid #000000',
              borderRadius: '16px',
              fontWeight: '900',
              fontSize: '16px',
              boxShadow: '3px 3px 0px #000000',
              cursor: 'pointer',
              transition: 'transform 0.1s'
            }}
              onClick={() => alert(`Memulai misi belajar gerakan ${selectedLevel.name}! ✨`)}
              onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(2px)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'none'}
            >
              Mulai Petualangan 🚀
            </button>
          </div>
        )}

      </div>
    </div>
  );
}