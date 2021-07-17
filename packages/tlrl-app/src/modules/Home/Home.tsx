import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Route, Switch, useLocation } from 'react-router-dom';
import { AppBar } from '../../Components/AppBar';
import { Drawer } from '../../Components/Drawer';
import { useAuthContext } from '../../context/AuthContext';
import { getLoggedUser } from '../../Query/api';
import { Dashboard } from './Dashboard';
import { ArticleView } from '../ArticleView/ArticleView';

interface HomeProps {}

export const Home = (props: HomeProps) => {
  const [isDrawerOpen, setDrawerOpenState] = useState(false);

  const { setLoggedUser } = useAuthContext();

  const location = useLocation();

  const { data } = useQuery('loggedUser', getLoggedUser);

  const handelDrawer = () => {
    setDrawerOpenState(!isDrawerOpen);
  };

  useEffect(() => {
    if (data) {
      setLoggedUser(data);
    }
  }, [data, setLoggedUser]);

  useEffect(() => {
    if (location.pathname.match('article')) {
      setDrawerOpenState(true);
    } else {
      setDrawerOpenState(false);
    }
  }, [setDrawerOpenState, location]);

  return (
    <React.Fragment>
      <div className="overflow-y-hidden h-screen bg-gray-50">
        <AppBar isDrawerOpen={isDrawerOpen} handleDrawerOpen={handelDrawer} />
        <div className="flex flex-1 h-full overflow-hidden">
          <Drawer isDrawerOpen={isDrawerOpen} />
          <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/timeline">
                <div>Timeline</div>
              </Route>
              <Route exact path="/readlist">
                <div>Read List</div>
              </Route>
              <Route exact path="/article/:bookmarkId">
                <ArticleView />
              </Route>
              <Route path="*">
                <div>Not Found</div>
              </Route>
            </Switch>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};
