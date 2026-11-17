import { ServiceItem, ServicePlan, TeamMember, TransformationItem, ReviewItem, VideoFeedbackItem, ClientTransformation, ClientVideo } from '../types';
import videoOne from '../assets/videos/v1.mp4';
import videoTwo from '../assets/videos/v2.mp4';
import videoThree from '../assets/videos/v3.mp4';
import stockDeadlift from '../assets/videos/stock/strength-deadlift.mp4';
import stockBattleRopes from '../assets/videos/stock/battle-ropes.mp4';
import stockSquats from '../assets/videos/stock/squat-training.mp4';
import stockLunges from '../assets/videos/stock/lunge-workout.mp4';

// Single source for the headline numbers shown across the whole site.
// Change them here only; every page reads from BUSINESS_INFO.
export const STATS = {
  years: 5,
  clients: 520,
  celebrities: 25,
};

export const BUSINESS_INFO = {
  brandName: 'TeamSamir',
  trainerName: 'Samir',
  gymName: 'TeamSamir',
  tagline: 'Personalised Fitness & Coaching',
  experienceYears: String(STATS.years),
  previousGym: 'Fitness Talk',
  clientsTrained: `${STATS.clients}+`,
  celebritiesTrained: `${STATS.celebrities}+`,
  location: {
    line1: 'Near By Ashish Garden, Kothrud, Pune',
    line2: 'Kothrud',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    pincode: '411038',
    fullAddress: 'Near By Ashish Garden, Kothrud, Pune',
    directionsQuery: 'Pune, Maharashtra, India',
  },
  // Realistic dummy contact details for immediate mobile click-to-call & WhatsApp
  contact: {
    phone: '+91 7972688921',
    phoneRaw: '+917972688921',
    whatsapp: '+91 7972688921',
    whatsappNumber: '917972688921',
    email: 'teamsamir7@gmail.com',
    workingHours: 'Mon – Sat: 6:00 AM – 10:00 PM,  IST',
  },
  disclaimerClaims: 'Client and celebrity training statistics are supplied by the client and are presented as editable figures pending formal verification before public launch.',
};

// ------------------------------------------------------------------
// Paid trial shown by the Home "Book Trial – INR 1,999" button.
// Points are placeholders; confirm with Samir before launch.
// ------------------------------------------------------------------
export const TRIAL_PLAN = {
  name: 'Trial Plan',
  price: 'INR 1,999',
  duration: '1 Week',
  summary: 'Try 1-on-1 coaching with TeamSamir for a week before committing to a longer plan.',
  points: [
    '3 one-on-one live sessions.',
    'Alternate days cardio tasks.',
    'Simple Indian food meals.',
    'Daily checks on WhatsApp',
  ],
};

// ------------------------------------------------------------------
// Service plans. Discounts are placeholders; confirm with Samir before launch.
// ------------------------------------------------------------------
const PERSONAL_TRAINING_PLANS: ServicePlan[] = [
  {
    name: '1 Month',
    duration: '12 sessions · 4 weeks',
    discount: 0,
    popular: true,
    points: [
      '3 one-on-one live sessions every week',
      'Alternate days cardio task',
      'Simple Indian home food nutrition plan',
      'Daily checks on Whatsapp',
      'Additional travel and restaurant assistance',
    ],
  },
  {
    name: '3 Months',
    duration: '36 sessions · 12 weeks',
    discount: 10,
    points: [
      '3 one-on-one live sessions every week',
      'Alternate days cardio task',
      'Simple Indian home food nutrition plan',
      'Daily checks on Whatsapp',
      'Additional travel and restaurant assistance',
      'Free counseling every month',
      'Body measurements and photos every month',
      'Results oriented',
    ],
  },
  {
    name: 'Only PT',
    duration: '12 Training Sessions only · monthly',
    discount: 0,
    points: [
      'One-on-one training sessions only',
      'Alternatives cardio task',
      'No diet plan included',
      'Good if you already follow a diet',
    ],
  },
];

