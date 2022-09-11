import * as React from 'react'

export const Error = ({ children }: { children: JSX.Element | JSX.Element[]}) => {
    return <>
        <p>ERROR!!!!!</p>
        {children}
    </>
}