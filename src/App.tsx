import React, { useState } from 'react';
import { PageId, TransformationItem } from './types';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { LightboxModal } from './components/LightboxModal';
import { VideoModal } from './components/VideoModal';
import { PrototypeToolbar } from './components/PrototypeToolbar';
import { PlaceholderDialog } from './components/PlaceholderDialog';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { TransformationsPage } from './pages/TransformationsPage';
import { NutritionPage } from './pages/NutritionPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [highlightPlaceholders, setHighlightPlaceholders] = useState(false);
  const [isWireframeMode, setIsWireframeMode] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  // Modals state
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<TransformationItem | null>(null);
  const [selectedVideoItem, setSelectedVideoItem] = useState<TransformationItem | null>(null);
  const [dialogType, setDialogType] = useState<'call' | 'whatsapp' | 'verification' | null>(null);

  // Navigation handler with smooth scroll to top
  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger booking from any page / service
  const handleBookDemo = (service?: string) => {
    if (service) {
      setPreselectedService(service);
    }
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white text-[#171A21] relative pb-16 lg:pb-0 ${isWireframeMode ? 'wireframe-mode' : ''}`}>
      {/* Global Desktop & Mobile Sticky Header (Single Header) */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
        onBookDemo={() => handleBookDemo()}
      />

      {/* 3. Main Multi-Page Prototype Views */}
      <main className="flex-1" id="main-content">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onBookDemo={handleBookDemo}
            onOpenLightbox={(item) => setSelectedLightboxItem(item)}
            onOpenVideo={(item) => setSelectedVideoItem(item)}
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

        {currentPage === 'nutrition' && (
          <NutritionPage
            onNavigate={handleNavigate}
            onBookDemo={handleBookDemo}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            initialService={preselectedService}
            highlightPlaceholders={highlightPlaceholders}
            onCallPlaceholder={() => setDialogType('call')}
            onWhatsAppPlaceholder={() => setDialogType('whatsapp')}
          />
        )}
      </main>

      {/* 4. Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onBookDemo={() => handleBookDemo()}
      />

      {/* 5. Mobile Sticky Bottom Action Bar (<15% viewport height) */}
      <MobileBottomBar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
        onBookDemo={() => handleBookDemo()}
      />

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

      {/* 10. Discreet Floating Blueprint / Wireframe Mode Toggle */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 z-40">
        <button
          onClick={() => setIsWireframeMode(!isWireframeMode)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
            isWireframeMode
              ? 'bg-[#1769FF] text-white border-blue-400 ring-2 ring-blue-300'
              : 'bg-[#111318]/90 text-white border-slate-700 hover:bg-black'
          }`}
          title="Toggle Wireframe Blueprint vs High-Fidelity Design"
        >
          <span className="w-2 h-2 rounded-full bg-[#00A3FF]" />
          <span>{isWireframeMode ? 'Visual Design Active' : 'Wireframe Blueprint'}</span>
        </button>
      </div>
    </div>
  );
}
