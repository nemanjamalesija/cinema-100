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
  liked: boolean;
  bookmakered: boolean;
};

export type movies = singleMovie[][];

export type appState = {
  movies: movies;
  filteredMovies: movies;
  moviesHomeIndex: number;
  trendingMovies: singleMovie[];

  showLikedMovies: boolean;
  showBookmakeredMovies: boolean;
  likedMovies: [] | singleMovie[];
  bookmakeredMovies: [] | singleMovie[];

  showFilters: boolean;
  filters: {
    currentMovie: string;
    genre: string;
    filterLiked: string;
    filterBookmakered: string;
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
    | 'UPDATE_LIKED_STATUS'
    | 'UPDATE_BOOKMAKERED_STATUS'
    | 'ADD_LIKED_VIDEO'
    | 'SHOW_LIKED_MOVIES'
    | 'SHOW_BOOKMAKERED_MOVIES';

  payload?: any;
};

export type contextValues = {
  state: appState;
  dispatch: React.Dispatch<ACTIONS>;
};
