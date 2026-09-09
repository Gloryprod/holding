import { getEntityData } from "@/lib/getEntityData";
import PartnershipsClient from "@/components/Partners/PartneshipsClient";

export default async function Partnerships({ params }: { params: Promise<{ subdomain: string }> }) {
  const { subdomain } = await params;
  const data = await getEntityData(subdomain);

  return <PartnershipsClient data={data} />;
}