import { appState } from './types';

const singleMovie = {
  rank: 0,
  title: '',
  thumbnail: '',
  rating: '',
  id: '',
  year: 0,
  image: '',
  description: '',
  director: [''],
  trailer: '',
  genre: [''],
  writers: [''],
  imdbid: '',
};

export const movies = [[singleMovie]];

export const initialState: appState = {
  movies: movies,
  filteredMovies: movies,
  trendingMovies: [singleMovie],
  moviesHomeIndex: 0,
  filters: {
    currentMovie: '',
    genre: '',
  },
};
