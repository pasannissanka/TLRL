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

export interface Category {
  categoryId: string;
  name: string;
  parentCategoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  children: Category[];
}
