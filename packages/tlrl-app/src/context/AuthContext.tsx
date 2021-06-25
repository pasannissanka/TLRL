import React from 'react';
import { AuthContextState } from '../types/types';

export const AuthContext = React.createContext<AuthContextState>({
  auth: {},
  setAuthState: () => {},
  loggedUser: {},
  setLoggedUser: () => {},
});

export const useAuthContext = () => React.useContext(AuthContext);
