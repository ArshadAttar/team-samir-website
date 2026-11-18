# Senior Fitness page – AI image prompts

The Senior Fitness page (`src/pages/SeniorFitnessPage.tsx`) loads 4 photos, each from its
section's folder under `public/media/senior-fitness/` (paths are listed in
`src/data/seniorFitnessMedia.ts`):

| File | Folder |
|---|---|
| `hero` | `public/media/senior-fitness/hero/photos/` |
| `why-me` | `public/media/senior-fitness/why-train-with-me/photos/` |
| `assessment` | `public/media/senior-fitness/transformations/photos/` |
| `cta` | `public/media/senior-fitness/final-cta/photos/` |

Until a file exists, the page shows a styled placeholder in its place, so the page works with
any number of images added.

Generate each image with the prompt below, save it with the **exact filename** (keep the JPG
original and add a compressed `.webp`, which is what the page loads) and drop it into the
folder above. No code change is needed.

Gender split for these 4 images: 3 women, 1 man.

## Current images (temporary stock photos)

The folder currently holds free stock photos from Pexels (Pexels license: free for commercial
use, no attribution required). They show seniors exercising but **not Indian seniors**, so
replace them with your own photos or AI images when ready by overwriting the same filename.

| File | Source |
|---|---|
| `hero.jpg` | https://www.pexels.com/photo/man-and-woman-lifting-dumbbells-6815693/ |
| `assessment.jpg` | https://www.pexels.com/photo/man-in-red-shirt-doing-shoulder-exercise-beside-a-woman-in-black-tank-top-6922165/ |
| `why-me.jpg` | https://www.pexels.com/photo/an-elderly-woman-in-pink-tank-top-stretching-while-standing-on-a-yoga-mat-8173520/ |
| `cta.jpg` | https://www.pexels.com/photo/dancing-group-12086690/ |

When you replace a photo, also update its `alt` text (and `position`, if the subject sits
off-centre) in `src/pages/SeniorFitnessPage.tsx`.

## Shared style (append to every prompt)

> Realistic professional fitness photography, premium modern gym with natural window light,
> warm neutral tones with subtle blue accents, realistic body proportions, genuine relaxed
> expressions, shallow depth of field, shot on a full-frame camera, no text, no logos, no watermark.

## Images

| File | Size | Section | Prompt |
|---|---|---|---|
| `hero.jpg` | 1200×1500 (portrait 4:5) | Hero | Indian senior woman, about 65, grey hair tied back, wearing comfortable activewear, smiling while lifting light pink dumbbells; a fit Indian male personal trainer in a black polo stands beside her, guiding her elbow. |
| `assessment.jpg` | 1200×1500 (portrait 4:5) | Training timeline | Indian senior woman, about 64, seated, while a trainer checks her blood pressure and takes notes on a tablet during a friendly first consultation. |
| `why-me.jpg` | 1200×1500 (portrait 4:5) | Why Train With Me | Indian senior woman, about 63, doing a supported lunge holding the trainer's hand, both laughing, warm and trusting moment. |
| `cta.jpg` | 1920×1080 (16:9) | Final call to action | Group of three Indian seniors (two women and one man, 60–75) stretching their arms overhead together in a bright gym, joyful expressions, trainer in the background. |

## Tips

- Keep file sizes under ~400 KB (export at 80% JPG quality) so the page loads fast on mobile.
- Hero, assessment and why-me are portrait images; the rest are landscape.
- Keep faces in the upper-middle of the frame: the images are cropped with `object-cover`.

## Review portraits (reviews section)

Circular avatars for the reviews section load from `public/media/senior-fitness/reviews/photos/<id>.jpg`
(ids are in `src/components/senior-reviews/reviewData.ts`). Until a file exists, a gradient
initials avatar is shown. The current reviews are **sample placeholders**. When real client reviews
arrive, use the client's own photo (with consent) rather than an AI portrait.

Size: 400×400 (square), face centred. Prompt pattern, appended to the shared style above:

> Head-and-shoulders portrait of an Indian senior [woman/man], about [age], warm genuine smile,
> soft natural light, plain softly blurred background, wearing casual activewear.

| File | Prompt details |
|---|---|
| `sample-01.jpg` | woman, about 67, grey hair in a bun |
| `sample-02.jpg` | woman, about 72, short silver hair, glasses |
| `sample-03.jpg` | man, about 69, grey moustache |
| `sample-04.jpg` | woman, about 61, shoulder-length dark hair with grey streaks |
| `sample-05.jpg` | woman, about 75, white hair, gentle smile |
| `sample-06.jpg` | woman, about 64, hair tied back, small bindi |
| `sample-07.jpg` | man, about 73, white hair, glasses |
| `sample-08.jpg` | woman, about 58, dark hair, light cardigan |
