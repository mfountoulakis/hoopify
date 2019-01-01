import React, { Component } from 'react';
import Button from '../components/Button';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import Link from 'next/link';
import getConfig from 'next/config';

import ActiveScore from '../components/ActiveScore';
import GameStatus from '../components/GameStatus';
import GameTime from '../components/GameTime';

const activeGame = {
  currentStatus: 'live',
  gameClock: '09:21',
  quarter: 2,
  homeTeam: {
    teamName: 'Celtics',
    score: 42,
    record: '10-2',

    abbr: 'BOS',
  },
  awayTeam: {
    teamName: 'Bucks',
    score: 56,
    record: '12-0',
    abbr: 'MIL',
  },
};

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
    const { promptEvent } = this.state;
    return this.props.games ? (
      //Printing some Initial Relevant values from the endpoint
      <div>
        {this.props.games.map(game => (
          <ul key={game.gameId}>
            <Link as={`/game/${game.gameId}`} href={`/game?id=${game.gameId}`}>
              <a>ID: {game.gameId}</a>
            </Link>
            <li>startTimeEastern: {game.startTimeEastern}</li>
            <li>clock {game.clock}</li>
          </ul>
        ))}
        <Button onClick={() => promptEvent.prompt()}>Install Me</Button>
      </div>
    ) : null;
    return (
      <>
        <GameStatus status={activeGame.currentStatus} />
        <GameTime time={activeGame.gameClock} />
        <ActiveScore activeGame={activeGame} />
      </>
    );
  }
}

Index.propTypes = {
  games: PropTypes.array.isRequired,
};

export default Index;
