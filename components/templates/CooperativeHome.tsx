'use client';

import Hero from '@/components/Home/layout/Hero';
import ImpactStats from '@/components/Home/layout/ImpactStats';
import Image from 'next/image';
import Services from '../Home/layout/Services';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { getLocale } from '@/lib/getLocal';
import { Variants } from 'framer-motion';

// Variants pour déclenchement séquentiel (Stagger)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CooperativeHome({ data }: { data: any }) {
  const { language } = useLanguage();

  // Extraction sécurisée des champs provenant du CMS Sanity
  const description = getLocale(data?.description, language);
  const nom = getLocale(data?.nom, language);

  // Caractéristiques traduites
  const features = [
    {
      title: language === 'fr' ? 'Mutualisation' : 'Pooling',
      desc: language === 'fr' ? 'Partage des équipements et des savoir-faire.' : 'Sharing equipment and expertise.',
      icon: '🚜'
    },
    {
      title: language === 'fr' ? 'Qualité Garantie' : 'Guaranteed Quality',
      desc: language === 'fr' ? 'Contrôle rigoureux de chaque étape.' : 'Rigorous control at every stage.',
      icon: '✅'
    },
    {
      title: language === 'fr' ? 'Prix Juste' : 'Fair Price',
      desc: language === 'fr' ? 'Équilibre entre rentabilité et accessibilité.' : 'Balance between profitability and accessibility.',
      icon: '💰'
    },
    {
      title: language === 'fr' ? 'Durable' : 'Sustainable',
      desc: language === 'fr' ? 'Pratiques respectueuses de l\'environnement.' : 'Environmentally friendly practices.',
      icon: '🌱'
    }
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground font-inter transition-colors duration-300 overflow-x-hidden">
      
      {/* ARRIÈRE-PLAN DYNAMIQUE ANIMÉ */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Glow Sphère 1 (Haut/Gauche) */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
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
            x: [0, -60, 40, 0],
            y: [0, 50, -40, 0],
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
            x: [0, 40, -40, 0],
            y: [0, -30, 50, 0],
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

      <main className="relative z-10">
        {/* 1. HERO */}
        <Hero data={data} />

        {/* 2. NOTRE MODÈLE : Focus sur le collectif */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto mb-16"
            >
              <span className="text-amber-600 dark:text-amber-500 font-bold tracking-widest uppercase text-xs font-geist">
                {language === 'fr' ? 'Solidarité & Terroir' : 'Solidarity & Local Heritage'}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mt-4 mb-6 font-geist">
                {language === 'fr' ? (
                  <>Une force collective au service d&apos;une <span className="text-brand">production durable</span>.</>
                ) : (
                  <>A collective force for <span className="text-brand">sustainable production</span>.</>
                )}
              </h2>
              <p className="text-lg text-muted-foreground">
                {description}
              </p>
            </motion.div>

            {/* Grille des caractéristiques animée */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {features.map((feature, i) => (
                <motion.div 
                  key={i} 
                  variants={cardVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-card/80 backdrop-blur-md p-8 rounded-2xl border border-border hover:border-brand/50 hover:shadow-xl transition-all duration-300 group flex flex-col items-start"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="font-bold text-foreground mb-2 font-geist">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. NOS PRODUITS PHARE */}
        <section className="py-20 bg-muted/30 backdrop-blur-sm border-y border-border overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              
              {/* Texte Produit */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="lg:w-1/2"
              >
                <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight font-geist">
                  {language === 'fr' ? (
                    <>
                      L&apos;excellence de notre <br/> 
                      <span className="text-amber-600 dark:text-amber-500">terroir béninois.</span>
                    </>
                  ) : (
                    <>
                      The excellence of our <br/> 
                      <span className="text-amber-600 dark:text-amber-500">Beninese terroir.</span>
                    </>
                  )}
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {language === 'fr'
                    ? "De la récolte à la transformation, nous veillons à ce que chaque produit porte l'empreinte de notre savoir-faire traditionnel et de nos standards modernes."
                    : "From harvest to processing, we ensure that every product reflects our traditional craftsmanship and modern standards."}
                </p>
              </motion.div>
              
              {/* Composition d'images décalées avec animations */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="lg:w-1/2 grid grid-cols-2 gap-4 relative"
              >
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="space-y-4 overflow-hidden rounded-2xl shadow-md group"
                >
                  <Image 
                    src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=400" 
                    alt={language === 'fr' ? 'Récolte' : 'Harvest'} 
                    width={300} 
                    height={400} 
                    className="rounded-2xl object-cover h-64 w-full group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />
                </motion.div>

                <motion.div 
                  whileHover={{ y: -4 }}
                  className="space-y-4 pt-12 overflow-hidden rounded-2xl shadow-md group"
                >
                  <Image 
                    src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=400" 
                    alt={language === 'fr' ? 'Agriculture' : 'Farming'} 
                    width={300} 
                    height={400} 
                    className="rounded-2xl object-cover h-64 w-full group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />
                </motion.div>

                <div className="absolute inset-0 bg-brand/5 blur-3xl -z-10 rounded-full pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </section>

        <Services data={data}/>

        {/* 4. LES CHIFFRES */}
        <ImpactStats />

        {/* 5. APPEL À REJOINDRE */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-accent/50 backdrop-blur-md rounded-[3rem] p-12 md:p-20 text-center border-2 border-dashed border-brand/30 relative overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-100/[0.05] mask-[linear-gradient(0deg,transparent,black)] pointer-events-none" />
              
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6 font-geist relative z-10">
                {language === 'fr' ? 'Vous êtes producteur ?' : 'Are you a producer?'}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg relative z-10 leading-relaxed">
                {language === 'fr' 
                  ? `Rejoignez ${nom || "notre réseau"} et bénéficiez de la force d'un collectif structuré pour valoriser votre travail et sécuriser vos revenus.`
                  : `Join ${nom || "our network"} and benefit from the strength of a structured collective to enhance your work and secure your income.`}
              </p>
              
              <Link href="/contact" className="inline-block relative z-10">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer bg-foreground text-background px-12 py-5 rounded-2xl font-black transition-all font-geist uppercase tracking-widest shadow-xl"
                >
                  {language === 'fr' ? 'Nous rejoindre' : 'Join us'}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}