const HEALTH_MANAGEMENT_PLANS: ServicePlan[] = [
  {
    name: '1 Month',
    duration: '12 sessions · 4 weeks',
    discount: 0,
    points: [
    'Indian Food Nutrition Plan Tailored to Your Health',
    'Safe & low-impact exercise 3 days a week',
    'Alternate days cardio tasks.',
    'Daily checks on WhatsApp',
    'Weekly checks of energy levels, sleep & blood sugar/BP readings',
    ],
  },
  {
    name: '3 Months',
    duration: '36 sessions · 12 weeks',
    discount: 10,
    popular: true,
    points: [
    'Indian Food Nutrition Plan Tailored to Your Health',
    'Safe & low-impact exercise 3 days a week',
    'Alternate days cardio tasks.',
    'Daily checks on WhatsApp',
      'Progress compared with your blood reports',
      'Diet and exercise adjusted every month',
      'Daily support on WhatsApp',
    ],
  },
  {
    name: 'Only PT',
    duration: '12 Training Sessions only · monthly',
    discount: 0,
    points: [
      '3 low impact exercise sessions a week',
      'You follow your doctor or dietitian\'s diet',
      'Exercises adjusted for joint pain or low stamina',
    ],
  },
];

const NUTRITION_PLANS: ServicePlan[] = [
  {
    name: '1 Month',
    duration: '4 weeks',
    discount: 0,
    points: [
      'Personalized nutrition plan',
      'No boring salads and no calorie counting',
      'Restaurant and travel assistance',
      'Send meal photos on WhatsApp for feedback',
      'Your own dedicated nutritionist'
    ],
  },
  {
    name: '3 Months',
    duration: '12 weeks',
    discount: 10,
    popular: true,
    points: [
      'Personalized nutrition plan',
      'No boring salads and no calorie counting',
      'Restaurant and travel assistance',
      'Send meal photos on WhatsApp for feedback',
      'Your own dedicated nutritionist',
      'Monthly body measurements and review',
      'Additional counseling if needed',
      'Measurable results',
    ],
  },
];

