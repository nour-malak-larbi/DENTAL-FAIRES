'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { webinars, getPosterUrl } from '@/lib/webinairs-data';

const ALL_CATEGORIES = [
  { value: 'all', label: 'Tous' },
  { value: 'debat', label: 'Débats & Éthique' },
  { value: 'masterclass', label: 'Masterclass' },
  { value: 'clinique', label: 'Cas Clinique' },
  { value: 'technique', label: 'Technique' },
];

import Navbar from '@/components/Navbar';

export default function WebinairesPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [webinars, setWebinars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navLinkStyle: React.CSSProperties = {
    color: 'rgba(245,242,236,0.6)',
    textDecoration: 'none',
    fontSize: '0.68rem',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    fontWeight: 500
  };

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const res = await fetch('/api/webinars');
        const data = await res.json();
        setWebinars(data);
      } catch (err) {
        console.error('Failed to fetch webinars:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWebinars();

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredWebinars = activeCategory === 'all' 
    ? webinars 
    : webinars.filter(w => w.category === activeCategory);

  const categoryColors: Record<string, string> = {
    debat:      '#9B7E2E',
    masterclass:'#C4993A',
    clinique:   '#7A9E7A',
    technique:  '#6B8FA8',
  };

  return (
    <div style={{ backgroundColor: '#091209', minHeight: '100vh', color: 'white', fontFamily: "'Jost', sans-serif" }}>
      {/* Navigation - Standardized to Landing Page */}
      <Navbar />

      {/* Hero Header */}
      <header style={{ padding: 'clamp(8.5rem, 16vw, 16rem) clamp(1rem, 4vw, 4.5rem) 6rem', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(196,153,58,0.1) 0%, transparent 70%)' }}>
        <p style={{ color: '#D4AF37', letterSpacing: '0.5em', fontSize: '0.65rem', marginBottom: '1.5rem', fontWeight: '600', textTransform: 'uppercase' }}>Formation Continue</p>
        <h1 style={{ 
          fontSize: 'clamp(3.5rem, 7vw, 6.5rem)', 
          fontWeight: '200', 
          letterSpacing: '-0.02em', 
          margin: '0 0 2.5rem',
          fontFamily: "'Cormorant Garamond', serif",
          lineHeight: 1
        }}>
          Nos <span style={{ color: '#F1D382', fontStyle: 'italic' }}>Webinaires</span>
        </h1>
        <div style={{ width: '60px', height: '1px', background: '#D4AF37', margin: '0 auto 4rem', opacity: 0.6 }}></div>

        {/* Categories Filter */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              style={{
                background: 'none', border: 'none', color: activeCategory === cat.value ? '#F1D382' : 'rgba(245,242,236,0.3)',
                fontSize: '0.7rem', letterSpacing: '0.22em', cursor: 'pointer', padding: '0.6rem 0',
                borderBottom: activeCategory === cat.value ? '1px solid #D4AF37' : '1px solid transparent',
                transition: 'all 0.4s ease',
                textTransform: 'uppercase'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Grid Content */}
      <main style={{ padding: '0 clamp(1rem, 4vw, 4.5rem) 10rem', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(1.25rem, 2.8vw, 3.5rem)' }}>
          {filteredWebinars.map((webinar) => (
            <Link 
              href={`/webinaires/${webinar.id}`} 
              key={webinar.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
              onMouseEnter={() => setHoveredId(webinar.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <article style={{
                position: 'relative', 
                background: '#0D1A0D', 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(196,153,58,0.12)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hoveredId === webinar.id ? 'translateY(-12px)' : 'none',
                boxShadow: hoveredId === webinar.id ? '0 30px 60px rgba(0,0,0,0.6), 0 0 30px rgba(196,153,58,0.08)' : 'none'
              }}>
                {/* Poster Image Container - Ratio updated for "full" posters */}
                <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#000' }}>
                  <img 
                    src={getPosterUrl(webinar.posterFile)} 
                    alt={webinar.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hoveredId === webinar.id ? 'scale(1.05)' : 'scale(1)',
                      opacity: 0.95
                    }}
                  />
                  
                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    padding: '0.4rem 0.8rem', backgroundColor: categoryColors[webinar.category] || '#D4AF37',
                    fontSize: '0.58rem', fontWeight: '600', letterSpacing: '0.15em', color: '#091209',
                    textTransform: 'uppercase'
                  }}>
                    {webinar.categoryLabel}
                  </div>
                </div>

                {/* Info Content */}
                <div style={{ padding: 'clamp(1.1rem, 3vw, 2.5rem)', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.6rem', color: 'rgba(196,153,58,0.4)', letterSpacing: '0.2em' }}>#{String(webinar.id).padStart(4, '0')}</span>
                    <span style={{ fontSize: '0.62rem', color: 'rgba(245,242,236,0.3)', letterSpacing: '0.1em' }}>{webinar.date}</span>
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.45rem', 
                    fontWeight: '300', 
                    margin: '0 0 1.2rem', 
                    lineHeight: '1.2',
                    fontFamily: "'Cormorant Garamond', serif",
                    color: '#F5F2EC',
                    minHeight: '3.3rem',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {webinar.title}
                  </h3>
                  
                  <p style={{ 
                    fontSize: '0.8rem', 
                    color: 'rgba(245,242,236,0.5)', 
                    lineHeight: '1.65',
                    marginBottom: '2rem',
                    fontWeight: '200',
                    minHeight: '4rem',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {webinar.description}
                  </p>
                  
                  <div style={{ 
                    marginTop: 'auto',
                    paddingTop: '1.8rem', 
                    borderTop: '1px solid rgba(196,153,58,0.08)',
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(196,153,58,0.1)', border: '1px solid rgba(196,153,58,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#D4AF37' }}>
                        {webinar.speaker[0]}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(245,242,236,0.7)', fontWeight: '300' }}>{webinar.speaker}</span>
                    </div>
                    
                    <div style={{ color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', fontWeight: '600' }}>VOIR</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14m-7-7 7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer - Standardized */}
      <footer style={{ padding: '6rem clamp(1rem, 4vw, 4.5rem)', borderTop: '1px solid rgba(196,153,58,0.1)', textAlign: 'center', background: 'rgba(8,14,8,0.4)' }}>
        <img src="/logo-transparent.png" alt="Logo" style={{ height: '80px', width: 'auto', marginBottom: '2rem', opacity: 0.3, filter: 'grayscale(1)' }} />
        <p style={{ fontSize: '0.65rem', color: 'rgba(245,242,236,0.3)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          © 2026 Academy • L'Excellence Dentaire
        </p>
        <p style={{ fontSize: '0.55rem', color: 'rgba(245,242,236,0.15)', letterSpacing: '0.1em' }}>
          FORMATION · COACHING · COMMUNAUTÉ
        </p>
      </footer>
      <style>{`
        @media (max-width: 1100px) {
          nav ul li a {
            font-size: 0.62rem !important;
            letter-spacing: 0.14em !important;
          }
        }

        @media (max-width: 900px) {
          nav {
            align-items: flex-start !important;
            gap: 0.6rem;
          }
          nav ul {
            width: 100%;
            justify-content: flex-start !important;
            row-gap: 0.55rem;
          }
        }
      `}</style>
    </div>
  );
}
