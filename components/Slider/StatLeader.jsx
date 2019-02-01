import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/grid';

import Text from '../Text';
import PlayerPhoto from '../PlayerPhoto';

const containerCSS = {
  width: '100%',
  maxWidth: '188px',
};

const playerDetailCSS = {
  overflow: 'hidden',
  width: '100%',
  maxWidth: '120px',
};

const playerNameCSS = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const StatLeader = props => (
  <Flex alignItems="center" justifyContent="space-between" css={containerCSS}>
    <Box mr={4} mb={4} css={playerDetailCSS}>
      <PlayerPhoto mb={2} />
      <Text css={playerNameCSS}>{props.playerName}</Text>
    </Box>
    <Text fontSize={3} css={{ lineHeight: '0' }}>
      {props.statNumber}
    </Text>
  </Flex>
);

StatLeader.propTypes = {
  playerName: PropTypes.string.isRequired,
  statNumber: PropTypes.string.isRequired,
};

export default StatLeader;
