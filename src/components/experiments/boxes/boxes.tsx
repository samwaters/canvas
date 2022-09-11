import * as React from 'react'
import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import {ShapeManager} from "components/experiments/boxes/shapeManager";
import {FPS} from "../../../util/fps";

const S = {
    Canvas: styled.canvas`
      border: 1px solid black;
    `,
    Container: styled.div`
      height: 480px;
      margin: 10px auto 0 auto;
      width: 640px;
    `
}

interface ExperimentWindow extends Window {
    boxesActive?: boolean
}

export const Boxes = () => {
    const win: ExperimentWindow = window
    win.boxesActive = true
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>(null)
    const fpsManager = new FPS()
    let lastFrameDrawnAt: DOMHighResTimeStamp = null
    const shapeManager = new ShapeManager()
    shapeManager.addDefaultShapes()

    // Helpers
    const clearCanvas = () => {
        canvasContext.fillStyle = 'white'
        canvasContext.fillRect(0, 0, 640, 480)
    }
    const pageVisibilityHandler = () => {
        if(document.hidden) {
            fpsManager.stop()
            win.boxesActive = false
        } else {
            lastFrameDrawnAt = null
            fpsManager.start()
            win.boxesActive = true
            // window.requestAnimationFrame(animateFn)
        }
    }

    /**
     * The animate fn
     * 640 in 2 seconds = 640 / 2000 = 0.32 per ms
     * 480 in 2 seconds = 480 / 2000 = 0.24 per ms
     */
    const animateFn = (ts: DOMHighResTimeStamp) => {
        if(!lastFrameDrawnAt) {
            lastFrameDrawnAt = ts
        }
        // Time in ms since the last frame draw
        const msSinceLastDraw = ts - lastFrameDrawnAt
        lastFrameDrawnAt = ts
        clearCanvas()
        shapeManager.getShapes().forEach((shape, index) => {
            // Calculate new positions
            const newX = shape.x + ((msSinceLastDraw * shape.speed.lr) * shape.direction.lr)
            const newY = shape.y + ((msSinceLastDraw * shape.speed.ud) * shape.direction.ud)
            // Are we out of bounds?
            const newLRDirection =
                newX <= 0 ? 1 :
                (newX + shape.size) >= 640 ? -1 :
                    shape.direction.lr
            const newUDDirection =
                newY <= 0 ? 1 :
                (newY + shape.size) >= 480 ? -1 :
                    shape.direction.ud
            // Update the shape
            shapeManager.updateShape(index, newX, newY, newLRDirection, newUDDirection)
            // Aaaand draw it
            canvasContext.fillStyle = shape.color
            canvasContext.fillRect(
                Math.floor(newX), // Round down, but only for drawing
                Math.floor(newY),
                shape.size,
                shape.size
            )
        })
        fpsManager.frameDrawn()
        if(win.boxesActive) {
            window.requestAnimationFrame(animateFn)
        }
    }

    useEffect(() => {
        if(canvasContext !== null) {
            fpsManager.start()
            window.requestAnimationFrame(animateFn)
        }
    }, [canvasContext])

    // Run once on render to set context
    useEffect(() => {
        document.addEventListener("visibilitychange", pageVisibilityHandler)
        setCanvasContext(canvasRef.current.getContext("2d"))
        // Unmount
        return () => {
            document.removeEventListener("visibilitychange", pageVisibilityHandler)
            fpsManager.stop()
            win.boxesActive = false
        }
    })

    return <S.Container>
        <S.Canvas height={480} ref={canvasRef} width={640} />
    </S.Container>
}