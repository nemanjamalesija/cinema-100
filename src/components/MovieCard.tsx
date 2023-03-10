import React from 'react';
import star from '../images/star.png';

type movieCardProps = {
  title: string;
  imdbid: string;
  genre: string[];
  year: number;
  image: string;
  rating: string;
};

const MovieCard = ({
  title,
  imdbid,
  genre,
  year,
  image,
  rating,
}: movieCardProps) => {
  return (
    <article className="movie-card">
      <header className="movie-card__header">
        <img src={image} alt={title} className="movie-card__image" />
      </header>
      <h3 className="movie-card__heading">
        {title.length >= 40 ? title.slice(0, 40) + '...' : title}
      </h3>
      <div className="movie-card__info">
        <p className="movie-card__info--p">{year}</p>
        <div className="movie-card__info--p-star">
          <span>
            <img className="movie-card__star" alt="rating" src={star} />
          </span>
          <span className="movie-card__rating">{rating}</span>
        </div>
        <div className="movie-card__genre-div">
          {genre.map((g, i) => {
            return (
              <p key={i} className="movie-card__info--p">
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
