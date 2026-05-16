'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function BoutiquePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Placeholder: no products yet
  useEffect(() => {
    // Simulate loading delay if desired
    setLoading(false);
  }, []);

  return (
    <div style={{ backgroundColor: '#091209', minHeight: '100vh', color: 'white', fontFamily: "var(--font-inter), sans-serif" }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{ height: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', padding: '0 4.5rem' }}>
        <p style={{ color: '#C4993A', letterSpacing: '0.6em', fontSize: '0.8rem', marginBottom: '2rem', fontWeight: '600' }}>ÉQUIPEMENT & CONSOMMABLES</p>
        <h1 style={{ 
          fontSize: 'clamp(3.5rem, 9vw, 8rem)', 
          fontWeight: '200', 
          letterSpacing: '-0.03em', 
          margin: '0 0 3rem',
          fontFamily: "'Cormorant Garamond', serif",
          lineHeight: '0.9'
        }}>
          Le <span style={{ color: '#C4993A', fontStyle: 'italic' }}>Comptoir Dentaire</span>
        </h1>
        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: 'rgba(245,242,236,0.5)', fontWeight: '300', lineHeight: '1.8' }}>
          Une sélection rigoureuse de produits dentaires d'excellence pour accompagner votre quête de perfection clinique.
        </p>
      </section>

      {/* Products Section */}
      <section style={{ padding: '0 4.5rem 12rem' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem', color: 'rgba(255,255,255,0.3)' }}>Chargement du catalogue...</div>
          ) : products.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
              {products.map((product) => (
                <div key={product.id} style={{ 
                  padding: '2.5rem', border: '1px solid rgba(196,153,58,0.12)', 
                  background: 'rgba(255,255,255,0.01)', transition: 'all 0.4s ease',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ width: '100%', aspectRatio: '1/1', background: 'rgba(196,153,58,0.04)', marginBottom: '2rem', overflow: 'hidden' }}>
                    <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <p style={{ color: '#C4993A', fontSize: '0.6rem', letterSpacing: '0.2em', margin: '0 0 0.5rem', fontWeight: '700', textTransform: 'uppercase' }}>{product.category || 'DENTAL PRO'}</p>
                      <h4 style={{ fontSize: '1.4rem', fontWeight: '300', margin: 0, fontFamily: "'Cormorant Garamond', serif", color: '#F5F2EC' }}>{product.name}</h4>
                    </div>
                    <p style={{ color: '#C4993A', fontSize: '1.1rem', fontWeight: '500', margin: 0 }}>{product.price}</p>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(245,242,236,0.5)', lineHeight: '1.6', marginBottom: '2rem', height: '3.2rem', overflow: 'hidden' }}>
                    {product.description}
                  </p>
                  <button style={{ 
                    width: '100%', padding: '1rem', background: 'rgba(196,153,58,0.1)', border: '1px solid #C4993A', 
                    color: '#C4993A', fontWeight: '600', fontSize: '0.7rem', letterSpacing: '0.2em', cursor: 'pointer' 
                  }}>
                    VOIR LES DÉTAILS
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', padding: '8rem 4.5rem', 
              background: '#0D140D', border: '1px solid rgba(196,153,58,0.12)' 
            }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '200', letterSpacing: '0.05em', marginBottom: '1.5rem', fontFamily: "'Cormorant Garamond', serif" }}>Le catalogue arrive bientôt</h2>
              <p style={{ color: 'rgba(245,242,236,0.4)', marginBottom: '4rem' }}>Soyez informé dès l'ouverture du comptoir d'excellence.</p>
              <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', gap: '0', border: '1px solid rgba(196,153,58,0.3)', padding: '0.5rem', borderRadius: '2px' }}>
                <input type="email" placeholder="Votre adresse email" style={{ flex: 1, background: 'none', border: 'none', padding: '1rem', color: 'white', outline: 'none', fontSize: '0.9rem' }} />
                <button style={{ padding: '0 2rem', background: '#C4993A', border: 'none', color: '#0A0F0A', fontWeight: '800', fontSize: '0.7rem', letterSpacing: '0.2em', cursor: 'pointer' }}>S'INSCRIRE</button>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer style={{ padding: '6rem 4.5rem', borderTop: '1px solid rgba(196,153,58,0.1)', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
        <img src="/logo-transparent.png" alt="Footer Logo" style={{ height: '80px', width: 'auto', marginBottom: '2rem', opacity: 0.3, filter: 'grayscale(1)' }} />
        <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.3em', fontWeight: '400' }}>DENTAL · FAIRIES · ACADEMY</p>
        <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em', marginTop: '1rem' }}>© 2026 L'EXCELLENCE DENTAIRE RÉINVENTÉE</p>
      </footer>
    </div>
  );
}
