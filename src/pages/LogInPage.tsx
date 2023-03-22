import logo from '../utils/images/logo.png';
import { useState } from 'react';

import { initialize } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { useAppContext } from '../context';

const LogInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const navigate = useNavigate();
  const { db } = initialize();

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
        <input type='text' value={emailSignUp} />
        <input type='password' value={passwordSignUp} />
        <button type='submit' className='signUp'></button>
      </form>
    </div>
  );
};

export default LogInPage;
