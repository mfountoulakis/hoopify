import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from '@rebass/grid';
import posed from 'react-pose';
import styled from 'styled-components';

import Text from './Text';
import t from '../lib/theme';

class SliderToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePanel: this.props.activePanel,
    };

    this.props = {
      activePanel: '',
      onHighlightTap: () => null,
      onStatsTap: () => null,
    };
  }

  render() {
    const { activePanel } = this.state;
    const { onHighlightTap, onStatsTap } = this.props;
    return (
      <ToggleBackground>
        <ActiveBackground
          pose={
            activePanel === 'highlights'
              ? 'highlightsActive'
              : activePanel === 'topstats'
              ? 'statsActive'
              : ''
          }
        />
        <SliderButton onClick={onStatsTap}>
          <Text caps fontSize={'8px'}>
            Top Stats
          </Text>
        </SliderButton>
        <SliderButton onClick={onHighlightTap}>
          <Text caps fontSize={'8px'}>
            Highlights
          </Text>
        </SliderButton>
      </ToggleBackground>
    );
  }

  toggleHighlightsPanel = () =>
    this.setState({ activePanel: 'highlights' }, this.props.onHighlightTap());
  toggleStatsPanel = () =>
    this.setState({ activePanel: 'topstats' }, this.props.onStatsTap());
}

SliderToggle.propTypes = {
  activePanel: PropTypes.string.isRequired,
  onHighlightTap: PropTypes.func.isRequired,
  onStatsTap: PropTypes.func.isRequired,
};

const BaseBackground = styled(Box)({
  backgroundColor: `${t.colors.orange}`,
  borderRadius: '24px',
  height: '24px',
  position: 'absolute',
  width: '100px',
});

const ActiveBackground = posed(BaseBackground)({
  highlightsActive: {
    x: 100,
  },
  statsActive: {
    x: 0,
  },
  transition: {
    type: 'spring',
  },
});

const ToggleBackground = styled(Flex)({
  alignItems: 'center',
});

const SliderButton = styled('button')({
  appearance: 'none',
  fontFamily: 'Pilat Extended Bold',
  background: 'transparent',
  border: 'none',
  color: '#fff',
  height: '24px',
  textTransform: 'uppercase',
  width: '100px',
});

export default SliderToggle;
