import { useState, useEffect } from 'react';
import { useAppContext } from '../context';

const Trending = () => {
  const {
    state: { trendingMovies },
  } = useAppContext();
  const [slideTranslate, setSlideTranslate] = useState(0);
  const [rowsNumber, setRowsNumber] = useState(0);

  useEffect(() => {
    const root: Element | null = document.querySelector('.card__wrapper');
    if (!root) return;
    const value = getComputedStyle(root).getPropertyValue('--items-per-screen');
    const rows = Math.ceil(trendingMovies.length / parseInt(value));
    setRowsNumber(rows);
  }, [rowsNumber]);

  const progressBarItems = Array.from({ length: rowsNumber }).map(
    (_, index) => (
      <div
        className={`${
          -index === slideTranslate
            ? 'progress__bar--item progress__bar--item-active'
            : 'progress__bar--item'
        }`}
        key={index}
      ></div>
    )
  );

  const handleTranslateLeft = () => {
    if (slideTranslate === -rowsNumber + 1) setSlideTranslate(0);
    else setSlideTranslate((prev) => prev - 1);
  };

  const handleTranslateRight = () => {
    if (slideTranslate === 0) setSlideTranslate(-rowsNumber + 1);
    else setSlideTranslate((prev) => prev + 1);
  };

  console.log(slideTranslate, rowsNumber);

  return (
    <section className="section__trending">
      <div className="heading-progress__container">
        <h2 className="heading__trending">Trending movies</h2>
        <div className="progress__bar">{progressBarItems}</div>
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
