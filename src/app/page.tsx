
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // ── Dust motes ─────────────────────────────────────────
    const field = document.getElementById('dust-field');
    if (field) {
      field.innerHTML = '';
      for (let i = 0; i < 28; i++) {
        const d = document.createElement('div');
        d.className = 'dust';
        const sz = Math.random() * 2.5 + 0.5;
        const dur = Math.random() * 18 + 12;
        const dx  = (Math.random() - 0.5) * 120;
        d.style.cssText = `
          width:${sz}px; height:${sz}px;
          left:${Math.random() * 100}vw;
          bottom:-10px;
          opacity:${Math.random() * 0.55 + 0.1};
          --dx:${dx}px;
          animation: dustFloat ${dur}s linear ${Math.random() * -20}s infinite;
        `;
        field.appendChild(d);
      }
    }

    // ── Scroll reveal ─────────────────────────────────────
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── Counter animation ─────────────────────────────────
function animateCounter(el: HTMLElement, target: number, suffix = '') {
  let current = 0;
  const step  = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 20);
}

const statObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const htmlTarget = e.target as HTMLElement;
      const target = parseInt(htmlTarget.dataset.target || '0');
      const statEl = htmlTarget.closest('.stat') as HTMLElement;
      const suffix = statEl?.querySelector('.stat-l')?.textContent?.includes('%') ? '+' : '+';
      animateCounter(htmlTarget, target, suffix);
      statObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-n').forEach(el => statObs.observe(el));

// ── SVG corridor subtle animation ─────────────────────
// Gentle light flicker on ceiling lights
let phase = 0;
function flickerLights() {
  phase += 0.015;
  const intensity = 0.5 + Math.sin(phase) * 0.08 + Math.sin(phase * 3.7) * 0.03;
  const lights = document.querySelectorAll('#corridor-svg [filter="url(#lightGlowF)"]');
  lights.forEach((l, i) => {
    const base = [1, 0.7, 0.5, 0.35, 0.2][i] || 0.2;
    (l as SVGElement).style.opacity = (base * intensity).toString();
  });
  requestAnimationFrame(flickerLights);
}
flickerLights();

