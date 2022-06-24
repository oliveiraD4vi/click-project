import { useEffect, useState } from 'react';
import { auth } from '../../services/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { userRoutes } from '../../services/constants';

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

const Layout = ({ children }) => {
  const [path, setPath] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setPath(location.pathname.split('/')[1]);

    if (auth.isAuthenticated() && !userRoutes[path]) navigate('/home');
    if (!auth.isAuthenticated() && userRoutes[path]) navigate('/');
  }, [location, navigate, path]);

  return (
    <div className="layout-container" style={{ height: '100vh' }}>
      {userRoutes[path] ? (
        <Header />
      ) : null}

      <div
        className="main"
        style={userRoutes[path]
          ? { height: '85%' }
          : { height: '100%' }
        }
      >
        {children}
      </div>

      {userRoutes[path] ? (
        <Footer />
      ) : null}
    </div>
  );
};

export default Layout;
