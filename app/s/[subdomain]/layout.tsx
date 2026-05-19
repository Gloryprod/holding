// app/s/[subdomain]/layout.tsx
import { getEntityData } from "@/lib/getEntityData";
import { getSeoData } from "@/lib/getSeoData";
import Header from "@/components/Home/layout/Header";
import Footer from "@/components/Home/layout/Footer";
import { Metadata } from "next";
import { headers } from "next/headers";
import {extractSubdomain} from "@/middleware";

// Fonction native de Next.js pour générer les métadonnées à la volée
export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
 
  const subdomain = extractSubdomain({ url: '', headers: headerList } as any) || 'ong-eden-benin'; // Fallback pour le développement local
  const data = await getSeoData(subdomain || 'ong-eden-benin');

  // const entityData = await getEntityData(subdomain);

  const title = data?.seo?.metaTitle || `${data?.nom }`;
  const description = data?.seo?.metaDescription || `Bienvenue sur le site officiel de ${data?.nom || 'notre filiale'}.`;
  const ogImage = data?.seo?.ogImageUrl || data?.logoUrl || '/default-share-image.png';
  const favicon = data?.logoUrl || '/favicon.ico'; //

  return {
    title: title,
    description: description,
    // icons: {
    //   icon: favicon,
    //   shortcut: favicon,
    //   apple: favicon, // Pour les appareils iOS (Ajout sur l'écran d'accueil)
    // },
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Aperçu de ${data?.nom}`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImage],
    },
  };
}

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