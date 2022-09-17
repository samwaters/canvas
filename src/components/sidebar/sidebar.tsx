import * as React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Routes as RoutesList } from '../../routes'
import styled from 'styled-components'
import { RootState } from '../../store'
import { FPSChart } from 'components/sidebar/fpschart'
import { BoxesControls } from 'components/experiments/boxes/controls'

const S = {
    CurrentFPS: styled.div`
        span {
            color: green;
            font-family: monospace;
            font-weight: bold;
        }
    `,
    SidebarContainer: styled.div``,
    Section: styled.div`
        margin-bottom: 10px;
    `,
    SectionHeading: styled.h3`
        background-color: #999fa5;
        color: white;
        padding: 5px 0 5px 10px;
    `,
    SectionInner: styled.div`
        padding: 10px;
    `,
}

export const Sidebar = () => {
    const currentFPS = useSelector((state: RootState) => state.fps.currentFPS)
    return (
        <S.SidebarContainer>
            <S.Section>
                <S.SectionHeading>Frames Per Second</S.SectionHeading>
                <S.SectionInner>
                    <FPSChart />
                    <S.CurrentFPS>
                        Current FPS: <span>{currentFPS}</span>
                    </S.CurrentFPS>
                </S.SectionInner>
            </S.Section>
            <Routes>
                <Route path={RoutesList.BOXES} element={<BoxesControls />} />
            </Routes>
        </S.SidebarContainer>
    )
}
