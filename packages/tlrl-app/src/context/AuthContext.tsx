import React from 'react';
import { AuthContextState } from '../types/types';

export const AuthContext = React.createContext<AuthContextState>({
  auth: {},
  setAuthState: () => {},
});

export const useAuthContext = () => React.useContext(AuthContext);
