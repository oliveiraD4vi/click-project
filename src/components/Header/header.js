import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../services/utils';

import Logo from '../../assets/logo-white.png';

import './header.scss';

const Header = () => {
  const [current, setCurrent] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location) {
      switch (location.pathname) {
        case '/home': setCurrent('VOTING'); break;
        case '/about': setCurrent('ABOUT'); break;
        default: setCurrent(null); break;
      }
    }
  }, [location]);

  const logout = () => {
    auth.logout();
    navigate('/login');
  };

  const onClick = (e) => {
    switch (e.key) {
      case 'LOGIN': navigate('/login'); break;
      case 'ABOUT': navigate('/about'); break;
      case 'VOTING': navigate('/home'); break;
      case 'LOGOUT': logout(); break;
      default: break;
    };

    setCurrent(e.key);
  };

  return (
    <div className="header-container">
      <div className="brand" onClick={() => navigate('/')}>
        <img src={Logo} alt="logo-white" />
      </div>

      <div className="navigation">
        <Menu
          mode="inline"
          onClick={onClick}
          inlineCollapsed={false}
          selectedKeys={[current]}
          className="navigation-menu"
        >
          <Menu.Item key="VOTING">FILMES {'&'} VOTAÇÃO</Menu.Item>
          <Menu.Item key="ABOUT">SOBRE NÓS</Menu.Item>
          {auth.isAuthenticated()
              ? <Menu.Item key="LOGOUT">SAIR</Menu.Item>
              : <Menu.Item key="LOGIN">LOGIN</Menu.Item>
            }
        </Menu>
      </div>
    </div>
  );
};

export default Header;
