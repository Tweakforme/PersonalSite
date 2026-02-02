'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Lock, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/button';
import { Icons } from '@/components/icons';
import { useSectionInView } from '@/hooks/use-section-in-view';

export const Intro = () => {
  const { ref } = useSectionInView('Home');
  const [showCvModal, setShowCvModal] = useState(false);
  const [cvCode, setCvCode] = useState('');
  const [cvError, setCvError] = useState(false);

  const handleCvDownload = () => {
    if (cvCode === '2028') {
      setCvError(false);
      setShowCvModal(false);
      setCvCode('');
      const link = document.createElement('a');
      link.href = '/Resume_AJ.pdf';
      link.download = 'Resume_AJ.pdf';
      link.click();
    } else {
      setCvError(true);
    }
  };

  return (
    <section
      ref={ref}
      id="home"
      className="my-8 flex scroll-mt-96 flex-col items-center gap-5 px-4 text-center sm:mt-28 sm:gap-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        <div className="relative">
          <div className="border-primary/30 relative size-24 overflow-hidden rounded-full border-2 shadow-2xl sm:size-32 md:size-36">
            <Image
              src="/images/me.jpg"
              alt="AJ"
              fill
              className="sm:scale-130 md:scale-135 -translate-x-1/4 scale-150 object-cover object-[12%_-10%]"
              priority
            />
          </div>
          <div className="border-background absolute bottom-1 right-1 size-2.5 rounded-full border-[1.5px] bg-emerald-500 sm:bottom-1.5 sm:right-1.5 sm:size-3" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] sm:text-xs"
      >
        Full-Stack Developer
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="font-heading max-w-3xl text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
      >
        Hey, I&apos;m{' '}
        <span className="text-primary relative inline-block">
          AJ
          <svg
            className="text-primary/30 absolute -bottom-1 left-0 w-full"
            viewBox="0 0 100 8"
            fill="none"
          >
            <path
              d="M1 5.5C24 2 76 2 99 5.5"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
        .
        <br />
        <span className="text-muted-foreground text-lg font-medium tracking-normal sm:text-2xl md:text-3xl">
          I turn ideas into real products.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground max-w-lg px-2 text-sm leading-relaxed sm:text-[15px]"
      >
        Full-stack dev out of Calgary who loves building things that actually
        work. React, Next.js, Node, Shopify, you name it. I figure it out and
        ship it.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex flex-wrap justify-center gap-2"
      >
        <Button asChild size="lg">
          <Link href="#contact">
            Let&apos;s talk <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="hidden sm:flex"
          onClick={() => setShowCvModal(true)}
        >
          <Lock className="mr-2 size-3.5" />
          Resume
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link
            href="https://www.linkedin.com/in/adhvaitjadav"
            aria-label="Linkedin"
            target="_blank"
          >
            <Icons.linkedin className="size-5" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link
            href="https://github.com/Tweakforme"
            aria-label="Github"
            target="_blank"
          >
            <Icons.github className="size-5" />
          </Link>
        </Button>
      </motion.div>

      {/* CV Password Modal */}
      {showCvModal &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowCvModal(false);
              setCvCode('');
              setCvError(false);
            }}
          >
            <div className="bg-foreground/80 dark:bg-background/80 absolute inset-0 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border-border relative w-full max-w-sm overflow-hidden rounded-2xl border p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setShowCvModal(false);
                  setCvCode('');
                  setCvError(false);
                }}
                className="hover:bg-muted/40 absolute right-3 top-3 rounded-lg p-1.5 transition-colors"
              >
                <X className="size-4" />
              </button>

              <div className="mb-5 flex items-center gap-3">
                <div className="bg-primary/10 flex size-10 items-center justify-center rounded-xl">
                  <Lock className="text-primary size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Grab my resume</h3>
                  <p className="text-muted-foreground text-xs">
                    Drop the code and it&apos;s yours
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={cvCode}
                  onChange={(e) => {
                    setCvCode(e.target.value);
                    setCvError(false);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleCvDownload()}
                  placeholder="Enter code"
                  className={`bg-muted/30 w-full rounded-xl border px-4 py-3 text-center text-lg font-bold tracking-[0.5em] outline-none transition-all placeholder:text-sm placeholder:font-normal placeholder:tracking-normal ${
                    cvError
                      ? 'border-destructive/60 text-destructive'
                      : 'focus:border-primary/50 border-border'
                  }`}
                  autoFocus
                />
                {cvError && (
                  <p className="text-destructive text-center text-xs">
                    Nope, wrong code. Try again.
                  </p>
                )}
                <button
                  onClick={handleCvDownload}
                  className="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold tracking-wide transition-all duration-200 hover:opacity-90"
                >
                  <Download className="size-4" />
                  Download
                </button>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </section>
  );
};
