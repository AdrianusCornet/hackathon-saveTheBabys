import React, { Component } from 'react'
import { handleKeyDown, handleKeyUp, horizontal, vertical, pollGamepad, gamePadConnect, gamePadDisconnect } from '../../managers/input'

export default class Canvas extends Component {
  state = {
    ctx: null,
    playerX: 0,
    playerY: 0,
  }

  mainLoop() {
    const ctx = this.state.ctx
    pollGamepad()

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

  inputSetup() {
    window.addEventListener('keydown', event => {
      handleKeyDown(event)
    })
    window.addEventListener('keyup', event => {
      handleKeyUp(event)
    })
    gamePadConnect()
    gamePadDisconnect()
  }

  componentDidMount() {
    this.inputSetup()

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
