import { ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from './ui/utils';
import {
  btnPrimary,
  btnPrimaryFull,
  btnSecondary,
  btnOutline,
  btnGhost,
  btnDanger,
  btnSuccess,
  btnWarning,
  btnDark,
  btnLink,
  btnPill,
  btnChip,
} from '../styles/tokens';

type ButtonVariant =
  | 'primary'
  | 'primary-full'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'warning'
  | 'dark'
  | 'link'
  | 'pill'
  | 'chip';

type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary: btnPrimary,
  'primary-full': btnPrimaryFull,
  secondary: btnSecondary,
  outline: btnOutline,
  ghost: btnGhost,
  danger: btnDanger,
  success: btnSuccess,
  warning: btnWarning,
  dark: btnDark,
  link: btnLink,
  pill: btnPill,
  chip: btnChip,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-2 text-sm',
  lg: 'px-6 py-3 text-sm',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  asChild = false,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const isLink = variant === 'link';

  return (
    <Comp
      className={cn(
        variantClasses[variant],
        !isLink && variant !== 'pill' && variant !== 'chip' && sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    />
  );
}
