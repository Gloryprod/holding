// 'use client';

// import * as Icons from "lucide-react";
// import { motion } from "framer-motion";
// import type { Variants } from "framer-motion";

// // Context d'Internationalisation et utilitaire
// import { useLanguage } from "@/context/LanguageContext";
// import { getLocale } from "@/lib/getLocal";

// type LocalizedString = string | { fr?: string; en?: string };

// interface Entreprise {
//   nom: LocalizedString;
//   tagline?: LocalizedString;
//   description: LocalizedString;
//   iconName?: string;
//   slug?: { current: string } | string;
//   image: string;
//   mission: LocalizedString;
//   adresse?: LocalizedString;
//   telephone?: string;
//   email?: string;
//   services?: {
//     titre: LocalizedString;
//     description: LocalizedString;
//   }[];
// }

// // Données spécifiques pour KODANU (3 points clés par service)
// const KODANU_SERVICES = [
//   {
//     icon: "TrendingUp",
//     titre: {
//       fr: "KODANU Consulting - Conseil Stratégique & Transactionnel",
//       en: "KODANU Consulting - Strategic & Transactional Consulting",
//     },
//     points: {
//       fr: [
//         "Accompagnement en fusions & acquisitions",
//         "Modélisation financière et levée de fonds",
//         "Analyse de marché & stratégie de croissance",
//       ],
//       en: [
//         "M&A and deal advisory",
//         "Financial modeling & fundraising",
//         "Market analysis & growth strategy",
//       ],
//     },
//   },
//   {
//     icon: "Cpu",
//     titre: {
//       fr: "KODANU Innovation Lab - Recherche, Développement & Innovation",
//       en: "KODANU Innovation Lab - Research, Development & Innovation",
//     },
//     points: {
//       fr: [
//         "Prototypage & idéation technologique",
//         "Recherche appliquée & transfert de technologie",
//         "Projets pilotes & expérimentation d'avenir",
//       ],
//       en: [
//         "Prototyping & tech ideation",
//         "Applied research & tech transfer",
//         "Pilot projects & future experimentation",
//       ],
//     },
//   },
//   {
//     icon: "Code2",
//     titre: {
//       fr: "KODANU Technologies - Solutions Numériques & Ingénierie Technologique",
//       en: "KODANU Solutions - Digital Solutions & Tech Engineering",
//     },
//     points: {
//       fr: [
//         "Développement d'applications web & mobiles",
//         "Architectures Cloud & Systèmes d'Information",
//         "Intégration d'IA & automatisation de processus",
//       ],
//       en: [
//         "Web & mobile app development",
//         "Cloud Architectures & IT Systems",
//         "AI integration & process automation",
//       ],
//     },
//   },
// ];

// // Variantes d'animations pour le conteneur principal
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.12,
//       delayChildren: 0.1,
//     },
//   },
// };

// // Variantes d'animations pour chaque carte de service
// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 25 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// export default function Services({ data }: { data: Entreprise }) {
//   const { language } = useLanguage();

//   const nomEntreprise = getLocale(data?.nom, language);
//   const isKodanu = nomEntreprise?.toLowerCase() === "kodanu";

//   // S'il n'y a pas de services et que ce n'est pas KODANU, ne rien afficher
//   if (!isKodanu && (!data?.services || data.services.length === 0)) {
//     return null;
//   }

//   return (
//     <section id="services" className="py-20 bg-muted/20 relative overflow-hidden">
//       {/* Halo lumineux décoratif en arrière-plan */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -z-10" />

//       <div className="max-w-7xl mx-auto px-6">
//         <div className="space-y-12">
          
//           {/* Titre de section */}
//           <motion.div
//             initial={{ opacity: 0, y: -15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="flex items-center gap-3"
//           >
//             <motion.div
//               whileHover={{ rotate: 180, scale: 1.1 }}
//               transition={{ type: "spring", stiffness: 200 }}
//               className="p-2.5 rounded-2xl bg-brand/10 text-brand flex items-center justify-center shrink-0 cursor-pointer"
//             >
//               <Icons.Layers className="w-6 h-6" />
//             </motion.div>
//             <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
//               {language === 'fr' ? 'Nos Pôles d\'Expertise' : 'Our Expertise Areas'}
//             </h3>
//           </motion.div>

