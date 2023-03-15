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
  liked: false,
  bookmakered: false,
};

export const movies = [[singleMovie]];

export const initialState: appState = {
  movies: movies,
  filteredMovies: movies,
  moviesHomeIndex: 0,
  trendingMovies: [singleMovie],

  showLikedMovies: false,
  showBookmakeredMovies: false,

  bookmakeredMovies: [singleMovie],
  likedMovies: [],

  showFilters: true,
  filters: {
    currentMovie: '',
    genre: 'All',
    filterLiked: '',
    filterBookmakered: '',
  },
};
