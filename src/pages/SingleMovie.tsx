import { useParams } from 'react-router-dom';
import { useAppContext } from '../context';
import star from '../utils//icons/star.png';
import './singleVideo.css';

const SingleMovie = () => {
  const { id } = useParams();
  const {
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
  } = singleMovie;

  return (
    <article className='single__video--container'>
      <div className='single__video--textual-info  u--justify--space--between'>
        <div className='single__video--textual--left u--align--center'>
          <h2 className='heading--secondary heading--secondary-single-movie'>
            {title}
          </h2>
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
          <img src={image} alt={title} className='single__video--image' />
        </div>
        <div className='react__player--div'>
          <iframe
            className='embeded-video'
            src={trailer}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='Embedded youtube'
          />
        </div>
      </div>
    </article>
  );
};

export default SingleMovie;
