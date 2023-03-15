import { ACTIONS, appState, movies, singleMovie } from './constants/types';
import { chunk } from './helpers/chunk';
import { getRandomIndex } from './helpers/getRandomIndex';

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
          liked: false,
          bookakered: false,
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
      const { currentMovie, genre, filterLiked, filterBookmakered } =
        state.filters;

      let filteredMoviesTemp = [...state.movies.flat()];

      if (currentMovie) {
        filteredMoviesTemp = filteredMoviesTemp.filter((movie) =>
          movie.title.toLowerCase().includes(currentMovie.toLowerCase())
        );
      }

      if (genre && genre !== 'All') {
        filteredMoviesTemp = filteredMoviesTemp.filter((movie) =>
          movie.genre.join(',').includes(genre)
        );
      }

      return {
        ...state,
        filteredMovies:
          filteredMoviesTemp.length > 12
            ? chunk(filteredMoviesTemp, 12)
            : [filteredMoviesTemp],
      };
    }

    case 'ADD_LIKED_VIDEO': {
      const currentLikedMovie = state.movies
        .flat()
        .find((movie) => movie.imdbid === payload);

      console.log(currentLikedMovie);

      const newMovies = state.movies.flat().map((movie) => {
        if (movie.imdbid === payload) {
          return { ...movie, liked: !movie.liked };
        } else return movie;
      });

      const newTrendingMovies = state.trendingMovies.map((movie) => {
        if (movie.imdbid === payload) {
          return { ...movie, liked: !movie.liked };
        } else return movie;
      });

      return {
        ...state,
        movies: chunk(newMovies, 12),
        filteredMovies: chunk(newMovies, 12),
        trendingMovies: newTrendingMovies,
        likedMovies: currentLikedMovie
          ? [...state.likedMovies, currentLikedMovie]
          : state.likedMovies,
      };
    }

    case 'UPDATE_BOOKMAKERED_STATUS': {
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
      };
    }

    case 'SHOW_LIKED_AND_BOOKMAKERED_MOVIES': {
      return { ...state, showFilters: false, showLikedAndBookmakered: true };
    }

    default:
      return { ...state };
  }
};

export default reducer;
