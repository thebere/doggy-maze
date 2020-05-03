const initialState = {
  colSize: 0,
  rowSize: 0,
  matrix: [],
  position: [],
  moveCount: 0,
  totalFoodCount: 0,
  intialFoodCount: 0,
}

const canMoveLeft = position => !(position[0] <= 0);
const canMoveUp = position => !(position[1] <= 0);
const canMoveRight = (position, colSize) => !(position[0] >= colSize - 1);
const canMoveDown = (position, rowSize) => !(position[1] >= (rowSize - 1));

function moveLeft(position) {
  if (canMoveLeft(position)) return [position[0] - 1, position[1]];
  return position;
}

function moveRight(position, colSize) {
  if (canMoveRight(position, colSize)) return [position[0] + 1, position[1]];
  return position;
}

function moveDown(position, rowSize) {
  if (canMoveDown(position, rowSize)) return [position[0], position[1] + 1];
  return position;
}

function moveUp(position) {
  if (canMoveUp(position)) return [position[0], position[1] - 1];
  return position;
}

function getNewState(state, canMove, newPosition) {
  const { totalFoodCount, moveCount, matrix } = state;
  let foodCount = totalFoodCount;
  let newMatrix = matrix;
  const canEat = canMove && foodCount >= 1;


  if (canEat) {
    newMatrix = matrix.map((row, index) => {
      if (index === newPosition[1]) {
        return row.map((value, colIndex) => {
          if (colIndex === newPosition[0] && value) {
            foodCount -= 1;

            return 0
          };

          return value;
        })
      }
      return row;
    });
  }

  return {
    ...state,
    matrix: newMatrix,
    moveCount: canEat ? moveCount + 1 : moveCount,
    totalFoodCount: foodCount,
    position: newPosition,
  };
}

export default function reducer(state = initialState, action) {
  let position = state.position;
  let canMove = false;

  switch (action.type) {
    case 'INITIALIZE_BOARD':
      return { ...state, ...action.newState };
    case 'SET_DIMENSION_X':
      return { ...state, colSize: action.colSize };
    case 'SET_DIMENSION_Y':
      return { ...state, rowSize: action.rowSize };

    case 'ArrowLeft':
      position = moveLeft(state.position);
      canMove = canMoveLeft(state.position);

      return getNewState(state, canMove, position);
    case 'ArrowUp':
      position = moveUp(state.position);
      canMove = canMoveUp(state.position);

      return getNewState(state, canMove, position);
    case 'ArrowRight':
      position = moveRight(state.position, state.colSize);
      canMove = canMoveRight(state.position, state.colSize);

      return getNewState(state, canMove, position);
    case 'ArrowDown':
      position = moveDown(state.position, state.rowSize);
      canMove = canMoveDown(state.position, state.rowSize);

      return getNewState(state, canMove, position);
    default:
      return state;
  }
}

export { initialState };
