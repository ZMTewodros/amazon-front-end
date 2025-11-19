import React, { createContext, useReducer } from 'react';
// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext();

export const DataProvider = ({ children, reducer, initialState }) => (
  <DataContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataContext.Provider>
);

