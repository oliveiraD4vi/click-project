import { GithubOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import Cine from '../../assets/cine.svg';

import './about.scss';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-top">
        <h1>
          O seu <span>Click</span><br />
          faz a diferença!
        </h1>
      </div>

      <div className="about-mid">
        <img src={Cine} alt="cine image" />

        <div className="right-container">
          <h2>Sobre o Click</h2>
          <p>
            O projeto click é uma trabalho aprimorado e desenvolvido durante a disciplina de Engenharia de Software
            ministrada pela professora Diana Nogueira na Universidade Federal do Ceará (UFC) campus Quixadá.
            O propósito do projeto é auxiliar na votação de filmes que serão exibidos no cinema de uma escola
            profissionalizante durante o horário de almoço, a fim de evitar confusões e injustiças na escolha do
            filme e poder proporcionar fácil acesso e envolver a participação de todos os alunos na votação.
          </p>
        </div>
      </div>

      <div className="about-bottom">
        <Tooltip title="Repositório frontend">
          <a className="front" href="https://github.com/oliveiraD4vi/click-project" target="_blank" rel="noreferrer">
            <GithubOutlined />
          </a>
        </Tooltip>

        <Tooltip title="Repositório backend">
          <a className="back" href="https://github.com/oliveiraD4vi/click-project-back" target="_blank" rel="noreferrer">
            <GithubOutlined />
          </a>
        </Tooltip>
      </div>
    </div>
  );
}

export default About;
