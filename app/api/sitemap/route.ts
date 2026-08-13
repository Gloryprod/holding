import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0]; // Ex: "ong-eden-benin.localhost" ou "ong-eden-benin.horyzion.com"
  
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'horyzion.com';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  // Si c'est un sous-domaine (ex: ong-eden-benin.localhost:3000)
  const isSubdomain = hostname.endsWith(`.${rootDomain.split(':')[0]}`) || hostname.includes('.localhost');
  const subdomain = isSubdomain ? hostname.split('.')[0] : null;

  // URL de base reconstruite dynamiquement
  const baseUrl = subdomain && subdomain !== 'www'
    ? `${protocol}://${subdomain}.${rootDomain}`
    : `${protocol}://${rootDomain}`;

  // Tes routes principales à indexer pour cette filiale
  const pages = [
    '',
    // '/about',
    // '/contact',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${baseUrl}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>`
    )
    .join('')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}