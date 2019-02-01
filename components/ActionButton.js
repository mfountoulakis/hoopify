import React from 'react';
import styled from 'styled-components';
import { color, space, fontSize } from 'styled-system';

const StyledActionButton = styled.button(space, fontSize, color, {
  alignItems: 'center',
  border: 'none',
  bottom: '0',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Pilat Extended Bold',
  height: '140px',
  position: 'fixed',
  width: '100%',
  letterSpacing: '0.05em',
});

const ActionButton = props => <StyledActionButton {...props} />;

ActionButton.defaultProps = {
  bg: 'orange',
  color: 'white',
  fontSize: 2,
  pt: 3,
};

export default ActionButton;
