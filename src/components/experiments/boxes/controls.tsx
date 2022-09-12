import * as React from 'react'
import styled from "styled-components";
import {useState} from "react";

const S = {
    Button: styled.button``,
    Section: styled.div``,
    SectionHeading: styled.h3`
      background-color: #292a2d;
      color: white;
      padding: 5px 0;
    `
}

export const BoxesControls = () => {
    const [isActive, setIsActive] = useState(true)
    return <>
        <S.Section>
            <S.SectionHeading>Animation</S.SectionHeading>
            <S.Button>${isActive ? "⏸" : "▶️"}</S.Button>
        </S.Section>
        <S.Section>
            <S.SectionHeading>Shapes</S.SectionHeading>
        </S.Section>
    </>
}