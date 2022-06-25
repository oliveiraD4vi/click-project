import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { userRoutes } from '../../services/constants';

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

const Layout = ({ children }) => {
  const [path, setPath] = useState('');

  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname.split('/')[1]);
  }, [location]);

  return (
    <div className="layout-container" style={{ height: '100vh' }}>
      {userRoutes[path] ? (
        <Header />
      ) : null}

      <div
        className="main"
        style={userRoutes[path]
          ? { height: '80%' }
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
