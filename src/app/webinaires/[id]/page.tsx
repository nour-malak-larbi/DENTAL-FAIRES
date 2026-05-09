'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { webinars, getWebinarById, getPosterUrl } from '@/lib/webinairs-data';

export default function WebinarDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // Mock state

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJoinClick = () => {
    if (!isConnected) {
      router.push('/login');
    } else {
      setRegistered(true);
    }
  };

  const webinar = getWebinarById(Number(params.id));

  if (!webinar) {
    return (
      <div style={{ backgroundColor: '#091209', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: "'Jost', sans-serif" }}>
        <p>Webinaire non trouvé (ID: {params.id})</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#091209', minHeight: '100vh', color: 'white', fontFamily: "'Jost', sans-serif" }}>
      {/* Navigation - Standardized */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isScrolled ? '0.5rem 4.5rem' : '0.8rem 4.5rem',
        backgroundColor: isScrolled ? '#091209' : 'transparent',
        borderBottom: isScrolled ? '1px solid rgba(212,175,55,0.2)' : 'none',
        transition: 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <img 
              src="/logo-transparent.png" 
              alt="Dental Fairies" 
              style={{ 
                height: isScrolled ? '120px' : '200px', 
                width: 'auto', 
                margin: isScrolled ? '-40px 0' : '-65px 0',
                filter: 'drop-shadow(0 0 16px rgba(196,153,58,0.55))',
                transition: 'all 0.6s ease',
                display: 'block'
              }} 
            />
          </Link>
        </div>

        <ul style={{ display: 'flex', gap: '1.8rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
          <li><Link href="/" style={{ color: 'rgba(245,242,236,0.55)', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Accueil</Link></li>
          <li><Link href="/webinaires" style={{ color: '#F1D382', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Webinaires</Link></li>
          <li><Link href="/mindshares" style={{ color: 'rgba(245,242,236,0.55)', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Mindshares</Link></li>
          <li><Link href="/workshops" style={{ color: 'rgba(245,242,236,0.55)', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Workshops</Link></li>
          <li><Link href="/podcasts" style={{ color: 'rgba(245,242,236,0.55)', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Podcasts</Link></li>
          <li><Link href="/vip" style={{ color: 'rgba(245,242,236,0.55)', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Coaching VIP</Link></li>
          <li><Link href="/boutique" style={{ color: 'rgba(245,242,236,0.55)', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Boutique</Link></li>
          <li><Link href="/login" style={{ padding: '0.55rem 1.7rem', border: '1px solid rgba(196,153,58,0.45)', color: '#F1D382', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Connexion</Link></li>
        </ul>
      </nav>

      <main style={{ paddingTop: '18rem', paddingBottom: '8rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', gap: '5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          {/* Left Side: Poster - Fixed Fit */}
          <div style={{ flex: '1', minWidth: '320px', position: 'relative' }}>
            <div style={{ 
              position: 'relative', borderRadius: '4px', overflow: 'hidden', 
              boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(196,153,58,0.1)',
              background: '#000', aspectRatio: '16/9'
            }}>
              <img 
                src={getPosterUrl(webinar.posterFile)} 
                alt={webinar.title}
                onLoad={() => setImgLoaded(true)}
                style={{ 
                  width: '100%', height: '100%', objectFit: 'contain',
                  opacity: imgLoaded ? 1 : 0, transition: 'opacity 1s'
                }}
              />
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', padding: '0.5rem 1rem', background: '#D4AF37', color: '#091209', fontSize: '0.65rem', fontWeight: 'bold', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {webinar.categoryLabel}
              </div>
            </div>
          </div>

          {/* Right Side: Info */}
          <div style={{ flex: '1.2', minWidth: '320px' }}>
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {webinar.tags.map(tag => (
                <span key={tag} style={{ fontSize: '0.6rem', color: '#F1D382', border: '1px solid rgba(212,175,55,0.3)', padding: '0.3rem 0.8rem', borderRadius: '20px', textTransform: 'uppercase' }}>
                  #{tag}
                </span>
              ))}
            </div>

            <h1 style={{ 
              fontSize: '4.5rem', 
              fontWeight: '200', 
              lineHeight: '1', 
              margin: '0 0 2rem', 
              letterSpacing: '-0.02em',
              fontFamily: "'Cormorant Garamond', serif"
            }}>
              {webinar.title}
            </h1>
            
            <p style={{ fontSize: '1.1rem', color: 'rgba(245,242,236,0.7)', lineHeight: '1.7', marginBottom: '3rem', fontWeight: '300' }}>
              {webinar.subtitle}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem', padding: '2.5rem 0', borderTop: '1px solid rgba(196,153,58,0.1)', borderBottom: '1px solid rgba(196,153,58,0.1)' }}>
              <div>
                <p style={{ fontSize: '0.6rem', color: '#D4AF37', letterSpacing: '0.2em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Orateur</p>
                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '300' }}>{webinar.speaker}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(245,242,236,0.4)', fontStyle: 'italic' }}>{webinar.speakerTitle}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.6rem', color: '#D4AF37', letterSpacing: '0.2em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Date & Durée</p>
                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '300' }}>{webinar.date}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(245,242,236,0.4)' }}>{webinar.duration}</p>
              </div>
            </div>

            <button
              onClick={handleJoinClick}
              style={{
                width: '100%', padding: '1.4rem 2rem', background: 'linear-gradient(135deg, #C4993A, #8B6820)',
                border: 'none', color: '#091209', fontSize: '0.85rem', letterSpacing: '0.2em', fontWeight: 'bold',
                borderRadius: '2px', cursor: 'pointer', boxShadow: '0 15px 35px rgba(196,153,58,0.2)', textTransform: 'uppercase'
              }}
            >
              {registered ? '✓ INSCRIT' : 'S\'inscrire à la session'}
            </button>
          </div>
        </div>
      </main>

      <footer style={{ padding: '6rem 4.5rem', borderTop: '1px solid rgba(196,153,58,0.1)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', color: 'rgba(245,242,236,0.3)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          © 2026 Academy • L'Excellence Dentaire
        </p>
      </footer>
    </div>
  );
}
