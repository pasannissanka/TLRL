import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Route, Switch } from 'react-router-dom';
import { AppBar } from '../../Components/AppBar';
import { Drawer } from '../../Components/Drawer';
import { useAuthContext } from '../../context/AuthContext';
import { getLoggedUser } from '../../Query/api';
import { Dashboard } from './Dashboard';

interface HomeProps {}

export const Home = (props: HomeProps) => {
  const [isDrawerOpen, setDrawerOpenState] = useState(false);

  const { setLoggedUser } = useAuthContext();

  const { data } = useQuery('loggedUser', getLoggedUser);

  const handelDrawer = () => {
    setDrawerOpenState(!isDrawerOpen);
  };

  useEffect(() => {
    if (data) {
      setLoggedUser(data);
    }
  }, [data, setLoggedUser]);

  return (
    <React.Fragment>
      <div className="flex h-screen overflow-y-hidden bg-gray-50">
        <Drawer isDrawerOpen={isDrawerOpen} />
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <AppBar isDrawerOpen={isDrawerOpen} handleDrawerOpen={handelDrawer} />
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
