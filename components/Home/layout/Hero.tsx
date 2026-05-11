"use client";

import { ArrowRight, Handshake, Heart, Sprout } from "lucide-react";
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

  // --- DESIGN 1 : BUSINESS (Sombre, Imposant, Épuré) ---
  if (type === 'business') {
    return (
      <section className="relative py-28 flex items-center bg-slate-950 overflow-hidden font-inter">
        {/* Background : Image avec masque de dégradé latéral pour laisser place au texte */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={urlFor(data.image).url()} 
            fill 
            className="object-cover " 
            alt={data.nom} 
            priority 
          />
          {/* Masque pour assurer la lisibilité du texte à gauche */}
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/30 to-transparent" />
        </div>

        <div className="container mx-auto p-32 relative z-10">
          <div className="max-w-3xl">

            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight font-geist leading-[0.9]">
              {data.nom}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-xl border-l-2 border-brand/30 pl-6">
              {data.tagline}
            </p>

            <div className="flex flex-wrap gap-5">
              <button className="group relative px-8 py-4 bg-brand text-brand-foreground rounded-lg font-black font-geist uppercase tracking-tighter overflow-hidden transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  Découvrir l&apos;expertise <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Effet de reflet au survol */}
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-lg font-bold font-geist uppercase tracking-tighter hover:bg-white/10 transition-all backdrop-blur-sm">
                Nos Projets
              </button>
            </div>

            {/* Petits indicateurs de confiance en bas (Optionnel) */}
            <div className="mt-20 pt-10 border-t border-white/10 flex gap-12 items-center opacity-50">
               <div className="text-white text-sm">
                  <p className="font-black text-xl">100%</p>
                  <p className="uppercase text-[10px] tracking-widest">Digitalisé</p>
               </div>
               <div className="text-white text-sm">
                  <p className="font-black text-xl">B2B</p>
                  <p className="uppercase text-[10px] tracking-widest">Standard</p>
               </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-background to-transparent z-10"></div>
      </section>
    );
  }

  // --- DESIGN 2 : SOCIAL (Split Layout - Chaleureux & Humain) ---
  if (type === 'social') {
    return (
      <section className="relative min-h-[90vh] flex items-center bg-background p-28 lg:py-0 transition-colors duration-300 font-inter mt-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center mb-8">
              <Heart className="w-8 h-8 text-brand fill-brand/20" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 leading-[1.1] font-geist">
              {data.nom} : <span className="text-brand">Agir</span> pour demain.
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              {data.tagline}
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <button className="bg-brand text-brand-foreground px-10 py-5 rounded-2xl font-black shadow-xl shadow-brand/20 hover:-translate-y-1 transition-all font-geist uppercase tracking-tight">
                Nos Actions
              </button>
              <button className="text-foreground font-bold px-4 py-4 flex items-center gap-2 group font-geist uppercase tracking-tight">
                Devenir bénévole 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform text-brand" />
              </button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative h-125 w-full">
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
      <section className="relative mt-20 min-h-[90vh] flex items-center bg-background p-28 lg:py-0 overflow-hidden font-inter transition-colors duration-300">
        {/* Décoration organique en fond utilisant la couleur accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/30 rounded-l-[100px] -mr-20 hidden lg:block -z-10" />
        
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-150 group order-2 lg:order-1">
            <div className="absolute inset-0 border-4 border-brand/20 rounded-[3rem] translate-x-6 translate-y-6 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-500" />
            <div className="relative h-full w-full overflow-hidden rounded-[3rem] shadow-2xl">
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
            <h1 className="text-5xl md:text-8xl font-black text-foreground mb-8 font-geist leading-[0.9]">
              {data.nom}
            </h1>
            <div className="relative mb-12">
                <p className="text-2xl text-muted-foreground italic border-l-8 border-brand pl-8 py-2 leading-relaxed">
                &quot;{data.tagline}&quot;
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button className="bg-brand text-brand-foreground p-6 rounded-2xl font-black flex flex-col items-center group hover:shadow-xl transition-all font-geist uppercase">
                <span className="text-[10px] opacity-70 tracking-[0.2em] mb-1">Explorer</span>
                Nos Produits
              </button>
              <button className="bg-foreground text-background p-6 rounded-2xl font-black flex flex-col items-center hover:opacity-90 transition-all font-geist uppercase">
                <span className="text-[10px] opacity-70 tracking-[0.2em] mb-1">Collaborer</span>
                Rejoindre la Coop
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}