function range(count) {
  return Array.from(Array(count));
}

function randNum(max = 1) {
  return Math.round(Math.random() * max);
}

export default {
  range,
  randNum
}
