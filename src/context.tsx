import React, { useContext, useReducer } from 'react';
import App from './App';
import reducer from './reducer';
import { initialState } from './constants/initialState';

const AppContext = React.createContext<any>({
  state: {},
  dispatch: (action: any) => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [stateCart, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        state: {},
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
