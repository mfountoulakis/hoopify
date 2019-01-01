import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@rebass/grid';

import Text from '../Text';

const GameTime = ({ time }) => (
  <Flex justifyContent={'center'}>
    <Text fontSize={2}>{time}</Text>
  </Flex>
);

GameTime.propTypes = {
  time: PropTypes.string.isRequired,
};

export default GameTime;
