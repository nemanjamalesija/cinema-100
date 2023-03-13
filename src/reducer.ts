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
      const moviesTemp = [...state.movies.flat()];
      const moviesFilteredTemp = [...state.filteredMovies.flat()];

      let resultArrayTemp = moviesTemp.map((item) => {
        const matchingItem = moviesFilteredTemp.find(
          (updatedItem) => updatedItem.id === item.id
        );

        if (matchingItem) {
          return { ...item, liked: matchingItem.liked };
        } else {
          return item;
        }
      });

      if (currentMovie) {
        resultArrayTemp = resultArrayTemp.filter((movie) =>
          movie.title.toLowerCase().includes(currentMovie.toLowerCase())
        );
      }

      if (genre && genre !== 'All') {
        resultArrayTemp = resultArrayTemp.filter((movie) =>
          movie.genre.join(',').includes(genre)
        );
      }

      return {
        ...state,
        filteredMovies:
          resultArrayTemp.length > 12
            ? chunk(resultArrayTemp, 12)
            : [resultArrayTemp],
      };
    }

    case 'UPDATE_LIKED_STATUS': {
      const newMovies = state.filteredMovies.flat().map((movie) => {
        if (movie.imdbid === payload) {
          return { ...movie, liked: !movie.liked };
        } else return movie;
      });

      return { ...state, filteredMovies: chunk(newMovies, 12) };
    }

    case 'UPDATE_BOOKMAKERED_STATUS': {
      const newMovies = state.filteredMovies.flat().map((movie) => {
        if (movie.imdbid === payload) {
          return { ...movie, bookmakered: !movie.bookmakered };
        } else return movie;
      });

      return { ...state, filteredMovies: chunk(newMovies, 12) };
    }

    default:
      return { ...state };
  }
};

export default reducer;
