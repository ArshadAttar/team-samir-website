import React, { useState, useEffect } from 'react';
import { DemoFormData, FormErrors } from '../types';
import { BUSINESS_INFO } from '../data/mockData';
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  Navigation,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Send,
} from 'lucide-react';

interface ContactPageProps {
  initialService?: string;
  highlightPlaceholders: boolean;
  onCallPlaceholder: () => void;
  onWhatsAppPlaceholder: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialService,
  highlightPlaceholders,
  onCallPlaceholder,
  onWhatsAppPlaceholder,
}) => {
  // Form State with all 12 requested fields
  const [formData, setFormData] = useState<DemoFormData>({
    fullName: '',
    mobileNumber: '',
    email: '',
    ageGroup: '20-29',
    trainingType: initialService || 'Personal Training',
    fitnessGoal: 'General Fitness',
    fitnessExperience: 'Beginner',
    preferredLocation: 'Kothrud',
    sessionTiming: 'Morning',
    demoDate: '',
    message: '',
    contactMethod: 'WhatsApp',
    consentAgreed: false,
  });

  // Track if initialService changed
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, trainingType: initialService }));
    }
  }, [initialService]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your complete name.';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required.';
    } else {
      // Basic 10-digit Indian mobile check or international
      const cleanPhone = formData.mobileNumber.replace(/[\s-]/g, '');
      if (!/^\+?[0-9]{10,13}$/.test(cleanPhone)) {
        newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
      }
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.consentAgreed) {
      newErrors.consentAgreed = 'Please confirm consent to be contacted regarding this demo request.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        // Scroll to success banner
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }, 600);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      mobileNumber: '',
      email: '',
      ageGroup: '20-29',
      trainingType: 'Personal Training',
      fitnessGoal: 'General Fitness',
      fitnessExperience: 'Beginner',
      preferredLocation: 'Kothrud',
      sessionTiming: 'Morning',
      demoDate: '',
      message: '',
      contactMethod: 'WhatsApp',
      consentAgreed: false,
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="bg-[#111318] text-white py-8 sm:py-14 lg:py-20 border-b border-[#1C2028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2.5 sm:space-y-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-[#00A3FF] uppercase tracking-wider">
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

      {/* Main Content: Contact Cards & 12-Field Form */}
      <section className="py-8 sm:py-14 lg:py-20 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Business Location, Hours, Contact Placeholders & Quick Actions */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-8">
              
              <div>
                <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider mb-1">
                  Connect Directly
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#171A21] tracking-tight">
                  Trainer & Location Info
                </h2>
                <p className="text-xs sm:text-sm text-[#646B78] mt-1">
                  Coaching available in Kothrud, Pune. Quick direct contact options below:
                </p>
              </div>

              {/* Quick Action Button Group */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${BUSINESS_INFO.contact.phoneRaw}`}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-slate-50 hover:bg-[#EEF5FF] text-[#171A21] border border-[#E1E6EF] hover:border-[#1769FF] text-xs font-semibold transition-all cursor-pointer shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#1769FF]" />
                  <span>Call {BUSINESS_INFO.contact.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.contact.whatsappNumber}?text=${encodeURIComponent(
                    'Hi Samir, I want to book a free demo session at TS Fitness in Pune.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Verified Address & Contact Details Card */}
              <div
                className={`p-6 rounded-2xl border space-y-5 transition-all ${
                  highlightPlaceholders
                    ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-300'
                    : 'bg-white border-[#E1E6EF] shadow-xs'
                }`}
              >
                {/* Trainer Name & Gym */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1769FF] uppercase tracking-wider">
                      Head Trainer & Founder
                    </span>
                    <div className="text-base font-bold text-[#171A21]">Coach Samir (TS Fitness)</div>
                    <div className="text-xs text-[#646B78]">5 Years Experience · Former Coach at Fitness Talk</div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Studio Location
                    </span>
                    <div className="text-sm font-semibold text-[#171A21]">
                      {BUSINESS_INFO.location.fullAddress}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      DP Road, Kothrud, Pune, Maharashtra 411038
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Phone Number
                    </span>
                    <div className="text-sm font-medium text-slate-900 mt-0.5">
                      <a href={`tel:${BUSINESS_INFO.contact.phoneRaw}`} className="hover:text-[#1769FF] transition-colors">
                        {BUSINESS_INFO.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#16834A] flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      WhatsApp Business
                    </span>
                    <div className="text-sm font-medium text-[#16834A] mt-0.5">
                      <a
                        href={`https://wa.me/${BUSINESS_INFO.contact.whatsappNumber}?text=${encodeURIComponent(
                          'Hi Samir, I want to book a free demo session at TS Fitness in Pune.'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {BUSINESS_INFO.contact.whatsapp} (Direct Chat)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Email Address
                    </span>
                    <div className="text-sm font-medium text-slate-900 mt-0.5">
                      <a href={`mailto:${BUSINESS_INFO.contact.email}`} className="hover:text-[#1769FF] transition-colors">
                        {BUSINESS_INFO.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Operating Hours
                    </span>
                    <div className="text-xs font-medium text-slate-800 mt-0.5">
                      {BUSINESS_INFO.contact.workingHours}
                    </div>
                  </div>
                </div>

              </div>


{/* Live Google Maps Location */}
<div className="rounded-2xl border border-[#E1E6EF] overflow-hidden bg-white p-6 space-y-4">
  <div className="flex items-center justify-between gap-3">
    <div>
      <h3 className="text-sm font-bold text-[#171A21]">
       Near Ashish Garden Banquet Hall
      </h3>
      <p className="text-xs text-[#646B78] mt-1">
        Kothrud, Pune, Maharashtra
      </p>
    </div>

    <Navigation className="w-5 h-5 text-[#1769FF] shrink-0" />
  </div>

  {/* Actual Google Map */}
  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200">
    <iframe
      title="Ashish Garden Banquet Hall Location"
      src="https://maps.google.com/maps?q=18.5026368,73.8025847&z=17&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0, position: "absolute", inset: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>

  {/* Open exact venue in Google Maps */}
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

            {/* Right Column: 12-Field Free Demo / Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E1E6EF] p-4 sm:p-6 lg:p-10 shadow-sm">
                
                {isSubmitted ? (
                  /* ========================================================
                     PROTOTYPE SUCCESS CONFIRMATION STATE
                     ======================================================== */
                  <div className="space-y-6 text-center py-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16834A] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs uppercase font-bold text-[#16834A] tracking-wider">
                        Prototype Request Validated
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#171A21]">
                        Thank You, {formData.fullName}!
                      </h3>
                      <p className="text-sm text-[#646B78] max-w-md mx-auto leading-relaxed">
                        Your free demo request for <strong className="text-[#171A21]">{formData.trainingType}</strong> in {formData.preferredLocation} has been registered in this design prototype.
                      </p>
                    </div>

                    {/* Submission Summary Card */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs space-y-2.5 max-w-lg mx-auto">
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-1 border-b border-slate-200">
                        Demo Booking Summary:
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-700">
                        <div><strong>Name:</strong> {formData.fullName}</div>
                        <div><strong>Mobile:</strong> {formData.mobileNumber}</div>
                        <div><strong>Preferred Service:</strong> {formData.trainingType}</div>
                        <div><strong>Primary Goal:</strong> {formData.fitnessGoal}</div>
                        <div><strong>Experience:</strong> {formData.fitnessExperience}</div>
                        <div><strong>Age Bracket:</strong> {formData.ageGroup}</div>
                        <div><strong>Location:</strong> {formData.preferredLocation}</div>
                        <div><strong>Timing:</strong> {formData.sessionTiming}</div>
                        <div><strong>Demo Date:</strong> {formData.demoDate || 'Flexible / Next Available'}</div>
                        <div><strong>Contact Method:</strong> {formData.contactMethod}</div>
                      </div>
                      {formData.message && (
                        <div className="pt-2 border-t border-slate-200 text-slate-600">
                          <strong>Note:</strong> "{formData.message}"
                        </div>
                      )}
                    </div>

                    {/* Mandatory Prototype Simulation Notice */}
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 max-w-lg mx-auto flex items-start gap-2.5 text-left">
                      <ShieldCheck className="w-4 h-4 text-[#1769FF] shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        <strong>Prototype Phase Mode:</strong> Form validation was successfully simulated on the client side. No actual database transaction or live notification was transmitted. Production email and WhatsApp automation will be connected during backend implementation.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1769FF] text-white font-semibold text-xs hover:bg-[#0B3D91] transition-all cursor-pointer shadow-sm"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Submit Another Demo Request</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ========================================================
                     12-FIELD FREE DEMO / ENQUIRY FORM
                     ======================================================== */
                  <form onSubmit={handleSubmit} noValidate className="space-y-8">
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1769FF] uppercase tracking-wider">
                          12-Field Enquiry Flow
                        </span>
                        <span className="text-xs text-slate-400">* Required fields</span>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-[#171A21] mt-1">
                        Book Your Free Demo Session
                      </h3>
                      <p className="text-xs text-[#646B78] mt-1">
                        Complete the fields below to simulate your personalized demo request.
                      </p>
                    </div>

                    {/* SECTION 1: Contact Details (Fields 1 - 4, 12) */}
                    <div className="space-y-4 pt-2">
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center justify-between">
                        <span>1. Your Contact Details</span>
                        <span className="text-slate-400 font-normal">Section 1 of 3</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* 1. Full Name (Required) */}
                        <div>
                          <label htmlFor="fullName" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="e.g. Rahul Patil"
                            className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                              errors.fullName
                                ? 'border-[#C62828] focus:ring-[#C62828]/20 bg-red-50/20'
                                : 'border-[#E1E6EF] focus:ring-[#1769FF]/20 focus:border-[#1769FF]'
                            }`}
                          />
                          {errors.fullName && (
                            <p className="text-xs text-[#C62828] mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{errors.fullName}</span>
                            </p>
                          )}
                        </div>

                        {/* 2. Mobile Number (Required) */}
                        <div>
                          <label htmlFor="mobileNumber" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">
                              +91
                            </span>
                            <input
                              id="mobileNumber"
                              type="tel"
                              inputMode="tel"
                              value={formData.mobileNumber}
                              onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                              placeholder="98765 43210"
                              className={`w-full pl-12 pr-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                                errors.mobileNumber
                                ? 'border-[#C62828] focus:ring-[#C62828]/20 bg-red-50/20'
                                : 'border-[#E1E6EF] focus:ring-[#1769FF]/20 focus:border-[#1769FF]'
                              }`}
                            />
                          </div>
                          {errors.mobileNumber && (
                            <p className="text-xs text-[#C62828] mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{errors.mobileNumber}</span>
                            </p>
                          )}
                        </div>

                        {/* 3. Email Address (Optional) */}
                        <div>
                          <label htmlFor="email" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                            Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            inputMode="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="rahul@example.com"
                            className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                              errors.email
                                ? 'border-[#C62828] focus:ring-[#C62828]/20 bg-red-50/20'
                                : 'border-[#E1E6EF] focus:ring-[#1769FF]/20 focus:border-[#1769FF]'
                            }`}
                          />
                          {errors.email && (
                            <p className="text-xs text-[#C62828] mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{errors.email}</span>
                            </p>
                          )}
                        </div>

                        {/* 4. Age Group (Dropdown) */}
                        <div>
                          <label htmlFor="ageGroup" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                            Age Group
                          </label>
                          <select
                            id="ageGroup"
                            value={formData.ageGroup}
                            onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E1E6EF] bg-white focus:outline-none focus:ring-2 focus:ring-[#1769FF]/20 focus:border-[#1769FF] transition-all cursor-pointer"
                          >
                            <option value="Under 20">Under 20</option>
                            <option value="20-29">20 – 29 Years</option>
                            <option value="30-39">30 – 39 Years</option>
                            <option value="40-49">40 – 49 Years</option>
                            <option value="50+">50+ Years</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: Fitness Preferences (Fields 5, 6, 7, 8) */}
                    <div className="space-y-4 pt-2">
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center justify-between">
                        <span>2. Fitness Preferences & Goals</span>
                        <span className="text-slate-400 font-normal">Section 2 of 3</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* 5. Preferred Training Type (Dropdown) */}
                        <div>
                          <label htmlFor="trainingType" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                            Preferred Training Type
                          </label>
                          <select
                            id="trainingType"
                            value={formData.trainingType}
                            onChange={(e) => setFormData({ ...formData, trainingType: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E1E6EF] bg-white focus:outline-none focus:ring-2 focus:ring-[#1769FF]/20 focus:border-[#1769FF] transition-all cursor-pointer"
                          >
                            <option value="Personal Training">Personal Training (1-on-1)</option>
                            <option value="Fitness Coaching">Fitness Coaching</option>
                            <option value="Nutrition Guidance">Nutrition Guidance</option>
                            <option value="Offline Training">Offline Training (Kothrud)</option>
                            <option value="Not Sure">Not Sure (Need Assessment)</option>
                          </select>
                        </div>

                        {/* 6. Primary Fitness Goal (Dropdown) */}
                        <div>
                          <label htmlFor="fitnessGoal" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                            Primary Fitness Goal
                          </label>
                          <select
                            id="fitnessGoal"
                            value={formData.fitnessGoal}
                            onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E1E6EF] bg-white focus:outline-none focus:ring-2 focus:ring-[#1769FF]/20 focus:border-[#1769FF] transition-all cursor-pointer"
                          >
                            <option value="Strength">Strength & Compound Lifting</option>
                            <option value="General Fitness">General Fitness & Health</option>
                            <option value="Weight Management">Weight Management / Fat Loss</option>
                            <option value="Muscle Building">Muscle Building / Hypertrophy</option>
                            <option value="Flexibility">Flexibility & Posture Correction</option>
                            <option value="Other">Other Specific Objective</option>
                          </select>
                        </div>

                        {/* 7. Current Fitness Experience (Segmented or Dropdown) */}
                        <div>
                          <label htmlFor="fitnessExperience" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                            Current Fitness Experience
                          </label>
                          <select
                            id="fitnessExperience"
                            value={formData.fitnessExperience}
                            onChange={(e) => setFormData({ ...formData, fitnessExperience: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E1E6EF] bg-white focus:outline-none focus:ring-2 focus:ring-[#1769FF]/20 focus:border-[#1769FF] transition-all cursor-pointer"
                          >
                            <option value="Beginner">Beginner (0–6 Months or starting afresh)</option>
                            <option value="Intermediate">Intermediate (6+ Months regular gym)</option>
                            <option value="Experienced">Experienced (2+ Years lifting history)</option>
                          </select>
                        </div>

                        {/* 8. Preferred Training Location */}
                        <div>
                          <label htmlFor="preferredLocation" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                            Preferred Training Location
                          </label>
                          <select
                            id="preferredLocation"
                            value={formData.preferredLocation}
                            onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E1E6EF] bg-white focus:outline-none focus:ring-2 focus:ring-[#1769FF]/20 focus:border-[#1769FF] transition-all cursor-pointer"
                          >
                            <option value="Kothrud">Kothrud, Pune (DP Road Area)</option>
                            <option value="Another Pune Location">Another Pune Location</option>
                            <option value="Discuss With Team">Discuss With Team</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: Demo Scheduling & Preferences (Fields 9, 10, 11, 12 + Consent) */}
                    <div className="space-y-4 pt-2">
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center justify-between">
                        <span>3. Demo Scheduling & Details</span>
                        <span className="text-slate-400 font-normal">Section 3 of 3</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* 9. Preferred Session Timing */}
                        <div>
                          <label htmlFor="sessionTiming" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                            Preferred Session Timing
                          </label>
                          <select
                            id="sessionTiming"
                            value={formData.sessionTiming}
                            onChange={(e) => setFormData({ ...formData, sessionTiming: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E1E6EF] bg-white focus:outline-none focus:ring-2 focus:ring-[#1769FF]/20 focus:border-[#1769FF] transition-all cursor-pointer"
                          >
                            <option value="Morning">Morning (6:00 AM – 11:00 AM)</option>
                            <option value="Afternoon">Afternoon (11:00 AM – 4:00 PM)</option>
                            <option value="Evening">Evening (4:00 PM – 9:00 PM)</option>
                            <option value="Flexible">Flexible</option>
                          </select>
                        </div>

                        {/* 10. Preferred Demo Date (Date picker, Optional) */}
                        <div>
                          <label htmlFor="demoDate" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                            Preferred Demo Date <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <input
                            id="demoDate"
                            type="date"
                            value={formData.demoDate}
                            onChange={(e) => setFormData({ ...formData, demoDate: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E1E6EF] bg-white focus:outline-none focus:ring-2 focus:ring-[#1769FF]/20 focus:border-[#1769FF] transition-all cursor-pointer"
                          />
                        </div>

                        {/* 12. Preferred Contact Method */}
                        <div className="sm:col-span-2">
                          <label htmlFor="contactMethod" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                            Preferred Contact Method
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {(['WhatsApp', 'Phone Call', 'Email'] as const).map((method) => (
                              <button
                                key={method}
                                type="button"
                                onClick={() => setFormData({ ...formData, contactMethod: method })}
                                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
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

                        {/* 11. Additional Requirements / Message (Optional multiline) */}
                        <div className="sm:col-span-2">
                          <label htmlFor="message" className="block text-xs font-semibold text-[#171A21] mb-1.5">
                            Additional Requirements / Questions <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <textarea
                            id="message"
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Share any past injuries, specific targets, or questions for Samir..."
                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E1E6EF] bg-white focus:outline-none focus:ring-2 focus:ring-[#1769FF]/20 focus:border-[#1769FF] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Privacy & Consent Checkbox */}
                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.consentAgreed}
                          onChange={(e) => setFormData({ ...formData, consentAgreed: e.target.checked })}
                          className="mt-1 w-4 h-4 rounded text-[#1769FF] border-slate-300 focus:ring-[#1769FF] cursor-pointer"
                        />
                        <span className="text-xs text-[#646B78] leading-relaxed">
                          I consent to being contacted by Samir and the fitness team via {formData.contactMethod} regarding my demo session enquiry. No automated spam or third-party marketing.
                        </span>
                      </label>
                      {errors.consentAgreed && (
                        <p className="text-xs text-[#C62828] mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.consentAgreed}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Action */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 sm:py-3.5 px-4 sm:px-5 min-h-[42px] sm:min-h-0 text-xs sm:text-sm font-bold text-white bg-[#1769FF] hover:bg-[#0B3D91] active:scale-[0.99] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
                      >
                        {isSubmitting ? (
                          <span>Validating Details...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Request Free Demo Session</span>
                          </>
                        )}
                      </button>
                      <p className="text-[10px] sm:text-[11px] text-center text-slate-400 mt-2">
                        *Prototype simulation: tests form UX & validations before production launch.
                      </p>
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
