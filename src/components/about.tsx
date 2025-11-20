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
      className="my-10 md:mb-20 flex w-full flex-col items-center scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading heading="About Me" />

      <p className="text-muted-foreground leading-relaxed">
        I&apos;m AJ! A full-stack developer based in Calgary, Alberta. I lived
        in BC for about eight years between Kamloops and Vancouver, and I
        naturalized as a Canadian citizen in 2024. I believe in getting things
        done the right way. I build clean, fast web experiences and I use AI
        heavily in my workflow to move faster and create sharper solutions. I
        like taking ideas and turning them into something real — whether
        it&apos;s a full product, a tool, or a custom site.
        <br />
        <br />
        Outside tech, I&apos;m pretty active. I train BJJ when I can, lift
        regularly, snowboard in the winter, listen to music, and follow UFC. I
        like keeping life simple — stay sharp, stay moving, keep improving.
      </p>

      <p className="mt-4 text-muted-foreground">
        I&apos;m open to job opportunities where I can contribute, learn, and
        grow. If you have something that matches my skills, feel free to reach
        out.
      </p>

      <Skills />
    </motion.section>
  );
};
