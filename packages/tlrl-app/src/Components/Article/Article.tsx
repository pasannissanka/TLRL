import React from 'react';
import { BookmarkResponse } from '../../types/types';
import { format } from 'timeago.js';

interface ArticleProps {
  key: number;
  articleData: BookmarkResponse;
}

export const Article = ({ articleData }: ArticleProps) => {
  return (
    <div className="mx-auto px-4 py-8 max-w-xl my-1">
      <div className="bg-white shadow-md rounded-lg mb-2 tracking-wide h-80 hover:shadow-lg">
        <div className="md:flex-shrink-0">
          <img
            src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg"
            alt="mountains"
            className="w-full h-40 rounded-lg rounded-b-none"
          />
        </div>
        <div className="px-4 py-2 mt-1">
          <div className="mb-4">
            <h2 className="font-semibold text-base text-gray-800 tracking-normal line-clamp-3">
              {articleData.title}
            </h2>
          </div>
          <div className="author flex items-center -ml-3 my-2">
            <div className="user-logo">
              <img
                className="w-6 h-6 object-cover rounded-full mx-2 shadow"
                src={articleData.imgUrl}
                alt="favicon"
              />
            </div>
            <h2 className="text-sm tracking-tighter text-gray-900">
              <a href="/">{articleData.publication}</a>{' '}
              <span className="text-xs text-gray-600 ml-1">
                {format(articleData.createdAt)}
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
