'use server';

import { Resend } from 'resend';

import { env } from '@/env.mjs';
import { TFormSchema } from '@/lib/form-schema';

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

export const sendEmailAction = async ({ email, message }: TFormSchema) => {
  if (!resend) {
    return { error: 'Email service is not configured.' };
  }

  try {
    await resend.emails.send({
      from: 'Adhvait Jadav <contact@adhvaitjadav.com>',
      to: 'adhvait.jadav@gmail.com',
      subject: 'Message from contact form',
      replyTo: email,
      text: `email: ${email} \nmessage: ${message}`,
    });

    return {
      data: 'Email sent successfully!',
    };
  } catch {
    return {
      error: `Something went wrong!`,
    };
  }
};
