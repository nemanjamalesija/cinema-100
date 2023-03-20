import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingleMovie from './pages/SingleMovie';
import SharedLayout from './pages/SharedLayout';
import Error from './pages/Error';
import LogInPage from './pages/LogInPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogInPage />} />
          <Route path='/home' element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path='/home:id' element={<SingleMovie />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
