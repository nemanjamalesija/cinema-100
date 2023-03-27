import logo from '../utils/images/logo.png';
import { useState } from 'react';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import './login.css';

const LogInPage = () => {
  const [logInError, setLogInError] = useState('');
  const [formToDispay, setFormToDisplay] = useState('login');

  const redirectHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFormToDisplay((prev) => {
      const displayForm = prev === 'login' ? 'signup' : 'login';
      return displayForm;
    });
  };

  return (
    <section className='section__log-in'>
      <div className='container__forms u--justify--center u--align--center'>
        <div className='nav__logo--div   u--align--center'>
          <img src={logo} className='login-logo' alt='logo' />

          <p className='login-logo-p'>cinema 100</p>
        </div>
        <SignInForm
          formToDispay={formToDispay}
          redirectHandler={redirectHandler}
          setLogInError={setLogInError}
        />
        <SignUpForm
          formToDispay={formToDispay}
          redirectHandler={redirectHandler}
        />

        <h2 className='heading--secondary'>{logInError}</h2>
      </div>
    </section>
  );
};

export default LogInPage;
