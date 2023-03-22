import React from 'react';
import logo from '../utils/images/logo.png';
import { Link } from 'react-router-dom';
import './nav.css';
import { useAppContext } from '../context';

const Navigation = () => {
  const {
    state: {
      currentUser: { name },
    },
  } = useAppContext();
  return (
    <nav className='nav u--align--center u--justify--space--between'>
      <Link className='link--nav reset new' to='/home'>
        <div className='nav__logo--div u--align--center'>
          <img src={logo} className='nav--logo' alt='logo' />

          <p className='nav__logo-p'>cinema 100</p>
        </div>
      </Link>
      <div className='greeting--message'>
        <h3 className='welcome--back-heading'>
          Welcome back, <span>{name}</span>
        </h3>
      </div>
    </nav>
  );
};

export default Navigation;
