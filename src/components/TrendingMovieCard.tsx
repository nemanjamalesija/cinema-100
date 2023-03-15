import { useAppContext } from '../context';
import { iconBookmarkCard } from '../utils/icons/inconsMovieCard';

type trendingMovieCardProps = {
  itemsPerScreen: number;
  slideTranslateIndex: number;
  image: string;
  imdbid: string;
  liked: boolean;
  bookmakered: boolean;
};

const TrendingMovieCard = ({
  itemsPerScreen,
  slideTranslateIndex,
  image,
  imdbid,
  bookmakered,
}: trendingMovieCardProps) => {
  const { dispatch } = useAppContext();

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
          bookmakered
            ? 'btn__icon--container btn__icon--bookmark btn__icon--active'
            : 'btn__icon--container btn__icon--bookmark'
        }
        onClick={() =>
          dispatch({ type: 'ADD_BOOKMARK_VIDEO', payload: imdbid })
        }
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
