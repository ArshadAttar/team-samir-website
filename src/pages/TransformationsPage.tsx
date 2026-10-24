import React, { useState } from 'react';
import { PageId, TransformationItem } from '../types';
import { TRANSFORMATIONS } from '../data/mockData';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { ReviewsShuffle } from '../components/ReviewsShuffle';
import {
  Filter,
  Play,
  Maximize2,
  CheckCircle2,
  ShieldAlert,
  Calendar,
} from 'lucide-react';

interface TransformationsPageProps {
  onNavigate: (page: PageId) => void;
  onBookDemo: () => void;
  onOpenLightbox: (item: TransformationItem) => void;
  onOpenVideo: (item: TransformationItem) => void;
}

export const TransformationsPage: React.FC<TransformationsPageProps> = ({
  onNavigate: _onNavigate,
  onBookDemo,
  onOpenLightbox,
  onOpenVideo,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Case Studies' },
    { id: 'strength', label: 'Strength' },
    { id: 'fitness', label: 'Fitness Progress' },
    { id: 'stories', label: 'Client Stories' },
    { id: 'videos', label: 'Videos' },
  ];

  const filteredItems = TRANSFORMATIONS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="bg-[#111318] text-white py-8 sm:py-14 lg:py-20 border-b border-[#1C2028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2.5 sm:space-y-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-[#00A3FF] uppercase tracking-wider">
              <span>Authentic Progress & Milestones</span>
              <span className="text-slate-500">·</span>
              <span>Pune Clients</span>
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
              Client Transformations & Real Progress Milestones
            </h1>
            <p className="text-xs sm:text-base lg:text-lg text-slate-300 leading-relaxed">
              Explore authentic training journeys, compound lift progressions, and sustainable lifestyle adaptations achieved under Samir's coaching.
            </p>
          </div>
        </div>
      </section>

      {/* Mandatory Ethics & Consent Notice */}
      <section className="bg-amber-50 border-b border-amber-200 py-3 sm:py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-start sm:items-center gap-2.5 sm:gap-3 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-[11px] sm:text-xs leading-relaxed">
            <strong>Transparency & Consent Notice:</strong> Prototype layout uses structured media placeholders labelled for client replacement. Every published transformation on the live production site requires written client consent. No medical cures or identical outcomes are promised.
          </p>
        </div>
      </section>

      {/* Interactive Before / After Sliding Window */}
      <section className="py-8 sm:py-14 bg-white border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BeforeAfterSlider onBookDemo={onBookDemo} />
        </div>
      </section>

      {/* Filter Tabs & Gallery Grid */}
      <section className="py-8 sm:py-14 lg:py-20 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
          
          {/* Functional Filter Tabs Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4 sm:pb-6">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#1769FF]" />
              <span className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
                Filter by Category:
              </span>
            </div>

            {/* Segmented interactive filter buttons */}
            <div className="flex overflow-x-auto no-scrollbar items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-white text-[#1769FF] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl overflow-hidden bg-white border border-[#E1E6EF] hover:border-[#1769FF] hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Media Frame */}
                  <div className="aspect-4/3 relative overflow-hidden bg-slate-900">
                    <img
                      src={item.afterImg}
                      alt={item.clientNamePlaceholder}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                      referrerPolicy="no-referrer"
                    />

                    {/* Overlay Action trigger */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.isVideo ? (
                        <button
                          onClick={() => onOpenVideo(item)}
                          className="px-3.5 py-2 rounded-xl bg-[#1769FF] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Coaching Reel ({item.videoDuration})</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onOpenLightbox(item)}
                          className="px-3.5 py-2 rounded-xl bg-white text-[#171A21] text-xs font-bold flex items-center gap-1.5 shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-[#1769FF]" />
                          <span>Inspect Baseline vs Progress</span>
                        </button>
                      )}
                    </div>

                    {/* Timeline Tag */}
                    <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md text-white text-[10px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md font-medium">
                      {item.duration}
                    </div>

                    {/* Video Tag */}
                    {item.isVideo && (
                      <div className="absolute top-2.5 right-2.5 bg-[#1769FF] text-white text-[10px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md font-semibold flex items-center gap-1">
                        <Play className="w-3 h-3 fill-current" />
                        <span>VIDEO</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#1769FF] uppercase tracking-wider text-[11px]">
                        {item.category.toUpperCase()}
                      </span>
                      <span className="text-[#646B78] text-[11px]">{item.duration}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21] group-hover:text-[#1769FF] transition-colors">
                      {item.clientNamePlaceholder}
                    </h3>

                    <div className="text-xs text-slate-500">
                      <strong>Focus Area:</strong> {item.focusArea}
                    </div>

                    <p className="text-xs text-[#646B78] leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#16834A]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.milestone}</span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="p-4 sm:p-5 pt-0 space-y-1.5">
                  <button
                    onClick={() => (item.isVideo ? onOpenVideo(item) : onOpenLightbox(item))}
                    className="w-full py-2 px-3 text-xs font-semibold text-[#1769FF] bg-[#EEF5FF] hover:bg-[#1769FF] hover:text-white rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{item.isVideo ? 'Play Video Breakdown' : 'Compare Before & After'}</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>

                  <p className="text-[10px] text-slate-400 italic text-center">
                    Replace with approved client asset
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Live Reviews Shuffle */}
      <section className="py-10 sm:py-16 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
            <h2 className="text-xl sm:text-3xl font-display font-bold text-[#171A21]">
              Live Trainee Reviews & Outcomes
            </h2>
            <p className="text-xs sm:text-sm text-[#646B78]">
              Verified client testimonials self-shuffling live. Click card to pause or swipe for next.
            </p>
          </div>
          <ReviewsShuffle />
        </div>
      </section>

      {/* Start Transformation CTA */}
      <section className="py-10 sm:py-16 bg-[#111318] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white tracking-tight">
            Ready to Build Your Own Transformation Story?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Begin with a comprehensive assessment of your starting biomechanics, movement history, and training schedule with Samir in Kothrud, Pune.
          </p>
          <div className="pt-2">
            <button
              onClick={onBookDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#1769FF] hover:bg-[#00A3FF] rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Complimentary Demo</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
