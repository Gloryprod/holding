'use client';

import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { FacebookIcon, LinkedinIcon } from "./Team";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";

// Context d'Internationalisation et utilitaires
import { useLanguage } from "@/context/LanguageContext";
import { getLocale } from "@/lib/getLocal";

type LocalizedString = string | { fr?: string; en?: string };

interface Partenaire {
  nom: string;
  logoUrl: string;
}

interface EntreprisePartenaires {
  nomEntreprise: string;
  partenaires: Partenaire[];
}

// 1. Structure de données dynamique des partenaires par entreprise
const PARTENAIRES_PAR_ENTREPRISE: EntreprisePartenaires[] = [
  {
    nomEntreprise: "KODANU",
    partenaires: [
      { nom: "Sèmè City", logoUrl: "/sc-logo-horizontal.svg" },
    ],
  },
];

interface Entreprise {
  nom?: LocalizedString;
  tagline?: LocalizedString;
  description?: LocalizedString;
  iconName?: string;
  slug?: { current: string } | string;
  image?: string;
  mission?: LocalizedString;
  adresse?: LocalizedString;
  telephone?: string;
  email?: string;
  logo?: string;
  linkedin?: string;
  facebook?: string;
  services?: {
    titre: LocalizedString;
    description: LocalizedString;
  }[];
}

export default function Footer({ data }: { data: Entreprise }) {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  // Traitement des données localisées venant du CMS
  const nom = getLocale(data?.nom, language);
  const tagline = getLocale(data?.tagline, language);
  const adresse = getLocale(data?.adresse, language);

  // 2. Recherche des partenaires associés à l'entreprise actuelle
  const entrepriseInfo = PARTENAIRES_PAR_ENTREPRISE.find(
    (item) => item.nomEntreprise.toLowerCase() === nom?.toLowerCase()
  );
  const partenaires = entrepriseInfo?.partenaires || [];

  return (
    <footer className="bg-background pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. Section Partenaires / Logos */}
        {partenaires.length > 0 && (
          <div className="mb-20">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] mb-10"
            >
              {language === 'fr' ? 'Ils nous font confiance' : 'They trust us'}
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
              className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
            >
              {partenaires.map((partenaire, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="relative h-20 w-44 flex items-center justify-center p-3 rounded-xl bg-slate-50/50 dark:bg-white/5 border border-border/40 opacity-80 hover:opacity-100 transition-all duration-300"
                >
                  <Image
                    src={partenaire.logoUrl}
                    alt={partenaire.nom}
                    fill
                    className="object-contain p-2"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        <hr className="border-border mb-20" />

        {/* 2. Grille Principale du Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          
          {/* Colonne 1 : À propos */}
          <div className="space-y-6">
            <h3 className="text-2xl font-heading font-bold text-foreground">
              {data?.logo ? (
                <div className="relative w-auto h-10 md:h-12 aspect-3/1 flex items-center">
                  <Image 
                    src={urlFor(data.logo).url()} 
                    alt={nom || "Logo"} 
                    width={200}
                    height={60}
                    className="w-auto h-full object-contain"
                    priority
                  />
                </div>
              ) : (
                <span className="text-xl md:text-2xl font-heading font-black text-brand tracking-tight">
                  {nom || "Obed Group"}
                </span>
              )}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {tagline || (language === 'fr' 
                ? "Votre partenaire de confiance pour un avenir meilleur." 
                : "Your trusted partner for a better future.")}
            </p>
            <div className="flex gap-4">
              {data?.email && (
                <a href={`mailto:${data.email}`} className="cursor-pointer p-2 rounded-full border border-border hover:bg-brand hover:text-white transition-colors">
                  <Mail size={18} />
                </a>
              )}
              {data?.linkedin && (
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="cursor-pointer p-2 rounded-full border border-border hover:bg-brand hover:text-white transition-colors">
                  <LinkedinIcon size={18} />
                </a>
              )}
              {data?.facebook && (
                <a href={data.facebook} target="_blank" rel="noopener noreferrer" className="cursor-pointer p-2 rounded-full border border-border hover:bg-brand hover:text-white transition-colors">
                  <FacebookIcon size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div>
            <h4 className="font-bold mb-6">
              {language === 'fr' ? 'Navigation' : 'Navigation'}
            </h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-brand transition-colors">
                  {language === 'fr' ? 'Accueil' : 'Home'}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand transition-colors">
                  {language === 'fr' ? 'Nos projets' : 'Our Projects'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand transition-colors">
                  {language === 'fr' ? 'Contact' : 'Contact'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Contact Direct */}
          <div>
            <h4 className="font-bold mb-6">
              {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
            </h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand shrink-0 mt-0.5" />
                <span>
                  {language === 'fr' ? 'Siège Social : ' : 'Headquarters: '}
                  {adresse || (language === 'fr' ? 'Adresse non renseignée' : 'Address not specified')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand shrink-0" />
                <span>{data?.telephone || "+33 1 23 45 67 89"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand shrink-0" />
                <span>{data?.email || "contact@horyzion.com"}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. Copyright et Légal */}
        <div className="border-t border-border pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground font-medium uppercase tracking-widest">
          <p>© {currentYear} {nom || "Obed Group"}. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-brand">
              {language === 'fr' ? 'Mentions Légales' : 'Legal Notice'}
            </Link>
            <Link href="#" className="hover:text-brand">
              {language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
            </Link>
          </div>
        </div>

      </div>
    </footer> 
  );
}
