import * as React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useEffect, useRef, useState } from 'react'

const S = {
    Canvas: styled.canvas``,
    Container: styled.div``,
}

export const FPSChart = () => {
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fpsHistory = useSelector((state: RootState) => state.fps.fpsHistory)

    useEffect(() => {
        setCanvasContext(canvasRef.current.getContext('2d'))
    })

    useEffect(() => {
        if (canvasContext !== null) {
            drawGraph()
        }
    }, [canvasContext, fpsHistory])

    const drawGraph = () => {
        canvasContext.fillStyle = 'white'
        canvasContext.fillRect(0, 0, 250, 150)

        canvasContext.font = '10px serif'
        canvasContext.strokeStyle = 'black'
        // Axis lines
        canvasContext.beginPath()
        canvasContext.moveTo(30, 30)
        canvasContext.lineTo(30, 130)
        canvasContext.lineTo(230, 130)
        canvasContext.stroke()
        // Side lines
        for (let i = 0; i < 5; i++) {
            canvasContext.beginPath()
            canvasContext.moveTo(25, i * 20 + 30)
            canvasContext.lineTo(30, i * 20 + 30)
            canvasContext.stroke()
            canvasContext.strokeText(`${100 - i * 20}`, 5, i * 20 + 33)
        }
        // Vertical lines
        for (let i = 0; i < 9; i++) {
            canvasContext.beginPath()
            canvasContext.moveTo(i * 20 + 50, 130)
            canvasContext.lineTo(i * 20 + 50, 135)
            canvasContext.stroke()
        }
        // Grid lines
        canvasContext.strokeStyle = '#dddddd'
        for (let i = 0; i < 10; i++) {
            canvasContext.beginPath()
            canvasContext.moveTo(30, i * 10 + 30)
            canvasContext.lineTo(230, i * 10 + 30)
            canvasContext.stroke()
        }
        // Plot the data
        let fpsArray: number[] = new Array(10 - fpsHistory.length).fill(0)
        fpsArray = fpsArray.concat(fpsHistory)
        canvasContext.fillStyle = 'blue'
        canvasContext.strokeStyle = 'blue'
        canvasContext.beginPath()
        fpsArray.forEach((fps, index) => {
            canvasContext.fillRect(index * 20 + 29, 29 + (100 - fps), 3, 3)
            // Draw the line
            if (index > 0) {
                canvasContext.lineTo(index * 20 + 30, 30 + (100 - fps))
            }
            // Now move
            canvasContext.moveTo(index * 20 + 30, 30 + (100 - fps))
        })
        canvasContext.stroke()
    }

    return (
        <S.Container>
            <S.Canvas height={150} ref={canvasRef} width={250} />
        </S.Container>
    )
}
