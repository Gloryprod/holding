// app/s/[subdomain]/layout.tsx
import { getEntityData } from "@/lib/getEntityData";
import { getSeoData } from "@/lib/getSeoData";
import Header from "@/components/Home/layout/Header";
import Footer from "@/components/Home/layout/Footer";
import { Metadata } from "next";
import { headers } from "next/headers";
import {extractSubdomain} from "@/middleware";

type Props = {
  params: Promise<{ subdomain: string }>;
  children: React.ReactNode;
};

// 1. Génération dynamique des métadonnées grâce aux params de la route
export async function generateMetadata({ params }: { params: Promise<{ subdomain: string }> }): Promise<Metadata> {
  const { subdomain } = await params;
  
  // On récupère les données SEO depuis Sanity avec le sous-domaine exact
  const data = await getSeoData(subdomain);

  const title = data?.seo?.metaTitle || data?.nom || 'Obed Group';
  const description = data?.seo?.metaDescription || `Bienvenue sur le site officiel de ${data?.nom || 'notre filiale'}.`;
  const ogImage = data?.seo?.ogImageUrl || data?.logoUrl || '/default-share-image.png';
  const favicon = data?.logoUrl || '/favicon.ico';

  return {
    title: title,
    description: description,
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Aperçu de ${data?.nom || 'notre entité'}`,
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