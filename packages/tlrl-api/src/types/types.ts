import { Types } from 'mongoose';

export interface TokenPayload {
  _id: Types.ObjectId;
  email: string;
}

export interface ReqUser {
  userId: Types.ObjectId;
  userName: string;
  email: string;
  name: string;
}

export interface BookmarkQuery {
  sort?: 'latest';
  tag?: string;
  category?: string;
  limit: number;
  offset?: number;
  searchq?: string;
}
