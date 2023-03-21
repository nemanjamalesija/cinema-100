import { ACTIONS, appState, movies, singleMovie } from './constants/types';
import { chunk } from './helpers/chunk';
import { getRandomIndex } from './helpers/getRandomIndex';
import { collection, addDoc, setDoc, doc, updateDoc } from 'firebase/firestore';
import { initialize } from './config/firebase';
const { firebaseApp, db, auth } = initialize();

const reducer = (state: appState, action: ACTIONS): appState => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_MOVIES':
      const newMovies = payload.map((movie: singleMovie) => {
        const {
          rank,
          title,
          thumbnail,
          rating,
          id,
          year,
          image,
          description,
          director,
          trailer,
          genre,
          writers,
          imdbid,
        } = movie;
        return {
          rank,
          title,
          thumbnail,
          rating,
          id,
          year,
          image,
          description,
          director,
          trailer,
          genre,
          writers,
          imdbid,
          bookmakered: false,
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
        ...state.movies.flat().filter((movie) => movie.bookmakered),
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
          { ...currentMovie, bookmakered: true },
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
          return { ...movie, bookmakered: !movie.bookmakered };
        } else return movie;
      });

      const newTrendingMovies = state.trendingMovies.map((movie) => {
        if (movie.imdbid === payload) {
          return { ...movie, bookmakered: !movie.bookmakered };
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
      return { ...state, currentUser: payload };
    }

    case 'SET_MOVIES_CURRENT_USER': {
      return {
        ...state,
        bookmarkeredMovies: [...state.bookmarkeredMovies, ...payload],
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
