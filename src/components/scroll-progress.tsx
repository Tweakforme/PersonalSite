'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="bg-primary fixed inset-x-0 top-0 z-50 h-[2px] origin-left"
      style={{ scaleX }}
    />
  );
};
