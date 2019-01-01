import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@rebass/grid';

import Text from '../Text';

class Score extends React.Component {
  render() {
    const { score } = this.props;
    return (
      <Flex justifyContent="space-between">
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Text fontSize={4}>{score.homeTeam}</Text>
          <Text color={'gray'} fontSize={0}>
            10-2
          </Text>
        </Flex>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Text fontSize={4}>{score.awayTeam}</Text>
          <Text color={'gray'} fontSize={0}>
            10-2
          </Text>
        </Flex>
      </Flex>
    );
  }
}

Score.propTypes = {
  score: PropTypes.number,
};

export default Score;
