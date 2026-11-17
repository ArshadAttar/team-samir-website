import React, { useEffect, useRef, useState } from 'react';
import { PageId } from '../types';
import { TeamSamirLogo } from './TeamSamirLogo';
import { Calendar } from 'lucide-react';
import { pageLink } from '../lib/routes';

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
    { id: 'services', label: 'Services' },
    { id: 'senior-fitness', label: 'Senior Fitness' },
    { id: 'transformations', label: 'Transformations' },
    { id: 'about', label: 'About Samir' },
  ];

  // Hide the header while scrolling down the page, bring it back on any scroll up.
  // While it is hidden, a floating "Free Consultation" button takes its place.
  const [isHidden, setIsHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        if (y < 80) setIsHidden(false);           // always visible near the top
        else if (delta > 6) setIsHidden(true);    // scrolling down
        else if (delta < -6) setIsHidden(false);  // scrolling up
        if (Math.abs(delta) > 6 || y < 80) lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
    <header
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E1E6EF] transition-transform duration-300 ease-out ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Primary Top Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-18 lg:h-20 flex items-center justify-between gap-2 sm:gap-6">
        
        {/* Zone 1: Brand Wordmark (Compact on mobile so it never crowds controls) */}
        <a
          {...pageLink('home', onNavigate)}
          className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769FF] rounded-md transition-opacity hover:opacity-90 shrink-0 text-left"
          aria-label="Go to TeamSamir Home"
        >
          <div className="sm:hidden">
            <TeamSamirLogo variant="light" size="sm" />
          </div>
          <div className="hidden sm:block">
            <TeamSamirLogo variant="light" size="md" />
          </div>
        </a>

        {/* Zone 2: Desktop Navigation Links (single-line, unboxed, NO numbers) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-[#171A21]" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                {...pageLink(item.id, onNavigate)}
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
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Direct Actions & Compact Mobile 3-Bars Menu */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        
          {/* Primary CTA (Desktop and Tablet only) */}
          <button
            onClick={onBookDemo}
            className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-4 lg:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1769FF] hover:bg-[#0B3D91] active:scale-[0.98] rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            Free Consultation
          </button>

          {/* Compact, Sleek Mobile Three Bars Menu Button */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg bg-[#1769FF] text-white hover:bg-[#0B3D91] active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769FF] shrink-0 shadow-sm cursor-pointer border border-blue-400"
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
            <span className="text-[length:max(11px,calc(11rem/16))] font-bold tracking-wider uppercase">Menu</span>
          </button>
        </div>

      </div>

      {/* Mobile Sticky Quick Navigation Bar (Compact, proportional tabs) */}
      <div className="lg:hidden bg-slate-50/95 border-t border-[#E1E6EF] px-2 sm:px-4 py-1 overflow-x-auto no-scrollbar flex items-center gap-1 sm:gap-1.5 scroll-smooth">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <a
              key={item.id}
              {...pageLink(item.id, onNavigate)}
              className={`cursor-pointer whitespace-nowrap text-[length:max(11px,calc(11rem/16))] sm:text-xs font-medium min-h-[34px] py-1.5 px-3 rounded-md transition-all shrink-0 ${
                isActive
                  ? 'bg-[#1769FF] text-white font-semibold shadow-xs'
                  : 'text-[#646B78] hover:text-[#171A21] hover:bg-slate-200/50'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </header>

    {/* Floating "Free Consultation" shown only while the header is hidden */}
    <button
      onClick={onBookDemo}
      tabIndex={isHidden ? 0 : -1}
      aria-hidden={!isHidden}
      className={`fixed top-3 right-3 sm:right-6 lg:right-8 z-40 inline-flex items-center gap-2 min-h-[44px] px-4 lg:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1769FF] hover:bg-[#0B3D91] active:scale-[0.98] rounded-xl shadow-lg shadow-[#1769FF]/30 transition-all duration-300 ease-out cursor-pointer whitespace-nowrap ${
        isHidden ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0 pointer-events-none'
      }`}
    >
      <Calendar className="w-4 h-4 shrink-0" />
      Free Consultation
    </button>
    </>
  );
};
