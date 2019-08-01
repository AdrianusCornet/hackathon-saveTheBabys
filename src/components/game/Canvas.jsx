import React, { Component } from 'react'
import InputManager from '../../managers/input'

export default class Canvas extends Component {
  state = {
    ctx: null,
    inputManager: new InputManager(),
    playerX: 0,
    playerY: 0,
  }

  mainLoop() {
    const ctx = this.state.ctx
    const {horizontal, vertical} = this.state.inputManager.movment

    this.state.inputManager.pollGamepad()

    // game logic
   
      this.setState({
        playerX: this.state.playerX + horizontal,
        playerY: this.state.playerY + vertical
      })
    // draw
    // -background
    ctx.beginPath()
    ctx.rect(0, 0, 900, 900)
    ctx.fillStyle = "#000000"
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
    this.state.inputManager.initEventLiseners()

    // set up game
    const ctx = this.refs.myCanvas.getContext('2d')

    this.setState({
      ctx
    })

    requestAnimationFrame(() => this.mainLoop())
  }

  render() {
    return (
      <canvas ref='myCanvas'
        width={900}
        height={900}
      />
    )
  }
}
