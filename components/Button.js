import React from 'react';
import styled from 'styled-components';
import { space, color } from 'styled-system';

const StyledButton = styled.button(color, space, {
  fontFamily: 'sans-serif',
  fontSize: '24px',
  backgroundColor: 'inherit',
});

const Button = props => <StyledButton {...props} />;

Button.defaultProps = {
  color: 'blue',
  px: [2, 3],
};

export default Button;
