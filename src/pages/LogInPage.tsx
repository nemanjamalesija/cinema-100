import logo from '../utils/images/logo.png';
import { json, Link } from 'react-router-dom';
import { useState } from 'react';

import { initialize } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  addDoc,
  collection,
  Firestore,
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { useAppContext } from '../context';

const LogInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUSer] = useState<any>({});
  const navigate = useNavigate();
  const { firebaseApp, db, auth } = initialize();
  const {
    state: { bookmarkeredMovies },
  } = useAppContext();

  const getUser = async (user: any) => {
    const mySnapshot = await getDoc(user);
    console.log(mySnapshot.data());
    console.log(mySnapshot.exists());
    return mySnapshot.exists();
  };

  const signIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const user = doc(db, `users/${email}`);
    const docData = {
      email,
      bookmarkeredMovies,
    };

    try {
      if (await getUser(user)) getUser(user);
      else await setDoc(user, docData, { merge: true });

      navigate('/home');
      console.log(user);
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
