import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import Trending from '../components/Trending';
import { useAppContext } from '../context';

const Home = () => {
  const {
    state: { movies },
  } = useAppContext();
  const [moviesHomeIndex, setMoviesHomeIndex] = useState(0);

  console.log(movies);

  return (
    <section className="section section__home">
      <Trending />
      <div className="container container__home">
        <h2 className="heading--secondary heading-movies">
          Recomended for you
        </h2>
        <div className="container__movies">
          {movies[moviesHomeIndex].map((movie, i) => {
            return <MovieCard key={movie.imdbid} {...movie} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
