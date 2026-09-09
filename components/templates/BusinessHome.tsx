import Hero from '@/components/Home/layout/Hero';
import Entities from '@/components/Home/layout/Entities';
import ImpactStats from '@/components/Home/layout/ImpactStats';
import Team from '@/components/Home/layout/Team';
import Services from '@/components/Home/layout/Services';
import { motion } from 'framer-motion';

export default async function BusinessHomePage({ data }: { data: any }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* ================= BACKGROUND DECORATIONS (EFFETS DE COULEURS & GLOW) ================= */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        
        {/* 1. Motif de grille discret (Grid Pattern) */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
        />

        {/* 2. Halo lumineux en haut à droite (Près du Hero) */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-brand/20 rounded-full blur-[120px] opacity-60" />

        {/* 3. Aura colorée intermédiaire (Transition vers Entities / Services) */}
        <div className="absolute top-[25%] -left-32 w-[600px] h-[600px] bg-brand/15 rounded-full blur-[140px] opacity-50" />

        {/* 4. Halo central doux derrière ImpactStats */}
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/10 rounded-full blur-[160px] opacity-40" />

        {/* 5. Glow du bas de page (Secteur Team & Footer) */}
        <div className="absolute -bottom-32 right-10 w-[600px] h-[600px] bg-brand/15 rounded-full blur-[150px] opacity-50" />
      </div>

      {/* ================= CONTENU PRINCIPAL ================= */}
      <main className="relative z-10">
        <Hero data={data} /> 
        <Entities data={data} />
        <Services data={data} />
        <ImpactStats />
        <Team />            
      </main>
    </div>
  );
}