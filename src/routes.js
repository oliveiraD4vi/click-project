import { lazy, Suspense } from 'react';
import { Route, Routes as RoutesWrapper, BrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';

const Landing = lazy(() => import('./screens/Public/LandingPage/landingPage'));
const Register = lazy(() => import('./screens/Public/Register/register'));
const Login = lazy(() => import('./screens/Public/Login/login'));
const Home = lazy(() => import('./screens/Private/Home/home'));
const Layout = lazy(() => import('./screens/Layout/layout'));

const Routes = () => {
  return(
    <Suspense fallback={<Spin />}>
      <BrowserRouter>
        <RoutesWrapper>
          <Route path="/" element={ <Landing /> } />
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
          <Route
            path="/home"
            exact
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
        </RoutesWrapper>
      </BrowserRouter>
    </Suspense>
  );
}

export default Routes;
