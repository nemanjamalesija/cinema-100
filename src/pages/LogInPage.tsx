import logo from '../utils/images/logo.png';
import { useState } from 'react';
import { initialize } from '../config/firebase';

import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { useAppContext } from '../context';
import {
  createUserWithEmailAndPassword,
  signInAnonymously,
} from 'firebase/auth';
import './login.css';
import SignInForm from '../components/SignInForm';

const LogInPage = () => {
  const [logInError, setLogInError] = useState('');
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [currentUSerName, setCurrentUSerName] = useState('');
  const [currentUserLastName, setCurrentUserLastName] = useState('');
  const [formToDispay, setFormToDisplay] = useState('login');

  const { db, auth } = initialize();
  const { dispatch } = useAppContext();

  const signUpHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, emailSignUp, passwordSignUp);

      const currentUserRef = doc(db, `users/${emailSignUp}`);
      await setDoc(currentUserRef, {
        email: emailSignUp,
        name: currentUSerName,
        bookmarkeredMovies: [],
      });
      setCurrentUSerName('');
      setCurrentUserLastName('');
      setEmailSignUp('');
      setPasswordSignUp('');
      alert('Account succesfully created!');
    } catch (error) {
      console.error(error);
    }
  };

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
          logInError={logInError}
          setLogInError={setLogInError}
        />
        <form
          className={
            formToDispay === 'signup'
              ? 'form-credentials'
              : 'form-credentials hidden'
          }
        >
          <h2 className='heading--secondary--form'>Sign Up</h2>
          <div className='inputs--div'>
            <div className='form--control'>
              <input
                type='text'
                placeholder='Name'
                value={currentUSerName}
                onChange={(e) => setCurrentUSerName(e.currentTarget.value)}
              />
            </div>
            <div className='form--control'>
              <input
                type='text'
                placeholder='Last Name'
                value={currentUserLastName}
                onChange={(e) => setCurrentUserLastName(e.currentTarget.value)}
              />
            </div>
            <div className='form--control'>
              <input
                type='email'
                placeholder='Email'
                value={emailSignUp}
                onChange={(e) => setEmailSignUp(e.currentTarget.value)}
              />
            </div>
            <div className='form--control'>
              <input
                type='password'
                placeholder='Password'
                value={passwordSignUp}
                onChange={(e) => setPasswordSignUp(e.currentTarget.value)}
              />
            </div>
          </div>
          <button
            type='submit'
            className='btn--form-submit'
            onClick={signUpHandler}
          >
            Sign Up
          </button>
          <div className='login--redirect u--justify--center'>
            <p className='login--redirect-p'>Already have an account?</p>
            <button className='btn--redirect' onClick={redirectHandler}>
              Log in
            </button>
          </div>
        </form>
        <h2 className='heading--secondary'>{logInError}</h2>
      </div>
    </section>
  );
};

export default LogInPage;
