import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';

const StyledSelect = styled.select(space, {
  appearance: 'none',
  backgroundColor: 'black',
  backgroundImage: `url("/static/icons/chevron.svg")`,
  backgroundPosition: 'right 32px top 50%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '14px 8px',
  border: '2px solid white',
  color: 'white',
  display: 'block',
  fontFamily: 'Pilat Extended Bold',
  fontSize: '12px',
  height: '72px',
  textTransform: 'uppercase',
  width: '100%',
  letterSpacing: '0.05em',
});

const Select = props => <StyledSelect {...props} />;

Select.defaultProps = {
  px: 3,
  mb: 3,
};

export default Select;
