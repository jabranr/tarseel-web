import React, { forwardRef, ForwardedRef, ComponentProps } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  theme?: 'primary' | 'secondary' | 'tertiary' | 'outlined';
  size?: 'giant' | 'large' | 'medium' | 'small' | 'tiny';
  fill?: boolean;
  linkComponent?: React.ElementType;
  href?: string;
  to?: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
} & ComponentProps<'button'>;

const themeClasses: Record<NonNullable<ButtonProps['theme']>, string> = {
  primary:
    'bg-tarseel-primary text-white hover:bg-tarseel-primary/75 active:bg-tarseel-primary/75',
  secondary:
    'bg-tarseel-gray text-tarseel-gray-dark hover:bg-white active:bg-[#ECECEC]',
  tertiary:
    'bg-tarseel-primary/50 text-white hover:bg-tarseel-primary/35 active:bg-tarseel-primary/35',
  outlined:
    'bg-white border-tarseel-gray text-tarseel-gray-dark hover:bg-tarseel-gray-light hover:border-tarseel-primary/50'
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  giant: 'px-8 py-4 text-lg',
  large: 'px-6 py-3',
  medium: 'px-4 py-2',
  small: 'px-3 py-1.5 text-sm',
  tiny: 'px-3 py-0.5 text-sm'
};

const Button = forwardRef(
  (
    {
      children,
      theme = 'primary',
      size = 'medium',
      fill = false,
      className,
      linkComponent,
      ...attrs
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement | null>
  ) => {
    const combinedClasses = twMerge(
      classNames(
        'flex items-center justify-center cursor-pointer whitespace-nowrap border-[2px] border-transparent text-center rounded-md font-medium tracking-[0.35px] leading-5',
        sizeClasses[size],
        themeClasses[theme],
        {
          'pointer-events-none opacity-30': Boolean(attrs.disabled),
          'w-full md:w-auto': !fill,
          'w-full': fill
        },
        className
      )
    );

    if (linkComponent !== undefined) {
      const Component = linkComponent;

      if (linkComponent === 'a' && attrs.href === undefined) {
        attrs.href = attrs.to;
      }

      return (
        <Component
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          className={combinedClasses}
          {...attrs}
        >
          {children}
        </Component>
      );
    }

    attrs.type = attrs.type || 'button';
    return (
      <button
        ref={ref as ForwardedRef<HTMLButtonElement>}
        className={combinedClasses}
        {...attrs}
      >
        {children}
      </button>
    );
  }
);

export default Button;
