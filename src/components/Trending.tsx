import { useState, useEffect } from 'react';
import { useAppContext } from '../context';

const Trending = () => {
  const {
    state: { trendingMovies },
  } = useAppContext();
  const [slideTranslate, setSlideTranslate] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(0);

  useEffect(() => {
    const root: Element | null = document.querySelector('.card__wrapper');
    if (!root) return;
    const value = getComputedStyle(root).getPropertyValue('--items-per-screen');
    setItemsPerScreen(parseInt(value));
  }, []);

  const progressBar = Array.from({ length: itemsPerScreen }).map((_, index) => (
    <div className="progress__bar--item" key={index}></div>
  ));

  const handleTranslateLeft = () => {
    setSlideTranslate((prev) => prev - 1);
  };

  const handleTranslateRight = () => {
    setSlideTranslate((prev) => prev + 1);
  };

  return (
    <section className="section__trending">
      <div className="heading-progress__container">
        <h2 className="heading__trending">Trending movies</h2>
        <div className="progress__bar">{progressBar}</div>
      </div>

      <div className="container container__trending">
        <div className="card__wrapper">
          {trendingMovies.map((movie) => {
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
