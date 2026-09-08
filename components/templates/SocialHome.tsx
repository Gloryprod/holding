'use client';

import Hero from '@/components/Home/layout/Hero';
import ImpactStats from '@/components/Home/layout/ImpactStats';
import Team from '@/components/Home/layout/Team';
import Services from '@/components/Home/layout/Services';
import Image from 'next/image';
import Link from 'next/link';

// Context d'Internationalisation et utilitaire
import { useLanguage } from "@/context/LanguageContext";
import { getLocale } from "@/lib/getLocal";

type LocalizedString = string | { fr?: string; en?: string };

interface SocialHomeProps {
  data: {
    description?: LocalizedString;
    mission?: LocalizedString;
    [key: string]: any;
  };
}

export default function SocialHome({ data }: {data: any}) {
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
    <div className="relative min-h-screen bg-background text-foreground font-inter transition-colors duration-300">
      <main>
        {/* 1. HERO */}
        <Hero data={data} />

        {/* 2. NOTRE MISSION */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider mb-6 font-geist">
                  {language === 'fr' ? 'Notre Impact Social' : 'Our Social Impact'}
                </div>

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
                  <div className="flex gap-5 p-6 bg-muted/30 rounded-2xl border border-border hover:border-brand/40 transition-all group">
                    <div className="shrink-0 w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
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
                  </div>
                </div>
              </div>

              {/* Image d'impact */}
              <div className="lg:w-1/2 relative">
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-muted/50">
                  <Image
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800"
                    alt="Impact Social"
                    width={800}
                    height={600}
                    className="w-full h-125 object-cover"
                  />
                </div>

                <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand/20 rounded-full blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        <Services data={data} />

        {/* 3. LES CHIFFRES */}
        <ImpactStats />

        {/* 4. NOS AXES D'INTERVENTION */}
        <section className="py-24 bg-muted/20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-16 font-geist text-foreground">
              {language === 'fr' ? "Nos Axes d'Intervention" : 'Our Areas of Focus'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {axesIntervention.map((item, index) => (
                <div
                  key={index}
                  className="p-10 rounded-[2rem] border border-border bg-background hover:shadow-2xl hover:border-brand/30 hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="w-20 h-20 bg-muted rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 group-hover:bg-brand group-hover:text-brand-foreground transition-all duration-300">
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-geist text-foreground">
                    {item.title[language]}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. L'ÉQUIPE */}
        <Team />

        {/* 6. CALL TO ACTION */}
        <section className="py-20 mb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-brand rounded-[3rem] p-12 md:p-20 text-center text-brand-foreground relative overflow-hidden shadow-2xl shadow-brand/20 transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

              <h2 className="text-3xl md:text-5xl font-black mb-8 font-geist relative z-10">
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
                  <button className="w-full sm:w-auto cursor-pointer px-10 py-5 bg-brand-foreground text-brand font-black rounded-2xl hover:opacity-90 transition-all font-geist uppercase tracking-tight shadow-xl">
                    {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                  </button>
                </Link>

                <Link href="/about" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto cursor-pointer px-10 py-5 bg-transparent border-2 border-brand-foreground/40 text-brand-foreground font-bold rounded-2xl hover:bg-brand-foreground/10 hover:border-brand-foreground transition-all font-geist uppercase tracking-tight">
                    {language === 'fr' ? 'En savoir plus' : 'Learn More'}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}