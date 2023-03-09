import React, { useState, useRef } from 'react';
import { useAppContext } from '../context';
import MovieCard from './MovieCard';

const Trending = () => {
  const {
    state: { trendingMovies },
  } = useAppContext();
  const [visibleTrendingMoviesIndexSTART, setVisibleTrendingMoviesIndexSTART] =
    useState(0);
  const [visibleTrendingMoviesIndexEND, setVisibleTrendingMoviesIndexEND] =
    useState(9);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  const sldierHandlerRight = () => {
    if (!cardWrapperRef.current) return;

    setVisibleTrendingMoviesIndexSTART((prev) => prev + 1);
    setVisibleTrendingMoviesIndexEND((prev) => prev + 1);
    cardWrapperRef.current.classList.add('transform--right');
  };

  const sldierHandlerLeft = () => {
    setVisibleTrendingMoviesIndexSTART((prev) => prev - 1);
    setVisibleTrendingMoviesIndexEND((prev) => prev - 1);
  };

  const displayTrendingMovies = trendingMovies.slice(
    visibleTrendingMoviesIndexSTART,
    visibleTrendingMoviesIndexEND
  );

  return (
    <section className="section__trending">
      <div className="container container__trending">
        <div className="card--wrapper" ref={cardWrapperRef}>
          {displayTrendingMovies.map((movie) => {
            return <MovieCard key={movie.imdbid} {...movie} />;
          })}
        </div>
      </div>
      <button className="btn--slide-left" onClick={sldierHandlerLeft}>
        &#x2190;{' '}
      </button>
      <button className="btn--slide-right" onClick={sldierHandlerRight}>
        &#x2192;
      </button>
    </section>
  );
};

export default Trending;
