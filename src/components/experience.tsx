'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { Icons } from '@/components/icons';
import { SectionHeading } from '@/components/section-heading';
import { useSectionInView } from '@/hooks/use-section-in-view';
import { experiencesData } from '@/lib/data';

const ExperienceCard = ({
  exp,
  index,
}: {
  exp: (typeof experiencesData)[number];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative flex gap-5 sm:gap-8"
    >
      {/* Timeline column */}
      <div className="flex w-10 shrink-0 flex-col items-center sm:w-14">
        {/* Node */}
        <div className="bg-background group-hover:border-primary/30 group-hover:text-primary border-border/60 text-muted-foreground/60 relative z-10 flex size-10 items-center justify-center rounded-full border font-mono text-xs font-black transition-all duration-300 sm:size-14 sm:text-sm">
          {String(index + 1).padStart(2, '0')}
          <div className="bg-primary/5 absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        {/* Line */}
        {index < experiencesData.length - 1 && (
          <div className="from-foreground/10 w-px flex-1 bg-gradient-to-b to-transparent" />
        )}
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-background border-border/60 hover:border-border relative mb-8 flex-1 overflow-hidden rounded-2xl border transition-all duration-500 sm:mb-12"
      >
        {/* Mouse spotlight */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: isHovered
              ? `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.04), transparent 60%)`
              : 'none',
          }}
        />

        <div className="relative p-5 sm:p-6">
          {/* Period badge */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="border-primary/20 bg-primary/5 text-primary flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
              <Icons.calendar className="size-2.5" />
              {exp.period}
            </div>
            {exp.projects.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {exp.projects.map((proj) => (
                  <span
                    key={proj.name}
                    className="border-border/60 bg-muted/30 text-muted-foreground/70 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold"
                  >
                    {proj.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Title + Company */}
          <h3 className="group-hover:text-primary text-base font-extrabold leading-tight tracking-tight transition-colors duration-300 sm:text-lg">
            {exp.title}
          </h3>
          <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
            <Icons.building className="inline size-3.5 shrink-0 opacity-50" />
            {exp.company}
          </p>

          {/* Description */}
          <p className="text-muted-foreground mt-3 text-[13px] leading-relaxed sm:text-sm">
            {exp.description}
          </p>

          {/* Technologies */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="group-hover:border-primary/10 border-border/50 bg-muted/20 text-muted-foreground/70 group-hover:text-foreground/70 rounded-md border px-2 py-0.5 text-[10px] font-medium transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent */}
        <div className="via-primary/30 absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
};

export const Experience = () => {
  const { ref: sectionRef } = useSectionInView('Experience');

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="my-10 scroll-mt-28 px-4 md:mb-20"
    >
      <SectionHeading
        heading="Experience"
        content="The places I've worked and the stuff I've built along the way."
      />

      <div className="mx-auto max-w-2xl">
        {experiencesData.map((exp, index) => (
          <ExperienceCard key={exp.company} exp={exp} index={index} />
        ))}
      </div>
    </section>
  );
};
