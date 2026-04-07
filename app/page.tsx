import Header from '@/components/Home/layout/Header';
import Hero from '@/components/Home/layout/Hero';
import Entities from '@/components/Home/layout/Entities';
import ImpactStats from '@/components/Home/layout/ImpactStats';
import Team from '@/components/Home/layout/Team';
import  RecentProjects from '@/components/Home/layout/RecentProjects';
import Footer from '@/components/Home/layout/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Le Header est en absolute/fixed dans son propre composant, 
          il viendra naturellement se placer au-dessus du Hero 
      */}
      <Header />

      <main>
        {/* On retire le overflow-hidden global s'il n'est pas nécessaire, 
            mais on garde une structure de section propre */}
        <Hero />
        
        {/* Section des 4 entités (ONG, Coopérative, SARLs) */}
        <Entities />
        <ImpactStats />
        <Team />
        <RecentProjects />
        <Footer />
        
        {/* Tu pourras ajouter tes prochaines sections ici (Contact, Footer...) */}
      </main>
    </div>
  );
}