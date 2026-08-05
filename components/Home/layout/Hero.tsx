"use client";

import { ArrowRight, Sparkles, Heart, Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface Entreprise {
  nom: string;
  tagline: string;
  description: string;
  iconName: string;
  slug: string;
  image: string;
  typeEntite: 'business' | 'social' | 'cooperative';
}

export default function Hero({ data }: { data: Entreprise }) {
  const type = data.typeEntite || 'business';

  // --- DESIGN 1 : BUSINESS ---
  if (type === 'business') {
    return (
      <section className="relative min-h-screen flex items-center text-foreground overflow-hidden font-inter py-20 lg:py-0 transition-colors duration-300 mt-16">
      
      {/* Arrière-plan : Lueurs radiales adaptatives (plus discrètes en mode clair) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand/10 dark:bg-brand/10 blur-[120px] opacity-70 dark:opacity-100" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] opacity-70 dark:opacity-100" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Colonne gauche : Contenu textuel & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Badge de surbrillance moderne */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-muted/50 dark:bg-white/5 border border-border dark:border-white/10 text-muted-foreground dark:text-white/80 text-xs font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              <span className="uppercase tracking-widest text-[10px] font-semibold font-geist">Innovation Digitale</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight font-geist leading-[1.1] mb-6">
              {data.nom}
            </h1>
            
            {/* Tagline / Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed font-light">
              Hygiène, recyclage, agrobusiness et hôtellerie : une même ambition, transformer durablement le territoire béninois.
            </p>

            {/* Double Bouton d'Action (CTA) */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/about" className="w-full sm:w-auto">
                {/* On s'appuie sur la variable brand-rgb pour l'ombre fluide au survol */}
                <button className="cursor-pointer group relative w-full sm:w-auto px-8 py-4 bg-brand text-brand-foreground rounded-xl font-bold font-geist uppercase tracking-wider text-xs overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--brand-rgb,74,222,128),0.35)] hover:-translate-y-0.5 active:translate-y-0">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Découvrir nos projets 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </Link>
              
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="cursor-pointer w-full sm:w-auto px-8 py-4 bg-muted/60 hover:bg-muted text-foreground border border-border hover:border-brand/30 dark:hover:border-white/20 rounded-xl font-bold font-geist uppercase tracking-wider text-xs transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm">
                  Nous contacter
                </button>
              </Link>
            </div>

            {/* Section Statistiques / Réassurance épurée */}
            <div className="flex items-center gap-8 pt-8 border-t border-border max-w-md">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-foreground">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/75 font-bold mt-1">Digitalisé</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-foreground">B2B</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/75 font-bold mt-1">Standard</span>
              </div>
            </div>

          </div>

          {/* Colonne droite : Showcase visuel dynamique */}
          <div className="lg:col-span-5 relative w-full h-[350px] sm:h-[450px] lg:h-[500px] flex items-center justify-center">
            
            {/* Effet lumineux derrière l'image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-blue-500/20 rounded-3xl filter blur-2xl opacity-70 dark:opacity-50 animate-pulse duration-[4000ms]" />
            
            {/* Cadre de l'image de marque */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border shadow-2xl shadow-muted/30 dark:shadow-black/80 group">
              <Image 
                src={urlFor(data.image).url()} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                alt={data.nom} 
                priority 
              />
              {/* Masque dégradé subtil sur le bas de l'image */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-80" />
              
              {/* Mini carte flottante interactive en bas de l'image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-background/95 dark:bg-slate-950/85 backdrop-blur-md border border-border dark:border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-brand uppercase font-bold tracking-wider">Devise</p>
                  <h4 className="text-sm font-bold text-foreground dark:text-white">{data.tagline}</h4>
                </div>
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Transition douce vers la section suivante */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      </section>
    );
  }

  // --- DESIGN 2 : SOCIAL (Split Layout - Chaleureux & Humain) ---
  if (type === 'social') {
    return (
      <section className="relative min-h-[90vh] flex items-center bg-background py-22 lg:py-0 transition-colors duration-300 font-inter mt-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center mb-8">
              <Heart className="w-8 h-8 text-brand fill-brand/20" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6 leading-[1.1] font-geist">
              {data.nom} : <span className="text-brand">Agir</span> pour demain.
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Des solutions innovantes face aux défis environnementaux et climatiques, au plus près des communautés béninoises.
            </p>
            <div className=" items-center">
              <Link href="/about">
                <button className="cursor-pointer bg-brand text-brand-foreground px-10 py-5 rounded-2xl font-black shadow-xl shadow-brand/20 hover:-translate-y-1 transition-all font-geist uppercase tracking-tight">
                  Nos Projets
                </button>
              </Link> 
            </div>
          </div>
          
          <div className="order-2 lg:order-1 relative h-125 w-full">
            <div className="absolute inset-0 bg-brand/10 rounded-[3rem] -rotate-3 scale-105" />
            <Image 
              src={urlFor(data.image).url()} 
              fill 
              className="object-cover rounded-[2.5rem] shadow-2xl relative z-10 border-4 border-background" 
              alt="Social Impact"
            />
            <div className="absolute -bottom-6 -left-6 bg-brand text-brand-foreground p-8 rounded-[2rem] shadow-2xl z-20 hidden md:block animate-bounce-slow">
              <p className="text-3xl font-black font-geist">10k+</p>
              <p className="text-xs uppercase font-bold opacity-80 tracking-widest font-geist">Vies impactées</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- DESIGN 3 : COOPERATIVE (Asymétrique, Organique, Artisanal) ---
  if (type === 'cooperative') {
    return (
      <section className="relative mt-20 py-22 min-h-[90vh] flex items-center bg-background  lg:py-0 overflow-hidden font-inter transition-colors duration-300">
        {/* Décoration organique en fond utilisant la couleur accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/30 rounded-l-[100px] -mr-20 hidden lg:block -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-130 group order-2 lg:order-1">
            <div className="absolute inset-0  border-4 border-brand/20 rounded-[3rem] translate-x-6 translate-y-6 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-500" />
              <div className="relative h-full w-full overflow-hidden rounded-[3rem]">
                  <Image 
                  src={urlFor(data.image).url()} 
                  fill 
                  className="object-cover transition-all duration-700 group-hover:scale-110" 
                  alt="Producteurs"
                  />
              </div>
          </div>

          <div className="lg:pl-12 order-1 lg:order-2">
            <span className="flex items-center gap-3 text-amber-600 dark:text-amber-500 font-black mb-6 uppercase tracking-widest text-sm font-geist">
              <Sprout className="w-6 h-6" /> Force Collective
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-8 font-geist leading-[0.9]">
              {data.nom}
            </h1>
            <div className="relative mb-12">
                <p className="text-2xl text-muted-foreground italic border-l-8 border-brand pl-8 py-2 leading-relaxed">
                &quot;Une coopérative de producteurs qui allie innovation et solidarité pour une agriculture qui respecte la terre.&quot;
                </p>
            </div>
            
            <div className="flex items-center justify-left text-center gap-6">
              <Link href="/about">
                <button className="cursor-pointer bg-brand text-brand-foreground p-6 rounded-2xl font-black flex flex-col items-center group hover:shadow-xl transition-all font-geist uppercase">
                  <span className="text-[10px] opacity-70 tracking-[0.2em] mb-1">Explorer</span>
                  Nos Projets
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}