import React, { useState } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { PageId } from '../types';
import { BUSINESS_INFO } from '../data/mockData';
import { img } from '../data/seniorFitnessMedia';
import { SeniorTransformations } from '../components/senior-fitness/SeniorTransformations';
import {
  Activity,
  ArrowRight,
  Bone,
  Calendar,
  CheckCircle2,
  Dumbbell,
  HeartPulse,
  Home,
  Scale,
  ShieldCheck,
  Smile,
  Users,
} from 'lucide-react';

interface SeniorFitnessPageProps {
  onNavigate: (page: PageId) => void;
  onBookDemo: (preselectedService?: string) => void;
}

const SERVICE_NAME = 'Senior Fitness';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Shared animation helpers                                            */
/* ------------------------------------------------------------------ */

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

/**
 * Image with a slow zoom-out reveal and a branded placeholder if the file is missing.
 * `fill` makes it cover its positioned parent (absolute inset-0) instead of sizing itself.
 * `imgClassName` goes on a wrapper, so CSS hover transforms don't fight the reveal animation.
 */
const SeniorImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fill?: boolean;
  /** CSS object-position, to keep the subject in frame when the image is cropped */
  position?: string;
  /** Above-the-fold image: load immediately with high priority */
  priority?: boolean;
}> = ({ src, alt, className = '', imgClassName = '', fill = false, position, priority = false }) => {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      className={`${fill ? 'absolute inset-0' : 'relative'} overflow-hidden bg-[#1C2028] ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
    >
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1C2028] via-[#111318] to-[#0B3D91] text-center px-6">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />
          <Users className="relative w-8 h-8 text-[#00A3FF]/70" />
          <span className="relative text-[length:max(11px,calc(11rem/16))] sm:text-xs text-slate-400 max-w-[16rem] leading-snug">{alt}</span>
        </div>
      ) : (
        <div className={`w-full h-full ${imgClassName}`}>
          <motion.img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
            style={position ? { objectPosition: position } : undefined}
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
        </div>
      )}
    </motion.div>
  );
};

const SectionHeading: React.FC<{ kicker: string; title: string; desc?: string; dark?: boolean; center?: boolean }> = ({
  kicker,
  title,
  desc,
  dark = false,
  center = true,
}) => (
  <Reveal className={`max-w-2xl space-y-2 sm:space-y-3 ${center ? 'mx-auto text-center' : ''}`}>
    <div className={`text-[length:max(11px,calc(11rem/16))] sm:text-xs font-bold uppercase tracking-wider ${dark ? 'text-[#00A3FF]' : 'text-[#1769FF]'}`}>
      {kicker}
    </div>
    <h2
      className={`text-xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight ${
        dark ? 'text-white' : 'text-[#171A21]'
      }`}
    >
      {title}
    </h2>
    {desc && (
      <p className={`text-xs sm:text-base leading-relaxed ${dark ? 'text-slate-300' : 'text-[#646B78]'}`}>{desc}</p>
    )}
  </Reveal>
);

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const WHY_IT_MATTERS = [
  {
    icon: Dumbbell,
    title: 'Maintain Muscle Strength',
    desc: 'After 50, we slowly lose muscle every year. Regular strength training keeps your body strong for daily tasks.',
  },
  {
    icon: Activity,
    title: 'Improve Mobility',
    desc: 'Gentle movement keeps joints flexible, so bending, climbing stairs and getting up feel easier.',
  },
  {
    icon: Scale,
    title: 'Better Balance & Coordination',
    desc: 'Balance training trains your body to react quickly and helps reduce the risk of falls.',
  },
  {
    icon: HeartPulse,
    title: 'Bone & Heart Health',
    desc: 'Weight-bearing exercise supports bone strength, and regular activity keeps your heart healthy.',
  },
  {
    icon: Home,
    title: 'Stay Independent',
    desc: 'Strong legs and a steady body let you keep living life your way, without depending on others.',
  },
  {
    icon: Smile,
    title: 'Confidence & Well-Being',
    desc: 'Exercise lifts your mood, improves sleep and gives you the confidence to stay active and social.',
  },
];

const WHY_ME = [
  { title: 'Personalized Attention', desc: 'One-on-one sessions where I focus only on you.' },
  { title: 'Safe & Controlled Movements', desc: 'Slow, steady exercises with no sudden or risky moves.' },
  { title: 'Proper Exercise Technique', desc: 'I guide your posture and form on every single rep.' },
  { title: 'Gradual Progression', desc: 'We increase the challenge step by step, never in a rush.' },
  { title: 'Individual Workout Modifications', desc: 'Exercises adjusted for knee pain, back pain, BP or sugar.' },
  { title: 'Motivation & Continuous Guidance', desc: 'Encouragement in every session and support between them.' },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export const SeniorFitnessPage: React.FC<SeniorFitnessPageProps> = ({ onBookDemo }) => {
  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-white overflow-hidden">
        {/* ============================================================
            1. HERO
            ============================================================ */}
        <section className="relative bg-[#111318] text-white py-8 sm:py-12 lg:py-14 border-b border-[#1C2028]">
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#1769FF] blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#00A3FF] blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <Reveal>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[length:max(11px,calc(11rem/16))] sm:text-xs font-semibold text-[#00A3FF] uppercase tracking-wider">
                  <span>Senior Fitness</span>
                  <span className="text-slate-500">·</span>
                  <span>Ages 50-80</span>

                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] via-[#38BDF8] to-[#1769FF]">
                    Strong at Every Age. Fit for Life.
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl">
Personal, one-on-one fitness training for senior citizens. we help older adults build strength, move freely, improve balance and stay independent, with safe exercises planned around your body and your health.
                </p>
              </Reveal>
              <Reveal delay={0.24} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <button
                  onClick={() => onBookDemo(SERVICE_NAME)}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#1769FF] hover:bg-[#00A3FF] rounded-xl shadow-lg shadow-[#1769FF]/30 transition-all cursor-pointer active:scale-[0.98]"
                >
                  <span>Start Your Fitness Journey</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Reveal>
              <Reveal delay={0.32} className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm text-slate-300">
                {['1-on-1 supervised sessions', 'Safe for beginners', 'Follows your doctor\'s advice'].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00A3FF]" />
                    {t}
                  </span>
                ))}
              </Reveal>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#1769FF]/30 via-transparent to-[#00A3FF]/20 rounded-3xl -rotate-2 blur-sm" />
              <SeniorImage
                src={img('hero')}
                priority
                alt="Senior woman lifting light dumbbells during a guided gym session"
                position="22% center"
                className="relative aspect-square rounded-3xl border border-slate-700/80 shadow-2xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
                className="absolute -bottom-5 left-4 sm:-left-6 bg-white text-[#171A21] rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EEF5FF] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#1769FF]" />
                </div>
                <div>
                  <div className="text-sm font-bold">Safety First</div>
                  <div className="text-[length:max(11px,calc(11rem/16))] text-[#646B78]">Every move supervised by Coach</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. WHY SENIOR FITNESS MATTERS
            ============================================================ */}
        <section className="py-8 sm:py-12 lg:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            <SectionHeading
              kicker="Why It Matters"
              title="Why Senior Fitness Matters"
              desc="Exercise is one of the best things you can do for your health as you get older. It keeps your body strong and your mind positive, and helps you live life on your own terms."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {WHY_IT_MATTERS.map(({ icon: Icon, title, desc }, idx) => (
                <Reveal key={title} delay={(idx % 3) * 0.08}>
                  <div className="group h-full p-5 sm:p-6 rounded-2xl border border-[#E1E6EF] bg-white hover:border-[#1769FF]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#EEF5FF] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#1769FF]">
                      <Icon className="w-6 h-6 text-[#1769FF] transition-colors duration-300 group-hover:text-white" />
                    </div>
                    <h3 className="mt-4 text-base sm:text-lg font-display font-bold text-[#171A21]">{title}</h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-[#646B78] leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            4. TRANSFORMATIONS (description, photo gallery, video gallery)
            ============================================================ */}
        <SeniorTransformations />

        {/* ============================================================
            3. WHY TRAIN WITH ME (content left, image right)
            ============================================================ */}
        <section className="py-8 sm:py-12 lg:py-14 bg-slate-50 border-y border-[#E1E6EF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center lg:items-stretch">
            <div className="lg:col-span-7 space-y-8 order-2 lg:order-1 lg:self-center">
              <SectionHeading
                center={false}
                kicker="Why Train With Me"
                title="Training You Can Trust"
                desc="As your coach, my job is to make every session safe, comfortable and effective, so you feel stronger and more confident every week."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                {WHY_ME.map((item, idx) => (
                  <Reveal key={item.title} delay={(idx % 2) * 0.08}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1769FF] flex items-center justify-center shrink-0 shadow-md shadow-[#1769FF]/30">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-display font-bold text-[#171A21]">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-[#646B78] leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* On desktop the image fills the row height set by the text column, so both sides match */}
            <div className="lg:col-span-5 relative order-1 lg:order-2 lg:min-h-[360px]">
              <SeniorImage
                src={img('why-me')}
                alt="Mature woman holding a yoga triangle pose outdoors"
                position="center 40%"
                className="aspect-4/3 lg:aspect-auto lg:absolute lg:inset-0 rounded-3xl shadow-2xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                className="absolute -top-4 -right-2 sm:-right-5 bg-[#111318] text-white rounded-2xl shadow-xl px-4 py-3"
              >
                <div className="text-2xl font-display font-extrabold text-[#00A3FF]">{BUSINESS_INFO.experienceYears}+ yrs</div>
                <div className="text-[length:max(11px,calc(11rem/16))] text-slate-300">Coaching experience</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. FINAL CTA (background image)
            ============================================================ */}
        <section className="relative py-10 sm:py-14 lg:py-16 text-white">
          <SeniorImage
            src={img('cta')}
            alt="Senior women exercising together in a group class"
            position="center 30%"
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111318]/95 via-[#111318]/85 to-[#0B3D91]/70" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6">
            <Reveal>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-balance">
                It's Never Too Late to Start Getting Stronger.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Take the first step towards a healthier, more active and independent lifestyle.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onBookDemo(SERVICE_NAME)}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base font-bold text-[#1769FF] bg-white hover:bg-slate-100 rounded-xl shadow-2xl transition-all cursor-pointer active:scale-[0.98]"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Your Senior Fitness Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>
        </section>

      </div>
    </MotionConfig>
  );
};
