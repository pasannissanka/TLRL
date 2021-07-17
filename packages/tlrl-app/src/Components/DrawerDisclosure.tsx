import React from 'react';
import { Disclosure } from '@headlessui/react';
import { Link } from 'react-router-dom';

interface DrawerDisclosureProps {
  children?: React.ReactNode;
  title: string;
  to: string;
  icon: React.SVGProps<React.ReactSVGElement>;
}

export const DrawerDisclosure = ({
  children,
  title,
  to,
  icon,
}: DrawerDisclosureProps) => {
  return (
    <>
      <Disclosure>
        <div className="flex items-center p-2 space-x-2 justify-between rounded-md hover:bg-gray-100 w-full">
          <Link className="flex flex-row space-x-2 w-full" to={to}>
            <span>{icon}</span>
            <span>{title}</span>
          </Link>
          {children ? (
            <Disclosure.Button className="p-1 px-2 rounded-md hover:bg-gray-200 hover:shadow-sm">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-gray-400 flex-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </Disclosure.Button>
          ) : (
            <></>
          )}
        </div>
        {children ? (
          <Disclosure.Panel className="text-gray-500 pl-5">
            {children}
          </Disclosure.Panel>
        ) : (
          <></>
        )}
      </Disclosure>
    </>
  );
};
