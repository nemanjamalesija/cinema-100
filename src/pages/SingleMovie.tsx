import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context';

const SingleMovie = () => {
  const { id } = useParams();
  const {
    state: { movies },
  } = useAppContext();

  const singleMovie = movies.flat().find((mov) => mov.imdbid === id);
  console.log(singleMovie);

  return <div>SingleMovie</div>;
};

export default SingleMovie;
