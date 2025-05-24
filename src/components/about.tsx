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
      className="my-10 flex w-full scroll-mt-28 flex-col items-center md:mb-20"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading heading="About Me" />
      <div className="-mt-5 max-w-2xl text-center leading-7">
        <p className="mb-4">
          I&apos;m Adhvait Jadav — a full-stack developer with a background in
          business administration and currently completing my fourth year of
          Computer Science online. I started my journey self-taught, learning
          HTML, CSS, and Java, driven by a curiosity for how things work under
          the hood. That foundation eventually led to a focused pursuit of
          modern web development. I enjoy the balance between structure and
          creativity — whether it&apos;s crafting scalable component systems or
          refining user interfaces. My go-to stack includes React, Next.js,
          TypeScript, and Tailwind CSS, and I&apos;m constantly building,
          experimenting, and staying ahead in a fast-paced tech landscape.
          Outside of code, I&apos;m into strength training and follow UFC,
          unwind with a good chess match or story-rich open-world game, and stay
          plugged into science and wildlife. I&apos;ve always had a soft spot
          for dinosaurs — some interests never really leave.
        </p>

        <p>
          I&apos;m open to Job opportunities where I can contribute, learn and
          grow. If you have a good opportunity that matches my skills and
          experience then don&apos;t hesitate to contact me.
        </p>
      </div>
      <Skills />
    </motion.section>
  );
};
