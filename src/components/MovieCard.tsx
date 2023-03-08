import React from 'react';
import star from '../images/star.png';

type movieCardProps = {
  title: string;
  imdbid: string;
  genre: string[];
  year: number;
  thumbnail: string;
  rating: string;
};

const MovieCard = ({
  title,
  imdbid,
  genre,
  year,
  thumbnail,
  rating,
}: movieCardProps) => {
  return (
    <article className="movie-card__article">
      <header className="movie-card__header">
        <img src={thumbnail} alt={title} className="movie-card__image" />
      </header>
      <div className="movie-card__info">
        <p className="movie-card__info--p">{year}</p>
        <div className="movie-card__info--p-star">
          <span>
            <img className="movie-card__star" alt="rating" src={star} />
          </span>
          <span className="movie-card__rating">{rating}</span>
        </div>
        {genre.map((g) => {
          return <p className="movie-card__info--p-star">{g}</p>;
        })}
      </div>
    </article>
  );
};

export default MovieCard;
