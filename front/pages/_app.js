import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import '../public/fonts/fonts.css';
import { createTheme, ThemeProvider } from '@material-ui/core';
import wrapper from '../store/configureStore';

const theme = createTheme({
  typography: {
    fontFamily: 's-core_dream3_light',
  },
  // palette: {
  //   type: 'dark',
  // },
});

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="UTF-8" />
      <title>노드버드</title>
    </Head>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(App);
