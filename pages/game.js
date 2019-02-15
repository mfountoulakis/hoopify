import React from 'react';
import getConfig from 'next/config';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import { Flex } from '@rebass/grid';

import Scoreboard from '../components/Scoreboard';
class Game extends React.Component {
  static async getInitialProps({ query }) {
    const { publicRuntimeConfig } = getConfig();
    const { id } = query;
    const url = `${publicRuntimeConfig.BASEURL}`;
    const [game, players] = await Promise.all([
      fetch(`${url}/api/boxscore/${id}`),
      fetch(`${url}/api/players`),
    ]);
    const g = await game.json();
    const p = await players.json();

    return {
      game: g,
      players: p,
    };
  }

  render() {
    const {
      game,
      game: {
        basicGameData: { hTeam, vTeam, clock },
      },
    } = this.props;

    return (
      <Flex>
        <Flex>{hTeam.toString}</Flex>
        <Flex>{vTeam.toString}</Flex>
        <Flex>{clock.toString}</Flex>
        <Scoreboard game={game} />
      </Flex>
    );
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
};

export default Game;
