import React from 'react';
import { PageId } from '../types';
import { TeamSamirLogo } from './TeamSamirLogo';
import { MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenMobileMenu: () => void;
  onBookDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenMobileMenu,
  onBookDemo,
}) => {
  // Clean navigation items without any numbering
  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Samir' },
    { id: 'services', label: 'Training Services' },
    { id: 'transformations', label: 'Transformations' },
    { id: 'nutrition', label: 'Nutrition & Wellness' },
    { id: 'contact', label: 'Contact & Free Demo' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E1E6EF] transition-all">
      {/* Primary Top Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-18 lg:h-20 flex items-center justify-between gap-2 sm:gap-6">
        
        {/* Zone 1: Brand Wordmark (Compact on mobile so it never crowds controls) */}
        <button
          onClick={() => onNavigate('home')}
          className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769FF] rounded-md transition-opacity hover:opacity-90 shrink-0 text-left"
          aria-label="Go to TeamSamir Home"
        >
          <div className="sm:hidden">
            <TeamSamirLogo variant="light" size="sm" />
          </div>
          <div className="hidden sm:block">
            <TeamSamirLogo variant="light" size="md" />
          </div>
        </button>

        {/* Zone 2: Desktop Navigation Links (single-line, unboxed, NO numbers) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-[#171A21]" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  isActive
                    ? 'text-[#1769FF] font-semibold'
                    : 'text-[#646B78] hover:text-[#171A21]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1769FF] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Direct Actions & Compact Mobile 3-Bars Menu */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Quick WhatsApp Action (Compact on mobile, full on desktop) */}
          <a
            href={`https://wa.me/${BUSINESS_INFO.contact.whatsappNumber}?text=${encodeURIComponent(
              'Hi Samir, I want to book a free demo fitness training session at TS Fitness in Pune.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 h-8.5 sm:h-auto px-2 sm:px-3 py-1 sm:py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors shrink-0"
            title="Chat directly with Coach Samir on WhatsApp"
            aria-label="WhatsApp Coach Samir"
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16834A] shrink-0" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Primary CTA (Desktop and Tablet only) */}
          <button
            onClick={onBookDemo}
            className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-4 lg:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1769FF] hover:bg-[#0B3D91] active:scale-[0.98] rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            Book Free Demo
          </button>

          {/* Compact, Sleek Mobile Three Bars Menu Button */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden flex items-center justify-center gap-1.5 h-8.5 px-2.5 rounded-lg bg-[#1769FF] text-white hover:bg-[#0B3D91] active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769FF] shrink-0 shadow-sm cursor-pointer border border-blue-400"
            aria-label="Open mobile navigation menu (three bars for home, about, services, contact)"
            aria-expanded="false"
            title="Three bars menu: Home, About, Services, Contact"
          >
            {/* The 3 Bold Horizontal Bars */}
            <div className="flex flex-col justify-between w-3.5 h-2.5 shrink-0" aria-hidden="true">
              <span className="w-full h-0.5 bg-white rounded-full"></span>
              <span className="w-full h-0.5 bg-white rounded-full"></span>
              <span className="w-full h-0.5 bg-white rounded-full"></span>
            </div>
            <span className="text-[11px] font-bold tracking-wider uppercase">Menu</span>
          </button>
        </div>

      </div>

      {/* Mobile Sticky Quick Navigation Bar (Compact, proportional tabs) */}
      <div className="lg:hidden bg-slate-50/95 border-t border-[#E1E6EF] px-2 py-1 overflow-x-auto no-scrollbar flex items-center gap-1 scroll-smooth">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`cursor-pointer whitespace-nowrap text-[11px] font-medium py-1 px-2.5 rounded-md transition-all shrink-0 ${
                isActive
                  ? 'bg-[#1769FF] text-white font-semibold shadow-xs'
                  : 'text-[#646B78] hover:text-[#171A21] hover:bg-slate-200/50'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
