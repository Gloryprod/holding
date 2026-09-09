"use client";

import { ArrowRight, Sparkles, Heart, Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

// Importations Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// Context d'Internationalisation (Ajustez le chemin d'accès selon votre structure)
import { useLanguage } from "@/context/LanguageContext"; 
import { getLocale } from "@/lib/getLocal"; // Fonction utilitaire pour obtenir la traduction appropriée

// Styles Swiper obligatoires
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

type LocalizedString = string | { fr?: string; en?: string };

interface Entreprise {
  nom: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  iconName: string;
  slug: string;
  image: string;
  typeEntite: 'business' | 'social' | 'cooperative';
}

export default function Hero({ data }: { data: Entreprise }) {
  const { language } = useLanguage();
  const type = data.typeEntite || 'business';

  // Extraction des textes traduits
  console.log(data)

  const nom = getLocale(data.nom, language);
  const tagline = getLocale(data.tagline, language);
  const description = getLocale(data.description, language);


  const images = [
    '/business1.jpg',
    '/business2.jpg',
    '/cooperative1.jpg',
    '/cooperative2.jpg',
    '/hero5.jpg',
  ];

  // --- DESIGN 1 : BUSINESS ---
  if (type === 'business') {
    switch (nom) {
      case 'Benin Bien Etre Services Well Being Business':
      case 'Bénin Bien Etre Service Well Being Business':
        return (
          <section className="relative min-h-screen flex items-center text-foreground overflow-hidden font-inter py-16 lg:py-0 transition-colors duration-300 mt-10 lg:mt-16 bg-background">
  
            {/* Modèle d'Arrière-plan : Cyber-Grid & Neon Tech Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              {/* Lumière diffuse supérieure centrée */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] bg-gradient-to-b from-brand/15 via-blue-500/10 to-transparent blur-[120px] opacity-80" />

              {/* Halo lumineux d'angle (Bleu & Brand) */}
              <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-brand/15 blur-[130px] animate-pulse duration-[8000ms]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-500/15 blur-[140px] animate-pulse duration-[6000ms]" />

              {/* Motifs Cyber Grid Tech */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_70%,transparent_100%)]" />

              {/* Points de données lumineux (Nodes) */}
              <div className="absolute top-1/3 left-10 w-2 h-2 rounded-full bg-green-400 animate-ping duration-[4000ms]" />
              <div className="absolute bottom-1/4 right-12 w-2 h-2 rounded-full bg-brand animate-ping duration-[6000ms]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                
                {/* Colonne Texte - Centrée sur Mobile, Alignée à gauche sur Desktop */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left justify-center">
                  
                  {/* Badge Pill Header */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted/60 dark:bg-white/5 border border-border dark:border-white/10 text-muted-foreground dark:text-white/80 text-xs font-medium mb-6 backdrop-blur-md shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-brand shrink-0" />
                    <span className="uppercase tracking-widest text-[10px] font-semibold font-geist">
                      {language === 'fr' ? 'Innovation Digitale' : 'Digital Innovation'}
                    </span>
                  </div>

                  {/* Titre Principal */}
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black font-geist tracking-tight leading-[1.08] mb-6">
                    <span className="text-brand">
                      Benin Bien Etre Services
                    </span> <br />
                    <span>
                      Well Being Business
                    </span>
                  </h1>

                  {/* Paragraphe Descriptive */}
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed font-light mx-auto lg:mx-0">
                    {language === 'fr'
                      ? 'Hygiène, recyclage, agrobusiness et hôtellerie : une même ambition, transformer durablement le territoire béninois.'
                      : 'Hygiene, recycling, agrobusiness, and hospitality: a shared ambition to sustainably transform Benin.'}
                  </p>

                  {/* Groupe de Boutons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto justify-center lg:justify-start">
                    <Link href="/about" className="w-full sm:w-auto">
                      <button className="cursor-pointer group relative w-full sm:w-auto px-8 py-4 bg-brand text-brand-foreground rounded-xl font-bold font-geist uppercase tracking-wider text-xs overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--brand-rgb,74,222,128),0.35)] hover:-translate-y-0.5 active:translate-y-0">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {language === 'fr' ? 'Découvrir nos projets' : 'Discover Our Projects'}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </button>
                    </Link>

                    <Link href="/contact" className="w-full sm:w-auto">
                      <button className="cursor-pointer w-full sm:w-auto px-8 py-4 bg-muted/60 hover:bg-muted text-foreground border border-border hover:border-brand/30 dark:hover:border-white/20 rounded-xl font-bold font-geist uppercase tracking-wider text-xs transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm">
                        {language === 'fr' ? 'Nous contacter' : 'Contact Us'}
                      </button>
                    </Link>
                  </div>

                  {/* Section Key Metrics / KPIs */}
                  <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-border w-full max-w-md">
                    <div className="flex flex-col items-center lg:items-start">
                      <span className="text-2xl font-black text-foreground">100%</span>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/75 font-bold mt-1">
                        {language === 'fr' ? 'Digitalisé' : 'Digitalized'}
                      </span>
                    </div>
                    <div className="h-8 w-px bg-border shrink-0" />
                    <div className="flex flex-col items-center lg:items-start">
                      <span className="text-2xl font-black text-foreground">B2B</span>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/75 font-bold mt-1">
                        {language === 'fr' ? 'Standard' : 'Standard'}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Colonne Image / Visuel */}
                <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[450px] lg:h-[500px] flex items-center justify-center">
                  {/* Glow de la carte */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-blue-500/20 rounded-3xl filter blur-2xl opacity-70 dark:opacity-50 animate-pulse duration-4000" />
                  
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border shadow-2xl shadow-muted/30 dark:shadow-black/80 group">
                    <Image
                      src={urlFor(data.image).url()}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={nom}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
                    
                    {/* Tagline Floating Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-background/90 dark:bg-slate-950/85 backdrop-blur-md border border-border dark:border-white/10 flex items-center justify-between text-left">
                      <div>
                        <p className="text-[10px] text-brand uppercase font-bold tracking-wider">
                          {language === 'fr' ? 'Devise' : 'Tagline'}
                        </p>
                        <h4 className="text-xs sm:text-sm font-bold text-foreground dark:text-white mt-0.5 line-clamp-2">
                          {tagline}
                        </h4>
                      </div>
                      <div className="relative flex h-3 w-3 shrink-0 ml-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        );

      case 'KODANU':
        return (
          <section className="relative min-h-screen flex flex-col justify-center items-center text-center font-inter pt-28 pb-16 px-6 overflow-hidden bg-background">
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-175 h-100 bg-linear-to-tr from-brand/20 via-emerald-500/15 to-amber-500/10 rounded-full blur-[140px] animate-pulse duration-6000" />
              <div className="absolute bottom-[20%] right-[-5%] w-100 h-100 bg-brand/10 rounded-full blur-[120px] animate-pulse duration-8000" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[36px_36px] mask-[radial-gradient(ellipse_75%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
            </div>

            <div className="max-w-4xl mx-auto z-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/25 text-brand text-xs font-semibold mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(var(--brand-rgb,74,222,128),0.15)] transition-all hover:scale-105">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-amber-400" />
                <span className="uppercase tracking-widest text-[10px] font-bold font-geist">
                  {language === 'fr' ? 'Construire utile, construire vrai' : 'Build useful, build true'}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-black font-geist tracking-tight leading-[1.05] mb-6">
                KODANU <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-brand via-emerald-400 to-amber-400 animate-gradient-x">
                  {language === 'fr' ? 'Innover pour impacter.' : 'Innovating for impact.'}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl font-light mb-10 leading-relaxed">
                {language === 'fr'
                  ? 'Entreprise africaine combinant conseil stratégique, ingénierie technologique et solutions d\'avenir pour répondre aux défis de demain.'
                  : 'African enterprise combining strategic consulting, technological engineering, and future solutions to tackle tomorrow\'s challenges.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
                <Link href="/about" className="w-full sm:w-auto">
                  <button className="group relative w-full sm:w-auto px-8 py-4 bg-brand text-brand-foreground rounded-2xl font-bold font-geist text-xs uppercase tracking-wider overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-5px_rgba(var(--brand-rgb,74,222,128),0.4)] active:translate-y-0 cursor-pointer">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {language === 'fr' ? 'Explorer nos pôles' : 'Explore Our Divisions'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </button>
                </Link>

                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 bg-muted/60 hover:bg-muted text-foreground border border-border/80 hover:border-brand/40 rounded-2xl font-bold font-geist text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm cursor-pointer">
                    {language === 'fr' ? 'Nous contacter' : 'Contact Us'}
                  </button>
                </Link>
              </div>
            </div>

            <div className="w-full max-w-6xl z-10 group relative animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200 ease-out">
              <div className="absolute -inset-1 bg-linear-to-r from-brand/40 via-emerald-500/30 to-amber-500/30 rounded-[32px] blur-xl opacity-50 group-hover:opacity-100 transition duration-700" />
              <div className="relative w-full h-80 sm:h-120 rounded-3xl overflow-hidden border border-white/10 dark:border-white/15 bg-card/50 backdrop-blur-md shadow-2xl">
                {images.length > 0 ? (
                  <Swiper
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect="fade"
                    speed={1500}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    className="w-full h-full hero-swiper"
                  >
                    {images.map((img: string, index: number) => (
                      <SwiperSlide key={index} className="relative w-full h-full">
                        <Image
                          src={img}
                          fill
                          sizes="(max-width: 1200px) 100vw, 1100px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          alt={`${nom || "KODANU"} slide ${index + 1}`}
                          priority={index === 0}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <Image
                    src="/placeholder.jpg"
                    fill
                    className="object-cover"
                    alt="Placeholder"
                  />
                )}

                <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent opacity-90 z-10 pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 sm:right-auto p-4 rounded-2xl bg-background/80 dark:bg-slate-950/80 backdrop-blur-md border border-border flex items-center gap-4 max-w-md shadow-lg z-20 pointer-events-none">
                  <div className="w-3 h-3 rounded-full bg-brand animate-ping shrink-0" />
                  <div className="text-left">
                    <p className="text-[10px] text-brand uppercase font-bold tracking-wider">
                      {language === 'fr' ? 'Slogan' : 'Tagline'}
                    </p>
                    <p className="text-xs font-semibold text-foreground mt-0.5">
                      {tagline}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-background to-transparent z-10 pointer-events-none" />
          </section>
        );
    }
  }

  // --- DESIGN 2 : SOCIAL ---
  if (type === 'social') {
    return (
      <section className="relative min-h-screen flex items-center bg-background py-16 lg:py-0 transition-colors duration-300 font-inter mt-10 lg:mt-20">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* 1. Gradient de fond général */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-background opacity-90" />

          {/* 2. Orbes lumineux animés */}
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-brand/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />

          {/* 3. Motifs de grille technique */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* Bloc Texte - Centré sur mobile (order-1), aligné à gauche sur desktop (lg:order-1) */}
          <div className="order-1 flex flex-col items-center text-center lg:items-start lg:text-left">
            
            {/* Icône */}
            <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center mb-6 lg:mb-8 shrink-0">
              <Heart className="w-8 h-8 text-brand fill-brand/20" />
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-black font-geist tracking-tight leading-[1.05] mb-6">
              <span>{nom} :</span> <br />
              <span className="text-brand">
                {language === 'fr' ? 'Agir' : 'Act'}
              </span>{' '}
              {language === 'fr' ? 'pour demain.' : 'for tomorrow.'}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground mb-8 lg:mb-10 max-w-lg leading-relaxed mx-auto lg:mx-0">
              {tagline || (language === 'fr' 
                ? 'Des solutions innovantes face aux défis environnementaux et climatiques, au plus près des communautés béninoises.'
                : 'Innovative solutions facing environmental and climate challenges, right alongside Beninese communities.')}
            </p>

            {/* Bouton CTA */}
            <div className="w-full sm:w-auto">
              <Link href="/about" className="inline-block w-full sm:w-auto">
                <button className="w-full sm:w-auto cursor-pointer bg-brand text-brand-foreground px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black shadow-xl shadow-brand/20 hover:-translate-y-1 transition-all font-geist uppercase tracking-tight">
                  {language === 'fr' ? 'Nos Projets' : 'Our Projects'}
                </button>
              </Link>
            </div>
          </div>

          {/* Bloc Image - Passe sous le texte sur mobile (order-2) */}
          <div className="order-2 relative h-[320px] sm:h-[420px] lg:h-[500px] w-full">
            <div className="absolute inset-0 bg-brand/10 rounded-[2.5rem] sm:rounded-[3rem] -rotate-3 scale-105" />
            <Image
              src={urlFor(data.image).url()}
              fill
              className="object-cover rounded-[2rem] sm:rounded-[2.5rem] transition-transform duration-700 group-hover:scale-110"
              alt="Social Impact"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            
            {/* Badge flottant */}
            <div className="absolute -bottom-6 -left-6 bg-brand text-brand-foreground p-6 sm:p-8 rounded-[2rem] shadow-2xl z-20 hidden md:block animate-bounce-slow">
              <p className="text-2xl sm:text-3xl font-black font-geist">10k+</p>
              <p className="text-[10px] sm:text-xs uppercase font-bold opacity-80 tracking-widest font-geist">
                {language === 'fr' ? 'Vies impactées' : 'Lives impacted'}
              </p>
            </div>
          </div>

        </div>
      </section>
    );
  }

  // --- DESIGN 3 : COOPERATIVE ---
  if (type === 'cooperative') {
    return (
      <section className="relative mt-10 lg:mt-20 py-16 lg:py-24 min-h-screen flex items-center bg-background overflow-hidden font-inter transition-colors duration-300">
  
        {/* Nouveau Modèle d'Arrière-plan : Aura Lumineuse & Lucioles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Halo principal ambré / vert (Haut Droit) */}
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/20 via-brand/15 to-transparent rounded-full blur-[120px] animate-pulse duration-[7000ms]" />
          
          {/* Halo secondaire (Bas Gauche) */}
          <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-gradient-to-tr from-brand/20 via-emerald-500/15 to-transparent rounded-full blur-[100px] animate-pulse duration-[9000ms]" />

          {/* Grille de fond radiale subtile */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

          {/* Particules "Lucioles" animées */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-amber-400/60 blur-[1px] animate-ping duration-[3000ms]" />
          <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-brand/60 blur-[1px] animate-ping duration-[5000ms]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 w-full">
          
          {/* Bloc Image (order-2 sur mobile, order-1 sur lg) */}
          <div className="relative h-[320px] sm:h-[450px] lg:h-[520px] group order-2 lg:order-1 w-full">
            <div className="absolute inset-0 border-4 border-brand/20 rounded-[2.5rem] sm:rounded-[3rem] translate-x-3 translate-y-3 sm:translate-x-6 sm:translate-y-6 group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-500" />
            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl">
              <Image
                src={urlFor(data.image).url()}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-all duration-700 group-hover:scale-110"
                alt="Producteurs"
              />
            </div>
          </div>

          {/* Bloc Texte - Centré sur mobile / Aligné à gauche sur desktop */}
          <div className="lg:pl-8 order-1 lg:order-2 flex flex-col items-center text-center lg:items-start lg:text-left">
            
            {/* Badge / Tag */}
            <span className="flex items-center justify-center lg:justify-start gap-3 text-amber-600 dark:text-amber-500 font-black mb-4 sm:mb-6 uppercase tracking-widest text-xs sm:text-sm font-geist">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" /> 
              {language === 'fr' ? 'Force Collective' : 'Collective Force'}
            </span>

            {/* Titre */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black font-geist tracking-tight leading-[1.1] mb-6">
              {nom}
            </h1>

            {/* Citation - Style bordure adapté au centrage mobile */}
            <div className="relative mb-8 sm:mb-10 w-full max-w-xl">
              <p className="text-lg sm:text-2xl text-muted-foreground italic border-y-2 lg:border-y-0 lg:border-l-8 border-brand/80 px-4 py-3 lg:py-2 lg:pl-6 leading-relaxed">
                &quot;{tagline || (language === 'fr'
                  ? 'Une coopérative de producteurs qui allie innovation et solidarité pour une agriculture qui respecte la terre.'
                  : 'A producer cooperative combining innovation and solidarity for agriculture that respects the land.')}&quot;
              </p>
            </div>

            {/* Bouton CTA */}
            <div className="w-full sm:w-auto">
              <Link href="/about" className="inline-block w-full sm:w-auto">
                <button className="w-full sm:w-auto cursor-pointer bg-brand text-brand-foreground px-8 py-5 rounded-2xl font-black flex flex-col items-center group hover:shadow-xl hover:shadow-brand/20 hover:-translate-y-1 transition-all font-geist uppercase">
                  <span className="text-[10px] opacity-70 tracking-[0.2em] mb-1">
                    {language === 'fr' ? 'Explorer' : 'Explore'}
                  </span>
                  {language === 'fr' ? 'Nos Projets' : 'Our Projects'}
                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>
    );
  }

  return null;
}
