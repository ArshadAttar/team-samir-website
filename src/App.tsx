import React, { useEffect, useState } from 'react';
import { PAGE_PATHS, pageFromPath, pageLink } from './lib/routes';
import { applyHead } from './lib/seo';
import { BookingIntent, PageId, TransformationItem } from './types';
import { SERVICES } from './data/mockData';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { LightboxModal } from './components/LightboxModal';
import { VideoModal } from './components/VideoModal';
import { PrototypeToolbar } from './components/PrototypeToolbar';
import { PlaceholderDialog } from './components/PlaceholderDialog';
import { WhatsAppFloat } from './components/WhatsAppFloat';

import { Suspense } from 'react';
import { PAGES } from './pages/registry';

const { home: HomePage, about: AboutPage, services: ServicesPage, 'senior-fitness': SeniorFitnessPage, transformations: TransformationsPage, contact: ContactPage } = PAGES;

interface AppProps {
  /** Page to render during prerendering (no window). In the browser it comes from the URL. */
  initialPage?: PageId | null;
}

export default function App({ initialPage }: AppProps) {
  // null = no page matches the URL (404)
  const [currentPage, setCurrentPage] = useState<PageId | null>(() =>
    initialPage !== undefined ? initialPage : pageFromPath(window.location.pathname)
  );

  /** Switch page and push its URL so every page has a real, shareable address. */
  const goTo = (page: PageId) => {
    if (window.location.pathname !== PAGE_PATHS[page]) {
      window.history.pushState(null, '', PAGE_PATHS[page]);
    }
    setCurrentPage(page);
  };

  // Browser back / forward
  useEffect(() => {
    const onPop = () => setCurrentPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Title, description, canonical, Open Graph and JSON-LD follow the page
  useEffect(() => {
    applyHead(currentPage);
  }, [currentPage]);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [highlightPlaceholders, setHighlightPlaceholders] = useState(false);
  // What the enquiry page shows (plans + preselected plan + heading), set by the button clicked.
  // bookingKey remounts the page so every click starts a fresh form.
  const [bookingIntent, setBookingIntent] = useState<BookingIntent>({ kind: 'all' });
  const [bookingKey, setBookingKey] = useState(0);

  // Modals state
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<TransformationItem | null>(null);
  const [selectedVideoItem, setSelectedVideoItem] = useState<TransformationItem | null>(null);
  const [dialogType, setDialogType] = useState<'call' | 'whatsapp' | 'verification' | null>(null);

  // Service whose Plan Details should open when the Services page loads (set from Home cards)
  const [focusedServiceId, setFocusedServiceId] = useState<string | undefined>(undefined);

  // Navigation handler with smooth scroll to top
  const handleNavigate = (page: PageId) => {
    setFocusedServiceId(undefined);
    if (page === 'contact') {
      setBookingIntent({ kind: 'all' });
      setBookingKey((k) => k + 1);
    }
    goTo(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open the Services page scrolled to one service with its Plan Details expanded
  const handleOpenService = (serviceId: string) => {
    setFocusedServiceId(serviceId);
    goTo('services');
  };

  // Open the enquiry page from any button. A service title (string) or an explicit intent
  // narrows the plans; anything else ("Free Consultation", "Free Consultation", ...) shows all plans.
  const handleBookDemo = (intent?: string | BookingIntent) => {
    let next: BookingIntent = { kind: 'all' };
    if (typeof intent === 'object') {
      next = intent;
    } else if (intent) {
      const service = SERVICES.find((s) => s.title === intent);
      if (service) next = { kind: 'service', serviceId: service.id };
    }
    setBookingIntent(next);
    setBookingKey((k) => k + 1);
    goTo('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#171A21] relative pb-16 lg:pb-0">
      {/* Global Desktop & Mobile Sticky Header (Single Header) */}
      <Header
        currentPage={currentPage as PageId}
        onNavigate={handleNavigate}
        onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
        onBookDemo={() => handleBookDemo({ kind: 'all', heading: 'Book Your Free Call' })}
      />

      {/* 3. Page views (URL-driven, see src/lib/routes.ts) */}
      <main className="flex-1" id="main-content">
        <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onBookDemo={handleBookDemo}
            onOpenService={handleOpenService}
            highlightPlaceholders={highlightPlaceholders}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onBookDemo={() => handleBookDemo()}
            highlightPlaceholders={highlightPlaceholders}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onBookDemo={handleBookDemo}
            initialOpenServiceId={focusedServiceId}
          />
        )}

        {currentPage === 'senior-fitness' && (
          <SeniorFitnessPage
            onNavigate={handleNavigate}
            onBookDemo={handleBookDemo}
          />
        )}

        {currentPage === 'transformations' && (
          <TransformationsPage
            onNavigate={handleNavigate}
            onBookDemo={() => handleBookDemo()}
            onOpenLightbox={(item) => setSelectedLightboxItem(item)}
            onOpenVideo={(item) => setSelectedVideoItem(item)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            key={bookingKey}
            bookingIntent={bookingIntent}
            highlightPlaceholders={highlightPlaceholders}
          />
        )}
        {currentPage === null && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center space-y-4">
            <p className="text-xs font-bold text-[#1769FF] uppercase tracking-wider">404</p>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-[#171A21]">Page not found</h1>
            <p className="text-sm sm:text-base text-[#646B78]">This page doesn't exist or has moved.</p>
            <a
              {...pageLink('home', handleNavigate)}
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-xl bg-[#1769FF] hover:bg-[#0B3D91] text-white text-sm font-semibold transition-all"
            >
              Go to Home
            </a>
          </section>
        )}
        </Suspense>
      </main>

      {/* 4. Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onBookDemo={() => handleBookDemo({ kind: 'all', heading: 'Book Your Free Demo Session' })}
      />

      {/* 5. Mobile Sticky Bottom Action Bar (<15% viewport height) */}
      <MobileBottomBar
        currentPage={currentPage as PageId}
        onNavigate={handleNavigate}
        onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
        onBookDemo={() => handleBookDemo()}
      />

      {/* Floating WhatsApp button (bottom-right, every page) */}
      <WhatsAppFloat />

      {/* 6. Accessible Slide-in Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        currentPage={currentPage as PageId}
        onNavigate={handleNavigate}
        onBookDemo={() => handleBookDemo()}
      />

      {/* 7. Case Study Lightbox Modal */}
      <LightboxModal
        item={selectedLightboxItem}
        onClose={() => setSelectedLightboxItem(null)}
        onBookDemo={() => handleBookDemo()}
      />

      {/* 8. Coaching Reel Video Modal */}
      <VideoModal
        item={selectedVideoItem}
        onClose={() => setSelectedVideoItem(null)}
        onBookDemo={() => handleBookDemo()}
      />

      {/* 9. Interactive Placeholder & Verification Guide Dialog */}
      <PlaceholderDialog
        type={dialogType}
        onClose={() => setDialogType(null)}
        onNavigateToDemo={() => handleBookDemo()}
      />
    </div>
  );
}
