import utils from './utils';


const columnCount = parseInt(prompt('Enter number of columns: ', 10)) || 10; // x axis
const rowCount = parseInt(prompt('Enter number of rows: '), 10) || 10; // y axis

// For each row, generate columns
const matrix = utils.range(rowCount).map((_, i) => utils.range(columnCount).map((v, x) => utils.randNum())); // [[0,1,1], [1,0,1], [1,1,0],[0,0,0]]
const initalPosition = [ // current position [x axis, y axis]
  Math.round(columnCount / 2),
  Math.round(rowCount / 2),
];

matrix[initalPosition[1]][initalPosition[0]] = 0;

const initialState = {
  matrix,
  position: initalPosition,
  moveCount: 0,
  totalFoodCount: countFoodOnBoard(matrix),
  intialFoodCount: countFoodOnBoard(matrix),
}

const canMoveLeft = position => !(position[0] <= 0);
const canMoveUp = position => !(position[1] <= 0);
const canMoveRight = position => !(position[0] >= columnCount - 1);
const canMoveDown = position => !(position[1] >= rowCount - 1);

function moveLeft(position) {
  if (canMoveLeft(position)) return [position[0] - 1, position[1]];
  return position;
}

function moveRight(position) {
  if (canMoveRight(position)) return [position[0] + 1, position[1]];
  return position;
}

function moveDown(position) {
  if (canMoveDown(position)) return [position[0], position[1] + 1];
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

function countFoodOnBoard(matrix) {
  return matrix.reduce((acc, row) => {
    return row.reduce((totalFood, food) => {
      return totalFood + food;
    }, acc);
  }, 0);
}

export default function reducer(state = initialState, action) {
  let position = state.position;
  let canMove = false;

  switch (action.type) {
    case 'ArrowLeft':
      position = moveLeft(state.position);
      canMove = canMoveLeft(state.position);

      return getNewState(state, canMove, position);
    case 'ArrowUp':
      position = moveUp(state.position);
      canMove = canMoveUp(state.position);

      return getNewState(state, canMove, position);
    case 'ArrowRight':
      position = moveRight(state.position);
      canMove = canMoveRight(state.position);

      return getNewState(state, canMove, position);
    case 'ArrowDown':
      position = moveDown(state.position);
      canMove = canMoveDown(state.position);

      return getNewState(state, canMove, position);
    default:
      return state;
  }
}

export { initialState };
