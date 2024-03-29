import { useAppContext } from '../context';
import MovieCard from './MovieCard';

const BookmarkeredMovies = () => {
  const {
    state: { bookmarkeredMovies },
  } = useAppContext();

  if (bookmarkeredMovies.length === 0)
    return (
      <h2 className='heading--secondary heading__no--match--found'>
        No bookmarkered movies
      </h2>
    );

  return (
    <section className='section__liked-and-bookmakered--movies'>
      <div className='container__movies bookmakered__movies'>
        {bookmarkeredMovies.map((movie) => {
          return (
            <MovieCard
              key={movie.imdbid}
              bookmarkered={movie.bookmarkered ?? false}
              {...movie}
            />
          );
        })}
      </div>
    </section>
  );
};

export default BookmarkeredMovies;
