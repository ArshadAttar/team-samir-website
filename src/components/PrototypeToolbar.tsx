import React from 'react';
import { PageId } from '../types';
import { Eye, ShieldCheck, HelpCircle, Layout, Layers } from 'lucide-react';

interface PrototypeToolbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  highlightPlaceholders: boolean;
  onToggleHighlight: () => void;
  onShowPlaceholderNotice: () => void;
  isWireframeMode: boolean;
  onToggleWireframeMode: () => void;
}

export const PrototypeToolbar: React.FC<PrototypeToolbarProps> = ({
  currentPage,
  onNavigate,
  highlightPlaceholders,
  onToggleHighlight,
  onShowPlaceholderNotice,
  isWireframeMode,
  onToggleWireframeMode,
}) => {
  const pages: { id: PageId; label: string }[] = [
    { id: 'home', label: '1. Home' },
    { id: 'about', label: '2. About Samir' },
    { id: 'services', label: '3. Services' },
    { id: 'transformations', label: '4. Transformations' },
    { id: 'nutrition', label: '5. Nutrition' },
    { id: 'contact', label: '6. Demo Form' },
  ];

  return (
    <div className="bg-[#1C2028] text-white border-b border-slate-800 text-xs py-2 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Phase indicator & notice */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-semibold text-[#00A3FF]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Wireframe & Design Prototype</span>
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-300">
            Samir Fitness (Kothrud, Pune)
          </span>
          <button
            onClick={onShowPlaceholderNotice}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white underline cursor-pointer"
            title="View verification and placeholder guidelines"
          >
            <HelpCircle className="w-3 h-3 text-[#00A3FF]" />
            <span className="hidden sm:inline">Audit Checklist</span>
          </button>
        </div>

        {/* Center: Page Jump Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => onNavigate(p.id)}
              className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap cursor-pointer ${
                currentPage === p.id
                  ? 'bg-[#1769FF] text-white font-medium'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Right: Wireframe Toggle & Placeholder highlight toggle */}
        <div className="flex items-center gap-2">
          {/* Wireframe vs High-Fidelity switcher */}
          <button
            onClick={onToggleWireframeMode}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded transition-all cursor-pointer font-medium ${
              isWireframeMode
                ? 'bg-blue-500 text-white shadow-sm ring-1 ring-blue-300'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Switch between Wireframe Blueprint Mode and High-Fidelity Visual Mode"
          >
            {isWireframeMode ? <Layers className="w-3.5 h-3.5" /> : <Layout className="w-3.5 h-3.5" />}
            <span>{isWireframeMode ? 'Wireframe Blueprint Active' : 'Wireframe Mode'}</span>
          </button>

          <button
            onClick={onToggleHighlight}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded transition-all cursor-pointer font-medium ${
              highlightPlaceholders
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Toggle visible highlights for placeholders needing client confirmation before public launch"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{highlightPlaceholders ? 'Placeholders Highlighted' : 'Highlight Placeholders'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
