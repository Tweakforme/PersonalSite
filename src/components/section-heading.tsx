import { ReactNode } from 'react';

type TProps = {
  heading: string;
  content?: string | ReactNode | undefined;
};

export const SectionHeading = ({ heading, content }: TProps) => {
  return (
    <div className="mb-8 text-center sm:mb-12">
      <h2 className="font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
        {heading}
      </h2>
      {content && (
        <p className="text-muted-foreground mt-3 text-sm tracking-wide">
          {content}
        </p>
      )}
    </div>
  );
};
