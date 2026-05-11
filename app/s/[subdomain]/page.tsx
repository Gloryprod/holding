// import Hero from '@/components/Home/layout/Hero';
// import Entities from '@/components/Home/layout/Entities';
// import ImpactStats from '@/components/Home/layout/ImpactStats';
// import Team from '@/components/Home/layout/Team';
// import  RecentProjects from '@/components/Home/layout/RecentProjects';
// import  Services from '@/components/Home/layout/Services';
// import Footer from '@/components/Home/layout/Footer';
// import { getEntityData } from "@/lib/getEntityData";

// export default async function HomePage({ params }: { params: Promise<{ subdomain: string }> }) {
//   const { subdomain } = await params;
//   const data = await getEntityData(subdomain);
//   console.log("DONNÉES SERVEUR :", data); // <--- REGARDE TON TERMINAL VS CODE
//     return (
//         <div className="relative min-h-screen overflow-hidden no-scrollbar ">

//         <main className="">
//             <Hero data={data} />
            
//             <Entities data={data} />
//             <Services data={data} />
//             <ImpactStats />
//             <Team />            
//         </main>
//         </div>
//     );
// }

import { getEntityData } from "@/lib/getEntityData";
import BusinessHome from "@/components/templates/BusinessHome"
import SocialHome from "@/components/templates/SocialHome";
import CooperativeHome from "@/components/templates/CooperativeHome";

export default async function HomePage({ params }: { params: Promise<{ subdomain: string }> }) {
  const { subdomain } = await params;
  const data = await getEntityData(subdomain);

  if (!data) return <div>Chargement...</div>;

  //   Si c'est une SARL, on utilise le template Business
  if (data.typeEntite === 'business') {
    return <BusinessHome data={data} />;
  }

  //   Si c'est une ONG, on utilise le template Social
  if (data.typeEntite === 'social') {
    return <SocialHome data={data} />;
  }

  //   Si c'est une Cooperative, on utilise le template Cooperative
  if (data.typeEntite === 'cooperative') {
    return <CooperativeHome data={data} />;
  }

  // Sinon par défaut, on utilise le template Business
//   return <BusinessHome data={data} />;
}