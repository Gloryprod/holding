import { ArrowRight, Leaf, Handshake } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full    min-h-150 flex items-center justify-center overflow-hidden no-scrollbar">
      
      {/* 1. Visuel de Fond avec Overlay pour le contraste */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero3.jpg" // Assure-toi d'avoir une image de fond dans le dossier public
          alt="Background"
          layout="fill"
          className="w-full h-full object-cover"
        />
        {/* Overlay dégradé pour garantir la lisibilité du texte */}
        <div className="absolute inset-0 bg-background/60 md:bg-background/60 backdrop-blur-4xl"></div>
      </div>

      {/* 2. Contenu Textuel */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-32 flex flex-col items-center text-center">
        
        {/* Petit Badge "Synergie" avec ton Vert */}
        <div className="inline-flex items-center gap-2 border border-brand/20 bg-brand/5 px-4 py-1.5 rounded-full mb-8">
          <Leaf className="w-4 h-4 text-brand" />
          <span className="text-xs font-semibold text-brand-foreground md:text-brand tracking-wide uppercase">
            Écosystème Multi-Secteurs
          </span>
        </div>

        {/* TITRE : Le nom de la Holding */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-foreground tracking-tighter leading-[0.95] mb-6">
          Obed <span className="text-brand">Group</span>
        </h1>

        {/* SLOGAN : La phrase d'accroche */}
        <p className="max-w-3xl text-xl md:text-2xl text-muted-foreground font-medium mb-12 leading-relaxed">
            Une holding unique regroupant une ONG, une Coopérative et des SARL pour une synergie 
            durable au service du développement et de l&apos;innovation.        
        </p>

        {/* 3. Boutons d'Appel à l'Action (CTA) */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          
          {/* CTA Principal : Ton Vert Riche */}
          <a 
            href="#features" 
            className="group inline-flex items-center gap-2.5 bg-brand text-brand-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-lg shadow-brand/10"
          >
            Découvrir nos filiales
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* CTA Secondaire : Transparent */}
          <a 
            href="#about" 
            className="group inline-flex items-center gap-2.5 text-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:text-brand transition-colors"
          >
            Investisseurs & Partenaires
            <Handshake className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:text-brand transition-all" />
          </a>
        </div>
      </div>

      {/* 4. Petite décoration de fond subtile (optionnelle) */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-background to-transparent z-10"></div>
    </section>
  );
}