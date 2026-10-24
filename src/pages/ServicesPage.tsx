import React from 'react';
import { PageId } from '../types';
import { SERVICES } from '../data/mockData';
import { WordRotator } from '../components/WordRotator';
import { BentoBuild } from '../components/BentoBuild';
import { PriceRoll } from '../components/PriceRoll';
import {
  ArrowRight,
  CheckCircle,
  Calendar,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onBookDemo: (preselectedService?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onBookDemo }) => {
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

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="bg-[#111318] text-white py-8 sm:py-14 lg:py-20 border-b border-[#1C2028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2.5 sm:space-y-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-[#00A3FF] uppercase tracking-wider">
              <span>Tailored Coaching Programs</span>
              <span className="text-slate-500">·</span>
              <span>Pune, Maharashtra</span>
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
              Training Services Tailored to Your Body & Routine
            </h1>
            <p className="text-xs sm:text-base lg:text-lg text-slate-300 leading-relaxed">
              From 1-on-1 personal training in Kothrud to dedicated fitness coaching and nutrition guidance, explore structured services designed around your lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Word Rotator: Tailored Promise by Client Personality */}
      <section className="py-6 sm:py-10 bg-[#111318] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WordRotator />
        </div>
      </section>

      {/* 4-Step Training Approach */}
      <section className="py-8 sm:py-14 lg:py-16 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
            <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider">
              Methodical Progression
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#171A21] tracking-tight">
              Our 4-Step Training Approach
            </h2>
            <p className="text-xs sm:text-sm text-[#646B78]">
              A proven framework ensuring every client trains with clear intention and zero guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {steps.map((s) => (
              <div
                key={s.num}
                className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E1E6EF] space-y-2 sm:space-y-3 shadow-xs relative"
              >
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-[#1769FF]">
                  {s.num}
                </div>
                <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21]">
                  {s.title}
                </h3>
                <p className="text-xs text-[#646B78] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Service Hierarchy (Detailed Breakdown) */}
      <section className="py-8 sm:py-14 lg:py-20 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-14">
          
          <div className="max-w-3xl space-y-2 sm:space-y-3">
            <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider">
              Core Offerings
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-bold text-[#171A21] tracking-tight">
              Detailed Service Portfolio
            </h2>
            <p className="text-xs sm:text-base text-[#646B78] leading-relaxed">
              Pricing packages and exact durations are tailored to individual scheduling and are confirmed during discovery. Select any service to pre-populate your free demo request.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-10">
            {SERVICES.map((service, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="rounded-2xl sm:rounded-3xl border border-[#E1E6EF] overflow-hidden bg-white shadow-xs hover:border-[#1769FF]/50 transition-all p-4 sm:p-6 lg:p-8"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center`}>
                    
                    {/* Visual Media Column */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-[#E1E6EF] relative shadow-sm">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-md font-medium">
                          {service.format}
                        </div>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className={`lg:col-span-7 space-y-3.5 sm:space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div>
                        <div className="text-[11px] sm:text-xs font-semibold text-[#1769FF] uppercase tracking-wider">
                          Program 0{index + 1}
                        </div>
                        <h3 className="text-lg sm:text-2xl font-display font-bold text-[#171A21] mt-0.5 sm:mt-1">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#646B78] leading-relaxed mt-1.5 sm:mt-2">
                          {service.fullDesc}
                        </p>
                      </div>

                      {/* Key Protocol Features */}
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Core Components:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs">
                          {service.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-1.5 text-slate-700 text-xs">
                              <CheckCircle className="w-3.5 h-3.5 text-[#16834A] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Audience & Pricing Flag */}
                      <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                        <div>
                          <strong className="text-[#171A21]">Recommended For:</strong>{' '}
                          <span className="text-[#646B78]">{service.suitableFor}</span>
                        </div>
                        <div>
                          <strong className="text-[#171A21]">Investment & Scheduling:</strong>{' '}
                          <span className="text-[#1769FF] font-semibold">Contact for Details</span>{' '}
                          <span className="text-slate-400 text-[11px]">(Customized to weekly session frequency)</span>
                        </div>
                      </div>

                      {/* Action Trigger */}
                      <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                        <button
                          onClick={() => onBookDemo(service.title)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-[#1769FF] hover:bg-[#0B3D91] rounded-xl shadow-sm transition-all cursor-pointer"
                        >
                          <span>Enquire for {service.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[11px] sm:text-xs text-[#646B78] text-center sm:text-left">
                          Free initial assessment session included
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Bento Build - Modular Snap-In System Tiles */}
      <section className="py-10 sm:py-16 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BentoBuild onBookDemo={(topic) => onBookDemo(topic)} />
        </div>
      </section>

      {/* Price Roll - Value Tiers & Discount Odometer */}
      <section className="py-10 sm:py-16 bg-white border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PriceRoll
            onBookDemo={(planTitle, discount) =>
              onBookDemo(`${planTitle} (${discount}% Discount Claimed)`)
            }
          />
        </div>
      </section>

      {/* Bottom Consultation CTA */}
      <section className="py-10 sm:py-16 bg-[#EEF5FF] border-b border-[#E1E6EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#171A21]">
            Not Sure Which Training Format Fits You?
          </h2>
          <p className="text-xs sm:text-sm text-[#646B78] max-w-xl mx-auto leading-relaxed">
            Our team will assess your current physical baseline, daily commitments, and preferred training environment during a complimentary discovery demo.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onBookDemo('Not Sure')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#111318] hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
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
