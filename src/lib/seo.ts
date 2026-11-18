import type { PageId } from '../types';
import { BUSINESS_INFO, SERVICES } from '../data/mockData';
import { PAGE_PATHS } from './routes';

/**
 * Production origin used for canonical links, Open Graph URLs, JSON-LD and the sitemap.
 * Change this ONE value when the custom domain goes live, then redeploy.
 * No trailing slash.
 */
export const SITE_URL = 'https://team-samir-website.vercel.app';

export const SITE_NAME = 'TeamSamir';

export interface PageMeta {
  title: string;
  description: string;
  /** Path of the share image under /public (1200×630) */
  image: string;
  imageAlt: string;
  /** false = noindex (kept out of the sitemap) */
  index: boolean;
}

const DEFAULT_IMAGE = '/media/shared/og/og-default.jpg';

export const PAGE_META: Record<PageId, PageMeta> = {
  home: {
    title: 'TeamSamir | Personal Training & Fitness Coaching in Pune',
    description:
      '1-on-1 personal training, nutrition guidance and fitness coaching with Coach Samir in Kothrud, Pune, plus live online sessions. Book a free consultation.',
    image: DEFAULT_IMAGE,
    imageAlt: 'Coach Samir guiding a 1-on-1 personal training session',
    index: true,
  },
  services: {
    title: 'Personal Training & Nutrition Services | TeamSamir',
    description:
      'Explore TeamSamir coaching: 1-on-1 personal training, health management, nutrition guidance and offline training in Pune. Compare plans and book a free demo.',
    image: '/media/shared/og/og-services.jpg',
    imageAlt: 'Personal training session with a TeamSamir coach',
    index: true,
  },
  'senior-fitness': {
    title: 'Senior Fitness Training for Older Adults | TeamSamir',
    description:
      'One-on-one fitness training for senior citizens in Pune: safe, low-impact exercise for strength, balance and mobility, planned around your health needs.',
    image: '/media/shared/og/og-senior-fitness.jpg',
    imageAlt: 'Senior fitness training session focused on strength and balance',
    index: true,
  },
  transformations: {
    title: 'Client Transformations & Training Stories | TeamSamir',
    description:
      'See training journeys, before-and-after progress and workout videos from TeamSamir coaching in Pune. Individual results vary with effort and consistency.',
    image: '/media/shared/og/og-transformations.jpg',
    imageAlt: 'Strength training highlights from TeamSamir coaching',
    index: true,
  },
  about: {
    title: 'About Samir | Personal Trainer & Fitness Coach in Pune',
    description:
      'Meet Samir, founder and head coach of TeamSamir in Kothrud, Pune. Learn about his coaching approach: technique first, progressive training and Indian nutrition.',
    image: '/media/shared/og/og-about.jpg',
    imageAlt: 'Samir, founder and head coach of TeamSamir',
    index: true,
  },
  contact: {
    title: 'Book a Free Consultation | TeamSamir',
    description:
      'Share your fitness goals and preferred plan, and the TeamSamir team will call you to arrange a free consultation with Coach Samir in Pune.',
    image: DEFAULT_IMAGE,
    imageAlt: 'TeamSamir personal training',
    index: false, // form page: reachable from every CTA, kept out of search results
  },
};

export const NOT_FOUND_META: PageMeta = {
  title: 'Page Not Found | TeamSamir',
  description: 'The page you were looking for does not exist. Go back to the TeamSamir home page.',
  image: DEFAULT_IMAGE,
  imageAlt: 'TeamSamir',
  index: false,
};

export const canonicalUrl = (page: PageId) => SITE_URL + PAGE_PATHS[page];
const abs = (path: string) => (path.startsWith('http') ? path : SITE_URL + path);

// ───────────── Structured data (JSON-LD) ─────────────
// Only facts that are visible on the site. No ratings, reviews or unverified figures.

const ORG_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/#samir`;

