import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

interface PublicRouteProps extends RouteProps {
  // component: any;
}

export default function PublicRoute(props: PublicRouteProps) {
  const { children, ...rest } = props;
  const { setAuthState } = useAuthContext();

  // TODO call api and validate token
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  let isNotAuthenticated = !Boolean(token) && !Boolean(userId);

  useEffect(() => {
    if (!token && !userId) {
      setAuthState({
        token: undefined,
        userId: undefined,
      });
    } else {
      // Force Logout
      setAuthState({
        token: undefined,
        userId: undefined,
      });
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  }, [setAuthState, userId, token]);

  return (
    <Route
      {...rest}
      render={(props) => (isNotAuthenticated ? children : <Redirect to="/" />)}
    />
  );
}
