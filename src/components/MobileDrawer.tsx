import React, { useEffect } from 'react';
import { PageId } from '../types';
import { TeamSamirLogo } from './TeamSamirLogo';
import { X, ArrowRight, MapPin, Phone, MessageSquare, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onBookDemo: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  onBookDemo,
}) => {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Clean unnumbered items
  const navItems: { id: PageId; label: string; desc: string }[] = [
    { id: 'home', label: 'Home', desc: 'TS Fitness studio overview & coach bio' },
    { id: 'about', label: 'About Samir', desc: '5-year track record & coaching vision' },
    { id: 'services', label: 'Training Services', desc: '1-on-1 personal training & nutrition' },
    { id: 'transformations', label: 'Transformations', desc: 'Male & female progress and video reels' },
    { id: 'nutrition', label: 'Nutrition & Wellness', desc: 'High-protein diet & sustainable habits' },
    { id: 'contact', label: 'Contact & Free Demo', desc: 'Book your demo in Kothrud, Pune' },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-nav-title"
    >
      {/* Backdrop overlay (subtle, keeps page visible behind) */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in compact side drawer container (targets 50-60% of viewport width on mobile) */}
      <div className="fixed inset-y-0 right-0 flex justify-end">
        <div className="w-[58vw] min-w-[210px] max-w-[270px] sm:max-w-xs sm:w-72 bg-white border-l border-[#E1E6EF] shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 text-[#171A21]">
          
          {/* Top Drawer Bar */}
          <div className="p-2.5 sm:p-3.5 border-b border-[#E1E6EF] flex items-center justify-between">
            <div className="flex items-center gap-1.5 min-w-0">
              <TeamSamirLogo variant="light" size="sm" />
              <span className="text-[9px] font-bold text-[#1769FF] bg-[#EEF5FF] px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">Menu</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[#646B78] hover:text-[#171A21] hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              aria-label="Close navigation drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Mobile Contact Actions (Compact side-by-side) */}
          <div className="p-2 sm:p-3 bg-slate-50 border-b border-[#E1E6EF] grid grid-cols-2 gap-1.5">
            <a
              href={`tel:${BUSINESS_INFO.contact.phoneRaw}`}
              className="py-1.5 px-2 rounded-lg bg-white border border-[#E1E6EF] text-[#171A21] text-[11px] font-semibold shadow-2xs hover:border-[#1769FF] flex items-center justify-center gap-1 active:scale-[0.98]"
            >
              <Phone className="w-3 h-3 text-[#1769FF] shrink-0" />
              <span className="truncate">Call</span>
            </a>

            <a
              href={`https://wa.me/${BUSINESS_INFO.contact.whatsappNumber}?text=${encodeURIComponent(
                'Hi Samir, I want to book a free demo fitness training session in Pune.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-2 rounded-lg bg-emerald-600 text-white text-[11px] font-semibold shadow-2xs hover:bg-emerald-700 flex items-center justify-center gap-1 active:scale-[0.98]"
            >
              <MessageSquare className="w-3 h-3 shrink-0" />
              <span className="truncate">WhatsApp</span>
            </a>
          </div>

          {/* Navigation Links (Compact, fitted to 55-60% width) */}
          <div className="p-2 sm:p-3.5 space-y-0.5 flex-1 overflow-y-auto">
            <p id="mobile-nav-title" className="text-[10px] font-semibold text-[#646B78] tracking-wider uppercase px-1 mb-1">
              Navigate
            </p>

            <nav className="space-y-0.5" aria-label="Mobile Navigation">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#EEF5FF] text-[#1769FF] font-semibold'
                        : 'text-[#171A21] hover:bg-slate-50'
                    }`}
                  >
                    <div className="min-w-0 pr-1">
                      <div className="text-xs sm:text-sm font-semibold truncate">{item.label}</div>
                      <div className="text-[10px] text-[#646B78] truncate">{item.desc}</div>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? 'text-[#1769FF] translate-x-0.5' : 'text-[#646B78]'}`} />
                  </button>
                );
              })}
            </nav>

            {/* Direct Venue & Contact Details in Drawer */}
            <div className="mt-2 pt-2 border-t border-[#E1E6EF] text-[10px] text-[#646B78] space-y-1 px-1">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3 h-3 text-[#1769FF] shrink-0 mt-0.5" />
                <span className="line-clamp-2 leading-tight">{BUSINESS_INFO.location.fullAddress}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#171A21] font-semibold">
                <Phone className="w-3 h-3 text-[#1769FF] shrink-0" />
                <span>{BUSINESS_INFO.contact.phone}</span>
              </div>
            </div>
          </div>

          {/* Bottom Drawer CTA */}
          <div className="p-2 sm:p-3 bg-slate-50 border-t border-[#E1E6EF]">
            <button
              onClick={() => {
                onClose();
                onBookDemo();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 text-xs font-semibold text-white bg-[#1769FF] hover:bg-[#0B3D91] rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Book Free Demo</span>
            </button>
            <p className="text-[9px] text-center text-[#646B78] mt-1 truncate">
              DP Road, Kothrud · Coach Samir
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
