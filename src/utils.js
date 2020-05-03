function range(count) {
  return Array.from(Array(count));
}

function randNum(max = 1) {
  return Math.round(Math.random() * max);
}

function countOneInMatrix(matrix) {
  return matrix.reduce((acc, row) => {
    return row.reduce((totalFood, food) => {
      return totalFood + food;
    }, acc);
  }, 0);
}

export default {
  range,
  randNum,
  countOneInMatrix
}
