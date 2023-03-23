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
      <div className='nav__right--side'>
        <div className='greeting--message'>
          <h3 className='welcome--back-heading'>
            Welcome back, <span>{name}</span>
          </h3>
        </div>
        <div className='nav__logout'>
          <h3 className='welcome--back-heading'>Log out</h3>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='nav--icon'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5.636 5.636a9 9 0 1012.728 0M12 3v9'
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
