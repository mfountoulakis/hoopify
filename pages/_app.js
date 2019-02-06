import React from 'react';
import App, { Container } from 'next/app';
import { ThemeProvider } from 'styled-components';
import FavContext from '../context/FavContext';
import theme from '../lib/theme';

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      favTeam: '',
      loading: true,
    };
  }
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    if (window.localStorage) {
      const favTeam = localStorage.getItem('favTeam');
      this.setState({ favTeam, loading: false });
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <FavContext.Provider value={this.state.favTeam}>
            <Component
              {...pageProps}
              {...this.state}
              setFavTeam={v =>
                this.setState({ favTeam: v }, () => {
                  localStorage.setItem('favTeam', this.state.favTeam);
                })
              }
            />
          </FavContext.Provider>
        </ThemeProvider>
      </Container>
    );
  }
}
