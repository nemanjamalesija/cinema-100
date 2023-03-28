import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingleMovie from './pages/SingleMovie';
import SharedLayout from './pages/SharedLayout';
import Error from './pages/Error';
import LogInPage from './pages/LogInPage';
import ProtectedRoutes from './components/ProtectedRoutes';
import { useEffect } from 'react';
import { useAppContext } from './context';
import { data } from './constants/data';

function App() {
  const { dispatch, state } = useAppContext();

  useEffect(() => {
    dispatch({ type: 'SET_MOVIES', payload: data });
  }, []);

  useEffect(() => {
    dispatch({ type: 'HANDLE_FILTERING' });
  }, [state.filters]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogInPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/home' element={<SharedLayout />}>
              <Route index element={<Home />} />
              <Route path='/home:id' element={<SingleMovie />} />
            </Route>
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
