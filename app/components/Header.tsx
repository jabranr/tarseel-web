import { Link, NavLink } from '@remix-run/react';
import classNames from 'classnames';
import tarseelLogo from '~/images/logo.svg';

const links = [
  {
    text: 'Send Parcel',
    href: '/send-parcel'
  },
  {
    text: 'Login',
    href: '/login'
  }
];

export default function Header() {
  return (
    <header className="border-b-[1px] mb-8">
      <div className="p-4 py-6 mx-auto flex items-center justify-between lg:container">
        <Link to="/">
          <img src={tarseelLogo} alt="" width={125} height={20} />
        </Link>
        <nav className="[&>*+*]:ml-2">
          {links.map((link) => (
            <NavLink
              key={link.href}
              className={({ isActive, isPending }) =>
                classNames(
                  'text-tarseel-black font-medium px-3 py-2 rounded-md text-sm transition-colors',
                  {
                    'hover:bg-tarseel-gray': !isActive && !isPending,
                    'bg-tarseel-primary text-white': isActive || isPending
                  }
                )
              }
              to={link.href}
            >
              {link.text}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