const organization = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: abs('/media/shared/logo/logo-black.jpeg'),
  email: BUSINESS_INFO.contact.email,
  telephone: BUSINESS_INFO.contact.phoneRaw,
  founder: { '@id': PERSON_ID },
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS_INFO.location.line1,
    addressLocality: BUSINESS_INFO.location.city,
    addressRegion: BUSINESS_INFO.location.state,
    postalCode: BUSINESS_INFO.location.pincode,
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: BUSINESS_INFO.contact.phoneRaw,
    email: BUSINESS_INFO.contact.email,
    availableLanguage: ['English', 'Hindi', 'Marathi'],
  },
});

const person = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: BUSINESS_INFO.trainerName,
  jobTitle: 'Founder & Head Coach',
  worksFor: { '@id': ORG_ID },
  url: canonicalUrl('about'),
});

const website = () => ({
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
});

const breadcrumb = (page: PageId) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl('home') },
    { '@type': 'ListItem', position: 2, name: PAGE_LABELS[page], item: canonicalUrl(page) },
  ],
});

export const PAGE_LABELS: Record<PageId, string> = {
  home: 'Home',
  services: 'Services',
  'senior-fitness': 'Senior Fitness',
  transformations: 'Transformations',
  about: 'About Samir',
  contact: 'Free Consultation',
};

/** JSON-LD graph for a page (one script tag per page, no duplicates). */
export const structuredData = (page: PageId) => {
  const graph: object[] = [organization(), website()];
  if (page === 'home' || page === 'about') graph.push(person());
  if (page !== 'home') graph.push(breadcrumb(page));
  if (page === 'services') {
    SERVICES.forEach((s) =>
      graph.push({
        '@type': 'Service',
        name: s.title,
        serviceType: s.title,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'City', name: BUSINESS_INFO.location.city },
        url: canonicalUrl('services'),
      })
    );
  }
  if (page === 'senior-fitness') {
    graph.push({
      '@type': 'Service',
      name: 'Senior Fitness Training',
      serviceType: 'Personal training for older adults',
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'City', name: BUSINESS_INFO.location.city },
      url: canonicalUrl('senior-fitness'),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
};

// ───────────── <head> tags ─────────────

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Head tags for prerendered HTML (scripts/prerender.mjs). */
export const headHtml = (page: PageId | null): string => {
  const meta = page ? PAGE_META[page] : NOT_FOUND_META;
  const url = page ? canonicalUrl(page) : `${SITE_URL}/`;
  const image = abs(meta.image);
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.index ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />`,
    page ? `<link rel="canonical" href="${url}" />` : '',
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(meta.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${esc(meta.imageAlt)}" />`,
    page
      ? `<script type="application/ld+json">${JSON.stringify(structuredData(page)).replace(/</g, '\\u003c')}</script>`
      : '',
  ];
  return tags.filter(Boolean).join('\n    ');
};

/**
 * Keeps <head> in sync on in-app navigation. Updates the tags written by the
 * prerender in place (never adds duplicates).
 */
export const applyHead = (page: PageId | null) => {
  if (typeof document === 'undefined') return;
  const meta = page ? PAGE_META[page] : NOT_FOUND_META;
  const url = page ? canonicalUrl(page) : `${SITE_URL}/`;
  const image = abs(meta.image);
  document.title = meta.title;

  const set = (selector: string, attr: string, value: string) => {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  set('meta[name="description"]', 'content', meta.description);
  set('meta[name="robots"]', 'content', meta.index ? 'index, follow, max-image-preview:large' : 'noindex, follow');
  set('link[rel="canonical"]', 'href', url);
  set('meta[property="og:title"]', 'content', meta.title);
  set('meta[property="og:description"]', 'content', meta.description);
  set('meta[property="og:url"]', 'content', url);
  set('meta[property="og:image"]', 'content', image);
  set('meta[property="og:image:alt"]', 'content', meta.imageAlt);
  set('meta[name="twitter:title"]', 'content', meta.title);
  set('meta[name="twitter:description"]', 'content', meta.description);
  set('meta[name="twitter:image"]', 'content', image);
  set('meta[name="twitter:image:alt"]', 'content', meta.imageAlt);

  const ld = document.head.querySelector('script[type="application/ld+json"]');
  if (ld && page) ld.textContent = JSON.stringify(structuredData(page));
};
