import { singleMovie } from '../constants/types';

export const getRandomIndex = (movies: singleMovie[]) => {
  let randomNumber = Math.floor(Math.random() * movies.length);
  if (randomNumber >= movies.length - 20) randomNumber = movies.length - 21;
  return randomNumber;
};
