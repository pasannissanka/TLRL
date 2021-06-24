export interface AuthContextState {
  auth: AuthState;
  setAuthState: React.Dispatch<AuthState>;
}

export interface AuthState {
  userId?: string;
  token?: string;
}
