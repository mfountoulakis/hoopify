import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { withRouter } from 'next/router';
import { filter, prop } from 'rambda';

import { ViewLayout } from '../components/Layout';
// import Text from '../components/Text';
// import teamNames from '../lib/teamNames';
// import ActiveScore from '../components/ActiveScore';
// import GameStatus from '../components/GameStatus';
// import GameTime from '../components/GameTime';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promptEvent: null,
      favTeam: '',
      isLoading: true,
      isPlaying: false,
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
          isLoading: false,
          isPlaying: filter(prop(this.state.favTeam, this.props.games)),
        })
      : null;
  }

  render() {
    const { router } = this.props;
    const { favTeam, isLoading, isPlaying } = this.state;

    if (!isLoading && !favTeam) {
      router.push('/teams');
    }

    return (
      <ViewLayout>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : isPlaying ? (
          <h1>live</h1>
        ) : (
          <h1>not live</h1>
        )}
      </ViewLayout>
    );
  }

  // rejnder() {
  //   const { games, router } = this.props;
  //   const { favTeam, loading } = this.state;

  //   const isPlaying = games =>
  //     games.filter(
  //       g => g.hTeam.triCode === favTeam || g.vTeam.triCode === favTeam,
  //     );

  //   !loading && !favTeam ? router.push('/teams') : null;

  //   return !loading ? (
  //     <ViewLayout>
  //       {isPlaying(games).length
  //         ? isPlaying(games).map(game => (
  //             <Text fontSize={3} key={game.gameId}>
  //               {`The ${teamNames[game.hTeam.triCode]} take on the ${
  //                 teamNames[game.vTeam.triCode]
  //               } @ ${game.arena.name}. Game starts at ${
  //                 game.startTimeEastern
  //               }`}
  //             </Text>
  //           ))
  //         : games.map(game => (
  //             <div key={game.gameId}>
  //               <GameStatus
  //                 status={
  //                   game.isGameActivated
  //                     ? 'live'
  //                     : `starts at ${game.startTimeEastern}`
  //                 }
  //               />
  //               <GameTime time={game.clock} />
  //               <ActiveScore activeGame={game} />
  //             </div>
  //           ))}
  //     </ViewLayout>
  //   ) : (
  //     <h1>Loading...</h1>
  //   );
  // }
}

Index.propTypes = {
  games: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default withRouter(Index);
