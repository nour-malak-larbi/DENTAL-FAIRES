'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { workshops, getWorkshopPosterUrl } from '@/lib/workshops-data';

import Navbar from '@/components/Navbar';

export default function WorkshopsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await fetch('/api/workshops');
        const data = await res.json();
        setWorkshops(data);
      } catch (err) {
        console.error('Failed to fetch workshops:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categoryColors: Record<string, string> = {
    chirurgie: '#9B7E2E',
    esthetique: '#C4993A',
    endodontie: '#7A9E7A',
    prothese: '#6B8FA8',
  };

  return (
    <div style={{ backgroundColor: '#091209', minHeight: '100vh', color: 'white', fontFamily: "'Jost', sans-serif" }}>
      {/* Navigation - Standardized to Landing Page */}
      <Navbar />

      {/* Hero Header */}
      <header style={{ padding: '16rem 4.5rem 6rem', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(196,153,58,0.1) 0%, transparent 70%)' }}>
        <p style={{ color: '#D4AF37', letterSpacing: '0.5em', fontSize: '0.65rem', marginBottom: '1.5rem', fontWeight: '600', textTransform: 'uppercase' }}>Masterclasses Pratiques</p>
        <h1 style={{ 
          fontSize: 'clamp(3.5rem, 7vw, 6.5rem)', 
          fontWeight: '200', 
          letterSpacing: '-0.02em', 
          margin: '0 0 2.5rem',
          fontFamily: "'Cormorant Garamond', serif",
          lineHeight: 1
        }}>
          Nos <span style={{ color: '#F1D382', fontStyle: 'italic' }}>Workshops</span>
        </h1>
        <div style={{ width: '60px', height: '1px', background: '#D4AF37', margin: '0 auto 4rem', opacity: 0.6 }}></div>
        <p style={{ maxWidth: '750px', margin: '0 auto', color: 'rgba(245,242,236,0.55)', fontSize: '1.05rem', fontWeight: '300', lineHeight: '1.8' }}>
          Des séries de vidéos intensives pour maîtriser les techniques cliniques les plus avancées, guidées par des experts reconnus mondialement.
        </p>
      </header>

      {/* Grid Content */}
      <main style={{ padding: '0 4.5rem 10rem', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3.5rem' }}>
          {workshops.map((workshop) => (
            <Link 
              href={`/workshops/${workshop.id}`} 
              key={workshop.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
              onMouseEnter={() => setHoveredId(workshop.id)}
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
                transform: hoveredId === workshop.id ? 'translateY(-12px)' : 'none',
                boxShadow: hoveredId === workshop.id ? '0 30px 60px rgba(0,0,0,0.6), 0 0 30px rgba(196,153,58,0.08)' : 'none'
              }}>
                {/* Poster Image Container - "Full" fit */}
                <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#000' }}>
                  <img 
                    src={getWorkshopPosterUrl(workshop.posterFile)} 
                    alt={workshop.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'contain',
                      transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hoveredId === workshop.id ? 'scale(1.05)' : 'scale(1)',
                      opacity: 0.95
                    }}
                  />
                  
                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    padding: '0.4rem 0.8rem', backgroundColor: categoryColors[workshop.category] || '#D4AF37',
                    fontSize: '0.58rem', fontWeight: '600', letterSpacing: '0.15em', color: '#091209',
                    textTransform: 'uppercase'
                  }}>
                    {workshop.categoryLabel}
                  </div>

                  {/* Price Badge */}
                  <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    padding: '0.4rem 0.8rem', background: 'rgba(9,18,9,0.9)', backdropFilter: 'blur(10px)',
                    border: '1px solid #D4AF37', color: '#F1D382',
                    fontSize: '0.8rem', fontWeight: '700', borderRadius: '2px'
                  }}>
                    {workshop.price}
                  </div>
                </div>

                {/* Info Content */}
                <div style={{ padding: '2.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '0.65rem', color: 'rgba(245,242,236,0.35)', letterSpacing: '0.1em' }}>{workshop.duration}</span>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(196,153,58,0.3)' }}></div>
                      <span style={{ fontSize: '0.62rem', color: '#D4AF37', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{workshop.level}</span>
                    </div>
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
                    {workshop.title}
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
                    {workshop.description}
                  </p>
                  
                  <div style={{ 
                    marginTop: 'auto',
                    paddingTop: '1.8rem', 
                    borderTop: '1px solid rgba(196,153,58,0.08)',
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <span style={{ fontSize: '0.62rem', color: 'rgba(245,242,236,0.3)', letterSpacing: '0.2em', fontWeight: '500' }}>
                      {workshop.curriculum.length} MODULES VIDÉO
                    </span>
                    
                    <div style={{ color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', fontWeight: '600' }}>DÉCOUVRIR</span>
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
