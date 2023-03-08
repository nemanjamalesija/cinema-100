import { ACTIONS, appState } from './constants/types';

const reducer = (state: appState, action: ACTIONS) => {
  return { ...state };
};

export default reducer;
