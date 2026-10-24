import React, { useState } from 'react';
import { PageId } from '../types';
import { FOOD_CARDS } from '../data/mockData';
import {
  Apple,
  Dumbbell,
  HeartPulse,
  Droplets,
  Moon,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

interface NutritionPageProps {
  onNavigate: (page: PageId) => void;
  onBookDemo: (service?: string) => void;
}

export const NutritionPage: React.FC<NutritionPageProps> = ({ onNavigate: _onNavigate, onBookDemo }) => {
  const [filterType, setFilterType] = useState<'all' | 'vegetarian' | 'non-vegetarian'>('all');

  const filteredFoods = FOOD_CARDS.filter((food) => {
    if (filterType === 'all') return true;
    return food.type === filterType;
  });

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="bg-[#111318] text-white py-8 sm:py-14 lg:py-20 border-b border-[#1C2028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2.5 sm:space-y-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-[#00A3FF] uppercase tracking-wider">
              <span>Lifestyle & Nutrition Foundations</span>
              <span className="text-slate-500">·</span>
              <span>Sustainable Wellness</span>
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
              Nutrition & Wellness Guidance for Real Life
            </h1>
            <p className="text-xs sm:text-base lg:text-lg text-slate-300 leading-relaxed">
              Fueling your training shouldn't require extreme starvation or artificial restrictions. Learn practical, high-protein eating habits that harmonize with Indian culinary traditions.
            </p>
          </div>
        </div>
      </section>

      {/* Protein & Recovery Educational Strip */}
      <section className="py-8 sm:py-14 lg:py-16 bg-[#EEF5FF] border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider">
                Scientific Recovery Principles
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#171A21] tracking-tight">
                Protein, Muscular Repair & Recovery
              </h2>
              <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-[#646B78] leading-relaxed">
                <p>
                  During strength and resistance training, muscle fibers experience microscopic micro-tears. <strong>Dietary protein provides the essential amino acids</strong> required to repair and rebuild these fibers, leading to improved muscular tone, physical strength, and joint stability.
                </p>
                <p>
                  Rather than relying on unverified supplements or extreme powders, our guidance prioritizes wholesome, nutrient-dense whole foods. Whether you follow a pure vegetarian diet or include poultry and seafood, meeting your daily protein targets is entirely achievable through smart meal structuring.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 sm:pt-2 text-xs text-[#171A21]">
                <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-lg bg-white border border-[#E1E6EF]">
                  <CheckCircle className="w-4 h-4 text-[#16834A] shrink-0" />
                  <span>Supports lean tissue preservation</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-lg bg-white border border-[#E1E6EF]">
                  <CheckCircle className="w-4 h-4 text-[#16834A] shrink-0" />
                  <span>Enhances post-session recovery rate</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#E1E6EF] shadow-md bg-white">
                <div className="aspect-4/3 relative">
                  <img
                    src="/src/assets/images/nutrition_wellness_bowl_1792415114008.jpg"
                    alt="High protein balanced fitness bowl"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 bg-black/80 backdrop-blur-md text-white p-2.5 sm:p-3 rounded-xl text-[11px] sm:text-xs">
                    <span className="text-[#00A3FF] font-bold block">Balanced Indian Plate Composition:</span>
                    <span className="text-slate-300 text-[10px] sm:text-xs">Adequate protein + complex fiber carbohydrates + micronutrient vegetables.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Balanced Nutrition: Varied Food Showcase */}
      <section className="py-8 sm:py-14 lg:py-20 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider mb-1">
                Nutrient-Dense Food Sources
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#171A21] tracking-tight">
                High-Protein & Balanced Food Sources
              </h2>
              <p className="text-[#646B78] text-xs sm:text-sm mt-1 max-w-xl">
                Practical, accessible foods covering both vegetarian and non-vegetarian diets suitable for Pune households.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  filterType === 'all' ? 'bg-white text-[#1769FF] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Sources
              </button>
              <button
                onClick={() => setFilterType('vegetarian')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  filterType === 'vegetarian' ? 'bg-white text-[#1769FF] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Vegetarian
              </button>
              <button
                onClick={() => setFilterType('non-vegetarian')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  filterType === 'non-vegetarian' ? 'bg-white text-[#1769FF] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Non-Vegetarian
              </button>
            </div>
          </div>

          {/* Food Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredFoods.map((food) => (
              <div
                key={food.id}
                className="bg-white rounded-2xl border border-[#E1E6EF] overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="p-4 sm:p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1769FF] uppercase tracking-wider">{food.primaryNutrient}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      food.type === 'vegetarian' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {food.type}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21]">
                      {food.name}
                    </h3>
                    <div className="text-xs text-[#1769FF] font-semibold mt-0.5">
                      {food.proteinApprox}
                    </div>
                  </div>

                  <p className="text-xs text-[#646B78] leading-relaxed">
                    {food.description}
                  </p>
                </div>

                <div className="p-4 sm:p-5 pt-0">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                    <strong className="text-slate-800">Preparation & Tip:</strong> {food.prepTip}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Healthy Habits for Daily Life */}
      <section className="py-8 sm:py-14 lg:py-20 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
            <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider">
              Holistic Health Architecture
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#171A21] tracking-tight">
              5 Pillars of Sustainable Daily Wellness
            </h2>
            <p className="text-xs sm:text-sm text-[#646B78]">
              Workout sessions last one hour; how you sleep, hydrate, and nourish yourself during the remaining 23 hours dictates your progress.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E1E6EF] space-y-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-display font-bold text-[#171A21]">Regular Activity</h3>
              <p className="text-[11px] sm:text-xs text-[#646B78] leading-relaxed">
                Aim for 3–4 focused strength sessions weekly combined with 7,000–10,000 daily steps for steady metabolic health.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E1E6EF] space-y-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center">
                <Moon className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-display font-bold text-[#171A21]">Sleep & Recovery</h3>
              <p className="text-[11px] sm:text-xs text-[#646B78] leading-relaxed">
                7–8 hours of consistent, deep sleep is the prime physiological window where growth hormone repairs muscle fibers.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E1E6EF] space-y-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-display font-bold text-[#171A21]">Proper Hydration</h3>
              <p className="text-[11px] sm:text-xs text-[#646B78] leading-relaxed">
                Drink 2.5–3.5 liters of water daily to maintain cognitive alertness, joint lubrication, and nutrient delivery.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E1E6EF] space-y-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center">
                <Apple className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-display font-bold text-[#171A21]">Consistent Eating</h3>
              <p className="text-[11px] sm:text-xs text-[#646B78] leading-relaxed">
                Regular meal pacing prevents severe glycemic swings and late-night binge episodes after long working hours.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E1E6EF] space-y-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-display font-bold text-[#171A21]">Gradual Progress</h3>
              <p className="text-[11px] sm:text-xs text-[#646B78] leading-relaxed">
                Commit to gradual 1% improvements each week. Compounded discipline creates lifelong physical independence.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Professional Guidance & Scope of Practice Notice */}
      <section className="py-8 sm:py-14 bg-white border-b border-[#E1E6EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-[#E1E6EF] space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#1769FF] shrink-0" />
              <span>Professional Guidance & Clinical Scope of Practice</span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#646B78] leading-relaxed">
              Our nutritional advice consists of educational lifestyle guidelines focused on balanced macronutrient intake, protein adequacy, and hydration to complement physical fitness training. 
            </p>
            <p className="text-[11px] sm:text-xs text-[#646B78] leading-relaxed">
              <strong>Medical Disclaimer:</strong> We do not diagnose, treat, or prescribe medical nutrition therapy for clinical conditions (e.g., severe cardiovascular disease, renal dysfunction, or type-1 diabetes). Clients with diagnosed medical conditions or pregnant individuals should consult their primary physician or licensed clinical dietitian before altering their exercise or dietary regimens.
            </p>
          </div>
        </div>
      </section>

      {/* CTA to Discuss Goals */}
      <section className="py-10 sm:py-16 bg-[#1769FF] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight">
            Discuss Your Fitness & Nutrition Goals with Samir
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Book a free demo to get personalized pointers on structuring your meals and workouts in Pune.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onBookDemo('Nutrition Guidance')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-[#1769FF] bg-white hover:bg-slate-100 rounded-xl shadow-xl transition-all cursor-pointer"
            >
              <span>Discuss Your Fitness Goals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
