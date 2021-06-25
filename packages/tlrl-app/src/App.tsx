import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import './index.css';
import { Login } from './modules/Auth/Login';
import { Register } from './modules/Auth/Register';
import { Home } from './modules/Home/Home';
import { AuthState, LoggedUser } from './types/types';
import AuthRoute from './utils/AuthRoute';
import PublicRoute from './utils/PublicRoute';

const queryClient = new QueryClient();

function App() {
  const [auth, setAuthState] = useState<AuthState>({});
  const [loggedUser, setLoggedUser] = useState<LoggedUser>({});

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuthState,
        loggedUser,
        setLoggedUser,
      }}
    >
      <Router>
        <Switch>
          <PublicRoute exact path="/login">
            <Login />
          </PublicRoute>
          <PublicRoute exact path="/register">
            <Register />
          </PublicRoute>
          <AuthRoute path="/">
            <QueryClientProvider client={queryClient}>
              <Home />
            </QueryClientProvider>
          </AuthRoute>
          <Route path="*">
            <div>NOT FOUND</div>
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
