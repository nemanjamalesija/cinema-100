import { ACTIONS, appState, singleMovie } from './constants/types';

function getRandomNumber(movies: singleMovie[]) {
  let randomNumber = Math.floor(Math.random() * movies.length);
  if (randomNumber >= movies.length - 5) randomNumber = movies.length - 6;
  return randomNumber;
}

const reducer = (state: appState, action: ACTIONS) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_MOVIES':
      const moviesHome = payload.slice(0, 24);
      const randomIndex = getRandomNumber(payload);
      const trendingMovies = payload.slice(randomIndex, randomIndex + 10);

      return {
        ...state,
        movies: payload,
        moviesHome,
        trendingMovies,
      };

    default:
      return { ...state };
  }
};

export default reducer;
