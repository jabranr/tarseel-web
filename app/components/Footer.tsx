import tarseelLogo from '~/images/logo.svg';
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram
} from '@tabler/icons-react';
import { useMemo } from 'react';
import { Link } from '@remix-run/react';

const linksCollection = [
  {
    title: 'Links',
    data: [
      {
        title: 'About',
        href: '/about-us'
      },
      {
        title: 'Contact',
        href: '/contact-us'
      }
    ]
  },
  {
    title: 'Services',
    data: [
      {
        title: 'Send a parcel',
        href: '/send-parcel'
      },
      {
        title: 'Take a parcel',
        href: '/sign-up'
      }
    ]
  }
];

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-tarseel-gray-light text-tarseel-gray-dark text-sm border-t-[1px] py-8 my-8">
      <div className="lg:container mx-auto p-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="mb-8 md:mb-0">
            <img src={tarseelLogo} alt="" width={125} height={20} />
            <p className="text-xs mt-2">Send stuff around</p>
          </div>
          <div className="flex item-start [&>*]:min-w-[160px]">
            {linksCollection.map((collection) => (
              <div key={collection.title} className="mb-4">
                <h4 className="font-semibold text-tarseel-black mb-4 text-base">
                  {collection.title}
                </h4>
                <nav>
                  <ul>
                    {collection.data.map((item) => (
                      <li key={item.href} className="my-1">
                        <Link to={item.href} className="hover:underline">
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t-[1px] border-tarseel-gray py-8 my-8 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center md:justify-between">
          <div>&copy; {year} Tarseel - All rights reserved.</div>
          <ul className="flex items-center space-x-2">
            <li>
              <IconBrandFacebook
                className="w-[18px] h-[18px] text-gray-500"
                stroke={1.5}
              />
            </li>
            <li>
              <IconBrandTwitter
                className="w-[18px] h-[18px] text-gray-500"
                stroke={1.5}
              />
            </li>
            <li>
              <IconBrandInstagram
                className="w-[18px] h-[18px] text-gray-500"
                stroke={1.5}
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
