import React, { Component, useEffect } from "react";
import { Canvas } from "@antv/g-canvas";

const X = 150;
const Y = 150;
const R = 80;

const PONINT_NUM = 64;
const RECT_WIDTH = 4;

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
    this.circle = this.canvas.addShape("circle", {
      attrs: {
        x: X,
        y: Y,
        r: R,
        fill: "red",
      },
    });

    this.lineArray = Array.from({ length: PONINT_NUM }, (v, i) => {
      const degree = (360 / PONINT_NUM) * i - 150;
      const l = Math.cos((degree * Math.PI) / 180);
      const t = Math.sin((degree * Math.PI) / 180);
      const r = 80 + 10;

      return this.canvas.addShape("line", {
        attrs: {
          width: RECT_WIDTH,
          height: RECT_WIDTH,
          x: X + l * r - RECT_WIDTH / 2,
          y: Y + t * r - RECT_WIDTH / 2,
          fill: "gray",
        },
      }).rotateAtPoint(X + l * r, Y + t * r, (degree - 90) * Math.PI / 180);
    });

    if (this.props.data && this.props.data.length > 0) {
      const data = this.filterArray(this.props.data);
      data.map((item, index) => {
        this.lineArray[index].attr("height", item * item / 65025 * 50 + RECT_WIDTH);
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