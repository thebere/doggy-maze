import React from 'react';

import utils from '../utils';
import DoggyMazeContext from '../context';

export default function MatrixSetup() {
  const context = React.useContext(DoggyMazeContext);
  const { dispatch } = context;


  function setY(e) {
    dispatch({
      type: 'SET_DIMENSION_X',
      colSize: Math.abs(parseInt(e.target.value, 10)),
    });
  }

  function setX(e) {
    dispatch({
      type: 'SET_DIMENSION_Y',
      rowSize: Math.abs(parseInt(e.target.value, 10)),
    });
  }

  function onStart(e) {
    e.preventDefault();

    const { rowSize, colSize } = context;

    if (!rowSize || !colSize) return;

    const position = [
      Math.round(colSize / 2),
      Math.round(rowSize / 2),
    ];

    const matrix = utils.range(rowSize).map((_, i) => utils.range(colSize).map((v, x) => utils.randNum()));
    matrix[position[1]][position[0]] = 0;

    const intialFoodCount = utils.countOneInMatrix(matrix);

    dispatch({
      type: 'INITIALIZE_BOARD',
      newState: {
        matrix,
        intialFoodCount,
        totalFoodCount: intialFoodCount,
        position,
      }
    })
  }

  if (context.matrix.length) return null;

  return (
    <form onSubmit={onStart} className="doggymazeform">
      <label htmlFor="column">Enter column size:</label>
      <input name="column" className="input-number" onChange={setY} type="number" max="30" />

      <br />
      <br />
      <br />

      <label htmlFor="row">Enter row size:</label>
      <input name="row" className="input-number" onChange={setX} type="number" max="30" />


      <br />
      <br />
      <br />
      <button className="start-btn" type="submit">Start</button>
    </form>
  )
}
