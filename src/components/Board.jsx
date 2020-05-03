import React from 'react';
import Row from './Row';

import reducer, { initialState } from '../reducer';

export default function Board() {
  const boardRef = React.useRef();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    boardRef.current.focus();
    boardRef.current.addEventListener('keydown', e => {
      dispatch({
        type: e.key,
      });
    });
  }, []);


  return (
    <>
      {
        state.totalFoodCount <= 0
          ? <h4>Total moves: {state.moveCount}; Total meat bone: {state.intialFoodCount}</h4>
          : ''
      }

      <div className="board" ref={boardRef} tabIndex="0">
        {state.matrix.map((list, index) => (
          <Row
            key={index}
            position={index === state.position[1] ? state.position : null}
            list={list}
          />
        ))}
      </div>
    </>
  )
}
