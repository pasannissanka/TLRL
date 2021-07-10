import { Disclosure } from '@headlessui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types/types';

interface DrawerTreeProps {
  categories: Category[];
}

export const DrawerTree = ({ categories }: DrawerTreeProps) => {
  console.log(categories);
  return (
    <>
      {categories?.map((category: Category) => {
        return (
          <ul>
            <li key={category._id}>
              {category.children.length > 0 ? (
                <Disclosure>
                  <Disclosure.Button
                    className={`flex items-center p-2 rounded-md hover:bg-gray-100 w-full justify-between`}
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
                      <span>{category.name}</span>
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
                    <DrawerTree categories={category.children} />
                  </Disclosure.Panel>
                </Disclosure>
              ) : (
                <Link
                  to={`/category/${category._id}`}
                  className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100`}
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
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </span>
                  <span>{category.name}</span>
                </Link>
              )}
            </li>
          </ul>
        );
      })}
    </>
  );
};