const OFFLINE_TRAINING_PLANS: ServicePlan[] = [
  {
    name: '1 Month',
    duration: '12 sessions · 4 weeks',
    discount: 0,
    popular: true,
    points: [
      '3 one-on-one sessions every week',
      'Alternate days cardio task',
      'Simple Indian home food nutrition plan',
      'Daily checks on Whatsapp',
      'Additional travel and restaurant assistance',
    ],
  },
  {
    name: '3 Months',
    duration: '36 sessions · 12 weeks',
    discount: 10,
    points: [
      '3 one-on-one sessions every week',
      'Alternate days cardio task',
      'Simple Indian home food nutrition plan',
      'Daily checks on Whatsapp',
      'Additional travel and restaurant assistance',
      'Free counseling every month',
      'Body measurements and photos every month',
      'Results oriented',
    ],
  },
  {
    name: 'Only PT',
    duration: '12 Training Sessions only · monthly',
    discount: 0,
    points: [
      'One-on-one training sessions only',
      'Alternatives cardio task',
      'No diet plan included',
      'Good if you already follow a diet',
    ],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'personal-training',
    title: 'Personal Training',
    shortDesc: '1-on-1 Live training where TeamSamir Coaches guides every exercise, corrects your form, and keeps you on track in Nutrition.',
    fullDesc: 'You train 1-on-1 Live with TeamSamir Coaches. He builds a workout & Nutrition plan for your body and goals, shows you the right way to do every exercise, and checks your progress every single day. You don\'t need any gym experience. We start at your level and slowly make it harder as you get stronger.',
    format: '1-on-1 Live',
    features: [
      'Our own Dedicated Coach',
      'Personalized workout and Nutrition plan',
      'Daily follow-up by coach',
      'Travel & restaurant assistance',
    ],
    image: '/images/hd_male_client_strength_1792417382210.jpg',
    planInfo: [
      { label: 'Session length', value: '60 minutes' },
      { label: 'Where', value: 'World-Wide' },
      { label: 'Trainer', value: 'According to Your time slot' },
      { label: 'Timings', value: '5 AM to 11 PM IST, your choice' },
    ],
    activeDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    activeDaysLabel: '6 training days, Sunday for rest',
    plans: PERSONAL_TRAINING_PLANS,
  },
  {
    id: 'health-management',
    title: 'Health Management',
    shortDesc: 'Exercise and food plans that help you manage PCOD/PCOS, diabetes, BP, thyroid, cholesterol, knee & back pain, fatty liver.',
    fullDesc: 'If you live with PCOD/PCOS, diabetes, BP, thyroid, cholesterol, knee & back pain, fatty liver then this plan will helps you manage it better through safe exercise and simple food changes. We first look at your health reports and your doctor\'s advice. Then we plan gentle exercise and an Indian diet that fits your condition. This plan supports your medical treatment and does not replace it.',
    format: 'Lifestyle & Health Programme',
    features: [
      'Plan based on your health reports',
      'Safe, gentle exercises',
      'Indian food that suited on your condition',
      'Every month check on your reports',
    ],
    image: '/images/fitness_coaching_tech_1792415136876.jpg',
    planInfo: [
      { label: 'Session length', value: '45–60 minutes' },
      { label: 'First step', value: 'Review of your reports, medicines and doctor\'s advice' },
      { label: 'Exercise type', value: 'Low-impact strength, walking and mobility' },
      { label: 'Where & Timings', value: 'Worldwide, 5AM to 11PM IST' },
    ],
    activeDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    activeDaysLabel: '6 training days, Sunday for rest',
    plans: HEALTH_MANAGEMENT_PLANS,
  },
  {
    id: 'nutrition-guidance',
    title: 'Nutrition Guidance',
    shortDesc: 'Lose weight/fat OR build muscle while still eating your favourite Indian home food.',
    fullDesc: 'You don\'t need to eat boring salads or count every calorie. We make a Nutrition plan from the food you already eat at home, like dal, roti, rice, sabzi, paneer, eggs or chicken, and just change the portions and timing. You send your meal photos on WhatsApp and we guide you every day.',
    format: 'Personalized Nutrition Coaching',
    features: [
      'Your own dedicated nutritionist',
      'Built around your home food',
      'No crash diets or starving',
      'Daily updates on WhatsApp',
    ],
    image: '/images/nutrition_wellness_bowl_1792415114008.jpg',
    planInfo: [
      { label: 'How it works', value: 'Online, on WhatsApp and calls' },
      { label: 'First step', value: 'A 45-60 minutes Counseling call about your food habits and goal' },
      { label: 'Food style', value: 'Vegetarian, eggetarian or non-vegetarian' },
      { label: 'Updates', value: 'Every Single day' },
    ],
    activeDays: ['Mon', 'Tue','Wed', 'Thu', 'Fri', 'Sat'],
    activeDaysLabel: '6 check-in days for meal photos and feedback',
    plans: NUTRITION_PLANS,
  },
  {
    id: 'offline-training',
    title: 'Offline Training',
    shortDesc: 'Train in person at GYM OR home in Pune with a TeamSamir coach guiding you face to face.',
    fullDesc: 'The coach is with you during your workout to show you each exercise, fix your posture and keep you motivated. It\'s ideal if you live in Pune and prefer training face to face instead of online.',
    format: 'In-Person',
    features: [
      'Train Together with Your Coach',
      'Coach corrects you on the spot',
      'Train anywhere in Pune',
      'Enjoy Personalised Face-to-Face Training',
    ],
    image: '/images/offline_functional_training_1792415113638.jpg',
    planInfo: [
      { label: 'Session length', value: '60 minutes' },
      { label: 'Trainer', value: 'According to Your time slot' },
      { label: 'Where', value: 'Pune' },
      { label: 'Timings', value: 'Mon – Sat, 5:00 AM – 10:00 PM' },
    ],
    activeDays: ['Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    activeDaysLabel: '6 training days, Sunday for rest',
    plans: OFFLINE_TRAINING_PLANS,
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-samir',
    role: 'Personal Trainer',
    namePlaceholder: 'Samir (Head Trainer)',
    experience: `${STATS.years}+ Years Experience`,
    specialties: ['Hypertrophy & Strength', 'Functional Movement', 'Celebrity Coaching Protocol'],
    qualificationPlaceholder: 'Certified Fitness Specialist · Former Coach at Fitness Talk',
    bioPlaceholder: `Founder and lead trainer at TS Fitness with ${STATS.years}+ years of industry experience, having trained ${STATS.clients}+ clients and ${STATS.celebrities}+ celebrity trainees in Pune.`,
  },
  {
    id: 'team-coach',
    role: 'Fitness Coach',
    namePlaceholder: 'Pooja Sharma (Female Fitness Coach)',
    experience: '4 Years Experience',
    specialties: ['Female Athletic Conditioning', 'Mobility & Posture', 'Glute & Core Biomechanics'],
    qualificationPlaceholder: 'Certified Personal Trainer & Functional Movement Coach',
    bioPlaceholder: 'Specializes in women-specific training protocols, kettlebell conditioning, and helping clients build lean athletic strength.',
  },
  {
    id: 'team-nutritionist',
    role: 'Nutritionist',
    namePlaceholder: 'Rohan Kulkarni (Nutrition Coach)',
    experience: '5 Years Experience',
    specialties: ['Indian Balanced Diets', 'Macronutrient Strategy', 'Lifestyle Wellness'],
    qualificationPlaceholder: 'Certified Sports Nutritionist (Pune University affiliated)',
    bioPlaceholder: 'Provides practical nutritional education and dietary strategies to support muscle repair, body recomposition, and sustained daily vitality.',
  },
];

export const CERTIFICATIONS = [
  {
    id: 'cert-1',
    title: 'Diploma in Personal Training',
    description:
      'Formal training in exercise science, programme design, lifting technique and safe, progressive coaching for all fitness levels.',
  },
  {
    id: 'cert-2',
    title: 'Human Performance Nutrition',
    description:
      'Qualification in performance-focused nutrition, covering macronutrients, protein intake, hydration and practical meal planning.',
  },
];

export const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: 'tr-1',
    category: 'strength',
    clientNamePlaceholder: 'Aditya Deshmukh (Male Strength & Hypertrophy)',
    duration: '16 Weeks Structured Protocol',
    focusArea: 'Postural Alignment & Compound Strength',
    beforeLabel: 'Baseline: Lower back fatigue, desk worker posture',
    afterLabel: 'Current: Deadlift 140kg, upright posture, +4kg lean muscle',
    beforeImg: '/images/hd_male_client_strength_1792417382210.jpg',
    afterImg: '/images/WhatsApp Image 2026-10-19 at 7.00.17 PM.jpeg',
    summary: 'Focused on progressive overload, unilateral stability work, and consistent protein intake under Samir\'s direct supervision.',
    milestone: '+60% Relative compound lifting strength',
    consentNote: 'Verified client milestone with photo release consent.',
  },
  {
    id: 'tr-2',
    category: 'fitness',
    clientNamePlaceholder: 'Priyanka Joshi (Female Body Recomposition)',
    duration: '24 Weeks Coaching Program',
    focusArea: 'Sustainable Fat Loss & Core Toning',
    beforeLabel: 'Baseline: Sedentary IT desk fatigue, irregular meal habits',
    afterLabel: 'Current: -8kg body fat, strong kettlebell squats, vibrant daily energy',
    beforeImg: '/images/hd_female_functional_training_1792417382944.jpg',
    afterImg: '/images/hd_female_client_coaching_1792417382622.jpg',
    summary: 'Integrated 3 gym days with daily step counts and high-protein home-cooked Indian meals without extreme starvation protocols.',
    milestone: 'Sustainable lifestyle change maintained over 6+ months',
    consentNote: 'Verified client milestone with photo release consent.',
  },
  {
    id: 'tr-3',
    category: 'videos',
    clientNamePlaceholder: 'TeamSamir Gym Video Reel (Posing & Form)',
    duration: 'Official TS Fitness Reel',
    focusArea: 'Posing, Flexion & Studio Environment',
    beforeLabel: 'TeamSamir in official white TeamSamir polo shirt',
    afterLabel: 'TS Fitness studio floor, Kothrud Pune',
    beforeImg: '/images/hd_male_client_strength_1792417382210.jpg',
    afterImg: '/images/WhatsApp Image 2026-10-19 at 7.00.17 PM.jpeg',
    summary: 'Watch TeamSamir demonstrate athletic discipline and physique conditioning inside the Pune studio.',
    milestone: `${STATS.years}+ Years Professional Coaching Experience`,
    isVideo: true,
    videoDuration: '00:10',
    consentNote: 'Official TeamSamir training footage.',
  },
  {
    id: 'tr-4',
    category: 'stories',
    clientNamePlaceholder: 'Kavita Nair (Female Posture & Mobility)',
    duration: '20 Weeks Routine Program',
    focusArea: 'Thoracic Mobility & Glute Activation',
    beforeLabel: 'Baseline: Cervical tightness from 9-hour laptop posture',
    afterLabel: 'Current: Pain-free overhead lifts, 10 strict bodyweight push-ups',
    beforeImg: '/images/hd_female_client_coaching_1792417382622.jpg',
    afterImg: '/images/hd_female_functional_training_1792417382944.jpg',
    summary: 'Focus was placed on habit sustainability, micro-goals, and ergonomic training alongside resistance workouts.',
    milestone: 'Zero cervical pain, completed 5k run',
    consentNote: 'Verified client milestone with photo release consent.',
  },
  {
    id: 'tr-5',
    category: 'videos',
    clientNamePlaceholder: 'TeamSamir Flex & Power Stance Reel',
    duration: 'Strength & Form Showcase',
    focusArea: 'Bicep Peak & Shoulder Biomechanics',
    beforeLabel: 'Technique setup: Neutral spine and scapular retraction',
    afterLabel: 'Controlled execution and muscle contraction',
    beforeImg: '/images/hd_male_client_strength_1792417382210.jpg',
    afterImg: '/images/WhatsApp Image 2026-10-19 at 7.00.17 PM.jpeg',
    summary: 'High-energy studio reel highlighting athletic conditioning and trainer-led motivation at TS Fitness.',
    milestone: `${STATS.celebrities}+ Celebrity trainees coached`,
    isVideo: true,
    videoDuration: '00:10',
    consentNote: 'Official TeamSamir training footage.',
  },
  {
    id: 'tr-6',
    category: 'fitness',
    clientNamePlaceholder: 'Vikram Mehta (Male 1-on-1 Client)',
    duration: '14 Weeks Mobility & Strength',
    focusArea: 'Chest Hypertrophy & Rotator Cuff Health',
    beforeLabel: 'Initial: Shoulder clicking on bench presses',
    afterLabel: 'Current: Corrected elbow path, 95kg dumbbell press',
    beforeImg: '/images/hd_male_client_strength_1792417382210.jpg',
    afterImg: '/images/WhatsApp Image 2026-10-19 at 7.00.17 PM.jpeg',
    summary: 'Targeted face-pulls, incline presses, and rotator cuff warmups paired with progressive loading.',
    milestone: 'Complete resolution of shoulder impingement',
    consentNote: 'Verified client milestone with photo release consent.',
  },
];

