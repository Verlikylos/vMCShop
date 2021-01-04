import React from 'react';

import '@fontsource/roboto';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';

import { Container, Paper } from '@material-ui/core';

import { BaseLayout } from '@app/components/Layout';
import { Navigation } from '@app/components/Navigation';
import { Header } from '@app/components/Header';
import { Footer } from '@app/components/Footer';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e5e5e5;
  }

  .mr-1 {
    margin-right: 0.25rem;
  }
  .mr-2 {
    margin-right: 0.5rem;
  }
  .mr-3 {
    margin-right: 0.75rem;
  }
  .mr-4 {
    margin-right: 0.1rem;
  }
  .mr-5 {
    margin-right: 1.5rem;
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#008f92',
    },
    success: {
      main: '#38b892',
    },
    error: {
      main: '#e74c3c',
    },
    warning: {
      main: '#f39c12',
    },
    info: {
      main: '#046092',
    },

    tonalOffset: 0.1,
  },
});

const StyledPaper = styled(Paper)`
  min-height: 150vh;

  margin: -2rem 1rem 0;
  padding: 3rem 1rem;
`;

const Layout = ({ children }) => (
  <BaseLayout pageTitle="Test">
    <GlobalStyle />

    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <Navigation />

          <Header />

          <StyledPaper elevation={3}>
            <Container>{children}</Container>
          </StyledPaper>

          <Footer />
        </StylesProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  </BaseLayout>
);

export default Layout;
