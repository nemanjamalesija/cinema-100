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

  const [buttonBookmarkIndex, setButtonLikedIndex] = useState(-1);
  const [buttonLikedIndex, setButtonBookmarkIndex] = useState(-1);

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
              <button
                className={
                  buttonLikedIndex === i
                    ? 'btn__icon--container btn__icon--bookmark btn__icon--active'
                    : 'btn__icon--container btn__icon--bookmark'
                }
                onClick={() =>
                  buttonLikedIndex === i
                    ? setButtonBookmarkIndex(-1)
                    : setButtonBookmarkIndex(i)
                }
              >
                {iconBookmarkCard}
              </button>
              <button
                className={
                  movie.liked
                    ? 'btn__icon--container btn__icon--liked btn__icon--active'
                    : 'btn__icon--container btn__icon--liked'
                }
                onClick={() =>
                  dispatch({
                    type: 'HANDLE_LIKED_BUTTON_ACTIVATION',
                    payload: movie.imdbid,
                  })
                }
              >
                {iconLikedCard}
              </button>

              <img className='card__wrapper--image' src={movie.image} />
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default TrendingMovieCard;
