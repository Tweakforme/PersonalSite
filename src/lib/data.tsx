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
  { name: 'Home', hash: '#home' },
  { name: 'About', hash: '#about' },
  { name: 'Experience', hash: '#experience' },
  { name: 'Projects', hash: '#projects' },
  { name: 'Contact', hash: '#contact' },
] as const;

// Enhanced project data structure with all your projects
export const projectsData = [
  {
    title: 'Hodder Construction',
    description:
      'Construction company website showcasing multiple completed projects with modern design.',
    shortDescription:
      'Company landing page built with Tailwind CSS and PHP, deployed on DigitalOcean.',
    cover: '/images/hodder/1.png',
    screenshots: ['/images/hodder/1.png'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'PHP'],
    liveUrl: 'https://www.hodder.ca',
    githubUrl: null, // Still in development
    status: 'completed',
    type: 'client',
    keyFeatures: [
      'Multiple finished project showcases',
      'Modern responsive design',
      'Construction portfolio gallery',
      'Contact and inquiry forms',
      'Mobile-optimized interface',
    ],
    challenge:
      'Showcasing construction projects effectively while maintaining professional appearance and fast loading.',
    solution:
      'Currently migrating from HTML/CSS to modern framework with optimized image galleries and improved UX.',
    impact:
      'Enhanced online presence for construction company with professional project showcases.',
  },
  {
    title: 'Rentals Kamloops',
    description:
      'Full-featured property listing platform with custom WordPress theme and advanced search functionality.',
    shortDescription:
      'Property listing site with PDF generation built on WordPress using the Estatik plugin.',
    cover: '/images/rentals/1.webp',
    screenshots: [
      '/images/rentals/1.webp',
      '/images/rentals/2.webp',
      '/images/rentals/3.webp',
      '/images/rentals/4.webp',
    ],
    technologies: [
      'WordPress',
      'PHP',
      'Estatik',
      'Tailwind',
      'YoastSEO',
      'SMTP',
    ],
    liveUrl: 'https://www.rentalskamloops.ca',
    githubUrl: null, // WordPress site
    status: 'completed',
    type: 'client',
    keyFeatures: [
      'Multiple commercial and residential listings',
      'Custom built responsive theme',
      'Advanced search and filtering',
      'SMTP email integration',
      'SEO optimized with YoastSEO',
      'Mobile-first responsive design',
      'Form submission handling',
    ],
    challenge:
      'Creating a user-friendly property search experience while maintaining fast load times with multiple high-resolution property images.',
    solution:
      'Implemented custom WordPress theme with optimized image loading, advanced caching, and intuitive search filters.',
    impact:
      'Streamlined property discovery for Kamloops rental market with improved user engagement.',
  },
  {
    title: 'Advanced Plumbing Kamloops',
    description:
      'Modern plumbing service website rebuilt from static HTML to Next.js with enhanced performance and SEO.',
    shortDescription:
      'Static website hosted on DigitalOcean with a secure contact form and PDF form submission.',
    cover: '/images/plumbing/1.webp',
    screenshots: [
      '/images/plumbing/1.webp',
      '/images/plumbing/2.webp',
      '/images/plumbing/3.webp',
      '/images/plumbing/4.webp',
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'JavaScript', 'PHP'],
    liveUrl: 'https://www.advancedplumbingkamloops.ca',
    githubUrl: 'https://github.com/Tweakforme/plumbingkamloops',
    status: 'completed',
    type: 'client',
    keyFeatures: [
      'Migration from static HTML to Next.js',
      'Blazing fast performance optimization',
      'Mobile-responsive design',
      'SEO optimized content and structure',
      'Interactive blog section',
      'Comprehensive FAQ page',
      'Secure contact forms',
    ],
    challenge:
      'Migrating a static HTML site to modern React framework while maintaining SEO rankings and improving performance.',
    solution:
      'Carefully planned migration using Next.js with server-side rendering, maintained URL structure, and enhanced mobile experience.',
    impact:
      'Achieved superior SEO rankings with blazing fast load times and improved mobile user experience.',
  },
  {
    title: 'Tesla Pre-Owned Listings',
    description:
      'Custom Tesla vehicle marketplace with dynamic listings and responsive design.',
    shortDescription:
      'Custom site for Tesla car listings that are pre-owned with dynamic pages.',
    cover: '/images/tesla/1.png', // You'll need to add these images
    screenshots: ['/images/tesla/1.png', '/images/tesla/2.png'],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Dynamic Routing'],
    liveUrl: 'https://cars.theevstore.ca',
    githubUrl: 'https://github.com/Tweakforme/Teslalistings',
    status: 'completed',
    type: 'client',
    keyFeatures: [
      '20+ Tesla vehicle listings',
      'Dynamic pages for each vehicle',
      'Custom coded from scratch',
      'Fully responsive design',
      'Advanced search and filtering',
      'High-quality image galleries',
      'Detailed vehicle specifications',
    ],
    challenge:
      'Creating a specialized marketplace for pre-owned Tesla vehicles with detailed specifications and appealing presentation.',
    solution:
      'Built custom Next.js application with dynamic routing, optimized image handling, and intuitive search functionality.',
    impact:
      'Provided streamlined Tesla shopping experience with detailed vehicle information and mobile-optimized interface.',
  },
  {
    title: 'Raven Reads Books',
    description:
      'Shopify e-commerce store for Canadian Indigenous book club with custom theme modifications.',
    shortDescription:
      'Shopify theme customization, marketing pages, and QA testing for Canadian Indigenous book club.',
    cover: '/images/raven/1.webp',
    screenshots: ['/images/raven/1.webp'],
    technologies: ['Shopify', 'Dawn Theme', 'HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://www.ravenreads.com',
    githubUrl: null, // Shopify store
    status: 'discontinued',
    type: 'client',
    keyFeatures: [
      'Custom Shopify Dawn theme modifications',
      'Product catalog management',
      'Marketing page development',
      'QA testing and optimization',
      'Indigenous book specialization',
    ],
    challenge:
      'Customizing Shopify theme to reflect Indigenous culture while maintaining e-commerce functionality.',
    solution:
      'Modified Dawn theme with cultural sensitivity, added custom product pages and marketing content.',
    impact:
      'Supported Canadian Indigenous book community with specialized online bookstore platform.',
  },
  {
    title: 'Employee Timesheet App',
    description:
      'Internal Express.js dashboard for employee time tracking with automated Excel reporting and dynamic employee management.',
    shortDescription:
      'Internal React + Node.js dashboard for job tracking, export to PDF, and database backup.',
    cover: '/images/employee/1.webp',
    screenshots: ['/images/employee/1.webp', '/images/employee/2.webp'],
    technologies: [
      'Express.js',
      'React',
      'Node.js',
      'MySQL',
      'Tailwind CSS',
      'Excel.js',
    ],
    liveUrl: null, // Internal app
    githubUrl: null, // Private/internal
    status: 'completed',
    type: 'client',
    keyFeatures: [
      'Employee clock in/out functionality',
      'Dynamic timesheet logging',
      'Automated weekly Excel generation',
      'Employee bio management system',
      'Digital signature integration',
      'Real-time hours tracking',
      'Weekly report automation',
      'Employee profile updates',
    ],
    challenge:
      'Creating a comprehensive time tracking system that automates payroll reporting while maintaining accurate employee records.',
    solution:
      'Built Express.js backend with React frontend, integrated Excel generation for weekly reports with employee signatures and dynamic profile management.',
    impact:
      'Streamlined employee time tracking and payroll processing with automated weekly reporting and reduced administrative overhead.',
  },
  {
    title: 'The EV Store',
    description:
      'Full-scale MERN stack e-commerce platform for Tesla parts with advanced inventory management.',
    shortDescription:
      'Full e-commerce store selling Tesla parts with 500+ products and integrated payment processing.',
    cover: '/images/evstore/1.png', // Updated path for EV store images
    screenshots: ['/images/evstore/1.png', '/images/evstore/2.png'],
    technologies: [
      'MongoDB',
      'Express.js',
      'React',
      'Node.js',
      'Medusa',
      'Stripe',
      'ShipStation',
    ],
    liveUrl: 'https://theevstore.ca',
    githubUrl: null, // Private/commercial
    status: 'in-development',
    type: 'client',
    keyFeatures: [
      '500+ Tesla parts inventory',
      'Stripe payment integration',
      'ShipStation shipping automation',
      'Medusa backend architecture',
      'Advanced product search',
      'Inventory management system',
      'Order tracking and fulfillment',
    ],
    challenge:
      'Building a comprehensive e-commerce platform with complex inventory management and multiple integrations.',
    solution:
      'Implementing MERN stack with Medusa backend for scalable e-commerce operations and automated fulfillment.',
    impact:
      'Creating specialized Tesla parts marketplace with streamlined ordering and fulfillment process.',
  },
] as const;

// ADD THE MISSING EXPORTS BELOW:

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
] as const;

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
