import { ext } from '@antv/matrix-util';

const {transform}=ext

// Second parameter imageCircleConfig's format should be:
// imageCircleConfig = {
//     x : x coordinate
//     y : y coordinate
//     r : raius of circle
//     shadowColor
// }
export function getImageCircle(canvas,imageCircleConfig) {
    const shadowConfig = (imageCircleConfig && imageCircleConfig.shadowColor)?{
        shadowColor,
        shadowBlur: 16
    } : {}
    // using g-canvas to create a circle
    canvas.addShape('circle',{
        attrs:{
            x,
            y,
            r,
            fill: '#262626',
            ...shadowConfig
        }
    })
    const shape=canvas.addShape('image', {
        attrs: {
            // (x-r,y-r) is the coordinate of upper-left corner
            x: x - r,
            y: y - r,
            width: 2 * r,
            height: 2 * r,
            img: `https://source.unsplash.com/random/${2 * r}x${2 * r}?Nature`
        }
    })
    // should also clip the image to circle to fit the circle
    shape.setClip({
        type: 'circle',
        attrs: {
          x,
          y,
          r
        }
    })

    // keep the image circling during playing music
    // set the circling animation
    // Rotation animation cannot be simulated by basic properties directly. 
    // Matrix transformation is used here. shape.getMatrix() is used to obtain the initial matrix, 
    // and then the matrix corresponding to each ratio is calculated by transform.
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