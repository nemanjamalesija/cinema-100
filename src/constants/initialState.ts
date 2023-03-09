import { appState } from './types';

export const movies = [
  {
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
  },
];

export const initialState: appState = {
  movies,
  moviesHome: [...movies],
  trendingMovies: [...movies],
};
