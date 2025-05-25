import { Icons } from '@/components/icons';

type Experience = {
  title: string;
  company: string;
  description: string;
  period: string;
  technologies: string[];
  projects: {
    name: string;
    summary: string;
  }[];
};

export const links = [
  {
    name: 'Home',
    hash: '#home',
  },
  {
    name: 'About',
    hash: '#about',
  },
  {
    name: 'Experience',
    hash: '#experience',
  },
  {
    name: 'Projects',
    hash: '#projects',
  },
  {
    name: 'Contact',
    hash: '#contact',
  },
] as const;

export const projectsData = [
  {
    title: 'Rentals Kamloops',
    description:
      'Property listing site with PDF generation built on WordPress using the Estatik plugin.',
    cover: '/images/rentals/1.webp',
    screenshots: [
      '/images/rentals/1.webp',
      '/images/rentals/2.webp',
      '/images/rentals/3.webp',
      '/images/rentals/4.webp',
    ],
    technologies: ['WordPress', 'PHP', 'Estatik', 'Tailwind'],
    projects: [],
  },
  {
    title: 'Advanced Plumbing Kamloops',
    description:
      'Static website hosted on DigitalOcean with a secure contact form and PDF form submission.',
    cover: '/images/plumbing/1.webp',
    screenshots: [
      '/images/plumbing/1.webp',
      '/images/plumbing/2.webp',
      '/images/plumbing/3.webp',
      '/images/plumbing/4.webp',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    projects: [],
  },
  {
    title: 'Hodder Construction',
    description:
      'Company landing page built with Tailwind CSS and PHP, deployed on DigitalOcean.',
    cover: '/images/hodder/1.webp',
    screenshots: ['/images/hodder/1.webp'],
    technologies: ['Tailwind CSS', 'PHP', 'DigitalOcean'],
    projects: [],
  },
  {
    title: 'Employee Timesheet App',
    description:
      'Internal React + Node.js dashboard for job tracking, export to PDF, and database backup.',
    cover: '/images/employee/1.webp',
    screenshots: ['/images/employee/1.webp', '/images/employee/2.webp'],
    technologies: ['React', 'Node.js', 'MySQL', 'Tailwind CSS'],
    projects: [],
  },
  {
    title: 'Raven Reads Books',
    description:
      'Shopify theme customization, marketing pages, and QA testing for Canadian Indigenous book club.',
    cover: '/images/raven/1.webp',
    screenshots: ['/images/raven/1.webp'],
    technologies: ['Shopify', 'HTML', 'CSS', 'JavaScript'],
    projects: [],
  },
] as const;

export const experiencesData: Experience[] = [
  {
    title: 'Full Stack Web Developer',
    company: 'Hodder Construction, Kamloops BC',
    description:
      'Led full-stack development for multiple production-grade web projects.',
    period: 'Aug 2024 – May 2025',
    technologies: [
      'React',
      'Node.js',
      'PHP',
      'MySQL',
      'PostgreSQL',
      'Strapi',
      'Next.js',
      'Tailwind CSS',
      'DigitalOcean',
      'WordPress',
    ],
    projects: [
      {
        name: 'Advanced Plumbing',
        summary:
          'Static site (HTML, CSS, JS, PHP) hosted on DigitalOcean. Integrated reCAPTCHA, SSL, and PDF form submission.',
      },
      {
        name: 'Digital Timesheet App',
        summary:
          'Internal dashboard built with Node.js, React, and MySQL for job logging, PDF exports, and backups.',
      },
      {
        name: 'EVStore',
        summary:
          'Tesla parts e-commerce platform using Next.js, Strapi, PostgreSQL, Stripe, and CI/CD deployment.',
      },
      {
        name: 'Rentals Kamloops',
        summary:
          'WordPress property listing site with Estatik plugin and PDF forms.',
      },
      {
        name: 'Hodder Construction',
        summary:
          'Full-stack PHP site with Tailwind CSS, Git versioning, and automated deployment pipelines.',
      },
    ],
  },
  {
    title: 'Technical Support Specialist',
    company: 'Teleperformance (Apple Support), Remote',
    description:
      'Supported Apple customers via Safeview and CRM systems. Resolved hardware/software issues across iPhones, iPads, and Macs. Promoted to Mac Specialist.',
    period: 'Oct 2023 – Aug 2024',
    technologies: ['Apple Ecosystem', 'Customer Support', 'Safeview', 'CRM'],
    projects: [],
  },
  {
    title: 'Intern Web Developer',
    company: 'Raven Reads, Kamloops BC',
    description:
      'Built responsive UIs, customized Shopify themes, added 100+ products, and launched marketing pages. Contributed to QA testing and live support.',
    period: 'Feb 2023 – Sep 2023',
    technologies: ['Shopify', 'HTML5', 'CSS3', 'JavaScript', 'QA', 'Agile'],
    projects: [],
  },
  {
    title: 'Freelance Developer',
    company: 'Self-employed, Remote',
    description:
      'Created scalable web applications and e-commerce platforms for clients with full ownership of design, frontend, backend, and deployment.',
    period: '2022 – Present',
    technologies: ['Next.js', 'MongoDB', 'Stripe', 'TypeScript', 'Tailwind'],
    projects: [],
  },
];

export const skillsData = [
  { icon: <Icons.html className="size-12" /> },
  { icon: <Icons.css className="size-12" /> },
  { icon: <Icons.sass className="size-12" /> },
  { icon: <Icons.tailwind className="size-12" /> },
  { icon: <Icons.javascript className="size-12" /> },
  { icon: <Icons.typescript className="size-12" /> },
  { icon: <Icons.react className="size-12" /> },
  { icon: <Icons.redux className="size-12" /> },
  { icon: <Icons.nextjs className="size-12" /> },
  { icon: <Icons.nestjs className="size-12" /> },
  { icon: <Icons.prisma className="size-12" /> },
  { icon: <Icons.docker className="size-12" /> },
] as const;
