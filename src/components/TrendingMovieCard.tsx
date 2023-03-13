import { useState } from 'react';
import { useAppContext } from '../context';
import {
  iconBookmarkCard,
  iconLikedCard,
} from '../utils/icons/inconsMovieCard';

type trendingMovieCardProps = {
  itemsPerScreen: number;
  slideTranslateIndex: number;
  image: string;
  imdbid: string;
};

const TrendingMovieCard = ({
  itemsPerScreen,
  slideTranslateIndex,
  image,
  imdbid,
}: trendingMovieCardProps) => {
  const { dispatch } = useAppContext();
  const [buttonLikedStatus, setButtonLikedStatus] = useState('not-active');
  const [buttonBookmarkStatus, setButtonBookmarkStatus] =
    useState('not-active');

  const handleLikeTrending = (id: string) => {
    dispatch({
      type: 'UPDATE_LIKED_STATUS',
      payload: id,
    });
    if (buttonLikedStatus === 'not-active') setButtonLikedStatus('active');
    else setButtonLikedStatus('not-active');
  };

  const handleBookmarkTrending = (id: string) => {
    dispatch({ type: 'UPDATE_BOOKMAKERED_STATUS', payload: id });
    if (buttonBookmarkStatus === 'not-active')
      setButtonBookmarkStatus('active');
    else setButtonBookmarkStatus('not-active');
  };

  return (
    <article
      className='img--wrapper'
      style={{
        transform: `translateX(${itemsPerScreen * 100 * slideTranslateIndex}%)`,
      }}
    >
      <div className='movie-card__overlay'></div>
      <button
        className={
          buttonLikedStatus === 'active'
            ? 'btn__icon--container btn__icon--liked btn__icon--active'
            : 'btn__icon--container btn__icon--liked'
        }
        onClick={() => handleLikeTrending(imdbid)}
      >
        {iconLikedCard}
      </button>
      <button
        className={
          buttonBookmarkStatus === 'active'
            ? 'btn__icon--container btn__icon--bookmark btn__icon--active'
            : 'btn__icon--container btn__icon--bookmark'
        }
        onClick={() => handleBookmarkTrending(imdbid)}
      >
        {iconBookmarkCard}
      </button>
      <div className='card__wrapper'>
        <img className='card__wrapper--image' src={image} />
      </div>
    </article>
  );
};

export default TrendingMovieCard;
