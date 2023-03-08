import React from 'react';
import MovieCard from '../components/MovieCard';
import { useAppContext } from '../context';

const Home = () => {
  const {
    state: { moviesHome },
  } = useAppContext();

  return (
    <div>
      {moviesHome.map((movie, i) => {
        return <MovieCard key={movie.imdbid} {...movie} />;
      })}
    </div>
  );
};

export default Home;
