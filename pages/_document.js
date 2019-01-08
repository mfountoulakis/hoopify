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
    fontFamily: 'Pilat',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: `url('/static/fonts/PilatBook.woff2') format('woff2')`,
  },
  // eslint-disable-next-line no-dupe-keys
  '@font-face': {
    fontFamily: 'Pilat Extended',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: `url('/static/fonts/PilatExtendedBook.woff2') format('woff2')`,
  },
  '*, *:before, *:after': {
    margin: '0',
    padding: '0',
    position: 'relative',
    boxSizing: 'border-box',
  },
  html: {
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: 'Pilat Extended',
  },
  body: {
    minHeight: '100vh',
  },
});
