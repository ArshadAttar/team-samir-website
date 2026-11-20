export type PageId = 'home' | 'services' | 'senior-fitness' | 'transformations' | 'about' | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  format: string;
  features: string[];
  image: string;
  /** Shown in the expandable "Plan Details" panel on the Services page */
  planInfo: { label: string; value: string }[];
  /** Days highlighted in the 7-day week strip (e.g. ['Mon', 'Tue', ...]) */
  activeDays: WeekDay[];
  activeDaysLabel: string;
  plans: ServicePlan[];
}

export type WeekDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export interface ServicePlan {
  name: string;
  duration: string;
  /** Percentage off; 0 = no discount badge */
  discount: number;
  points: string[];
  popular?: boolean;
}

export interface TeamMember {
  id: string;
  role: 'Fitness Coach' | 'Personal Trainer' | 'Nutritionist';
  namePlaceholder: string;
  experience: string;
  specialties: string[];
  qualificationPlaceholder: string;
  bioPlaceholder: string;
}

export interface TransformationItem {
  id: string;
  category: 'strength' | 'fitness' | 'stories' | 'videos';
  clientNamePlaceholder: string;
  duration: string;
  focusArea: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImg: string;
  afterImg: string;
  summary: string;
  milestone: string;
  isVideo?: boolean;
  videoDuration?: string;
  consentNote: string;
}

/**
 * Which plans the enquiry page shows, decided by the button the visitor clicked.
 * - all: every plan (scrollable list) — the default for "Free Consultation", "Free Consultation", etc.
 * - trial: only the paid trial plan ("Book Trial – INR 1,999" on Home)
 * - service: one service's plans (Services page "Enquire" / "Choose <plan>"); planName preselects that plan
 * `heading` optionally overrides the form heading.
 */
export type BookingIntent =
  | { kind: 'all'; heading?: string }
  | { kind: 'trial'; heading?: string }
  | { kind: 'service'; serviceId: string; planName?: string; heading?: string };

/** The 6 enquiry fields plus preferred contact method */
export interface EnquiryFormData {
  fullName: string;
  email: string;
  mobileNumber: string;
  whatsappNumber: string;
  goal: string;
  /** '' = not sure, 'trial', or '<serviceId>::<plan name>' */
  plan: string;
  contactMethod: 'Phone Call' | 'WhatsApp' | 'Email';
}

export type EnquiryFormErrors = Partial<Record<'fullName' | 'email' | 'mobileNumber' | 'whatsappNumber', string>>;

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  avatar: string;
  stars: number;
  comment: string;
  resultBadge: string;
}

export interface VideoFeedbackItem {
  id: string;
  src: string;
}

/** Before & after card on the Transformations page (one photo with both sides in it). */
export interface ClientTransformation {
  id: string;
  /** Large version for the full-screen view, e.g. /media/transformations/before-after/photos/transformation-01.webp */
  src: string;
  /** Smaller version shown on the card */
  thumbSrc: string;
  /** Bold line under the card */
  title: string;
}
