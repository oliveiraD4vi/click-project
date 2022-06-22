import { useEffect } from 'react';
import { auth } from '../../services/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { userRoutes } from '../../services/constants';

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.split('/')[1];

    if (auth.isAuthenticated() && !userRoutes[path]) navigate('/home');
    if (!auth.isAuthenticated() && userRoutes[path]) navigate('/');
  }, [location, navigate]);

  return (
    <div className="layout-container" style={{ height: '100vh' }}>
      <Header />
      <div className="main">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
