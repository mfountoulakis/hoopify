import React, { Component } from 'react';
// import Button from '../components/Button';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
// import Link from 'next/link';
import getConfig from 'next/config';
import ActiveScore from '../components/ActiveScore';
import GameStatus from '../components/GameStatus';
import GameTime from '../components/GameTime';
import teamNames from '../lib/teamNames';

import { withRouter } from 'next/router';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promptEvent: null,
      favTeam: '',
      loading: true,
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
      ? this.setState({
          favTeam: localStorage.getItem('favTeam'),
          loading: false,
        })
      : null;
  }

  render() {
    const { games, router } = this.props;
    const { favTeam, loading } = this.state;

    const isPlaying = games =>
      games.filter(
        g => g.hTeam.triCode === favTeam || g.vTeam.triCode === favTeam,
      );

    !loading && !favTeam ? router.push('/teams') : null;

    console.log(isPlaying(games));

    return !loading ? (
      <>
        {isPlaying(games).length
          ? isPlaying(games).map(game => (
              <div key={game.gameId}>
                {`The ${teamNames[game.hTeam.triCode]} take on the ${
                  teamNames[game.vTeam.triCode]
                } @ ${game.arena.name}. Game starts at ${
                  game.startTimeEastern
                }`}
                {/* <GameStatus
                  status={
                    game.isGameActivated
                      ? 'live'
                      : `starts at ${game.startTimeEastern}`
                  }
                />
                <GameTime time={game.clock} />
                <ActiveScore activeGame={game} /> */}
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
      <h1>Loading...</h1>
    );
  }
}

Index.propTypes = {
  games: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default withRouter(Index);
