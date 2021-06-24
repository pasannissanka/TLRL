import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppBar } from '../../Components/AppBar';
import { Drawer } from '../../Components/Drawer';

interface HomeProps {}

export const Home = (props: HomeProps) => {
  const [isDrawerOpen, setDrawerOpenState] = useState(true);

  const handelDrawer = () => {
    setDrawerOpenState(!isDrawerOpen);
  };

  return (
    <React.Fragment>
      <div className="flex h-screen overflow-y-hidden bg-gray-50">
        <Drawer isDrawerOpen={isDrawerOpen} handleDrawerOpen={handelDrawer} />
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <AppBar isDrawerOpen={isDrawerOpen} handleDrawerOpen={handelDrawer} />
          <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
            <Switch>
              <Route exact path="/">
                <div>Home</div>
              </Route>
              <Route exact path="/users">
                <div>Users</div>
              </Route>
              <Route exact path="/posts">
                <div>Posts</div>
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
