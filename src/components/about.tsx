'use client';

import { motion } from 'framer-motion';

import { SectionHeading } from '@/components/section-heading';
import { Skills } from '@/components/skills';
import { useSectionInView } from '@/hooks/use-section-in-view';

export const About = () => {
  const { ref } = useSectionInView('About');

  return (
    <motion.section
      ref={ref}
      id="about"
      className="my-10 flex w-full scroll-mt-28 flex-col items-center px-4 md:mb-20"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading heading="About Me" />

      <div className="mt-4 max-w-2xl space-y-4 text-center">
        <p className="text-muted-foreground text-sm leading-relaxed sm:text-[15px]">
          I go by AJ. Full-stack developer based in Calgary, Alberta. Spent
          about eight years bouncing between Kamloops and Vancouver before
          landing here. I&apos;m the type to just get it done, the right way,
          not the lazy way. I build things that are fast, clean, and actually
          useful. I lean on AI to move quicker and ship sharper because why
          wouldn&apos;t you.
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed sm:text-[15px]">
          When I&apos;m not coding I&apos;m probably training BJJ, lifting,
          hitting the slopes, or watching UFC. I keep things simple. Stay sharp,
          keep levelling up, don&apos;t overthink it.
        </p>
        <p className="text-muted-foreground text-xs opacity-60 sm:text-sm">
          Always open to the right opportunity. If you&apos;ve got something
          interesting, hit me up.
        </p>
      </div>

      <Skills />
    </motion.section>
  );
};
