import { initialState } from './initialState';

export type singleMovie = {
  rank: number;
  title: string;
  thumbnail: string;
  rating: string;
  id: string;
  year: number;
  image: string;
  description: string;
  director: string[];
  trailer: string;
  genre: string[];
  writers: string[];
  imdbid: string;
  liked?: boolean;
  bookmakered?: boolean;
};

export type movies = singleMovie[][];

export type appState = {
  movies: movies;
  filteredMovies: movies;
  trendingMovies: singleMovie[];
  likedMovies: singleMovie[];
  bookmakeredMovies: singleMovie[];
  moviesHomeIndex: number;
  filters: {
    currentMovie: string;
    genre: string;
  };
};

export type ACTIONS = {
  type:
    | 'SET_MOVIES'
    | 'INCREMENT_PAGE_INDEX'
    | 'DECREMENT_PAGE_INDEX'
    | 'SET_PAGE_INDEX'
    | 'SET_FILTER'
    | 'HANDLE_FILTERING'
    | 'HANDLE_LIKED_BUTTON_ACTIVATION';
  payload?: any;
};

export type contextValues = {
  state: appState;
  dispatch: React.Dispatch<ACTIONS>;
};
