import { useState } from 'react';
import {
  iconBookmarkCard,
  iconLikedCard,
} from '../utils/icons/inconsMovieCard';
import star from '../utils/icons/star.png';
import './movieCard.css';

type movieCardProps = {
  i: number;
  title: string;
  imdbid: string;
  genre: string[];
  year: number;
  image: string;
  rating: string;
};

const MovieCard = ({
  i,
  title,
  imdbid,
  genre,
  year,
  image,
  rating,
}: movieCardProps) => {
  const [buttonBookmarkIndex, setButtonLikedIndex] = useState(-1);
  const [buttonLikedIndex, setButtonBookmarkIndex] = useState(-1);

  return (
    <article className='movie-card'>
      <header className='movie-card__header'>
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
            buttonBookmarkIndex === i
              ? 'btn__icon--container btn__icon--liked btn__icon--active'
              : 'btn__icon--container btn__icon--liked'
          }
          onClick={() =>
            buttonBookmarkIndex === i
              ? setButtonLikedIndex(-1)
              : setButtonLikedIndex(i)
          }
        >
          {iconLikedCard}
        </button>
        <img src={image} alt={title} className='movie-card__image' />
      </header>
      <h3 className='movie-card__heading'>
        {title.length >= 40 ? title.slice(0, 40) + '...' : title}
      </h3>
      <div className='movie-card__info'>
        <p className='movie-card__info--p'>{year}</p>
        <div className='movie-card__info--p-star'>
          <span>
            <img className='movie-card__star' alt='rating' src={star} />
          </span>
          <span className='movie-card__rating'>{rating}</span>
        </div>
        <div className='movie-card__genre-div'>
          {genre.map((g, i) => {
            return (
              <p key={i} className='movie-card__info--p'>
                {i >= genre.length - 1 ? g : g + ','}
              </p>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
