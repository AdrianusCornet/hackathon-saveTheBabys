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
const DEAT_ZONE = 0.15

export class InputManager {
  constructor() {
    this.movment = {
      horizontal: 0,
      vertical: 0,
    }
  }
}

const directions = {
  left: 0,
  richt: 0,
  down: 0,
  up: 0,
}
let horizontal = 0
let vertical = 0
let gamepadIsConnected = false

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
function gamePadConnect() {
  window.addEventListener('gamepadconnected', event => {
    gamepadIsConnected = true
  })
}
function gamePadDisconnect() {
  window.addEventListener('gamepaddisconnected', event => {
    gamepadIsConnected = false
  })
}

function pollGamepad() {
  if(gamepadIsConnected) {
    const gpAxes = navigator.getGamepads()[0].axes
    const hAxe = deatZone(gpAxes[0])
    const vAxe = deatZone(gpAxes[1])
    horizontal = Math.round(hAxe * MOVE_SPEED)
    vertical = Math.round(vAxe * MOVE_SPEED)
  }
}
function deatZone(axe) {
  if(axe < DEAT_ZONE && axe > -DEAT_ZONE) {
    return 0
  }
  return axe
}

function calculateHorizontal() {
  horizontal = (-directions.left + directions.richt) * MOVE_SPEED
}
function calculateVertical() {
  vertical = (-directions.up + directions.down) * MOVE_SPEED
}


export { horizontal, vertical, handleKeyDown, handleKeyUp, gamePadConnect, gamePadDisconnect, pollGamepad }