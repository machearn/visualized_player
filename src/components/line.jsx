import React, { Component } from "react";
import { Canvas } from "@antv/g-canvas";
import getImageCircle from "../utils/RotatingImage"

const X = 150;
const Y = 150;
const R = 80;

const PONINT_NUM = 64;
const RECT_WIDTH = 4;
const RECT_COLOR = '#e9dcf7';
const OFFSET = 10;

class Line extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.canvas = new Canvas({
      container: "Line",
      width: 2 * X,
      height: 2 * Y,
    });

    this.circle = getImageCircle(this.canvas, X, Y, R, RECT_COLOR);

    this.lineArray = Array.from({ length: PONINT_NUM }, (v, i) => {
      const degree = (360 / PONINT_NUM) * i - 150;
      const l = Math.cos((degree * Math.PI) / 180);
      const t = Math.sin((degree * Math.PI) / 180);
      const r = R + OFFSET;

      return this.canvas.addShape("rect", {
        attrs: {
          width: RECT_WIDTH,
          height: RECT_WIDTH,
          radius: RECT_WIDTH / 2,
          x: X + l * r - RECT_WIDTH / 2,
          y: Y + t * r - RECT_WIDTH / 2,
          fill: RECT_COLOR,
        },
      }).rotateAtPoint(X + l * r, Y + t * r, (degree - 90) * Math.PI / 180);
    });

    if (this.props.data && this.props.data.length > 0) {
      const data = this.filterArray(this.props.data);
      data.map((item, index) => {
        this.lineArray[index].attr("height", item * item / 65025 * 50 + RECT_WIDTH);
      });
    }

    if (this.props.isPlaying !== undefined) {
      setTimeout(() => {
        if (this.props.isPlaying) {
          this.circle.resumeAnimate();
        } else {
          this.circle.pauseAnimate();
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data && this.props.data.length > 0 && this.props.data !== prevProps.data) {
      const data = this.filterArray(this.props.data);
      data.map((item, index) => {
        this.lineArray[index].attr("height", item * item / 65025 * 50 + RECT_WIDTH);
      });
    }

    if (this.props.isPlaying !== undefined && this.props.isPlaying !== prevProps.isPlaying) {
      setTimeout(() => {
        if (this.props.isPlaying) {
          this.circle.resumeAnimate();
        } else {
          this.circle.pauseAnimate();
        }
      });
    }
  }

  filterArray(arr) {
    const newArr = arr.reduce((prev, curr, index) => {
      if (index % 2 === 0) {
        prev.push(curr);
      }
      return prev;
    }, []);
    return newArr;
  }

  render() {
    return (
      <div>
        <div id="Line"></div>
      </div>
    )
  }
}

export default Line;