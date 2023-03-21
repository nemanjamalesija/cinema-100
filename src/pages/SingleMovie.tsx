import { useParams } from 'react-router-dom';
import { useAppContext } from '../context';
import star from '../utils//icons/star.png';
import { iconBookmarkCard } from '../utils/icons/icons';
import './singleVideo.css';
import '../components/movieCard.css';

const SingleMovie = () => {
  const { id } = useParams();
  const {
    dispatch,
    state: { movies },
  } = useAppContext();

  const singleMovie = movies.flat().find((mov) => mov.imdbid === id);
  console.log(singleMovie);

  if (!singleMovie) return <h2 className='heading--secondary'>Loading...</h2>;

  const {
    description,
    director,
    genre,
    image,
    imdbid,
    rank,
    rating,
    title,
    trailer,
    writers,
    year,
    bookmarkered,
  } = singleMovie;

  return (
    <article className='single__video--container'>
      <div className='single__video--textual-info  u--justify--space--between'>
        <div className='single__video--textual--left'>
          <h2 className='heading--secondary-single-movie'>{title}</h2>
          <span className='single__video--textual-year'>({year})</span>
        </div>
        <div className='single__video--textual--right u--justify--space--between'>
          <div className='single__video--textial--right-info'>
            <h3 className='heading--tertiary'>Imdb rating</h3>
            <span>
              <img
                className='movie-card__star single__movie--star'
                alt='rating'
                src={star}
              />
            </span>
            <span className='single__video--imdb-info'>{rating} </span>
            <span className='single__video--imdb-subinfo'> / 10</span>
          </div>
          <div className='single__video--textial--right-info'>
            <h3 className='heading--tertiary'>Rank</h3>
            <span className='single__video--imdb-info'>{rank}</span>
            <span className='single__video--imdb-subinfo'> / 100</span>
          </div>
        </div>
      </div>
      <div className='sinlge__video--trailer--image'>
        <div className='single__video--photo--container'>
          <header className='movie-card__header'>
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

            <img src={image} alt={title} className='single__video--image' />
          </header>
        </div>
        <div className='react__player--div'>
          <iframe
            className='embeded-video'
            src={`${trailer}?autoplay=1`}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='Embedded youtube'
          />
        </div>
      </div>
      <div className='textual__info--bottom'>
        <div className='textual__info--bottom--genres'>
          {genre.map((g, i) => (
            <span key={i} className='textual__info--bottom--genre'>
              {i >= genre.length - 1 ? g : g + ','}
            </span>
          ))}
        </div>
        <p className='textual__info--bottom--description'>{description}</p>
        <div className='textual__info--bottom--director--container'>
          <h4 className='heading-fourth'>Director</h4>
          <span className='textual__info--bottom--subheading'>{director}</span>
        </div>
        <div className='textual__info--bottom--writers--container'>
          <h4 className='heading-fourth'>Writers</h4>
          <div className='textual__info--bottom--writters--wrapper'>
            {writers.map((w, i) => (
              <span className='textual__info--bottom--subheading'>
                {i >= genre.length - 1 ? w + '.' : w + ','}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default SingleMovie;
