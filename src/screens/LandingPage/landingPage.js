import { Link } from 'react-router-dom';

import './landingPage.scss';

const Landing = () => {
  return (
    <div className="landing-container">
      <h1>Landing</h1>
      <Link to="/">retornar a página inicial</Link>
    </div>
  );
}

export default Landing;
