import React from 'react';
import { useAppContext } from '../context';
import MovieCard from './MovieCard';

const Trending = () => {
  const {
    state: { movies, moviesHome },
  } = useAppContext();

  function getRandomNumber() {
    let randomNumber = Math.floor(Math.random() * moviesHome.length);
    if (randomNumber >= moviesHome.length - 5)
      randomNumber = moviesHome.length - 6;
    return randomNumber;
  }
  const randomIndex = getRandomNumber();
  console.log(randomIndex, moviesHome.length);
  const trendingMovies = movies.slice(randomIndex, 4);
  console.log(trendingMovies);

  return (
    <section className="section__trending">
      <div className="container container__trending">
        {trendingMovies.map((movie) => {
          return <MovieCard key={movie.imdbid} {...movie} />;
        })}
      </div>
    </section>
  );
};

export default Trending;
