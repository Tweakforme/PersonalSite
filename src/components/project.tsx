'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';

type TProject = {
  title: string;
  description: string;
  shortDescription: string;
  cover: string;
  screenshots: readonly string[];
  technologies: readonly string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  status: 'completed' | 'in-development' | 'discontinued';
  type: 'client' | 'personal';
  keyFeatures: readonly string[];
  challenge: string;
  solution: string;
  impact: string;
};

type TProps = {
  project: TProject;
  index: number;
};

const statusLabel: Record<TProject['status'], string> = {
  completed: 'Shipped',
  'in-development': 'Building',
  discontinued: 'Archived',
};

export const Project = ({ project, index }: TProps) => {
  const [showModal, setShowModal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  const displayIndex = (index % 8) + 1;

  return (
    <>
      {/* Card */}
      <div
        ref={cardRef}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl transition-all duration-500"
        onClick={() => setShowModal(true)}
        onMouseMove={handleCardMouseMove}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        {/* Border glow */}
        <div className="via-foreground/[0.08] group-hover:via-primary/20 absolute -inset-px rounded-2xl bg-gradient-to-r from-transparent to-transparent opacity-100 transition-opacity duration-500" />

        {/* Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: isCardHovered
              ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.06), transparent 60%)`
              : 'none',
          }}
        />

        {/* Inner */}
        <div className="bg-card relative flex h-full flex-col overflow-hidden rounded-2xl">
          {/* Cover */}
          <div className="relative h-44 overflow-hidden sm:h-48">
            <img
              src={project.cover}
              alt={project.title}
              className="size-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
            />
            <div className="from-card via-card/40 absolute inset-0 bg-gradient-to-t to-transparent" />

            {/* Number */}
            <div className="text-foreground/[0.04] group-hover:text-foreground/[0.08] absolute right-3 top-3 font-mono text-[40px] font-black leading-none transition-all duration-500">
              {String(displayIndex).padStart(2, '0')}
            </div>

            {/* Status pill */}
            <div className="absolute bottom-3 left-3">
              <span className="text-primary-foreground bg-primary/90 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                {statusLabel[project.status]}
              </span>
            </div>

            {/* Hover overlay */}
            <div className="bg-foreground/40 dark:bg-background/40 absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100">
              <div className="border-foreground/20 bg-foreground/10 dark:border-border/60 dark:bg-background/60 rounded-full border px-5 py-2.5 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-105">
                <span className="text-background dark:text-foreground text-xs font-bold uppercase tracking-wider">
                  Explore
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-4 sm:p-5">
            <div className="mb-2">
              <h3 className="group-hover:text-primary text-sm font-extrabold tracking-tight transition-colors duration-300 sm:text-[15px]">
                {project.title}
              </h3>
              <div className="from-primary/50 mt-1.5 h-px w-8 bg-gradient-to-r to-transparent transition-all duration-500 group-hover:w-16" />
            </div>

            <p className="text-muted-foreground mb-3 line-clamp-2 text-[11px] leading-relaxed sm:text-[12px]">
              {project.shortDescription}
            </p>

            {/* Tech */}
            <div className="mb-3 flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="border-border group-hover:border-primary/10 bg-muted/30 text-muted-foreground group-hover:text-foreground/60 rounded-md border px-1.5 py-0.5 text-[9px] font-medium tracking-wide transition-all duration-300 sm:text-[10px]"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="border-border bg-muted/20 text-muted-foreground/50 rounded-md border px-1.5 py-0.5 text-[9px] sm:text-[10px]">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="mt-auto flex gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary ring-primary/20 hover:bg-primary/15 bg-primary/10 hover:ring-primary/40 inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold tracking-wide ring-1 transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="size-3" />
                  Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted/50 inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-bold tracking-wide transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="size-3" />
                  Source
                </a>
              )}
            </div>
          </div>

          {/* Bottom glow */}
          <div className="via-primary/40 absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </div>

      {/* Modal */}
      {showModal &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
              onClick={() => setShowModal(false)}
            >
              <div className="bg-foreground/60 dark:bg-background/90 absolute inset-0 backdrop-blur-xl" />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                className="bg-card border-border relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl border shadow-2xl sm:rounded-3xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Compact hero */}
                <div className="relative h-32 overflow-hidden sm:h-40 md:h-48">
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="size-full object-cover"
                  />
                  <div className="from-card via-card/50 absolute inset-0 bg-gradient-to-t to-transparent" />

                  <button
                    onClick={() => setShowModal(false)}
                    className="border-border/60 bg-background/70 text-foreground hover:bg-background/90 absolute right-3 top-3 z-10 rounded-full border p-1.5 backdrop-blur-md transition-all duration-200"
                  >
                    <X className="size-4" />
                  </button>

                  {/* Title */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                    <h2 className="text-foreground text-xl font-black tracking-tight sm:text-2xl">
                      {project.title}
                    </h2>
                  </div>
                </div>

                {/* Scrollable content */}
                <div className="max-h-[calc(90vh-8rem)] overflow-y-auto p-4 sm:max-h-[calc(90vh-10rem)] sm:p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="border-primary/15 bg-primary/5 text-primary rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Challenge / Solution / Impact */}
                  <div className="mt-5 space-y-3 sm:mt-6">
                    {[
                      { label: 'Challenge', text: project.challenge },
                      { label: 'Solution', text: project.solution },
                      { label: 'Impact', text: project.impact },
                    ].map((item) => (
                      <div key={item.label}>
                        <span className="text-primary text-[11px] font-black uppercase tracking-widest">
                          {item.label}
                        </span>
                        <p className="text-muted-foreground mt-1 text-[13px] leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Key features */}
                  {project.keyFeatures.length > 0 && (
                    <div className="mt-5 sm:mt-6">
                      <span className="text-primary text-[11px] font-black uppercase tracking-widest">
                        Features
                      </span>
                      <ul className="text-muted-foreground mt-2 grid gap-1.5 text-[13px] leading-relaxed sm:grid-cols-2">
                        {project.keyFeatures.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary/50 mt-1 text-[8px]">
                              &#8226;
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions */}
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="mt-5 flex gap-3 sm:mt-6">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary ring-primary/20 hover:bg-primary/15 bg-primary/10 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold tracking-wide ring-1 transition-all duration-200"
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
                          className="border-border text-foreground bg-muted/30 hover:bg-muted/50 inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold tracking-wide transition-all duration-200"
                        >
                          <Github className="size-3.5" />
                          Source
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default Project;
