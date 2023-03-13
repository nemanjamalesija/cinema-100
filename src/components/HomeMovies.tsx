import { useAppContext } from '../context';
import MovieCard from './MovieCard';

const HomeMovies = () => {
  const {
    state: { filteredMovies, moviesHomeIndex },
  } = useAppContext();

  return (
    <div className='container__movies'>
      {filteredMovies[moviesHomeIndex].map((movie, i) => {
        return <MovieCard key={movie.imdbid} {...movie} />;
      })}
    </div>
  );
};

export default HomeMovies;
