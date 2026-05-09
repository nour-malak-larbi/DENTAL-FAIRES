'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const OFFERS = [
  {
    id: 'essentiel',
    label: 'Essentiel',
    price: '490',
    period: '/ mois',
    highlight: false,
    features: [
      'Accès à tous les webinaires',
      'Supports de cours PDF',
      'Accès aux Mindshares Premium',
      'Newsletter bimensuelle'
    ]
  },
  {
    id: 'elite',
    label: 'Élite',
    price: '890',
    period: '/ mois',
    highlight: true,
    features: [
      'Tout le forfait Essentiel',
      'Accès prioritaire aux Workshops',
      'Q&A mensuel avec les speakers',
      'Coaching de groupe (1h/mois)',
      'Certificats de formation'
    ]
  },
  {
    id: 'prestige',
    label: 'Prestige',
    price: '1 490',
    period: '/ mois',
    highlight: false,
    features: [
      'Tout le forfait Élite',
      'Coaching individuel (1h/mois)',
      'Audit de cabinet personnalisé',
      'Accès VIP aux événements physiques',
      'Ligne directe conciergerie'
    ]
  }
];

export default function VipPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#091209', minHeight: '100vh', color: 'white', fontFamily: "var(--font-inter), sans-serif" }}>
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
          <li><Link href="/podcasts" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: '500' }}>PODCASTS</Link></li>
          <li><Link href="/vip" style={{ color: '#C4993A', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: '600' }}>COACHING VIP</Link></li>
          <li><Link href="/boutique" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: '500' }}>BOUTIQUE</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(196,153,58,0.12) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, padding: '0 4.5rem' }}>
          <p style={{ color: '#C4993A', letterSpacing: '0.6em', fontSize: '0.8rem', marginBottom: '2rem', fontWeight: '600' }}>PROGRAMME D'ACCOMPAGNEMENT</p>
          <h1 style={{ 
            fontSize: 'clamp(3.5rem, 9vw, 8rem)', 
            fontWeight: '200', 
            letterSpacing: '-0.04em', 
            margin: '0 0 3rem', 
            lineHeight: '0.9',
            fontFamily: "'Cormorant Garamond', serif"
          }}>
            Coaching <span style={{ color: '#C4993A', fontStyle: 'italic' }}>VIP</span>
          </h1>
          <p style={{ maxWidth: '800px', margin: '0 auto 4.5rem', fontSize: '1.2rem', color: 'rgba(245,242,236,0.6)', fontWeight: '300', lineHeight: '1.8' }}>
            Propulsez votre pratique vers l'excellence. Un accompagnement sur-mesure conçu pour les chirurgiens-dentistes qui ne font aucun compromis sur la qualité.
          </p>
          
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <a href="#offres" style={{ 
              padding: '1.4rem 3.5rem', 
              background: 'linear-gradient(135deg, #C4993A, #8B6820)', 
              color: 'white', 
              textDecoration: 'none', 
              fontWeight: '700', 
              fontSize: '0.75rem', 
              letterSpacing: '0.25em', 
              borderRadius: '2px', 
              boxShadow: '0 15px 40px rgba(196,153,58,0.25)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>VOIR LES OFFRES</a>
            <button style={{ 
              padding: '1.4rem 3.5rem', 
              background: 'none', 
              border: '1px solid rgba(255,255,255,0.2)', 
              color: 'white', 
              fontWeight: '700', 
              fontSize: '0.75rem', 
              letterSpacing: '0.25em', 
              borderRadius: '2px', 
              cursor: 'pointer',
              transition: 'all 0.4s'
            }}>NOUS CONTACTER</button>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ 
          marginTop: '6rem',
          display: 'flex', gap: '6rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', width: '100%',
          position: 'relative', zIndex: 1
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: '200', color: '#C4993A', fontFamily: "'Cormorant Garamond', serif" }}>98%</p>
            <p style={{ margin: 0, fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.25em', fontWeight: '600' }}>SATISFACTION</p>
          </div>
          <div style={{ width: '1px', height: '30px', background: 'rgba(196,153,58,0.15)' }}></div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: '200', color: '#C4993A', fontFamily: "'Cormorant Garamond', serif" }}>3×</p>
            <p style={{ margin: 0, fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.25em', fontWeight: '600' }}>ROI MOYEN</p>
          </div>
          <div style={{ width: '1px', height: '30px', background: 'rgba(196,153,58,0.15)' }}></div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: '200', color: '#C4993A', fontFamily: "'Cormorant Garamond', serif" }}>120+</p>
            <p style={{ margin: 0, fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.25em', fontWeight: '600' }}>PRATICIENS</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="offres" style={{ padding: '10rem 4.5rem', backgroundColor: '#0D140D', position: 'relative' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '7rem' }}>
            <p style={{ color: '#C4993A', letterSpacing: '0.4em', fontSize: '0.75rem', marginBottom: '1.5rem', fontWeight: '600' }}>INVESTISSEMENT</p>
            <h2 style={{ fontSize: '3rem', fontWeight: '200', letterSpacing: '0.05em', marginBottom: '2rem', fontFamily: "'Cormorant Garamond', serif" }}>Nos Formules</h2>
            <div style={{ width: '60px', height: '1px', background: '#C4993A', margin: '0 auto', opacity: 0.5 }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3rem' }}>
            {OFFERS.map(offer => (
              <div key={offer.id} style={{
                padding: '4.5rem 3.5rem',
                background: offer.highlight ? 'rgba(196,153,58,0.03)' : 'rgba(255,255,255,0.01)',
                border: offer.highlight ? '1px solid #C4993A' : '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
                display: 'flex', flexDirection: 'column',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: offer.highlight ? '0 30px 60px rgba(0,0,0,0.5), 0 0 20px rgba(196,153,58,0.05)' : 'none'
              }}>
                {offer.highlight && (
                  <div style={{ 
                    position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', 
                    background: '#C4993A', color: '#0A0F0A', padding: '0.5rem 1.5rem', 
                    fontSize: '0.65rem', fontWeight: '800', letterSpacing: '0.2em' 
                  }}>POPULAIRE</div>
                )}
                
                <h3 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '300', 
                  marginBottom: '1.5rem', 
                  letterSpacing: '0.1em',
                  fontFamily: "'Cormorant Garamond', serif" 
                }}>{offer.label}</h3>
                <div style={{ marginBottom: '3.5rem', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span style={{ fontSize: '3rem', fontWeight: '200', color: offer.highlight ? '#C4993A' : '#F5F2EC' }}>{offer.price} €</span>
                  <span style={{ color: 'rgba(245,242,236,0.4)', fontSize: '1rem', fontWeight: '300' }}>{offer.period}</span>
                </div>

                <div style={{ width: '100%', height: '1px', background: 'rgba(196,153,58,0.1)', marginBottom: '3.5rem' }}></div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 4.5rem', flex: 1 }}>
                  {offer.features.map((feature, i) => (
                    <li key={i} style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', marginBottom: '1.5rem', fontSize: '0.95rem', color: 'rgba(245,242,236,0.65)', fontWeight: '300', lineHeight: '1.4' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4993A" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button style={{
                  padding: '1.4rem',
                  background: offer.highlight ? '#C4993A' : 'transparent',
                  border: offer.highlight ? 'none' : '1px solid rgba(255,255,255,0.15)',
                  color: offer.highlight ? '#0A0F0A' : '#F5F2EC',
                  fontWeight: '800', fontSize: '0.75rem', letterSpacing: '0.25em', cursor: 'pointer',
                  transition: 'all 0.4s'
                }}>CHOISIR CE FORFAIT</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ/Contact CTA */}
      <section style={{ padding: '12rem 4.5rem', textAlign: 'center', background: 'radial-gradient(circle at 50% 100%, rgba(196,153,58,0.08) 0%, transparent 70%)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '50%', border: '1px solid rgba(196,153,58,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C4993A" strokeWidth="1">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h2 style={{ fontSize: '3rem', fontWeight: '200', letterSpacing: '0.05em', fontFamily: "'Cormorant Garamond', serif" }}>Prêt à Franchir le Cap ?</h2>
          </div>
          <p style={{ color: 'rgba(245,242,236,0.5)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '5rem', fontWeight: '300' }}>
            Chaque praticien est unique. Si vous avez des besoins spécifiques ou si vous souhaitez une démonstration personnalisée de nos services VIP, notre équipe est à votre écoute pour concevoir la stratégie adaptée à votre vision.
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <button style={{ 
              padding: '1.2rem 3.5rem', 
              background: 'none', 
              border: '1px solid #C4993A', 
              color: '#C4993A', 
              fontWeight: '700', 
              fontSize: '0.75rem', 
              letterSpacing: '0.2em', 
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>RÉSERVER UN APPEL</button>
            <button style={{ 
              padding: '1.2rem 3.5rem', 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              color: 'white', 
              fontWeight: '700', 
              fontSize: '0.75rem', 
              letterSpacing: '0.2em', 
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>TÉLÉCHARGER LA BROCHURE</button>
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
