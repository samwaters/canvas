import * as React from 'react'
import styled from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useEffect, useRef, useState} from "react";

const S = {
    Canvas: styled.canvas``,
    Container: styled.div``
}

export const FPSChart = () => {
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fpsHistory = useSelector((state: RootState) => state.fps.fpsHistory)

    useEffect(() => {
        setCanvasContext(canvasRef.current.getContext("2d"))
    })

    useEffect(() => {
        if(canvasContext !== null) {
            drawGraph()
        }
    }, [canvasContext])

    const drawGraph = () => {
        canvasContext.fillStyle = 'white'
        canvasContext.fillRect(0, 0, 250, 150)

        canvasContext.font = "10px serif"
        canvasContext.strokeStyle = "black"
        // Axis lines
        canvasContext.beginPath()
        canvasContext.moveTo(30, 30)
        canvasContext.lineTo(30, 130)
        canvasContext.lineTo(230, 130)
        canvasContext.stroke()
        // Side lines
        for(let i = 0; i < 5; i++) {
            canvasContext.beginPath()
            canvasContext.moveTo(25, (i * 20) + 30)
            canvasContext.lineTo(30, (i * 20) + 30)
            canvasContext.stroke()
            canvasContext.strokeText(`${100 - (i * 20)}`,5, (i * 20) + 33)
        }
        // Grid lines
        canvasContext.strokeStyle = "#dddddd"
        for(let i = 0; i < 10; i ++) {
            canvasContext.beginPath()
            canvasContext.moveTo(30, (i * 10) + 30)
            canvasContext.lineTo(230, (i * 10) + 30)
            canvasContext.stroke()
        }
    }

    return <S.Container>
        <S.Canvas height={150} ref={canvasRef} width={250}/>
    </S.Container>
}