// Client reviews (shown on Home and Transformations)
export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Rohan Mehta',
    location: 'Kothrud, Pune',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'Samir completely fixed my anterior pelvic tilt while helping me drop 14kg in 5 months. His posture and biomechanics coaching is lightyears ahead of normal commercial trainers in Pune.',
    resultBadge: 'Lost 14 kg & Fixed Back Pain',
    program: '1-on-1 Personal Training',
  },
  {
    id: 'rev-2',
    name: 'Priya Kulkarni',
    location: 'Bavdhan, Pune',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'Unlike other commercial gyms where trainers ignore you after day two, Samir reviews every single WhatsApp food log and corrects every inch of your barbell squat. Truly personalised!',
    resultBadge: 'Toned Core · 22% Body Fat',
    program: 'Lifestyle Recomposition',
  },
  {
    id: 'rev-3',
    name: 'Vikramaditya Deshmukh',
    location: 'Deccan, Pune',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'Coaching with TeamSamir took my clean barbell squat from 100kg to 160kg without knee strain. His understanding of joint load and progressive overload is unmatched.',
    resultBadge: '+60kg Squat PR · Zero Knee Pain',
    program: 'Athletic Strength & Power',
  },
  {
    id: 'rev-4',
    name: 'Dr. Neha Joshi',
    location: 'Karve Road, Pune',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'As a doctor with grueling 14-hour hospital shifts, Samir structured a 35-minute split that gave me sustained energy without adrenal fatigue. My chronic neck spasms disappeared.',
    resultBadge: 'Neck Spasms Resolved · High Stamina',
    program: 'Executive Fitness Protocol',
  },
  {
    id: 'rev-5',
    name: 'Sameer Joshi',
    location: 'Aundh, Pune',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'Dropped 18kg before my brother’s wedding in 4 months. Samir never forced impossible crash diets; he tailored the macros around my mother’s home-cooked Maharashtrian meals.',
    resultBadge: 'Lost 18 kg in 16 Weeks',
    program: 'Custom Nutrition & Training',
  },
  {
    id: 'rev-6',
    name: 'Tanvi Sharma',
    location: 'Model Colony, Pune',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'Trained for commercial shoots and runway. Samir’s celebrity conditioning protocols sculpt razor-sharp muscle definition while keeping your limbs sleek and feminine. Highly recommended!',
    resultBadge: 'Runway & Camera Conditioning',
    program: 'Celebrity Coaching Protocol',
  },
  {
    id: 'rev-7',
    name: 'Aditya Rao',
    location: 'Kothrud, Pune',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'His glute activation and posterior chain routines completely eliminated my runner’s IT band syndrome. Clocked my half-marathon personal best at 1 hr 41 mins thanks to TS Fitness!',
    resultBadge: 'Half-Marathon PB (1h 41m)',
    program: 'Runner Injury Prevention',
  },
  {
    id: 'rev-8',
    name: 'Shweta Patil',
    location: 'Erandwane, Pune',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'Gained strength I never thought possible in my 40s. Samir is respectful, ultra-knowledgeable, and keeps you relentlessly accountable without shouting. The best coach in Pune.',
    resultBadge: 'Deadlift 85kg at Age 42',
    program: 'Women’s Strength & Mobility',
  },
];

