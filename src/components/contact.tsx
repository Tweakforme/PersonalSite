'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { sendEmailAction } from '@/actions/send-email';
import { SectionHeading } from '@/components/section-heading';
import { useSectionInView } from '@/hooks/use-section-in-view';
import { formSchema, TFormSchema } from '@/lib/form-schema';
import { cn } from '@/lib/utils';

export const Contact = () => {
  const { ref } = useSectionInView('Contact');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TFormSchema>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (values: TFormSchema) => {
    const { data, error } = await sendEmailAction(values);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(data);
    reset();
  };

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="my-10 w-full scroll-mt-28 px-4 md:mb-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <SectionHeading
        heading="Say Hi"
        content={
          <>
            Shoot me an email at{' '}
            <Link
              href="mailto:adhvait.jadav@gmail.com"
              className="text-primary hover:underline"
            >
              adhvait.jadav@gmail.com
            </Link>{' '}
            or use the form below. Either works.
          </>
        }
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-xl flex-col gap-4"
      >
        <div>
          <label
            htmlFor="email"
            className={cn(
              'mb-1.5 block text-sm font-semibold',
              errors.email?.message && 'text-destructive'
            )}
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            {...register('email')}
            className={cn(
              'placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-primary/20 bg-muted/30 w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-1',
              errors.email?.message ? 'border-destructive' : 'border-border'
            )}
          />
          {errors.email?.message && (
            <p className="text-destructive mt-1 text-xs">
              {errors.email?.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className={cn(
              'mb-1.5 block text-sm font-semibold',
              errors.message?.message && 'text-destructive'
            )}
          >
            What&apos;s up?
          </label>
          <textarea
            id="message"
            placeholder="Tell me about your project, idea, or just say hey..."
            {...register('message')}
            rows={6}
            className={cn(
              'placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-primary/20 bg-muted/30 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-1',
              errors.message?.message ? 'border-destructive' : 'border-border'
            )}
          />
          {errors.message?.message && (
            <p className="text-destructive mt-1 text-xs">
              {errors.message?.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold tracking-wide transition-all duration-200 hover:opacity-90 disabled:opacity-50"
        >
          <Send className="size-4" />
          {isSubmitting ? 'Sending...' : 'Send it'}
        </button>
      </form>
    </motion.section>
  );
};