// ── Mouse parallax on corridor ─────────────────────────
document.addEventListener('mousemove', (e) => {
  const mx = (e.clientX / window.innerWidth  - 0.5) * 12;
  const my = (e.clientY / window.innerHeight - 0.5) * 8;
  const svg = document.getElementById('corridor-svg') as HTMLElement | null;
  if (svg) {
    svg.style.transform = `translate(${mx * -0.5}px, ${my * -0.3}px) scale(1.02)`;
    svg.style.transition = 'transform 0.8s cubic-bezier(0.25,0.1,0.25,1)';
  }
}, { passive: true });

  }, []);

  return (
    <main className="relative min-h-screen">
      

{/*  ══════════════════════════════════════════════════════
     SCENE: Hospital corridor rendered in SVG + CSS
═══════════════════════════════════════════════════════  */}
<div id="scene">
  <svg id="corridor-svg" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      {/*  Deep perspective gradient  */}
      <radialGradient id="corGrad" cx="50%" cy="45%" r="65%">
        <stop offset="0%"   stopColor="#142814" stopOpacity="0.7"/>
        <stop offset="40%"  stopColor="#0F1F0F" stopOpacity="0.85"/>
        <stop offset="100%" stopColor="#091209" stopOpacity="1"/>
      </radialGradient>

      {/*  Ceiling light glow  */}
      <radialGradient id="lightGlow" cx="50%" cy="0%" r="80%">
        <stop offset="0%"   stopColor="#C4993A" stopOpacity="0.25"/>
        <stop offset="30%"  stopColor="#C4993A" stopOpacity="0.06"/>
        <stop offset="100%" stopColor="#C4993A" stopOpacity="0"/>
      </radialGradient>

      {/*  Floor reflection glow  */}
      <radialGradient id="floorRefl" cx="50%" cy="100%" r="70%">
        <stop offset="0%"   stopColor="#0E1D0E" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#091209" stopOpacity="0"/>
      </radialGradient>

      {/*  Window light (side)  */}
      <linearGradient id="winLight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#C4993A" stopOpacity="0.12"/>
        <stop offset="100%" stopColor="#C4993A" stopOpacity="0"/>
      </linearGradient>

      {/*  Tile texture repeat  */}
      <pattern id="tiles" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="none"/>
        <rect width="79" height="79" fill="rgba(20,35,20,0.3)" stroke="rgba(196,153,58,0.04)" strokeWidth="1"/>
      </pattern>

      {/*  Wall panel pattern  */}
      <pattern id="wallPanel" x="0" y="0" width="160" height="400" patternUnits="userSpaceOnUse">
        <rect width="160" height="400" fill="none"/>
        <rect x="6" y="6" width="148" height="188" fill="none" stroke="rgba(196,153,58,0.06)" strokeWidth="1"/>
        <rect x="6" y="206" width="148" height="188" fill="none" stroke="rgba(196,153,58,0.06)" strokeWidth="1"/>
      </pattern>

      {/*  Depth fog filter  */}
      <filter id="depthBlur" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="1.5"/>
      </filter>

      {/*  Strong depth blur for vanishing point  */}
      <filter id="vanishBlur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3"/>
      </filter>

      {/*  Glow filter for lights  */}
      <filter id="lightGlowF" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>

      {/*  Subtle gold shimmer filter  */}
      <filter id="goldShimmer">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="2">
          <animate attributeName="seed" values="2;8;2" dur="6s" repeatCount="indefinite"/>
        </feTurbulence>
        <feColorMatrix type="saturate" values="0"/>
        <feBlend in="SourceGraphic" mode="multiply" result="blend"/>
        <feComposite in="blend" in2="SourceGraphic" operator="in"/>
      </filter>
    </defs>

    {/*  ── Base background ──  */}
    <rect width="1440" height="900" fill="#091209"/>

    {/*  ── Far corridor vanishing fill ──  */}
    <rect width="1440" height="900" fill="url(#corGrad)"/>

    {/*  ══════════════════════════════════
         CORRIDOR GEOMETRY - PERSPECTIVE
    ══════════════════════════════════  */}

    {/*  FLOOR - receding perspective panels  */}
    {/*  Main floor surface  */}
    <polygon points="0,900 1440,900 820,440 620,440" fill="#0A160A" opacity="0.9"/>

    {/*  Floor tiles grid (perspective)  */}
    {/*  Near tiles (large)  */}
    <g opacity="0.35">
      {/*  Horizontal floor lines receding  */}
      <line x1="0" y1="900" x2="1440" y2="900" stroke="#C4993A" strokeWidth="0.5" opacity="0.15"/>
      <line x1="80" y1="820" x2="1360" y2="820" stroke="#C4993A" strokeWidth="0.4" opacity="0.1"/>
      <line x1="180" y1="740" x2="1260" y2="740" stroke="#C4993A" strokeWidth="0.3" opacity="0.08"/>
      <line x1="270" y1="660" x2="1170" y2="660" stroke="#C4993A" strokeWidth="0.25" opacity="0.06"/>
      <line x1="360" y1="580" x2="1080" y2="580" stroke="#C4993A" strokeWidth="0.2" opacity="0.05"/>
      <line x1="440" y1="510" x2="1000" y2="510" stroke="#C4993A" strokeWidth="0.15" opacity="0.04"/>
      <line x1="510" y1="470" x2="930" y2="470" stroke="#C4993A" strokeWidth="0.1" opacity="0.03"/>

      {/*  Vertical floor lines converging to VP  */}
      {/*  VP at approx 720, 440  */}
      <line x1="0" y1="900" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.5" opacity="0.12"/>
      <line x1="180" y1="900" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.4" opacity="0.1"/>
      <line x1="360" y1="900" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.35" opacity="0.08"/>
      <line x1="540" y1="900" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.3" opacity="0.07"/>
      <line x1="720" y1="900" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.3" opacity="0.07"/>
      <line x1="900" y1="900" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.3" opacity="0.07"/>
      <line x1="1080" y1="900" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.35" opacity="0.08"/>
      <line x1="1260" y1="900" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.4" opacity="0.1"/>
      <line x1="1440" y1="900" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.5" opacity="0.12"/>
    </g>

    {/*  Floor reflection strip (gold shimmer)  */}
    <polygon points="0,900 1440,900 820,600 620,600"
      fill="url(#floorRefl)" opacity="0.5"/>

    {/*  Gold floor center stripe  */}
    <polygon points="680,900 760,900 730,440 710,440"
      fill="rgba(196,153,58,0.04)" opacity="0.8"/>

    {/*  ══ LEFT WALL ══  */}
    {/*  Main wall surface  */}
    <polygon points="0,0 0,900 620,440 620,0" fill="#0D1A0D" opacity="0.9"/>

    {/*  Wall panels (left)  */}
    <g opacity="0.6">
      {/*  Wall baseboard  */}
      <polygon points="0,900 620,440 620,420 0,880" fill="rgba(196,153,58,0.06)"/>
      {/*  Wall dado rail  */}
      <polygon points="0,500 620,380 620,370 0,490" fill="rgba(196,153,58,0.05)"/>
      {/*  Wall cornice  */}
      <polygon points="0,10 620,10 620,0 0,0" fill="rgba(196,153,58,0.04)"/>

      {/*  Panel outlines receding  */}
      <g opacity="0.4" stroke="rgba(196,153,58,0.08)" strokeWidth="0.8" fill="none">
        <polygon points="20,100 20,490 120,430 120,80"/>
        <polygon points="140,90 140,480 240,425 240,75"/>
        <polygon points="260,82 260,472 360,420 360,68"/>
        <polygon points="380,74 380,464 480,416 480,62"/>
        <polygon points="500,68 500,458 580,414 580,56"/>
      </g>
    </g>

    {/*  Window left (ambient hospital light)  */}
    <polygon points="60,120 60,380 200,340 200,140" fill="url(#winLight)" opacity="0.8"/>
    <polygon points="60,120 60,380 200,340 200,140" fill="none" stroke="rgba(196,153,58,0.12)" strokeWidth="1"/>
    {/*  Window glow emanating  */}
    <polygon points="50,100 50,400 260,350 260,120" fill="rgba(196,153,58,0.04)" opacity="0.6"/>

    {/*  Subtle cross on window (hospital cross symbol)  */}
    <g opacity="0.25" stroke="rgba(196,153,58,0.3)" strokeWidth="1.5">
      <line x1="130" y1="140" x2="130" y2="360"/>
      <line x1="80" y1="240" x2="180" y2="240"/>
    </g>

    {/*  ══ RIGHT WALL ══  */}
    <polygon points="1440,0 1440,900 820,440 820,0" fill="#0D1A0D" opacity="0.9"/>

    {/*  Wall panels (right)  */}
    <g opacity="0.6">
      {/*  Wall baseboard  */}
      <polygon points="1440,900 820,440 820,420 1440,880" fill="rgba(196,153,58,0.06)"/>
      {/*  Wall dado rail  */}
      <polygon points="1440,500 820,380 820,370 1440,490" fill="rgba(196,153,58,0.05)"/>

      {/*  Panel outlines receding right  */}
      <g opacity="0.4" stroke="rgba(196,153,58,0.08)" strokeWidth="0.8" fill="none">
        <polygon points="1420,100 1420,490 1320,430 1320,80"/>
        <polygon points="1300,90 1300,480 1200,425 1200,75"/>
        <polygon points="1180,82 1180,472 1080,420 1080,68"/>
        <polygon points="1060,74 1060,464 960,416 960,62"/>
        <polygon points="940,68 940,458 860,414 860,56"/>
      </g>
    </g>

    {/*  Window right  */}
    <polygon points="1380,120 1380,380 1240,340 1240,140" fill="url(#winLight)" opacity="0.8" transform="scale(-1,1) translate(-1440,0)"/>
    <polygon points="1380,120 1380,380 1240,340 1240,140" fill="none" stroke="rgba(196,153,58,0.12)" strokeWidth="1"/>
    <g opacity="0.25" stroke="rgba(196,153,58,0.3)" strokeWidth="1.5">
      <line x1="1310" y1="140" x2="1310" y2="360"/>
      <line x1="1260" y1="240" x2="1360" y2="240"/>
    </g>

    {/*  ══ CEILING ══  */}
    <polygon points="0,0 1440,0 820,440 620,440" fill="#101A10" opacity="0.85"/>

    {/*  Ceiling tiles  */}
    <g opacity="0.3">
      {/*  Horizontal ceiling lines  */}
      <line x1="0" y1="80" x2="1440" y2="80" stroke="#C4993A" strokeWidth="0.3" opacity="0.1"/>
      <line x1="80" y1="160" x2="1360" y2="160" stroke="#C4993A" strokeWidth="0.25" opacity="0.08"/>
      <line x1="180" y1="240" x2="1260" y2="240" stroke="#C4993A" strokeWidth="0.2" opacity="0.06"/>
      <line x1="300" y1="320" x2="1140" y2="320" stroke="#C4993A" strokeWidth="0.15" opacity="0.05"/>
      <line x1="420" y1="380" x2="1020" y2="380" stroke="#C4993A" strokeWidth="0.12" opacity="0.04"/>

      {/*  Vertical ceiling lines converging  */}
      <line x1="0" y1="0" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.4" opacity="0.1"/>
      <line x1="240" y1="0" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.35" opacity="0.08"/>
      <line x1="480" y1="0" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.3" opacity="0.06"/>
      <line x1="720" y1="0" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.3" opacity="0.06"/>
      <line x1="960" y1="0" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.3" opacity="0.06"/>
      <line x1="1200" y1="0" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.35" opacity="0.08"/>
      <line x1="1440" y1="0" x2="720" y2="440" stroke="#C4993A" strokeWidth="0.4" opacity="0.1"/>
    </g>

    {/*  ══ CEILING LIGHT FIXTURES ══  */}
    {/*  Overhead fluorescent/pendant lights receding into corridor  */}
    {/*  Light 1 (nearest, largest)  */}
    <g filter="url(#lightGlowF)">
      <rect x="590" y="8" width="260" height="12" rx="2" fill="rgba(196,153,58,0.5)"/>
      <rect x="590" y="8" width="260" height="12" rx="2" fill="rgba(255,245,220,0.4)"/>
    </g>
    {/*  Light glow downward  */}
    <polygon points="560,20 880,20 820,440 620,440" fill="url(#lightGlow)" opacity="0.6"/>

    {/*  Light 2 (mid)  */}
    <g filter="url(#lightGlowF)" opacity="0.7">
      <rect x="630" y="80" width="180" height="8" rx="1.5" fill="rgba(196,153,58,0.4)"/>
    </g>

    {/*  Light 3 (far)  */}
    <g filter="url(#lightGlowF)" opacity="0.5">
      <rect x="665" y="160" width="110" height="5" rx="1" fill="rgba(196,153,58,0.3)"/>
    </g>

    {/*  Light 4 (further)  */}
    <g filter="url(#lightGlowF)" opacity="0.35">
      <rect x="690" y="230" width="60" height="4" rx="1" fill="rgba(196,153,58,0.25)"/>
    </g>

    {/*  Light 5 (vanishing)  */}
    <g filter="url(#lightGlowF)" opacity="0.2">
      <rect x="706" y="290" width="28" height="3" rx="1" fill="rgba(196,153,58,0.2)"/>
    </g>

    {/*  ══ FAR END - VANISHING POINT ══  */}
    {/*  The corridor end - a glowing arched doorway  */}
    <g filter="url(#vanishBlur)">
      {/*  Arch shape  */}
      <ellipse cx="720" cy="440" rx="85" ry="105" fill="rgba(196,153,58,0.12)"/>
      <ellipse cx="720" cy="440" rx="60" ry="80" fill="rgba(196,153,58,0.18)"/>
      <ellipse cx="720" cy="440" rx="35" ry="50" fill="rgba(196,153,58,0.25)"/>
      <ellipse cx="720" cy="440" rx="15" ry="22" fill="rgba(220,180,100,0.4)"/>
    </g>

    {/*  Arch frame lines (sharp)  */}
    <g fill="none" stroke="rgba(196,153,58,0.15)" strokeWidth="1" opacity="0.8">
      <path d="M 660,520 L 660,400 Q 660,360 720,360 Q 780,360 780,400 L 780,520"/>
      <path d="M 650,525 L 650,398 Q 650,350 720,350 Q 790,350 790,398 L 790,525" strokeWidth="0.5" opacity="0.5"/>
    </g>

    {/*  Mysterious light emanating from arch  */}
    <radialGradient id="archLight" cx="50%" cy="50%" r="50%">
      <stop offset="0%"  stopColor="#C4993A" stopOpacity="0.2"/>
      <stop offset="70%" stopColor="#C4993A" stopOpacity="0.05"/>
      <stop offset="100%" stopColor="#C4993A" stopOpacity="0"/>
    </radialGradient>
    <ellipse cx="720" cy="440" rx="200" ry="160" fill="url(#archLight)">
      <animate attributeName="rx" values="200;220;200" dur="6s" repeatCount="indefinite"/>
      <animate attributeName="ry" values="160;175;160" dur="6s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.8;1;0.8" dur="6s" repeatCount="indefinite"/>
    </ellipse>

    {/*  ══ WALL SIGNAGE / DETAILS ══  */}
    {/*  Left wall: Room numbers / medical signs  */}
    <g opacity="0.18" fill="none" stroke="rgba(196,153,58,0.5)" strokeWidth="0.8">
      {/*  Door frame 1 left  */}
      <rect x="150" y="220" width="100" height="200" rx="0"/>
      <line x1="150" y1="320" x2="250" y2="320"/>
      {/*  Door frame 2 left  */}
      <rect x="320" y="240" width="80" height="175" rx="0"/>
    </g>

    {/*  Right wall: mirrored doors  */}
    <g opacity="0.18" fill="none" stroke="rgba(196,153,58,0.5)" strokeWidth="0.8">
      <rect x="1190" y="220" width="100" height="200" rx="0"/>
      <line x1="1190" y1="320" x2="1290" y2="320"/>
      <rect x="1040" y="240" width="80" height="175" rx="0"/>
    </g>

    {/*  Medical cross symbols on walls (very subtle)  */}
    <g opacity="0.08" stroke="rgba(196,153,58,0.6)" strokeWidth="1.5" fill="none">
      {/*  Left wall cross  */}
      <line x1="450" y1="150" x2="450" y2="220"/>
      <line x1="425" y1="185" x2="475" y2="185"/>
      {/*  Right wall cross  */}
      <line x1="990" y1="150" x2="990" y2="220"/>
      <line x1="965" y1="185" x2="1015" y2="185"/>
    </g>

    {/*  ══ ATMOSPHERIC ELEMENTS ══  */}
    {/*  Left wall ambient light pool (from window)  */}
    <polygon points="0,200 200,180 260,420 0,450" fill="rgba(196,153,58,0.04)" opacity="0.8">
      <animate attributeName="opacity" values="0.6;0.9;0.6" dur="8s" repeatCount="indefinite"/>
    </polygon>

    {/*  Right wall ambient light pool  */}
    <polygon points="1440,200 1240,180 1180,420 1440,450" fill="rgba(196,153,58,0.04)" opacity="0.8">
      <animate attributeName="opacity" values="0.6;0.9;0.6" dur="8s" begin="4s" repeatCount="indefinite"/>
    </polygon>

    {/*  Floor reflection streak  */}
    <polygon points="640,900 800,900 740,600 700,600" fill="rgba(196,153,58,0.06)" opacity="0.8"/>

    {/*  ══ FINAL OVERLAYS ══  */}
    {/*  Depth vignette  */}
    <rect width="1440" height="900" fill="url(#corGrad)" opacity="0.4"/>

    {/*  Global deep atmosphere  */}
    <rect width="1440" height="900" fill="#080E08" opacity="0.35"/>

  </svg>

  {/*  Atmospheric layers  */}
  <div className="atm-layer atm-green-fog"></div>
  <div className="atm-layer atm-gold-ray"></div>
  <div className="atm-layer atm-scanline"></div>
  <div className="atm-layer atm-vignette"></div>

  {/*  Dust particles  */}
  <div className="dust-field" id="dust-field"></div>
</div>

{/*  ══════════════════════════════════════════════════════
     CONTENT
══════════════════════════════════════════════════════  */}
<div className="content">

  {/*  NAV  */}
  <nav id="nav" className={isScrolled ? 'scrolled' : ''}>
    <div className="nav-logo">
      <img src="/logo-transparent.png" alt="Dental Fairies Academy" style={{height:'200px', width:'auto', margin:'-65px 0 -65px', filter:'drop-shadow(0 0 16px rgba(196,153,58,0.55))', display:'block'}}/>
    </div>
    <ul className="nav-links">
      <li><Link href="/" style={{ color: 'var(--gold-lt)' }}>Accueil</Link></li>
      <li><Link href="/webinaires">Webinaires</Link></li>
      <li><Link href="/mindshares">Mindshares</Link></li>
      <li><Link href="/workshops">Workshops</Link></li>
      <li><Link href="/podcasts">Podcasts</Link></li>
      <li><Link href="/vip">Coaching VIP</Link></li>
      <li><Link href="/boutique">Boutique</Link></li>
      <li><Link href="/login" className="nav-btn">Connexion</Link></li>
    </ul>
  </nav>

  {/*  HERO  */}
  <section className="hero">
    <h1 className="hero-h1" style={{fontSize:'clamp(2.8rem,6.5vw,6.5rem)'}}>
      <span className="line-white">L'Excellence</span>
      <span className="line-gold">Dentaire</span>
      <span className="line-white">Réinventée</span>
    </h1>
    <p className="hero-tagline">Formation · Coaching · Communauté · Excellence</p>
    <div className="hero-actions">
      <a href="#programmes" className="btn-gold">Découvrir les programmes</a>
      <a href="/register" className="btn-ghost">Rejoindre l'académie</a>
    </div>
    <div className="scroll-cue">
      <div className="scroll-cue-line"></div>
      <span className="scroll-cue-label">Descendre</span>
    </div>
  </section>

  {/*  TICKER  */}
  <div className="ticker">
    <div className="ticker-track" id="ticker-track">
      <div className="ticker-item"><div className="ticker-dot"></div>Podcast</div>
      <div className="ticker-item"><div className="ticker-dot"></div>Webinaires</div>
      <div className="ticker-item"><div className="ticker-dot"></div>Ateliers Pratiques</div>
      <div className="ticker-item"><div className="ticker-dot"></div>Coaching VIP 1:1</div>
      <div className="ticker-item"><div className="ticker-dot"></div>Mindshares</div>
      <div className="ticker-item"><div className="ticker-dot"></div>Communauté de Praticiens</div>
      <div className="ticker-item"><div className="ticker-dot"></div>Cas Cliniques</div>
      <div className="ticker-item"><div className="ticker-dot"></div>Formation Continue</div>
      <div className="ticker-item"><div className="ticker-dot"></div>Podcast</div>
      <div className="ticker-item"><div className="ticker-dot"></div>Webinaires</div>
      <div className="ticker-item"><div className="ticker-dot"></div>Ateliers Pratiques</div>
      <div className="ticker-item"><div className="ticker-dot"></div>Coaching VIP 1:1</div>
      <div className="ticker-item"><div className="ticker-dot"></div>Mindshares</div>
      <div className="ticker-item"><div className="ticker-dot"></div>Communauté de Praticiens</div>
      <div className="ticker-item"><div className="ticker-dot"></div>Cas Cliniques</div>
      <div className="ticker-item"><div className="ticker-dot"></div>Formation Continue</div>
    </div>
  </div>

  {/*  STATS  */}
  <div className="stats">
    <div className="stat reveal">
      <div className="stat-n" data-target="500">0</div>
      <div className="stat-l">Praticiens formés</div>
    </div>
    <div className="stat reveal reveal-d1">
      <div className="stat-n" data-target="48">0</div>
      <div className="stat-l">Ateliers réalisés</div>
    </div>
    <div className="stat reveal reveal-d2">
      <div className="stat-n" data-target="12">0</div>
      <div className="stat-l">Formateurs experts</div>
    </div>
    <div className="stat reveal reveal-d3">
      <div className="stat-n" data-target="96">0</div>
      <div className="stat-l">% de satisfaction</div>
    </div>
  </div>

  {/*  PROGRAMMES  */}
  <section className="programmes" id="programmes">
    <div className="section-header reveal">
      <p className="section-eyebrow">Nos Programmes</p>
      <h2 className="section-h2">Une offre <em>complète</em><br />pour votre développement</h2>
    </div>

    <div className="prog-grid">
      {/*  Feature card: VIP  */}
      <a href="/vip" className="prog-card feature reveal">
        <div className="prog-num">05</div>
        <p className="prog-tag">Premium · Sur mesure · Exclusif</p>
        <h3 className="prog-title">Coaching VIP<br />1 sur 1</h3>
        <p className="prog-desc">Accompagnement personnalisé par un expert dédié. Diagnostic complet, programme sur mesure, suivi continu. L'excellence à votre service.</p>
        <div className="prog-arrow">
          Réserver ma session
          <svg viewBox="0 0 20 20"><path d="M4 10h12M12 6l4 4-4 4"/></svg>
        </div>
      </a>

      {/*  Podcast  */}
      <a href="/podcast" className="prog-card reveal reveal-d1">
        <div className="prog-num">01</div>
        <p className="prog-tag">Gratuit · Hebdomadaire</p>
        <h3 className="prog-title">Podcast</h3>
        <p className="prog-desc">Insights cliniques, innovations et expériences de terrain — chaque semaine.</p>
        <div className="prog-arrow">Écouter <svg viewBox="0 0 20 20"><path d="M4 10h12M12 6l4 4-4 4"/></svg></div>
      </a>

      {/*  Webinaires  */}
      <a href="/webinaires" className="prog-card reveal reveal-d2">
        <div className="prog-num">02</div>
        <p className="prog-tag">Gratuit · Mensuel</p>
        <h3 className="prog-title">Webinaires</h3>
        <p className="prog-desc">Sessions live avec des experts. Questions en temps réel, replays disponibles.</p>
        <div className="prog-arrow">Participer <svg viewBox="0 0 20 20"><path d="M4 10h12M12 6l4 4-4 4"/></svg></div>
      </a>

      {/*  Ateliers  */}
      <a href="/workshops" className="prog-card reveal reveal-d1">
        <div className="prog-num">03</div>
        <p className="prog-tag">Payant · Présentiel</p>
        <h3 className="prog-title">Ateliers</h3>
        <p className="prog-desc">Formation intensive en petit groupe. Cas cliniques, gestes techniques, feedback immédiat.</p>
        <div className="prog-arrow">S'inscrire <svg viewBox="0 0 20 20"><path d="M4 10h12M12 6l4 4-4 4"/></svg></div>
      </a>

      {/*  Mindshares  */}
      <a href="/mindshares" className="prog-card reveal reveal-d2">
        <div className="prog-num">04</div>
        <p className="prog-tag">Gratuit · Communauté</p>
        <h3 className="prog-title">Mindshares</h3>
        <p className="prog-desc">Articles, cas cliniques et retours d'expérience de la communauté des praticiens.</p>
        <div className="prog-arrow">Lire <svg viewBox="0 0 20 20"><path d="M4 10h12M12 6l4 4-4 4"/></svg></div>
      </a>
    </div>
  </section>

  {/*  PHILOSOPHY  */}
  <section className="philosophy" id="about">
    <div className="philosophy-inner">
      <blockquote className="philosophy-quote reveal">
        "Parce que l'<em>excellence clinique</em> ne s'improvise pas — elle se construit, avec les bons mentors, pas à pas."
      </blockquote>

      <div className="reveal reveal-d1">
        <p className="section-eyebrow" style={{"justifyContent":"flex-start","display":"flex"}}>Notre philosophie</p>
        <h2 className="section-h2" style={{"marginBottom":"1.5rem"}}>Formés pour<br /><em>soigner mieux</em></h2>
        <p className="philosophy-p">Dental Fairies Academy est née d'une conviction profonde : les meilleurs praticiens sont ceux qui n'ont jamais cessé d'apprendre. Nous créons un espace où l'expertise se partage et où chaque professionnel trouve les outils pour s'élever.</p>
        <div className="value-grid">
          <div className="value-item">
            <div className="value-name">Praticité</div>
            <div className="value-text">Ancrée dans la réalité clinique</div>
          </div>
          <div className="value-item">
            <div className="value-name">Excellence</div>
            <div className="value-text">Standards premium invariables</div>
          </div>
          <div className="value-item">
            <div className="value-name">Communauté</div>
            <div className="value-text">Un réseau de praticiens engagés</div>
          </div>
          <div className="value-item">
            <div className="value-name">Innovation</div>
            <div className="value-text">Techniques et technologies de pointe</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  TESTIMONIALS  */}
  <section className="testimonials">
    <div className="testimonials-head reveal">
      <p className="section-eyebrow">Témoignages</p>
      <h2 className="section-h2">Ce que disent <em>nos membres</em></h2>
    </div>
    <div style={{"overflow":"hidden","width":"100%"}}>
      <div className="t-strip">
        <div className="t-card"><div className="t-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><div className="t-quote-mark">"</div><p className="t-body">"L'atelier sur l'implantologie a transformé ma pratique. Le niveau des formateurs est exceptionnel, les cas traités sont d'une richesse remarquable."</p><div className="t-author"><div className="t-av">KA</div><div><div className="t-name">Dr. Karima A.</div><div className="t-role">Chirurgien-dentiste · Alger</div></div></div></div>
        <div className="t-card"><div className="t-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><div className="t-quote-mark">"</div><p className="t-body">"Le coaching VIP 1:1 a été un vrai tournant dans ma carrière. Programme sur mesure, suivi rigoureux, résultats concrets et mesurables."</p><div className="t-author"><div className="t-av">YB</div><div><div className="t-name">Dr. Yacine B.</div><div className="t-role">Étudiant 5ème année · Constantine</div></div></div></div>
        <div className="t-card"><div className="t-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><div className="t-quote-mark">"</div><p className="t-body">"Les webinaires sont d'une richesse incroyable. J'apprends à chaque session des approches que je n'aurais pas trouvées ailleurs."</p><div className="t-author"><div className="t-av">SH</div><div><div className="t-name">Dr. Sarra H.</div><div className="t-role">Omnipraticienne · Oran</div></div></div></div>
        <div className="t-card"><div className="t-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><div className="t-quote-mark">"</div><p className="t-body">"La plateforme Mindshares est devenue ma source de veille principale. Articles pertinents, bien documentés, utiles au quotidien."</p><div className="t-author"><div className="t-av">MR</div><div><div className="t-name">Dr. Mohamed R.</div><div className="t-role">Parodontologiste · Tizi Ouzou</div></div></div></div>
        <div className="t-card"><div className="t-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><div className="t-quote-mark">"</div><p className="t-body">"J'ai rejoint comme étudiante, je suis maintenant formatrice. Cette académie m'a donné confiance en mes capacités et en mon avenir."</p><div className="t-author"><div className="t-av">NL</div><div><div className="t-name">Dr. Nadia L.</div><div className="t-role">Formatrice · Annaba</div></div></div></div>
        {/*  Duplicate for seamless loop  */}
        <div className="t-card"><div className="t-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><div className="t-quote-mark">"</div><p className="t-body">"L'atelier sur l'implantologie a transformé ma pratique. Le niveau des formateurs est exceptionnel, les cas traités sont d'une richesse remarquable."</p><div className="t-author"><div className="t-av">KA</div><div><div className="t-name">Dr. Karima A.</div><div className="t-role">Chirurgien-dentiste · Alger</div></div></div></div>
        <div className="t-card"><div className="t-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><div className="t-quote-mark">"</div><p className="t-body">"Le coaching VIP 1:1 a été un vrai tournant dans ma carrière. Programme sur mesure, suivi rigoureux, résultats concrets et mesurables."</p><div className="t-author"><div className="t-av">YB</div><div><div className="t-name">Dr. Yacine B.</div><div className="t-role">Étudiant 5ème année · Constantine</div></div></div></div>
        <div className="t-card"><div className="t-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><div className="t-quote-mark">"</div><p className="t-body">"Les webinaires sont d'une richesse incroyable. J'apprends à chaque session des approches que je n'aurais pas trouvées ailleurs."</p><div className="t-author"><div className="t-av">SH</div><div><div className="t-name">Dr. Sarra H.</div><div className="t-role">Omnipraticienne · Oran</div></div></div></div>
        <div className="t-card"><div className="t-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><div className="t-quote-mark">"</div><p className="t-body">"La plateforme Mindshares est devenue ma source de veille principale. Articles pertinents, bien documentés, utiles au quotidien."</p><div className="t-author"><div className="t-av">MR</div><div><div className="t-name">Dr. Mohamed R.</div><div className="t-role">Parodontologiste · Tizi Ouzou</div></div></div></div>
        <div className="t-card"><div className="t-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><div className="t-quote-mark">"</div><p className="t-body">"J'ai rejoint comme étudiante, je suis maintenant formatrice. Cette académie m'a donné confiance en mes capacités et en mon avenir."</p><div className="t-author"><div className="t-av">NL</div><div><div className="t-name">Dr. Nadia L.</div><div className="t-role">Formatrice · Annaba</div></div></div></div>
      </div>
    </div>
  </section>

  {/*  VIP  */}
  <section className="vip-section" id="vip">
    <div className="vip-emblem reveal">✦</div>
    <h2 className="vip-h2 reveal reveal-d1">
      Un accompagnement<br /><em>entièrement</em><br />personnalisé
    </h2>
    <p className="vip-sub reveal reveal-d2">Travaillez en tête-à-tête avec un expert dédié à votre progression. Diagnostic, programme sur mesure, suivi rigoureux.</p>
    <div className="vip-pills reveal reveal-d2">
      <div className="pill">Sessions individuelles</div>
      <div className="pill">Programme personnalisé</div>
      <div className="pill">Suivi post-formation</div>
      <div className="pill">Accès prioritaire</div>
    </div>
    <a href="/vip" className="btn-gold reveal reveal-d3">Réserver ma session VIP</a>
  </section>

  {/*  MINDSHARES  */}
  <section className="mindshares" id="mindshares">
    <div className="ms-inner">
      <div className="ms-header reveal">
        <div>
          <p className="section-eyebrow" style={{"display":"flex"}}>Mindshares</p>
          <h2 className="section-h2">Insights &<br /><em>Expériences</em></h2>
        </div>
        <a href="/mindshares" className="btn-ghost" style={{"whiteSpace":"nowrap","alignSelf":"flex-end"}}>Tout voir</a>
      </div>
      <div className="ms-grid">
        <a href="/mindshares/1" className="ms-card ms-feat reveal">
          <p className="ms-cat">Cas Clinique</p>
          <h3 className="ms-title">Gestion des complications implantaires : retour sur 3 cas complexes</h3>
          <p className="ms-excerpt">Une analyse approfondie de trois situations délicates, les décisions prises et les leçons apprises pour améliorer nos protocoles quotidiens.</p>
          <div className="ms-meta"><span>Dr. A. Benali</span> · 8 min · 23 Avr 2026</div>
        </a>
        <div style={{"display":"flex","flexDirection":"column","gap":"1px","background":"var(--border)"}}>
          <a href="/mindshares/2" className="ms-card reveal reveal-d1">
            <p className="ms-cat">Innovation</p>
            <h3 className="ms-title">L'IA en dentisterie : où en sommes-nous vraiment ?</h3>
            <p className="ms-excerpt">Tour d'horizon des outils qui transforment le diagnostic et la planification.</p>
            <div className="ms-meta"><span>Dr. N. Larbi</span> · 5 min</div>
          </a>
          <a href="/mindshares/3" className="ms-card reveal reveal-d2">
            <p className="ms-cat">Pratique Clinique</p>
            <h3 className="ms-title">Gestion du stress en cabinet : stratégies concrètes</h3>
            <p className="ms-excerpt">Des techniques validées pour améliorer la qualité de votre pratique.</p>
            <div className="ms-meta"><span>Dr. S. Hamdi</span> · 6 min</div>
          </a>
        </div>
      </div>
    </div>
  </section>

  {/*  CTA FINAL  */}
  <section className="cta-final">
    <h2 className="cta-final-h2 reveal">Prêt à entrer dans<br /><em>l'académie ?</em></h2>
    <p className="cta-final-p reveal reveal-d1">Rejoignez des centaines de praticiens qui ont choisi l'excellence. Accès immédiat au podcast et aux webinaires dès l'inscription.</p>
    <div className="reveal reveal-d2" style={{"display":"flex","gap":"1.2rem","justifyContent":"center","flexWrap":"wrap"}}>
      <a href="/register" className="btn-gold">Créer mon compte</a>
      <a href="#programmes" className="btn-ghost">Voir les programmes</a>
    </div>
  </section>

  {/*  FOOTER  */}
  <footer>
    <div className="footer-grid">
      <div className="footer-logo">
        <img src="/logo-transparent.png" alt="Dental Fairies Academy"/>
        <p className="footer-tagline">Une académie premium dédiée à l'excellence en dentisterie. Formez-vous, grandissez, transmettez.</p>
      </div>
      <div>
        <p className="f-col-title">Programmes</p>
        <ul className="f-links">
          <li><a href="/podcast">Podcast</a></li>
          <li><a href="/webinaires">Webinaires</a></li>
          <li><a href="/workshops">Ateliers</a></li>
          <li><a href="/vip">Coaching VIP</a></li>
          <li><a href="/mindshares">Mindshares</a></li>
        </ul>
      </div>
      <div>
        <p className="f-col-title">Académie</p>
        <ul className="f-links">
          <li><a href="/about">À propos</a></li>
          <li><a href="/formateurs">Formateurs</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/register">Rejoindre</a></li>
        </ul>
      </div>
      <div>
        <p className="f-col-title">Légal</p>
        <ul className="f-links">
          <li><a href="/mentions">Mentions légales</a></li>
          <li><a href="/confidentialite">Confidentialité</a></li>
          <li><a href="/cgv">CGV</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 ACADEMY • L'EXCELLENCE DENTAIRE</span>
    </div>
  </footer>

</div>{/*  /content  */}




    </main>
  );
}
