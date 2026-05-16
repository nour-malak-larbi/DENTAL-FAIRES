'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Play, ShoppingBag, BookOpen, Mic, Video, Users, GraduationCap, ChevronRight, Star } from 'lucide-react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mindshares, setMindshares] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/mindshares')
      .then(res => res.json())
      .then(data => {
        setMindshares(data.slice(0, 3));
      })
      .catch(console.error);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#091209] text-[#F5F2EC] overflow-hidden font-['Jost',sans-serif]">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(45,82,45,0.15)_0%,transparent_70%)] blur-[120px]"></div>
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-[radial-gradient(circle,rgba(196,153,58,0.05)_0%,transparent_70%)] blur-[80px]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-12">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#091209]/40 via-[#091209]/80 to-[#091209]"></div>
          
          <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center animate-fade-in-up">
            <div className="inline-flex items-center gap-4 mb-8 text-[#D4AF37] tracking-[0.3em] text-xs uppercase opacity-80">
              <span className="w-12 h-px bg-[#D4AF37]"></span>
              L'Académie Premium
              <span className="w-12 h-px bg-[#D4AF37]"></span>
            </div>
            
            <h1 className="font-['Cormorant_Garamond',serif] text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] mb-8">
              <span className="block text-white">L'Excellence</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E2C47A] via-[#C4993A] to-[#8B6820] italic">Dentaire</span>
              <span className="block text-white">Réinventée</span>
            </h1>
            
            <p className="text-[#F5F2EC]/60 uppercase tracking-[0.2em] text-sm mb-12 max-w-2xl leading-relaxed">
              Formez-vous aux standards d'excellence, connectez-vous aux leaders de demain et équipez-vous pour transformer votre pratique clinique.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="#volets" className="px-10 py-4 bg-gradient-to-r from-[#C4993A] to-[#8B6820] text-[#091209] font-medium tracking-[0.2em] uppercase text-xs hover:shadow-[0_0_30px_rgba(196,153,58,0.4)] transition-all duration-300 transform hover:-translate-y-1 rounded-sm">
                Découvrir l'Académie
              </a>
              <Link href="/register" className="px-10 py-4 border border-[rgba(245,242,236,0.2)] text-[rgba(245,242,236,0.7)] hover:border-[#D4AF37] hover:text-[#D4AF37] font-medium tracking-[0.2em] uppercase text-xs transition-all duration-300 rounded-sm">
                Nous rejoindre
              </Link>
            </div>
          </div>
          
          {/* Scroll Down Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
            <div className="w-[1px] h-16 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse"></div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37]">Explorer</span>
          </div>
        </section>

        {/* Les 3 Volets Principaux */}
        <section id="volets" className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl font-light mb-4">
                Nos Trois <span className="italic text-[#C4993A]">Piliers</span>
              </h2>
              <p className="text-[#F5F2EC]/60 uppercase tracking-[0.15em] text-xs">Une approche holistique pour le praticien moderne</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Volet 1: Côté Académique (The main feature) - Now on the Left */}
              <div className="relative bg-gradient-to-b from-[#122412] to-[#0D1A0D] border border-[#D4AF37]/40 backdrop-blur-md p-10 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(196,153,58,0.1)] lg:mt-0 lg:row-span-2">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[60px] pointer-events-none"></div>
                
                <div className="flex items-center justify-between mb-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent flex items-center justify-center border border-[#D4AF37]/50">
                    <GraduationCap className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                  </div>
                  <span className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] tracking-widest uppercase rounded-full">
                    Premium
                  </span>
                </div>

                <h3 className="font-['Cormorant_Garamond',serif] text-4xl font-light mb-4 text-[#F1D382]">Côté Académique</h3>
                <p className="text-[#F5F2EC]/70 text-sm leading-relaxed mb-10">
                  Le cœur de Dental Fairies. Un écosystème de formation complet pensé pour propulser votre carrière au niveau supérieur.
                </p>

                <div className="flex flex-col gap-4">
                  <Link href="/webinaires" className="group flex items-center p-4 rounded-lg bg-[#1A331A]/40 border border-transparent hover:border-[#D4AF37]/30 hover:bg-[#1A331A] transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-[#091209] flex items-center justify-center mr-4">
                      <Video className="w-5 h-5 text-[#D4AF37]/80" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Webinaires</h4>
                      <p className="text-xs text-[#F5F2EC]/50">Masterclasses en direct avec nos experts</p>
                    </div>
                    <ChevronRight className="w-4 h-4 ml-auto text-[#D4AF37]/0 group-hover:text-[#D4AF37] transition-all" />
                  </Link>

                  <Link href="/workshops" className="group flex items-center p-4 rounded-lg bg-[#1A331A]/40 border border-transparent hover:border-[#D4AF37]/30 hover:bg-[#1A331A] transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-[#091209] flex items-center justify-center mr-4">
                      <Users className="w-5 h-5 text-[#D4AF37]/80" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Workshops</h4>
                      <p className="text-xs text-[#F5F2EC]/50">Ateliers pratiques en présentiel</p>
                    </div>
                    <ChevronRight className="w-4 h-4 ml-auto text-[#D4AF37]/0 group-hover:text-[#D4AF37] transition-all" />
                  </Link>

                  <Link href="/vip" className="group flex items-center p-4 rounded-lg bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-[#091209] flex items-center justify-center mr-4 border border-[#D4AF37]/50">
                      <Star className="w-5 h-5 text-[#D4AF37]" fill="rgba(212,175,55,0.2)" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#F1D382] mb-1">Coaching VIP</h4>
                      <p className="text-xs text-[#F5F2EC]/60">Accompagnement 1:1 sur mesure</p>
                    </div>
                    <ChevronRight className="w-4 h-4 ml-auto text-[#D4AF37]/0 group-hover:text-[#D4AF37] transition-all" />
                  </Link>

                  <Link href="/mindshares" className="group flex items-center p-4 rounded-lg bg-[#1A331A]/40 border border-transparent hover:border-[#D4AF37]/30 hover:bg-[#1A331A] transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-[#091209] flex items-center justify-center mr-4">
                      <BookOpen className="w-5 h-5 text-[#D4AF37]/80" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Mindshares</h4>
                      <p className="text-xs text-[#F5F2EC]/50">Cas cliniques et communauté</p>
                    </div>
                    <ChevronRight className="w-4 h-4 ml-auto text-[#D4AF37]/0 group-hover:text-[#D4AF37] transition-all" />
                  </Link>
                </div>
              </div>

              {/* Volet 2: Podcasts - Now in Middle */}
              <Link href="/podcasts" className="group relative bg-[#122412]/50 border border-[#D4AF37]/20 backdrop-blur-md p-10 rounded-xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-500 flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-[40px] group-hover:bg-[#D4AF37]/20 transition-all duration-500"></div>
                <div className="w-16 h-16 rounded-full bg-[#1A331A] flex items-center justify-center border border-[#D4AF37]/30 mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Mic className="w-7 h-7 text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                <h3 className="font-['Cormorant_Garamond',serif] text-3xl font-light mb-4">Podcasts</h3>
                <p className="text-[#F5F2EC]/60 text-sm leading-relaxed mb-8 flex-grow">
                  Insights cliniques, innovations et expériences de terrain. Des conversations inspirantes avec des leaders de la dentisterie, chaque semaine.
                </p>
                <div className="flex items-center text-[#D4AF37] text-xs tracking-widest uppercase font-medium mt-auto">
                  Écouter <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>

              {/* Volet 3: Comptoir Dentaire - Now on the Right */}
              <Link href="/boutique" className="group relative bg-[#122412]/50 border border-[#D4AF37]/20 backdrop-blur-md p-10 rounded-xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-500 flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-[40px] group-hover:bg-[#D4AF37]/20 transition-all duration-500"></div>
                <div className="w-16 h-16 rounded-full bg-[#1A331A] flex items-center justify-center border border-[#D4AF37]/30 mb-8 group-hover:scale-110 transition-transform duration-500">
                  <ShoppingBag className="w-7 h-7 text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                <h3 className="font-['Cormorant_Garamond',serif] text-3xl font-light mb-4">Comptoir Dentaire</h3>
                <p className="text-[#F5F2EC]/60 text-sm leading-relaxed mb-8 flex-grow">
                  Une sélection rigoureuse d'équipements, de consommables et de ressources pédagogiques recommandés par nos experts pour l'excellence au quotidien.
                </p>
                <div className="flex items-center text-[#D4AF37] text-xs tracking-widest uppercase font-medium mt-auto">
                  Découvrir <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="border-y border-[#D4AF37]/20 bg-[#0A140A]/80 backdrop-blur-md py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-[#D4AF37]/20">
            <div className="text-center px-4">
              <div className="font-['Cormorant_Garamond',serif] text-5xl text-[#C4993A] mb-2">500+</div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#F5F2EC]/50">Praticiens Formés</div>
            </div>
            <div className="text-center px-4">
              <div className="font-['Cormorant_Garamond',serif] text-5xl text-[#C4993A] mb-2">48</div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#F5F2EC]/50">Ateliers Réalisés</div>
            </div>
            <div className="text-center px-4">
              <div className="font-['Cormorant_Garamond',serif] text-5xl text-[#C4993A] mb-2">12</div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#F5F2EC]/50">Experts Formateurs</div>
            </div>
            <div className="text-center px-4">
              <div className="font-['Cormorant_Garamond',serif] text-5xl text-[#C4993A] mb-2">96%</div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#F5F2EC]/50">Taux de Satisfaction</div>
            </div>
          </div>
        </section>

        {/* Testimonials - Styled elegantly */}
        <section className="py-24 px-4 overflow-hidden relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl font-light mb-4">
                Ce que disent nos <span className="italic text-[#C4993A]">Membres</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#122412]/40 border border-[#D4AF37]/10 p-8 rounded-xl relative">
                <div className="absolute top-6 right-8 text-6xl text-[#D4AF37]/10 font-serif">"</div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#D4AF37]" fill="#D4AF37" />)}
                </div>
                <p className="font-['Cormorant_Garamond',serif] text-xl italic text-[#F5F2EC]/80 mb-8">
                  "Le coaching VIP 1:1 a été un vrai tournant dans ma carrière. Programme sur mesure, suivi rigoureux, résultats concrets."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1A331A] flex items-center justify-center border border-[#D4AF37]/30 text-xs text-[#D4AF37]">YB</div>
                  <div>
                    <div className="text-sm text-white">Dr. Yacine B.</div>
                    <div className="text-[10px] text-[#F5F2EC]/50 uppercase tracking-wider">Chirurgien-dentiste</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#122412]/40 border border-[#D4AF37]/10 p-8 rounded-xl relative md:-translate-y-4">
                <div className="absolute top-6 right-8 text-6xl text-[#D4AF37]/10 font-serif">"</div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#D4AF37]" fill="#D4AF37" />)}
                </div>
                <p className="font-['Cormorant_Garamond',serif] text-xl italic text-[#F5F2EC]/80 mb-8">
                  "L'atelier sur l'implantologie a transformé ma pratique. Le niveau des formateurs est exceptionnel."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1A331A] flex items-center justify-center border border-[#D4AF37]/30 text-xs text-[#D4AF37]">KA</div>
                  <div>
                    <div className="text-sm text-white">Dr. Karima A.</div>
                    <div className="text-[10px] text-[#F5F2EC]/50 uppercase tracking-wider">Omnipraticienne</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#122412]/40 border border-[#D4AF37]/10 p-8 rounded-xl relative">
                <div className="absolute top-6 right-8 text-6xl text-[#D4AF37]/10 font-serif">"</div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#D4AF37]" fill="#D4AF37" />)}
                </div>
                <p className="font-['Cormorant_Garamond',serif] text-xl italic text-[#F5F2EC]/80 mb-8">
                  "La plateforme Mindshares est devenue ma source de veille principale. Articles pertinents, utiles au quotidien."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1A331A] flex items-center justify-center border border-[#D4AF37]/30 text-xs text-[#D4AF37]">MR</div>
                  <div>
                    <div className="text-sm text-white">Dr. Mohamed R.</div>
                    <div className="text-[10px] text-[#F5F2EC]/50 uppercase tracking-wider">Parodontologiste</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0D1A0D]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(196,153,58,0.08)_0%,transparent_60%)] pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <h2 className="font-['Cormorant_Garamond',serif] text-5xl md:text-6xl font-light mb-8">
              Prêt à entrer dans <span className="italic text-[#C4993A]">l'Académie ?</span>
            </h2>
            <p className="text-[#F5F2EC]/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              Rejoignez des centaines de praticiens qui ont choisi l'excellence. Accès immédiat aux Mindshares et au réseau exclusif dès l'inscription.
            </p>
            <Link href="/register" className="inline-block px-12 py-5 bg-gradient-to-r from-[#C4993A] to-[#8B6820] text-[#091209] font-medium tracking-[0.2em] uppercase text-sm hover:shadow-[0_0_40px_rgba(196,153,58,0.5)] transition-all duration-300 transform hover:-translate-y-1 rounded-sm">
              Créer mon compte
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-[#D4AF37]/20 bg-[#091209] pt-20 pb-10 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <img src="/logo-transparent.png" alt="Dental Fairies" className="h-20 mb-6 drop-shadow-[0_0_15px_rgba(196,153,58,0.3)]" />
              <p className="text-[#F5F2EC]/50 text-xs leading-relaxed">
                Une académie premium dédiée à l'excellence en dentisterie. Formez-vous, grandissez, transmettez.
              </p>
            </div>
            
            <div>
              <h4 className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase mb-6">Programmes</h4>
              <ul className="space-y-4 text-xs text-[#F5F2EC]/60">
                <li><Link href="/podcasts" className="hover:text-[#D4AF37] transition-colors">Podcasts</Link></li>
                <li><Link href="/webinaires" className="hover:text-[#D4AF37] transition-colors">Webinaires</Link></li>
                <li><Link href="/workshops" className="hover:text-[#D4AF37] transition-colors">Ateliers Pratiques</Link></li>
                <li><Link href="/vip" className="hover:text-[#D4AF37] transition-colors">Coaching VIP</Link></li>
                <li><Link href="/mindshares" className="hover:text-[#D4AF37] transition-colors">Mindshares</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase mb-6">Académie</h4>
              <ul className="space-y-4 text-xs text-[#F5F2EC]/60">
                <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">À propos</Link></li>
                <li><Link href="/formateurs" className="hover:text-[#D4AF37] transition-colors">Formateurs</Link></li>
                <li><Link href="/boutique" className="hover:text-[#D4AF37] transition-colors">Comptoir Dentaire</Link></li>
                <li><Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase mb-6">Légal</h4>
              <ul className="space-y-4 text-xs text-[#F5F2EC]/60">
                <li><Link href="/mentions" className="hover:text-[#D4AF37] transition-colors">Mentions légales</Link></li>
                <li><Link href="/confidentialite" className="hover:text-[#D4AF37] transition-colors">Politique de confidentialité</Link></li>
                <li><Link href="/cgv" className="hover:text-[#D4AF37] transition-colors">CGV</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto border-t border-[#D4AF37]/10 pt-8 flex justify-center">
            <span className="text-[#F5F2EC]/40 text-[10px] tracking-[0.2em] uppercase">
              © {new Date().getFullYear()} ACADEMY • L'EXCELLENCE DENTAIRE
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
