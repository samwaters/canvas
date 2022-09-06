import { FPS } from "./fps";

const canvas: HTMLCanvasElement = (document.getElementById("canvas") as HTMLCanvasElement)
const context = canvas.getContext("2d")

const clearCanvas = () => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, 640, 480)
}

const fps = new FPS()
fps.start()

clearCanvas()
context.fillStyle = 'green'
// context.translate(100, 100)
context.fillRect(10, 10, 50, 50)