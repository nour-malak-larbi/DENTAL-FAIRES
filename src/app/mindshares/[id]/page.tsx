'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { mindshares, getMindshareById, getPosterUrl } from '@/lib/mindshares-data';

export default function MindshareDetailPage({ params }: { params: { id: string } }) {
  const [hasAccess, setHasAccess] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const [purchaseStatus, setPurchaseStatus] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mindshare, setMindshare] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch mindshare data
    const fetchedMindshare = getMindshareById(Number(params.id));
    setMindshare(fetchedMindshare);
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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnected(true);
    setShowRegModal(false);
    setRegistered(true);
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
      {/* Navigation */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        padding: isScrolled ? '1rem 4.5rem' : '1.5rem 4.5rem',
        backgroundColor: isScrolled ? 'rgba(10, 15, 10, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo-transparent.png" alt="Logo" style={{ height: '35px', width: 'auto', filter: 'drop-shadow(0 0 10px rgba(196,153,58,0.4))' }} />
          </div>
        </Link>
        <ul style={{ display: 'flex', gap: '1.8rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
          <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.15em' }}>ACCUEIL</Link></li>
          <li><Link href="/webinaires" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.15em' }}>WEBINAIRES</Link></li>
          <li><Link href="/mindshares" style={{ color: '#C4993A', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.15em' }}>MINDSHARES</Link></li>
          <li><Link href="/workshops" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.15em' }}>WORKSHOPS</Link></li>
          <li><Link href="/podcasts" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.15em' }}>PODCASTS</Link></li>
          <li><Link href="/vip" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.15em' }}>COACHING VIP</Link></li>
          <li><Link href="/boutique" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.15em' }}>BOUTIQUE</Link></li>
        </ul>
      </nav>

      <main style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Left: Sticky Poster */}
        <div style={{ flex: '1', position: 'relative', height: '100vh', overflow: 'hidden' }}>
          <img 
            src={getPosterUrl(mindshare.posterFile)} 
            alt={mindshare.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', top: '10rem', left: '4.5rem',
            padding: '0.5rem 1rem', background: '#C4993A', color: 'white',
            fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.1em'
          }}>
            {mindshare.categoryLabel.toUpperCase()}
          </div>
        </div>

        {/* Right: Content */}
        <div style={{ flex: '1.2', padding: '10rem 6rem 8rem', backgroundColor: '#0D140D', overflowY: 'auto' }}>
          <div style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem' }}>
              {mindshare.tags.map(tag => (
                <span key={tag} style={{ fontSize: '0.6rem', color: '#C4993A', border: '1px solid rgba(196,153,58,0.3)', padding: '0.3rem 0.8rem', borderRadius: '20px' }}>
                  #{tag.toUpperCase()}
                </span>
              ))}
            </div>

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
              {mindshare.content.map((para, i) => (
                <p key={i} style={{ marginBottom: '2rem' }}>{para}</p>
              ))}
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

      {/* Registration Modal */}
      {showRegModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(15px)' }}>
          <div style={{ background: '#0D140D', border: '1px solid #C4993A', padding: '3.5rem', width: '95%', maxWidth: '450px', position: 'relative' }}>
            <button onClick={() => setShowRegModal(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', color: '#C4993A', marginBottom: '1rem', textAlign: 'center' }}>Rejoindre l'Académie</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '2.5rem', textAlign: 'center' }}>Inscrivez-vous pour rejoindre nos débats et mindshares en direct.</p>
            
            <form onSubmit={handleRegister}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.6rem', color: '#C4993A', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>NOM</label>
                  <input type="text" required style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,153,58,0.3)', padding: '0.8rem', color: 'white', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.6rem', color: '#C4993A', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>PRÉNOM</label>
                  <input type="text" required style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,153,58,0.3)', padding: '0.8rem', color: 'white', outline: 'none' }} />
                </div>
              </div>
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.6rem', color: '#C4993A', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>EMAIL PROFESSIONNEL</label>
                <input type="email" required style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,153,58,0.3)', padding: '0.8rem', color: 'white', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.6rem', color: '#C4993A', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>MOT DE PASSE</label>
                <input type="password" required style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,153,58,0.3)', padding: '0.8rem', color: 'white', outline: 'none' }} />
              </div>
              <button type="submit" style={{ width: '100%', padding: '1.2rem', background: '#C4993A', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '0.2em' }}>
                S'INSCRIRE MAINTENANT
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Notification (Optional, here it just unlocks the Meet button) */}
    </div>
  );
}
