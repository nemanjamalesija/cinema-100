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

  console.log(currSetOfSlides);

  return (
    <section className="section__trending">
      <h2 className="heading--trending">Trending movies</h2>

      <button className="btn btn--slide-left" onClick={sldierHandlerLeft}>
        &#x2190;{' '}
      </button>
      <button className="btn btn--slide-right" onClick={sldierHandlerRight}>
        &#x2192;
      </button>

      <div className="container container__trending">
        <div
          className="card--wrapper"
          style={{
            transform: `translateX(${currSetOfSlides * 243}px)`,
          }}
        >
          {trendingMovies.map((movie, i) => {
            return (
              <div className="cardoni">
                <MovieCard key={movie.imdbid} {...movie} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trending;
