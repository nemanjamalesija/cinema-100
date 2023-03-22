import logo from '../utils/images/logo.png';
import { useState } from 'react';
import { initialize } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { useAppContext } from '../context';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const LogInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [currentUSerName, setCurrentUSerName] = useState('');
  const { state } = useAppContext();
  const navigate = useNavigate();
  const { db, auth } = initialize();

  const { dispatch } = useAppContext();

  const signIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      const usersCollection = collection(db, 'users');
      const response = await getDocs(usersCollection);
      const user = response.docs
        .map((u) => ({
          data: u.data(),
          id: u.id,
        }))
        .map((u) => u.data)
        .find((u) => u.email === email);

      if (user) {
        console.log(user);
        dispatch({ type: 'SET_CURRENT_USER', payload: user });
        navigate('/home');
      } else throw new Error("You don't have an account");
    } catch (error) {
      console.error(error);
    }
  };

  const signUpUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        emailSignUp,
        passwordSignUp
      );

      const currentUserRef = doc(db, `users/${emailSignUp}`);
      await setDoc(currentUserRef, {
        email: emailSignUp,
        name: currentUSerName,
        bookmarkeredMovies: [],
      });

      console.log(newUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container__form'>
      <form className='log--in--form'>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
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
          onChange={(e) => setPasswordSignUp(e.currentTarget.value)}
        />
        <button type='submit' className='signUp' onClick={signUpUser}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default LogInPage;
