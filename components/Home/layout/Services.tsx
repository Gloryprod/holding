'use client';

import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

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

// Variantes d'animations pour le conteneur principal (Cascade)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Variantes d'animations pour chaque carte de service
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Services({ data }: { data: Entreprise }) {
  const { language } = useLanguage();

  if (!data?.services || data.services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-20 bg-muted/20 relative overflow-hidden">
      {/* Halo lumineux décoratif en arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-10">
          
          {/* Titre de section */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-2.5 rounded-2xl bg-brand/10 text-brand flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Icons.Layers className="w-6 h-6" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              {language === 'fr' ? 'Nos Services' : 'Our Services'}
            </h3>
          </motion.div>

          {/* Grille de cartes de services animées */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data.services.map((service, i: number) => {
              const titre = getLocale(service.titre, language);
              const description = getLocale(service.description, language);
              const formattedIndex = i < 9 ? `0${i + 1}` : `${i + 1}`;

              return (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative p-8 bg-background rounded-3xl border border-border/80 shadow-sm hover:border-brand/50 hover:shadow-2xl hover:shadow-brand/10 transition-colors duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Effet d'éclairage interne au survol */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 flex items-start gap-4">
                    {/* Badge Numérique */}
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="mt-1 shrink-0 w-9 h-9 rounded-2xl bg-brand/10 text-brand font-bold text-xs flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors duration-300 shadow-sm"
                    >
                      {formattedIndex}
                    </motion.div>

                    {/* Contenu texte */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-lg text-foreground group-hover:text-brand transition-colors duration-300 font-heading">
                        {titre}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>

                  {/* Petite flèche indicator en bas à droite au survol */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-border/40 flex items-center justify-end text-brand opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <Icons.ArrowUpRight className="w-5 h-5" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}