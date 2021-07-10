import React from 'react';
import { Bookmark } from '../../types/types';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

interface CardProps {
  key: string;
  cardData: Bookmark;
}

export const Card = ({ cardData }: CardProps) => {
  return (
    <div className="mx-auto px-4 py-8 max-w-xl my-1">
      <div className="bg-white shadow-md rounded-lg mb-2 tracking-wide h-80 hover:shadow-lg">
        <Link to={`/article/${cardData._id}`}>
          <div className="md:flex-shrink-0">
            <img
              src={cardData.imgUrl}
              alt="thumbnail"
              className="w-full h-40 rounded-lg rounded-b-none"
            />
          </div>
          <div className="px-4 py-2 mt-1">
            <div className="mb-4">
              <h2 className="font-semibold text-base text-gray-800 tracking-normal line-clamp-3">
                {/* <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={cardData.url}
                > */}
                {cardData.title}
                {/* </a> */}
              </h2>
            </div>
            <div className="author flex items-center -ml-3 my-2">
              <div className="user-logo">
                <img
                  className="w-6 h-6 object-cover rounded-full mx-2 shadow"
                  src={cardData.publication.faviconUrl}
                  alt="favicon"
                />
              </div>
              <h2 className="text-sm tracking-tighter text-gray-900">
                {/* <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://${cardData.publication.hostname}`}
                > */}
                {cardData.publication.hostname}
                {/* </a> */}
                <span className="text-xs text-gray-600 ml-1">
                  {format(cardData.createdAt)}
                </span>
              </h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
