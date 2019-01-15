import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { ViewLayout } from '../components/Layout';

// import ActiveScore from '../components/ActiveScore';
// import GameStatus from '../components/GameStatus';
// import GameTime from '../components/GameTime';
import teamNames from '../lib/teamNames';
import { withRouter } from 'next/router';
import Text from '../components/Text';

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

    const gameIsActive = game => {
      game.isGameActivated
        ? router.push(`/game/${game.gameId}`)
        : `The ${teamNames[game.hTeam.triCode]} take on the ${
            teamNames[game.vTeam.triCode]
          } @ ${game.arena.name}. Game starts at ${game.startTimeEastern}`;
    };

    !loading && !favTeam ? router.push('/teams') : null;

    return !loading ? (
      <ViewLayout>
        {games.map(game => (
          <div key={game.gameId}>
            <Text fontSize={3} mb={3} as={'label'} htmlFor={'team-picker'}>
              {gameIsActive(game)}
            </Text>
          </div>
        ))}
      </ViewLayout>
    ) : (
      <h1>Loading...</h1>
    );
  }
}

Index.propTypes = {
  games: PropTypes.array.isRequired,
  router: PropTypes.object.isRequired,
};

export default withRouter(Index);
