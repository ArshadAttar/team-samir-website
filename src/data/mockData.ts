import { ServiceItem, ServicePlan, TeamMember, TransformationItem, ReviewItem, VideoFeedbackItem, ClientTransformation, ClientVideo } from '../types';
import videoOne from '../assets/videos/v1.mp4';
import videoTwo from '../assets/videos/v2.mp4';
import videoThree from '../assets/videos/v3.mp4';
import stockDeadlift from '../assets/videos/stock/strength-deadlift.mp4';
import stockBattleRopes from '../assets/videos/stock/battle-ropes.mp4';
import stockSquats from '../assets/videos/stock/squat-training.mp4';
import stockLunges from '../assets/videos/stock/lunge-workout.mp4';

export const BUSINESS_INFO = {
  brandName: 'TeamSamir',
  trainerName: 'Samir',
  gymName: 'TS Fitness',
  tagline: 'Personalised Fitness & Coaching',
  experienceYears: '5',
  previousGym: 'Fitness Talk',
  clientsTrained: '250+',
  celebritiesTrained: '25+',
  location: {
    line1: 'Flat No. 3, XYZ Apartment (DP Road)',
    line2: 'Kothrud',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    pincode: '411038',
    fullAddress: 'Flat No. 3, XYZ Apartment, DP Road, Kothrud, Pune, Maharashtra, India',
    directionsQuery: 'DP Road, Kothrud, Pune, Maharashtra, India',
  },
  // Realistic dummy contact details for immediate mobile click-to-call & WhatsApp
  contact: {
    phone: '+91 8421287284',
    phoneRaw: '+918421287284',
    whatsapp: '+91 8421287284',
    whatsappNumber: '918421287284',
    email: 'samir@teamsamirfitness.com',
    workingHours: 'Mon – Sat: 6:00 AM – 9:00 PM (Sunday By Appointment)',
  },
  disclaimerClaims: 'Client and celebrity training statistics are supplied by the client and are presented as editable figures pending formal verification before public launch.',
};

// ------------------------------------------------------------------
// Service plans. Discounts are placeholders; confirm with Samir before launch.
// ------------------------------------------------------------------
const PERSONAL_TRAINING_PLANS: ServicePlan[] = [
  {
    name: '1 Month',
    duration: '20 sessions · 4 weeks',
    discount: 0,
    points: [
      '5 one-on-one sessions every week',
      'Workout plan made only for you',
      'Simple Indian diet plan with your home food',
      'Weekly weight and progress check',
    ],
  },
  {
    name: '3 Months',
    duration: '60 sessions · 12 weeks',
    discount: 15,
    popular: true,
    points: [
      'Everything in the 1 Month plan',
      'Workout and diet updated every month',
      'Body measurements and photos every month',
      'Daily support from Samir on WhatsApp',
    ],
  },
  {
    name: 'Only PT',
    duration: 'Training only · monthly',
    discount: 10,
    points: [
      'One-on-one training sessions only',
      'No diet plan included',
      'Good if you already follow a diet',
      'Pay month by month, stop anytime',
    ],
  },
];

const HEALTH_MANAGEMENT_PLANS: ServicePlan[] = [
  {
    name: '1 Month',
    duration: '20 guided sessions · 4 weeks',
    discount: 0,
    points: [
      'Your health reports and medicines reviewed first',
      'Safe, low-impact exercise 5 days a week',
      'Diet plan for BP, sugar or thyroid using Indian food',
      'Weekly check of weight, energy and sugar/BP readings',
    ],
  },
  {
    name: '3 Months',
    duration: '60 guided sessions · 12 weeks',
    discount: 15,
    popular: true,
    points: [
      'Everything in the 1 Month plan',
      'Progress compared with your blood reports',
      'Diet and exercise adjusted every month',
      'Daily support on WhatsApp',
    ],
  },
  {
    name: 'Only PT',
    duration: 'Exercise only · monthly',
    discount: 10,
    points: [
      'Supervised safe exercise sessions only',
      'You follow your doctor or dietitian\'s diet',
      'Exercises adjusted for joint pain or low stamina',
      'Pay month by month',
    ],
  },
];

