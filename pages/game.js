import React from 'react';
import getConfig from 'next/config';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import { Flex } from '@rebass/grid';

import Text from '../components/Text';
import teamNames from '../lib/teamNames';
import Scoreboard from '../components/Scoreboard';
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: '',
      isActive: '',
      isLoading: true,
    };
  }
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

  sleep = time => new Promise(resolve => setTimeout(resolve, time));
  poll = (p, time) => p().then(this.sleep(time).then(() => this.poll(p, time)));

  getClock = async () => {
    const { game } = this.props;
    const { publicRuntimeConfig } = getConfig();
    const url = `${publicRuntimeConfig.BASEURL}`;

    const result = await fetch(
      `${url}/api/boxscore/${game.basicGameData.gameId}`,
    );
    const g = await result.json();
    return g;
  };

  componentDidMount() {
    this.poll(
      () =>
        new Promise(() =>
          this.getClock().then(result => {
            this.setState({
              game: result,
              isActive: result.basicGameData.isGameActivated,
              isLoading: false,
            });
          }),
        ),
      60000,
    );
  }

  render() {
    const {
      game,
      game: {
        basicGameData: { hTeam, vTeam },
      },
    } = this.props;

    const { isLoading } = this.state;

    let isActive = !!this.state.isActive;
    let hasEnded = statusNum === 3;

    return (
      <Flex>
        {isLoading ? (
          <Flex>LOADING</Flex>
        ) : isActive || hasEnded ? (
          <React.Fragment>
            <Flex>{hTeam.toString}</Flex>
            <Flex>{vTeam.toString}</Flex>
            <Scoreboard game={this.state.game} />
          </React.Fragment>
        ) : (
          <Text fontSize={3}>
            {`The ${teamNames[hTeam.triCode]} take on the ${
              teamNames[vTeam.triCode]
            } @ ${game.basicGameData.arena.name}. Game
          starts at ${game.basicGameData.startTimeEastern}`}
          </Text>
        )}
      </Flex>
    );
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
};

export default Game;
