import React from 'react';
import { Home, Dumbbell, Calendar } from 'lucide-react';
import { PageId } from '../types';
import { pageLink } from '../lib/routes';

interface MobileBottomBarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenMobileMenu: () => void;
  onBookDemo: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  currentPage,
  onNavigate,
  onOpenMobileMenu,
  onBookDemo,
}) => {
  return (
    <aside
      aria-label="Mobile quick actions"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E1E6EF] px-2 py-1.5 shadow-2xl"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-1">
        {/* Home Tab */}
        <a
          {...pageLink('home', onNavigate)}
          className={`flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 rounded-lg transition-all cursor-pointer ${
            currentPage === 'home' ? 'text-[#1769FF] font-semibold' : 'text-[#646B78] hover:text-[#171A21]'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[length:max(10px,calc(10rem/16))] mt-0.5">Home</span>
        </a>

        {/* Services Tab */}
        <a
          {...pageLink('services', onNavigate)}
          className={`flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 rounded-lg transition-all cursor-pointer ${
            currentPage === 'services' ? 'text-[#1769FF] font-semibold' : 'text-[#646B78] hover:text-[#171A21]'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span className="text-[length:max(10px,calc(10rem/16))] mt-0.5">Services</span>
        </a>

        {/* The 3-Bars Menu Button in Bottom Bar */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 rounded-lg text-[#171A21] hover:bg-[#EEF5FF] transition-all cursor-pointer"
          title="Open full menu with all pages"
        >
          <div className="flex flex-col justify-between w-4 h-3 shrink-0" aria-hidden="true">
            <span className="w-full h-0.5 bg-[#1769FF] rounded-full"></span>
            <span className="w-full h-0.5 bg-[#1769FF] rounded-full"></span>
            <span className="w-full h-0.5 bg-[#1769FF] rounded-full"></span>
          </div>
          <span className="text-[length:max(10px,calc(10rem/16))] font-bold text-[#1769FF] mt-0.5">Menu</span>
        </button>

        {/* Free Demo Action Tab (Balanced with other tabs) */}
        <button
          onClick={onBookDemo}
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-lg text-[#1769FF] hover:bg-blue-50 active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-7 h-5 rounded-md bg-[#1769FF] text-white flex items-center justify-center shadow-2xs">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <span className="text-[length:max(10px,calc(10rem/16))] font-bold text-[#1769FF] mt-0.5">Demo</span>
        </button>
      </div>
    </aside>
  );
};
