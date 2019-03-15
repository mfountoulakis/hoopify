import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@rebass/grid';

import Text from './Text';
import ActivityIndicator from './ActivityIndicator';
import Logo from './Logo';

/**
 * TODO: Make the activity indicator smarter, as in, different state
 * for timeouts and stuff
 **/

class Scoreboard extends React.Component {
  render() {
    const { game } = this.props;

    return (
      <Flex flex={1} justifyContent="space-between">
        <Flex alignItems="center">
          <Logo
            mr={3}
            src={`../static/images/teams/${
              game.basicGameData.hTeam.triCode
            }.svg`}
          />
          <Flex flexDirection="column" alignItems="center">
            <Text fontSize={3}>{game.basicGameData.hTeam.score}</Text>
            <Text caps fontSize={0}>
              {game.basicGameData.hTeam.triCode}
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Text>{game.basicGameData.time}</Text>
          <Text caps fontSize={0}>{`Q${
            game.basicGameData.period.current
          }`}</Text>
          <Text caps fontSize={3}>
            {game.basicGameData.clock}
          </Text>
          <Flex my={2}>
            <ActivityIndicator gameOn={game.basicGameData.isGameActivated} />
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <Flex flexDirection="column" alignItems="center">
            <Text fontSize={3}>{game.basicGameData.vTeam.score}</Text>
            <Text caps fontSize={0}>
              {game.basicGameData.vTeam.triCode}
            </Text>
          </Flex>
          <Logo
            ml={3}
            src={`../static/images/teams/${
              game.basicGameData.vTeam.triCode
            }.svg`}
          />
        </Flex>
      </Flex>
    );
  }
}

Scoreboard.propTypes = {
  game: PropTypes.object.isRequired,
};

export default Scoreboard;
