import React, { useState } from 'react';
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

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { SeniorFitnessPage } from './pages/SeniorFitnessPage';
import { ClientsExperiencePage } from './pages/ClientsExperiencePage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
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
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open the Services page scrolled to one service with its Plan Details expanded
  const handleOpenService = (serviceId: string) => {
    setFocusedServiceId(serviceId);
    setCurrentPage('services');
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
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#171A21] relative pb-16 lg:pb-0">
      {/* Global Desktop & Mobile Sticky Header (Single Header) */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
        onBookDemo={() => handleBookDemo({ kind: 'all', heading: 'Book Your Free Call' })}
      />

      {/* 3. Main Multi-Page Prototype Views */}
      <main className="flex-1" id="main-content">
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

        {currentPage === 'clients' && (
          <ClientsExperiencePage
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
      </main>

      {/* 4. Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onBookDemo={() => handleBookDemo({ kind: 'all', heading: 'Book Your Free Demo Session' })}
      />

      {/* 5. Mobile Sticky Bottom Action Bar (<15% viewport height) */}
      <MobileBottomBar
        currentPage={currentPage}
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
        currentPage={currentPage}
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
