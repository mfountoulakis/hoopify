import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from '@rebass/grid';

import Navigation from '../Navigation';

export const MaxBound = props => <Box px={2} mx={'auto'} {...props} />;

const bottomCss = {
  bottom: '0',
  flexDirection: 'column',
  height: '140px',
  marginTop: '100%',
  postion: 'fixed',
  width: '100%',
};

export const View = props => {
  return (
    <Box>
      <Flex pt={6}>
        <MaxBound>{props.children}</MaxBound>
      </Flex>
      {props.bottom ? (
        <Flex css={bottomCss}>{props.bottom}</Flex>
      ) : (
        <Navigation filterFavorite={props.filterFavorite}/>
      )}
    </Box>
  );
};

View.propTypes = {
  filterFavorite: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  bottom: PropTypes.node,
};
