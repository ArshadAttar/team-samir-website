import React from 'react';
import { X, Phone, MessageSquare, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface PlaceholderDialogProps {
  type: 'call' | 'whatsapp' | 'verification' | null;
  onClose: () => void;
  onNavigateToDemo: () => void;
}

export const PlaceholderDialog: React.FC<PlaceholderDialogProps> = ({
  type,
  onClose,
  onNavigateToDemo,
}) => {
  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            {type === 'call' && <Phone className="w-5 h-5 text-[#1769FF]" />}
            {type === 'whatsapp' && <MessageSquare className="w-5 h-5 text-[#16834A]" />}
            {type === 'verification' && <ShieldCheck className="w-5 h-5 text-[#1769FF]" />}
            <h3 className="text-base font-display font-bold text-[#171A21]">
              {type === 'call' && 'Direct Call Action Placeholder'}
              {type === 'whatsapp' && 'WhatsApp Chat Action Placeholder'}
              {type === 'verification' && 'Design & Verification Audit Guide'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-sm text-[#171A21]">
          {type === 'call' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#EEF5FF] border border-[#E1E6EF] text-xs space-y-1">
                <span className="text-[#646B78] uppercase font-bold text-[10px] tracking-wider">
                  Configured Business Line
                </span>
                <div className="font-mono text-sm font-bold text-[#1769FF]">
                  {BUSINESS_INFO.contact.phone}
                </div>
              </div>
              <p className="text-xs text-[#646B78] leading-relaxed">
                Dummy business phone number configured. Tapping this on mobile triggers a direct call.
              </p>
            </div>
          )}

          {type === 'whatsapp' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                <span className="text-emerald-800 uppercase font-bold text-[10px] tracking-wider">
                  WhatsApp Direct Business Line
                </span>
                <div className="font-mono text-sm font-bold text-[#16834A]">
                  {BUSINESS_INFO.contact.whatsapp}
                </div>
              </div>
              <p className="text-xs text-[#646B78] leading-relaxed">
                Tapping this button opens WhatsApp with an automatic pre-populated message: <em className="text-slate-800">"Hi Samir, I'm interested in booking a free demo personal training session in Kothrud, Pune."</em>
              </p>
            </div>
          )}

          {type === 'verification' && (
            <div className="space-y-3 text-xs">
              <p className="text-[#646B78] leading-relaxed">
                This website is currently in <strong>Design and Wireframe Prototype Phase</strong>. The following client-supplied figures are presented with transparent audit status:
              </p>

              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16834A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">5 Years Experience & Fitness Talk:</strong> Confirmed background narrative.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-950">250+ Clients & 25+ Celebrities:</strong> Client-supplied claims pending formal audit before public release.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-950">Flat No. 3, XYZ Apartment, DP Road:</strong> Apartment detail editable prior to launch.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Dismiss
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateToDemo();
            }}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#1769FF] hover:bg-[#0B3D91] rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Fill Demo Form
          </button>
        </div>

      </div>
    </div>
  );
};
