'use client';

import Image from "next/image";
import * as Icons from "lucide-react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { useLanguage } from "@/context/LanguageContext";
import { getLocale } from "@/lib/getLocal";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

type LocalizedString = string | { fr?: string; en?: string };

interface Projet {
  slug: { current: string };
  titre: LocalizedString;
  description: LocalizedString;
  statut: string;
  imagePrincipale: string;
}

interface Entreprise {
  nom: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  iconName: string;
  slug: { current: string };
  image: string;
  mission: LocalizedString;
  adresse: string;
  telephone: string;
  email: string;
  services: {
    titre: LocalizedString;
    description: LocalizedString;
  }[];
  projets: Projet[];
}

// Variants Framer Motion pour la grille et les cartes
const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Journey({ data }: { data: Entreprise }) {
  const { language } = useLanguage();

  // Dictionnaire de traduction pour le statut d'avancement
  const formatStatut = (statutRaw: string) => {
    if (!statutRaw) return '';

    const labels: Record<string, { fr: string; en: string }> = {
      'en-cours': { fr: 'En cours', en: 'In Progress' },
      'termine': { fr: 'Terminé', en: 'Completed' },
      'levee-de-fonds': { fr: 'En levée de fonds', en: 'Fundraising' },
    };

    const key = statutRaw.toLowerCase();
    if (labels[key]) {
      return labels[key][language as 'fr' | 'en'] || labels[key].fr;
    }

    return statutRaw.replace(/-/g, ' ');
  };

  return (
    <section className="py-12 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* En-tête de section animé */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col text-center md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <h3 className="text-4xl md:text-4xl font-heading font-bold">
              {language === 'fr' ? 'Projets Majeurs' : 'Major Projects'}
            </h3>
          </div>
          <div className="text-muted-foreground font-medium">
            {data.projets?.length || 0}{' '}
            {language === 'fr' 
              ? `Réalisation${(data.projets?.length || 0) > 1 ? 's' : ''} répertoriée${(data.projets?.length || 0) > 1 ? 's' : ''}`
              : `Listed Project${(data.projets?.length || 0) > 1 ? 's' : ''}`
            }
          </div>
        </motion.div>
        
        {/* Grille de cartes animée */}
        {data.projets && data.projets.length > 0 ? (
          <motion.div 
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {data.projets.map((projet, index) => {
              // Extraction des champs bilingues
              const titreProjet = getLocale(projet.titre, language);
              const descriptionProjet = getLocale(projet.description, language);

              return (
                <motion.div 
                  key={index} 
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group bg-background rounded-[2rem] overflow-hidden border border-border transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand/10 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Hover Effect */}
                    <div className="relative h-72 overflow-hidden">
                      {projet.imagePrincipale ? (
                        <Image 
                          src={urlFor(projet.imagePrincipale).url()} 
                          alt={titreProjet || 'Image du projet'} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-muted text-muted-foreground italic">
                          {language === 'fr' ? 'Pas d\'image' : 'No image'}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                      
                      {/* Badge Statut Traduit */}
                      {projet.statut && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="absolute top-6 left-6"
                        >
                          <span className="bg-brand text-brand-foreground px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                            {formatStatut(projet.statut)}
                          </span>
                        </motion.div>
                      )}
                    </div>

                    <div className="p-6">
                      <h4 className="text-2xl font-heading font-bold mb-4 group-hover:text-brand transition-colors">
                        {titreProjet}
                      </h4>
                      <div className="text-muted-foreground text-sm mb-6 min-h-15">
                        {Array.isArray(descriptionProjet) ? (
                          <PortableText value={descriptionProjet} />
                        ) : (
                          <p>{descriptionProjet}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* État vide animé */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-[2rem]"
          >
            <Icons.Ghost size={48} className="mx-auto text-muted-foreground mb-4 opacity-20" />
            <p className="text-muted-foreground italic">
              {language === 'fr' 
                ? 'Aucune réalisation affichée pour le moment.' 
                : 'No projects displayed at the moment.'}
            </p>
          </motion.div>
        )}

      </div>
    </section>
  );
}