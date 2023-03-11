import { useState } from 'react';
import { useAppContext } from '../context';
import HomeMovies from './HomeMovies';
import MovieCard from './MovieCard';
import PagiationButtons from './PagiationButtons';

const Pagination = () => {
  const {
    state: { movies },
  } = useAppContext();
  const [moviesHomeIndex, setMoviesHomeIndex] = useState(0);

  return (
    <section className="section section__pagination">
      <div className="container container__pagination">
        <h2 className="heading--secondary heading-movies">
          Recomended for you
        </h2>
        <HomeMovies moviesHomeIndex={moviesHomeIndex} />
        <PagiationButtons
          setMoviesHomeIndex={setMoviesHomeIndex}
          moviesHomeIndex={moviesHomeIndex}
        />
      </div>
    </section>
  );
};

export default Pagination;
