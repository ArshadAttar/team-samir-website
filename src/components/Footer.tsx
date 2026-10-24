import React from 'react';
import { PageId } from '../types';
import { TeamSamirLogo } from './TeamSamirLogo';
import { MapPin, Phone, Mail, Clock, MessageSquare, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onBookDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onBookDemo }) => {
  return (
    <footer className="bg-[#111318] text-white border-t border-[#1C2028]">
      {/* Top Banner / Pre-footer callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 border-b border-[#1C2028]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-6">
          <div>
            <div className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#00A3FF] mb-0.5 sm:mb-1">
              TS Fitness · Kothrud, Pune
            </div>
            <h3 className="text-base sm:text-2xl lg:text-3xl font-display font-bold text-white tracking-tight">
              Start Your Personalized Fitness Journey with Samir
            </h3>
            <p className="text-[#646B78] text-xs sm:text-sm mt-0.5 sm:mt-1 max-w-xl">
              5 Years of Experience · 250+ Clients Trained · 25+ Celebrities Trained · TS Fitness Studio, Pune.
            </p>
          </div>
          <button
            onClick={onBookDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 min-h-[40px] sm:min-h-0 text-xs sm:text-sm font-semibold text-white bg-[#1769FF] hover:bg-[#00A3FF] rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <span>Book Free Demo Session</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10">
        {/* Brand & About Column (4 cols) */}
        <div className="lg:col-span-4 space-y-3 sm:space-y-4">
          <TeamSamirLogo variant="dark" size="sm" />
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
            High-standard personal fitness training, athletic coaching, and sustainable nutrition guidance led by Coach Samir at TS Fitness in Kothrud, Pune.
          </p>
          <div className="flex items-center gap-2 sm:gap-3 pt-1">
            <a
              href={`https://wa.me/${BUSINESS_INFO.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#1C2028] hover:bg-emerald-950/60 border border-emerald-800 text-[11px] sm:text-xs text-emerald-400 transition-colors"
            >
              <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
            <a
              href={`tel:${BUSINESS_INFO.contact.phoneRaw}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#1C2028] hover:bg-blue-950/60 border border-blue-800 text-[11px] sm:text-xs text-blue-400 transition-colors"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Call Us</span>
            </a>
          </div>
        </div>

        {/* Quick Links & Services: 2-column grid on mobile, individual cols on desktop */}
        <div className="grid grid-cols-2 gap-4 col-span-1 md:contents lg:contents">
          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-2 sm:space-y-3">
            <h4 className="text-[11px] sm:text-xs font-semibold text-slate-300 uppercase tracking-wider">Pages</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer text-left">
                  About Samir
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Training Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('transformations')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Transformations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('nutrition')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Nutrition & Wellness
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Contact & Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Training Formats */}
          <div className="lg:col-span-2 space-y-2 sm:space-y-3">
            <h4 className="text-[11px] sm:text-xs font-semibold text-slate-300 uppercase tracking-wider">Services</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  1-on-1 Personal Training
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Fitness Coaching
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('nutrition')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Nutrition Guidance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Offline TS Fitness Studio
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Direct Contact Information (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5 sm:space-y-3">
          <h4 className="text-[11px] sm:text-xs font-semibold text-slate-300 uppercase tracking-wider">Location & Contact</h4>
          <div className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-400">
            <div className="flex items-start gap-2 sm:gap-2.5">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A3FF] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium text-xs sm:text-sm">{BUSINESS_INFO.location.fullAddress}</p>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">DP Road, Kothrud, Pune, Maharashtra 411038</p>
              </div>
            </div>
            
            {/* Direct Clickable Phone */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A3FF] shrink-0" />
              <a
                href={`tel:${BUSINESS_INFO.contact.phoneRaw}`}
                className="text-white hover:text-[#00A3FF] font-medium transition-colors"
              >
                {BUSINESS_INFO.contact.phone}
              </a>
            </div>

            {/* Direct Clickable WhatsApp */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16834A] shrink-0" />
              <a
                href={`https://wa.me/${BUSINESS_INFO.contact.whatsappNumber}?text=${encodeURIComponent(
                  'Hi Samir, I want to book a free demo session at TS Fitness in Pune.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#16834A] font-medium transition-colors"
              >
                {BUSINESS_INFO.contact.whatsapp} (WhatsApp Direct)
              </a>
            </div>

            {/* Direct Clickable Email */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A3FF] shrink-0" />
              <a
                href={`mailto:${BUSINESS_INFO.contact.email}`}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {BUSINESS_INFO.contact.email}
              </a>
            </div>

            {/* Working Hours */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A3FF] shrink-0" />
              <span className="text-[11px] sm:text-xs text-slate-300">{BUSINESS_INFO.contact.workingHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-6 border-t border-[#1C2028] flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-slate-400">
        <div className="flex items-center gap-1.5 sm:gap-2 text-center sm:text-left">
          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16834A] shrink-0" />
          <span>© {new Date().getFullYear()} TeamSamir & TS Fitness Pune. All rights reserved.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-slate-400">
          <span>Kothrud, Pune</span>
          <span>·</span>
          <span>Certified Personal Training & Coaching</span>
        </div>
      </div>
    </footer>
  );
};
