import React from 'react';
import './App.css';
import Board from './components/Board';
import MatrixSetup from './components/MaxtrixSetup';
import { DoggyMazeProvider } from './context';

function App() {
  return (
    <div className="app">
      <DoggyMazeProvider>
        {() => (
          <>
            <MatrixSetup />
            <Board />
          </>
        )}
      </DoggyMazeProvider>
    </div>
  );
}

export default App;
