import { FPS } from "./fps";

const canvas: HTMLCanvasElement = (document.getElementById("canvas") as HTMLCanvasElement)
const context = canvas.getContext("2d")

const clearCanvas = () => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, 640, 480)
}

const fps = new FPS()
fps.start()

let lastFrameDrawnAt: DOMHighResTimeStamp
const rectData = [{
    color: 'green',
    direction: {
        lr: 1,
        ud: 1
    },
    size: 50,
    speed: {
        lr: 640 / 10000,
        ud: 480 / 10000,
    },
    x: 10,
    y: 10,
}, {
    color: 'red',
    direction: {
        lr: 1,
        ud: 1
    },
    size: 75,
    speed: {
        lr: 640 / 8000,
        ud: 480 / 8000,
    },
    x: 80,
    y: 300,
},{
    color: 'blue',
    direction: {
        lr: 1,
        ud: 1
    },
    size: 30,
    speed: {
        lr: 640 / 4000,
        ud: 480 / 4000,
    },
    x: 250,
    y: 400,
}]

const animateFn = (ts: DOMHighResTimeStamp) => {
    if(!lastFrameDrawnAt) {
        lastFrameDrawnAt = ts
    }
    // Time in ms since the last frame draw
    const msSinceLastDraw = ts - lastFrameDrawnAt
    lastFrameDrawnAt = ts
    /*
        640 in 2 seconds = 640 / 2000 = 0.32 per ms
        480 in 2 seconds = 480 / 2000 = 0.24 per ms
        Multiply by the lr / ud value to make a +/- value
     */
    clearCanvas()
    rectData.forEach((rect, i) => {
        // Calculate the new positions
        rectData[i].x += ((msSinceLastDraw * rect.speed.lr) * rect.direction.lr)
        rectData[i].y += ((msSinceLastDraw * rect.speed.ud) * rect.direction.ud)
        // Check whether we're oob and flip if needed
        if(rectData[i].x < 0 || rectData[i].x + rect.size > 640)
            rectData[i].direction.lr *= -1
        if(rectData[i].y < 0 || rectData[i].y + rect.size > 480)
            rectData[i].direction.ud *= -1
        // Now draw it
        context.fillStyle = rect.color
        context.fillRect(
            Math.floor(rectData[i].x), // Round down, but only for drawing
            Math.floor(rectData[i].y),
            rect.size,
            rect.size
        )
    })
    fps.frameDrawn()
    window.requestAnimationFrame(animateFn)
}

// Aaaaand off we go
window.requestAnimationFrame(animateFn)
