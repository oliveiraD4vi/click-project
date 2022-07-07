import { lazy, Suspense } from 'react';
import {
  Route,
  Routes as RoutesWrapper,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';
import { Spin } from 'antd';

const Layout = lazy(() => import('./screens/Layout/layout'));
const Landing = lazy(() => import('./screens/LandingPage/landingPage'));
const Register = lazy(() => import('./screens/Register/register'));
const Login = lazy(() => import('./screens/Login/login'));
const Home = lazy(() => import('./screens/Home/home'));
const About = lazy(() => import('./screens/About/about'));

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
            path="/about"
            element={
              <Layout>
                <About />
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
          <Route
            path="/home"
            exact
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </RoutesWrapper>
      </BrowserRouter>
    </Suspense>
  );
}

export default Routes;
