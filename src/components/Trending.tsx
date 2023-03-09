import React from 'react';
import { useAppContext } from '../context';
import MovieCard from './MovieCard';

const Trending = () => {
  const {
    state: { trendingMovies },
  } = useAppContext();

  return (
    <section className="section__trending">
      <div className="container container__trending">
        {trendingMovies.map((movie) => {
          return <MovieCard key={movie.imdbid} {...movie} />;
        })}
      </div>
      <button className="btn-slide-left"></button>
      <button className="btn-slide-right"></button>
    </section>
  );
};

export default Trending;
