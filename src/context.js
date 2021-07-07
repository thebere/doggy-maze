import React from 'react';

import reducer, { initialState } from './reducer';

const DoggyMazeContext = React.createContext();

DoggyMazeContext.displayName = 'DoggyMazeContext';

function DoggyMazeProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <DoggyMazeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DoggyMazeContext.Provider>
  )
}

export default DoggyMazeContext;
export {
  DoggyMazeProvider,
}
