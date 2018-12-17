import React from 'react';
import { ServerStyleSheet } from 'styled-components';
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
          <Manifest
            href="/static/manifest/manifest.json"
            themeColor="#F0F0F0"
          />
          <title>Hoopify</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
