
import { PortableText } from '@portabletext/react';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import * as Icons from "lucide-react";
import type { ComponentType } from "react";
import { LucideProps } from "lucide-react";
import Header from '@/components/Home/layout/Header';
import Footer from '@/components/Home/layout/Footer';
import Link from 'next/link';
import { getEntityData } from '@/lib/getEntityData';

export default async function EntityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getEntityData(slug);

  if (!data) return <div className="h-screen flex items-center justify-center font-bold">Page introuvable</div>;

  const IconComponent = Icons[data.iconName as keyof typeof Icons] as ComponentType<LucideProps>;

  return (
    <>
      {/* <Header /> */}
      <div className="bg-background min-h-screen mt-16">
        
        {/* 1. HERO SECTION PREMIUM */}
        <section className="relative min-h-[80vh] flex items-center bg-background border-b border-border overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center py-20">
                
                {/* COLONNE GAUCHE : IDENTITÉ & TEXTE */}
                <div className="lg:col-span-7 space-y-10 flex flex-col items-center lg:items-start text-center lg:text-left">
                
                {/* Badge de Groupe */}
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-[0.3em] border border-brand/20">
                    <Icons.Building2 size={14} /> Entité de Obed Group
                </div>

                {/* Zone Logo et Titre */}
                <div className="space-y-4">
                    {/* {data.logo && (
                    <div className="flex justify-center lg:justify-start">
                        <div className="p-4 rounded-3xl bg-muted/50 border border-border">
                        <Image 
                            src={urlFor(data.logo).url()} 
                            alt={data.nom} 
                            width={70} 
                            height={70}
                            priority
                            className="object-contain" 
                        />
                        </div>
                    </div>
                    )} */}
                    <h1 className="text-5xl md:text-6xl font-heading font-black uppercase tracking-tight leading-[0.9] text-foreground">
                        {data.nom}
                    </h1>
                </div>

                {/* Tagline décorée */}
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                    <div className="h-px w-12 bg-linear-to-r from-transparent to-brand" />
                    <p className="text-xl md:text-3xl font-medium text-brand font-inter tracking-wide italic">
                    {data.tagline}
                    </p>
                </div>

                {/* Description courte CTA */}
                <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed font-light">
                    Découvrez l&apos;expertise unique et les solutions innovantes de notre entité dédiée à l&apos;excellence opérationnelle et à l&apos;impact durable.
                </p>

                {/* Action */}
                <div className="pt-4 flex gap-4">
                    <Link href="/contact">
                      <button className="cursor-pointer flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-xl font-bold hover:bg-brand hover:text-white transition-all">
                        Lancer un projet <Icons.ArrowRight size={18} />
                      </button>
                    </Link>
                </div>
                </div>

                {/* COLONNE DROITE : LE VISUEL ENCADRÉ */}
                <div className="lg:col-span-5 relative group">
                {/* Décoration géométrique derrière */}
                <div className="absolute -inset-10 bg-brand/5 rounded-full blur-3xl opacity-60 transition-opacity group-hover:opacity-100" />
                
                <div className="relative aspect-4/5 rounded-[3rem] overflow-hidden border-12 border-muted shadow-2xl rotate-2 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105">
                    {data.imageCover ? (
                    <Image 
                        src={urlFor(data.imageCover).url()} 
                        alt={`Illustration ${data.nom}`} 
                        fill 
                        priority
                        className="object-cover" 
                    />
                    ) : (
                    <div className="flex items-center justify-center h-full bg-muted text-muted-foreground italic">Pas d&apos;image</div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                </div>
                </div>

            </div>
        </section>

        {/* 2. CORE INFO : MISSION & SERVICES */}
        <section className="py-24 container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Colonne Gauche : Storytelling */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <h2 className="text-sm font-bold text-brand uppercase tracking-[0.3em]">Notre Engagement</h2>
                <h3 className="text-4xl font-heading font-bold text-foreground">Mission & Vision</h3>
                <div className="prose prose-lg text-muted-foreground leading-relaxed max-w-none">
                  <p className="whitespace-pre-line">{data.mission}</p>
                </div>
              </div>

              <div className="p-8 bg-muted/30 rounded-[2.5rem] border border-border/50">
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">À propos de l&apos;entité</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {data.description}
                </p>
              </div>
            </div>

            {/* Colonne Droite : Services Style "Bento" */}
            <div className="lg:col-span-5 space-y-8">
              <h3 className="text-2xl font-heading font-bold flex items-center gap-3">
                <Icons.Layers className="text-brand" /> Services
              </h3>
              <div className="grid gap-4">
                {data.services?.map((service: any, i: number) => (
                  <div key={i} className="group p-6 bg-background rounded-3xl border border-border hover:border-brand/50 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-xs">
                        0{i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-2 group-hover:text-brand transition-colors">{service.titre}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 3. SECTION RÉALISATIONS (STYLE PORTFOLIO) */}
        <section className="py-8 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col text-center md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h3 className="text-4xl md:text-4xl font-heading font-bold">Projets Majeurs</h3>
              </div>
              <div className="text-muted-foreground font-medium">
                {data.projets?.length || 0} Réalisations répertoriées
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.projets && data.projets.length > 0 ? (
                data.projets.map((projet: any) => (
                  <div key={projet.slug} className="group bg-background rounded-[2rem] overflow-hidden border border-border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/10">
                    
                    {/* Image Hover Effect */}
                    <div className="relative h-72 overflow-hidden">
                      {projet.imagePrincipale ? (
                        <Image 
                          src={urlFor(projet.imagePrincipale).url()} 
                          alt={projet.titre} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-muted text-muted-foreground italic">Pas d&apos;image</div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      
                      {/* Badge Statut */}
                      <div className="absolute top-6 left-6">
                         <span className="bg-brand text-brand-foreground px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                          {projet.statut?.replace('-', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h4 className="text-2xl font-heading font-bold mb-4 group-hover:text-brand transition-colors">
                        {projet.titre}
                      </h4>
                      <div className="text-muted-foreground text-sm mb-6 min-h-15">
                        <PortableText value={projet.description} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-[2rem]">
                  <Icons.Ghost size={48} className="mx-auto text-muted-foreground mb-4 opacity-20" />
                  <p className="text-muted-foreground italic">Aucune réalisation affichée pour le moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. SECTION CONTACTS & RÉSEAUX */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              
              {/* Infos de contact */}
              <div className="lg:col-span-5 space-y-10">
                <div>
                  <h2 className="text-sm font-bold text-brand uppercase tracking-[0.3em] mb-4">Nous joindre</h2>
                  <h3 className="text-4xl font-heading font-bold text-foreground">Contacts & Réseaux</h3>
                </div>

                <div className="space-y-6">
                  {/* Téléphone */}
                  <div className="flex items-center gap-5 p-4 rounded-2xl border border-border bg-muted/5 group hover:border-brand/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                      <Icons.Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Téléphone</p>
                      <p className="text-foreground font-bold">{data.telephone}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-5 p-4 rounded-2xl border border-border bg-muted/5 group hover:border-brand/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                      <Icons.Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Adresse e-mail</p>
                      <p className="text-foreground font-bold text-sm md:text-base">{data.email}</p>
                    </div>
                  </div>

                  {/* Adresse */}
                  <div className="flex items-center gap-5 p-4 rounded-2xl border border-border bg-muted/5 group hover:border-brand/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                      <Icons.MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Adresse</p>
                      <p className="text-foreground font-bold">{data.adresse}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Réseaux Sociaux & Map (Placeholder) */}
              <div className="lg:col-span-7 h-full">
                <div className="bg-muted/30 rounded-[3rem] border border-border/50 p-10 h-full flex flex-col justify-between">
                  <div>
                    <h4 className="text-2xl font-heading font-bold mb-6">Suivez notre actualité</h4>
                    <p className="text-muted-foreground mb-10 leading-relaxed">
                      Restez connecté avec <strong>{data.nom}</strong>  sur les plateformes sociales pour suivre l&apos;évolution de nos projets et nos innovations.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      {/* Facebook */}
                      <a href={data.facebook} className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand hover:-translate-y-1 transition-all duration-300 shadow-sm">
                        <Icons.Mail size={24} />
                      </a>
                      {/* LinkedIn */}
                      <a href={data.linkedin} className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand hover:-translate-y-1 transition-all duration-300 shadow-sm">
                        <Icons.Mail size={24} />
                      </a>
                      {/* Website */}
                      <a href={data.siteWeb} className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand hover:-translate-y-1 transition-all duration-300 shadow-sm">
                        <Icons.Globe size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. FOOTER DE PAGE (CTA) */}
        <section className="py-20 container mx-auto px-6">
           <div className="bg-brand rounded-[3rem] p-12 text-center text-brand-foreground relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-heading font-bold mb-4">Prêt à collaborer avec {data.nom} ?</h3>
                <p className="mb-10 text-white/80">Nos entités travaillent souvent en synergie pour des projets complexes. Contactez la holding pour une solution sur mesure.</p>
                <Link href="/contact" className="bg-white text-brand px-10 py-4 rounded-xl font-bold hover:shadow-2xl transition-all">
                  Nous contacter
                </Link>
              </div>
              {/* Abstraction visuelle fond */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
           </div>
        </section>

      </div>
      {/* <Footer /> */}
    </>
  );
}