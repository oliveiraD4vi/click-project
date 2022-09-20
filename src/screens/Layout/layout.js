import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userRoutes } from '../../services/constants';
import { auth } from '../../services/utils';

import Header from '../../components/Header/header';

const Layout = ({ children }) => {
  const [path, setPath] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname.split('/')[1]);

    if (auth.isAuthenticated() && !userRoutes[location.pathname.split('/')[1]])
      navigate('/home');
  }, [location, navigate]);

  return (
    <div className="layout-container" style={{ height: '100vh' }}>
      <Header />
      <div
        className="main"
        style={{ height: '90%' }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
