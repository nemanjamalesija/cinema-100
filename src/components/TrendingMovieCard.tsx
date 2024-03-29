import { useAppContext } from '../context';
import { iconBookmarkCard, iconSearchMovieCard } from '../utils/icons/icons';
import { Link } from 'react-router-dom';

type trendingMovieCardProps = {
  itemsPerScreen: number;
  slideTranslateIndex: number;
  image: string;
  imdbid: string;
  bookmarkered: boolean;
};

const TrendingMovieCard = ({
  itemsPerScreen,
  slideTranslateIndex,
  image,
  imdbid,
  bookmarkered,
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
          bookmarkered
            ? 'btn__icon--container btn__icon--bookmark btn__icon--active'
            : 'btn__icon--container btn__icon--bookmark'
        }
        onClick={() =>
          dispatch({ type: 'ADD_BOOKMARK_VIDEO', payload: imdbid })
        }
      >
        {iconBookmarkCard}
      </button>

      <Link to={`/home/${imdbid}`}>
        <button className='btn__icon--search'>
          <p className='btn__icon--container-p'>See more</p>
          {iconSearchMovieCard}
        </button>
      </Link>

      <div className='card__wrapper'>
        <img className='card__wrapper--image' src={image} />
      </div>
    </article>
  );
};

export default TrendingMovieCard;
