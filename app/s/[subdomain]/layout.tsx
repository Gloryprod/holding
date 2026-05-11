// app/s/[subdomain]/layout.tsx
import { getEntityData } from "@/lib/getEntityData";
import Header from "@/components/Home/layout/Header";
import Footer from "@/components/Home/layout/Footer";

export default async function SubdomainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ subdomain: string }>; // On récupère aussi le subdomain ici
}) {
  const { subdomain } = await params;
  const data = await getEntityData(subdomain);

  return (
    <>
      {/* Le Header reçoit les données et reste présent sur TOUTES les pages */}
      <Header data={data} />
      <main className="">
        {children} {/* C'est ici que s'afficheront tes pages (Home, About, etc.) */}
      </main>
      <Footer data={data} />

    </>
  );
}