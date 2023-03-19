import React from 'react';
import logo from '../utils/images/logo.png';
import { Link } from 'react-router-dom';
import './nav.css';

const Navigation = () => {
  return (
    <nav className='nav u--align--center u--justify--space--between'>
      <Link className='link--nav reset new' to='/'>
        <div className='nav__logo--div u--align--center'>
          <img src={logo} className='nav--logo' alt='logo' />

          <p className='nav__logo-p'>cinema 100</p>
        </div>
      </Link>
    </nav>
  );
};

export default Navigation;
