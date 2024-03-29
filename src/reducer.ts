import { ACTIONS, appState, singleMovie } from './constants/types';
import { chunk } from './helpers/chunk';
import { getRandomIndex } from './helpers/getRandomIndex';
import { doc, updateDoc } from 'firebase/firestore';
import { initialize } from './config/firebase';
const { db } = initialize();

const reducer = (state: appState, action: ACTIONS): appState => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_MOVIES':
      const newMovies = payload.map((movie: singleMovie) => {
        return {
          ...movie,
          bookmarkered: false,
        };
      });

      const randomIndex = getRandomIndex(payload);
      const trendingMovies = newMovies.slice(randomIndex, randomIndex + 20);

      return {
        ...state,
        movies: chunk(newMovies, 12),
        filteredMovies: chunk(newMovies, 12),
        trendingMovies,
      };

    case 'INCREMENT_PAGE_INDEX': {
      if (state.moviesHomeIndex === state.filteredMovies.length - 1)
        return { ...state, moviesHomeIndex: state.filteredMovies.length - 1 };
      else return { ...state, moviesHomeIndex: state.moviesHomeIndex + 1 };
    }

    case 'DECREMENT_PAGE_INDEX': {
      if (state.moviesHomeIndex === 0) return { ...state, moviesHomeIndex: 0 };
      else return { ...state, moviesHomeIndex: state.moviesHomeIndex - 1 };
    }

    case 'SET_PAGE_INDEX': {
      return { ...state, moviesHomeIndex: payload };
    }

    case 'SET_FILTER': {
      const { name, value } = payload;

      return { ...state, filters: { ...state.filters, [name]: value } };
    }

    case 'HANDLE_FILTERING': {
      const { currentMovie, genre } = state.filters;

      let filteredMoviesTemp = [...state.movies.flat()];
      let filteredBookmarksTemp = [
        ...state.movies.flat().filter((movie) => movie.bookmarkered),
      ];

      if (currentMovie) {
        filteredMoviesTemp = filteredMoviesTemp.filter((movie) =>
          movie.title.toLowerCase().includes(currentMovie.toLowerCase())
        );
        filteredBookmarksTemp = filteredBookmarksTemp.filter((bookMov) =>
          bookMov.title.toLocaleLowerCase().includes(currentMovie.toLowerCase())
        );
      }

      if (genre && genre !== 'All') {
        filteredMoviesTemp = filteredMoviesTemp.filter((movie) =>
          movie.genre.join(',').includes(genre)
        );
        filteredBookmarksTemp = filteredBookmarksTemp.filter((bookMov) =>
          bookMov.genre.join(',').includes(genre)
        );
      }

      return {
        ...state,
        filteredMovies:
          filteredMoviesTemp.length > 12
            ? chunk(filteredMoviesTemp, 12)
            : [filteredMoviesTemp],
        bookmarkeredMovies: filteredBookmarksTemp,
        moviesHomeIndex: 0,
      };
    }

    case 'ADD_BOOKMARK_VIDEO': {
      let newBookmarkeredMovies = [...state.bookmarkeredMovies];

      const isMovieAlreadyBookmarkered = (movie: singleMovie) =>
        state.bookmarkeredMovies.some(
          (bookMovie) => bookMovie.imdbid === movie.imdbid
        );

      const currentMovie = state.movies
        .flat()
        .find((movie) => movie.imdbid === action.payload) as singleMovie;

      if (!isMovieAlreadyBookmarkered(currentMovie)) {
        newBookmarkeredMovies = [
          ...state.bookmarkeredMovies,
          { ...currentMovie, bookmarkered: true },
        ];
      } else {
        newBookmarkeredMovies = newBookmarkeredMovies.filter(
          (movie) => movie.imdbid !== payload
        );
      }

      const currentUserRef = doc(db, `users/${state.currentUser.email}`);

      updateDoc(currentUserRef, { bookmarkeredMovies: newBookmarkeredMovies });

      const newMovies = state.movies.flat().map((movie) => {
        if (movie.imdbid === payload) {
          return { ...movie, bookmarkered: !movie.bookmarkered };
        } else return movie;
      });

      const newTrendingMovies = state.trendingMovies.map((movie) => {
        if (movie.imdbid === payload) {
          return { ...movie, bookmarkered: !movie.bookmarkered };
        } else return movie;
      });

      return {
        ...state,
        movies: chunk(newMovies, 12),
        filteredMovies: chunk(newMovies, 12),
        trendingMovies: newTrendingMovies,
        bookmarkeredMovies: newBookmarkeredMovies,
      };
    }

    case 'SHOW_BOOKMARKERED_MOVIES': {
      return {
        ...state,
        showHome: false,
      };
    }

    case 'SHOW_HOME_MOVIES': {
      return {
        ...state,
        showHome: true,
      };
    }

    case 'SET_CURRENT_USER': {
      return { ...state, userLoggedIn: true, currentUser: payload };
    }

    case 'ADD_MOVIES_FROM_DATABASE': {
      const moviesTemp = [...state.movies.flat()];
      const trendingMoviesTemp = [...state.trendingMovies];
      const currentUserBookmarkeredMovies = [...payload];

      const newMovies = moviesTemp.map((movie1) => {
        const movie2 = currentUserBookmarkeredMovies.find(
          (movie2) => movie2.imdbid === movie1.imdbid
        );
        if (movie2) {
          return { ...movie1, bookmarkered: movie2.bookmarkered };
        } else {
          return { ...movie1, bookmarkered: false };
        }
      });

      const newTrendingMovies = trendingMoviesTemp.map((movie1) => {
        const movie2 = currentUserBookmarkeredMovies.find(
          (movie2) => movie2.imdbid === movie1.imdbid
        );

        if (movie2) {
          return { ...movie1, bookmarkered: movie2.bookmarkered };
        } else {
          return { ...movie1, bookmarkered: false };
        }
      });

      return {
        ...state,
        bookmarkeredMovies: [...payload],
        movies: chunk(newMovies, 12),
        filteredMovies: chunk(newMovies, 12),
        trendingMovies: newTrendingMovies,
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
