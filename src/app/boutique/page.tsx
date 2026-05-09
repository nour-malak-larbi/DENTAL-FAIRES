'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Navbar from '@/components/Navbar';

export default function BoutiquePage() {
  return (
    <div style={{ backgroundColor: '#091209', minHeight: '100vh', color: 'white', fontFamily: "var(--font-inter), sans-serif" }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', padding: '0 4.5rem' }}>
        <p style={{ color: '#C4993A', letterSpacing: '0.6em', fontSize: '0.8rem', marginBottom: '2rem', fontWeight: '600' }}>ÉQUIPEMENT & CONSOMMABLES</p>
        <h1 style={{ 
          fontSize: 'clamp(3.5rem, 9vw, 8rem)', 
          fontWeight: '200', 
          letterSpacing: '-0.03em', 
          margin: '0 0 3rem',
          fontFamily: "'Cormorant Garamond', serif",
          lineHeight: '0.9'
        }}>
          La <span style={{ color: '#C4993A', fontStyle: 'italic' }}>Boutique</span>
        </h1>
        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', color: 'rgba(245,242,236,0.5)', fontWeight: '300', lineHeight: '1.8' }}>
          Une sélection rigoureuse de produits dentaires d'excellence. Notre catalogue complet arrive très prochainement pour accompagner votre quête de perfection clinique.
        </p>
      </section>

      {/* Coming Soon Section */}
      <section style={{ padding: '0 4.5rem 12rem' }}>
        <div style={{ 
          maxWidth: '1300px', margin: '0 auto', textAlign: 'center', padding: '8rem 4.5rem', 
          background: '#0D140D', border: '1px solid rgba(196,153,58,0.12)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.4)'
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '200', letterSpacing: '0.05em', marginBottom: '2rem', fontFamily: "'Cormorant Garamond', serif" }}>Aperçu des Collections</h2>
          <div style={{ width: '60px', height: '1px', background: '#C4993A', margin: '0 auto 6rem', opacity: 0.5 }}></div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', textAlign: 'left' }}>
            <div style={{ padding: '3rem', border: '1px solid rgba(196,153,58,0.08)', background: 'rgba(255,255,255,0.01)', transition: 'all 0.4s ease' }}>
              <div style={{ width: '100%', aspectRatio: '1/1', background: 'rgba(196,153,58,0.04)', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(196,153,58,0.05)' }}>
                <span style={{ fontSize: '0.7rem', color: 'rgba(196,153,58,0.3)', letterSpacing: '0.3em', fontWeight: '600' }}>PHOTO À VENIR</span>
              </div>
              <p style={{ color: '#C4993A', fontSize: '0.65rem', letterSpacing: '0.2em', margin: '0 0 1rem', fontWeight: '700' }}>DENTAL FAIRIES PRO</p>
              <h4 style={{ fontSize: '1.4rem', fontWeight: '300', margin: '0 0 1.2rem', fontFamily: "'Cormorant Garamond', serif", color: '#F5F2EC' }}>Kit Implantologie Premium</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C4993A', opacity: 0.5 }}></div>
                <p style={{ color: 'rgba(245,242,236,0.4)', fontSize: '0.85rem', margin: 0, fontWeight: '300' }}>Bientôt disponible</p>
              </div>
            </div>
            
            <div style={{ padding: '3rem', border: '1px solid rgba(196,153,58,0.08)', background: 'rgba(255,255,255,0.01)', transition: 'all 0.4s ease' }}>
              <div style={{ width: '100%', aspectRatio: '1/1', background: 'rgba(196,153,58,0.04)', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(196,153,58,0.05)' }}>
                <span style={{ fontSize: '0.7rem', color: 'rgba(196,153,58,0.3)', letterSpacing: '0.3em', fontWeight: '600' }}>PHOTO À VENIR</span>
              </div>
              <p style={{ color: '#C4993A', fontSize: '0.65rem', letterSpacing: '0.2em', margin: '0 0 1rem', fontWeight: '700' }}>DENTAL FAIRIES PRO</p>
              <h4 style={{ fontSize: '1.4rem', fontWeight: '300', margin: '0 0 1.2rem', fontFamily: "'Cormorant Garamond', serif", color: '#F5F2EC' }}>Composite Universel A2–A3</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C4993A', opacity: 0.5 }}></div>
                <p style={{ color: 'rgba(245,242,236,0.4)', fontSize: '0.85rem', margin: 0, fontWeight: '300' }}>Bientôt disponible</p>
              </div>
            </div>

            <div style={{ padding: '3rem', border: '1px solid rgba(196,153,58,0.08)', background: 'rgba(255,255,255,0.01)', transition: 'all 0.4s ease' }}>
              <div style={{ width: '100%', aspectRatio: '1/1', background: 'rgba(196,153,58,0.04)', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(196,153,58,0.05)' }}>
                <span style={{ fontSize: '0.7rem', color: 'rgba(196,153,58,0.3)', letterSpacing: '0.3em', fontWeight: '600' }}>PHOTO À VENIR</span>
              </div>
              <p style={{ color: '#C4993A', fontSize: '0.65rem', letterSpacing: '0.2em', margin: '0 0 1rem', fontWeight: '700' }}>DENTAL FAIRIES PRO</p>
              <h4 style={{ fontSize: '1.4rem', fontWeight: '300', margin: '0 0 1.2rem', fontFamily: "'Cormorant Garamond', serif", color: '#F5F2EC' }}>Set d'Instruments Chirurgicaux</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C4993A', opacity: 0.5 }}></div>
                <p style={{ color: 'rgba(245,242,236,0.4)', fontSize: '0.85rem', margin: 0, fontWeight: '300' }}>Bientôt disponible</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '7rem', maxWidth: '500px', margin: '7rem auto 0' }}>
            <p style={{ fontSize: '1.1rem', color: 'rgba(245,242,236,0.6)', marginBottom: '2.5rem', fontWeight: '300' }}>Soyez informé dès l'ouverture de la boutique d'excellence.</p>
            <div style={{ display: 'flex', gap: '0', border: '1px solid rgba(196,153,58,0.3)', padding: '0.5rem', borderRadius: '2px' }}>
              <input type="email" placeholder="Votre adresse email" style={{ flex: 1, background: 'none', border: 'none', padding: '1rem', color: 'white', outline: 'none', fontSize: '0.9rem' }} />
              <button style={{ padding: '0 2rem', background: '#C4993A', border: 'none', color: '#0A0F0A', fontWeight: '800', fontSize: '0.7rem', letterSpacing: '0.2em', cursor: 'pointer', transition: 'all 0.3s' }}>S'INSCRIRE</button>
            </div>
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
