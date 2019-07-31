import React, { Component } from 'react'

export default class Canvas extends Component {
  state = {
    ctx: null,
    key: false,
    x: 0,
  }

  mainLoop() {
    const ctx = this.state.ctx

    if (this.state.key) {
      ctx.beginPath();
      ctx.rect(this.state.x, 40, 50, 50);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
      ctx.closePath();

      this.setState({ x: this.state.x + 10 })
    } else {
      ctx.beginPath();
      ctx.rect(this.state.x, 40, 50, 50);
      ctx.fillStyle = "#000000";
      ctx.fill();
      ctx.closePath();
    }

    requestAnimationFrame(() => this.mainLoop())
  }

  componentDidMount() {
    // set up input
    window.addEventListener('keydown', event => {

      console.log('key code:', event.keyCode)

      if (event.keyCode === 32) {
        this.setState({
          key: true
        })
      }
    })
    window.addEventListener('keyup', event => {
      if (event.keyCode === 32) {
        this.setState({
          key: false
        })
      }
    })

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
        width={1000}
        height={1000}
      />
    )
  }
}
