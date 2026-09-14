import { client } from "@/sanity/lib/client";

export async function getEntityData(subdomain: string) {
  const query = `*[_type == "entreprise" && slug.current == $subdomain][0] {
    _id,
    nom,
    tagline,
    description,
    iconName,
    imageCover,
    services,
    logo,
    mission,
    facebook,
    linkedin,
    siteWeb,
    telephone,
    email,
    adresse,
    "image": imageCover.asset->url,
    "slug": slug.current,
    typeEntite,
    nombre_projets,
    nombre_beneficiaires,
    nombre_annees_experience,
    nombre_partenaires,
    "projets": *[_type == "projet" && references(^._id)] | order(_createdAt desc) {
      titre,
      statut,
      imagePrincipale,
      description,
      "slug": slug.current
    }
  }`;
  return await client.fetch(query, { subdomain });
}
