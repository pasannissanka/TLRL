import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getReadabilityArticle } from '../../Query/api';
import './Article.css';

interface ArticleViewProps {}

interface RouteParams {
  bookmarkId: string;
}

export const ArticleView = (props: ArticleViewProps) => {
  const { bookmarkId } = useParams<RouteParams>();

  const { isLoading, data } = useQuery(['readabilityArticle', bookmarkId], () =>
    getReadabilityArticle(bookmarkId)
  );

  console.log(bookmarkId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <div className="container mx-auto w-1/2 text-center">
        <h2 className="text-2xl font-bold my-4">{data?.title}</h2>
        <div
          className="flex justify-center align-middle"
          dangerouslySetInnerHTML={{ __html: data?.content! }}
        ></div>
      </div> */}
    </>
  );
};
