import { ServiceItem, ServicePlan, TeamMember, TransformationItem, ReviewItem, VideoFeedbackItem, ClientTransformation, ClientVideo } from '../types';

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
    image: '/media/services/service-cards/photos/hd_male_client_strength_1792417382210.webp',
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
    image: '/media/services/service-cards/photos/fitness_coaching_tech_1792415136876.webp',
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
    image: '/media/services/service-cards/photos/nutrition_wellness_bowl_1792415114008.webp',
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
    image: '/media/services/service-cards/photos/offline_functional_training_1792415113638.webp',
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
    description: 'Exercise science, programme design and safe lifting technique for every fitness level.',
  },
  {
    id: 'cert-2',
    title: 'Human Performance Nutrition',
    description: 'Macros, protein, hydration and practical meal planning for performance and recovery.',
  },
  {
    id: 'cert-3',
    title: 'REPs India Register',
    description: 'Listed on the Register of Exercise Professionals India as a recognised fitness professional.',
  },
  {
    id: 'cert-4',
    title: 'Skill India Certificate',
    description: 'Government-recognised Skill India certification in fitness training.',
  },
  {
    id: 'cert-5',
    title: 'PD: Approval Certificate',
    description: 'Approved professional development credential for continued coaching education.',
  },
  {
    id: 'cert-6',
    title: 'Back Health Management Certificate',
    description: 'Training to protect, strengthen and safely rehabilitate the lower back and spine.',
  },
  {
    id: 'cert-7',
    title: 'CPR-AED Certificate',
    description: 'Certified in CPR and AED use to respond to emergencies during sessions.',
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
    beforeImg: '/media/services/service-cards/photos/hd_male_client_strength_1792417382210.webp',
    afterImg: '/media/unused/photos/WhatsApp Image 2026-10-19 at 7.00.17 PM.webp',
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
    beforeImg: '/media/unused/photos/hd_female_functional_training_1792417382944.webp',
    afterImg: '/media/unused/photos/hd_female_client_coaching_1792417382622.webp',
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
    beforeImg: '/media/services/service-cards/photos/hd_male_client_strength_1792417382210.webp',
    afterImg: '/media/unused/photos/WhatsApp Image 2026-10-19 at 7.00.17 PM.webp',
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
    beforeImg: '/media/unused/photos/hd_female_client_coaching_1792417382622.webp',
    afterImg: '/media/unused/photos/hd_female_functional_training_1792417382944.webp',
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
    beforeImg: '/media/services/service-cards/photos/hd_male_client_strength_1792417382210.webp',
    afterImg: '/media/unused/photos/WhatsApp Image 2026-10-19 at 7.00.17 PM.webp',
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
    beforeImg: '/media/services/service-cards/photos/hd_male_client_strength_1792417382210.webp',
    afterImg: '/media/unused/photos/WhatsApp Image 2026-10-19 at 7.00.17 PM.webp',
    summary: 'Targeted face-pulls, incline presses, and rotator cuff warmups paired with progressive loading.',
    milestone: 'Complete resolution of shoulder impingement',
    consentNote: 'Verified client milestone with photo release consent.',
  },
];


