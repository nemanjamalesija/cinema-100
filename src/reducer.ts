import { ACTIONS, appState } from './constants/types';

const reducer = (state: appState, action: ACTIONS) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_MOVIES':
      const moviesHome = payload.slice(1, 26);

      return { ...state, movies: payload, moviesHome };

    default:
      return { ...state };
  }
};

export default reducer;
