import { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import {
  iconBookmarkCard,
  iconLikedCard,
} from '../utils/icons/inconsMovieCard';
import './trending.css';
import TrendingMovieCard from './TrendingMovieCard';

const Trending = () => {
  const [slideTranslateIndex, setslideTranslateIndex] = useState(2);
  const [rowsNumber, setRowsNumber] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(0);
  const {
    state: { trendingMovies },
  } = useAppContext();

  useEffect(() => {
    const root: Element | null = document.querySelector('.img--wrapper');
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
          -index + 2 === slideTranslateIndex
            ? 'progress__bar--item progress__bar--item-active'
            : 'progress__bar--item'
        }`}
        key={index}
      ></div>
    )
  );

  const handleTranslateLeft = () => {
    console.log(rowsNumber, slideTranslateIndex);
    if (slideTranslateIndex === -2) setslideTranslateIndex(2);
    else setslideTranslateIndex((prev) => prev - 1);
  };

  const handleTranslateRight = () => {
    console.log(rowsNumber, slideTranslateIndex);

    if (slideTranslateIndex === 2) setslideTranslateIndex(-2);
    else setslideTranslateIndex((prev) => prev + 1);
  };

  return (
    <section className='section__trending'>
      <div className='section__container'>
        <button className='btn__slide' onClick={handleTranslateRight}>
          &#x2190;
        </button>

        <div className='section-center'>
          <div className='heading-progress__container'>
            <h2 className='heading__trending'>Currently trending</h2>
            <div className='progress__bar'>{progressBarItems}</div>
          </div>
          <main className='container container__trending'>
            {trendingMovies.map((movie) => {
              return (
                <TrendingMovieCard
                  itemsPerScreen={itemsPerScreen}
                  slideTranslateIndex={slideTranslateIndex}
                  {...movie}
                />
              );
            })}
          </main>
        </div>

        <button className='btn__slide' onClick={handleTranslateLeft}>
          &#x2192;
        </button>
      </div>
    </section>
  );
};

export default Trending;
