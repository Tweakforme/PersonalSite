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
        <p className="mb-4">{
  "I'm AJ! A full-stack developer based in Calgary, Alberta. I lived in BC for about eight years between Kamloops and Vancouver, and I ended up naturalizing as a Canadian citizen in 2024. I believe in the idea of getting shit done (the ethical way). I build clean, fast web experiences and I use and adapt to AI in my workflow. I like taking ideas and turning them into something real, whether it's a full product, a tool, or a custom site. Outside tech, I'm pretty active — I train BJJ when I can, lift regularly, snowboard in the winter, listen to music, and follow UFC. I just like to stay sharp and always improving."
}
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
