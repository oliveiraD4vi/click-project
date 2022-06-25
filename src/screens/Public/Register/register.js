import RegisterComponent from '../../../components/Register/register';

import Logo from '../../../assets/logo-white.svg';

const Register = () => {
  return (
    <div className="register-page">
      <div className="background-image">
        <img src={Logo} alt="logo-white" />
        <p>O seu <span>CLICK</span> faz a diferença</p>
      </div>
      <RegisterComponent />
    </div>
  );
};

export default Register;
