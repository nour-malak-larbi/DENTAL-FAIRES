'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { workshops, getWorkshopById, getWorkshopPosterUrl } from '@/lib/workshops-data';
import { Workshop } from '@/lib/workshops-data';

export default function WorkshopDetailPage({ params }: { params: { id: string } }) {
  const [hasAccess, setHasAccess] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const [purchaseStatus, setPurchaseStatus] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [workshop, setWorkshop] = useState<any>(null);
  const [purchased, setPurchased] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    // Fetch workshop data from the database
    const fetchWorkshop = async () => {
      try {
        const res = await fetch(`/api/workshops/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setWorkshop(data);
        } else {
          // Fallback to static if not found or error
          const fetchedWorkshop = getWorkshopById(Number(params.id));
          setWorkshop(fetchedWorkshop);
        }
      } catch (err) {
        console.error('Failed to fetch workshop:', err);
        const fetchedWorkshop = getWorkshopById(Number(params.id));
        setWorkshop(fetchedWorkshop);
      }
    };
    fetchWorkshop();
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
          // Check access to this workshop
          if (workshop) {
            fetch('/api/access/check', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                productType: 'workshop',
                productId: workshop.id
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
  }, [workshop]);

  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const receipt = formData.get('receipt') as File;

    if (!email || !receipt) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const paymentData = new FormData();
    paymentData.append('email', email);
    paymentData.append('receipt', receipt);
    paymentData.append('productType', 'workshop');
    paymentData.append('productId', workshop.id);

    try {
      const response = await fetch('/api/confirm-payment', {
        method: 'POST',
        body: paymentData
      });

      if (response.ok) {
        alert('Reçu envoyé ! Notre équipe validera votre accès sous 24h.');
        setPurchased(false);
        // Refresh access status
        window.location.reload();
      } else {
        alert('Erreur lors de l\'envoi du reçu. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Payment submission error:', error);
      alert('Erreur lors de l\'envoi du reçu. Veuillez réessayer.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') + ' ' + formData.get('prenom');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsConnected(true);
        setShowRegModal(false);
        setPurchased(true);
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    }
  };

  // Update the workshop variable to use the Workshop type
  if (!workshop) {
    return (
      <div style={{ backgroundColor: '#091209', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'var(--font-inter), sans-serif' }}>
        <p>Workshop non trouvé (ID: {params.id})</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#091209', minHeight: '100vh', color: 'white', fontFamily: "'Jost', sans-serif" }}>
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
          <li><Link href="/workshops" style={{ color: '#C4993A', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: '600' }}>WORKSHOPS</Link></li>
          <li><Link href="/podcasts" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: '500' }}>PODCASTS</Link></li>
          <li><Link href="/vip" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: '500' }}>COACHING VIP</Link></li>
          <li><Link href="/boutique" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: '500' }}>BOUTIQUE</Link></li>
        </ul>
      </nav>

      <main style={{ paddingTop: '14rem', paddingBottom: '8rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', gap: '5rem', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '8rem' }}>
            {/* Left Side: Poster */}
            <div style={{ flex: '1', minWidth: '320px' }}>
              <div style={{ 
                position: 'relative', borderRadius: '4px', overflow: 'hidden', 
                boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(196,153,58,0.1)',
                background: '#0D140D', aspectRatio: '1/1'
              }}>
                <img 
                  src={getWorkshopPosterUrl(workshop.posterFile)} 
                  alt={workshop.title}
                  onLoad={() => setImgLoaded(true)}
                  style={{ 
                    width: '100%', height: '100%', objectFit: 'cover',
                    opacity: imgLoaded ? 1 : 0, transition: 'opacity 1s'
                  }}
                />
              </div>
            </div>

            {/* Right Side: Info */}
            <div style={{ flex: '1.2', minWidth: '320px' }}>
              <p style={{ color: '#C4993A', letterSpacing: '0.4em', fontSize: '0.75rem', marginBottom: '1.5rem', fontWeight: '600' }}>
                {workshop.categoryLabel.toUpperCase()}
              </p>
              <h1 style={{ 
                fontSize: '4.2rem', 
                fontWeight: '200', 
                lineHeight: '1', 
                margin: '0 0 2rem', 
                letterSpacing: '-0.02em',
                fontFamily: "var(--font-cormorant), serif"
              }}>
                {workshop.title}
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '3rem', fontWeight: '300' }}>
                {workshop.subtitle}
              </p>

              {/* Meta Grid */}
              <div style={{ 
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem', 
                padding: '2.5rem 0', borderTop: '1px solid rgba(196,153,58,0.1)', borderBottom: '1px solid rgba(196,153,58,0.1)',
                marginBottom: '4rem'
              }}>
                <div>
                  <p style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em', margin: '0 0 0.6rem', fontWeight: '600' }}>INSTRUCTEUR</p>
                  <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '400' }}>{workshop.instructor}</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>{workshop.instructorTitle}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em', margin: '0 0 0.6rem', fontWeight: '600' }}>DURÉE ESTIMÉE</p>
                  <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '400' }}>{workshop.duration}</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Accès illimité</p>
                </div>
              </div>

              {/* CTA Area */}
              <div>
                {!isConnected ? (
                  <button
                    onClick={() => setShowRegModal(true)}
                    style={{
                      padding: '1.4rem 3rem', background: 'linear-gradient(135deg, #C4993A, #8B6820)',
                      border: 'none', color: 'white', fontSize: '0.9rem', letterSpacing: '0.2em', fontWeight: 'bold', borderRadius: '2px', cursor: 'pointer',
                      boxShadow: '0 15px 35px rgba(196,153,58,0.2)', transition: 'all 0.3s'
                    }}
                  >
                    S'INSCRIRE POUR ACCÉDER
                  </button>
                ) : hasAccess ? (
                  <div style={{ padding: '2.5rem', background: 'rgba(196,153,58,0.05)', border: '1px solid rgba(196,153,58,0.2)' }}>
                    <p style={{ color: '#C4993A', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>✓ VOUS AVEZ ACCÈS À CE WORKSHOP</p>
                    {meetLink ? (
                      <a href={meetLink} target="_blank" rel="noopener noreferrer" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '1.2rem 2rem', background: '#C4993A', color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.15em', transition: 'all 0.3s'
                      }}>
                        🎥 REJOINDRE LA SÉANCE
                      </a>
                    ) : (
                      <a href="#curriculum" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '1.2rem 2rem', background: '#C4993A', color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.15em', transition: 'all 0.3s'
                      }}>
                        🎥 COMMENCER LE CURRICULUM
                      </a>
                    )}
                  </div>
                ) : purchaseStatus === 'pending' ? (
                  <div style={{ padding: '2.5rem', background: 'rgba(255,165,0,0.05)', border: '1px solid rgba(255,165,0,0.2)' }}>
                    <p style={{ color: '#FFA500', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>⏳ PAIEMENT EN COURS DE VALIDATION</p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                      Votre reçu a été envoyé. L'équipe administrative validera votre paiement sous 24h.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setPurchased(true)}
                    style={{
                      padding: '1.4rem 3rem', background: 'linear-gradient(135deg, #C4993A, #8B6820)',
                      border: 'none', color: 'white', fontSize: '0.9rem', letterSpacing: '0.2em', fontWeight: 'bold', borderRadius: '2px', cursor: 'pointer',
                      boxShadow: '0 15px 35px rgba(196,153,58,0.2)', transition: 'all 0.3s'
                    }}
                  >
                    PROCÉDER AU PAIEMENT — {workshop.price}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Extended Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '8rem', marginBottom: '10rem' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '200', marginBottom: '2.5rem', letterSpacing: '0.1em', fontFamily: 'var(--font-cormorant)' }}>À PROPOS DU WORKSHOP</h2>
              <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '1.1rem', fontWeight: '300' }}>
                {workshop.description.split('\n\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: '1.5rem' }}>{para}</p>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '200', marginBottom: '2.5rem', letterSpacing: '0.1em', fontFamily: 'var(--font-cormorant)' }}>OBJECTIFS PÉDAGOGIQUES</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {workshop.objectives.map((obj, i) => (
                  <li key={i} style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: '1.5' }}>
                    <span style={{ color: '#C4993A', fontWeight: 'bold' }}>0{i+1}</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Curriculum Section */}
          <section id="curriculum" style={{ borderTop: '1px solid rgba(196,153,58,0.1)', paddingTop: '6rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '200', marginBottom: '4rem', letterSpacing: '0.1em', fontFamily: 'var(--font-cormorant)' }}>PROGRAMME DU WORKSHOP</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2.5rem' }}>
              {workshop.curriculum.map((module, idx) => (
                <div key={idx} style={{ background: '#0D140D', border: '1px solid rgba(255,255,255,0.05)', padding: '2.5rem', transition: 'all 0.3s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em', fontWeight: '600' }}>MODULE {idx + 1}</span>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>{module.duration}</span>
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '400', margin: '0 0 1.2rem', fontFamily: 'var(--font-cormorant)' }}>{module.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6', marginBottom: '2rem', fontWeight: '300' }}>{module.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: module.locked ? 'rgba(255,255,255,0.2)' : '#C4993A' }}>
                    {module.locked ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    )}
                    <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 'bold' }}>{module.locked ? 'VERROUILLÉ' : 'REGARDER'}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Registration Modal */}
      {showRegModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(15px)' }}>
          <div style={{ background: '#0D140D', border: '1px solid #C4993A', padding: 'clamp(1.4rem, 4vw, 2.2rem)', width: '95%', maxWidth: '430px', position: 'relative' }}>
            <button onClick={() => setShowRegModal(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', color: '#C4993A', marginBottom: '0.9rem', textAlign: 'center' }}>Rejoindre l'Académie</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '1.7rem', textAlign: 'center' }}>Inscrivez-vous pour accéder à nos workshops certifiants.</p>
            
            <form onSubmit={handleRegister}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.15em', marginBottom: '0.6rem' }}>NOM</label>
                  <input name="name" type="text" required style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,153,58,0.3)', padding: '1rem', color: 'white', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.15em', marginBottom: '0.6rem' }}>PRÉNOM</label>
                  <input name="prenom" type="text" required style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,153,58,0.3)', padding: '1rem', color: 'white', outline: 'none' }} />
                </div>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.15em', marginBottom: '0.6rem' }}>EMAIL PROFESSIONNEL</label>
                <input name="email" type="email" required style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,153,58,0.3)', padding: '1rem', color: 'white', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '1.8rem' }}>
                <label style={{ display: 'block', fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.15em', marginBottom: '0.6rem' }}>MOT DE PASSE</label>
                <input name="password" type="password" required style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,153,58,0.3)', padding: '1rem', color: 'white', outline: 'none' }} />
              </div>
              <button type="submit" style={{ width: '100%', padding: '1rem', background: '#C4993A', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '0.2em', fontSize: '0.78rem' }}>
                S'INSCRIRE ET CONTINUER
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isConnected && purchased && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(15px)' }}>
          <div style={{ background: '#0D140D', border: '1px solid #C4993A', padding: 'clamp(1.4rem, 4vw, 2.2rem)', width: '95%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setPurchased(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 'clamp(1.7rem, 4vw, 2.2rem)', color: '#C4993A', marginBottom: '1rem', textAlign: 'center' }}>Paiement du Workshop</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', marginBottom: '1.8rem', textAlign: 'center', lineHeight: '1.6', fontWeight: '300' }}>
              Pour finaliser votre inscription, veuillez effectuer le virement aux coordonnées ci-dessous et télécharger votre reçu.
            </p>

            <div style={{ background: 'rgba(196,153,58,0.05)', padding: '1.2rem', border: '1px solid rgba(196,153,58,0.15)', marginBottom: '1.8rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em', margin: '0 0 0.5rem', fontWeight: '600' }}>RIB PLATFORME</p>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'white', letterSpacing: '0.05em' }}>007 99999 0000123456 78</p>
              </div>
              <div>
                <p style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em', margin: '0 0 0.5rem', fontWeight: '600' }}>CCP PLATFORME</p>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'white', letterSpacing: '0.05em' }}>12345678 / 90</p>
              </div>
            </div>

            <form onSubmit={handlePaymentSubmit}>
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.7rem', color: '#C4993A', letterSpacing: '0.1em', marginBottom: '0.6rem', fontWeight: '600' }}>CONFIRMER VOTRE EMAIL</label>
                <input name="email" type="email" placeholder="votre@email.com" required style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,153,58,0.3)', padding: '0.8rem 0.9rem', color: 'white', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '1.8rem' }}>
                <label style={{ display: 'block', fontSize: '0.7rem', color: '#C4993A', letterSpacing: '0.1em', marginBottom: '0.6rem', fontWeight: '600' }}>TÉLÉCHARGER LE REÇU (PDF/IMAGE)</label>
                <input name="receipt" type="file" accept=".pdf,.jpg,.jpeg,.png" required style={{ width: '100%', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }} />
              </div>
              <button type="submit" style={{ width: '100%', padding: '1rem', background: '#C4993A', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '0.18em', fontSize: '0.78rem' }}>
                CONFIRMER MON PAIEMENT
              </button>
            </form>
          </div>
        </div>
      )}

      <footer style={{ padding: '5rem 4.5rem', borderTop: '1px solid rgba(196,153,58,0.1)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3em' }}>
          © 2026 ACADEMY • L'EXCELLENCE DENTAIRE
        </p>
      </footer>
    </div>
  );
}
