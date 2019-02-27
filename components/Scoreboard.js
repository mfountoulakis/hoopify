import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/grid';

import Text from './Text';

/**
 * TODO: load in team logos here. perhaps store them locally?
 * TODO: Get the current time for each quarter, maybe timout data
 **/

class Scoreboard extends React.Component {
  render() {
    const { game } = this.props;

    return (
      <Flex flex={1} justifyContent="space-between">
        <Flex alignItems="center">
          <Box
            bg="orange"
            mr={3}
            css={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
            }}
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
        </Flex>
        <Flex alignItems="center">
          <Flex flexDirection="column" alignItems="center">
            <Text fontSize={3}>{game.basicGameData.vTeam.score}</Text>
            <Text caps fontSize={0}>
              {game.basicGameData.vTeam.triCode}
            </Text>
          </Flex>
          <Box
            bg="orange"
            ml={3}
            css={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
            }}
          />
        </Flex>
      </Flex>
    );
  }
}

Scoreboard.propTypes = {
  game: PropTypes.object.isRequired,
  // period: PropTypes.object.isRequired,
  // clock: PropTypes.string.isRequired,
};

export default Scoreboard;
