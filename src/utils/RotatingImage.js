import { ext } from '@antv/matrix-util';

const { transform } = ext

export default function getImageCircle(canvas, x, y, r, shadowColor) {
  const shadowConfig = shadowColor ? {
    shadowColor,
    shadowBlur: 16
  } : {}

  canvas.addShape('circle', {
    attrs: {
      x,
      y,
      r,
      fill: '#262626',
      ...shadowConfig
    }
  })
  const shape = canvas.addShape('image', {
    attrs: {
      x: x - r,
      y: y - r,
      width: 2 * r,
      height: 2 * r,
      img: `https://source.unsplash.com/random/${2 * r}x${2 * r}?Nature`
    }
  })

  shape.setClip({
    type: 'circle',
    attrs: {
      x,
      y,
      r
    }
  })

  const matrix = shape.getMatrix()
  const radian = 2 * Math.PI
  shape.animate((ratio) => {
    return {
      matrix: transform(matrix, [
        ['t', -x, -y],
        ['r', radian * ratio],
        ['t', x, y],
      ])
    }
  }, {
    duration: 10000,
    repeat: true
  })
  setTimeout(() => {
    shape.pauseAnimate()
  })

  return shape
}