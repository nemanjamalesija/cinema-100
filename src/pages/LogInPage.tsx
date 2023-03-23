import logo from '../utils/images/logo.png';
import { useState } from 'react';
import { initialize } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, setDoc, addDoc } from 'firebase/firestore';
import { useAppContext } from '../context';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
} from 'firebase/auth';
import './login.css';
import BookmarkeredMovies from '../components/BookmarkeredMovies';

const LogInPage = () => {
  const [emailLogIn, setEmailLogIn] = useState('');
  const [passwordLogIn, setPasswordLogIn] = useState('');
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [currentUSerName, setCurrentUSerName] = useState('');
  const [currentUserLastName, setCurrentUserLastName] = useState('');
  const [logInError, setLogInError] = useState('');
  const [formToDispay, setFormToDisplay] = useState('login');
  const navigate = useNavigate();
  const { db, auth } = initialize();

  const { dispatch } = useAppContext();

  const signInHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, emailLogIn, passwordLogIn);

      const usersCollection = collection(db, 'users');
      const response = await getDocs(usersCollection);

      const user = response.docs
        .map((u) => ({
          data: u.data(),
          id: u.id,
        }))
        .map((u) => u.data)
        .find((u) => u.email === emailLogIn);

      if (user) {
        dispatch({ type: 'SET_CURRENT_USER', payload: user });
        navigate('/home');
      } else throw new Error("You don't have an account");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Firebase: Error (auth/invalid-email).')
          setLogInError('This email adress is not found');

        if (error.message === 'Firebase: Error (auth/wrong-password).') {
          setLogInError('Incorrect password');
        }
      } else console.error(error);
    }
  };

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

  const signInAnonymouslyHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await signInAnonymously(auth);
      const randomEmail = `anonymousGuest@${crypto.randomUUID()}.com`;
      const currentUserRef = doc(db, `users/${randomEmail}`);

      await setDoc(currentUserRef, {
        name: 'Guest',
        email: randomEmail,
        bookmarkeredMovies: [],
      });

      dispatch({
        type: 'SET_CURRENT_USER',
        payload: { name: 'Guest', email: randomEmail, bookmarkeredMovies: [] },
      });
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='section__log-in'>
      <div className='container__forms u--justify--center u--align--center'>
        <div className='nav__logo--div   u--align--center'>
          <img src={logo} className='login-logo' alt='logo' />

          <p className='login-logo-p'>cinema 100</p>
        </div>
        <form
          className={
            formToDispay === 'login'
              ? 'form-credentials'
              : 'form-credentials hidden'
          }
        >
          <h2 className='heading--secondary--form'>Log In</h2>
          <div className='inputs--div'>
            <div className='form--control'>
              <input
                type='email'
                placeholder='Email'
                value={emailLogIn}
                onChange={(e) => setEmailLogIn(e.currentTarget.value)}
              />
            </div>
            <div className='form--control'>
              <input
                type='password'
                placeholder='Password'
                value={passwordLogIn}
                onChange={(e) => setPasswordLogIn(e.currentTarget.value)}
              />
            </div>
          </div>
          <button
            type='submit'
            className='btn--form-submit'
            onClick={signInHandler}
          >
            Log in
          </button>
          <div className='login--redirect u--justify--center'>
            <p className='login--redirect-p'> Don't have an account ?</p>
            <button className='btn--redirect' onClick={redirectHandler}>
              Sign up
            </button>
          </div>
          <div className='login--redirect login--redirect-guest u--justify--center'>
            <p className='login--redirect-p'> Or,</p>
            <button
              className='btn--redirect'
              onClick={signInAnonymouslyHandler}
            >
              Log in as guest
            </button>
          </div>
        </form>

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
