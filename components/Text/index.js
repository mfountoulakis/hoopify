// import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, color, fontSize } from 'styled-system';

const caps = props => (props.caps ? { textTransform: 'uppercase' } : null);

const Text = styled.p(space, color, fontSize, caps);

Text.displayName = 'Text';

Text.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...fontSize.propTypes,
  caps: PropTypes.bool,
};

Text.defaultProps = {
  fontFamily: 'Pilat Extended',
  fontSize: [1, 2],
  letterSpacing: '0.1em',
};

export default Text;
