import React, { Component } from 'react'
import InputManager from '../../managers/input'

export default class Canvas extends Component {
  state = {
    ctx: null,
    inputManager: new InputManager(),
    playerX: 0,
    playerY: 0,
    screanX: null,
    screenY: null,
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
    ctx.rect(0, 0, this.state.screanX, this.state.screenY)
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
      screanX: window.innerWidth - 0,
      screenY: window.innerHeight - 3,
    })

    requestAnimationFrame(() => this.mainLoop())
  }

  render() {
    console.log('X', this.state.screanX, 'Y', this.state.screenY)
    return (
      <canvas ref='myCanvas'
        width={this.state.screanX}
        height={this.state.screenY}
      />
    )
  }
}
