import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context';

const ProtectedRoutes = () => {
  const {
    state: { userLoggedIn },
  } = useAppContext();

  if (userLoggedIn) return <Outlet />;
  else return <Navigate to='/' />;
};

export default ProtectedRoutes;
