'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, X } from 'lucide-react';
import Image from 'next/image';

import { Icons } from '@/components/icons';
import { SectionHeading } from '@/components/section-heading';
import { useSectionInView } from '@/hooks/use-section-in-view';
import { projectsData } from '@/lib/data';

type TProject = (typeof projectsData)[number];

const statusLabel: Record<TProject['status'], string> = {
  completed: 'Shipped',
  'in-development': 'Building',
  discontinued: 'Archived',
};

const STEPS = ['Challenge', 'Solution', 'Impact'] as const;

const ProjectModal = ({
  project,
  projectIndex,
  onClose,
}: {
  project: TProject;
  projectIndex: number;
  onClose: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center sm:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="bg-background/70 absolute inset-0 backdrop-blur-2xl" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 56 }}
          transition={{ type: 'spring', damping: 34, stiffness: 320 }}
          className="bg-card relative z-10 flex h-[92vh] w-full flex-col overflow-hidden rounded-t-[28px] shadow-2xl sm:h-[86vh] sm:max-w-5xl sm:flex-row sm:rounded-[24px]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Image panel ── */}
          <div className="relative h-52 shrink-0 overflow-hidden sm:h-full sm:w-2/5">
            <motion.div
              initial={{ scale: 1.07 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, 45vw"
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Mobile: gradient merges image into card below */}
            <div className="from-card absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t to-transparent sm:hidden" />
            {/* Desktop: soft right-edge fade into content */}
            <div className="from-card absolute inset-y-0 right-0 hidden w-10 bg-gradient-to-l to-transparent sm:block" />

            {/* Ghost project number */}
            <div className="pointer-events-none absolute right-3 top-3 select-none font-mono text-[72px] font-black leading-none text-white/[0.06] sm:text-[90px]">
              {String(projectIndex + 1).padStart(2, '0')}
            </div>
          </div>

          {/* ── Content panel ── */}
          <div className="flex min-h-0 flex-1 flex-col">
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between px-6 pb-4 pt-5 sm:px-8 sm:pt-8">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.13em] ${
                      project.status === 'discontinued'
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {statusLabel[project.status]}
                  </span>
                  {project.type === 'personal' && (
                    <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.13em]">
                      Personal
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                  {project.title}
                </h2>
              </div>

              <button
                onClick={onClose}
                className="bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground ml-4 shrink-0 rounded-full p-2 transition-all duration-200"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="bg-border/40 mx-6 h-px shrink-0 sm:mx-8" />

            {/* Scrollable body */}
            <div className="flex-1 space-y-7 overflow-y-auto p-6 sm:px-8 sm:py-7">
              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed sm:text-[15px]">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-muted/60 text-foreground/55 rounded-lg px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Numbered stepper: Challenge → Solution → Impact */}
              <div>
                {STEPS.map((label, i) => {
                  const text =
                    label === 'Challenge'
                      ? project.challenge
                      : label === 'Solution'
                        ? project.solution
                        : project.impact;
                  return (
                    <div key={label} className="flex gap-4">
                      <div className="flex flex-col items-center pt-0.5">
                        <div className="bg-primary/15 text-primary flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black">
                          {i + 1}
                        </div>
                        {i < STEPS.length - 1 && (
                          <div
                            className="bg-border/50 mt-1 w-px flex-1"
                            style={{ minHeight: '1.75rem' }}
                          />
                        )}
                      </div>
                      <div className="min-w-0 pb-5">
                        <p className="text-primary mb-1.5 text-[10px] font-black uppercase tracking-[0.15em]">
                          {label}
                        </p>
                        <p className="text-muted-foreground text-[13px] leading-relaxed sm:text-sm">
                          {text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Key features */}
              {project.keyFeatures.length > 0 && (
                <div>
                  <p className="text-primary mb-3 text-[10px] font-black uppercase tracking-[0.15em]">
                    Features
                  </p>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {project.keyFeatures.map((feature, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground flex items-start gap-2.5 text-[13px] leading-relaxed"
                      >
                        <div className="bg-primary/35 mt-[5px] size-1.5 shrink-0 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Pinned footer with CTAs */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="border-border/40 shrink-0 border-t px-6 py-4 sm:px-8 sm:py-5">
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold tracking-wide transition-all duration-200"
                    >
                      <ExternalLink className="size-3.5" />
                      Visit Site
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border text-foreground bg-muted/40 hover:bg-muted/70 flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold tracking-wide transition-all duration-200"
                    >
                      <Icons.github className="size-3.5" />
                      Source
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export const Projects = () => {
  const { ref } = useSectionInView('Projects');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<{
    project: TProject;
    index: number;
  } | null>(null);
  const [previewTop, setPreviewTop] = useState(0);

  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleHover = (index: number) => {
    setHoveredIndex(index);
    const row = rowRefs.current[index];
    const list = listRef.current;
    if (row && list) {
      const rowRect = row.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      const previewH = 170;
      const rawTop =
        rowRect.top - listRect.top + rowRect.height / 2 - previewH / 2;
      const maxTop = list.offsetHeight - previewH;
      setPreviewTop(Math.max(0, Math.min(rawTop, maxTop)));
    }
  };

  const activeProject =
    hoveredIndex !== null ? projectsData[hoveredIndex] : null;

  return (
    <section
      ref={ref}
      id="projects"
      className="my-10 scroll-mt-28 px-4 md:mb-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
        viewport={{ once: true }}
      >
        <SectionHeading
          heading="Projects"
          content="Stuff I've shipped. Hover to preview, click to explore."
        />
      </motion.div>

      <div className="mx-auto max-w-5xl">
        <div className="relative flex gap-12">
          {/* Project list */}
          <div ref={listRef} className="flex-1">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.title}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * index, duration: 0.4 }}
                viewport={{ once: true }}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelected({ project, index })}
                className="border-border/40 hover:border-primary/20 group flex cursor-pointer items-center gap-3 border-b py-4 transition-colors duration-200 sm:gap-4 sm:py-5"
              >
                {/* Index */}
                <span className="text-muted-foreground/30 group-hover:text-primary/50 w-6 shrink-0 font-mono text-[10px] transition-colors duration-200 sm:w-7 sm:text-xs">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Mobile thumbnail */}
                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg lg:hidden">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h3 className="group-hover:text-primary text-sm font-extrabold tracking-tight transition-colors duration-200 sm:text-base">
                      {project.title}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        project.status === 'discontinued'
                          ? 'bg-muted/50 text-muted-foreground/50'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {statusLabel[project.status]}
                    </span>
                  </div>

                  {/* Short description — mobile only */}
                  <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[11px] leading-relaxed lg:hidden">
                    {project.shortDescription}
                  </p>

                  {/* Tech tags — desktop */}
                  <div className="mt-1 hidden flex-wrap gap-x-2 gap-y-0.5 sm:flex">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-muted-foreground/50 text-[10px]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-muted-foreground/30 text-[10px]">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <motion.div
                  animate={{
                    x: hoveredIndex === index ? 0 : -6,
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.15 }}
                  className="shrink-0"
                >
                  <ArrowUpRight className="text-primary size-4" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Floating preview — desktop only, tracks hovered row */}
          <div className="hidden shrink-0 lg:block lg:w-64 xl:w-72">
            <div className="relative h-full">
              <AnimatePresence>
                {activeProject && (
                  <motion.div
                    key={activeProject.title}
                    initial={{ opacity: 0, scale: 0.96, x: 8 }}
                    animate={{ opacity: 1, scale: 1, x: 0, top: previewTop }}
                    exit={{ opacity: 0, scale: 0.96, x: 8 }}
                    transition={{
                      opacity: { duration: 0.15 },
                      scale: { duration: 0.15 },
                      x: { duration: 0.15 },
                      top: { type: 'spring', stiffness: 500, damping: 50 },
                    }}
                    className="border-border/50 absolute w-full overflow-hidden rounded-2xl border shadow-xl"
                    style={{ pointerEvents: 'none' }}
                  >
                    <div className="relative aspect-video w-full">
                      <Image
                        src={activeProject.cover}
                        alt={activeProject.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <ProjectModal
          project={selected.project}
          projectIndex={selected.index}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
};
