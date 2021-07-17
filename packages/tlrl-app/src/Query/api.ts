import axios from 'axios';
import {
  ArticleReadabilityResponse,
  Bookmark,
  Category,
  LoggedUser,
} from '../types/types';

export const getLoggedUser = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data } = await axios.get('http://localhost:4000/auth/user', config);
  return data.data.user as LoggedUser;
};

export const getTags = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data } = await axios.get('http://localhost:4000/tag/all', config);
  return data.data.tags as string[];
};

export const getCategories = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data } = await axios.get(
    'http://localhost:4000/category/all',
    config
  );
  return data.data.categories as Category[];
};

export const getBookmarksLatest = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data } = await axios.get(
    'http://localhost:4000/bookmark/all',
    config
  );

  return data.data.bookmarks as Bookmark[];
};

export const getReadabilityArticle = async (bookmarkId: string) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data } = await axios.get(
    `http://localhost:4000/article/${bookmarkId}`,
    config
  );
  return data.data as ArticleReadabilityResponse;
};
