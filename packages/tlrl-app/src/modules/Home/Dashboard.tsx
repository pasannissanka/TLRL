import React from 'react';
import { useQuery } from 'react-query';
import { Card } from '../../Components/Card/Card';
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
              key={bookmark._id}
              className="my-1 px-1 w-full overflow-hidden md:w-1/2 lg:w-1/3 xl:my-1 xl:px-1 xl:w-1/5"
            >
              <Card key={bookmark._id} cardData={bookmark} />
            </div>
          );
        })}
      </div>
    </>
  );
};
