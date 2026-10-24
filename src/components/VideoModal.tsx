import React, { useState } from 'react';
import { TransformationItem } from '../types';
import { X, Play, Pause, RotateCcw, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';

interface VideoModalProps {
  item: TransformationItem | null;
  onClose: () => void;
  onBookDemo: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ item, onClose, onBookDemo }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedClip, setSelectedClip] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState(5);

  if (!item) return null;

  const clips = [
    {
      id: 1,
      title: 'Coach Samir Gym Presence Reel',
      sub: 'Official TeamSamir Polo in Gym Floor',
      img: '/src/assets/images/hero_samir_ts_fitness_1792417382753.jpg',
      duration: '00:10',
    },
    {
      id: 2,
      title: 'Female Client Coaching & Posture',
      sub: 'Kettlebell Squat & Movement Assessment',
      img: '/src/assets/images/hd_female_client_coaching_1792417382622.jpg',
      duration: '00:15',
    },
    {
      id: 3,
      title: 'Male Strength & Hypertrophy Session',
      sub: 'Dumbbell Press & Form Correction',
      img: '/src/assets/images/hd_male_client_strength_1792417382210.jpg',
      duration: '00:12',
    },
  ];

  const activeClip = clips.find((c) => c.id === selectedClip) || clips[0];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-[#111318] text-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-800 animate-in fade-in duration-200">
        
        {/* Top Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1769FF]" />
            <h3 className="text-sm font-semibold text-white tracking-wide">
              {activeClip.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          <img
            src={activeClip.img}
            alt={activeClip.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-90' : 'opacity-60'}`}
            referrerPolicy="no-referrer"
          />

          {/* Central Play/Pause trigger */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-10 w-16 h-16 rounded-full bg-[#1769FF]/90 hover:bg-[#00A3FF] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl cursor-pointer"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1 fill-current" />}
          </button>

          {/* On-screen Watermark */}
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-xs px-3 py-1 rounded-md text-[11px] font-semibold text-[#00A3FF] border border-slate-700">
            TS Fitness Studio · Pune
          </div>

          {/* Bottom video controls scrubber */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2">
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div className="bg-[#1769FF] h-full w-3/5 rounded-full" />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white cursor-pointer font-medium"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={() => setCurrentTime(0)}
                  className="hover:text-white cursor-pointer flex items-center gap-1 text-slate-400"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart</span>
                </button>
                <span>00:{currentTime < 10 ? `0${currentTime}` : currentTime} / {activeClip.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-slate-400" />
                <span className="text-[11px] text-slate-400">1080p HD Studio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Clips Switcher (Reels Selector) */}
        <div className="p-4 bg-[#1C2028] border-b border-slate-800 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Available HD Coaching Videos:
          </div>
          <div className="grid grid-cols-3 gap-2">
            {clips.map((clip) => (
              <button
                key={clip.id}
                onClick={() => {
                  setSelectedClip(clip.id);
                  setIsPlaying(true);
                  setCurrentTime(0);
                }}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedClip === clip.id
                    ? 'bg-[#1769FF]/20 border-[#1769FF] text-white'
                    : 'bg-[#111318] border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold line-clamp-1">{clip.title}</div>
                <div className="text-[10px] text-slate-400 line-clamp-1">{clip.duration}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Info & Demo CTA */}
        <div className="p-5 space-y-3 bg-[#111318]">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="text-[#00A3FF] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Coach Samir Training Protocol</span>
            </span>
            <span className="text-slate-400">TS Fitness, Kothrud Pune</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Real coaching footage demonstrating disciplined lifting mechanics, posture guidance, and motivational 1-on-1 personal training.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookDemo();
              }}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#1769FF] hover:bg-[#00A3FF] rounded-lg transition-colors cursor-pointer"
            >
              Book Free Demo With Samir
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
