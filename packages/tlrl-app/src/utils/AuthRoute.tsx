import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

interface AuthRouteProps extends RouteProps {
  // component: any;
}

export default function AuthRoute(props: AuthRouteProps) {
  const { children, ...rest } = props;
  const { setAuthState } = useAuthContext();

  // TODO call api and validate token
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  let isAuthenticated = Boolean(token) && Boolean(userId);

  useEffect(() => {
    if (token && userId) {
      setAuthState({
        token: token,
        userId: userId,
      });
    } else {
      setAuthState({
        token: undefined,
        userId: undefined,
      });
    }
  }, [setAuthState, userId, token]);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? children : <Redirect to="/login" />
      }
    />
  );
}
