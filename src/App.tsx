import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookmakeredMovies from './pages/BookmakeredMovies';
import SingleMovie from './pages/SingleMovie';
import Error from './pages/Error';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":id" element={<SingleMovie />} />
          <Route path="bookmarks" element={<BookmakeredMovies />} />
          <Route path="bookmarks/:id" element={<SingleMovie />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
