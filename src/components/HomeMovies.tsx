import { useState } from 'react';
import { useAppContext } from '../context';
import MovieCard from './MovieCard';

type homeMoviesProps = {
  moviesHomeIndex: number;
};

const HomeMovies = ({ moviesHomeIndex }: homeMoviesProps) => {
  const {
    state: { movies },
  } = useAppContext();

  return (
    <div className="container__movies">
      {movies[moviesHomeIndex].map((movie, i) => {
        return <MovieCard key={movie.imdbid} {...movie} />;
      })}
    </div>
  );
};

export default HomeMovies;
