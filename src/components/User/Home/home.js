import { useNavigate } from 'react-router-dom';
import { auth } from '../../../services/utils';

import './home.scss';

const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <a onClick={() => logout()}>Sair</a>
    </div>
  );
}

export default Home;
