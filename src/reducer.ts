import { ACTIONS, appState, movies, singleMovie } from './constants/types';

function getRandomNumber(movies: singleMovie[]) {
  let randomNumber = Math.floor(Math.random() * movies.length);
  if (randomNumber >= movies.length - 20) randomNumber = movies.length - 21;
  return randomNumber;
}

function chunk(array: singleMovie[], size: number) {
  if (size < 1) throw new Error('Size must be positive');

  const result = [];
  for (let i = 0; i < array.length; i += size)
    result.push(array.slice(i, i + size));

  return result;
}

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

      const randomIndex = getRandomNumber(payload);
      const trendingMovies = newMovies.slice(randomIndex, randomIndex + 20);

      return {
        ...state,
        movies: chunk(newMovies, 12),
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
      let moviesTemp = [...state.movies.flat()];

      if (currentMovie) {
        moviesTemp = moviesTemp.filter((movie) =>
          movie.title.toLowerCase().includes(currentMovie.toLowerCase())
        );
      }

      if (genre && genre !== 'All') {
        moviesTemp = moviesTemp.filter((movie) =>
          movie.genre.join(',').includes(genre)
        );
      }

      return {
        ...state,
        filteredMovies:
          moviesTemp.length > 12 ? chunk(moviesTemp, 12) : [moviesTemp],
      };
    }

    case 'HANDLE_LIKED_BUTTON_ACTIVATION':
      console.log(state.trendingMovies);
      {
        const likedMoviesTrending = state.trendingMovies.map((movie) => {
          if (movie.imdbid === payload) {
            return { ...movie, liked: !movie.liked };
          } else return movie;
        });

        console.log(likedMoviesTrending);

        return { ...state, trendingMovies: likedMoviesTrending };
      }

    default:
      return { ...state };
  }
};

export default reducer;
