import { useNavigate } from 'react-router-dom';
import LoginComponent from '../../../components/Login/login';

import Logo from '../../../assets/logo-white.svg';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="background-image">
        <img onClick={() => navigate('/')} src={Logo} alt="logo-white" />
        <p>O seu <span>CLICK</span> faz a diferença</p>
      </div>
      <LoginComponent />
    </div>
  );
};

export default Login;
