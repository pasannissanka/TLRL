import axios from 'axios';
import { Category, LoggedUser, Tag } from '../types/types';

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
  return data.data.tags as Tag[];
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
  return data.data as Category[];
};
