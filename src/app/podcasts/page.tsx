'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const UPCOMING = [
  { id: 2, title: "L'art de la communication avec les patients anxieux", guest: "Dr. Lilia K.", role: "Pédodontiste", date: "Bientôt" },
  { id: 3, title: "Gestion du stress et burnout en cabinet dentaire", guest: "Dr. Mehdi B.", role: "Coach & Dentiste", date: "Bientôt" },
  { id: 4, title: "L'ère du numérique : de l'empreinte au design", guest: "Dr. Sonia T.", role: "Prothésiste", date: "Bientôt" },
];

export default function PodcastsPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#0A0F0A', minHeight: '100vh', color: 'white', fontFamily: "var(--font-inter), sans-serif" }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        padding: isScrolled ? '0.5rem 4.5rem' : '1rem 4.5rem',
        backgroundColor: isScrolled ? 'rgba(10, 15, 10, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: isScrolled ? '1px solid rgba(196, 153, 58, 0.15)' : '1px solid transparent'
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/logo-transparent.png" 
              alt="Dental Fairies" 
              style={{ 
                height: isScrolled ? '120px' : '180px', 
                width: 'auto', 
                margin: isScrolled ? '-40px 0' : '-65px 0',
                filter: 'drop-shadow(0 0 20px rgba(196,153,58,0.4))',
                transition: 'all 0.5s ease'
              }} 
            />
          </div>
        </Link>
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
          <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: '500' }}>ACCUEIL</Link></li>
          <li><Link href="/webinaires" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: '500' }}>WEBINAIRES</Link></li>
          <li><Link href="/mindshares" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: '500' }}>MINDSHARES</Link></li>
          <li><Link href="/workshops" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: '500' }}>WORKSHOPS</Link></li>
          <li><Link href="/podcasts" style={{ color: '#C4993A', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: '600' }}>PODCASTS</Link></li>
          <li><Link href="/vip" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: '500' }}>COACHING VIP</Link></li>
          <li><Link href="/boutique" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: '500' }}>BOUTIQUE</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '14rem 4.5rem 6rem', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(196,153,58,0.1) 0%, transparent 70%)' }}>
        <p style={{ color: '#C4993A', letterSpacing: '0.5em', fontSize: '0.75rem', marginBottom: '1.5rem', fontWeight: '600' }}>ÉCOUTEZ L'EXCELLENCE</p>
        <h1 style={{ 
          fontSize: 'clamp(3.5rem, 8vw, 7rem)', 
          fontWeight: '200', 
          letterSpacing: '-0.03em', 
          margin: '0 0 2.5rem',
          fontFamily: "'Cormorant Garamond', serif",
          lineHeight: 1
        }}>
          Nos <span style={{ color: '#C4993A', fontStyle: 'italic' }}>Podcasts</span>
        </h1>
        <div style={{ width: '60px', height: '1px', background: '#C4993A', margin: '0 auto 3rem', opacity: 0.6 }}></div>
        
        {/* Main Episode Embed */}
        <div style={{ maxWidth: '900px', margin: '0 auto', background: '#0D140D', border: '1px solid rgba(196,153,58,0.25)', padding: '2.5rem', borderRadius: '4px', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
          <iframe 
            style={{ borderRadius: '4px' }} 
            src="https://open.spotify.com/embed/episode/19iZFMCM4NUcZVKvskBOki?utm_source=generator&theme=0" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowFullScreen={true} 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Upcoming Episodes */}
      <section style={{ padding: '6rem 4.5rem 12rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '200', 
            letterSpacing: '0.05em', 
            marginBottom: '5rem', 
            textAlign: 'center',
            fontFamily: "'Cormorant Garamond', serif"
          }}>PROCHAINS ÉPISODES</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3rem' }}>
            {UPCOMING.map(episode => (
              <div key={episode.id} style={{ 
                padding: '3rem', 
                background: '#0D140D', 
                border: '1px solid rgba(196,153,58,0.1)', 
                position: 'relative',
                transition: 'all 0.4s ease',
                cursor: 'default'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.25em', fontWeight: '700' }}>ÉPISODE 0{episode.id}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(196,153,58,0.4)' }}></div>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{episode.date}</span>
                  </div>
                </div>
                <h4 style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: '300', 
                  margin: '0 0 1.5rem', 
                  lineHeight: '1.4',
                  fontFamily: "'Cormorant Garamond', serif",
                  color: '#F5F2EC'
                }}>{episode.title}</h4>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginTop: '2.5rem', padding: '1rem', background: 'rgba(196,153,58,0.03)', border: '1px solid rgba(196,153,58,0.08)' }}>
                  <div style={{ 
                    width: '45px', height: '45px', borderRadius: '50%', 
                    background: 'rgba(196,153,58,0.1)', border: '1px solid rgba(196,153,58,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span style={{ color: '#C4993A', fontSize: '0.9rem' }}>{episode.guest[0]}</span>
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#F5F2EC', fontWeight: '500' }}>{episode.guest}</p>
                    <p style={{ margin: 0, fontSize: '0.65rem', color: 'rgba(196,153,58,0.7)', fontStyle: 'italic' }}>{episode.role}</p>
                  </div>
                </div>
                
                <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'rgba(196,153,58,0.4)' }}>
                   <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid currentColor', borderTopColor: 'transparent', animation: 'spin 1.5s linear infinite' }}></div>
                  <span style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.15em' }}>EN PRODUCTION</span>
                </div>
                
                <style>{`
                  @keyframes spin { to { transform: rotate(360deg); } }
                `}</style>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ padding: '6rem 4.5rem', borderTop: '1px solid rgba(196,153,58,0.1)', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
        <img src="/logo-transparent.png" alt="Footer Logo" style={{ height: '100px', width: 'auto', marginBottom: '2rem', opacity: 0.4, filter: 'grayscale(1)' }} />
        <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.3em', fontWeight: '400' }}>
          DENTAL · FAIRIES · ACADEMY
        </p>
        <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em', marginTop: '1rem' }}>
          © 2026 L'EXCELLENCE DENTAIRE RÉINVENTÉE
        </p>
      </footer>
    </div>
  );
}
