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
      className="my-10 flex w-full flex-col items-center scroll-mt-28 md:mb-20"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading heading="About Me" />

      <div className="mt-4 max-w-2xl text-center">
        <p className="leading-relaxed text-muted-foreground">
          I&apos;m AJ! A full-stack developer based in Calgary, Alberta. I lived
          in BC for about eight years between Kamloops and Vancouver, and
          made the switch to Alberta recently. I believe in getting shit
          done (the right way). I build clean, fast web experiences, and I use AI
          in my workflow to move faster and create sharper solutions. I
          like taking ideas and turning them into something real, whether
          it&apos;s a full product, a tool, or a custom site.
          <br />
          <br />
          Outside tech, I&apos;m pretty active. I train BJJ when I can, lift
          regularly, like winter sports, listen to music, and follow UFC. I
          like keeping life simple by staying sharp, and keeping on levelling up.
        </p>

        <p className="mt-4 text-muted-foreground">
          I&apos;m open to job opportunities where I can contribute, learn, and
          grow. If you have something that matches my skills, feel free to reach
          out.
        </p>
      </div>

      <Skills />
    </motion.section>
  );
};
