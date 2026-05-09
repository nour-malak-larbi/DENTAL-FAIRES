'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { mindshares, getPosterUrl } from '@/lib/mindshares-data';

const ALL_CATEGORIES = [
  { value: 'all', label: 'Tous' },
  { value: 'clinique', label: 'Cas Clinique' },
  { value: 'innovation', label: 'Innovation' },
  { value: 'bien-etre', label: 'Bien-être' },
  { value: 'bonne-pratique', label: 'Bonne Pratique' },
];

import Navbar from '@/components/Navbar';

export default function MindsharesPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mindshares, setMindshares] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMindshares = async () => {
      try {
        const res = await fetch('/api/mindshares');
        const data = await res.json();
        setMindshares(data);
      } catch (err) {
        console.error('Failed to fetch mindshares:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMindshares();

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredMindshares = activeCategory === 'all' 
    ? mindshares 
    : mindshares.filter(m => m.category === activeCategory);

  const categoryColors: Record<string, string> = {
    clinique: '#7A9E7A',
    innovation: '#C4993A',
    'bien-etre': '#6B8FA8',
    'bonne-pratique': '#9B7E2E',
  };

  return (
    <div style={{ backgroundColor: '#091209', minHeight: '100vh', color: 'white', fontFamily: "'Jost', sans-serif" }}>
      {/* Navigation - Standardized to Landing Page */}
      <Navbar />

      {/* Hero Header */}
      <header style={{ padding: '16rem 4.5rem 6rem', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(196,153,58,0.1) 0%, transparent 70%)' }}>
        <p style={{ color: '#D4AF37', letterSpacing: '0.5em', fontSize: '0.65rem', marginBottom: '1.5rem', fontWeight: '600', textTransform: 'uppercase' }}>Réflexions & Partages</p>
        <h1 style={{ 
          fontSize: 'clamp(3.5rem, 7vw, 6.5rem)', 
          fontWeight: '200', 
          letterSpacing: '-0.02em', 
          margin: '0 0 2.5rem',
          fontFamily: "'Cormorant Garamond', serif",
          lineHeight: 1
        }}>
          Nos <span style={{ color: '#F1D382', fontStyle: 'italic' }}>Mindshares</span>
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
      <main style={{ padding: '0 4.5rem 10rem', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3.5rem' }}>
          {filteredMindshares.map((mindshare) => (
            <Link 
              href={`/mindshares/${mindshare.id}`} 
              key={mindshare.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
              onMouseEnter={() => setHoveredId(mindshare.id)}
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
                transform: hoveredId === mindshare.id ? 'translateY(-12px)' : 'none',
                boxShadow: hoveredId === mindshare.id ? '0 30px 60px rgba(0,0,0,0.6), 0 0 30px rgba(196,153,58,0.08)' : 'none'
              }}>
                {/* Poster Image Container */}
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#000' }}>
                  <img 
                    src={getPosterUrl(mindshare.posterFile)} 
                    alt={mindshare.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'contain',
                      transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hoveredId === mindshare.id ? 'scale(1.05)' : 'scale(1)',
                      opacity: 0.95
                    }}
                  />
                  
                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    padding: '0.4rem 0.8rem', backgroundColor: categoryColors[mindshare.category] || '#D4AF37',
                    fontSize: '0.58rem', fontWeight: '600', letterSpacing: '0.15em', color: '#091209',
                    textTransform: 'uppercase'
                  }}>
                    {mindshare.categoryLabel}
                  </div>
                </div>

                {/* Info Content */}
                <div style={{ padding: '2.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.6rem', color: 'rgba(196,153,58,0.4)', letterSpacing: '0.2em' }}>ARTICLE #{mindshare.id}</span>
                    <span style={{ fontSize: '0.62rem', color: 'rgba(245,242,236,0.3)', letterSpacing: '0.1em' }}>{mindshare.date}</span>
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.6rem', 
                    fontWeight: '300', 
                    margin: '0 0 1.2rem', 
                    lineHeight: '1.2',
                    fontFamily: "'Cormorant Garamond', serif",
                    color: '#F5F2EC',
                    height: '3.8rem',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {mindshare.title}
                  </h3>
                  
                  <p style={{ 
                    fontSize: '0.85rem', 
                    color: 'rgba(245,242,236,0.5)', 
                    lineHeight: '1.7',
                    marginBottom: '2rem',
                    height: '5.8rem',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    fontWeight: '200'
                  }}>
                    {mindshare.excerpt}
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
                        {mindshare.author[0]}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(245,242,236,0.7)', fontWeight: '300' }}>{mindshare.author}</span>
                    </div>
                    
                    <div style={{ color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', fontWeight: '600' }}>LIRE</span>
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
      <footer style={{ padding: '6rem 4.5rem', borderTop: '1px solid rgba(196,153,58,0.1)', textAlign: 'center', background: 'rgba(8,14,8,0.4)' }}>
        <img src="/logo-transparent.png" alt="Logo" style={{ height: '80px', width: 'auto', marginBottom: '2rem', opacity: 0.3, filter: 'grayscale(1)' }} />
        <p style={{ fontSize: '0.65rem', color: 'rgba(245,242,236,0.3)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          © 2026 Academy • L'Excellence Dentaire
        </p>
        <p style={{ fontSize: '0.55rem', color: 'rgba(245,242,236,0.15)', letterSpacing: '0.1em' }}>
          FORMATION · COACHING · COMMUNAUTÉ
        </p>
      </footer>
    </div>
  );
}
