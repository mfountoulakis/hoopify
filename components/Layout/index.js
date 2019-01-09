import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from '@rebass/grid';

export const MaxBound = props => <Box px={2} mx={'auto'} {...props} />;

const bottomCss = {
  bottom: '0',
  flexDirection: 'column',
  height: '140px',
  marginTop: '100%',
  postion: 'fixed',
  width: '100%',
};

export const ViewLayout = props => {
  return (
    <Box>
      <Flex pt={6}>
        <MaxBound>{props.children}</MaxBound>
      </Flex>
      {props.bottom && <Flex css={bottomCss}>{props.bottom}</Flex>}
    </Box>
  );
};

ViewLayout.propTypes = {
  children: PropTypes.node.isRequired,
  bottom: PropTypes.node,
};
