import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { ViewLayout } from '../components/Layout';
import Link from 'next/link';

// import ActiveScore from '../components/ActiveScore';
// import GameStatus from '../components/GameStatus';
// import GameTime from '../components/GameTime';
import { compose, filter, map, prop } from 'lodash/fp';
import teamNames from '../lib/teamNames';
import { withRouter } from 'next/router';
import Text from '../components/Text';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promptEvent: null,
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
    const { games, router } = this.props;

    if ('serviceWorker' in navigator) {
      window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault(); // Prevents prompt display initially
        this.setState({ promptEvent: e });
      });
    }

    if (window.localStorage) {
      this.setState(
        {
          favTeam: localStorage.getItem('favTeam') || '',
        },
        () => {
          const mapGame = xs =>
            xs.map(xs => {
              return {
                id: xs.gameId,
                matchup: [xs.hTeam.triCode, xs.vTeam.triCode],
              };
            });

          const teamPlayingToday = compose(
            map(prop('id')),
            filter({ matchup: [this.state.favTeam] }),
            mapGame,
          );

          teamPlayingToday(games).length
            ? router.push(`/game/${teamPlayingToday(games)}`)
            : this.setState({ loading: false });
        },
      );
    }
  }

  render() {
    const { games, router } = this.props;
    const { loading, favTeam } = this.state;

    !loading && !favTeam ? router.push('/teams') : null;

    return !loading ? (
      <ViewLayout>
        {games.map(game => (
          <div key={game.gameId}>
            <Text fontSize={3} mb={3} as={'label'} htmlFor={'team-picker'}>
              <Link href={{ pathname: `/game/${game.gameId}` }}>
                <a>
                  {`the ${teamNames[game.hTeam.triCode]} take on the ${
                    teamNames[game.vTeam.triCode]
                  } @ ${game.arena.name}. Game
                starts at ${game.startTimeEastern}`}
                </a>
              </Link>
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
  games: PropTypes.array,
  router: PropTypes.object,
};

export default withRouter(Index);
