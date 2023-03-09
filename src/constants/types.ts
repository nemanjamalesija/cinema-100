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

export type appState = {
  movies: singleMovie[];
  moviesHome: singleMovie[];
  trendingMovies: singleMovie[];
};

export type ACTIONS = {
  type: any;
  payload?: any;
};

export type contextValues = {
  state: appState;
  dispatch: React.Dispatch<ACTIONS>;
};