// Video feedback cards on the Home page. The current clips show TeamSamir at the studio;
// replace `src` (files in src/assets/videos/) and the text with real client feedback videos.
export const VIDEO_FEEDBACK: VideoFeedbackItem[] = [
  {
    id: 'video-1',
    src: videoOne,
    title: 'Meet TeamSamir',
    subtitle: 'TeamSamir · TS Fitness',
    description: 'A quick hello from TeamSamir on the training floor, where every client session is personally guided.',
    tag: 'Coach Intro',
  },
  {
    id: 'video-2',
    src: videoTwo,
    title: 'Inside TS Fitness',
    subtitle: 'Kothrud',
    description: 'Take a look around the studio: free weights, machines and open floor space for safe, supervised training.',
    tag: 'Studio Tour',
  },
  {
    id: 'video-3',
    src: videoThree,
    title: 'Your Coach, Every Session',
    subtitle: 'Personal Training',
    description: 'Samir works with you one-on-one, correcting form and keeping you motivated from warm-up to cool-down.',
    tag: 'Personal Coaching',
  },
];

// ---------------------------------------------------------------------------
// Transformations page
// ---------------------------------------------------------------------------

// Before & after photo pairs.
//
// The five entries below are SAMPLE stock photos (Unsplash License, free for commercial use)
// so the gallery looks complete. They are NOT client results (a small "illustrative" note shows under the gallery while any `sample: true` entry remains).
// To show a real client: put consented photos in public/images/transformations/
// (e.g. client-01-before.jpg / client-01-after.jpg, portrait 4:5 such as 1080 x 1350,
// same pose and framing), point beforeSrc / afterSrc at them, fill in clientName,
// focus and duration, and remove `sample: true`.
// A missing file shows a styled "photo coming soon" placeholder instead of breaking.
const samplePair = (n: number) => {
  const id = String(n).padStart(2, '0');
  return {
    id: `sample-${id}`,
    beforeSrc: `/images/transformations/samples/sample-${id}-before.jpg`,
    afterSrc: `/images/transformations/samples/sample-${id}-after.jpg`,
    sample: true,
  };
};

