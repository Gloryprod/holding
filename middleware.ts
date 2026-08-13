// import { NextRequest, NextResponse } from 'next/server';
// import { rootDomain, protocol } from '@/lib/utils';

// export const config = {
//   matcher: [
//     /*
//      * On applique le middleware à toutes les pages sauf :
//      * - les fichiers statiques (images, favicon, etc.)
//      * - l'API et le Studio Sanity
//      */
//     '/((?!api|_next/static|_next/image|studio|favicon.ico).*)',
//   ],
// };


// export function extractSubdomain(request: NextRequest): string | null {
//   const url = request.url;
//   const host = request.headers.get('host') || '';
//   const hostname = host.split(':')[0];

//   // Local development environment
//   if (url.includes('localhost') || url.includes('127.0.0.1')) {
//     // Try to extract subdomain from the full URL
//     const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
//     if (fullUrlMatch && fullUrlMatch[1]) {
//       return fullUrlMatch[1];
//     }

//     // Fallback to host header approach
//     if (hostname.includes('.localhost')) {
//       return hostname.split('.')[0];
//     }

//     return null;
//   }

//   // Production environment
//   const rootDomainFormatted = rootDomain.split(':')[0];

//   // Handle preview deployment URLs (tenant---branch-name.vercel.app)
//   if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
//     const parts = hostname.split('---');
//     return parts.length > 0 ? parts[0] : null;
//   }

//   // Regular subdomain detection
//   const isSubdomain =
//     hostname !== rootDomainFormatted &&
//     hostname !== `www.${rootDomainFormatted}` &&
//     hostname.endsWith(`.${rootDomainFormatted}`);

//   return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
// }

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const subdomain = extractSubdomain(request);

//   if (subdomain) {
//       // Block access to admin page from subdomains
//       if (pathname.startsWith('/admin')) {
//           return NextResponse.redirect(new URL('/', request.url));
//       }
//       return NextResponse.rewrite(new URL(`/s/${subdomain}${pathname}`, request.url));    
//   }

//   if (pathname === '/' && !subdomain) {
//     const protocol = request.nextUrl.protocol;
//     const host = request.headers.get('host') || '';
    
//     // On construit l'URL de la filiale cible (ex: eden.localhost:3000 ou eden.obedgroup.com)
//     const targetUrl = `${protocol}//ong-eden-benin.${host}`;

//     console.log(`Redirecting to: ${targetUrl}`);
    
//     return NextResponse.redirect(new URL(targetUrl));
//   }

//   // On the root domain, allow normal access
//   return NextResponse.next();
// }


import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * On exclut de la redirection/réécriture :
     * - les routes d'API
     * - les fichiers statiques de Next.js (_next)
     * - le studio Sanity
     * - les fichiers avec extension (images .png, .jpg, favicon, .svg, etc.) dans /public
     */
    '/((?!api|_next/static|_next/image|studio|favicon.ico|.*\\..*).*)',
  ],
};

// Sous-domaine par défaut vers lequel rediriger si l'utilisateur arrive sur le domaine principal
const DEFAULT_SUBDOMAIN = 'ong-eden-benin';

export function extractSubdomain(request: NextRequest): string | null {
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0]; // Supprime le port (ex: :3000)

  // 1. Environnement Local (ex: eden.localhost:3000)
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }
    return null;
  }

  // 2. Prévisualisations Vercel (ex: tenant---branch.vercel.app)
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // 3. Production (ex: horyzion.com)
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'horyzion.com';

  const isSubdomain =
    hostname !== rootDomain &&
    hostname !== `www.${rootDomain}` &&
    hostname.endsWith(`.${rootDomain}`);

  if (isSubdomain) {
    return hostname.replace(`.${rootDomain}`, '');
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const subdomain = extractSubdomain(request);

  // CAS 1 : L'utilisateur est déjà sur un sous-domaine (ex: eden.horyzion.com ou eden.localhost:3000)
  if (subdomain) {
    // Bloquer l'accès aux pages admin depuis les sous-domaines
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Réécriture transparente vers l'application multi-tenant
    return NextResponse.rewrite(
      new URL(`/s/${subdomain}${pathname}${search}`, request.url)
    );
  }

  // CAS 2 : L'utilisateur arrive sur le domaine principal (ex: horyzion.com ou localhost:3000)
  // Il n'y a pas de landing page -> Redirection directe vers la filiale par défaut
  const host = request.headers.get('host') || '';
  const protocol = request.nextUrl.protocol;

  // On reconstruit l'URL complète avec le sous-domaine par défaut
  const redirectUrl = `${protocol}//${DEFAULT_SUBDOMAIN}.${host}${pathname}${search}`;

  return NextResponse.redirect(redirectUrl);
}