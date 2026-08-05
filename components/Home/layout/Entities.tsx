import { Heart, Sprout, Building2, Briefcase, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import * as Icons from "lucide-react";

interface Entreprise {
  nom: string;
  tagline: string;
  description: string;
  iconName: string;
  slug: { current: string };
  image: string; // On suppose que l'image est gérée à part ou via un champ supplémentaire
  mission: string;
  adresse: string;
  telephone: string;
  email: string;
  services: {
    titre: string;
    description: string;
  }[]

}

export default function Entities({ data }: { data: Entreprise }) {
  return (
    <section id="features" className="py-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Grille responsive : 1 colonne sur mobile, 5 colonnes sur desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-16 items-center">
          
          {/* Panneau des images — Colonne GAUCHE sur grand écran */}
          {/* pl-8 ou pl-12 réserve l'espace nécessaire pour que la petite image superposée ne sorte pas de l'écran */}
          <div className="relative order-last lg:order-first lg:col-span-2 flex items-center justify-center lg:justify-start pl-8 sm:pl-12 lg:pl-8 py-6">
            
            {/* Conteneur du collage */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] hover:scale-[1.02] transition-transform duration-300">
              
              {/* 1. Image principale (Arrière-plan, décalée vers la droite) */}
              <div className="w-full h-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={data.image} 
                  alt={data.nom}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* 2. Petite image (Premier plan, chevauchement parfait sur le coin inférieur gauche) */}
              {/* Positionnée de manière à rester dans les limites sécurisées du conteneur parent */}
              <div className="absolute -bottom-6 -left-8 sm:-left-12 z-10 w-[140px] sm:w-[170px] aspect-[3/4] rotate-[-6deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
                <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl border-4 border-background">
                  <Image
                    src="/hero5.jpg" 
                    alt={data.nom}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Panneau de texte — Colonne DROITE sur grand écran */}
          <div className="flex flex-col lg:col-span-3 order-first lg:order-last">
            
            {/* Titre de section */}
            <h1 className="text-3xl font-heading font-bold text-foreground flex items-center gap-3 mb-6">
              <Icons.EarthLockIcon className="text-brand w-8 h-8" /> 
              À propos de nous !
            </h1>
            
            {/* Description principale */}
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              {data.description}
            </p>

            {/* Section Mission & Vision */}
            <div className="border-l-2 border-brand/40 pl-4 py-1">
              <h2 className="text-xl font-bold text-brand mb-3 font-geist">
                Mission & Vision
              </h2>
              <p className="text-muted-foreground/90 leading-relaxed">
                {data.mission}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}