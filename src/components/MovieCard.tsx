import React from 'react';

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
  return <article className="home-movie__article"></article>;
};

export default MovieCard;
