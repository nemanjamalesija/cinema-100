import React, { useState, useRef } from 'react';
import { useAppContext } from '../context';
import MovieCard from './MovieCard';

const Trending = () => {
  const {
    state: { trendingMovies },
  } = useAppContext();

  return (
    <section className="section__trending">
      <div className="container container__trending">
        <div className="card--wrapper">
          {trendingMovies.map((movie, i) => {
            return <img src={movie.image} key={movie.imdbid} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Trending;
