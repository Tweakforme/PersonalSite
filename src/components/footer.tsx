export const Footer = () => {
  return (
    <footer className="text-muted-foreground my-6 text-center text-xs tracking-wide">
      <p>
        &copy; {new Date().getFullYear()}{' '}
        <a
          href="https://github.com/Tweakforme"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary font-medium transition-colors"
        >
          Adhvait Jadav
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
};
