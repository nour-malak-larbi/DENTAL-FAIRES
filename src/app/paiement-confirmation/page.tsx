'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaymentConfirmationPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const productTitle = searchParams.get('title');
  const productType = searchParams.get('type') || 'formation';

  const [isScrolled, setIsScrolled] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Veuillez sélectionner votre reçu de paiement.');
      return;
    }

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('name', userInfo.name);
      formData.append('email', userInfo.email);
      formData.append('phone', userInfo.phone);
      formData.append('productTitle', productTitle || 'Inconnu');
      formData.append('productId', productId || 'Inconnu');
      formData.append('file', file);

      const res = await fetch('/api/confirm-payment', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error('Submission failed:', errorData);
        alert(`Erreur (${res.status}): ${errorData.error || "Une erreur est survenue lors de l'envoi."}`);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion au serveur.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main style={{ 
      backgroundColor: '#091209', 
      minHeight: '100vh', 
      color: 'white', 
      fontFamily: "'Jost', sans-serif",
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Background Layers */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div className="atm-layer atm-green-fog" />
        <div className="atm-layer atm-gold-ray" />
        <div className="atm-layer atm-vignette" />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Nav */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 2rem', height: '80px',
          backgroundColor: isScrolled ? 'rgba(8, 14, 8, 0.95)' : 'transparent',
          borderBottom: isScrolled ? '1px solid rgba(196, 153, 58, 0.15)' : 'none',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          transition: 'all 0.4s ease'
        }}>
          <Link href="/">
            <img src="/logo-transparent.png" alt="Dental Fairies" style={{ height: '180px', width: 'auto', margin: '-50px 0', filter: 'drop-shadow(0 0 10px rgba(196,153,58,0.3))' }} />
          </Link>
          <Link href="/workshops" style={{ 
            color: '#C4993A', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' 
          }}>
            ← Retour
          </Link>
        </nav>

        <section style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '160px', paddingBottom: '100px', paddingLeft: '2rem', paddingRight: '2rem' }}>
          {!submitted ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
              
              {/* Left Side: Payment Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <span style={{ color: '#C4993A', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                    Processus de Validation
                  </span>
                  <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 200, margin: 0, lineHeight: 1.1 }}>
                    Confirmation de <span style={{ color: '#C4993A', fontStyle: 'italic' }}>Paiement</span>
                  </h1>
                  <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#A0A0A0', lineHeight: 1.8, fontWeight: 300 }}>
                    Vous avez choisi de vous inscrire à : <br/>
                    <strong style={{ color: 'white' }}>{productTitle || 'notre formation'}</strong>.
                  </p>
                </div>

                <div style={{ 
                  backgroundColor: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(196, 153, 58, 0.2)', 
                  padding: '2rem',
                  display: 'flex', flexDirection: 'column', gap: '1.5rem'
                }}>
                  <div>
                    <p style={{ fontSize: '0.55rem', color: '#C4993A', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Compte CCP (Algérie Poste)</p>
                    <p style={{ fontSize: '1.4rem', fontWeight: 300, margin: 0, letterSpacing: '0.05em' }}>0021345678 / 90</p>
                    <p style={{ fontSize: '0.7rem', color: '#808080', marginTop: '0.3rem' }}>Dental Fairies Academy</p>
                  </div>
                  
                  <div style={{ height: '1px', backgroundColor: 'rgba(196, 153, 58, 0.1)' }} />

                  <div>
                    <p style={{ fontSize: '0.55rem', color: '#C4993A', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Numéro RIP</p>
                    <p style={{ fontSize: '1rem', fontWeight: 300, margin: 0, letterSpacing: '0.1em' }}>007 99999 0021345678 90</p>
                  </div>
                </div>

                <div style={{ padding: '1.5rem', borderLeft: '2px solid #C4993A', backgroundColor: 'rgba(196,153,58,0.05)' }}>
                  <p style={{ fontSize: '0.75rem', color: '#D0D0D0', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
                    "Veuillez effectuer le virement puis téléverser une copie de votre reçu via le formulaire ci-contre. Votre accès sera activé sous 24h."
                  </p>
                </div>
              </div>

              {/* Right Side: Form */}
              <div>
                <form onSubmit={handleSubmit} style={{ 
                  backgroundColor: '#111811', 
                  border: '1px solid rgba(196, 153, 58, 0.15)', 
                  padding: '2.5rem',
                  display: 'flex', flexDirection: 'column', gap: '1.5rem',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.6rem', color: '#808080', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Nom Complet</label>
                    <input 
                      required
                      type="text" 
                      value={userInfo.name}
                      onChange={e => setUserInfo({...userInfo, name: e.target.value})}
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        padding: '0.8rem 1rem', color: 'white', outline: 'none', fontSize: '0.85rem'
                      }}
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.6rem', color: '#808080', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Email</label>
                      <input 
                        required
                        type="email" 
                        value={userInfo.email}
                        onChange={e => setUserInfo({...userInfo, email: e.target.value})}
                        style={{ 
                          backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                          padding: '0.8rem 1rem', color: 'white', outline: 'none', fontSize: '0.85rem'
                        }}
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.6rem', color: '#808080', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Téléphone</label>
                      <input 
                        required
                        type="tel" 
                        value={userInfo.phone}
                        onChange={e => setUserInfo({...userInfo, phone: e.target.value})}
                        style={{ 
                          backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                          padding: '0.8rem 1rem', color: 'white', outline: 'none', fontSize: '0.85rem'
                        }}
                        placeholder="05XXXXXXXX"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.6rem', color: '#808080', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Reçu de Paiement</label>
                    <div style={{
                      border: '2px dashed rgba(196, 153, 58, 0.2)',
                      padding: '2rem 1rem',
                      textAlign: 'center',
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      cursor: 'pointer',
                      position: 'relative'
                    }}>
                      <input 
                        type="file" 
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                      />
                      <p style={{ fontSize: '0.7rem', color: '#C4993A', margin: 0 }}>
                        {file ? file.name : "Cliquez ou glissez votre reçu ici"}
                      </p>
                      <p style={{ fontSize: '0.55rem', color: '#606060', marginTop: '0.5rem' }}>PNG, JPG ou PDF accepté</p>
                    </div>
                  </div>

                  <button 
                    disabled={uploading}
                    style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      backgroundColor: '#C4993A',
                      color: '#080E08',
                      border: 'none',
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      fontWeight: 600,
                      cursor: 'pointer',
                      opacity: uploading ? 0.6 : 1,
                      transition: 'background 0.3s'
                    }}
                  >
                    {uploading ? "Envoi en cours..." : "Envoyer la preuve de paiement"}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(196,153,58,0.1)',
                border: '1px solid #C4993A', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 2rem', color: '#C4993A', fontSize: '2rem'
              }}>
                ✓
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 200, marginBottom: '1rem' }}>
                Demande <span style={{ color: '#C4993A', fontStyle: 'italic' }}>reçue</span>
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#A0A0A0', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
                Merci {userInfo.name}. Votre reçu a été envoyé à notre équipe. Vous recevrez un e-mail dès que votre accès sera activé.
              </p>
              <Link href="/workshops" style={{ 
                backgroundColor: '#C4993A', color: '#080E08', padding: '1rem 2rem', textDecoration: 'none',
                fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600
              }}>
                Retour aux Workshops
              </Link>
            </div>
          )}
        </section>

        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.6rem', color: '#505050', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            © 2026 Dental Fairies Academy · Excellence Médicale
          </p>
        </footer>
      </div>
    </main>
  );
}
