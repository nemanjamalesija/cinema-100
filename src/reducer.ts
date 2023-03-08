import { ACTIONS, appState } from './constants/types';

const reducer = (state: appState, action: ACTIONS) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_MOVIES':
      return { ...state, movies: payload };

    default:
      return { ...state };
  }
};

export default reducer;
