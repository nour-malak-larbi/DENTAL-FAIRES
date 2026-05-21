'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';


import Navbar from '@/components/Navbar';

const getMindshareImage = (image?: string | null) => {
  if (!image) return '/logo-transparent.png';
  if (image.startsWith('/') || image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) {
    return image;
  }
  if (/^\d+-/.test(image)) {
    return `/uploads/${image}`;
  }
  return `/mindshares/${image}`;
};

export default function MindshareDetailPage({ params }: { params: { id: string } }) {
  const [hasAccess, setHasAccess] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const [purchaseStatus, setPurchaseStatus] = useState<string | null>(null);
  const [mindshare, setMindshare] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    // Fetch mindshare data from the database
    const fetchMindshare = async () => {
      try {
        const res = await fetch(`/api/mindshares/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setMindshare(data);
        } else {
          setMindshare(null);
        }
      } catch (err) {
        console.error('Failed to fetch mindshare:', err);
        setMindshare(null);
      }
    };
    fetchMindshare();
  }, [params.id]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token
      fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setIsConnected(true);
          // Check access to this mindshare
          if (mindshare) {
            fetch('/api/access/check', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                productType: 'mindshare',
                productId: mindshare.id
              })
            })
            .then(res => res.json())
            .then(accessData => {
              setHasAccess(accessData.hasAccess);
              setMeetLink(accessData.meetLink);
              setPurchaseStatus(accessData.purchaseStatus);
            })
            .catch(() => {
              setHasAccess(false);
            });
          }
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, [mindshare]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsConnected(true);
        setShowRegModal(false);
        setRegistered(true);
      } else {
        alert(data.error || 'Email ou mot de passe incorrect.');
      }
    } catch {
      alert('Erreur de connexion. Veuillez réessayer.');
    }
  };

  if (!mindshare) {
    return (
      <div style={{ backgroundColor: '#091209', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'var(--font-inter), sans-serif' }}>
        <p>Article non trouvé (ID: {params.id})</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#091209', minHeight: '100vh', color: 'white', fontFamily: "var(--font-inter), sans-serif" }}>
      <Navbar />

      <main style={{ display: 'flex', minHeight: '100vh', flexDirection: 'row', flexWrap: 'wrap' }}>
        {/* Left: Sticky Poster */}
        <div style={{ flex: '1', minWidth: '320px', position: 'relative', height: 'clamp(300px, 50vh, 100vh)', overflow: 'hidden' }}>
          <img 
            src={getMindshareImage(mindshare.posterFile || mindshare.image)}
            alt={mindshare.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', top: '10rem', left: '2rem',
            padding: '0.5rem 1rem', background: '#C4993A', color: 'white',
            fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.1em'
          }}>
            {(mindshare.categoryLabel || mindshare.category || '').toUpperCase()}
          </div>
        </div>

        {/* Right: Content */}
        <div style={{ flex: '1.2', minWidth: '320px', padding: 'clamp(4rem, 10vw, 10rem) clamp(1.5rem, 5vw, 6rem) 8rem', backgroundColor: '#0D140D', overflowY: 'auto' }}>
          <div style={{ maxWidth: '800px' }}>
            {(mindshare.tags?.length > 0) && (
              <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {mindshare.tags?.map((tag: string) => (
                  <span key={tag} style={{ fontSize: '0.6rem', color: '#C4993A', border: '1px solid rgba(196,153,58,0.3)', padding: '0.3rem 0.8rem', borderRadius: '20px' }}>
                    #{tag.toUpperCase()}
                  </span>
                ))}
              </div>
            )}

            <h1 style={{ fontSize: '3.5rem', fontWeight: '200', lineHeight: '1.1', margin: '0 0 2rem', letterSpacing: '-0.02em' }}>
              {mindshare.title}
            </h1>
            
            <p style={{ fontSize: '1.2rem', color: '#C4993A', lineHeight: '1.6', marginBottom: '3rem', fontWeight: '300', fontStyle: 'italic' }}>
              {mindshare.subtitle}
            </p>

            {/* Meta Grid */}
            <div style={{ 
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem', 
              padding: '2.5rem 0', borderTop: '1px solid rgba(196,153,58,0.1)', borderBottom: '1px solid rgba(196,153,58,0.1)',
              marginBottom: '4rem'
            }}>
              <div>
                <p style={{ fontSize: '0.6rem', color: '#C4993A', letterSpacing: '0.2em', margin: '0 0 0.5rem' }}>AUTEUR</p>
                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '400' }}>{mindshare.author}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>{mindshare.authorTitle}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.6rem', color: '#C4993A', letterSpacing: '0.2em', margin: '0 0 0.5rem' }}>PUBLIÉ LE</p>
                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '400' }}>{mindshare.date}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Lecture: {mindshare.readTime}</p>
              </div>
            </div>

            {/* Article Content */}
            <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', fontSize: '1.05rem', fontWeight: '300' }}>
              {Array.isArray(mindshare.content)
                ? mindshare.content.map((para: string, i: number) => (
                    <p key={i} style={{ marginBottom: '2rem' }}>{para}</p>
                  ))
                : <p style={{ marginBottom: '2rem' }}>{mindshare.content || mindshare.description || ''}</p>
              }
            </div>

            {/* CTA */}
            <div style={{ marginTop: '5rem', padding: '3rem', border: '1px solid rgba(196,153,58,0.2)', borderRadius: '4px', textAlign: 'center', background: 'rgba(196,153,58,0.03)' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '300', marginBottom: '1rem' }}>Cet article vous a inspiré ?</h4>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>Rejoignez la discussion lors de nos sessions en direct sur Google Meet.</p>
              
              {!isConnected ? (
                <button
                  onClick={() => setShowRegModal(true)}
                  style={{
                    padding: '1rem 2.5rem', background: 'linear-gradient(135deg, #C4993A, #8B6820)',
                    border: 'none', color: 'white', fontSize: '0.8rem', letterSpacing: '0.2em', fontWeight: 'bold', cursor: 'pointer'
                  }}
                >
                  S'INSCRIRE POUR ACCÉDER
                </button>
              ) : hasAccess ? (
                <div>
                  <p style={{ color: '#C4993A', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>✓ VOUS AVEZ ACCÈS À CET ARTICLE</p>
                  {meetLink ? (
                    <a href={meetLink} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 2.5rem', background: '#C4993A', color: 'white', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.2em'
                    }}>
                      🎥 REJOINDRE LA DISCUSSION
                    </a>
                  ) : (
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                      Le lien Google Meet sera disponible prochainement.
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <p style={{ color: '#C4993A', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>✓ ACCÈS GRATUIT À CET ARTICLE</p>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                    Connectez-vous pour accéder au contenu gratuit.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Login Modal - Style matching /login page */}
      {showRegModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}>
          <div style={{
            background: 'rgba(8,14,8,0.95)',
            border: '1px solid rgba(196,153,58,0.18)',
            padding: '2.8rem',
            width: '95%', maxWidth: '420px',
            position: 'relative',
            borderRadius: '4px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7)'
          }}>
            {/* Gold line top */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(196,153,58,0.5),transparent)' }} />

            <button onClick={() => setShowRegModal(false)} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'none', border: 'none', color: 'rgba(245,242,236,0.4)', fontSize: '1.3rem', cursor: 'pointer', lineHeight: 1 }}>×</button>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <img src="/logo-transparent.png" alt="Dental Fairies" style={{ height: '160px', width: 'auto', display: 'block', margin: '-40px auto -50px', filter: 'drop-shadow(0 0 16px rgba(196,153,58,0.5))' }} />
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: '200', color: '#F5F2EC', margin: '0 0 0.4rem' }}>Accès à l&apos;<em style={{ fontStyle: 'italic', color: '#E2C47A' }}>académie</em></h2>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: 'rgba(245,242,236,0.4)', margin: 0 }}>Connectez-vous pour accéder au contenu.</p>
            </div>

            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C4993A', marginBottom: '0.5rem' }}>Email</label>
                <input name="email" type="email" placeholder="contact@exemple.com" required
                  style={{ width: '100%', background: 'rgba(4,8,4,0.8)', border: '1px solid rgba(26,46,26,0.8)', padding: '0.85rem 1rem', color: '#F5F2EC', fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: '200', outline: 'none', borderRadius: 0, boxSizing: 'border-box' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(196,153,58,0.55)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(26,46,26,0.8)'}
                />
              </div>

              <div style={{ marginBottom: '1.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C4993A' }}>Mot de passe</label>
                  <a href="#" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(245,242,236,0.3)', textDecoration: 'none' }}>Mot de passe oublié ?</a>
                </div>
                <input name="password" type="password" placeholder="••••••••" required
                  style={{ width: '100%', background: 'rgba(4,8,4,0.8)', border: '1px solid rgba(26,46,26,0.8)', padding: '0.85rem 1rem', color: '#F5F2EC', fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: '200', outline: 'none', borderRadius: 0, boxSizing: 'border-box' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(196,153,58,0.55)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(26,46,26,0.8)'}
                />
              </div>

              <button type="submit" style={{
                width: '100%', padding: '1rem',
                background: 'linear-gradient(135deg,#C4993A,#8B6820)',
                color: '#080E08', border: 'none', cursor: 'pointer',
                fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', fontWeight: '400',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))'
              }}>Connexion</button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.78rem', color: 'rgba(245,242,236,0.35)' }}>
              Nouveau membre ?{' '}
              <a href="/register" style={{ color: '#C4993A', textDecoration: 'none' }}>Rejoindre l&apos;académie</a>
            </p>
          </div>
        </div>
      )}

      {/* Success Notification (Optional, here it just unlocks the Meet button) */}
    </div>
  );
}
