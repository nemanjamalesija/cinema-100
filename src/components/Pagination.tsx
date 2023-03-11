import { useState } from 'react';
import { useAppContext } from '../context';
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
        <div className="container__movies">
          {movies[moviesHomeIndex].map((movie, i) => {
            return <MovieCard key={movie.imdbid} {...movie} />;
          })}
        </div>
        <PagiationButtons />
      </div>
    </section>
  );
};

export default Pagination;
