import { Menu } from '@headlessui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface AppBarProps {
  isDrawerOpen: boolean;
  handleDrawerOpen: () => void;
}

export const AppBar = ({ handleDrawerOpen, isDrawerOpen }: AppBarProps) => {
  return (
    <React.Fragment>
      <header className="flex-shrink-0 border-b bg-gray-100">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-3">
            <span className="p-2 text-xl font-semibold tracking-wider uppercase lg:hidden">
              SolvedCard
            </span>
            <button
              onClick={handleDrawerOpen}
              className="p-2 rounded-md focus:outline-none focus:ring"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile view Search bar */}
          {/* {dropdownMenuState.mobileSearchPanel ? (
            <div
              className="fixed inset-0 z-10 bg-black bg-opacity-20"
              style={{
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
              }}
            >
              <div className="absolute inset-x-0 flex items-center justify-between p-2 bg-white shadow-md">
                <div className="flex items-center flex-1 px-2 space-x-2">
                  <span>
                    <svg
                      className="w-6 h-6 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-3 text-gray-600 rounded-md focus:bg-gray-100 focus:outline-none"
                  />
                </div>
                <button
                  className="flex-shrink-0 p-4 rounded-md"
                  onClick={handleMobileSearchMenu}
                >
                  <svg
                    className="w-4 h-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <></>
          )} */}

          <div className="items-center hidden px-2 space-x-2 md:flex-1 md:flex md:mr-auto md:ml-5">
            <span>
              <svg
                className="w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-3 rounded-md hover:bg-gray-100 lg:max-w-sm md:py-2 md:flex-1 focus:outline-none md:focus:bg-gray-100 md:focus:shadow md:focus:border"
            />
          </div>

          {/* <!-- Mobile search   --> */}
          <div className="relative flex items-center space-x-3">
            {/* <button
              className="p-2 bg-gray-100 rounded-full md:hidden focus:outline-none focus:ring hover:bg-gray-200"
              onClick={handleMobileSearchMenu}
            >
              <svg
                className="w-6 h-6 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button> */}

            {/* <!-- avatar button --> */}
            <div className="relative">
              <Menu>
                <Menu.Button className="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring">
                  <img
                    className="object-cover w-8 h-8 rounded-full"
                    src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                    alt="User Name"
                  />
                </Menu.Button>
                <div className="absolute right-0 p-1 bg-green-400 rounded-full bottom-3 animate-ping"></div>
                <div className="absolute right-0 p-1 bg-green-400 border border-white rounded-full bottom-3"></div>
                <Menu.Items className="z-20 absolute mt-4 transform -translate-x-full bg-white rounded-md shadow-lg w-56">
                  <Menu.Item
                    as="div"
                    className="flex flex-col p-4 space-y-1 font-medium border-b"
                  >
                    <span className="text-gray-800">
                      {/* {me?.me.user.firstName} {me?.me.user.lastName} */}
                    </span>
                    {/* <span className="text-sm text-gray-300">{me?.me.user.username}</span> */}
                    <span className="text-sm text-gray-400">
                      {/* {me?.me.user.email} */}
                    </span>
                  </Menu.Item>

                  <Menu.Item
                    as={RouterLink}
                    to="/profile"
                    className="block px-4 py-2 transition rounded-md hover:bg-gray-100"
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    as={RouterLink}
                    to="/"
                    className="block px-4 py-2 transition rounded-md hover:bg-gray-100"
                  >
                    Another Link
                  </Menu.Item>
                  <Menu.Item
                    as="button"
                    className="flex items-start w-full px-4 py-2 pb-4 transition rounded-md hover:bg-gray-100 border-t"
                  >
                    Logout
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};
