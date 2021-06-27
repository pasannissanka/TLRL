import React from 'react';
import { useQuery } from 'react-query';
import { Article } from '../../Components/Article/Article';
import { getBookmarksLatest } from '../../Query/api';

interface DashboardProps {}

export const Dashboard = (props: DashboardProps) => {
  const { data } = useQuery('bookmarksLatest', getBookmarksLatest);

  return (
    <>
      <div className="flex flex-wrap -mx-1 overflow-hidden xl:-mx-1">
        {data?.map((bookmark, index) => {
          return (
            <div
              key={index}
              className="my-1 px-1 w-full overflow-hidden md:w-1/2 lg:w-1/3 xl:my-1 xl:px-1 xl:w-1/5"
            >
              <Article key={index} articleData={bookmark} />
            </div>
          );
        })}
      </div>
    </>
  );
};
