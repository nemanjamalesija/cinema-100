import React from 'react';
import MovieCard from '../components/MovieCard';
import { useAppContext } from '../context';

const Home = () => {
  const {
    state: { moviesHome },
  } = useAppContext();

  return (
    <section className="section section__home">
      <div className="container container__home">
        {moviesHome.map((movie, i) => {
          return <MovieCard key={movie.imdbid} {...movie} />;
        })}
      </div>
    </section>
  );
};

export default Home;
