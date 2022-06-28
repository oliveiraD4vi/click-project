import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Transparency from '../../assets/landing-transparency.svg';

import './landingPage.scss';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="left-container">
        <h2>Seja Bem Vindo!</h2>
        <p>
          Olá clicker! Esse é um site para votação de filmes que serão exibidos no cineEscola.
          Para votar no seu filme preferido faça login ou cadastre-se.
        </p>

        <div className="btn-container">
          <Button
            type="primary"
            htmlType="submit"
            className="primary-button"
            onClick={() => navigate('/login')}
          >
            LOGIN
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            className="secondary-button"
            onClick={() => navigate('/register')}
          >
            CADASTRAR
          </Button>
        </div>
      </div>
      <div className="right-container">
        <img src={Transparency} alt="landing image" />
      </div>
    </div>
  );
}

export default Landing;
