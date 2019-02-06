import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { ViewLayout } from '../components/Layout';
import Link from 'next/link';
import { compose, filter, map, prop } from 'lodash/fp';
import teamNames from '../lib/teamNames';
import { withRouter } from 'next/router';
import Text from '../components/Text';

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

  filterFavorite = () => {
    const { games, router, favTeam } = this.props;

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
      : null;
  };

  componentDidMount() {
    const { favTeam, router } = this.props;
    if ('serviceWorker' in navigator) {
      window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault(); // Prevents prompt display initially
        this.setState({ promptEvent: e });
      });
    }
    if (!favTeam) {
      router.push('/teams');
    }
    this.filterFavorite();
  }

  componentDidUpdate(prevProps) {
    if (this.props.favTeam !== prevProps.favTeam) {
      this.filterFavorite();
    }
  }

  render() {
    const { games, loading } = this.props;

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
  favTeam: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  games: PropTypes.array,
  router: PropTypes.object,
};

export default withRouter(Index);
