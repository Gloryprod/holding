'use client';

import { Journey } from "@/components/About/Journey";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { getLocale } from "@/lib/getLocal";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

// Fonction utilitaire pour récupérer la paire d'images selon le type d'entité
function getEntityImages(typeEntite?: string) {
  switch (typeEntite) {
    case 'social':
      return {
        img1: '/social1.jpg',
        img2: '/social2.jpg',
      };
    case 'business':
      return {
        img1: '/business1.jpg',
        img2: '/business2.jpg',
      };
    case 'cooperative':
      return {
        img1: '/cooperative1.jpg',
        img2: '/cooperative2.jpg',
      };
    default:
      return {
        img1: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800',
        img2: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800',
      };
  }
}

// Variants Framer Motion
const textContainerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const imageContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutClient({ data }: { data: any }) {
  const { language } = useLanguage();

  // Extraction sécurisée des champs traduisibles provenant du CMS
  const tagline = getLocale(data?.tagline, language);
  const nom = getLocale(data?.nom, language);
  const mission = getLocale(data?.mission, language);

  // Résolution propre des images à afficher
  const images = getEntityImages(data?.typeEntite);

  return (
    <main className="relative overflow-x-hidden min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* ARRIÈRE-PLAN DYNAMIQUE ANIMÉ */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Glow Sphère 1 (Haut/Gauche) */}
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand/15 dark:bg-brand/20 blur-3xl opacity-70"
        />

        {/* Glow Sphère 2 (Centre/Droite) */}
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 1.2, 0.85, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-3xl opacity-60"
        />

        {/* Glow Sphère 3 (Bas/Gauche) */}
        <motion.div
          animate={{
            x: [0, 30, -40, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-32 left-1/4 w-[28rem] h-[28rem] rounded-full bg-brand/10 dark:bg-brand/15 blur-3xl opacity-50"
        />

        {/* Grille texturée en superposition ultra-subtile */}
        <div className="absolute inset-0 bg-[radial-gradient(#opacity-10_1px,transparent_1px)] [background-size:24px_24px] opacity-10 dark:opacity-20" />
      </div>

      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Texte à gauche avec animations séquentielles */}
            <motion.div 
              variants={textContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:w-1/2 space-y-8"
            >
              <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                {language === 'fr' ? 'Notre Engagement' : 'Our Commitment'}
              </motion.div>

              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-heading font-black text-foreground leading-[1.1]">
                {tagline || (
                  language === 'fr' 
                    ? `Bâtir l'avenir avec ${nom || ''}` 
                    : `Building the future with ${nom || ''}`
                )}
              </motion.h2>

              <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6 pt-4">
                {/* Section Mission */}
                <div className="border-l-2 border-brand pl-6 transition-all duration-300 hover:border-l-4">
                  <h3 className="font-bold text-foreground uppercase text-xs tracking-wider">
                    {language === 'fr' ? 'Notre Mission' : 'Our Mission'}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {mission}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Visuel à droite avec grille animée */}
            <div className="lg:w-1/2 relative w-full">
              <motion.div 
                variants={imageContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-2 gap-4"
              >
                <motion.div variants={imageVariants} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Image
                    src={images.img1}
                    className="rounded-2xl aspect-square object-cover mt-12 shadow-md hover:shadow-xl transition-shadow duration-300 w-full"
                    width={800}
                    height={600}
                    alt={language === 'fr' ? 'Collaboration' : 'Collaboration'}
                  />
                </motion.div>

                <motion.div variants={imageVariants} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Image
                    src={images.img2}
                    className="rounded-2xl aspect-square object-cover shadow-md hover:shadow-xl transition-shadow duration-300 w-full"
                    width={800}
                    height={600}
                    alt={language === 'fr' ? 'Bureau' : 'Office'}
                  />
                </motion.div>
              </motion.div>

              {/* Halo lumineux localisé derrière la grille d'images */}
              <motion.div 
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand/10 rounded-full blur-3xl pointer-events-none" 
              />
            </div>

          </div>
        </div>
      </section>

      <div className="relative z-10">
        <Journey data={data} />
      </div>
    </main>
  );
}