import React, { Component } from 'react'
import InputManager from '../../managers/input'

const PLAYER_SIZE = 100

export default class Canvas extends Component {
  state = {
    ctx: null,
    inputManager: new InputManager(),
    playerX: 0,
    playerY: 0,
    screenX: null,
    screenY: null,
  }

  mainLoop() {
    const ctx = this.state.ctx
    const {horizontal, vertical} = this.state.inputManager.movment

    this.state.inputManager.pollGamepad()

    // game logic
      let playerX = this.state.playerX + horizontal
      let playerY = this.state.playerY + vertical

      if (playerX < 0) {
        playerX = 0
      }
      if(playerX + PLAYER_SIZE > this.state.screenX) {
        playerX = this.state.screenX - PLAYER_SIZE
      }

      if (playerY < 0) {
        playerY = 0
      }
      if(playerY + PLAYER_SIZE > this.state.screenY) {
        playerY = this.state.screenY - PLAYER_SIZE
      }
   
      this.setState({
        playerX,
        playerY,
      })
    // draw
    // -background
    ctx.beginPath()
    ctx.rect(0, 0, this.state.screenX, this.state.screenY)
    ctx.fillStyle = "#0000ff"
    ctx.fill()
    ctx.closePath()
    // -player
    ctx.beginPath()
    ctx.rect(this.state.playerX, this.state.playerY, 100, 100)
    ctx.fillStyle = "#ff0000"
    ctx.fill()
    ctx.closePath()

    requestAnimationFrame(() => this.mainLoop())
  }
  componentDidMount() {
    // set up game
    const ctx = this.refs.myCanvas.getContext('2d')
    
    this.state.inputManager.initEventLiseners()

    this.setState({
      ctx,
      screenX: window.innerWidth - 0,
      screenY: window.innerHeight - 3,
    })

    requestAnimationFrame(() => this.mainLoop())
  }

  render() {
    console.log('X', this.state.screenX, 'Y', this.state.screenY)
    return (
      <canvas ref='myCanvas'
        width={this.state.screenX}
        height={this.state.screenY}
      />
    )
  }
}
