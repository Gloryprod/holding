'use client';

import Hero from '@/components/Home/layout/Hero';
import ImpactStats from '@/components/Home/layout/ImpactStats';
import Image from 'next/image';
import Services from '../Home/layout/Services';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getLocale } from '@/lib/getLocal';

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
    <div className="relative min-h-screen bg-background text-foreground font-inter transition-colors duration-300">
      <main>
        {/* 1. HERO */}
        <Hero data={data} />

        {/* 2. NOTRE MODÈLE : Focus sur le collectif */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-16">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="bg-card p-8 rounded-2xl border border-border hover:border-brand/50 hover:shadow-lg transition-all group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="font-bold text-foreground mb-2 font-geist">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. NOS PRODUITS PHARE */}
        <section className="py-20 bg-muted/30 border-y border-border overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
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
              </div>
              
              <div className="lg:w-1/2 grid grid-cols-2 gap-4 relative">
                <div className="space-y-4">
                  <Image 
                    src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=400" 
                    alt={language === 'fr' ? 'Récolte' : 'Harvest'} 
                    width={300} 
                    height={400} 
                    className="rounded-2xl object-cover h-64 w-full shadow-md" 
                  />
                </div>
                <div className="space-y-4 pt-12">
                  <Image 
                    src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=400" 
                    alt={language === 'fr' ? 'Agriculture' : 'Farming'} 
                    width={300} 
                    height={400} 
                    className="rounded-2xl object-cover h-64 w-full shadow-md" 
                  />
                </div>
                <div className="absolute inset-0 bg-brand/5 blur-3xl -z-10 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        <Services data={data}/>

        {/* 4. LES CHIFFRES */}
        <ImpactStats />

        {/* 5. APPEL À REJOINDRE */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-accent/50 rounded-[3rem] p-12 md:p-20 text-center border-2 border-dashed border-brand/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-100/[0.05] mask-[linear-gradient(0deg,transparent,black)] pointer-events-none"></div>
              
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6 font-geist relative z-10">
                {language === 'fr' ? 'Vous êtes producteur ?' : 'Are you a producer?'}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg relative z-10">
                {language === 'fr' 
                  ? `Rejoignez ${nom || "notre réseau"} et bénéficiez de la force d'un collectif structuré pour valoriser votre travail et sécuriser vos revenus.`
                  : `Join ${nom || "our network"} and benefit from the strength of a structured collective to enhance your work and secure your income.`}
              </p>
              
              <Link href="/contact" className="relative z-10">
                <button className="cursor-pointer bg-foreground text-background px-12 py-5 rounded-2xl font-black hover:scale-105 transition-all font-geist uppercase tracking-widest shadow-xl">
                  {language === 'fr' ? 'Nous rejoindre' : 'Join us'}
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}