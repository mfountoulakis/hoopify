import React from 'react';
import { Flex } from '@rebass/grid';

const Logo = props => (
  <Flex flex="1" css={{ maxWidth: '64px', height: '64px' }} {...props}>
    <img style={{ objectFit: 'contain' }} src={props.src} />
  </Flex>
);

export default Logo;
