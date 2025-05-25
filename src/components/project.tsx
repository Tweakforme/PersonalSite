'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';

type TProject = {
  title: string;
  cover: string;
  screenshots: string[];
  description: string;
  technologies: string[];
};

type TProps = {
  project: TProject;
  index: number;
};

const fadeInVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * index },
  }),
};

export const Project = ({ project, index }: TProps) => {
  const [showModal, setShowModal] = useState(false);
  const { theme } = useTheme();

  return (
    <>
      <motion.div
        variants={fadeInVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        custom={index}
        className="flex flex-col rounded border p-4 shadow transition hover:shadow-xl"
      >
        <div
          className="cursor-pointer overflow-hidden rounded"
          onClick={() => setShowModal(true)}
        >
          <Image
            src={project.cover}
            alt={project.title}
            width={800}
            height={450}
            className="rounded transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          {project.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-muted-foreground rounded-full border px-3 py-1 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {showModal &&
        createPortal(
          <div
            className={`${theme} bg-background text-foreground fixed inset-0 z-50 flex flex-col items-center justify-start overflow-y-auto px-4 py-8`}
          >
            <button
              onClick={() => setShowModal(false)}
              className={`mb-6 self-start rounded border px-4 py-2 text-sm font-medium transition ${
                theme === 'light'
                  ? 'border-gray-300 bg-white text-black hover:bg-gray-100'
                  : 'border-white/30 bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              ⬅ Back
            </button>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.screenshots.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  width={800}
                  height={450}
                  className="rounded shadow-lg"
                />
              ))}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
