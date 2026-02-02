'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import Project from '@/components/project';
import { SectionHeading } from '@/components/section-heading';
import { useSectionInView } from '@/hooks/use-section-in-view';
import { projectsData } from '@/lib/data';

const DRAG_THRESHOLD = 5;

export const Projects = () => {
  const { ref } = useSectionInView('Projects');
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const positionRef = useRef(0);
  const speed = 0.4;

  // Drag state
  const mouseDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Momentum state
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const momentumRef = useRef(false);
  const friction = 0.95;

  const getHalfWidth = () => {
    if (!trackRef.current) return 0;
    return trackRef.current.scrollWidth / 2;
  };

  const wrapPosition = () => {
    const half = getHalfWidth();
    if (half === 0) return;
    if (positionRef.current > 0) positionRef.current -= half;
    if (positionRef.current <= -half) positionRef.current += half;
  };

  const animate = useCallback(() => {
    if (!trackRef.current) return;

    if (momentumRef.current) {
      positionRef.current += velocityRef.current;
      velocityRef.current *= friction;
      wrapPosition();

      if (Math.abs(velocityRef.current) < 0.1) {
        momentumRef.current = false;
        velocityRef.current = 0;
      }
    } else if (!isDraggingRef.current && !isHovered) {
      positionRef.current -= speed;
      wrapPosition();
    }

    trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
    animationRef.current = requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [animate]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseDownRef.current = true;
    momentumRef.current = false;
    velocityRef.current = 0;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = positionRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = Date.now();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseDownRef.current) return;

    const dx = e.clientX - dragStartXRef.current;

    // Only start dragging after threshold
    if (!isDraggingRef.current && Math.abs(dx) > DRAG_THRESHOLD) {
      isDraggingRef.current = true;
      setIsDragging(true);
    }

    if (!isDraggingRef.current) return;

    positionRef.current = dragStartPosRef.current + dx;
    wrapPosition();

    const now = Date.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      velocityRef.current =
        ((e.clientX - lastXRef.current) / Math.max(dt, 1)) * 16;
    }
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
  };

  const handleMouseUp = () => {
    const wasDragging = isDraggingRef.current;
    mouseDownRef.current = false;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (wasDragging && Math.abs(velocityRef.current) > 0.5) {
      momentumRef.current = true;
    }
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    mouseDownRef.current = true;
    momentumRef.current = false;
    velocityRef.current = 0;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartPosRef.current = positionRef.current;
    lastXRef.current = e.touches[0].clientX;
    lastTimeRef.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!mouseDownRef.current) return;

    const dx = e.touches[0].clientX - dragStartXRef.current;

    if (!isDraggingRef.current && Math.abs(dx) > DRAG_THRESHOLD) {
      isDraggingRef.current = true;
      setIsDragging(true);
    }

    if (!isDraggingRef.current) return;

    positionRef.current = dragStartPosRef.current + dx;
    wrapPosition();

    const now = Date.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      velocityRef.current =
        ((e.touches[0].clientX - lastXRef.current) / Math.max(dt, 1)) * 16;
    }
    lastXRef.current = e.touches[0].clientX;
    lastTimeRef.current = now;
  };

  const handleTouchEnd = () => {
    const wasDragging = isDraggingRef.current;
    mouseDownRef.current = false;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (wasDragging && Math.abs(velocityRef.current) > 0.5) {
      momentumRef.current = true;
    }
  };

  // Duplicate for seamless loop
  const items = [...projectsData, ...projectsData];

  return (
    <section ref={ref} id="projects" className="my-10 scroll-mt-28 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
        viewport={{ once: true }}
      >
        <SectionHeading
          heading="Projects"
          content="Stuff I've shipped. Hover to pause, drag to explore."
        />
      </motion.div>

      {/* Full-width carousel */}
      <div
        ref={wrapperRef}
        className="relative inset-x-1/2 mx-[-50vw] w-screen overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseUp();
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Edge fades */}
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent md:w-32" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l to-transparent md:w-32" />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className="flex w-max gap-4 p-4 md:gap-5 md:px-6"
          style={{ userSelect: 'none' }}
        >
          {items.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              className="w-[280px] shrink-0 sm:w-[300px] md:w-[360px]"
              style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
            >
              <Project project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
