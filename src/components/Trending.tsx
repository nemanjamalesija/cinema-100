import React, { useState, useRef } from 'react';
import { useAppContext } from '../context';
import MovieCard from './MovieCard';

const Trending = () => {
  const {
    state: { trendingMovies },
  } = useAppContext();
  const [currSetOfSlides, setCurrSetOfSlides] = useState(-5);

  const sldierHandlerRight = () => {
    if (currSetOfSlides === 2) return;
    else setCurrSetOfSlides((prev) => prev + 1);
  };

  const sldierHandlerLeft = () => {
    if (currSetOfSlides === -16) return;
    else setCurrSetOfSlides((prev) => prev - 1);
  };

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
