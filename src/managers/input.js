const KEY = {
  LEFT: 37,
  RICHT: 39,
  DOWN: 40,
  UP: 38,
  W: 87,
  A: 65,
  S: 83,
  D: 68,
}
const MOVE_SPEED = 10
const directions = {
  left: 0,
  richt: 0,
  down: 0,
  up: 0,
}
let horizontal = 0
let vertical = 0

function handleKeyDown(event) {
  switch (event.keyCode) {
    case KEY.LEFT:
    case KEY.A:
      directions.left = 1
      calculateHorizontal()
      break;
    case KEY.RICHT:
    case KEY.D:
      directions.richt = 1
      calculateHorizontal()
      break;
    case KEY.UP:
    case KEY.W:
      directions.up = 1
      calculateVertical()
      break;
    case KEY.DOWN:
    case KEY.S:
      directions.down = 1
      calculateVertical()
      break;

    default:
      break;
  }
}
function handleKeyUp(event) {
  switch (event.keyCode) {
    case KEY.LEFT:
    case KEY.A:
      directions.left = 0
      calculateHorizontal()
      break;
    case KEY.RICHT:
    case KEY.D:
      directions.richt = 0
      calculateHorizontal()
      break;
    case KEY.UP:
    case KEY.W:
      directions.up = 0
      calculateVertical()
      break;
    case KEY.DOWN:
    case KEY.S:
      directions.down = 0
      calculateVertical()
      break;

    default:
      break;
  }
}

function calculateHorizontal() {
  horizontal = (-directions.left + directions.richt) * MOVE_SPEED
}
function calculateVertical() {
  vertical = (-directions.up + directions.down) * MOVE_SPEED
}

export { horizontal, vertical, handleKeyDown, handleKeyUp }