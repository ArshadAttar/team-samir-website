import React from 'react';
import { TransformationItem } from '../types';
import { X, CheckCircle2, ShieldAlert } from 'lucide-react';

interface LightboxModalProps {
  item: TransformationItem | null;
  onClose: () => void;
  onBookDemo: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose, onBookDemo }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="text-xs uppercase font-bold text-[#1769FF] tracking-wider">
              Client Case Study Milestone
            </div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-[#171A21]">
              {item.clientNamePlaceholder}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Split / Comparison */}
        <div className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Before Card */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Phase 1: Starting Baseline
              </div>
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                <img
                  src={item.beforeImg}
                  alt={`Baseline condition for ${item.clientNamePlaceholder}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs text-white text-xs px-2.5 py-1.5 rounded-md">
                  {item.beforeLabel}
                </div>
              </div>
            </div>

            {/* After Card */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#1769FF] uppercase tracking-wider">
                Phase 2: Structured Progress
              </div>
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-[#1769FF]/40">
                <img
                  src={item.afterImg}
                  alt={`Progress outcome for ${item.clientNamePlaceholder}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-[#1769FF]/90 backdrop-blur-xs text-white text-xs px-2.5 py-1.5 rounded-md font-medium">
                  {item.afterLabel}
                </div>
              </div>
            </div>
          </div>

          {/* Details & Methodology */}
          <div className="bg-[#EEF5FF] border border-[#E1E6EF] p-4 rounded-xl space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#171A21]">
              <span className="font-semibold text-[#1769FF]">Timeline: {item.duration}</span>
              <span className="text-[#646B78]">Focus: {item.focusArea}</span>
            </div>
            <p className="text-sm text-[#171A21] leading-relaxed">
              {item.summary}
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#16834A] pt-1">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Verified Milestone: {item.milestone}</span>
            </div>
          </div>

          {/* Consent / Launch notice */}
          <div className="flex items-start gap-2.5 text-xs text-amber-800 bg-amber-50 border border-amber-200 p-3 rounded-lg">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Asset Replacement Notice:</strong> {item.consentNote} Individual outcomes depend on adherence, baseline fitness, and nutritional consistency.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
          >
            Close Preview
          </button>
          <button
            onClick={() => {
              onClose();
              onBookDemo();
            }}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-[#1769FF] hover:bg-[#0B3D91] rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Enquire for Similar Results
          </button>
        </div>
      </div>
    </div>
  );
};
