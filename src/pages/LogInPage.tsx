import logo from '../utils/images/logo.png';
import { useEffect, useState } from 'react';

import { initialize } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import {
  addDoc,
  collection,
  Firestore,
  setDoc,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { useAppContext } from '../context';

const LogInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { firebaseApp, db, auth } = initialize();
  const {
    state: { bookmarkeredMovies },
  } = useAppContext();
  const {
    dispatch,
    state: { currentUser },
  } = useAppContext();

  const signIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const user = doc(db, `users/${email}`);
    const docData = {
      email,
      bookmarkeredMovies,
    };

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

      console.log(currentUser);
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
    </div>
  );
};

export default LogInPage;
