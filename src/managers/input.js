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
const INITIAL_MOVE_SPEED = 10
const INITIAL_DEATH_ZONE = 0.15

export default class InputManager {
  constructor() {
    this.movment = {
      horizontal: 0,
      vertical: 0,
    }
    this._directions = {
      left: 0,
      richt: 0,
      down: 0,
      up: 0,
    }
    this._movementSpeed = INITIAL_MOVE_SPEED
    this._deathZone = INITIAL_DEATH_ZONE
    this._gamepadIsConnected = false
  }

  initEventLiseners() {
    window.addEventListener('keydown', event => {
      this.handleKeyDown(event)
    })
    window.addEventListener('keyup', event => {
      this.handleKeyUp(event)
    })
    window.addEventListener('gamepadconnected', event => {
      this._gamepadIsConnected = true
    })
    window.addEventListener('gamepaddisconnected', event => {
      this._gamepadIsConnected = false
    })
  }
  pollGamepad() {
    if (this._gamepadIsConnected) {
      const gpAxes = navigator.getGamepads()[0].axes
      const hAxe = this.aplayDeathZone(gpAxes[0])
      const vAxe = this.aplayDeathZone(gpAxes[1])
      this.movment.horizontal = Math.round(hAxe * this._movementSpeed)
      this.movment.vertical = Math.round(vAxe * this._movementSpeed)
    }
  }
  aplayDeathZone(axe) {
    if (axe < this._deathZone && axe > -this._deathZone) {
      return 0
    }
    return axe
  }

  handleKeyDown(event) {
    if(this._gamepadIsConnected) {
      return
    }
    switch (event.keyCode) {
      case KEY.LEFT:
      case KEY.A:
        this._directions.left = 1
        this.calculateHorizontal()
        break;
      case KEY.RICHT:
      case KEY.D:
        this._directions.richt = 1
        this.calculateHorizontal()
        break;
      case KEY.UP:
      case KEY.W:
        this._directions.up = 1
        this.calculateVertical()
        break;
      case KEY.DOWN:
      case KEY.S:
        this._directions.down = 1
        this.calculateVertical()
        break;
  
      default:
        break;
    }
  }
  handleKeyUp(event) {
    if(this._gamepadIsConnected) {
      return
    }
    switch (event.keyCode) {
      case KEY.LEFT:
      case KEY.A:
        this._directions.left = 0
        this.calculateHorizontal()
        break;
      case KEY.RICHT:
      case KEY.D:
        this._directions.richt = 0
        this.calculateHorizontal()
        break;
      case KEY.UP:
      case KEY.W:
        this._directions.up = 0
        this.calculateVertical()
        break;
      case KEY.DOWN:
      case KEY.S:
        this._directions.down = 0
        this.calculateVertical()
        break;
  
      default:
        break;
    }
  }

  calculateHorizontal() {
    this.movment.horizontal = (-this._directions.left + this._directions.richt) * this._movementSpeed
  }
  calculateVertical() {
    this.movment.vertical = (-this._directions.up + this._directions.down) * this._movementSpeed
  }
}