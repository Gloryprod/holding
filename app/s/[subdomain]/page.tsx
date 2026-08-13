import { getEntityData } from "@/lib/getEntityData";
import BusinessHome from "@/components/templates/BusinessHome"
import SocialHome from "@/components/templates/SocialHome";
import CooperativeHome from "@/components/templates/CooperativeHome";
import NotFound from "./not-found";

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
  return <NotFound />; // Affiche la page 404 si le type d'entité n'est pas reconnu
}