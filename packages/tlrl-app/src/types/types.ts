export interface AuthContextState {
  auth: AuthState;
  setAuthState: React.Dispatch<AuthState>;
  loggedUser: LoggedUser;
  setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUser>>;
}

export interface AuthState {
  userId?: string;
  token?: string;
}

export interface LoggedUser {
  userId?: string;
  userName?: string;
  email?: string;
  name?: string;
}

export interface Tag {
  tagId: string;
  tag: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MongoDocument {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface Category extends MongoDocument {
  name: string;
  parent: string;
  children: Category[];
  bookmarks: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  level: number;
}

export interface Publication {
  faviconUrl: string;
  hostname: string;
}
export interface Bookmark extends MongoDocument {
  userId: string;
  title: string;
  url: string;
  publication: Publication;
  pubDate: Date;
  readingTime: number;
  imgUrl: string;
  tags: string[];
  isRead: boolean;
  category: Category;
}

export interface ArticleReadabilityResponse {
  bookmark: Bookmark;
  title: string;
  byline: string;
  dir: string;
  excerpt: string;
  content: string;
  textContent: string;
  siteName: string;
  length: string;
}
