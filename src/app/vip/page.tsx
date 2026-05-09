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

import Navbar from '@/components/Navbar';

export default function VipPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

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
          // Check access to VIP coaching
          fetch('/api/access/check', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              productType: 'vip',
              productId: 'vip-coaching' // Using a generic ID for VIP access
            })
          })
          .then(res => res.json())
          .then(accessData => {
            setHasAccess(accessData.hasAccess);
            setPurchaseStatus(accessData.purchaseStatus);
          })
          .catch(() => {
            setHasAccess(false);
          });
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, []);

  const handlePaymentSubmit = async (formData: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté pour effectuer un paiement');
      return;
    }

    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productType: 'vip',
          productId: selectedOffer.id,
          productName: `Coaching VIP - ${selectedOffer.label}`,
          amount: selectedOffer.price.replace(/\s/g, ''),
          paymentMethod: formData.paymentMethod,
          receiptFile: formData.receiptFile
        })
      });

      if (response.ok) {
        setShowPaymentModal(false);
        setPurchaseStatus('pending');
        alert('Votre paiement a été soumis. L\'équipe administrative validera votre accès sous 24h.');
      } else {
        alert('Erreur lors de la soumission du paiement');
      }
    } catch (error) {
      alert('Erreur lors de la soumission du paiement');
    }
  };

  return (
    <div style={{ backgroundColor: '#091209', minHeight: '100vh', color: 'white', fontFamily: "var(--font-inter), sans-serif" }}>
      <Navbar />

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
            {!isConnected ? (
              <Link href="/login" style={{ 
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
              }}>S'INSCRIRE POUR ACCÉDER</Link>
            ) : hasAccess ? (
              <div style={{ padding: '2rem', background: 'rgba(196,153,58,0.05)', border: '1px solid rgba(196,153,58,0.2)', borderRadius: '4px' }}>
                <p style={{ color: '#C4993A', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '0.1em' }}>✓ VOUS AVEZ ACCÈS AU COACHING VIP</p>
                <a href="#offres" style={{ 
                  display: 'inline-block',
                  padding: '1rem 2rem', 
                  background: '#C4993A', 
                  color: 'white', 
                  textDecoration: 'none', 
                  fontWeight: '700', 
                  fontSize: '0.75rem', 
                  letterSpacing: '0.25em', 
                  borderRadius: '2px', 
                  transition: 'all 0.4s'
                }}>VOIR MES OFFRES</a>
              </div>
            ) : purchaseStatus === 'pending' ? (
              <div style={{ padding: '2rem', background: 'rgba(255,165,0,0.05)', border: '1px solid rgba(255,165,0,0.2)', borderRadius: '4px' }}>
                <p style={{ color: '#FFA500', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '0.1em' }}>⏳ PAIEMENT EN COURS DE VALIDATION</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                  Votre reçu a été envoyé. L'équipe administrative validera votre accès sous 24h.
                </p>
              </div>
            ) : (
              <button onClick={() => setShowPaymentModal(true)} style={{ 
                padding: '1.4rem 3.5rem', 
                background: 'linear-gradient(135deg, #C4993A, #8B6820)', 
                color: 'white', 
                textDecoration: 'none', 
                fontWeight: '700', 
                fontSize: '0.75rem', 
                letterSpacing: '0.25em', 
                borderRadius: '2px', 
                boxShadow: '0 15px 40px rgba(196,153,58,0.25)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                border: 'none',
                cursor: 'pointer'
              }}>PROCÉDER AU PAIEMENT</button>
            )}
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

                <button 
                  onClick={() => {
                    if (!isConnected) {
                      window.location.href = '/login';
                      return;
                    }
                    if (hasAccess) {
                      alert('Vous avez déjà accès au coaching VIP');
                      return;
                    }
                    setSelectedOffer(offer);
                    setShowPaymentModal(true);
                  }}
                  style={{
                    padding: '1.4rem',
                    background: offer.highlight ? '#C4993A' : 'transparent',
                    border: offer.highlight ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    color: offer.highlight ? '#0A0F0A' : '#F5F2EC',
                    fontWeight: '800', fontSize: '0.75rem', letterSpacing: '0.25em', cursor: 'pointer',
                    transition: 'all 0.4s'
                  }}
                >
                  {!isConnected ? 'S\'INSCRIRE' : hasAccess ? 'ACCÈS DÉJÀ ACQUIS' : 'CHOISIR CE FORFAIT'}
                </button>
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

      {/* Payment Modal */}
      {showPaymentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            backgroundColor: '#091209',
            border: '1px solid rgba(196,153,58,0.3)',
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ color: '#C4993A', fontSize: '1.5rem', margin: 0 }}>Paiement - {selectedOffer?.label}</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >×</button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <p style={{ color: 'white', marginBottom: '1rem' }}>
                Montant: <span style={{ color: '#C4993A', fontWeight: 'bold' }}>{selectedOffer?.price}€</span>
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Veuillez effectuer le paiement par virement bancaire ou autre moyen, puis télécharger votre reçu de paiement ci-dessous.
                L'équipe administrative validera votre accès sous 24h.
              </p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const data = {
                paymentMethod: formData.get('paymentMethod'),
                receiptFile: formData.get('receiptFile')
              };
              handlePaymentSubmit(data);
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>
                  Moyen de paiement
                </label>
                <select
                  name="paymentMethod"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(196,153,58,0.3)',
                    borderRadius: '4px',
                    color: 'white',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">Sélectionner un moyen de paiement</option>
                  <option value="virement">Virement bancaire</option>
                  <option value="paypal">PayPal</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>
                  Reçu de paiement (PDF ou image)
                </label>
                <input
                  type="file"
                  name="receiptFile"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(196,153,58,0.3)',
                    borderRadius: '4px',
                    color: 'white',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#C4993A',
                    border: 'none',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Soumettre le paiement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
