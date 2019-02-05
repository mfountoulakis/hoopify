import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@rebass/grid';

import Text from './Text';

const GameStatus = ({ status }) => (
  <Flex justifyContent={'center'} mb={2} bg="#fff">
    <Text fontSize={0} color={'#000'} caps>
      {status}
    </Text>
  </Flex>
);

GameStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export default GameStatus;
