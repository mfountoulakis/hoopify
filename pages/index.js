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
  }

  render() {
    const { games } = this.props;

    console.log(games);
    // const activeGame = {
    //   currentStatus: 'live',
    //   gameClock: '03:20',
    //   quarter: 2,
    //   homeTeam: {
    //     teamName: 'Celtics',
    //     score: 42,
    //     record: '10-2',

    //     abbr: 'BOS',
    //   },
    //   awayTeam: {
    //     teamName: 'Bucks',
    //     score: 56,
    //     record: '12-0',
    //     abbr: 'MIL',
    //   },
    // };

    return (
      <>
        {games.map(game => (
          <ul key={game.gameId}>
            <GameStatus
              status={
                game.isGameActivated
                  ? 'live'
                  : `starts at ${game.startTimeEastern}`
              }
            />
            <GameTime time={game.clock} />
            <ActiveScore activeGame={game} />
          </ul>
        ))}
      </>
    );
  }
}

Index.propTypes = {
  games: PropTypes.array.isRequired,
};

export default Index;
