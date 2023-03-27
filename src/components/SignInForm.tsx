import React, { useState } from 'react';
import { initialize } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { useAppContext } from '../context';

type signInFormProps = {
  redirectHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  formToDispay: string;
  setLogInError: React.Dispatch<React.SetStateAction<string>>;
};

const SignInForm = ({
  redirectHandler,
  formToDispay,
  setLogInError,
}: signInFormProps) => {
  const { dispatch } = useAppContext();
  const [emailLogIn, setEmailLogIn] = useState('');
  const [passwordLogIn, setPasswordLogIn] = useState('');
  const { db, auth } = initialize();
  const navigate = useNavigate();

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
        <button className='btn--redirect' onClick={signInAnonymouslyHandler}>
          Log in as guest
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
