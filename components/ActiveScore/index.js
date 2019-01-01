import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@rebass/grid';

import Text from '../Text';

class ActiveScore extends React.Component {
  constructor(props) {
    super(props);
    this.props = {
      activeGame: {},
    };
  }

  render() {
    const { activeGame } = this.props;
    return (
      <Flex justifyContent="space-between">
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Text fontSize={4}>{activeGame.homeTeam.score}</Text>
          <Text color={'gray'} fontSize={0}>
            {activeGame.homeTeam.record}
          </Text>
        </Flex>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Text fontSize={4}>{activeGame.awayTeam.score}</Text>
          <Text color={'gray'} fontSize={0}>
            {activeGame.awayTeam.record}
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
