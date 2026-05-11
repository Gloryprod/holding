import Hero from '@/components/Home/layout/Hero';
import Entities from '@/components/Home/layout/Entities';
import ImpactStats from '@/components/Home/layout/ImpactStats';
import Team from '@/components/Home/layout/Team';
// import  RecentProjects from '@/components/Home/layout/RecentProjects';
import  Services from '@/components/Home/layout/Services';
// import Footer from '@/components/Home/layout/Footer';

export default async function BusinessHomePage({ data }: { data: any }) {
    return (
        <div className="relative min-h-screen overflow-hidden no-scrollbar ">

        <main className="">
            <Hero data={data} />
            
            <Entities data={data} />
            <Services data={data} />
            <ImpactStats />
            <Team />            
        </main>
        </div>
    );
}