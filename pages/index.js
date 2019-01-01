import React, { Component } from 'react';

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

  componentDidMount() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault(); // Prevents prompt display initially
        this.setState({ promptEvent: e });
      });
    }
  }

  render() {
    return (
      <>
        <GameStatus status={activeGame.currentStatus} />
        <GameTime time={activeGame.gameClock} />
        <ActiveScore activeGame={activeGame} />
      </>
    );
  }
}

export default Index;
