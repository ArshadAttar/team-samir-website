/**
 * Senior Fitness page photos, one folder per section under public/media/senior-fitness/.
 * Prompts for generating each one are in docs/senior-fitness-image-prompts.md.
 * A missing file falls back to a styled placeholder.
 */
const SENIOR_PHOTOS = {
  hero: '/media/senior-fitness/hero/photos/hero.webp',
  'why-me': '/media/senior-fitness/why-train-with-me/photos/why-me.webp',
  assessment: '/media/senior-fitness/transformations/photos/assessment.webp',
  cta: '/media/senior-fitness/final-cta/photos/cta.webp',
} as const;

export type SeniorPhoto = keyof typeof SENIOR_PHOTOS;

export const img = (name: SeniorPhoto) => SENIOR_PHOTOS[name];
