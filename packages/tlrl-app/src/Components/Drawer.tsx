import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface DrawerProps {
  isDrawerOpen: boolean;
  handleDrawerOpen: () => void;
}

export const Drawer = ({ isDrawerOpen, handleDrawerOpen }: DrawerProps) => {
  return (
    <React.Fragment>
      <aside
        className={`fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform bg-gray-200 border-r shadow-lg lg:z-auto lg:static lg:shadow-none
				${isDrawerOpen ? '-translate-x-full lg:translate-x-0 lg:w-0' : ''}`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between flex-shrink-0 p-2 ${
            isDrawerOpen ? 'lg:justify-center' : ''
          }`}
        >
          <span className="p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap">
            SolvedCard
          </span>
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
                to="/users"
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </span>
                <span className={`${isDrawerOpen ? 'lg:hidden' : ''}`}>
                  Users
                </span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/posts"
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
                  Posts
                </span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/activities"
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
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <span className={`${isDrawerOpen ? 'lg:hidden' : ''}`}>
                  Activities
                </span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </aside>
    </React.Fragment>
  );
};
