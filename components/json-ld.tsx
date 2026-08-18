export function JsonLd({ data, subdomain }: { data: any; subdomain: string }) {
  const isMainDomain = !subdomain || subdomain === 'main' || subdomain === 'www';
  const domainUrl = isMainDomain 
    ? 'https://horyzion.com' 
    : `https://${subdomain}.horyzion.com`;

  // Détermine le type Schema.org selon le profil de l'entité
  const getOrganizationType = () => {
    if (data?.typeEntite === 'social') return 'NGO'; // ONG / Association
    if (data?.typeEntite === 'cooperative') return 'Organization'; // Coopérative
    return 'Corporation'; // Entreprise / Business
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": getOrganizationType(),
    "name": data?.nom || "Horyzion",
    "url": domainUrl,
    "logo": data?.logoUrl || `${domainUrl}/logo.png`,
    "description": data?.seo?.metaDescription || data?.descriptionCourte,
    "sameAs": data?.reseauxSociaux || [], // ex: ["https://facebook.com/...", "https://linkedin.com/..."]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}