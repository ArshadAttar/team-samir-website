import React, { useState, useEffect } from 'react';
import { BookingIntent, PageId, ServiceItem, WeekDay } from '../types';
import { SERVICES } from '../data/mockData';
import { HeroReveal } from '../components/HeroReveal';
import {
  ArrowRight,
  CheckCircle,
  Calendar,
  ChevronDown,
  Info,
  Tag,
  Star,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onBookDemo: (intent?: string | BookingIntent) => void;
  /** Service id whose Plan Details should be open (and scrolled to) on arrival */
  initialOpenServiceId?: string;
}

const WEEK_DAYS: WeekDay[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const steps = [
  {
    num: '01',
    title: 'Understand Goals',
    desc: "Comprehensive review of the client's targets, current activity level, lifestyle constraints, and schedule.",
  },
  {
    num: '02',
    title: 'Discuss Experience & Needs',
    desc: 'In-depth assessment of lifting experience, joint history, mobility limitations, and recovery bandwidth.',
  },
  {
    num: '03',
    title: 'Develop Training Approach',
    desc: 'Constructing a progressive, structured weekly routine split and Indian-friendly nutritional guidelines.',
  },
  {
    num: '04',
    title: 'Review Progress & Adjust',
    desc: 'Continuous biofeedback, progressive overload calibration, and periodic check-ins to ensure safe progress.',
  },
];

/** Expandable panel: overview → 7-day week strip → plan cards */
const PlanDetails: React.FC<{ service: ServiceItem; onBookDemo: (intent?: string | BookingIntent) => void }> = ({
  service,
  onBookDemo,
}) => (
  <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-[#E1E6EF] space-y-6 sm:space-y-8">
    {/* 1. Plan overview */}
    <div className="space-y-3">
      <h4 className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
        <Info className="w-3.5 h-3.5 text-[#1769FF]" />
        Plan Overview
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {service.planInfo.map((info) => (
          <div key={info.label} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[length:max(11px,calc(11rem/16))] font-semibold text-slate-500 uppercase tracking-wide">{info.label}</div>
            <div className="text-xs sm:text-sm font-medium text-[#171A21] mt-0.5">{info.value}</div>
          </div>
        ))}
      </div>
    </div>

    {/* 2. Weekly schedule */}
    <div className="space-y-3">
      <h4 className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
        <Calendar className="w-3.5 h-3.5 text-[#1769FF]" />
        Your Week
      </h4>
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 max-w-xl">
        {WEEK_DAYS.map((day) => {
          const isActive = service.activeDays.includes(day);
          return (
            <div
              key={day}
              className={`rounded-lg sm:rounded-xl py-2 sm:py-3 text-center border transition-colors ${
                isActive
                  ? 'bg-[#1769FF] border-[#1769FF] text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              <div className="text-[length:max(11px,calc(11rem/16))] sm:text-sm font-bold">{day}</div>
              <div className={`text-[length:max(9px,calc(9rem/16))] sm:text-[length:max(10px,calc(10rem/16))] mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                {isActive ? 'Active' : 'Rest'}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[length:max(11px,calc(11rem/16))] sm:text-xs text-[#646B78]">{service.activeDaysLabel}</p>
    </div>

    {/* 3. Plan cards */}
    <div className="space-y-3">
      <h4 className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
        <Tag className="w-3.5 h-3.5 text-[#1769FF]" />
        Choose Your Plan
      </h4>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 ${
          service.plans.length >= 3 ? 'lg:grid-cols-3' : 'lg:max-w-3xl'
        }`}
      >
        {service.plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-4 sm:p-5 flex flex-col justify-between gap-4 ${
              plan.popular ? 'border-[#1769FF] ring-2 ring-[#1769FF]/15 bg-[#EEF5FF]/40' : 'border-[#E1E6EF] bg-white'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1769FF] text-white text-[length:max(10px,calc(10rem/16))] font-bold uppercase tracking-wide">
                <Star className="w-3 h-3 fill-current" />
                Most Popular
              </span>
            )}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-base sm:text-lg font-display font-bold text-[#171A21]">{plan.name}</div>
                  <div className="text-[length:max(11px,calc(11rem/16))] sm:text-xs text-[#646B78]">{plan.duration}</div>
                </div>
                {plan.discount > 0 ? (
                  <span className="shrink-0 px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[#16834A] text-[length:max(11px,calc(11rem/16))] sm:text-xs font-bold">
                    Save {plan.discount}%
                  </span>
                ) : (
                  <span className="shrink-0 px-2 py-1 rounded-lg bg-slate-100 text-slate-500 text-[length:max(11px,calc(11rem/16))] font-semibold">
                    Regular price
                  </span>
                )}
              </div>
              <ul className="space-y-1.5">
                {plan.points.map((point) => (
                  <li key={point} className="flex items-start gap-1.5 text-xs text-slate-700">
                    <CheckCircle className="w-3.5 h-3.5 text-[#16834A] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => onBookDemo({ kind: 'service', serviceId: service.id, planName: plan.name })}
              className={`w-full py-2.5 px-4 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                plan.popular
                  ? 'bg-[#1769FF] text-white hover:bg-[#0B3D91]'
                  : 'bg-[#EEF5FF] text-[#1769FF] hover:bg-[#1769FF] hover:text-white'
              }`}
            >
              <span>Choose {plan.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
      <p className="text-[length:max(11px,calc(11rem/16))] text-slate-400">
        Prices are shared on your free call. Discounts are on the regular monthly fee.
      </p>
    </div>
  </div>
);

const scrollToService = (id: string) => {
  // Wait a frame so the layout settles (the previously open card may have just collapsed)
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBookDemo, initialOpenServiceId }) => {
  // Accordion: only one service's Plan Details is open at a time
  const [openServiceId, setOpenServiceId] = useState<string | null>(initialOpenServiceId ?? null);

  // Arriving from a Home page service card: jump to that card with its plan details open
  useEffect(() => {
    if (initialOpenServiceId) scrollToService(initialOpenServiceId);
  }, [initialOpenServiceId]);

  const togglePlan = (id: string) => {
    const opening = openServiceId !== id;
    setOpenServiceId(opening ? id : null);
    if (opening) scrollToService(id);
  };

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="bg-[#111318] text-white py-6 sm:py-10 lg:py-14 border-b border-[#1C2028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 sm:space-y-3">
            {/* Same word-by-word reveal as the Home hero; single line, font scales with screen width */}
            <HeroReveal
              sentence="Your fitness. Your goals. Our expertise"
              highlightWords={['Our','expertise']}
              headingClassName="flex flex-nowrap whitespace-nowrap font-extrabold leading-tight text-[clamp(0.75rem,3.4vw,2.25rem)]"
            />
            <p className="max-w-3xl text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed">
              Train with K11-Certified Fitness Coaches, Backed by One of the World’s Leading Fitness Education Institutes.
            </p>
          </div>
        </div>
      </section>

      {/* Core Offerings: Detailed Service Portfolio */}
      <section className="pt-5 pb-8 sm:pt-6 sm:pb-10 lg:pt-8 lg:pb-10 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <div className="max-w-3xl space-y-2 sm:space-y-3">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-bold text-[#171A21] tracking-tight">
              Detailed Service Portfolio
            </h2>
            <p className="text-xs sm:text-base text-[#646B78] leading-relaxed">
              Tap <strong className="text-[#171A21]">Plan Details</strong> on any program to see what's included, your monthly schedule and the plans you can choose from.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-10">
            {SERVICES.map((service, index) => {
              const isEven = index % 2 === 1;
              const isOpen = openServiceId === service.id;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`scroll-mt-28 lg:scroll-mt-24 rounded-2xl sm:rounded-3xl border overflow-hidden bg-white shadow-xs transition-all p-4 sm:p-6 lg:p-8 ${
                    isOpen ? 'border-[#1769FF]/60' : 'border-[#E1E6EF] hover:border-[#1769FF]/50'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center">
                    {/* Image */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-[#E1E6EF] relative shadow-sm">
                        <img loading="lazy" decoding="async"
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[length:max(11px,calc(11rem/16))] px-2.5 py-1 rounded-md font-medium">
                          {service.format}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`lg:col-span-7 space-y-3.5 sm:space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div>
                        <div className="text-[length:max(11px,calc(11rem/16))] sm:text-xs font-semibold text-[#1769FF] uppercase tracking-wider">
                          Program 0{index + 1}
                        </div>
                        <h3 className="text-lg sm:text-2xl font-display font-bold text-[#171A21] mt-0.5 sm:mt-1">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#646B78] leading-relaxed mt-1.5 sm:mt-2">
                          {service.fullDesc}
                        </p>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="text-[length:max(11px,calc(11rem/16))] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
                          What You Get:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                          {service.features.map((feat) => (
                            <div key={feat} className="flex items-start gap-1.5 text-slate-700 text-xs">
                              <CheckCircle className="w-3.5 h-3.5 text-[#16834A] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-1 grid grid-cols-1 sm:flex sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                        <button
                          onClick={() => togglePlan(service.id)}
                          aria-expanded={isOpen}
                          aria-controls={`${service.id}-plans`}
                          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                            isOpen
                              ? 'bg-[#111318] text-white border-[#111318]'
                              : 'bg-white text-[#171A21] border-slate-300 hover:border-[#1769FF] hover:text-[#1769FF]'
                          }`}
                        >
                          <span>{isOpen ? 'Hide Plan Details' : 'Plan Details'}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <button
                          onClick={() => onBookDemo({ kind: 'service', serviceId: service.id })}
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-[#1769FF] hover:bg-[#0B3D91] rounded-xl shadow-sm transition-all cursor-pointer"
                        >
                          <span>Enquire for {service.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {isOpen && (
                    <div id={`${service.id}-plans`}>
                      <PlanDetails service={service} onBookDemo={onBookDemo} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-Step Training Approach + "Not sure?" CTA, kept compact so both fit on one screen */}
      <section className="py-8 sm:py-10 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
          <div className="rounded-2xl bg-[#EEF5FF] border border-[#1769FF]/20 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 text-center md:text-left">
            <div className="space-y-1">
              <h2 className="text-base sm:text-xl font-display font-bold text-[#171A21]">
                Not Sure Which Training Format Fits You?
              </h2>
              <p className="text-xs sm:text-sm text-[#646B78] max-w-2xl leading-relaxed">
                Our team will assess your current fitness, daily routine, and preferred way of training during a free discovery demo.
              </p>
            </div>
            <button
              onClick={() => onBookDemo()}
              className="shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#111318] hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#00A3FF]" />
              <span>Request Personalised Assessment</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
