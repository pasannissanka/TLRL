export interface TokenPayload {
  user_id: string;
  email: string;
}

export interface ReqUser {
  userId: string;
  userName: string;
  email: string;
  name: string;
}

export interface BookmarkQuery {
  sort?: 'latest';
  tag?: string;
  category?: string;
  limit?: number;
  offset?: number;
}
