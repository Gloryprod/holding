import { client } from "@/sanity/lib/client";

export async function getSeoData(subdomain: string) {
  const query = `*[_type == "entreprise" && slug.current == $subdomain][0]{
    nom,
    "logoUrl": logo.asset->url,
    seo {
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url
    }
  }`;
  
  return await client.fetch(query, { subdomain });
}