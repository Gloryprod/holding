'use client';

import Image from "next/image";
import * as Icons from "lucide-react";
import { motion, type Variants } from "framer-motion";

// Context d'Internationalisation et utilitaire
import { useLanguage } from "@/context/LanguageContext";
import { getLocale } from "@/lib/getLocal";

type LocalizedString = string | { fr?: string; en?: string };

interface Entreprise {
  nom: LocalizedString;
  tagline?: LocalizedString;
  description: LocalizedString;
  iconName?: string;
  slug?: { current: string } | string;
  image: string;
  mission: LocalizedString;
  adresse?: LocalizedString;
  telephone?: string;
  email?: string;
  services?: {
    titre: LocalizedString;
    description: LocalizedString;
  }[];
}

// Variantes d'animation réutilisables
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

export default function Entities({ data }: { data: Entreprise }) {
  const { language } = useLanguage();

  // Traitement des données localisées venant du CMS
  const nom = getLocale(data?.nom, language);
  const description = getLocale(data?.description, language);
  const mission = getLocale(data?.mission, language);

  return (
    <section id="features" className="py-20 bg-background overflow-hidden relative">
      {/* Fond décoratif animé très subtil */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Grille responsive : 1 colonne sur mobile, 5 colonnes sur desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          
          {/* Panneau des images — Colonne GAUCHE sur grand écran */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInLeft}
            className="relative order-last lg:order-first lg:col-span-2 flex items-center justify-center lg:justify-start pl-8 sm:pl-12 lg:pl-8 py-6"
          >
            
            {/* Conteneur du collage */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] group">
              
              {/* 1. Image principale */}
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl border border-border/50 relative">
                <Image
                  src={data.image} 
                  alt={nom || "Image d'entreprise"}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                {/* Overlay gradient au survol */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* 2. Petite image (Premier plan) avec animation flottante continue */}
              <motion.div 
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="absolute -bottom-6 -left-8 sm:-left-12 z-10 w-36 sm:w-44 aspect-[3/4] rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border-4 border-background relative">
                  <Image
                    src="/hero5.jpg" 
                    alt={nom || "Image d'illustration"}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Petit badge décoratif ou ombre portée lumineuse */}
              <div className="absolute -bottom-10 -right-6 -z-10 w-48 h-48 bg-brand/20 rounded-full blur-2xl" />
            </div>

          </motion.div>

          {/* Panneau de texte — Colonne DROITE sur grand écran */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerStagger}
            className="flex flex-col lg:col-span-3 order-first lg:order-last"
          >
            
            {/* Titre de section */}
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-heading font-bold text-foreground flex items-center gap-3 mb-6"
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-2 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0"
              >
                <Icons.EarthLock className="w-7 h-7 sm:w-8 sm:h-8" />
              </motion.div> 
              <span>{language === 'fr' ? 'À propos de nous !' : 'About Us!'}</span>
            </motion.h1>
            
            {/* Description principale */}
            <motion.p 
              variants={fadeInUp}
              className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Section Mission & Vision (Carte stylisée avec bordure animée au survol) */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative p-6 rounded-2xl bg-muted/40 border-l-4 border-brand backdrop-blur-sm hover:bg-muted/70 transition-colors duration-300 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
                <h2 className="text-xl font-bold text-brand font-geist tracking-wide">
                  {language === 'fr' ? 'Mission & Vision' : 'Mission & Vision'}
                </h2>
              </div>
              <p className="text-muted-foreground/90 leading-relaxed text-sm md:text-base">
                {mission}
              </p>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}