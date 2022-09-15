import * as React from 'react'
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { disable, enable } from "store/boxes.store";

const S = {
    Button: styled.button``,
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
    `
}

export const BoxesControls = () => {
    const dispatch = useDispatch()
    const isActive: boolean = useSelector((state: RootState) => state.boxes.enabled)
    const handleAnimationClick = () => {
        const action = isActive ? disable : enable
        dispatch(action())
    }
    return <>
        <S.Section>
            <S.SectionHeading>Animation</S.SectionHeading>
            <S.SectionInner>
                <S.Button onClick={handleAnimationClick}>{isActive ? "⏸" : "▶️"}</S.Button>
            </S.SectionInner>
        </S.Section>
        <S.Section>
            <S.SectionHeading>Shapes</S.SectionHeading>
            <S.SectionInner>
                Hello
            </S.SectionInner>
        </S.Section>
    </>
}