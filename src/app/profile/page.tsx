'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

interface Purchase {
  id: string;
  productType: string;
  productId: string;
  amount: string;
  status: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  purchases: Purchase[];
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        } else {
          setError(data.error || 'Erreur lors de la récupération du profil');
        }
      } catch (err) {
        setError('Erreur réseau');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#091209', minHeight: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Chargement du profil...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div style={{ backgroundColor: '#091209', minHeight: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <p>{error || 'Utilisateur non trouvé'}</p>
        <Link href="/login" style={{ color: '#D4AF37', textDecoration: 'underline' }}>Se connecter</Link>
      </div>
    );
  }

  const joinDate = new Date(user.createdAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div style={{ backgroundColor: '#091209', minHeight: '100vh', color: 'white', fontFamily: "'Jost', sans-serif" }}>
      <Navbar />

      <main style={{ padding: '12rem clamp(1.5rem, 5vw, 4.5rem) 6rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{ borderBottom: '1px solid rgba(196,153,58,0.1)', paddingBottom: '3rem', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #C4993A, #9B7E2E)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '2.5rem', 
              fontWeight: '200',
              color: '#091209'
            }}>
              {user.name[0]}
            </div>
            <div style={{ textAlign: 'inherit' }}>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300', margin: '0 0 0.5rem' }}>
                {user.name}
              </h1>
              <p style={{ color: 'rgba(245,242,236,0.5)', fontSize: '0.9rem', fontWeight: '300', margin: 0 }}>
                {user.email} • Membre depuis {joinDate}
              </p>
              <div style={{ display: 'inline-block', marginTop: '1rem', padding: '0.3rem 0.8rem', background: 'rgba(196,153,58,0.1)', border: '1px solid rgba(196,153,58,0.3)', borderRadius: '4px', fontSize: '0.7rem', color: '#D4AF37', letterSpacing: '0.1em', fontWeight: '600' }}>
                {user.role}
              </div>
            </div>
          </div>
        </div>

        {/* Purchases Section */}
        <section>
          <h2 style={{ fontSize: '1.8rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300', marginBottom: '2.5rem', borderLeft: '3px solid #D4AF37', paddingLeft: '1.5rem' }}>
            Mes Achats & Inscriptions
          </h2>

          {user.purchases.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(196,153,58,0.2)', borderRadius: '8px' }}>
              <p style={{ color: 'rgba(245,242,236,0.4)', marginBottom: '2rem' }}>Vous n'avez pas encore effectué d'achats.</p>
              <Link href="/#programmes" style={{ color: '#D4AF37', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: '600', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid #D4AF37', padding: '0.8rem 1.5rem' }}>
                Découvrir nos formations
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {user.purchases.map((purchase) => (
                <div key={purchase.id} style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(196,153,58,0.1)', 
                  padding: '2rem', 
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1.5rem'
                }}>
                  <div style={{ flex: '1 1 300px' }}>
                    <div style={{ fontSize: '0.65rem', color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: '600' }}>
                      {purchase.productType}
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '300', margin: '0 0 0.5rem', color: '#F5F2EC' }}>
                      Achat #{purchase.id.slice(-6).toUpperCase()}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(245,242,236,0.4)', margin: 0 }}>
                      Commandé le {new Date(purchase.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>

                  <div style={{ textAlign: 'left', minWidth: '150px' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#F1D382', marginBottom: '0.5rem' }}>
                      {purchase.amount}
                    </div>
                    <div style={{ 
                      display: 'inline-block',
                      padding: '0.3rem 0.6rem', 
                      borderRadius: '2px',
                      fontSize: '0.6rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      background: purchase.status === 'paid' ? 'rgba(76, 175, 80, 0.1)' : purchase.status === 'pending' ? 'rgba(255, 152, 0, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                      color: purchase.status === 'paid' ? '#4CAF50' : purchase.status === 'pending' ? '#FF9800' : '#F44336',
                      border: `1px solid ${purchase.status === 'paid' ? '#4CAF50' : purchase.status === 'pending' ? '#FF9800' : '#F44336'}`
                    }}>
                      {purchase.status === 'paid' ? 'Payé' : purchase.status === 'pending' ? 'En attente' : 'Refusé'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Logout button for mobile or quick access */}
        <div style={{ marginTop: '6rem', textAlign: 'center' }}>
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}
            style={{
              background: 'none',
              border: '1px solid rgba(244, 67, 54, 0.3)',
              color: '#F44336',
              padding: '0.8rem 2rem',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(244, 67, 54, 0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            Se déconnecter
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: '6rem clamp(1.5rem, 5vw, 4.5rem)', borderTop: '1px solid rgba(196,153,58,0.1)', textAlign: 'center', background: 'rgba(8,14,8,0.4)' }}>
        <img src="/logo-transparent.png" alt="Logo" style={{ height: '80px', width: 'auto', marginBottom: '2rem', opacity: 0.3, filter: 'grayscale(1)' }} />
        <p style={{ fontSize: '0.65rem', color: 'rgba(245,242,236,0.3)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          © 2026 Academy • L'Excellence Dentaire
        </p>
      </footer>
    </div>
  );
}
