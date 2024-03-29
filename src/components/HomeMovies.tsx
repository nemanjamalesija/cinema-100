import { useAppContext } from '../context';
import MovieCard from './MovieCard';

const HomeMovies = () => {
  const {
    state: { filteredMovies, moviesHomeIndex },
  } = useAppContext();

  if (filteredMovies[moviesHomeIndex].length === 0)
    return (
      <h2 className='heading--secondary heading__no--match--found'>
        No movies found
      </h2>
    );

  return (
    <div className='container__movies'>
      {filteredMovies[moviesHomeIndex].map((movie, i) => {
        return (
          <MovieCard
            key={movie.imdbid}
            bookmarkered={movie.bookmarkered ?? false}
            {...movie}
          />
        );
      })}
    </div>
  );
};

export default HomeMovies;
