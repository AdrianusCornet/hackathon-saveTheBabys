import React, { Component } from 'react'

export default class Canvas extends Component {
  state ={
    ctx: null
  }

  update() {
    const ctx = this.state.ctx

    ctx.beginPath();
    ctx.rect(20, 40, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

    requestAnimationFrame(() => this.update())
  }

  componentDidMount() {
    const ctx = this.refs.myCanvas.getContext('2d')

    this.setState({
      ctx
    })

    requestAnimationFrame(() => this.update())
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
