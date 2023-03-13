import { useAppContext } from '../context';
import MovieCard from './MovieCard';
import Trending from './Trending';

const HomeMovies = () => {
  const {
    state: { filteredMovies, moviesHomeIndex },
  } = useAppContext();

  console.log(filteredMovies);

  return (
    <div className='container__movies'>
      {filteredMovies[moviesHomeIndex]?.map((movie, i) => {
        return (
          <MovieCard
            key={movie.imdbid}
            liked={movie.liked || false}
            bookmakered={movie.bookmakered || false}
            {...movie}
          />
        );
      })}
    </div>
  );
};

export default HomeMovies;