//           {/* DESIGN SPÉCIFIQUE À KODANU */}
//           {isKodanu ? (
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.2 }}
//               className="grid grid-cols-1 md:grid-cols-3 gap-8"
//             >
//               {KODANU_SERVICES.map((service, i) => {
//                 const IconComponent = (Icons as Record<string, any>)[service.icon] || Icons.CheckCircle2;
//                 const titre = language === 'fr' ? service.titre.fr : service.titre.en;
//                 const points = language === 'fr' ? service.points.fr : service.points.en;

//                 return (
//                   <motion.div
//                     key={i}
//                     variants={cardVariants}
//                     whileHover={{ y: -8 }}
//                     transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                     className="group relative p-8 bg-background/80 backdrop-blur-md rounded-3xl border border-border/80 shadow-sm hover:border-brand/50 hover:shadow-2xl hover:shadow-brand/10 transition-all duration-300 flex flex-col justify-between"
//                   >
//                     {/* Effet lumineux de fond au survol */}
//                     <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-brand/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

//                     <div className="relative z-10 space-y-6">
//                       {/* En-tête : Icône + Numéro */}
//                       <div className="flex items-center justify-between">
//                         <div className="p-3.5 rounded-2xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-300">
//                           <IconComponent className="w-6 h-6" />
//                         </div>
//                         <span className="text-xs font-bold text-muted-foreground/60 font-mono tracking-widest">
//                           0{i + 1}
//                         </span>
//                       </div>

//                       {/* Titre du service */}
//                       <h4 className="font-heading font-extrabold text-xl text-foreground group-hover:text-brand transition-colors duration-300 leading-snug">
//                         {titre}
//                       </h4>

//                       <hr className="border-border/60" />

//                       {/* Liste des 3 points clés */}
//                       <ul className="space-y-3 pt-2">
//                         {points.map((point, index) => (
//                           <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground font-medium">
//                             <Icons.CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
//                             <span className="leading-tight">{point}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     {/* Pied de carte avec lien ou flèche discrète */}
//                     <div className="relative z-10 mt-8 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-brand transition-colors">
//                       <span>{language === 'fr' ? 'Découvrir' : 'Discover'}</span>
//                       <Icons.ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>
//           ) : (
//             /* CONSERVATION DU DESIGN ORIGINAL POUR LES AUTRES ENTREPRISES */
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.2 }}
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//             >
//               {data.services?.map((service, i: number) => {
//                 const titre = getLocale(service.titre, language);
//                 const description = getLocale(service.description, language);
//                 const formattedIndex = i < 9 ? `0${i + 1}` : `${i + 1}`;

//                 return (
//                   <motion.div
//                     key={i}
//                     variants={cardVariants}
//                     whileHover={{ y: -6, scale: 1.01 }}
//                     transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                     className="group relative p-8 bg-background rounded-3xl border border-border/80 shadow-sm hover:border-brand/50 hover:shadow-2xl hover:shadow-brand/10 transition-colors duration-300 flex flex-col justify-between overflow-hidden"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

//                     <div className="relative z-10 flex items-start gap-4">
//                       <motion.div 
//                         whileHover={{ scale: 1.1 }}
//                         className="mt-1 shrink-0 w-9 h-9 rounded-2xl bg-brand/10 text-brand font-bold text-xs flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors duration-300 shadow-sm"
//                       >
//                         {formattedIndex}
//                       </motion.div>

//                       <div className="space-y-2">
//                         <h4 className="font-bold text-lg text-foreground group-hover:text-brand transition-colors duration-300 font-heading">
//                           {titre}
//                         </h4>
//                         <p className="text-sm text-muted-foreground leading-relaxed">
//                           {description}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="relative z-10 mt-6 pt-4 border-t border-border/40 flex items-center justify-end text-brand opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
//                       <Icons.ArrowUpRight className="w-5 h-5" />
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>
//           )}

