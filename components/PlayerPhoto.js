import React from 'react';
import { Box } from '@rebass/grid';

// TODO: Make this player photo more versatil and not hardcoded,
// we could potentially use some variations in other parts of the app

const PlayerPhoto = props => (
  <Box
    bg="orange"
    css={{ height: '40px', width: '40px', borderRadius: '100%' }}
    {...props}
  />
);

export default PlayerPhoto;
