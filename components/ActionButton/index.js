import React from 'react';
import styled from 'styled-components';
import { color, space, fontSize } from 'styled-system';

const StyledActionButton = styled.button(space, fontSize, color, {
  alignItems: 'center',
  border: 'none',
  bottom: '0',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'inherit',
  height: '140px',
  position: 'fixed',
  width: '100%',
});

const ActionButton = props => <StyledActionButton {...props} />;

ActionButton.defaultProps = {
  bg: 'orange',
  color: 'white',
  fontSize: 3,
  pt: 3,
};

export default ActionButton;
