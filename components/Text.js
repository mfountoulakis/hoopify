import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, color, fontSize } from 'styled-system';

const caps = props => (props.caps ? { textTransform: 'uppercase' } : null);

const Text = styled.p(space, color, fontSize, caps, {
  letterSpacing: '0.02em',
});

Text.displayName = 'Text';

Text.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...fontSize.propTypes,
  caps: PropTypes.bool,
};

Text.defaultProps = {
  fontSize: 1,
};

export default Text;
