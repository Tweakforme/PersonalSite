'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Briefcase,
  CheckCircle,
  Clock,
  Code,
  ExternalLink,
  Github,
  User,
} from 'lucide-react';

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

const fadeInVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * index },
  }),
};

const StatusBadge = ({ status }: { status: TProject['status'] }) => {
  const statusConfig = {
    completed: {
      icon: CheckCircle,
      text: 'Completed',
      color: 'text-green-500 border-green-500/30 bg-green-500/10',
    },
    'in-development': {
      icon: Clock,
      text: 'In Development',
      color: 'text-blue-500 border-blue-500/30 bg-blue-500/10',
    },
    discontinued: {
      icon: AlertCircle,
      text: 'Discontinued',
      color: 'text-orange-500 border-orange-500/30 bg-orange-500/10',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium ${config.color}`}
    >
      <Icon className="size-3" />
      {config.text}
    </span>
  );
};

const TypeBadge = ({ type }: { type: TProject['type'] }) => {
  const Icon = type === 'client' ? Briefcase : User;
  return (
    <span className="text-foreground/70 inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs font-medium backdrop-blur-sm">
      <Icon className="size-3" />
      {type === 'client' ? 'Client Project' : 'Personal Project'}
    </span>
  );
};

export const Project = ({ project, index }: TProps) => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <motion.div
        variants={fadeInVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        custom={index}
        className="group relative flex cursor-pointer flex-col rounded-xl border border-white/20 bg-white/10 p-3 shadow-lg backdrop-blur-sm transition-all duration-200 will-change-transform hover:-translate-y-1 hover:border-transparent hover:bg-white/20 hover:shadow-xl dark:border-white/10 dark:bg-white/5 dark:hover:border-transparent dark:hover:bg-white/10"
        onClick={() => setShowModal(true)}
      >
        {/* Project Image */}
        <div
          className="mb-3 cursor-pointer overflow-hidden rounded-lg"
          onClick={() => setShowModal(true)}
        >
          <img
            src={project.cover}
            alt={project.title}
            className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-lg bg-black/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-3">
              <span className="text-sm font-medium text-white">
                View Details
              </span>
            </div>
          </div>
        </div>

        {/* Project Header */}
        <div className="mb-2 flex items-start justify-between transition-all duration-200 group-hover:blur-[2px]">
          <h3 className="group-hover:text-primary text-lg font-bold transition-colors">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1">
            <StatusBadge status={project.status} />
            <TypeBadge type={project.type} />
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-3 line-clamp-2 text-sm transition-all duration-200 group-hover:blur-[2px]">
          {project.shortDescription}
        </p>

        {/* Technologies */}
        <div className="mb-3 flex flex-wrap gap-1 transition-all duration-200 group-hover:blur-[2px]">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-foreground/80 rounded-md border border-white/10 bg-white/20 px-2 py-1 text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-foreground/60 rounded-md border border-white/10 bg-white/20 px-2 py-1 text-xs">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-1 transition-all duration-200 group-hover:blur-[2px]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary/90 hover:bg-primary text-primary-foreground border-primary/20 inline-flex flex-1 items-center justify-center gap-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-all duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="size-3" />
              Live Site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2 py-1.5 text-xs font-medium transition-all duration-200 hover:bg-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="size-3" />
              Code
            </a>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg border border-white/20 bg-white/10 px-2 py-1.5 text-xs font-medium transition-all duration-200 hover:bg-white/20"
          >
            <Code className="size-3" />
          </button>
        </div>
      </motion.div>

      {/* Enhanced Modal */}
      {showModal &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="bg-background/95 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl border border-white/20 shadow-2xl backdrop-blur-md">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/20 bg-white/5 p-6 backdrop-blur-sm">
                <div>
                  <h2 className="text-2xl font-bold">{project.title}</h2>
                  <div className="mt-2 flex gap-2">
                    <StatusBadge status={project.status} />
                    <TypeBadge type={project.type} />
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-transparent p-2 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="border-b border-white/20 bg-white/5 backdrop-blur-sm">
                <nav className="flex space-x-8 px-6">
                  {['overview', 'features', 'tech'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`border-b-2 px-1 py-4 text-sm font-medium transition-all duration-300 ${
                        activeTab === tab
                          ? 'border-primary text-primary'
                          : 'text-muted-foreground hover:text-foreground border-transparent'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Modal Content */}
              <div className="max-h-[60vh] overflow-y-auto p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">
                        Project Overview
                      </h3>
                      <p className="text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold">Challenge</h4>
                      <p className="text-muted-foreground text-sm">
                        {project.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold">Solution</h4>
                      <p className="text-muted-foreground text-sm">
                        {project.solution}
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold">Impact</h4>
                      <p className="text-muted-foreground text-sm">
                        {project.impact}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary/90 hover:bg-primary text-primary-foreground border-primary/20 inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-medium backdrop-blur-sm transition-all duration-300"
                        >
                          <ExternalLink className="size-4" />
                          Visit Live Site
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                        >
                          <Github className="size-4" />
                          View Source Code
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">Key Features</h3>
                    <ul className="space-y-2">
                      {project.keyFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 size-5 shrink-0 text-green-500" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'tech' && (
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">
                      Technologies Used
                    </h3>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      {project.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="rounded-lg border border-white/10 bg-white/10 p-3 text-center backdrop-blur-sm"
                        >
                          <span className="font-medium">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

// Export as default for easier importing
export default Project;
