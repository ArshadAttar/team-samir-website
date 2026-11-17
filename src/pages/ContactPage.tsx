import React, { useEffect, useRef, useState } from 'react';
import { submitEnquiry } from '../lib/submitEnquiry';
import { BookingIntent, EnquiryFormData, EnquiryFormErrors } from '../types';
import { BUSINESS_INFO, SERVICES } from '../data/mockData';
import { EnquiryPlanPanel, planLabel, planValue, TRIAL_VALUE } from '../components/EnquiryPlanPanel';
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  Navigation,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Send,
} from 'lucide-react';

interface ContactPageProps {
  /** Decides which plans show on the left, the preselected plan and the form heading */
  bookingIntent: BookingIntent;
  highlightPlaceholders: boolean;
}

const CONTACT_METHODS = ['Phone Call', 'WhatsApp', 'Email'] as const;

const GOALS = [
  'Fat Loss / Weight Management',
  'Muscle Building',
  'Strength Training',
  'General Fitness & Health',
  'Flexibility & Posture',
  'Senior Fitness / Mobility',
  'Other',
];

// Validation rules
const NAME_MAX = 50;
const EMAIL_MAX = 100;
const PHONE_LEN = 10;
const NAME_RE = /^[A-Za-z][A-Za-z .'-]*$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const IN_MOBILE_RE = /^[6-9]\d{9}$/; // Indian mobile: 10 digits starting 6-9

const validate = (data: EnquiryFormData, sameAsMobile: boolean): EnquiryFormErrors => {
  const errors: EnquiryFormErrors = {};
  const name = data.fullName.trim();
  if (!name) errors.fullName = 'Name is required.';
  else if (name.length < 2) errors.fullName = 'Name must be at least 2 characters.';
  else if (!NAME_RE.test(name)) errors.fullName = 'Use letters and spaces only.';

  const email = data.email.trim();
  if (email && !EMAIL_RE.test(email)) errors.email = 'Enter a valid email, e.g. name@example.com.';

  if (!data.mobileNumber) errors.mobileNumber = 'Mobile number is required.';
  else if (!IN_MOBILE_RE.test(data.mobileNumber)) errors.mobileNumber = 'Enter a valid 10-digit mobile number.';

  if (!sameAsMobile) {
    if (!data.whatsappNumber) errors.whatsappNumber = 'WhatsApp number is required.';
    else if (!IN_MOBILE_RE.test(data.whatsappNumber)) errors.whatsappNumber = 'Enter a valid 10-digit WhatsApp number.';
  }
  return errors;
};

/** Plan preselected from the button the visitor clicked */
const initialPlan = (intent: BookingIntent): string => {
  if (intent.kind === 'trial') return TRIAL_VALUE;
  if (intent.kind === 'service') {
    const service = SERVICES.find((s) => s.id === intent.serviceId);
    if (!service) return '';
    const plan = service.plans.find((p) => p.name === intent.planName) ?? service.plans.find((p) => p.popular) ?? service.plans[0];
    return plan ? planValue(service.id, plan.name) : '';
  }
  return '';
};

/** Form heading follows the button the visitor clicked */
const formHeading = (intent: BookingIntent): { title: string; sub: string } => {
  if (intent.heading) return { title: intent.heading, sub: 'Share your details and we will call you to plan your first session.' };
  if (intent.kind === 'trial') return { title: 'Book Trial – INR 1,999', sub: 'Start your 1-Week trial with TeamSamir. We will call you to confirm your slot.' };
  if (intent.kind === 'service') {
    const service = SERVICES.find((s) => s.id === intent.serviceId);
    const name = service?.title ?? 'this program';
    return intent.planName
      ? { title: `Book ${name} – ${intent.planName}`, sub: 'Your chosen plan is already selected below. We will call you to confirm the details.' }
      : { title: `Enquire for ${name}`, sub: 'Share your details and we will help you pick the right plan.' };
  }
  return { title: 'Book Your Free Demo Session', sub: 'Share your details and we will call you to plan your free demo.' };
};

const inputClass = (hasError: boolean) =>
  `w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all disabled:bg-slate-50 disabled:text-slate-500 ${
    hasError ? 'border-[#C62828] focus:ring-[#C62828]/20 bg-red-50/20' : 'border-[#E1E6EF] focus:ring-[#1769FF]/20 focus:border-[#1769FF]'
  }`;

const SUCCESS_RESET_MS = 5000;

/**
 * Countdown bar on the success screen. Calls onDone after `duration` ms of
 * un-paused time; pausing (hover / keyboard focus) freezes the remaining time.
 */
const AutoResetBar: React.FC<{ duration: number; paused: boolean; onDone: () => void }> = ({ duration, paused, onDone }) => {
  const [elapsed, setElapsed] = useState(0);
  const elapsedRef = useRef(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (paused) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsedRef.current = Math.min(duration, elapsedRef.current + (now - last));
      last = now;
      setElapsed(elapsedRef.current);
      if (elapsedRef.current >= duration) {
        doneRef.current();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, duration]);

  const remaining = Math.max(0, duration - elapsed);
  return (
    <div className="max-w-lg mx-auto space-y-1.5" aria-live="off">
      <div
        className="h-1.5 w-full rounded-full bg-[#E1E6EF] overflow-hidden"
        role="progressbar"
        aria-label="Time until a new form opens"
        aria-valuemin={0}
        aria-valuemax={duration / 1000}
        aria-valuenow={Math.ceil(remaining / 1000)}
      >
        <div
          className={`h-full rounded-full ${paused ? 'bg-slate-400' : 'bg-[#1769FF]'}`}
          style={{ width: `${(remaining / duration) * 100}%` }}
        />
      </div>
      <p className="text-[length:max(11px,calc(11rem/16))] text-slate-500">
        {paused ? 'Paused – move away to continue' : `A new form opens in ${Math.ceil(remaining / 1000)}s · hover to pause`}
      </p>
    </div>
  );
};

const FieldError: React.FC<{ id: string; message?: string }> = ({ id, message }) =>
  message ? (
    <p id={id} className="text-xs text-[#C62828] mt-1 flex items-center gap-1">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  ) : null;

export const ContactPage: React.FC<ContactPageProps> = ({ bookingIntent, highlightPlaceholders }) => {
  const emptyForm = (): EnquiryFormData => ({
    fullName: '',
    email: '',
    mobileNumber: '',
    whatsappNumber: '',
    goal: '',
    plan: initialPlan(bookingIntent),
    contactMethod: 'Phone Call',
  });

  const [formData, setFormData] = useState<EnquiryFormData>(emptyForm);
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [resetPaused, setResetPaused] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const shownAt = useRef(Date.now());

  const heading = formHeading(bookingIntent);

  // Update a field; once the visitor has tried to submit, re-check errors as they type
  const update = (patch: Partial<EnquiryFormData>, same = sameAsMobile) => {
    const next = { ...formData, ...patch };
    setFormData(next);
    if (triedSubmit) setErrors(validate(next, same));
  };

  const digitsOnly = (value: string) => value.replace(/\D/g, '').slice(0, PHONE_LEN);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setTriedSubmit(true);
    setSubmitError('');
    const found = validate(formData, sameAsMobile);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setIsSubmitting(true);
    try {
      await submitEnquiry({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        mobileNumber: formData.mobileNumber,
        whatsappNumber: sameAsMobile ? formData.mobileNumber : formData.whatsappNumber,
        goal: formData.goal,
        plan: planLabel(formData.plan),
        contactMethod: formData.contactMethod,
        formTitle: heading.title,
        pageUrl: window.location.href,
        website: honeypot,
        elapsedMs: Date.now() - shownAt.current,
      });
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Could not send your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(emptyForm());
    setSameAsMobile(true);
    setErrors({});
    setTriedSubmit(false);
    setIsSubmitted(false);
    setSubmitError('');
    setResetPaused(false);
    shownAt.current = Date.now();
  };

  const whatsapp = sameAsMobile ? formData.mobileNumber : formData.whatsappNumber;

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="bg-[#111318] text-white py-8 sm:py-12 lg:py-14 border-b border-[#1C2028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2.5 sm:space-y-4">
            <div className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2 gap-y-0.5 text-[length:max(11px,calc(11rem/16))] sm:text-xs font-semibold text-[#00A3FF] uppercase tracking-wider [&>span]:whitespace-nowrap">
              <span>Pune Direct Consultation</span>
              <span className="text-slate-500">·</span>
              <span>Complimentary 1-on-1 Demo</span>
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-5xl font-display font-extrabold tracking-tight text-white text-balance">
              Let's Plan Your Fitness Journey
            </h1>
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              Share a few details about your goals and our team can discuss suitable training options with you.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Plans (left) + Enquiry form (right) */}
      <section className="py-8 sm:py-12 lg:py-14 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-5">
              <EnquiryPlanPanel
                intent={bookingIntent}
                selectedPlan={formData.plan}
                onSelectPlan={(plan) => update({ plan })}
              />
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E1E6EF] p-4 sm:p-6 lg:p-8 shadow-sm">
                {isSubmitted ? (
                  /* Success state: auto-returns to a fresh form after 5s; hover or focus pauses */
                  <div
                    className="space-y-6 text-center py-6 animate-in fade-in zoom-in-95 duration-300"
                    onMouseEnter={() => setResetPaused(true)}
                    onMouseLeave={() => setResetPaused(false)}
                    onFocus={() => setResetPaused(true)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setResetPaused(false);
                    }}
                  >
                    <AutoResetBar duration={SUCCESS_RESET_MS} paused={resetPaused} onDone={handleReset} />
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16834A] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#171A21]">
                        Thank You, {formData.fullName.trim()}!
                      </h3>
                      <p className="text-sm text-[#646B78] max-w-md mx-auto leading-relaxed">
                        We have your request. Samir's team will contact you by <strong className="text-[#171A21]">{formData.contactMethod}</strong> soon.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs space-y-2.5 max-w-lg mx-auto">
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-1 border-b border-slate-200">
                        Your Request
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                        <div><strong>Name:</strong> {formData.fullName.trim()}</div>
                        <div><strong>Mobile:</strong> +91 {formData.mobileNumber}</div>
                        <div><strong>WhatsApp:</strong> +91 {whatsapp}</div>
                        <div><strong>Email:</strong> {formData.email.trim() || '—'}</div>
                        <div><strong>Goal:</strong> {formData.goal || '—'}</div>
                        <div><strong>Contact by:</strong> {formData.contactMethod}</div>
                        <div className="sm:col-span-2"><strong>Plan:</strong> {planLabel(formData.plan)}</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 max-w-lg mx-auto flex items-start gap-2.5 text-left">
                      <ShieldCheck className="w-4 h-4 text-[#1769FF] shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        Your details are shared only with Samir's team and used only to contact you about this request.
                      </p>
                    </div>

                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1769FF] text-white font-semibold text-xs hover:bg-[#0B3D91] transition-all cursor-pointer shadow-sm"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Submit Another Request</span>
                    </button>
                  </div>
                ) : (
                  /* Enquiry form: 6 fields + preferred contact method */
                  <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#1769FF] uppercase tracking-wider">Enquiry Form</span>
                        <span className="text-xs text-slate-400"><span className="text-red-500">*</span> Required</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-display font-bold text-[#171A21] mt-1">{heading.title}</h2>
                      <p className="text-xs sm:text-sm text-[#646B78] mt-1">{heading.sub}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* 1. Name (required) */}
                      <div>
                        <label htmlFor="fullName" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          autoComplete="name"
                          maxLength={NAME_MAX}
                          value={formData.fullName}
                          onChange={(e) => update({ fullName: e.target.value })}
                          placeholder="e.g. Rahul Patil"
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                          className={inputClass(!!errors.fullName)}
                        />
                        <FieldError id="fullName-error" message={errors.fullName} />
                      </div>

                      {/* 2. Email (optional) */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                          Email <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          maxLength={EMAIL_MAX}
                          value={formData.email}
                          onChange={(e) => update({ email: e.target.value })}
                          placeholder="rahul@example.com"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className={inputClass(!!errors.email)}
                        />
                        <FieldError id="email-error" message={errors.email} />
                      </div>

                      {/* 3. Mobile number (required, 10 digits) */}
                      <div>
                        <label htmlFor="mobileNumber" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">+91</span>
                          <input
                            id="mobileNumber"
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            maxLength={PHONE_LEN}
                            value={formData.mobileNumber}
                            onChange={(e) => update({ mobileNumber: digitsOnly(e.target.value) })}
                            placeholder="98765 43210"
                            aria-invalid={!!errors.mobileNumber}
                            aria-describedby={errors.mobileNumber ? 'mobileNumber-error' : undefined}
                            className={`${inputClass(!!errors.mobileNumber)} pl-12`}
                          />
                        </div>
                        <FieldError id="mobileNumber-error" message={errors.mobileNumber} />
                      </div>

                      {/* 4. WhatsApp number (required, 10 digits; can copy mobile) */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <label htmlFor="whatsappNumber" className="block text-xs font-semibold text-[#171A21]">
                            WhatsApp Number <span className="text-red-500">*</span>
                          </label>
                          <label className="inline-flex items-center gap-1.5 text-[length:max(11px,calc(11rem/16))] text-[#646B78] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={sameAsMobile}
                              onChange={(e) => {
                                setSameAsMobile(e.target.checked);
                                update({}, e.target.checked);
                              }}
                              className="w-3.5 h-3.5 rounded text-[#1769FF] border-slate-300 focus:ring-[#1769FF] cursor-pointer"
                            />
                            Same as mobile
                          </label>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">+91</span>
                          <input
                            id="whatsappNumber"
                            type="tel"
                            inputMode="numeric"
                            maxLength={PHONE_LEN}
                            value={whatsapp}
                            disabled={sameAsMobile}
                            onChange={(e) => update({ whatsappNumber: digitsOnly(e.target.value) })}
                            placeholder="98765 43210"
                            aria-invalid={!!errors.whatsappNumber}
                            aria-describedby={errors.whatsappNumber ? 'whatsappNumber-error' : undefined}
                            className={`${inputClass(!!errors.whatsappNumber)} pl-12`}
                          />
                        </div>
                        <FieldError id="whatsappNumber-error" message={errors.whatsappNumber} />
                      </div>

                      {/* 5. Goal (optional) */}
                      <div>
                        <label htmlFor="goal" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                          Your Goal <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <select
                          id="goal"
                          value={formData.goal}
                          onChange={(e) => update({ goal: e.target.value })}
                          className={`${inputClass(false)} cursor-pointer`}
                        >
                          <option value="">Select your goal</option>
                          {GOALS.map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </div>

                      {/* 6. Plan (optional; preselected from the button clicked) */}
                      <div>
                        <label htmlFor="plan" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                          Plan <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <select
                          id="plan"
                          value={formData.plan}
                          onChange={(e) => update({ plan: e.target.value })}
                          className={`${inputClass(false)} cursor-pointer`}
                        >
                          <option value="">{planLabel('')}</option>
                          <option value={TRIAL_VALUE}>{planLabel(TRIAL_VALUE)}</option>
                          {SERVICES.map((s) => (
                            <optgroup key={s.id} label={s.title}>
                              {s.plans.map((p) => (
                                <option key={p.name} value={planValue(s.id, p.name)}>
                                  {s.title} – {p.name}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>

                      {/* Preferred contact method: Phone Call (default), WhatsApp, Email */}
                      <div className="sm:col-span-2">
                        <span className="block text-xs font-semibold text-[#171A21] mb-1.5">Preferred Contact Method</span>
                        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Preferred contact method">
                          {CONTACT_METHODS.map((method) => (
                            <button
                              key={method}
                              type="button"
                              role="radio"
                              aria-checked={formData.contactMethod === method}
                              onClick={() => update({ contactMethod: method })}
                              className={`min-h-11 py-2 px-2 sm:px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                                formData.contactMethod === method
                                  ? 'bg-[#EEF5FF] text-[#1769FF] border-[#1769FF]'
                                  : 'bg-white text-slate-700 border-[#E1E6EF] hover:bg-slate-50'
                              }`}
                            >
                              {method}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Honeypot: hidden from people, bots fill it in */}
                    <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div>
                      {submitError && (
                        <div role="alert" className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-[#C62828] flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>
                            {submitError} You can also call us at{' '}
                            <a href={`tel:${BUSINESS_INFO.contact.phoneRaw}`} className="font-semibold underline">
                              {BUSINESS_INFO.contact.phone}
                            </a>
                            .
                          </span>
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 sm:py-3.5 px-4 sm:px-5 min-h-[44px] text-xs sm:text-sm font-bold text-white bg-[#1769FF] hover:bg-[#0B3D91] active:scale-[0.99] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
                      >
                        {isSubmitting ? (
                          <span>Sending...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Request</span>
                          </>
                        )}
                      </button>
                      <p className="text-[length:max(10px,calc(10rem/16))] sm:text-[length:max(11px,calc(11rem/16))] text-center text-slate-400 mt-2">
                        By submitting, you agree to be contacted by TeamSamir about this request. No spam.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Trainer & Location Info (horizontal) */}
      <section className="py-8 sm:py-12 lg:py-14 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider mb-1">Connect Directly</div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#171A21] tracking-tight">
                Trainer & Location Info
              </h2>
              <p className="text-xs sm:text-sm text-[#646B78] mt-1">Coaching available in Kothrud, Pune.</p>
            </div>
            <a
              href={`tel:${BUSINESS_INFO.contact.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#EEF5FF] text-[#171A21] border border-[#E1E6EF] hover:border-[#1769FF] text-xs font-semibold transition-all cursor-pointer shadow-xs shrink-0"
            >
              <Phone className="w-4 h-4 text-[#1769FF]" />
              <span>Call {BUSINESS_INFO.contact.phone}</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* Contact details: 2-column grid of items */}
            <div
              className={`lg:col-span-6 p-5 sm:p-6 rounded-2xl border grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 transition-all ${
                highlightPlaceholders ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-300' : 'bg-white border-[#E1E6EF] shadow-xs'
              }`}
            >
              <InfoItem icon={<Sparkles className="w-4 h-4" />} label="Head Trainer & Founder" accent>
                <div className="text-sm font-bold text-[#171A21]">TeamSamir (TS Fitness)</div>
                <div className="text-xs text-[#646B78]">{BUSINESS_INFO.experienceYears}+ Years Experience · Former Coach at Fitness Talk</div>
              </InfoItem>

              <InfoItem icon={<MapPin className="w-4 h-4" />} label="Studio Location">
                <div className="text-sm font-semibold text-[#171A21]">{BUSINESS_INFO.location.fullAddress}</div>
                <p className="text-[length:max(11px,calc(11rem/16))] text-slate-500 mt-0.5">Kothrud, Pune, Maharashtra 411038</p>
              </InfoItem>

              <InfoItem icon={<Phone className="w-4 h-4" />} label="Phone Number">
                <a href={`tel:${BUSINESS_INFO.contact.phoneRaw}`} className="inline-block py-1 lg:py-0 text-sm font-medium text-slate-900 hover:text-[#1769FF] transition-colors">
                  {BUSINESS_INFO.contact.phone}
                </a>
              </InfoItem>

              <InfoItem icon={<MessageSquare className="w-4 h-4" />} label="WhatsApp Business" green>
                <a
                  href={`https://wa.me/${BUSINESS_INFO.contact.whatsappNumber}?text=${encodeURIComponent(
                    'Hi Samir, I want to book a free demo session at TS Fitness in Pune.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 lg:py-0 text-sm font-medium text-[#16834A] hover:underline"
                >
                  {BUSINESS_INFO.contact.whatsapp} (Direct Chat)
                </a>
              </InfoItem>

              <InfoItem icon={<Mail className="w-4 h-4" />} label="Email Address">
                <a href={`mailto:${BUSINESS_INFO.contact.email}`} className="inline-block py-1 lg:py-0 text-sm font-medium text-slate-900 break-all hover:text-[#1769FF] transition-colors">
                  {BUSINESS_INFO.contact.email}
                </a>
              </InfoItem>

              <InfoItem icon={<Clock className="w-4 h-4" />} label="Operating Hours">
                <div className="text-xs font-medium text-slate-800">{BUSINESS_INFO.contact.workingHours}</div>
              </InfoItem>
            </div>

            {/* Live Google Map */}
            <div className="lg:col-span-6 rounded-2xl border border-[#E1E6EF] bg-white p-5 sm:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-[#171A21]">Near Ashish Garden Banquet Hall</h3>
                  <p className="text-xs text-[#646B78] mt-1">Kothrud, Pune, Maharashtra</p>
                </div>
                <Navigation className="w-5 h-5 text-[#1769FF] shrink-0" />
              </div>
              <div className="relative w-full flex-1 min-h-[220px] rounded-xl overflow-hidden border border-slate-200">
                <iframe
                  title="Ashish Garden Banquet Hall Location"
                  src="https://maps.google.com/maps?q=18.5026368,73.8025847&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://www.google.com/maps/place/Ashish+Garden+Banquet+Hall/@18.5026368,73.8025847,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1769FF] hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/** One labelled row in the Trainer & Location card */
const InfoItem: React.FC<{ icon: React.ReactNode; label: string; accent?: boolean; green?: boolean; children: React.ReactNode }> = ({
  icon,
  label,
  accent,
  green,
  children,
}) => (
  <div className="flex items-start gap-3">
    <div
      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
        green ? 'bg-emerald-50 text-[#16834A]' : 'bg-[#EEF5FF] text-[#1769FF]'
      }`}
    >
      {icon}
    </div>
    <div className="min-w-0">
      <span className={`text-xs font-bold uppercase tracking-wider ${accent ? 'text-[#1769FF]' : 'text-slate-500'}`}>{label}</span>
      <div className="mt-0.5">{children}</div>
    </div>
  </div>
);
