import logo from '../utils/images/logo.png';
import { useState } from 'react';
import { initialize } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { useAppContext } from '../context';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const LogInPage = () => {
  const [emailLogIn, setEmailLogIn] = useState('');
  const [passwordLogIn, setPasswordLogIn] = useState('');
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [currentUSerName, setCurrentUSerName] = useState('');
  const [logInError, setLogInError] = useState('');
  const navigate = useNavigate();
  const { db, auth } = initialize();

  const { dispatch } = useAppContext();

  const signIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        emailLogIn,
        passwordLogIn
      );

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

  const signUpUser = async (
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container__form'>
      <form className='log--in--form'>
        <input
          type='email'
          value={emailLogIn}
          onChange={(e) => setEmailLogIn(e.currentTarget.value)}
        />
        <input
          type='password'
          value={passwordLogIn}
          onChange={(e) => setPasswordLogIn(e.currentTarget.value)}
        />
        <button type='submit' onClick={signIn}>
          Log in
        </button>
      </form>
      <form className='signUp__form'>
        <input
          type='email'
          value={emailSignUp}
          onChange={(e) => setEmailSignUp(e.currentTarget.value)}
        />
        <input
          type='password'
          value={passwordSignUp}
          onChange={(e) => setPasswordSignUp(e.currentTarget.value)}
        />
        <input
          type='text'
          value={currentUSerName}
          onChange={(e) => setCurrentUSerName(e.currentTarget.value)}
        />
        <button type='submit' className='signUp' onClick={signUpUser}>
          Sign Up
        </button>
      </form>
      <h2 className='heading--secondary'>{logInError}</h2>
    </div>
  );
};

export default LogInPage;