//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";

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

// Structuration des services KODANU avec visuels et 3 points clés
const KODANU_SERVICES = [
  {
    icon: "TrendingUp",
    image: "/images/services/consulting.jpg", // Remplacez par vos chemins d'images
    titre: {
      fr: "Conseil Stratégique & Transactionnel",
      en: "Strategic & Transactional Consulting",
    },
    subtitle: {
      fr: "Accompagner les décideurs dans leurs transactions critiques et leur vision de croissance.",
      en: "Guiding decision-makers in critical deals and growth strategies.",
    },
    points: {
      fr: [
        { label: "Fusions & Acquisitions", desc: "Accompagnement de bout en bout sur les transactions." },
        { label: "Ingénierie Financière", desc: "Modélisation, évaluation et structuration de levées de fonds." },
        { label: "Stratégie de Croissance", desc: "Études d'impact et plans de pénétration de marché." },
      ],
      en: [
        { label: "M&A & Deal Advisory", desc: "End-to-end support for transactional success." },
        { label: "Financial Engineering", desc: "Modeling, valuation, and fundraising structuring." },
        { label: "Growth Strategy", desc: "Impact studies and market expansion frameworks." },
      ],
    },
  },
  {
    icon: "Cpu",
    image: "/images/services/rd-innovation.jpg",
    titre: {
      fr: "Recherche, Développement & Innovation",
      en: "R&D & Innovation",
    },
    subtitle: {
      fr: "Concevoir les technologies disruptives adaptées aux réalités et enjeux régionaux.",
      en: "Designing disruptive technologies tailored to regional challenges.",
    },
    points: {
      fr: [
        { label: "Prototypage Rapide", desc: "Conception agile et passage du concept au produit." },
        { label: "Recherche Appliquée", desc: "Transfert de technologies de pointe vers le marché." },
        { label: "Projets Pilotes", desc: "Expérimentations terrain à fort potentiel d'impact." },
      ],
      en: [
        { label: "Rapid Prototyping", desc: "Agile design moving concepts into tangible products." },
        { label: "Applied Research", desc: "Translating frontier research into market-ready tech." },
        { label: "Pilot Testing", desc: "High-impact field trials for scalable validation." },
      ],
    },
  },
  {
    icon: "Code2",
    image: "/images/services/digital-tech.jpg",
    titre: {
      fr: "Solutions Numériques & Ingénierie Technologique",
      en: "Digital Solutions & Tech Engineering",
    },
    subtitle: {
      fr: "Bâtir des architectures logicielles robustes et intelligentes pour la transformation digitale.",
      en: "Building robust, intelligent software architectures for digital transformation.",
    },
    points: {
      fr: [
        { label: "Développement Web & Mobile", desc: "Applications sur-mesure ultra-performantes." },
        { label: "Cloud & Infrastructure", desc: "Systèmes d'information sécurisés et scalables." },
        { label: "IA & Automation", desc: "Intégration d'intelligence artificielle opérationnelle." },
      ],
      en: [
        { label: "Web & Mobile Engineering", desc: "High-performance custom software applications." },
        { label: "Cloud & Infrastructure", desc: "Secure, highly scalable information systems." },
        { label: "AI & Automation", desc: "Operational artificial intelligence integration." },
      ],
    },
  },
];

// Animations
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } 
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};

