import { ComponentProps } from 'react';
import classNames from 'classnames';
import { Link } from '@remix-run/react';

export default function Button({
  children,
  type = 'button',
  theme = 'primary',
  size = 'default',
  outlined = false,
  inline = false,
  fill = false,
  disabled = false,
  href,
  to,
  className,
  ...attrs
}: Props) {
  const classes = classNames(
    'inline-block rounded cursor-pointer text-base no-underline min-w-[120px] will-change-transform border-0 border-none pointer-events-all',
    {
      'px-[9px] py-[5px]': outlined,
      'text-[0.9em] tracking-[0.75px] min-w-[100px] px-2.5 py-1.5':
        size === 'small',
      'px-3.5 py-2.5': size === 'default',
      'px-[13px] py-[9px]': size === 'default' && outlined,
      'text-[1.5em] px-[18px] py-3': size === 'large',
      'px-[17px] py-[11px]': size === 'large' && outlined,
      'pointer-events-none opacity-50': disabled,
      'block w-full': fill,
      'bg-[color:var(--special-blue)] text-[color:var(--light)]':
        theme === 'primary',
      'bg-[color:var(--light)] border-[color:var(--special-blue)] text-[color:var(--special-blue)] border-2 border-solid':
        theme === 'primary' && outlined,
      'bg-[color:var(--blue)] text-[color:var(--light)]': theme === 'secondary',
      'bg-[color:var(--light)] border-[color:var(--blue)] text-[color:var(--blue)] border-2 border-solid':
        theme === 'secondary' && outlined,
      'bg-[color:var(--dark-gray)] text-[color:var(--light)]':
        theme === 'tertiary',
      'bg-[color:var(--light)] border-[color:var(--dark-gray)] text-[color:var(--dark-gray)] border-2 border-solid':
        theme === 'tertiary' && outlined
    },
    className
  );

  if (type === 'link' && href && attrs.target === '_blank') {
    attrs.rel = 'noopener noreferrer';
  }

  if (attrs.disabled) {
    attrs['aria-disabled'] = true;
  }

  return type === 'link' ? (
    to ? (
      <Link className={classes} to={to} {...attrs}>
        {children}
      </Link>
    ) : (
      <a className={classes} href={href} {...attrs}>
        {children}
      </a>
    )
  ) : (
    <button type={type} className={classes} {...attrs}>
      {children}
    </button>
  );
}

type Props = (ComponentProps<'button'> | ComponentProps<'a'>) & {
  theme: 'primary' | 'secondary' | 'tertiary';
  size: 'small' | 'large' | 'default';
  type: 'button' | 'submit' | 'a' | 'link';
  outlined: boolean;
  inline: boolean;
  fill: boolean;
  disabled: boolean;
  href: string;
  to: string;
};
