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
  bookmakered?: boolean;
};

export type movies = singleMovie[][];

export type appState = {
  movies: movies;
  filteredMovies: movies;
  moviesHomeIndex: number;
  trendingMovies: singleMovie[];

  showBookmarkeredVideos: boolean;
  bookmarkeredMovies: [] | singleMovie[];

  showHome: boolean;
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
    | 'ADD_BOOKMARK_VIDEO'
    | 'SHOW_BOOKMARKERED_MOVIES'
    | 'SHOW_HOME_MOVIES';

  payload?: any;
};

export type contextValues = {
  state: appState;
  dispatch: React.Dispatch<ACTIONS>;
};
