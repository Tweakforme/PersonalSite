import { env } from '@/env.mjs';

export const siteConfig = {
  title: 'Adhvait Jadav | Full-Stack developer',
  description:
    "Hello, I'm Adhvait. I am full-stack developer based  in Canada. I enjoy building sites and apps. My focus is React (Next.js).",
  keywords: [
    'Adhvait Jadav',
    'Full-stack developer',
    'Canada',
    'React',
    'Next.js',
    'Web development',
    'Front-end',
    'UI/UX',
    'Responsive design',
    'JavaScript',
    'HTML',
    'CSS',
    'Portfolio',
    'Projects',
    'Website',
    'Web applications',
    'Developer',
    'Code',
    'Programming',
    'Tech enthusiast',
  ],
  url: env.SITE_URL || 'https://example.com',
  googleSiteVerificationId: env.GOOGLE_SITE_VERIFICATION_ID || '',
};
