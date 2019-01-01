import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@rebass/grid';

import Text from '../Text';

class ActiveScore extends React.Component {
  render() {
    const { activeGame = {} } = this.props;
    console.log(activeGame);

    return (
      <Flex justifyContent="space-between">
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Text fontSize={4}>{activeGame.hTeam.score}</Text>
          <Text color={'gray'} fontSize={0}>
            {activeGame.hTeam.record}
          </Text>
        </Flex>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Text fontSize={4}>{activeGame.vTeam.score}</Text>
          <Text color={'gray'} fontSize={0}>
            {activeGame.vTeam.record}
          </Text>
        </Flex>
      </Flex>
    );
  }
}

ActiveScore.propTypes = {
  activeGame: PropTypes.object.isRequired,
};

export default ActiveScore;
