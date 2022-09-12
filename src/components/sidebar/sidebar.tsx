import * as React from 'react'
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Routes as RoutesList } from '../../routes';
import styled from "styled-components";
import { RootState } from "../../store";
import { FPSChart } from "components/sidebar/fpschart";
import {BoxesControls} from "components/experiments/boxes/controls";

const S = {
    CurrentFPS: styled.div`
      span {
        color: green;
        font-family: monospace;
        font-weight: bold;
      }
    `,
    SidebarContainer: styled.div``
}

export const Sidebar = () => {
    const currentFPS = useSelector((state: RootState) => state.fps.currentFPS)
    return <S.SidebarContainer>
        <FPSChart />
        <S.CurrentFPS>
            Current FPS: <span>{currentFPS}</span>
        </S.CurrentFPS>
        <Routes>
            <Route path={RoutesList.BOXES} element={<BoxesControls />} />
        </Routes>

    </S.SidebarContainer>
}