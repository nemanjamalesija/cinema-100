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
};

export type movies = singleMovie[][];

export type appState = {
  movies: movies;
  trendingMovies: singleMovie[];
  moviesHomeIndex: number;
  filters: {
    currentMovie: string;
  };
};

export type ACTIONS = {
  type:
    | 'SET_MOVIES'
    | 'INCREMENT_PAGE_INDEX'
    | 'DECREMENT_PAGE_INDEX'
    | 'SET_PAGE_INDEX'
    | 'SET_FILTER';
  payload?: any;
};

export type contextValues = {
  state: appState;
  dispatch: React.Dispatch<ACTIONS>;
};
