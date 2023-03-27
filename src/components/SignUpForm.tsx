import React, { useState } from 'react';
import { initialize } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

type signUpFormType = {
  formToDispay: string;
  redirectHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const SignUpForm = ({ formToDispay, redirectHandler }: signUpFormType) => {
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [currentUSerName, setCurrentUSerName] = useState('');
  const [currentUserLastName, setCurrentUserLastName] = useState('');
  const { db, auth } = initialize();

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

  return (
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
  );
};

export default SignUpForm;
