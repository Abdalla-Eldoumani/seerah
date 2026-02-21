import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gold text-ink hover:bg-gold-light active:bg-gold-dark font-semibold shadow-sm',
  secondary:
    'bg-transparent text-gold border border-gold hover:bg-gold/10 active:bg-gold/20 font-medium',
  ghost:
    'bg-transparent text-ink-light hover:text-gold active:text-gold-dark font-medium',
};

export function Button({
  children,
  variant = 'primary',
  className,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded px-5 py-2.5 text-sm tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-parchment disabled:pointer-events-none disabled:opacity-50 font-display',
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(rest as Omit<
          React.AnchorHTMLAttributes<HTMLAnchorElement>,
          keyof ButtonBaseProps
        >)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        keyof ButtonBaseProps
      >)}
    >
      {children}
    </button>
  );
}
