import React, { useContext, useEffect, useReducer } from 'react';
import App from './App';
import reducer from './reducer';
import { initialState } from './constants/initialState';
import { ACTIONS, appState, contextValues } from './constants/types';
import { data } from './constants/data';

const AppContext = React.createContext<contextValues>({
  state: initialState,
  dispatch: (action: ACTIONS) => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_MOVIES', payload: data });
  }, []);

  return (
    <AppContext.Provider
      value={{
        state: { ...state },
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
