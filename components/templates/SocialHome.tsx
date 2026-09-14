'use client';

import Hero from '@/components/Home/layout/Hero';
import ImpactStats from '@/components/Home/layout/ImpactStats';
import Team from '@/components/Home/layout/Team';
import Services from '@/components/Home/layout/Services';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';

// Context d'Internationalisation et utilitaire
import { useLanguage } from "@/context/LanguageContext";
import { getLocale } from "@/lib/getLocal";

type LocalizedString = string | { fr?: string; en?: string };

// Variants pour conteneurs à enfants séquentiels
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SocialHome({ data }: { data: any }) {
  const { language } = useLanguage();

  // Extraction dynamique des données multilingues reçues du CMS
  const description = getLocale(data?.description, language);
  const mission = getLocale(data?.mission, language);

  const axesIntervention = [
    {
      title: { fr: 'Éducation', en: 'Education' },
      icon: '📚',
      desc: {
        fr: 'Accompagner les communautés vers une indépendance durable à travers des programmes de formation adaptés.',
        en: 'Empower communities towards sustainable independence through tailored training programs.',
      },
    },
    {
      title: { fr: 'Santé', en: 'Health' },
      icon: '🏥',
      desc: {
        fr: 'Faciliter l’accès aux soins de santé de base et promouvoir les bonnes pratiques d’hygiène.',
        en: 'Facilitate access to basic healthcare and promote hygiene best practices.',
      },
    },
    {
      title: { fr: 'Autonomisation', en: 'Empowerment' },
      icon: '🚀',
      desc: {
        fr: 'Soutenir les initiatives locales et l’entrepreneuriat social pour renforcer l’impact économique.',
        en: 'Support local initiatives and social entrepreneurship to enhance economic impact.',
      },
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground font-inter transition-colors duration-300 overflow-x-hidden">
      
      {/* ================= BACKGROUND DECORATIONS (EFFETS DE COULEURS & GLOW) ================= */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        
        {/* 1. Grille subtile en fond (Grid Pattern) */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
        />

        {/* 2. Halo lumineux haut-droit (Hero / Notre Mission) */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-brand/20 rounded-full blur-[120px] opacity-60" />

        {/* 3. Halo latéral gauche (Notre Mission / Services) */}
        <div className="absolute top-[20%] -left-32 w-[550px] h-[550px] bg-brand/15 rounded-full blur-[140px] opacity-50" />

        {/* 4. Halo central doux (Chiffres & Axes d'intervention) */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-brand/10 rounded-full blur-[160px] opacity-40" />

        {/* 5. Glow bas de page (Équipe & Call to Action) */}
        <div className="absolute -bottom-32 -left-20 w-[600px] h-[600px] bg-brand/15 rounded-full blur-[150px] opacity-50" />
      </div>

      {/* ================= CONTENU PRINCIPAL ================= */}
      <main className="relative z-10">
        {/* 1. HERO */}
        <Hero data={data} />

        {/* 2. NOTRE MISSION */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              
              {/* Texte Mission */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="lg:w-1/2"
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider mb-6 font-geist">
                  {language === 'fr' ? 'Notre Impact Social' : 'Our Social Impact'}
                </span>

                <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight font-geist text-foreground">
                  {language === 'fr' ? (
                    <>
                      Transformer des vies par <span className="text-brand">l&apos;action locale</span> et solidaire.
                    </>
                  ) : (
                    <>
                      Transforming lives through <span className="text-brand">local and united action</span>.
                    </>
                  )}
                </h2>

                <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl">
                  {description ||
                    (language === 'fr'
                      ? 'Chez EDEN, nous œuvrons chaque jour pour apporter des solutions concrètes aux défis sociaux de nos communautés.'
                      : 'At EDEN, we work every day to bring concrete solutions to the social challenges of our communities.')}
                </p>

                <div className="space-y-5">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex gap-5 p-6 bg-background/80 backdrop-blur-md rounded-2xl border border-border hover:border-brand/40 transition-all group shadow-sm hover:shadow-md"
                  >
                    <div className="shrink-0 w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold font-geist text-foreground">
                        {language === 'fr' ? 'Vision Humaniste' : 'Humanistic Vision'}
                      </h4>
                      <p className="text-muted-foreground leading-snug">
                        {mission ||
                          (language === 'fr'
                            ? "Placer l'humain au cœur de chaque décision technologique et sociale."
                            : 'Placing humans at the heart of every technological and social decision.')}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Image d'impact animée */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="lg:w-1/2 relative"
              >
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-muted/50 group">
                  <Image
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800"
                    alt="Impact Social"
                    width={800}
                    height={600}
                    className="w-full h-125 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand/20 rounded-full blur-3xl -z-10 animate-pulse" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand/30 rounded-full blur-3xl -z-10 animate-pulse" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <Services data={data} />

        {/* 3. LES CHIFFRES */}
        <ImpactStats data={data} />

        {/* 4. NOS AXES D'INTERVENTION */}
        <section className="py-24 bg-muted/30 backdrop-blur-sm relative">
          <div className="max-w-7xl mx-auto px-6 text-center">
            
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-black mb-16 font-geist text-foreground"
            >
              {language === 'fr' ? "Nos Axes d'Intervention" : 'Our Areas of Focus'}
            </motion.h2>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10"
            >
              {axesIntervention.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="p-10 rounded-[2rem] border border-border bg-background/80 backdrop-blur-md shadow-sm hover:shadow-2xl hover:border-brand/30 transition-all duration-300 group flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-muted/60 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-brand group-hover:text-brand-foreground transition-colors duration-300 shadow-sm">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-geist text-foreground group-hover:text-brand transition-colors">
                    {item.title[language]}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc[language]}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. L'ÉQUIPE */}
        <Team />

        {/* 6. CALL TO ACTION */}
        <section className="py-20 mb-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-brand rounded-[3rem] p-12 md:p-20 text-center text-brand-foreground relative overflow-hidden shadow-2xl shadow-brand/20"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

              <h2 className="text-3xl md:text-5xl font-black mb-8 font-geist relative z-10 leading-tight">
                {language === 'fr'
                  ? 'Envie de contribuer à notre mission ?'
                  : 'Want to contribute to our mission?'}
              </h2>
              <p className="text-brand-foreground/80 max-w-2xl mx-auto mb-12 text-lg leading-relaxed relative z-10">
                {language === 'fr'
                  ? 'Chaque geste compte. Rejoignez-nous pour construire un avenir plus solidaire pour tous au Bénin et au-delà.'
                  : 'Every action counts. Join us to build a more united future for everyone in Benin and beyond.'}
              </p>

              <div className="flex flex-wrap justify-center gap-6 relative z-10">
                <Link href="/contact" className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto cursor-pointer px-10 py-5 bg-brand-foreground text-brand font-black rounded-2xl hover:opacity-90 transition-all font-geist uppercase tracking-tight shadow-xl"
                  >
                    {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                  </motion.button>
                </Link>

                <Link href="/about" className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto cursor-pointer px-10 py-5 bg-transparent border-2 border-brand-foreground/40 text-brand-foreground font-bold rounded-2xl hover:bg-brand-foreground/10 hover:border-brand-foreground transition-all font-geist uppercase tracking-tight"
                  >
                    {language === 'fr' ? 'En savoir plus' : 'Learn More'}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}