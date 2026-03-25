'use client';

import { motion } from 'framer-motion';

import { skillsData } from '@/lib/data';

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export const Skills = () => {
  return (
    <div className="mt-10 grid w-full grid-cols-4 gap-8 px-5 sm:grid-cols-6 sm:gap-10 sm:px-0 md:mt-14">
      {skillsData.map(({ icon, name }, index) => (
        <motion.div
          key={index}
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={index}
          className="group flex flex-col items-center gap-2"
        >
          <div className="transition-transform duration-200 group-hover:scale-110">
            {icon}
          </div>
          <span className="text-muted-foreground group-hover:text-foreground text-[9px] font-semibold uppercase tracking-widest transition-colors duration-200 sm:text-[10px]">
            {name}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
