export type PageId = 'home' | 'about' | 'services' | 'transformations' | 'nutrition' | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  suitableFor: string;
  format: string;
  features: string[];
  image: string;
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

export interface FoodCardItem {
  id: string;
  name: string;
  type: 'vegetarian' | 'non-vegetarian';
  primaryNutrient: string;
  proteinApprox: string;
  description: string;
  prepTip: string;
  image: string;
}

export interface DemoFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  ageGroup: string;
  trainingType: string;
  fitnessGoal: string;
  fitnessExperience: string;
  preferredLocation: string;
  sessionTiming: string;
  demoDate: string;
  message: string;
  contactMethod: string;
  consentAgreed: boolean;
}

export interface FormErrors {
  fullName?: string;
  mobileNumber?: string;
  email?: string;
  ageGroup?: string;
  trainingType?: string;
  fitnessGoal?: string;
  fitnessExperience?: string;
  preferredLocation?: string;
  sessionTiming?: string;
  contactMethod?: string;
  consentAgreed?: string;
}
