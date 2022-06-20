import { Suspense } from 'react';
import { Route, Routes as RoutesWrapper, BrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';

import Layout from './screens/Layout/layout';
import Landing from './screens/LandingPage/landingPage';
import Register from './screens/Register/register';
import Login from './screens/Login/login';

const Routes = () => {
  return(
    <Suspense fallback={<Spin />}>
      <BrowserRouter>
        <RoutesWrapper>
          <Route
            path="/"
            element={
              <Layout>
                <Landing />
              </Layout>
            }
          />
          <Route
            path="/register"
            exact
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/login"
            exact
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
        </RoutesWrapper>
      </BrowserRouter>
    </Suspense>
  );
}

export default Routes;
