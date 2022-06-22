import { useNavigate } from 'react-router-dom';
import { auth } from '../../../services/utils';
import { Button } from 'antd';

import './home.scss';

const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <Button
        type="primary"
        className="link-button"
        onClick={() => logout()}
      >
        Sair
      </Button>
    </div>
  );
}

export default Home;