// Client reviews (shown on Home). Each `comment` keeps the client's own paragraphs:
// one array entry per paragraph, '\n' for a line break inside a paragraph, **text** for bold.
// Avatars are 240px face crops in public/media/home/client-feedback/photos/.
const AVATAR = (name: string) => `/media/home/client-feedback/photos/${name}.webp`;

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Shraddha',
    location: 'Canada',
    avatar: AVATAR('shraddha'),
    stars: 5,
    comment: [
      'I completely 6 month’s and During this 6 months I experienced a lot of positive things throughout my journey.',
      'From **first month itself my periods were on time** it’s completely a different feeling.',
      'I was well prepared this time to stick to my diet & workout.',
      'Samir sir was my trainer and he was really patient with me and help me to achieve my goals.',
      'Today when I look back, I see how my personality has changed and I am more Firm in my life as it’s has made me mentally stronger than before.',
      'I have lost few inches,\nstarted to look lean,\n2 kg weight loss,\nJawline is up to the mark.',
      'Thank you for everything and yes Samir Sir is Dev Manus 🙏🥺',
    ].join('\n\n'),
    resultBadge: 'Looking lean & jawline visible',
  },
  {
    id: 'rev-2',
    name: 'Nikhil',
    location: 'Texas, US',
    avatar: AVATAR('nikhil'),
    stars: 5,
    comment: [
      'Amazing Sir! 🤩',
      'Thank you so much for the helping me complete the 90 days and for the transformation! 💪🏻',
      'Also, thank you for being patient with me, teaching me how to lift weights from the basics, being flexible around my schedule and for taking regular follow ups 🥹',
      'I have seen changes in my body, the clothes fit better now and my lower back does not pain when i work whole day on my desk!',
      'I now feel more confident walking into the gym because of you!',
    ].join('\n\n'),
    resultBadge: 'Back pain relieved, old clothes fit again',
  },
  {
    id: 'rev-3',
    name: 'Sabina',
    location: 'Dubai',
    avatar: AVATAR('sabina'),
    stars: 5,
    comment: [
      'I want to express my heartfelt appreciation for Samir Reur, whose strict supervision and monitoring have made a remarkable difference in my health and fitness journey.',
      'Successfully moved from pre-diabetes to a normal status without any medication but just with fitness training.',
      'Sharing my experience below –',
      '1) Notable gains in muscle mass and strength.',
      '2) A perfect, tailored diet plan that supports weight training and cardio.',
      '3) Improved body composition and fat loss.',
      '4) Significant improvement in posture and overall alignment.',
      'Routine was customized to my needs, goals, and lifestyle. Combining weight training, cardio, and nutrition created sustainable results.',
      'Samir’s disciplined approach kept me consistently on track with workouts and recovery.',
      'If you’re looking for a trainer who combines scientific nutrition, effective training methods, and strict supervision to achieve measurable health improvements, Samir Reur is an excellent choice.',
    ].join('\n\n'),
    resultBadge: 'Improved body composition and fat loss',
  },
  {
    id: 'rev-4',
    name: 'Tanya',
    location: 'Bengaluru, India',
    avatar: AVATAR('tanya'),
    stars: 5,
    comment: [
      'My fitness journey with **TeamSamir** has been truly amazing. The personalized training, nutrition guidance, and consistent monitoring have made a significant difference in my health and fitness.',
      '**Some of the key improvements I’ve experienced:**',
      '1. Noticeable gains in muscle strength and endurance.\n2. Improved body composition and fat loss.\n3. A practical, personalized diet plan that fits my lifestyle.\n4. Better posture, flexibility, and overall fitness.\n5. Regular progress tracking and accountability that kept me motivated.',
      'What I appreciate most is my coach’s dedication, attention to detail, and disciplined approach. Every workout and nutrition plan was designed around my individual goals.',
      '**I highly recommend TeamSamir** to anyone looking for professional coaching, sustainable results, and a healthier lifestyle.',
    ].join('\n\n'),
    resultBadge: 'Reduced belly fat, toned midsection',
  },
  {
    id: 'rev-5',
    name: 'Arpita',
    location: 'Bengaluru, India',
    avatar: AVATAR('arpita'),
    stars: 5,
    comment: [
      'Training with Samir has been one of the most positive and transformative experiences for my health and fitness. What really sets his approach apart is that he doesn’t just tell you what to do, he takes the time to explain the science and reasoning behind every exercise, diet choice, and routine. Understanding why something works made me much more consistent and confident in the process.',
      'Samir pushed me to do better than I thought I could, but always in a way that felt supportive rather than overwhelming. Our workouts were structured in a way where I could gradually see my progress and build strength over time. I found myself lifting weights I never thought I would be able to, which was incredibly empowering. Without even realizing it, my body became more toned and my overall structure stronger simply through the consistency and the right kind of training.',
      'Another thing I really appreciated was how much importance he placed on internal health. He encouraged me to get regular blood tests to monitor how my body was responding to the training and diet plan. He took the time to explain what different markers meant, how certain deficiencies could affect my body and my progress, and what changes we needed to make to improve them. Tracking this regularly helped me see that the process was genuinely working from the inside out.',
      'The focus was never just on weight or aesthetics, it was about becoming stronger, fitter, and healthier overall, which made the journey much more sustainable. One of the biggest impacts for me personally was on my health. My periods had become extremely irregular, and through the structured workout plan and balanced diet Samir designed, my cycle gradually became regular again without any external treatment. That was a huge sign of how much my overall health had improved.',
      'I truly appreciate the knowledge, encouragement, and discipline Samir brings to his coaching. If you’re looking for a trainer who genuinely cares about long-term health, proper technique, and educating clients rather than just pushing workouts, I would highly recommend him.',
    ].join('\n\n'),
    resultBadge: 'Reversed PCOD, visible fat loss',
  },
  {
    id: 'rev-6',
    name: 'Pooja',
    location: 'Boston, US',
    avatar: AVATAR('pooja'),
    stars: 5,
    comment: [
      'Moving to the U.S. came with a lot of changes in my food habits and lifestyle, and naturally, my body changed too. Training with Samir over the past year has honestly been an eye-opening experience.',
      'What I really appreciate about Samir is how scientific and logical his approach is. He has answers to even the smallest or most random questions I ask about fitness and food, and everything is backed by reasoning, not trends! In a space where Instagram is full of misinformation and fluff, it was shocking (and refreshing) to learn how fitness actually works.',
      'The transformation happened slowly, without me obsessing over it. One day I just realized that many problems I had been dealing with were simply gone. It wasn’t just a physical change it was mental too.',
      'For women especially, fitness isn’t as simple as following a page or copying someone’s routine. Our bodies work differently, and that understanding matters. Samir makes this process easier by focusing on what actually works for you, not generic plans.',
      'He’s extremely professional and detail-oriented, and this goes far beyond just gym workouts. It’s about building a healthier lifestyle eating better, sleeping better, and feeling better overall.',
      'This past year has brought a very positive shift in my life, and I’m genuinely grateful for the guidance and structure Samir provides.',
    ].join('\n\n'),
    resultBadge: 'Lost inches and gained confidence',
  },
  {
    id: 'rev-7',
    name: 'Anam',
    location: 'Abu Dhabi',
    avatar: AVATAR('anam'),
    stars: 5,
    comment: [
      'Hello Samir and Trainer.',
      'Thank you for giving me my first experience at strength training. Overall, it was a rewarding and energizing experience. I felt stronger, refreshed, and excited to return.',
      'A big thank you to Trainer for pushing me through out and making me more active. Since training with her, I’ve gained strength, improved my endurance, and feel more confident than ever.',
      'What really stands out is her ability to motivate and push you beyond what you think you’re capable of—while still making workouts enjoyable.',
      'Thanks again ❤️',
    ].join('\n\n'),
    resultBadge: 'Gained strength, better endurance, more confident',
  },
  {
    id: 'rev-8',
    name: 'Naiya',
    location: 'Sydney, Australia',
    avatar: AVATAR('naiya'),
    stars: 5,
    comment: [
      'Hello Samir and Trainer,',
      'Thank you for introducing me to strength training and making my fitness journey such a positive experience. Every session has been motivating, enjoyable, and full of energy.',
      'A special thanks to my trainer for constantly encouraging me, correcting my form, and pushing me to achieve more than I thought possible. Since starting my training, I’ve noticed improvements in my strength, stamina, and overall confidence.',
      'What I appreciate most is the personalized attention, constant support, and dedication towards my progress. The workouts are challenging yet enjoyable, and I genuinely look forward to every session.',
      'Thank you, TeamSamir, for making fitness such a wonderful experience! ❤️💪',
    ].join('\n\n'),
    resultBadge: 'Lost 5 kg fat, feeling more energetic',
  },
];

