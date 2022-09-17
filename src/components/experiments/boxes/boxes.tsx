import * as React from 'react'
import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import { ShapeManager } from 'components/experiments/boxes/shapeManager'
import { FPS } from '../../../util/fps'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { disable, enable } from 'store/boxes.store'

const S = {
    Canvas: styled.canvas`
        border: 1px solid black;
    `,
    Container: styled.div`
        height: 480px;
        margin: 10px auto 0 auto;
        width: 640px;
    `,
}

export const Boxes = () => {
    const active: boolean = useSelector((state: RootState) => state.boxes.enabled)
    const animationRef = useRef<boolean>()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const canvasContextRef = useRef<CanvasRenderingContext2D>(null)
    const lastFrameDrawnAtRef = useRef<DOMHighResTimeStamp>(null)
    const dispatch = useDispatch()
    const fpsManager = new FPS()
    const shapeManager = new ShapeManager()
    shapeManager.addDefaultShapes()

    // Helpers
    const clearCanvas = () => {
        canvasContextRef.current.fillStyle = 'white'
        canvasContextRef.current.fillRect(0, 0, 640, 480)
    }
    const pageVisibilityHandler = () => {
        if (document.hidden) {
            dispatch(disable())
        } else {
            setTimeout(() => {
                dispatch(enable())
            }, 50)
        }
    }

    /**
     * The animate fn
     * 640 in 2 seconds = 640 / 2000 = 0.32 per ms
     * 480 in 2 seconds = 480 / 2000 = 0.24 per ms
     */
    const animateFn = (ts: DOMHighResTimeStamp) => {
        if (!lastFrameDrawnAtRef.current) {
            lastFrameDrawnAtRef.current = ts
        }
        // Time in ms since the last frame draw
        const msSinceLastDraw = ts - lastFrameDrawnAtRef.current
        lastFrameDrawnAtRef.current = ts
        clearCanvas()
        shapeManager.getShapes().forEach((shape, index) => {
            // Calculate new positions
            const newX = shape.x + msSinceLastDraw * shape.speed.lr * shape.direction.lr
            const newY = shape.y + msSinceLastDraw * shape.speed.ud * shape.direction.ud
            // Are we out of bounds?
            const newLRDirection = newX <= 0 ? 1 : newX + shape.size >= 640 ? -1 : shape.direction.lr
            const newUDDirection = newY <= 0 ? 1 : newY + shape.size >= 480 ? -1 : shape.direction.ud
            // Update the shape
            shapeManager.updateShape(index, newX, newY, newLRDirection, newUDDirection)
            // Aaaand draw it
            canvasContextRef.current.fillStyle = shape.color
            canvasContextRef.current.fillRect(
                Math.floor(newX), // Round down, but only for drawing
                Math.floor(newY),
                shape.size,
                shape.size
            )
        })
        fpsManager.frameDrawn()
        if (animationRef.current) {
            window.requestAnimationFrame(animateFn)
        }
    }

    // Need to keep updating the canvas context if we re-render
    useEffect(() => {
        canvasContextRef.current = canvasRef.current.getContext('2d')
    }, [canvasRef.current])

    useEffect(() => {
        if (!animationRef.current && active && canvasContextRef.current) {
            lastFrameDrawnAtRef.current = null
            fpsManager.start()
            window.requestAnimationFrame(animateFn)
        }
        if (!active) {
            fpsManager.stop()
            lastFrameDrawnAtRef.current = null
        }
        animationRef.current = active
    }, [active, canvasContextRef.current])

    // Run once on render to set context
    useEffect(() => {
        document.addEventListener('visibilitychange', pageVisibilityHandler)
        dispatch(enable())
        // Unmount
        return () => {
            document.removeEventListener('visibilitychange', pageVisibilityHandler)
            fpsManager.stop()
            dispatch(disable())
        }
    }, [])

    return (
        <S.Container>
            <S.Canvas height={480} ref={canvasRef} width={640} />
        </S.Container>
    )
}
