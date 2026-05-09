'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsConnected(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsConnected(false);
    router.push('/login');
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Webinaires', href: '/webinaires' },
    { name: 'Mindshares', href: '/mindshares' },
    { name: 'Workshops', href: '/workshops' },
    { name: 'Podcasts', href: '/podcasts' },
    { name: 'Coaching VIP', href: '/vip' },
    { name: 'Boutique', href: '/boutique' },
  ];

  return (
    <>
      <nav className={isScrolled ? 'scrolled' : ''} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isScrolled ? '0.5rem clamp(1rem, 3vw, 4.5rem)' : '0.8rem clamp(1rem, 3vw, 4.5rem)',
        backgroundColor: isScrolled ? '#091209' : 'transparent',
        borderBottom: isScrolled ? '1px solid rgba(212,175,55,0.2)' : 'none',
        transition: 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none'
      }}>
        <div className="nav-logo">
          <Link href="/">
            <img 
              src="/logo-transparent.png" 
              alt="Dental Fairies" 
              style={{ 
                height: isScrolled ? '100px' : '160px', 
                width: 'auto', 
                margin: isScrolled ? '-30px 0' : '-55px 0',
                filter: 'drop-shadow(0 0 16px rgba(196,153,58,0.55))',
                transition: 'all 0.6s ease',
                display: 'block'
              }} 
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="nav-links desktop-only">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                style={{ 
                  color: pathname === link.href ? '#F1D382' : 'rgba(245,242,236,0.55)',
                  fontWeight: pathname === link.href ? '600' : '300',
                  fontSize: '0.62rem',
                  letterSpacing: '0.12em'
                }}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {isConnected && (
            <li key="/profile">
              <Link 
                href="/profile" 
                style={{ 
                  color: pathname === '/profile' ? '#F1D382' : 'rgba(245,242,236,0.55)',
                  fontWeight: pathname === '/profile' ? '600' : '300',
                  fontSize: '0.62rem',
                  letterSpacing: '0.12em'
                }}
              >
                Mon Profil
              </Link>
            </li>
          )}
          <li>
            {isConnected ? (
              <button onClick={handleLogout} className="nav-btn" style={{ background: 'none', cursor: 'pointer' }}>Déconnexion</button>
            ) : (
              <Link href="/login" className="nav-btn">Connexion</Link>
            )}
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button 
          className="mobile-only"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ 
            background: 'none', border: 'none', color: '#F1D382', cursor: 'pointer',
            padding: '10px'
          }}
        >
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          backgroundColor: 'rgba(9, 18, 9, 0.98)',
          backdropFilter: 'blur(15px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '2rem'
        }}>
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              style={{ 
                color: pathname === link.href ? '#F1D382' : 'white',
                fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none'
              }}
            >
              {link.name}
            </Link>
          ))}
          {isConnected ? (
            <>
              <Link 
                href="/profile" 
                onClick={() => setIsMenuOpen(false)}
                style={{ 
                  color: pathname === '/profile' ? '#F1D382' : 'white',
                  fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none'
                }}
              >
                MON PROFIL
              </Link>
              <button 
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                style={{ 
                  marginTop: '1rem', padding: '1rem 3rem', border: '1px solid #F1D382', color: '#F1D382',
                  textDecoration: 'none', letterSpacing: '0.2em', background: 'none', cursor: 'pointer'
                }}
              >
                DÉCONNEXION
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              onClick={() => setIsMenuOpen(false)}
              style={{ 
                marginTop: '1rem', padding: '1rem 3rem', border: '1px solid #F1D382', color: '#F1D382',
                textDecoration: 'none', letterSpacing: '0.2em'
              }}
            >
              CONNEXION
            </Link>
          )}
        </div>
      )}

      <style jsx global>{`
        .nav-links {
          display: flex;
          align-items: center;
          gap: clamp(0.5rem, 1.2vw, 1.8rem);
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          text-decoration: none;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .nav-links a:hover {
          color: #F1D382 !important;
        }
        .nav-btn {
          padding: 0.5rem 1rem;
          border: 1px solid #C4993A;
          color: #F1D382;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 600;
          transition: all 0.3s;
          white-space: nowrap;
        }
        .nav-btn:hover {
          background: #C4993A;
          color: #091209;
        }

        @media (max-width: 1200px) {
          .nav-links a {
            font-size: 0.58rem !important;
            letter-spacing: 0.1em !important;
          }
        }

        @media (max-width: 1024px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
          nav { padding: 0.5rem 1.5rem !important; }
          .nav-logo img { height: 80px !important; margin: -25px 0 !important; }
        }
        @media (min-width: 1025px) {
          .mobile-only { display: none !important; }
          .desktop-only { display: flex !important; }
        }
      `}</style>
    </>
  );
}
