import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'fr', 'ar'],
 
  // Used when no locale matches
  defaultLocale: 'en',

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    // If all locales use the same pathname, a single
    // string or only the internal pathname can be provided.
    '/': '/',
    '/products': {
      en: '/products',
      fr: '/produits',
      ar: '/منتجات'
    },
    '/articles': {
      en: '/articles', 
      fr: '/articles',
      ar: '/مقالات'
    },
    '/categories/[slug]': {
      en: '/categories/[slug]',
      fr: '/categories/[slug]',
      ar: '/فئات/[slug]'
    },
    '/auth/login': {
      en: '/auth/login',
      fr: '/auth/connexion', 
      ar: '/auth/تسجيل-الدخول'
    },
    '/auth/register': {
      en: '/auth/register',
      fr: '/auth/inscription',
      ar: '/auth/التسجيل'
    },
    '/profile': {
      en: '/profile',
      fr: '/profil',
      ar: '/الملف-الشخصي'
    },
    '/wishlist': {
      en: '/wishlist',
      fr: '/liste-souhaits',
      ar: '/قائمة-الرغبات'
    }
  }
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
