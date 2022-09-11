import * as React from 'react'
import { HashRouter as Router } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Reset } from 'styled-reset'
import { ErrorBoundary } from 'components/error/errorboundary'
import { Header } from "components/header/header";
import {Layout} from "components/Layout/layout";
import { theme } from 'theme/theme';

const GlobalStyles = createGlobalStyle`
  * { box-sizing: border-box; }
  html, body, #app { font-family: Roboto, sans-serif; height: 100%; }
`

export const App = () => <>
    <Reset />
    <GlobalStyles />
    <ThemeProvider theme={theme}>
        <ErrorBoundary>
            <Router>
                <Header />
                <Layout />
            </Router>
        </ErrorBoundary>
    </ThemeProvider>
</>