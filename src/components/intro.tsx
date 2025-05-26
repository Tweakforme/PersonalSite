'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/button';
import { Icons } from '@/components/icons';
import { useSectionInView } from '@/hooks/use-section-in-view';

export const Intro = () => {
  const { ref } = useSectionInView('Home');

  return (
    <section
      ref={ref}
      id="home"
      className="my-10 flex scroll-mt-96 flex-col items-center gap-5 text-center sm:mt-28"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'tween',
          duration: 0.3,
        }}
      >
        <div className="border-border relative size-28 overflow-hidden rounded-full border-2 shadow-lg sm:size-32 md:size-36">
          <Image
            src="/images/me.jpg"
            alt="Adhvait Jadav"
            fill
            className="-translate-x-[2.5%] scale-110 object-cover object-[25%_-10%] sm:object-[30%_-15%] md:scale-125"
            priority
          />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl"
      >
        Hi, I’m{' '}
        <span className="relative inline-block">
          {/* Light Mode — match “Get in touch” green (primary color) */}
          <span className="text-primary font-extrabold dark:hidden">
            Adhvait
          </span>
          {/* Dark Mode — neon green */}
          <span className="hidden font-extrabold text-[#39ff14] dark:inline">
            Adhvait
          </span>
        </span>
        , a full-stack developer building modern web apps.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
        className="text-muted-foreground max-w-xl"
      >
        Full-stack developer based in Canada with experience across modern
        stacks — from React/Next.js to Node, Medusa, Strapi, SQL/noSQL, and
        cloud deployment on AWS & Vercel.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
        className="flex flex-row gap-2"
      >
        <Button asChild size="lg">
          <Link href="#contact">
            Get in touch <Icons.arrowRight className="ml-2 size-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="hidden sm:flex" asChild>
          <a href="/Resume_AJ.pdf" download>
            Download CV <Icons.download className="ml-2 size-4" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link
            href="https://www.linkedin.com/in/adhvaitjadav"
            aria-label="Linkedin"
            target="_blank"
          >
            <Icons.linkedin className="size-5" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link
            href="https://github.com/Tweakforme"
            aria-label="Github"
            target="_blank"
          >
            <Icons.github className="size-5" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
};
