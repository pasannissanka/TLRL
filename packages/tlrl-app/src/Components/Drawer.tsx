import { Disclosure } from '@headlessui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import { getCategories, getTags } from '../Query/api';
import { Category } from '../types/types';
import { DrawerTree } from './DrawerTree';

interface DrawerProps {
  isDrawerOpen: boolean;
}

export const Drawer = ({ isDrawerOpen }: DrawerProps) => {
  const tags = useQuery('tagsAll', getTags);
  const categories = useQuery('categoriesAll', getCategories);

  return (
    <React.Fragment>
      <aside
        className={`fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform shadow-lg lg:z-auto lg:static lg:shadow-none
				${isDrawerOpen ? '-translate-x-full lg:translate-x-0 lg:w-0' : ''}`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between flex-shrink-0 p-2 ${
            isDrawerOpen ? 'lg:justify-center' : ''
          }`}
        >
          {/* <span className="p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap">
            TL;RL
          </span> */}
        </div>
        <nav className="flex-1 overflow-hidden hover:overflow-y-auto">
          <ul className="p-2 overflow-hidden">
            <li>
              <RouterLink
                to="/"
                className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${
                  isDrawerOpen ? 'justify-center' : ''
                }`}
              >
                <span>
                  <svg
                    className="w-6 h-6 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </span>
                <span className={`${isDrawerOpen ? 'lg:hidden' : ''}`}>
                  Dashboard
                </span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/timeline"
                className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${
                  isDrawerOpen ? 'justify-center' : ''
                }`}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>{' '}
                </span>
                <span className={`${isDrawerOpen ? 'lg:hidden' : ''}`}>
                  Timeline
                </span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/readlist"
                className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${
                  isDrawerOpen ? 'justify-center' : ''
                }`}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </span>
                <span className={`${isDrawerOpen ? 'lg:hidden' : ''}`}>
                  Read List
                </span>
              </RouterLink>
            </li>
            <li>
              <Disclosure>
                <Disclosure.Button
                  className={`flex items-center p-2 space-x-2 justify-between rounded-md hover:bg-gray-100 w-full ${
                    isDrawerOpen ? 'justify-center' : ''
                  }`}
                >
                  <div className="flex flex-row space-x-2">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </span>
                    <span className={`${isDrawerOpen ? 'lg:hidden' : ''}`}>
                      Categories
                    </span>
                  </div>
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
                <Disclosure.Panel className="text-gray-500 pl-5">
                  <ul>
                    <DrawerTree categories={categories.data!} />
                  </ul>
                </Disclosure.Panel>
              </Disclosure>
            </li>
            <li>
              <Disclosure>
                <Disclosure.Button
                  className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 w-full justify-between ${
                    isDrawerOpen ? 'justify-center' : ''
                  }`}
                >
                  <div className="flex flex-row space-x-2">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                        />
                      </svg>
                    </span>
                    <span className={`${isDrawerOpen ? 'lg:hidden' : ''}`}>
                      Tags
                    </span>
                  </div>
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
                <Disclosure.Panel className="text-gray-500 pl-5">
                  <ul>
                    {tags.data?.map((tag: string, index) => {
                      return (
                        <li key={index}>
                          <RouterLink
                            to={`/tag/${tag}`}
                            className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${
                              isDrawerOpen ? 'justify-center' : ''
                            }`}
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                                />
                              </svg>
                            </span>
                            <span
                              className={`${isDrawerOpen ? 'lg:hidden' : ''}`}
                            >
                              {tag}
                            </span>
                          </RouterLink>
                        </li>
                      );
                    })}
                  </ul>
                </Disclosure.Panel>
              </Disclosure>
            </li>
          </ul>
        </nav>
      </aside>
    </React.Fragment>
  );
};
