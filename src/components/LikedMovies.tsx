import React from 'react';
import { useAppContext } from '../context';
import MovieCard from './MovieCard';

const LikedMovies = () => {
  const {
    state: { likedMovies, showFilters, showLikedMovies },
  } = useAppContext();

  if (likedMovies.length === 0) return <h2 className=''>No liked movies</h2>;

  console.log(likedMovies);

  return (
    <section className='section__liked-and-bookmakered--movies'>
      <div className='container__movies'>
        {likedMovies.map((movie) => {
          return <MovieCard key={movie.imdbid} {...movie} />;
        })}
      </div>
    </section>
  );
};

export default LikedMovies;
