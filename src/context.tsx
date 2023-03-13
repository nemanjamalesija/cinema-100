import React, { useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import { initialState } from './constants/initialState';
import { ACTIONS, contextValues } from './constants/types';
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

  useEffect(() => {
    dispatch({ type: 'HANDLE_FILTERING' });
  }, [state.filters]);

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