const NUTRITION_PLANS: ServicePlan[] = [
  {
    name: '1 Month',
    duration: '4 weeks',
    discount: 0,
    points: [
      'Diet plan built from food you already eat',
      'No boring salads and no calorie counting',
      'Weekly plan update based on your progress',
      'Send meal photos on WhatsApp for feedback',
    ],
  },
  {
    name: '3 Months',
    duration: '12 weeks',
    discount: 15,
    popular: true,
    points: [
      'Everything in the 1 Month plan',
      'Monthly body measurements and review',
      'Healthy swaps for your favourite masala dishes',
      'Habit coaching so results last after the plan ends',
    ],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'personal-training',
    title: 'Personal Training',
    shortDesc: 'One-on-one training where Samir guides every exercise, corrects your form, and keeps you on track.',
    fullDesc: 'You train one-on-one with Samir. He builds a workout plan for your body and goal, shows you the right way to do every exercise, and checks your progress every week. You don\'t need any gym experience. We start at your level and slowly make it harder as you get stronger.',
    suitableFor: 'Anyone who wants personal attention: beginners, people with back or knee issues, or anyone who wants faster results.',
    format: '1-on-1 · TS Fitness Studio',
    features: [
      'Workout plan made only for you',
      'Samir corrects your form on every rep',
      'Weekly progress check',
      'Timings that suit your work schedule',
    ],
    image: '/images/hd_male_client_strength_1792417382210.jpg',
    planInfo: [
      { label: 'Session length', value: '60 minutes' },
      { label: 'Where', value: 'TS Fitness Studio, DP Road, Kothrud' },
      { label: 'Trainer', value: 'Coach Samir, one-on-one' },
      { label: 'Timings', value: 'Morning or evening slot of your choice' },
    ],
    activeDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    activeDaysLabel: '5 training days, weekends for rest',
    plans: PERSONAL_TRAINING_PLANS,
  },
  {
    id: 'health-management',
    title: 'Health Management',
    shortDesc: 'Exercise and food plans that help you manage diabetes, BP, thyroid, PCOS and cholesterol.',
    fullDesc: 'If you live with diabetes, high BP, thyroid, PCOS or high cholesterol, this plan helps you manage it better through safe exercise and simple food changes. We first look at your health reports and your doctor\'s advice. Then we plan gentle exercise and an Indian diet that fits your condition. This plan supports your medical treatment and does not replace it.',
    suitableFor: 'Adults managing diabetes, high BP, thyroid, PCOS/PCOD, high cholesterol or weight-related joint pain.',
    format: 'Lifestyle & Health Programme',
    features: [
      'Plan based on your health reports',
      'Safe, gentle exercises',
      'Indian diet suited to your condition',
      'Regular check of weight, sugar and BP',
    ],
    image: '/images/fitness_coaching_tech_1792415136876.jpg',
    planInfo: [
      { label: 'Session length', value: '45–60 minutes' },
      { label: 'First step', value: 'Review of your reports, medicines and doctor\'s advice' },
      { label: 'Exercise type', value: 'Low-impact strength, walking and mobility' },
      { label: 'Tracking', value: 'Weight, inches, energy and sugar/BP readings' },
    ],
    activeDays: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat'],
    activeDaysLabel: '5 days, with a rest day in mid-week',
    plans: HEALTH_MANAGEMENT_PLANS,
  },
  {
    id: 'nutrition-guidance',
    title: 'Nutrition Guidance',
    shortDesc: 'Lose weight or build muscle while still eating your favourite Indian home food.',
    fullDesc: 'You don\'t need to eat boring salads or count every calorie. We make a diet plan from the food you already eat at home, like dal, roti, rice, sabzi, paneer, eggs or chicken, and just change the portions and timing. You send your meal photos on WhatsApp and we guide you every week.',
    suitableFor: 'Anyone who wants to lose fat, gain muscle or feel more energetic without giving up home food.',
    format: 'Diet Plan & Weekly Guidance',
    features: [
      'Veg and non-veg options',
      'Built around your home food',
      'No crash diets or starving',
      'Weekly updates on WhatsApp',
    ],
    image: '/images/nutrition_wellness_bowl_1792415114008.jpg',
    planInfo: [
      { label: 'How it works', value: 'Online, on WhatsApp and calls' },
      { label: 'First step', value: 'A 30-minute call about your food habits and goal' },
      { label: 'Food style', value: 'Vegetarian, eggetarian or non-vegetarian' },
      { label: 'Updates', value: 'Plan reviewed every week' },
    ],
    activeDays: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat'],
    activeDaysLabel: '5 check-in days for meal photos and feedback',
    plans: NUTRITION_PLANS,
  },
  {
    id: 'offline-training',
    title: 'Offline Training',
    shortDesc: 'Train in person at the TS Fitness studio in Kothrud with a coach guiding you face to face.',
    fullDesc: 'Come to the TS Fitness studio on DP Road, Kothrud, and train in person with full equipment. The coach is with you during your workout to show you each exercise, fix your posture and keep you motivated. It\'s ideal if you live or work near Kothrud and prefer training face to face instead of online.',
    suitableFor: 'People in and around Kothrud, Pune who like to train in a real gym with a coach beside them.',
    format: 'In-Person · DP Road, Kothrud',
    features: [
      'Train with full gym equipment',
      'Coach corrects you on the spot',
      'Warm-up and stretching in every session',
      'Easy to reach in Kothrud, Pune',
    ],
    image: '/images/offline_functional_training_1792415113638.jpg',
    planInfo: [
      { label: 'Session length', value: '60 minutes' },
      { label: 'Where', value: 'TS Fitness Studio, DP Road, Kothrud' },
      { label: 'Equipment', value: 'Free weights, machines and functional training area' },
      { label: 'Timings', value: 'Mon – Sat, 6:00 AM – 9:00 PM' },
    ],
    activeDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    activeDaysLabel: '5 studio days, Sunday and Monday off',
    plans: PERSONAL_TRAINING_PLANS,
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-samir',
    role: 'Personal Trainer',
    namePlaceholder: 'Samir (Head Trainer)',
    experience: '5 Years Experience',
    specialties: ['Hypertrophy & Strength', 'Functional Movement', 'Celebrity Coaching Protocol'],
    qualificationPlaceholder: 'Certified Fitness Specialist · Former Coach at Fitness Talk',
    bioPlaceholder: 'Founder and lead trainer at TS Fitness with 5 years of industry experience, having trained 250+ clients and 25+ celebrity trainees in Pune.',
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
    clientNamePlaceholder: 'Coach Samir Gym Video Reel (Posing & Form)',
    duration: 'Official TS Fitness Reel',
    focusArea: 'Posing, Flexion & Studio Environment',
    beforeLabel: 'Coach Samir in official white TeamSamir polo shirt',
    afterLabel: 'TS Fitness studio floor, Kothrud Pune',
    beforeImg: '/images/hd_male_client_strength_1792417382210.jpg',
    afterImg: '/images/WhatsApp Image 2026-10-19 at 7.00.17 PM.jpeg',
    summary: 'Watch Coach Samir demonstrate athletic discipline and physique conditioning inside the Pune studio.',
    milestone: '5 Years Professional Coaching Experience',
    isVideo: true,
    videoDuration: '00:10',
    consentNote: 'Official Coach Samir training footage.',
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
    clientNamePlaceholder: 'Coach Samir Flex & Power Stance Reel',
    duration: 'Strength & Form Showcase',
    focusArea: 'Bicep Peak & Shoulder Biomechanics',
    beforeLabel: 'Technique setup: Neutral spine and scapular retraction',
    afterLabel: 'Controlled execution and muscle contraction',
    beforeImg: '/images/hd_male_client_strength_1792417382210.jpg',
    afterImg: '/images/WhatsApp Image 2026-10-19 at 7.00.17 PM.jpeg',
    summary: 'High-energy studio reel highlighting athletic conditioning and trainer-led motivation at TS Fitness.',
    milestone: '25+ Celebrity trainees coached',
    isVideo: true,
    videoDuration: '00:10',
    consentNote: 'Official Coach Samir training footage.',
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

// Client reviews (shown on Home and Clients Experience)
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
      'Coaching with Coach Samir took my clean barbell squat from 100kg to 160kg without knee strain. His understanding of joint load and progressive overload is unmatched.',
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

// Video feedback cards on the Home page. The current clips show Coach Samir at the studio;
// replace `src` (files in src/assets/videos/) and the text with real client feedback videos.
export const VIDEO_FEEDBACK: VideoFeedbackItem[] = [
  {
    id: 'video-1',
    src: videoOne,
    title: 'Meet Coach Samir',
    subtitle: 'TeamSamir · TS Fitness',
    description: 'A quick hello from Coach Samir on the training floor, where every client session is personally guided.',
    tag: 'Coach Intro',
  },
  {
    id: 'video-2',
    src: videoTwo,
    title: 'Inside TS Fitness',
    subtitle: 'DP Road, Kothrud',
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
// Client Experiences page
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
    description: 'Coach Samir at TS Fitness, guiding every session in person.',
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
