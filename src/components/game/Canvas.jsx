import React, { Component } from 'react'

export default class Canvas extends Component {
  ctx

  componentDidMount() {
    this.ctx = this.refs.myCanvas.getContext('2d')
    this.ctx.fillRect(0,0, 100, 100);
  }
  render() {
    return (
      <canvas ref='myCanvas' />
    )
  }
}
