import React from 'react';
import { DrawerTreeItem } from '../types/types';
import { DrawerDisclosure } from './DrawerDisclosure';

interface DrawerTreeProps<T> {
  items: DrawerTreeItem<T>[];
  urlPrefix?: string;
}

export const DrawerTree = <T,>({
  items,
  urlPrefix = '',
}: DrawerTreeProps<T>) => {
  return (
    <ul>
      {items?.map((item: DrawerTreeItem<T>) => {
        return (
          <li key={item._id}>
            {item.children.length > 0 ? (
              <DrawerDisclosure
                title={item.name}
                to={`${urlPrefix}/${item._id}`}
                icon={
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
                }
              >
                <DrawerTree<T> items={item.children} urlPrefix={urlPrefix} />
              </DrawerDisclosure>
            ) : (
              <DrawerDisclosure
                title={item.name}
                to={`${urlPrefix}/${item._id}`}
                icon={
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
                }
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
