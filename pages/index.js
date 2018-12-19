import React, { Component } from 'react';
import Button from '../components/Button';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import Link from 'next/link';
import getConfig from 'next/config';

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
  }
}

Index.propTypes = {
  games: PropTypes.array.isRequired,
};

export default Index;
