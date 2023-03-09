import React, { useState, useRef } from 'react';
import { useAppContext } from '../context';
import MovieCard from './MovieCard';

const Trending = () => {
  const {
    state: { trendingMovies },
  } = useAppContext();
  const [currSetOfSlides, setCurrSetOfSlides] = useState(1);

  const sldierHandlerRight = () => {
    setCurrSetOfSlides((prev) => prev + 1);
  };

  const sldierHandlerLeft = () => {
    setCurrSetOfSlides((prev) => prev - 1);
  };

  return (
    <section className="section__trending">
      <div className="container container__trending">
        <div className="card--wrapper">
          {trendingMovies.map((movie, i) => {
            return (
              <div
                className="cardoni"
                style={{
                  transform: `translateX(${currSetOfSlides * (i + 1) * 100}%)`,
                }}
              >
                <MovieCard key={movie.imdbid} {...movie} />
              </div>
            );
          })}
        </div>
        <button className="btn--slide-left" onClick={sldierHandlerLeft}>
          &#x2190;{' '}
        </button>
        <button className="btn--slide-right" onClick={sldierHandlerRight}>
          &#x2192;
        </button>
      </div>
    </section>
  );
};

export default Trending;
