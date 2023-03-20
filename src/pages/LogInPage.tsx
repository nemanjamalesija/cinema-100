import logo from '../utils/images/logo.png';
import { Link } from 'react-router-dom';

const LogInPage = () => {
  return (
    <div className='container__form'>
      <form className='log--in--form'>
        <input type='email' />
        <input type='password' />
        <Link className='link--nav reset' to='/home'>
          <button type='submit'>Log in</button>
        </Link>
      </form>
    </div>
  );
};

export default LogInPage;
