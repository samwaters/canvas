import * as React from 'react'
import styled from "styled-components";
import {useState} from "react";
import {ExperimentWindow} from "components/experiments/boxes/boxes";

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
    const [isActive, setIsActive] = useState(true)
    const handleAnimationClick = () => {
        const win: ExperimentWindow = window
        win.boxesActive = !isActive
        setIsActive(!isActive)
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