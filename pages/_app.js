import React from 'react';
import App, { Container } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GameContext from '../context/GameContext';
import theme from '../lib/theme';
import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';
import { compose, filter, map, prop } from 'lodash/fp';

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

    const { publicRuntimeConfig } = getConfig();
    const url = `${publicRuntimeConfig.BASEURL}`;
    const result = await fetch(`${url}/api/today`);
    const json = await result.json();

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, games: json.games };
  }

  componentDidMount() {
    if (window.localStorage) {
      const favTeam = localStorage.getItem('favTeam');
      this.setState({ favTeam }, function() {
        this.filterFavorite();
      });
    }

    if ('serviceWorker' in navigator) {
      window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault(); // Prevents prompt display initially
        this.setState({ promptEvent: e });
      });
    }
  }

  filterFavorite = () => {
    const { favTeam } = this.state;
    const { games, router } = this.props;

    const mapGame = xs =>
      xs.map(xs => {
        return {
          id: xs.gameId,
          matchup: [xs.hTeam.triCode, xs.vTeam.triCode],
        };
      });

    const teamPlayingToday = compose(
      map(prop('id')),
      filter({ matchup: [favTeam] }),
      mapGame,
    );
    teamPlayingToday(games).length
      ? router.push(`/game/${teamPlayingToday(games)}`)
      : this.setState({ loading: false });
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <GameContext.Provider value={this.state.favTeam}>
            <Component
              {...pageProps}
              {...this.props}
              {...this.state}
              setFavTeam={v =>
                this.setState({ favTeam: v }, () => {
                  localStorage.setItem('favTeam', this.state.favTeam);
                  this.filterFavorite();
                })
              }
            />
          </GameContext.Provider>
        </ThemeProvider>
      </Container>
    );
  }
}
