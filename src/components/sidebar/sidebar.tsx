import * as React from 'react'
import {useSelector} from "react-redux";
import styled from "styled-components";
import {RootState} from "../../store";
import {FPSChart} from "components/sidebar/fpschart";

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
        Sidebar!
        <S.CurrentFPS>
            Current FPS: <span>{currentFPS}</span>
        </S.CurrentFPS>
        <FPSChart />
    </S.SidebarContainer>
}