// Client feedback videos on the Home page (muted, autoplay, loop; no text on the cards).
// Files: public/media/home/video-feedback/videos/client-01.mp4 … client-13.mp4, web copies
// (480px wide, no audio) of the originals in public/media/Website/feedback-video/.
// To add a clip, add the file with the next number and raise VIDEO_FEEDBACK_COUNT.
const VIDEO_FEEDBACK_COUNT = 13;
export const VIDEO_FEEDBACK: VideoFeedbackItem[] = Array.from({ length: VIDEO_FEEDBACK_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return { id: `video-${n}`, src: `/media/home/video-feedback/videos/client-${n}.mp4` };
});

// ---------------------------------------------------------------------------
// Transformations page
// ---------------------------------------------------------------------------

// Before & after photo pairs.
//
// The five entries below are SAMPLE stock photos (Unsplash License, free for commercial use)
// so the gallery looks complete. They are NOT client results (a small "illustrative" note shows under the gallery while any `sample: true` entry remains).
// To show a real client: put consented photos in public/media/transformations/before-after/photos/
// (e.g. client-01-before.jpg / client-01-after.jpg, portrait 4:5 such as 1080 x 1350,
// same pose and framing), point beforeSrc / afterSrc at them, fill in clientName,
// focus and duration, and remove `sample: true`.
// A missing file shows a styled "photo coming soon" placeholder instead of breaking.
const samplePair = (n: number) => {
  const id = String(n).padStart(2, '0');
  return {
    id: `sample-${id}`,
    beforeSrc: `/media/transformations/before-after/photos/samples/sample-${id}-before.webp`,
    afterSrc: `/media/transformations/before-after/photos/samples/sample-${id}-after.webp`,
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
    src: '/media/transformations/video-gallery/videos/strength-deadlift.mp4',
    title: 'Strength Training Session',
    description: 'A look into focused strength and conditioning workouts.',
    portrait: true,
    stock: true,
  },
  {
    id: 'cv-2',
    src: '/media/home/video-feedback/videos/v3.mp4',
    title: 'Personal Training Moments',
    description: 'Personal guidance, proper techniques and consistent efforts.',
    portrait: true,
  },
  {
    id: 'cv-3',
    src: '/media/transformations/video-gallery/videos/battle-ropes.mp4',
    title: 'Workout Highlights',
    description: 'Small steps, daily efforts and memorable fitness moments.',
    portrait: true,
    stock: true,
  },
  {
    id: 'cv-4',
    src: '/media/transformations/video-gallery/videos/squat-training.mp4',
    title: 'Fitness Journey',
    description: 'A glimpse of the dedication behind every transformation.',
    stock: true,
  },
  {
    id: 'cv-5',
    src: '/media/home/video-feedback/videos/v1.mp4',
    title: 'Coach on the Floor',
    description: 'TeamSamir at TS Fitness, guiding every session in person.',
    portrait: true,
  },
  {
    id: 'cv-6',
    src: '/media/transformations/video-gallery/videos/lunge-workout.mp4',
    title: 'Lower Body Strength',
    description: 'Controlled lunges and leg work for strength and balance.',
    stock: true,
  },
  {
    id: 'cv-7',
    src: '/media/home/video-feedback/videos/v2.mp4',
    title: 'Inside TS Fitness',
    description: 'A look around the studio where the training happens.',
    portrait: true,
  },
];