export default function Services({ data }: { data: Entreprise }) {
  const { language } = useLanguage();

  const nomEntreprise = getLocale(data?.nom, language);
  const isKodanu = nomEntreprise?.toLowerCase() === "kodanu";

  if (!isKodanu && (!data?.services || data.services.length === 0)) {
    return null;
  }

  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Halos décoratifs de fond */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-brand/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Titre de la Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-4 mb-20 md:mb-28"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest">
            <Icons.Layers className="w-4 h-4" />
            <span>{language === 'fr' ? 'Domaines d\'Expertise' : 'Fields of Expertise'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-foreground tracking-tight">
            {language === 'fr' ? 'Nos Solutions Stratégiques' : 'Our Strategic Solutions'}
          </h2>
        </motion.div>

        {/* 1. NOUVEAU DESIGN ALTERNÉ (ZIG-ZAG) POUR KODANU */}
        {isKodanu ? (
          <div className="space-y-24 md:space-y-36">
            {KODANU_SERVICES.map((service, index) => {
              const IconComponent = (Icons as Record<string, any>)[service.icon] || Icons.CheckCircle2;
              const titre = language === 'fr' ? service.titre.fr : service.titre.en;
              const subtitle = language === 'fr' ? service.subtitle.fr : service.subtitle.en;
              const points = language === 'fr' ? service.points.fr : service.points.en;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* --- BLOC IMAGE (Côté A) --- */}
                  <motion.div 
                    variants={imageVariants} 
                    className="w-full lg:w-1/2 relative group"
                  >
                    <div className="absolute -inset-2 bg-linear-to-r from-brand/30 via-emerald-500/20 to-amber-500/20 rounded-[32px] blur-xl opacity-40 group-hover:opacity-70 transition duration-700" />
                    <div className="relative h-[320px] sm:h-[420px] w-full rounded-3xl overflow-hidden border border-border/80 shadow-2xl bg-card">
                      <Image
                        src={service.image}
                        alt={titre}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Subtile surbrillance au survol */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                      
                      {/* Index du service en filigrane sur l'image */}
                      <span className="absolute bottom-4 right-6 text-6xl font-black font-geist text-white/20 select-none">
                        0{index + 1}
                      </span>
                    </div>
                  </motion.div>

                  {/* --- BLOC CONTENU & POINTS CLÉS (Côté B) --- */}
                  <motion.div 
                    variants={fadeUpVariants} 
                    className="w-full lg:w-1/2 space-y-6"
                  >
                    {/* Badge Icône + Numéro */}
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-brand/10 text-brand font-bold">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-brand uppercase font-mono tracking-widest">
                        Pôle 0{index + 1}
                      </span>
                    </div>

                    {/* Titre & Sous-titre */}
                    <div className="space-y-3">
                      <h3 className="text-2xl sm:text-3xl font-heading font-black text-foreground leading-tight">
                        {titre}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {subtitle}
                      </p>
                    </div>

                    <hr className="border-border/60 my-4" />

                    {/* Les 3 Points Clés */}
                    <div className="space-y-4">
                      {points.map((pt, ptIdx) => (
                        <motion.div
                          key={ptIdx}
                          whileHover={{ x: 6 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="p-4 rounded-2xl bg-muted/40 border border-border/50 hover:border-brand/40 hover:bg-muted/80 transition-all duration-300 flex items-start gap-4"
                        >
                          <div className="mt-0.5 p-1 rounded-full bg-brand/20 text-brand shrink-0">
                            <Icons.Check className="w-4 h-4 stroke-[3]" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-foreground">
                              {pt.label}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {pt.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* 2. CONSERVATION DU DESIGN CLASSIQUE POUR LES AUTRES ENTREPRISES */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.services?.map((service, i: number) => {
              const titre = getLocale(service.titre, language);
              const description = getLocale(service.description, language);
              const formattedIndex = i < 9 ? `0${i + 1}` : `${i + 1}`;

              return (
                <div
                  key={i}
                  className="group relative p-8 bg-background rounded-3xl border border-border/80 shadow-sm hover:border-brand/50 hover:shadow-2xl hover:shadow-brand/10 transition-colors duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="mt-1 shrink-0 w-9 h-9 rounded-2xl bg-brand/10 text-brand font-bold text-xs flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors duration-300 shadow-sm">
                      {formattedIndex}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-lg text-foreground group-hover:text-brand transition-colors duration-300 font-heading">
                        {titre}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-6 pt-4 border-t border-border/40 flex items-center justify-end text-brand opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <Icons.ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}