import { ArrowRightOutlined } from '@ant-design/icons';

import './footer.scss';

const Footer = () => {
  return (
    <div className="footer-container">
      <span>Projeto Click | 2022</span>
      <div className="repository-link">
        <a href="https://github.com/oliveiraD4vi/click-project/" target="_blank" rel="noreferrer">
          Visite o repositório do nosso projeto
          <ArrowRightOutlined />
        </a>
      </div>
    </div>
  );
}

export default Footer;
