import React, { useState, useRef } from 'react';
import { useAppContext } from '../context';
import MovieCard from './MovieCard';

const Trending = () => {
  const {
    state: { trendingMovies },
  } = useAppContext();
  const [slideTranslate, setSlideTranslate] = useState(0);
  const [sliderProgressBar, setSliderProgressBar] = useState(1);

  const handleTranslateLeft = () => {
    if (slideTranslate === 0) setSlideTranslate((prev) => prev - 1);
  };

  const handleTranslateRight = () => {
    setSlideTranslate((prev) => prev + 1);
  };

  console.log(slideTranslate);

  return (
    <section className="section__trending">
      <h2 className="heading__trending">Trending movies</h2>
      <div className="container container__trending">
        <div className="card__wrapper">
          {trendingMovies.map((movie, i) => {
            return (
              <img
                className="card__wrapper--image"
                src={movie.image}
                key={movie.imdbid}
                style={{ transform: `translateX(${400 * slideTranslate}%)` }}
              />
            );
          })}
        </div>
      </div>
      <button className="btn btn__slide-left" onClick={handleTranslateRight}>
        &#x2190;
      </button>
      <button className="btn btn__slide-right" onClick={handleTranslateLeft}>
        &#x2192;
      </button>
    </section>
  );
};

export default Trending;
