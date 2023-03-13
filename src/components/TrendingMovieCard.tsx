import { useState } from 'react';
import { useAppContext } from '../context';
import {
  iconBookmarkCard,
  iconLikedCard,
} from '../utils/icons/inconsMovieCard';

type trendingMovieCardProps = {
  itemsPerScreen: number;
  slideTranslateIndex: number;
};

const TrendingMovieCard = ({
  itemsPerScreen,
  slideTranslateIndex,
}: trendingMovieCardProps) => {
  const {
    dispatch,
    state: { trendingMovies },
  } = useAppContext();

  return (
    <article className='container container__trending'>
      <div className='card__wrapper'>
        {trendingMovies.map((movie, i) => {
          return (
            <div
              key={movie.imdbid}
              className='img--wrapper'
              style={{
                transform: `translateX(${
                  itemsPerScreen * 100 * slideTranslateIndex
                }%)`,
              }}
            >
              <div className='movie-card__overlay'></div>
              <img className='card__wrapper--image' src={movie.image} />
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default TrendingMovieCard;
