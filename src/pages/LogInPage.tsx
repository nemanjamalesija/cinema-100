import logo from '../utils/images/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { Auth } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LogInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const signIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate('/home');
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
