"use client";

import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-background font-inter transition-colors duration-300">
      
      {/* Halo de lumière en arrière-plan (Ambiance) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 sm:w-125 h-75 sm:h-125 bg-brand/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Grand filigrane 404 géant en fond */}
      <span className="absolute text-[16rem] sm:text-[22rem] md:text-[28rem] font-black font-geist text-foreground/3 select-none pointer-events-none leading-none -z-10">
        404
      </span>

      {/* Icône & Eyebrow */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 border border-border/60 text-brand text-xs sm:text-sm font-black font-geist uppercase tracking-[0.2em] mb-6 shadow-sm backdrop-blur-sm">
        <FileQuestion className="w-4 h-4 text-brand" />
        {isFr ? "Page introuvable" : "Page not found"}
      </div>

      {/* Titre Principal */}
      <h1 className="text-4xl sm:text-5xl md:text-4xl font-black font-geist text-foreground tracking-tight mb-4 max-w-2xl leading-[1.1]">
        {isFr ? "Oups ! Cette page semble introuvable." : "Oops! This page seems to be missing."}
      </h1>

      {/* Message d'erreur */}
      <p className="text-muted-foreground text-base sm:text-lg max-w-md mb-10 leading-relaxed">
        {isFr 
          ? "La page que vous recherchez n'existe pas, a été déplacée ou est temporairement indisponible."
          : "The page you are looking for doesn't exist, has been moved, or is temporarily unavailable."
        }
      </p>

      {/* Bouton de retour */}
      <Link href="/" className="w-fit">
        <button className="cursor-pointer group relative px-8 py-4 bg-brand text-brand-foreground rounded-xl font-black font-geist uppercase tracking-tight overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-brand/20">
          <span className="relative z-10 flex items-center gap-3">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {isFr ? "Retourner à l'accueil" : "Back to Home"}
          </span>
          
          {/* Effet de reflet au survol */}
          <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>
      </Link>

    </div>
  );
}