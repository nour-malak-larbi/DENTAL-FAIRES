'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [role, setRole] = useState<'student' | 'formateur'>('student');

  useEffect(() => {
    const field = document.getElementById('auth-dust');
    if (!field) return;
    field.innerHTML = '';
    for (let i = 0; i < 22; i++) {
      const d = document.createElement('div');
      const sz = Math.random() * 2.5 + 0.5;
      const dur = Math.random() * 18 + 12;
      const dx = (Math.random() - 0.5) * 120;
      d.style.cssText = `
        position:absolute;
        width:${sz}px;height:${sz}px;
        border-radius:50%;
        background:rgba(196,153,58,0.6);
        left:${Math.random() * 100}vw;
        bottom:-10px;
        opacity:${Math.random() * 0.55 + 0.1};
        animation: dustFloat ${dur}s linear ${Math.random() * -20}s infinite;
        --dx:${dx}px;
      `;
      field.appendChild(d);
    }
  }, []);

  return (
    <>
      <style>{`
        .auth-bg {
          position: fixed; inset: 0; z-index: 0; overflow: hidden;
          background: #080E08;
        }
        .auth-bg-radial {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 90% 80% at 50% 40%, #1C3A1C 0%, #0F1F0F 45%, #060C06 100%);
          opacity: 0.85;
        }
        .auth-bg-glow {
          position: absolute; bottom: 0; left: 0; right: 0; height: 50%;
          background: radial-gradient(ellipse at 50% 100%, rgba(196,153,58,0.12) 0%, transparent 70%);
        }
        .auth-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 100% 100% at 50% 50%,
            transparent 30%, rgba(8,14,8,0.6) 65%, rgba(8,14,8,0.95) 100%);
        }
        .auth-green-fog {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 30%, rgba(30,60,30,0.25) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 15% 60%, rgba(20,40,20,0.35) 0%, transparent 65%),
            radial-gradient(ellipse 60% 40% at 85% 60%, rgba(20,40,20,0.35) 0%, transparent 65%);
          animation: fogPulse 8s ease-in-out infinite;
        }
        .auth-scanline {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
        }
        #auth-dust { position: absolute; inset: 0; pointer-events: none; }

        .auth-wrap {
          position: relative; z-index: 2;
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 3rem 1.5rem;
          font-family: 'Jost', sans-serif;
        }
        .auth-inner { width: 100%; max-width: 440px; }
        .auth-logo-wrap { text-align: center; margin-bottom: 2.5rem; }
        .auth-logo { height: 90px; filter: drop-shadow(0 0 18px rgba(196,153,58,0.5)); display: block; margin: 0 auto; }
        .auth-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 200; color: #F5F2EC;
          text-align: center; line-height: 1.1; margin-top: 1.5rem;
        }
        .auth-headline em { font-style: italic; color: #E2C47A; }
        .auth-sub {
          text-align: center; font-size: 0.78rem; letter-spacing: 0.12em;
          color: rgba(245,242,236,0.45); margin-top: 0.6rem;
        }
        .auth-card {
          margin-top: 2.5rem;
          background: rgba(8,14,8,0.82);
          border: 1px solid rgba(196,153,58,0.15);
          border-radius: 4px;
          padding: 2.5rem 2.5rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(24px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
        }
        .auth-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196,153,58,0.4), transparent);
        }

        .role-tabs { display: flex; gap: 0; margin-bottom: 2rem; border-bottom: 1px solid rgba(196,153,58,0.12); }
        .role-tab {
          flex: 1; padding: 0.75rem 0; background: none; border: none; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 0.68rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,242,236,0.35);
          border-bottom: 2px solid transparent; margin-bottom: -1px;
          transition: all 0.3s;
        }
        .role-tab.active { color: #C4993A; border-bottom-color: #C4993A; }
        .role-tab:hover:not(.active) { color: rgba(245,242,236,0.6); }

        .form-group { margin-bottom: 1.4rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.4rem; }
        .form-label {
          display: block; font-size: 0.6rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: #C4993A; margin-bottom: 0.5rem;
        }
        .form-input, .form-select {
          width: 100%; background: rgba(4,8,4,0.8);
          border: 1px solid rgba(26,46,26,0.8); border-radius: 0;
          padding: 0.85rem 1rem; color: #F5F2EC;
          font-family: 'Jost', sans-serif; font-size: 0.82rem; font-weight: 200;
          outline: none; transition: border-color 0.3s;
          appearance: none; -webkit-appearance: none;
        }
        .form-input:focus, .form-select:focus { border-color: rgba(196,153,58,0.55); }
        .form-input::placeholder { color: rgba(245,242,236,0.2); }
        .form-select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23C4993A' opacity='.5'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 1rem center; padding-right: 2.5rem; }
        .form-select option { background: #111A11; color: #F5F2EC; }

        .dynamic-fields { animation: riseIn 0.4s ease-out forwards; }

        .btn-submit {
          width: 100%; margin-top: 0.5rem;
          background: linear-gradient(135deg, #C4993A, #8B6820);
          color: #080E08; border: none; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 0.7rem;
          font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase;
          padding: 1rem; transition: all 0.4s;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          position: relative; overflow: hidden;
        }
        .btn-submit::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #E2C47A, #C4993A);
          opacity: 0; transition: opacity 0.4s;
        }
        .btn-submit:hover::before { opacity: 1; }
        .btn-submit:hover { box-shadow: 0 8px 40px rgba(196,153,58,0.35); transform: translateY(-1px); }
        .btn-submit span { position: relative; z-index: 1; }

        .auth-footer { text-align: center; margin-top: 1.8rem; font-size: 0.78rem; color: rgba(245,242,236,0.35); }
        .auth-link { color: #C4993A; text-decoration: none; transition: color 0.3s; }
        .auth-link:hover { color: #E2C47A; }
      `}</style>

      {/* Background */}
      <div className="auth-bg">
        <div className="auth-bg-radial"></div>
        <div className="auth-bg-glow"></div>
        <div className="auth-green-fog"></div>
        <div className="auth-vignette"></div>
        <div className="auth-scanline"></div>
        <div id="auth-dust" suppressHydrationWarning></div>
      </div>

      <div className="auth-wrap">
        <div className="auth-inner">
          <div className="auth-logo-wrap">
            <Link href="/">
              <img src="/logo-transparent.png" alt="Dental Fairies" style={{height:'220px', width:'auto', display:'block', margin:'-55px auto -70px', filter:'drop-shadow(0 0 20px rgba(196,153,58,0.55))'}} />
            </Link>
            <h1 className="auth-headline">Rejoindre l&apos;<em>académie</em></h1>
            <p className="auth-sub">L&apos;excellence clinique commence ici.</p>
          </div>

          <div className="auth-card">
            {/* Role tabs */}
            <div className="role-tabs">
              <button className={`role-tab${role === 'student' ? ' active' : ''}`} onClick={() => setRole('student')}>
                Étudiant / Praticien
              </button>
              <button className={`role-tab${role === 'formateur' ? ' active' : ''}`} onClick={() => setRole('formateur')}>
                Formateur
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div>
                  <label className="form-label">Nom</label>
                  <input type="text" className="form-input" placeholder="Votre nom" required />
                </div>
                <div>
                  <label className="form-label">Prénom</label>
                  <input type="text" className="form-input" placeholder="Votre prénom" required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="contact@exemple.com" required />
              </div>

              <div className="form-group">
                <label className="form-label">Mot de passe</label>
                <input type="password" className="form-input" placeholder="••••••••" required />
              </div>

              {/* Student fields */}
              {role === 'student' && (
                <div className="dynamic-fields">
                  <div className="form-group">
                    <label className="form-label">Niveau / Année d&apos;étude</label>
                    <select className="form-select">
                      <option value="">Sélectionnez votre niveau</option>
                      <option value="1">1ère année</option>
                      <option value="2">2ème année</option>
                      <option value="3">3ème année</option>
                      <option value="4">4ème année</option>
                      <option value="5">5ème année</option>
                      <option value="6">6ème année</option>
                      <option value="interne">Interne</option>
                      <option value="resident">Résident</option>
                      <option value="praticien">Chirurgien-dentiste diplômé</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Spécialité / Intérêt</label>
                    <select className="form-select">
                      <option value="">Sélectionnez une spécialité</option>
                      <option value="omni">Omnipratique</option>
                      <option value="implanto">Implantologie</option>
                      <option value="paro">Parodontologie</option>
                      <option value="odf">Orthopédie Dento-Faciale (ODF)</option>
                      <option value="prothese">Prothèse</option>
                      <option value="endo">Endodontie</option>
                      <option value="pedo">Pédodontie</option>
                      <option value="chiro">Chirurgie orale</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Formateur fields */}
              {role === 'formateur' && (
                <div className="dynamic-fields">
                  <div className="form-group">
                    <label className="form-label">Domaine d&apos;expertise</label>
                    <input type="text" className="form-input" placeholder="Ex : Implantologie avancée" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Lien vers vos travaux <span style={{opacity:0.4}}>(optionnel)</span></label>
                    <input type="url" className="form-input" placeholder="https://" />
                  </div>
                </div>
              )}

              <button type="submit" className="btn-submit">
                <span>Créer mon compte</span>
              </button>
            </form>
          </div>

          <p className="auth-footer">
            Déjà membre ?{' '}
            <Link href="/login" className="auth-link">Connectez-vous</Link>
          </p>
        </div>
      </div>
    </>
  );
}