export const CLIENT_TRANSFORMATIONS: ClientTransformation[] = [
  { ...samplePair(1), clientName: '', focus: 'Strength & muscle gain', duration: '' },
  { ...samplePair(2), clientName: '', focus: 'Fat loss & toning', duration: '' },
  { ...samplePair(3), clientName: '', focus: 'Strength foundations', duration: '' },
  { ...samplePair(4), clientName: '', focus: 'Body recomposition', duration: '' },
  { ...samplePair(5), clientName: '', focus: 'Fitness & conditioning', duration: '' },
];

// Training videos.
// `stock: true` clips are free stock footage from Mixkit (Mixkit License, free for commercial
// use, no attribution needed). The others are real
// TS Fitness clips. Replace stock clips with your own footage when you have it.
export const CLIENT_VIDEOS: ClientVideo[] = [
  {
    id: 'cv-1',
    src: stockDeadlift,
    title: 'Strength Training Session',
    description: 'A look into focused strength and conditioning workouts.',
    portrait: true,
    stock: true,
  },
  {
    id: 'cv-2',
    src: videoThree,
    title: 'Personal Training Moments',
    description: 'Personal guidance, proper techniques and consistent efforts.',
    portrait: true,
  },
  {
    id: 'cv-3',
    src: stockBattleRopes,
    title: 'Workout Highlights',
    description: 'Small steps, daily efforts and memorable fitness moments.',
    portrait: true,
    stock: true,
  },
  {
    id: 'cv-4',
    src: stockSquats,
    title: 'Fitness Journey',
    description: 'A glimpse of the dedication behind every transformation.',
    stock: true,
  },
  {
    id: 'cv-5',
    src: videoOne,
    title: 'Coach on the Floor',
    description: 'TeamSamir at TS Fitness, guiding every session in person.',
    portrait: true,
  },
  {
    id: 'cv-6',
    src: stockLunges,
    title: 'Lower Body Strength',
    description: 'Controlled lunges and leg work for strength and balance.',
    stock: true,
  },
  {
    id: 'cv-7',
    src: videoTwo,
    title: 'Inside TS Fitness',
    description: 'A look around the studio where the training happens.',
    portrait: true,
  },
];
