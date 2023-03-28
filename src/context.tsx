import React, { useContext, useReducer } from 'react';
import { initialState } from './constants/initialState';
import { ACTIONS, contextValues } from './constants/types';
import reducer from './reducer';

const AppContext = React.createContext<contextValues>({
  state: initialState,
  dispatch: (action: ACTIONS) => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
