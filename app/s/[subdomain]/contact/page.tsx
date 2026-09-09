import { getEntityData } from "@/lib/getEntityData"; 
import ContactPageComponent from "@/components/Contact/ContactPage";

export default async function ContactPage({ params }: { params: Promise<{ subdomain: string }> }) {
  const { subdomain } = await params;
  const data = await getEntityData(subdomain);

  return <ContactPageComponent data={data} />;
}