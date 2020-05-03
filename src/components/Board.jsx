import React from 'react';
import Row from './Row';

import DoggyMazeContext from '../context';

export default function Board() {
  const boardRef = React.useRef();
  const context = React.useContext(DoggyMazeContext);
  const { dispatch } = context;

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
        context.totalFoodCount <= 0
          ? <h4>Total moves: {context.moveCount}; Total meat bone: {context.intialFoodCount}</h4>
          : ''
      }

      <div className="navigation-btns">
        <div className="btn-row">
          <div className="nav-btn up-arr" onClick={() => dispatch({ type: 'ArrowUp' })}>
            {"^"}
          </div>
        </div>

        <div className="btn-row space-btw">
          <div className="nav-btn left-arr" onClick={() => dispatch({ type: 'ArrowLeft' })}>
            {"<"}
          </div>

          <div className="nav-btn right-arr" onClick={() => dispatch({ type: 'ArrowRight' })}>
            {">"}
          </div>
        </div>

        <div className="btn-row">
          <div className="nav-btn down-arr" onClick={() => dispatch({ type: 'ArrowDown' })}>
            {"V"}
          </div>
        </div>
      </div>

      <div className="board" ref={boardRef} tabIndex="0">
        {
          context.matrix.length
            ? context.matrix.map((list, index) => (
              <Row
                key={index}
                position={index === context.position[1] ? context.position : null}
                list={list}
              />
            ))
            : null
        }
      </div>
    </>
  )
}
