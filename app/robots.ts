import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('host') || 'horyzion.com';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/studio/'],
      },
    ],
    // Génère le lien exact : https://ong-eden-benin.horyzion.com/sitemap.xml
    sitemap: `${protocol}://${host}/sitemap.xml`,
  };
}