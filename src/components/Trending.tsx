import React, { useState, useRef } from 'react';
import { useAppContext } from '../context';
import MovieCard from './MovieCard';

const Trending = () => {
  const {
    state: { trendingMovies },
  } = useAppContext();

  return (
    <section className="section__trending">
      <h2 className="heading__trending">Trending movies</h2>
      <div className="container container__trending">
        <div className="card__wrapper">
          {trendingMovies.map((movie, i) => {
            return <img src={movie.image} key={movie.imdbid} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Trending;
