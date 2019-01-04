import React, { Component } from 'react';
// import Button from '../components/Button';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
// import Link from 'next/link';
import getConfig from 'next/config';

import ActiveScore from '../components/ActiveScore';
import GameStatus from '../components/GameStatus';
import GameTime from '../components/GameTime';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promptEvent: null,
      favTeam: '',
    };
  }

  static async getInitialProps() {
    const { publicRuntimeConfig } = getConfig();
    const url = `${publicRuntimeConfig.BASEURL}`;
    const result = await fetch(`${url}/api/today`);
    const json = await result.json();
    return {
      games: json.games,
    };
  }

  componentDidMount() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault(); // Prevents prompt display initially
        this.setState({ promptEvent: e });
      });
    }

    window.localStorage
      ? this.setState({ favTeam: localStorage.getItem('favTeam') })
      : null;
  }

  render() {
    const { games } = this.props;
    const { favTeam } = this.state;

    const isPlaying = games =>
      games.filter(
        g => g.hTeam.triCode === favTeam || g.vTeam.triCode === favTeam,
      );

    return favTeam.length ? (
      <>
        {isPlaying(games).length
          ? isPlaying(games).map(game => (
              <div key={game.gameId}>
                <GameStatus
                  status={
                    game.isGameActivated
                      ? 'live'
                      : `starts at ${game.startTimeEastern}`
                  }
                />
                <GameTime time={game.clock} />
                <ActiveScore activeGame={game} />
              </div>
            ))
          : games.map(game => (
              <div key={game.gameId}>
                <GameStatus
                  status={
                    game.isGameActivated
                      ? 'live'
                      : `starts at ${game.startTimeEastern}`
                  }
                />
                <GameTime time={game.clock} />
                <ActiveScore activeGame={game} />
              </div>
            ))}
      </>
    ) : (
      <h1>Loading Screen?</h1>
    );
  }
}

Index.propTypes = {
  games: PropTypes.array.isRequired,
};

export default Index;
