import * as React from 'react'
import { Routes, Route } from 'react-router-dom';
import styled from "styled-components";
import { Sidebar } from "components/sidebar/sidebar";
import { Routes as RoutesList } from '../../routes'
import {Boxes} from "components/experiments/boxes/boxes";

const S = {
    Container: styled.div`
      display: flex;
      height: 100%;
      flex-direction: row;
    `,
    Content: styled.div`
      flex: 1;
      height: 100%;
    `,
    Sidebar: styled.div`
      border-left: 1px solid #999999;
      height: 100%;
      width: 300px;
    `
}

export const Layout = () => <S.Container>
    <S.Content>
        <Routes>
            <Route path="/" element={<>Home</>} />
            <Route path={RoutesList.BOXES} element={<Boxes />} />
            <Route path="*" element={<>Not Found</>} />
        </Routes>
    </S.Content>
    <S.Sidebar>
        <Sidebar />
    </S.Sidebar>
</S.Container>