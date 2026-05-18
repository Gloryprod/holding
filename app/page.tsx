import Header from '@/components/Home/layout/Header';
import Hero from '@/components/Home/layout/Hero';
import Entities from '@/components/Home/layout/Entities';
import ImpactStats from '@/components/Home/layout/ImpactStats';
import Team from '@/components/Home/layout/Team';
import  RecentProjects from '@/components/Home/layout/RecentProjects';
import Footer from '@/components/Home/layout/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden no-scrollbar ">
      {/* <Header /> */}

      <main className="">
        {/* <Hero /> */}
        
        {/* <Entities /> */}
        <ImpactStats />
        <Team />
        <RecentProjects />
        {/* <Footer /> */}
        
      </main>
    </div>
  );
}