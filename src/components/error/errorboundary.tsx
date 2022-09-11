import * as React from 'react'
import { Error } from 'components/error/error'

interface ErrorBoundaryProps {
    children: JSX.Element | JSX.Element[]
}

interface ErrorBoundaryState {
    error: string
    hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props) {
        super(props);
        this.state = { error: "", hasError: false };
    }

    static getDerivedStateFromError(e: Error) {
        return { error: e.message, hasError: true };
    }

    render() {
        return this.state.hasError ? <Error>{this.props.children}</Error> : this.props.children;
    }
}