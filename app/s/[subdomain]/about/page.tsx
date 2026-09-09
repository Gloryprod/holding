import AboutClient from "@/components/About/AboutClient";
import { getEntityData } from "@/lib/getEntityData";

export default async function AboutPage({ params }: { params: Promise<{ subdomain: string }> }) {
  const { subdomain } = await params;
  const data = await getEntityData(subdomain);

  return <AboutClient data={data} />;
}