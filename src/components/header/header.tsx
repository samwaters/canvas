import * as React from 'react'
import styled from "styled-components";
import {Routes} from "../../routes";
import {matchPath, useLocation} from "react-router";
import {Link} from "react-router-dom";

const S = {
    Header: styled.div`
      align-items: center;
      background-color: #292a2d;
      display: flex;
      flex-direction: row;
      height: 60px;
      padding: 0 10px;
      width: 100%;
    `,
    HeaderText: styled.div`
      color: white;
      margin-right: 10px;
    `,
    NavItem: styled.div<{active: boolean}>`
      background-color: ${props => props.active ? 'black' : '#292a2d'};
      border-radius: 5px;
      color: ${props => props.active ? '#eaeaea' : '#999fa5'};
      cursor: pointer;
      padding: 5px 10px;
      &:hover {
        background-color: #35363a;
        color: #e8eaed;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
    `,
    Spacer: styled.div`
      flex: 1;
    `
}

export const Header = () => {
    const loc = useLocation()
    return <S.Header>
        <S.HeaderText>Canvas Experiments</S.HeaderText>
        <S.NavItem active={matchPath(Routes.BOXES, loc.pathname)}>
            <Link to={Routes.BOXES}>Boxes</Link>
        </S.NavItem>
        <S.NavItem active={matchPath(Routes.EXPERIMENT_TWO, loc.pathname)}>
            <Link to={Routes.EXPERIMENT_TWO}>Experiment Two</Link>
        </S.NavItem>
        <S.NavItem active={matchPath(Routes.EXPERIMENT_THREE, loc.pathname)}>
            <Link to={Routes.EXPERIMENT_THREE}>Experiment Three</Link>
        </S.NavItem>
        <S.Spacer/>
        <S.NavItem active={false}>Contact</S.NavItem>
    </S.Header>
}