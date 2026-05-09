'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  useEffect(() => {
    const field = document.getElementById('auth-dust-login');
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
        .auth-bg { position:fixed;inset:0;z-index:0;overflow:hidden;background:#080E08; }
        .auth-bg-radial { position:absolute;inset:0;background:radial-gradient(ellipse 90% 80% at 50% 40%,#1C3A1C 0%,#0F1F0F 45%,#060C06 100%);opacity:0.85; }
        .auth-bg-glow { position:absolute;bottom:0;left:0;right:0;height:50%;background:radial-gradient(ellipse at 50% 100%,rgba(196,153,58,0.12) 0%,transparent 70%); }
        .auth-vignette { position:absolute;inset:0;background:radial-gradient(ellipse 100% 100% at 50% 50%,transparent 30%,rgba(8,14,8,0.6) 65%,rgba(8,14,8,0.95) 100%); }
        .auth-green-fog { position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 30%,rgba(30,60,30,0.25) 0%,transparent 70%),radial-gradient(ellipse 60% 40% at 15% 60%,rgba(20,40,20,0.35) 0%,transparent 65%),radial-gradient(ellipse 60% 40% at 85% 60%,rgba(20,40,20,0.35) 0%,transparent 65%);animation:fogPulse 8s ease-in-out infinite; }
        .auth-scanline { position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px); }
        #auth-dust-login { position:absolute;inset:0;pointer-events:none; }

        .auth-wrap { position:relative;z-index:2;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:3rem 1.5rem;font-family:'Jost',sans-serif; }
        .auth-inner { width:100%;max-width:420px; }
        .auth-logo { height:90px; filter:drop-shadow(0 0 18px rgba(196,153,58,0.5)); display:block; margin:0 auto; }
        .auth-headline { font-family:'Cormorant Garamond',serif;font-size:2.4rem;font-weight:200;color:#F5F2EC;text-align:center;line-height:1.1;margin-top:1.5rem; }
        .auth-headline em { font-style:italic;color:#E2C47A; }
        .auth-sub { text-align:center;font-size:0.78rem;letter-spacing:0.12em;color:rgba(245,242,236,0.45);margin-top:0.6rem; }

        .auth-card { margin-top:2.5rem;background:rgba(8,14,8,0.82);border:1px solid rgba(196,153,58,0.15);border-radius:4px;padding:2.5rem;position:relative;overflow:hidden;backdrop-filter:blur(24px);box-shadow:0 32px 80px rgba(0,0,0,0.6); }
        .auth-card::before { content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(196,153,58,0.4),transparent); }

        .form-group { margin-bottom:1.4rem; }
        .form-label-row { display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem; }
        .form-label { display:block;font-size:0.6rem;letter-spacing:0.22em;text-transform:uppercase;color:#C4993A; }
        .form-forgot { font-size:0.6rem;letter-spacing:0.1em;color:rgba(245,242,236,0.3);text-decoration:none;transition:color 0.3s; }
        .form-forgot:hover { color:#C4993A; }
        .form-input { width:100%;background:rgba(4,8,4,0.8);border:1px solid rgba(26,46,26,0.8);border-radius:0;padding:0.85rem 1rem;color:#F5F2EC;font-family:'Jost',sans-serif;font-size:0.82rem;font-weight:200;outline:none;transition:border-color 0.3s; }
        .form-input:focus { border-color:rgba(196,153,58,0.55); }
        .form-input::placeholder { color:rgba(245,242,236,0.2); }

        .btn-submit { width:100%;margin-top:0.8rem;background:linear-gradient(135deg,#C4993A,#8B6820);color:#080E08;border:none;cursor:pointer;font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:400;letter-spacing:0.22em;text-transform:uppercase;padding:1rem;transition:all 0.4s;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));position:relative;overflow:hidden; }
        .btn-submit::before { content:'';position:absolute;inset:0;background:linear-gradient(135deg,#E2C47A,#C4993A);opacity:0;transition:opacity 0.4s; }
        .btn-submit:hover::before { opacity:1; }
        .btn-submit:hover { box-shadow:0 8px 40px rgba(196,153,58,0.35);transform:translateY(-1px); }
        .btn-submit span { position:relative;z-index:1; }

        .auth-footer { text-align:center;margin-top:1.8rem;font-size:0.78rem;color:rgba(245,242,236,0.35); }
        .auth-link { color:#C4993A;text-decoration:none;transition:color 0.3s; }
        .auth-link:hover { color:#E2C47A; }

        .admin-link-wrap { text-align:center;margin-top:2.5rem; }
        .admin-link { font-size:0.58rem;letter-spacing:0.22em;text-transform:uppercase;color:rgba(245,242,236,0.18);text-decoration:none;transition:color 0.3s; }
        .admin-link:hover { color:rgba(245,242,236,0.4); }
      `}</style>

      <div className="auth-bg">
        <div className="auth-bg-radial"></div>
        <div className="auth-bg-glow"></div>
        <div className="auth-green-fog"></div>
        <div className="auth-vignette"></div>
        <div className="auth-scanline"></div>
        <div id="auth-dust-login" suppressHydrationWarning></div>
      </div>

      <div className="auth-wrap">
        <div className="auth-inner">
          <div style={{textAlign:'center'}}>
            <Link href="/"><img src="/logo-transparent.png" alt="Dental Fairies" style={{height:'220px', width:'auto', display:'block', margin:'-55px auto -70px', filter:'drop-shadow(0 0 20px rgba(196,153,58,0.55))'}} /></Link>
            <h1 className="auth-headline">Accès à l&apos;<em>académie</em></h1>
            <p className="auth-sub">Connectez-vous pour poursuivre votre formation.</p>
          </div>

          <div className="auth-card">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="contact@exemple.com" required />
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label">Mot de passe</label>
                  <a href="#" className="form-forgot">Mot de passe oublié ?</a>
                </div>
                <input type="password" className="form-input" placeholder="••••••••" required />
              </div>

              <button type="submit" className="btn-submit"><span>Connexion</span></button>
            </form>
          </div>

          <p className="auth-footer">
            Nouveau membre ?{' '}
            <Link href="/register" className="auth-link">Rejoindre l&apos;académie</Link>
          </p>

          <div className="admin-link-wrap">
            <Link href="/admin/login" className="admin-link">Portail Administrateur →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
