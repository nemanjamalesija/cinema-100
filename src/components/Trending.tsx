import { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import './trending.css';

const Trending = () => {
  const {
    state: { trendingMovies },
  } = useAppContext();
  const [slideTranslateIndex, setslideTranslateIndex] = useState(0);
  const [rowsNumber, setRowsNumber] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(0);

  useEffect(() => {
    const root: Element | null = document.querySelector('.card__wrapper');
    if (!root) return;
    const valueCSS =
      getComputedStyle(root).getPropertyValue('--items-per-screen');
    const rows = Math.ceil(trendingMovies.length / parseInt(valueCSS));

    setItemsPerScreen(parseInt(valueCSS));
    setRowsNumber(rows);
  }, [rowsNumber, itemsPerScreen]);

  const progressBarItems = Array.from({ length: rowsNumber }).map(
    (_, index) => (
      <div
        className={`${
          -index === slideTranslateIndex
            ? 'progress__bar--item progress__bar--item-active'
            : 'progress__bar--item'
        }`}
        key={index}
      ></div>
    )
  );

  const handleTranslateLeft = () => {
    if (slideTranslateIndex === -rowsNumber + 1) setslideTranslateIndex(0);
    else setslideTranslateIndex((prev) => prev - 1);
  };

  const handleTranslateRight = () => {
    if (slideTranslateIndex === 0) setslideTranslateIndex(-rowsNumber + 1);
    else setslideTranslateIndex((prev) => prev + 1);
  };

  return (
    <section className="section__trending">
      <div className="section__container">
        <button className="btn btn__slide-left" onClick={handleTranslateRight}>
          &#x2190;
        </button>
        <div className="section-center">
          <div className="heading-progress__container">
            <h2 className="heading__trending">Currently trending</h2>
            <div className="progress__bar">{progressBarItems}</div>
          </div>
          <main className="container container__trending">
            <div className="card__wrapper">
              {trendingMovies.map((movie) => {
                return (
                  <img
                    className="card__wrapper--image"
                    src={movie.image}
                    key={movie.imdbid}
                    style={{
                      transform: `translateX(${
                        itemsPerScreen * 100 * slideTranslateIndex
                      }%)`,
                    }}
                  />
                );
              })}
            </div>
          </main>
        </div>

        <button className="btn btn__slide-right" onClick={handleTranslateLeft}>
          &#x2192;
        </button>
      </div>
    </section>
  );
};

export default Trending;
