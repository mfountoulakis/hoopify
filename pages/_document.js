import React from 'react';
import { ServerStyleSheet, createGlobalStyle } from 'styled-components';
import Manifest from 'next-manifest/manifest';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [...initialProps.styles, ...sheet.getStyleElement()],
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <Manifest
            href="/static/manifest/manifest.json"
            themeColor="#000000"
            initialScale="1"
          />
          <GlobalStyles />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

const GlobalStyles = createGlobalStyle({
  '@font-face': {
    fontFamily: 'Pilat Extended Bold',
    fontStyle: 'normal',
    src: 'url("/static/fonts/PilatExtendedBold.WOFF") format("woff")',
  },
  // eslint-disable-next-line no-dupe-keys
  '@font-face': {
    fontFamily: 'Pilat Bold',
    fontStyle: 'normal',
    src: 'url("/static/fonts/PilatBold.WOFF") format("woff")',
  },
  '*, *:before, *:after': {
    margin: '0',
    padding: '0',
    position: 'relative',
    boxSizing: 'border-box',
  },
  html: {
    '-moz-osx-font-smoothing': 'grayscale',
    '-webkit-font-smoothing': 'antialiased',
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: 'Pilat Bold',
  },
  body: {
    minHeight: '100vh',
    overflow: 'hidden',
  },
  label: {
    display: 'block',
  },
});
