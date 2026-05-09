'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Navbar from '@/components/Navbar';

export default function WebinarDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const [purchaseStatus, setPurchaseStatus] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [webinar, setWebinar] = useState<any>(null);
  const [registered, setRegistered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    // Fetch webinar data from the database
    const fetchWebinar = async () => {
      try {
        const res = await fetch(`/api/webinars/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setWebinar(data);
        } else {
          // Fallback to static if not found or error
          const fetchedWebinar = getWebinarById(Number(params.id));
          setWebinar(fetchedWebinar);
        }
      } catch (err) {
        console.error('Failed to fetch webinar:', err);
        const fetchedWebinar = getWebinarById(Number(params.id));
        setWebinar(fetchedWebinar);
      }
    };
    fetchWebinar();
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
          // Check access to this webinar
          if (webinar) {
            fetch('/api/access/check', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                productType: 'webinar',
                productId: webinar.id
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
  }, [webinar]);

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
    paymentData.append('productType', 'webinar');
    paymentData.append('productId', webinar.id);

    try {
      const response = await fetch('/api/confirm-payment', {
        method: 'POST',
        body: paymentData
      });

      if (response.ok) {
        alert('Reçu envoyé ! Notre équipe validera votre accès sous 24h.');
        setRegistered(false);
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

  if (!webinar) {
    return (
      <div style={{ backgroundColor: '#091209', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: "'Jost', sans-serif" }}>
        <p>Webinaire non trouvé (ID: {params.id})</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#091209', minHeight: '100vh', color: 'white', fontFamily: "'Jost', sans-serif" }}>
      <Navbar />

      <main style={{ paddingTop: 'clamp(8rem, 15vw, 12rem)', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          {/* Left Side: Poster - Fixed Fit */}
          <div style={{ flex: '1', minWidth: '320px', position: 'relative' }}>
            <div style={{ 
              position: 'relative', borderRadius: '4px', overflow: 'hidden', 
              boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(196,153,58,0.1)',
              background: '#000', aspectRatio: '16/9'
            }}>
              <img 
                src={webinar.posterFile || webinar.image || '/logo-transparent.png'}
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
              {(webinar.tags || []).map((tag: string) => (
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

            {!isConnected ? (
              <button
                onClick={() => router.push('/login')}
                style={{
                  width: '100%', padding: '1.4rem 2rem', background: 'linear-gradient(135deg, #C4993A, #8B6820)',
                  border: 'none', color: '#091209', fontSize: '0.85rem', letterSpacing: '0.2em', fontWeight: 'bold',
                  borderRadius: '2px', cursor: 'pointer', boxShadow: '0 15px 35px rgba(196,153,58,0.2)', textTransform: 'uppercase'
                }}
              >
                S'INSCRIRE POUR ACCÉDER
              </button>
            ) : hasAccess ? (
              <div style={{ width: '100%', padding: '2.5rem', background: 'rgba(196,153,58,0.05)', border: '1px solid rgba(196,153,58,0.2)' }}>
                <p style={{ color: '#C4993A', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>✓ VOUS AVEZ ACCÈS À CE WEBINAIRE</p>
                {meetLink ? (
                  <a href={meetLink} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '1.2rem 2rem', background: '#C4993A', color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.15em', transition: 'all 0.3s'
                  }}>
                    🎥 REJOINDRE LA SÉANCE
                  </a>
                ) : (
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                    Le lien Google Meet sera disponible prochainement.
                  </p>
                )}
              </div>
            ) : (
              <div style={{ width: '100%', padding: '2.5rem', background: 'rgba(196,153,58,0.05)', border: '1px solid rgba(196,153,58,0.2)' }}>
                <p style={{ color: '#C4993A', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>✓ ACCÈS GRATUIT À CE WEBINAIRE</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                  Connectez-vous pour accéder au contenu gratuit.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      {isConnected && registered && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(15px)' }}>
          <div style={{ background: '#0D140D', border: '1px solid #C4993A', padding: 'clamp(1.4rem, 4vw, 2.2rem)', width: '95%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setRegistered(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 'clamp(1.7rem, 4vw, 2.2rem)', color: '#C4993A', marginBottom: '1rem', textAlign: 'center' }}>Paiement du Webinaire</h2>
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

      <footer style={{ padding: '6rem 4.5rem', borderTop: '1px solid rgba(196,153,58,0.1)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', color: 'rgba(245,242,236,0.3)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          © 2026 Academy • L'Excellence Dentaire
        </p>
      </footer>
    </div>
  );
}
